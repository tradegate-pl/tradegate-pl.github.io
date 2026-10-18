const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const closeMenu = () => { menu.setAttribute('aria-expanded','false'); navigation.classList.remove('open'); };
menu.addEventListener('click', () => {const open=menu.getAttribute('aria-expanded')==='true'; menu.setAttribute('aria-expanded',String(!open));navigation.classList.toggle('open',!open);});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});

function setupTabs(selector, panelPrefix, onSelect) {
 const tabs=[...document.querySelectorAll(selector)];
 function activate(index, focus=false){tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;document.getElementById(`${panelPrefix}${i}`).hidden=i!==index;});if(focus)tabs[index].focus();onSelect?.(index);}
 tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>activate(i));tab.addEventListener('keydown',e=>{let next=i;if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(i+1)%tabs.length;else if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;e.preventDefault();activate(next,true);});});
 return {activate,tabs};
}
let currentStep=0;
const steps=setupTabs('[data-step]','panel-',index=>currentStep=index);
document.querySelector('#next-step').addEventListener('click',()=>steps.activate((currentStep+1)%steps.tabs.length,true));
setupTabs('[data-category]','category-panel-');
document.querySelectorAll('.category-contact').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#category').selectedIndex=Number(a.dataset.categoryValue)+1;}));
document.querySelectorAll('.audience-cta').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#stage').selectedIndex=Number(a.dataset.stage);}));

function updateLanguageLinks(){document.querySelectorAll('.language a').forEach(a=>{const target=new URL(a.href);target.hash=location.hash;a.href=target.href;});}
updateLanguageLinks();
window.addEventListener('hashchange',updateLanguageLinks);

const privacy=document.querySelector('#privacy-dialog');
document.querySelectorAll('.privacy-open').forEach(b=>b.addEventListener('click',()=>privacy.showModal()));
document.querySelector('.dialog-close').addEventListener('click',()=>privacy.close());
privacy.addEventListener('click',e=>{if(e.target===privacy){const r=privacy.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)privacy.close();}});

const form=document.querySelector('#contact-form');
form.addEventListener('submit',async e=>{
 e.preventDefault();if(!form.reportValidity())return;
 const button=form.querySelector('[type=submit]');const label=button.querySelector('span');const status=document.querySelector('#form-status');const original=label.textContent;
 button.disabled=true;label.textContent=form.dataset.sending;form.setAttribute('aria-busy','true');status.hidden=true;status.classList.remove('error');
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),20000);
 try{
  const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'},signal:controller.signal});
  if(!response.ok)throw new Error('Request failed');
  status.textContent=form.dataset.success;form.reset();
 }catch{status.textContent=form.dataset.error;status.classList.add('error');}
 finally{clearTimeout(timer);button.disabled=false;label.textContent=original;form.removeAttribute('aria-busy');status.hidden=false;status.focus();}
});
