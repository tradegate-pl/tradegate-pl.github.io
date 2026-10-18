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

Edit bilingual content and metadata in `scripts/build.mjs` and `scripts/b2b-copy.mjs`, then rebuild. Styling is in `assets/style.css` and `assets/b2b.css`; browser interactions are in `assets/main.js`. Generated pages are checked into Git so the current GitHub Pages hosting can serve them directly. Keep `CNAME` intact.

## Delivery

The contact form preserves the existing Formspree endpoint. Each language has exactly one set of fields; sending, success, failure and timeout states are handled. Required fields have explicit labels. No live test enquiry was sent to the business inbox during development.

Accessible interaction: keyboard-operated tabs with arrow/Home/End support, mobile navigation with Escape support, native FAQ disclosure elements, focus indicators, reduced-motion support and a modal privacy notice.

The site includes canonical and alternate-language URLs, structured organization data, social preview artwork, robots.txt and a sitemap. These are technical SEO foundations; traffic and leads have not been measured or guaranteed.

Only the user-confirmed 15 years of trade experience is presented as a numeric business credential underpinning the company's competence; it is not a claim about the company's incorporation date. The owner confirmed work across virtually all product categories; the displayed groups are examples. The site presents Trade Gate as a company, with a company email and no founder/person schema or personal branding. No client logos, testimonials or invented results are included. Product artwork is illustrative and does not depict actual client brands.

## Assets

The hero artwork was generated with the built-in ImageGen tool. The working brief: a brushed brass architectural gateway linking premium unbranded consumer products with abstract retail shelving, on a deep navy set with ivory light and restrained editorial photography. The served WebP is approximately 157 KB; a JPEG is provided for social previews.

DM Sans and Instrument Serif are hosted locally under their included SIL Open Font Licenses. The TG square-and-arch mark preserves the existing identity; category illustrations are CSS work.

The B2B revision makes the service explicit in the opening, defines scope and work outcomes, explains fit and enquiry follow-up, and adds an optional website/catalogue field. Audience calls to action preselect the development stage. The website field accepts a bare domain without blocking the enquiry.

## Review before production

The redesign is prepared on a separate branch for review. Confirm the final copy, current contact details and privacy information. A real Formspree delivery test remains to be performed with the owner; client-side validation alone does not prove inbox delivery.
