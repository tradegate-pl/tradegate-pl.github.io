import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';

const code=await readFile(new URL('../assets/analytics.js',import.meta.url),'utf8');
const measurementId='G-TEST123456';
const key='tradegate-analytics-consent-v1';
const saved=(choice,at=Date.now())=>JSON.stringify({version:1,choice,at});

function browser({choice=null,hostname='tradegate.pl',storageBlocked=false}={}){
 const scripts=[],cookies=[],store=new Map(choice?[[key,choice]]:[]);
 const element=(dataset={})=>({dataset,isConnected:true,listeners:{},addEventListener(name,fn){this.listeners[name]=fn;},focus(){this.focused=true;},click(){this.listeners.click?.();}});
 const deny=element({analyticsChoice:'denied'}),allow=element({analyticsChoice:'granted'}),settings=element(),email=element();
 const banner={hidden:true,querySelector:()=>deny};
 const document={currentScript:{dataset:{measurementId}},documentElement:{lang:'en'},title:'Trade Gate',referrer:'https://example.com/private-path?email=PII_SENTINEL',listeners:{},querySelector:()=>banner,querySelectorAll(selector){return selector==='[data-analytics-choice]'?[deny,allow]:selector==='.analytics-open'?[settings]:[email];},addEventListener(name,fn){this.listeners[name]=fn;},createElement(){return {};},head:{append(script){scripts.push(script);}}};
 Object.defineProperty(document,'cookie',{get:()=> '_ga=test; _ga_TEST123456=test; unrelated=keep',set:value=>cookies.push(value)});
 const window={listeners:{},addEventListener(name,fn){this.listeners[name]=fn;}};
 const location={hostname,origin:'https://'+hostname,pathname:'/en/',search:'?email=PII_SENTINEL',hash:'#PII_SENTINEL',reload(){this.reloads=(this.reloads||0)+1;}};
 const localStorage={getItem(k){if(storageBlocked)throw Error('Storage disabled');return store.get(k)||null;},setItem(k,v){if(storageBlocked)throw Error('Storage disabled');store.set(k,v);}};
 runInNewContext(code,{window,document,location,localStorage,URL,Date,encodeURIComponent});
 return {window,document,location,scripts,cookies,store,banner,allow,deny,settings,email,events(){return (window.dataLayer||[]).map(args=>Array.from(args));}};
}

test('no Google tag or events before consent or after refusal',()=>{
 const b=browser();
 assert.equal(b.banner.hidden,false);
 assert.equal(b.scripts.length,0);
 b.email.click();b.document.listeners['tradegate:enquiry-sent']();
 assert.equal(b.events().length,0);
 b.deny.click();
 assert.equal(b.scripts.length,0);
 assert.equal(b.banner.hidden,true);
 assert.equal(JSON.parse(b.store.get(key)).choice,'denied');
 assert(b.cookies.every(c=>!c.startsWith('unrelated=')));
});
test('consent starts one page view and keeps advertising disabled',()=>{
 const b=browser();b.allow.click();b.allow.click();
 assert.equal(b.scripts.length,1);
 const events=b.events();
 assert.equal(events.filter(e=>e[0]==='event'&&e[1]==='page_view').length,1);
 assert.equal(events[0][0],'consent');assert.equal(events[0][1],'default');
 const consent=events.find(e=>e[0]==='consent'&&e[1]==='update')[2];
 assert.equal(consent.analytics_storage,'granted');
 for(const setting of ['ad_storage','ad_user_data','ad_personalization'])assert.equal(consent[setting],'denied');
 const config=events.find(e=>e[0]==='config')[2];
 assert.equal(config.allow_google_signals,false);
 assert.equal(config.page_location,'https://tradegate.pl/en/');
 assert.equal(config.page_referrer,'https://example.com/');
 assert(!JSON.stringify(events).includes('PII_SENTINEL'));
});
test('only successful enquiry events become leads, without form contents',()=>{
 const b=browser();b.allow.click();
 assert(!b.events().some(e=>e[1]==='generate_lead'));
 b.document.listeners['tradegate:enquiry-sent']();b.email.click();
 assert.deepEqual(JSON.parse(JSON.stringify(b.events().filter(e=>e[0]==='event'))),[
  ['event','page_view',{page_language:'en'}],
  ['event','generate_lead',{page_language:'en'}],
  ['event','contact_email_click',{page_language:'en'}]
 ]);
});
test('revoking consent disables Google, clears GA cookies and reloads',()=>{
 const b=browser({choice:saved('granted')});assert.equal(b.scripts.length,1);
 b.settings.click();assert.equal(b.banner.hidden,false);assert.equal(b.deny.focused,true);
 b.deny.click();assert.equal(b.window['ga-disable-'+measurementId],true);
 assert.equal(b.location.reloads,1);
 const count=b.events().length;b.email.click();b.document.listeners['tradegate:enquiry-sent']();
 assert.equal(b.events().length,count);
 assert(b.cookies.some(c=>c.startsWith('_ga=')));
 assert(b.cookies.every(c=>!c.startsWith('unrelated=')));
 const next=browser({choice:b.store.get(key)});assert.equal(next.scripts.length,0);
});
test('expired, malformed or future consent never starts tracking',()=>{
 for(const choice of [saved('granted',Date.now()-181*86400000),'{broken',saved('granted',Date.now()+86400000)]){
  const b=browser({choice});assert.equal(b.scripts.length,0);assert.equal(b.banner.hidden,false);
 }
});
test('the site still works when local storage is unavailable',()=>{
 const b=browser({storageBlocked:true});assert.equal(b.scripts.length,0);
 b.allow.click();assert.equal(b.scripts.length,1);
});
test('localhost previews never load the production Google tag',()=>{
 const b=browser({hostname:'127.0.0.1',choice:saved('granted')});b.allow.click();
 assert.equal(b.scripts.length,0);assert.equal(b.events().length,0);
});
test('consent withdrawal in another tab also stops measurement',()=>{
 const b=browser({choice:saved('granted')});b.store.set(key,saved('denied'));
 b.window.listeners.storage({key});
 assert.equal(b.window['ga-disable-'+measurementId],true);assert.equal(b.location.reloads,1);
});
