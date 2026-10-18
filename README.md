# Trade Gate — The Retail Gateway

Polish and English B2B website for Trade Gate. Built for GitHub Pages with no runtime framework, analytics or third-party font requests.

## Work locally

Requires Node.js 24 or later; no package installation is needed.

```text
node scripts/build.mjs
node scripts/check.mjs
node scripts/serve.mjs
```

Preview: http://127.0.0.1:4173

Edit bilingual content and metadata in `scripts/build.mjs`, `scripts/b2b-copy.mjs` and `scripts/benefits-copy.mjs`, then rebuild. Styling is in `assets/style.css` and `assets/b2b.css`; browser interactions are in `assets/main.js`. Generated pages are checked into Git so the current GitHub Pages hosting can serve them directly. Keep `CNAME` intact.

## Delivery

The contact form preserves the existing Formspree endpoint. Each language has exactly one set of fields; sending, success, failure and timeout states are handled. Required fields have explicit labels. Owner-authorised live tests confirmed PL and EN inbox delivery after the Formspree sender was added to the owner's safe senders.

Accessible interaction: keyboard-operated tabs with arrow/Home/End support, mobile navigation with Escape support, native FAQ disclosure elements, focus indicators, reduced-motion support and a modal privacy notice.

The site includes canonical and alternate-language URLs, structured organization data, social preview artwork, robots.txt and a sitemap. These are technical SEO foundations; traffic and leads have not been measured or guaranteed.

Only the user-confirmed 15 years of trade experience is presented as a numeric business credential underpinning the company's competence; it is not a claim about the company's incorporation date. The owner confirmed work across virtually all product categories; the displayed groups are examples. The site presents Trade Gate as a company, with a company email and no founder/person schema or personal branding. No client logos, testimonials or invented results are included. Product artwork is illustrative and does not depict actual client brands.

## Assets

The hero artwork was generated with the built-in ImageGen tool. The working brief: a brushed brass architectural gateway linking premium unbranded consumer products with abstract retail shelving, on a deep navy set with ivory light and restrained editorial photography. The served WebP is approximately 157 KB; a JPEG is provided for social previews.

DM Sans and Instrument Serif are hosted locally under their included SIL Open Font Licenses. The TG square-and-arch mark preserves the existing identity. The category illustrations were generated using the built-in ImageGen tool and delivered as locally hosted WebP assets (approximately 38–117 KB each). They are unbranded illustrative product compositions, not client products or case-study evidence. No text is embedded in the images; all labels and captions have Polish and English versions.

The B2B revision makes the service explicit in the opening, defines scope and work outcomes, explains fit and enquiry follow-up, and adds an optional website/catalogue field. Audience calls to action preselect the development stage. The website field accepts a bare domain without blocking the enquiry.

The owner confirmed that Trade Gate is a commercial intermediary, does not buy goods, has strong relationships with Polish modern trade and helps find importers in Poland. Both languages explain the intermediary role and importer search; no purchasing, inventory, logistics or broader geographic capabilities are implied.

The opening prioritises relationships, sales opportunities and importer search. The market section presents approximately 60,000 grocery stores in major chains and approximately 37 million residents, supported by separate sources outside retail operators: IFP (report dated 2 March 2026, data for year-end 2024) and Statistics Poland (published 23 September 2026, first-half 2026 population estimate). It retains 26 representative retailer names across food, beauty, home/garden/lifestyle and electronics. These are market examples, not a client list or a guarantee of distribution. No individual chain counts are displayed. The four-stage process is kept concise. Client success stories are deferred until permissions are available. No invented projects, people photographs or implied testimonials have been added.

## Production

The bilingual site is hosted on GitHub Pages at https://tradegate.pl/. Changes are reviewed and validated before merging to main. Retail figures include dates and source links so they can be maintained as the market changes. Responsive checks cover desktop, tablet and phone widths in both languages; device emulation does not replace checking a physical handset.

## Independent sources for market scale

Store count: Institute of Public Finance, report dated 2 March 2026, p.11 and Appendix 1: https://www.ifp.org.pl/wp-content/uploads/2026/04/Raport-Fiskalne-skutki-franczyzacji-polskiej-gospodarki-na-skutek-wprowadzenia-PSD.pdf#page=11 . It reports approximately 62,174 grocery stores operated by major chains at year-end 2024; rounded to about 60,000. This includes chain/franchise formats and must not be described as modern trade alone or a 2026 census. The report is independent of retail operators but was commissioned by the Association of Agents and Franchisees and NSZZ Solidarność; the website source disclosure makes this explicit. No fiscal or employment conclusions from the report are used.

Population: Statistics Poland, Socio-economic situation of the country in August 2026, published 23 September 2026, printed p. 5 (PDF page 7): https://ssgk.stat.gov.pl/Sytuacja_spo%C5%82eczno-gospodarcza_kraju_08.2026.pdf#page=7 . Preliminary population estimate at 30 June 2026: 37.2 million, rounded to 37 million. This is population, not a promise of customers or distribution.

The earlier 30,000 modern-format subset and the source link to Żabka Annual Report have been removed from the public pages. Sources substantiate their own metrics; different populations or reporting years are not combined. Retailer names are examples, not claimed partners.
