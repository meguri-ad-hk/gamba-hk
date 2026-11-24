# GAMBA HK — GitHub Pages staging kit

Approved design: GAMBA V12 (EN / Traditional Chinese). This is a **staging build**, not a production launch.

## How to upload through GitHub.com

1. Create a **public** repository named `gamba-hk` under the intended owner (`meguri-ad-hk` in the supplied screenshot). Public GitHub Pages requires repository Settings > Pages.
2. Extract the ZIP locally. In GitHub repository choose **Add file > Upload files**; drag **everything inside** `gamba-hk-deploy` into the upload page. Do not upload the ZIP itself, and do not add an extra nested `gamba-hk-deploy` directory.
3. Commit changes to the `main` branch.
4. Open **Settings > Pages > Build and deployment > Deploy from a branch > main > /(root) > Save**. See GitHub Docs for current interface.
5. Open the Pages URL GitHub shows. Test English (`/`) and Traditional Chinese (`/zh/`) plus all images, menus, carousels, cookies, and form preview messages.

## Structure

- `index.html` — English homepage (static content with bilingual data labels)
- `zh/index.html` — Traditional Chinese homepage, search-indexable once launch safeguards removed
- `assets/css/site.css` — the **single approved CSS file**. Update it directly; no hotfix layers
- `assets/js/site.js` — shared interactive behavior (Cookies, carousels, counters, menus)
- `assets/images/brand/` — untouched official logo
- `assets/images/work/fhj/` — FHJ carousel photos, ordered 01–05
- `assets/images/work/ballyhoo/` — Ballyhoo carousel photos, ordered 01–05
- `assets/images/services/` — six active homepage service images
- `assets/images/clients/` — six client logos, preserve native transparency/proportions
- `IMAGE_MAP.csv` — source-to-file reference, including image slots
- `tools/prepare_image.py` — optional preprocessing helper for new image uploads

## Critical staging safeguards

**Do not change the DNS of gambahk.com yet.** Both homepages currently include a `noindex,nofollow` robots meta tag to prevent premature indexing of the temporary test site. REMOVE this safeguard once the official domain, forms, SEO canonical URLs and hreflang settings have been checked at launch. Leaving `noindex` on the final domain would make the website unindexable.

The enquiry form and floating WhatsApp are **preview-only** until real Formspree endpoint and approved GAMBA WhatsApp number are provided. Do not promote the staging site as a live lead generation channel.

Language switching navigates between the two physical pages (English `/index.html`, Chinese `/zh/index.html`) so both can later have separate canonical and hreflang URLs.

## Image update process

- Keep each image **slot filename stable** when replacing with a newer photo, so HTML doesn't need changing.
- Artwork: crop to **16:9** (e.g. 1600×900) only when the subject is safe. Don't stretch an image.
- For portrait/square assets, preserve important details: recompose, extend background, or create a restrained collage if crop would remove essential subject matter.
- Use `.webp` for work/services; preserve original logo artworks as transparent `.png` where applicable.
- Avoid upscaling unnecessarily. Existing service assets are intentionally provisional and can be replaced later.
- Separate image SEO `alt` text is maintained in EN and ZH HTML — revise when substantially changing image subject.

## Next: individual service pages

Create six bilingual service-page pairs, under `/services/<service-slug>/index.html` and `/zh/services/<service-slug>/index.html` after scope/copy approval. Reuse the exact CSS typography, image, header and footer system. Then point the relevant homepage service labels and Footer links to those pages.

## V12 final changes (2026-11-24)

- Traditional Chinese selected-client section heading: **合作品牌** (EN stays **SELECTED CLIENTS**).
- 3R philosophy heading promoted to an editorial subheading on desktop and mobile; approved 3-column desktop / stacked mobile panels unchanged.
- Mobile footer is three **vertical content groups** (Logo / Explore / Services), **not** three narrow side-by-side columns; internal link lists are two columns. Desktop footer remains approved.
- Mobile cookie animation keeps the existing 5 animated shapes, wall/cookie collision and brand SVG shape. Speed/rotation are slightly calmer, and toolbar-only height changes no longer trigger re-bounding. Desktop motion untouched.
- Staging is still `noindex,nofollow`; Formspree and WhatsApp are preview only. Don't change live domain DNS.

## V12.1 header and floating contact finishing

- Desktop header CONTACT / 聯絡我們 uses a fine GAMBA-yellow outline with subtle yellow hover fill, with all other navigation unchanged.
- Mobile WhatsApp floating control has larger right and bottom margins (including iPhone safe-area inset); it remains preview-only pending the official number.
