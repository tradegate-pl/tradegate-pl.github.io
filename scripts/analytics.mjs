import {measurementId as configuredId} from './analytics-config.mjs';
const measurementId=process.env.TRADEGATE_GA_MEASUREMENT_ID||configuredId;

if(measurementId && !/^G-[A-Z0-9]{6,20}$/.test(measurementId)) throw new Error('Invalid GA4 measurement ID');

const text={
 pl:{title:'Statystyki odwiedzin',body:'Za Twoją zgodą Google Analytics pomoże nam sprawdzać odwiedziny, kraje użytkowników i skuteczność strony. Możesz odmówić i nadal korzystać ze wszystkich funkcji.',accept:'Zgadzam się na statystyki',reject:'Tylko niezbędne',settings:'Ustawienia cookies',privacy:'Szczegóły prywatności',notice:'Google Analytics uruchamiamy wyłącznie po zgodzie na statystyki. Pomiar obejmuje odwiedziny, przybliżony kraj, źródło wejścia i zdarzenia, takie jak wysłanie zapytania. Nie przekazujemy do Analytics imienia, adresu e-mail ani treści formularza. Nie włączamy funkcji reklamowych Google. Zgodę możesz zmienić w „Ustawieniach cookies” w stopce. Wybór zapisujemy na tym urządzeniu przez 180 dni. Google może przetwarzać dane pomiarowe poza Europejskim Obszarem Gospodarczym zgodnie ze swoją polityką prywatności.'},
 en:{title:'Visitor statistics',body:'With your permission, Google Analytics helps us understand visits, visitor countries and how this website performs. You can decline and still use every feature.',accept:'Allow statistics',reject:'Essential only',settings:'Cookie settings',privacy:'Privacy details',notice:'We load Google Analytics only after you consent to statistics. Measurement includes visits, approximate country, traffic source and events such as a successfully sent enquiry. We do not send names, email addresses or form contents to Analytics. Google advertising features are disabled. You can change your choice using “Cookie settings” in the footer. Your choice is stored on this device for 180 days. Google may process measurement data outside the European Economic Area under its privacy policy.'}
};

export function refineAnalytics(copy){
 if(!measurementId)return;
 for(const lang of ['pl','en']){
  const old=lang==='pl'?'Strona nie korzysta z analitycznych ani reklamowych skryptów śledzących.':'This website does not use analytics or advertising tracking scripts.';
  copy[lang].privacyBody=copy[lang].privacyBody.replace(old,text[lang].notice);
 }
}
export function analyticsHead(base){
 return measurementId?`<link rel="stylesheet" href="${base}assets/analytics.css"><script src="${base}assets/analytics.js" data-measurement-id="${measurementId}" defer></script>`:'';
}
export function analyticsSettings(lang){
 return measurementId?`<button type="button" class="analytics-open">${text[lang].settings}</button>`:'';
}
export function analyticsPrivacyLink(lang){
 return measurementId?`<p><a href="https://policies.google.com/privacy?hl=${lang}" target="_blank" rel="noopener">Google — ${lang==='pl'?'polityka prywatności':'privacy policy'} ↗</a></p>`:'';
}
export function analyticsMarkup(lang){
 if(!measurementId)return '';
 const t=text[lang];
 return `<section class="analytics-consent" id="analytics-consent" role="region" aria-labelledby="analytics-consent-title" hidden><div><h2 id="analytics-consent-title">${t.title}</h2><p>${t.body} <button type="button" class="privacy-open">${t.privacy}</button>.</p></div><div class="analytics-consent-actions"><button type="button" data-analytics-choice="denied">${t.reject}</button><button type="button" data-analytics-choice="granted">${t.accept}</button></div></section>`;
}
