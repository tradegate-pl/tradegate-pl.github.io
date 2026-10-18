import {readFile,access} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import assert from 'node:assert/strict';
let checks=0;
for(const [file,lang] of [['index.html','pl'],['en/index.html','en']]){
 const html=await readFile(file,'utf8');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,`${file}: duplicate id`);checks++;
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`${file}: expected one H1`);checks++;
 assert(html.includes(`<html lang="${lang}">`));checks++;
 assert(html.includes('rel="canonical"'));checks++;
 assert(html.includes('hreflang="pl"')&&html.includes('hreflang="en"'));checks++;
 const names=[...html.matchAll(/<(?:input|select|textarea)\b[^>]*\bname="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(names.length,new Set(names).size,`${file}: duplicate form fields`);checks++;
 for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const target=m[1];if(/^(https?:|mailto:)/.test(target))continue;
  if(target.startsWith('#')){assert(ids.includes(target.slice(1)),`${file}: broken anchor ${target}`);checks++;continue;}
  await access(resolve(dirname(file),target));checks++;
 }
 for(const m of html.matchAll(/<label for="([^"]+)"/g)){assert(ids.includes(m[1]),`${file}: missing form control`);checks++;}
 for(const m of html.matchAll(/aria-(?:controls|labelledby)="([^"]+)"/g)){assert(ids.includes(m[1]),`${file}: missing ARIA target`);checks++;}
 assert(html.includes('https://formspree.io/f/xpqnloyd'));checks++;
 assert(!/placeholder.*partner|coming soon|wkrótce/i.test(html));checks++;
 JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);checks++;
}
const css=await readFile('assets/style.css','utf8');
for(const m of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)){await access(resolve('assets',m[1]));checks++;}
assert((await readFile('CNAME','utf8')).trim()==='tradegate.pl');checks++;
console.log(`PASS: ${checks} checks — PL/EN pages, assets, anchors, form uniqueness, metadata, ARIA references and custom domain.`);
