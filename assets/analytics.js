(() => {
 const id=document.currentScript?.dataset.measurementId;
 if(!/^G-[A-Z0-9]{6,20}$/.test(id||''))return;
 // Preview and development must never inflate the production property.
 const production=['tradegate.pl','www.tradegate.pl'].includes(location.hostname);
 const key='tradegate-analytics-consent-v1';
 const lifetime=180*24*60*60*1000;
 const banner=document.querySelector('#analytics-consent');
 if(!banner)return;
 let active=false;
 let loaded=false;
 let returnFocus=null;

 function readChoice(){
  try{
   const value=JSON.parse(localStorage.getItem(key));
   if(value?.version===1&&['granted','denied'].includes(value.choice)&&Number.isFinite(value.at)&&value.at<=Date.now()&&Date.now()-value.at<lifetime)return value.choice;
  }catch{/* Storage may be unavailable. Ask again without breaking the page. */}
  return null;
 }
 function clearCookies(){
  // Clear only GA cookies, including parent-domain cookies; never touch Formspree or other storage.
  const domains=['',location.hostname,'.'+location.hostname,'.tradegate.pl'];
  for(const part of document.cookie.split(';')){
   const name=part.split('=')[0].trim();
   if(!/^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name))continue;
   for(const domain of domains)document.cookie=`${name}=; Max-Age=0; Path=/; SameSite=Lax${domain?'; Domain='+domain:''}`;
  }
 }
 function track(name){
  if(!active||window['ga-disable-'+id]||typeof window.gtag!=='function')return;
  window.gtag('event',name,{page_language:document.documentElement.lang});
 }
 function start(){
  if(!production)return;
  if(loaded)return;
  loaded=true;active=true;window['ga-disable-'+id]=false;
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments);};
  window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',personalization_storage:'denied'});
  window.gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  window.gtag('js',new Date());
  let referrer='';
  try{referrer=document.referrer?new URL(document.referrer).origin+'/':'';}catch{/* Ignore malformed referrers. */}
  // Strip query strings and fragments: form data and arbitrary URL parameters must not reach GA.
  window.gtag('config',id,{send_page_view:false,page_location:location.origin+location.pathname,page_referrer:referrer,page_title:document.title,allow_google_signals:false,allow_ad_personalization_signals:false,cookie_expires:15552000,cookie_update:false});
  track('page_view');
  const script=document.createElement('script');
  script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);
  script.id='tradegate-google-tag';
  document.head.append(script);
 }
 function applyChoice(choice,persist=true){
  if(persist){try{localStorage.setItem(key,JSON.stringify({version:1,choice,at:Date.now()}));}catch{/* Choice applies to this page even without persistent storage. */}}
  banner.hidden=true;
  if(choice==='granted')start();
  else{
   active=false;window['ga-disable-'+id]=true;clearCookies();
   // A reload removes the already-loaded library and all its automatic event listeners.
   if(loaded){location.reload();return;}
  }
  if(returnFocus?.isConnected)returnFocus.focus();
 }
 document.querySelectorAll('[data-analytics-choice]').forEach(button=>button.addEventListener('click',()=>applyChoice(button.dataset.analyticsChoice)));
 document.querySelectorAll('.analytics-open').forEach(button=>button.addEventListener('click',()=>{returnFocus=button;banner.hidden=false;banner.querySelector('[data-analytics-choice]').focus();}));
 document.querySelectorAll('a[href="mailto:contact@tradegate.pl"]').forEach(link=>link.addEventListener('click',()=>track('contact_email_click')));
 document.addEventListener('tradegate:enquiry-sent',()=>track('generate_lead'));
 window.addEventListener('storage',event=>{if(event.key===key){const choice=readChoice();if(choice)applyChoice(choice,false);else{active=false;window['ga-disable-'+id]=true;clearCookies();if(loaded)location.reload();else banner.hidden=false;}}});
 const choice=readChoice();
 if(choice)applyChoice(choice,false);
 else{window['ga-disable-'+id]=true;clearCookies();banner.hidden=false;}
})();
