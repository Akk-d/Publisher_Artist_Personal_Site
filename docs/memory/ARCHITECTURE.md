# Architecture

## Map
- `eleventy.config.js`: passthrough (css/js/assets), URL filters, input `src` → output `_site`, pathPrefix.
- `lib/urls.js`: languages list, origin/base path, `href`/`asset`/`abs` helpers.
- `src/_data/site.js`: global flags (`preview` banner).
- `src/_data/languages.js`: re-exports languages for templates.
- `src/_data/entries.js`: one entry per page per language (books → per book too).
- `src/_data/i18n/ar.json`, `en.json`: all UI/page text, meta titles/descs, book texts.
- `src/_data/books.json`: book facts (slug, image, w/h; array order = shelf order). Texts in i18n `books.<slug>` (title, sub, type, pub, d1, d2, desc[]).
- `src/_data/paintings.js`: paintings list via `p(id, w, h, home, cut)`: files `/assets/images/paintings/<id>[-thumb].jpg` (`.avif` when `cut`), w/h of thumb, `home` = order on home page, `cut` = transparent cut-out (`.cutout` class). Alt text i18n `palt.<id>`; no titles. Macro `paintingFrame(p, alt)` sets `--r` and wraps the img in `.pin`.
- `src/_data/drphotos.json`: doctor photos (key, width, height). `src/assets/images/dr/standing.jpg` (home hero front frame) is referenced directly in `home.njk`; `headshot.jpg` is used only in the bio literary-works section (`biography.njk`), not as a page header.
- `src/_data/herbal.json`: Herbal page order (`essays`, `qa` groups, `attach` = Q&A card shown under an essay) and images (`assets/images/herbal/`); texts in i18n `herbal` (`articles.<id>` + page labels). Filter `splitLead` (eleventy.config.js) splits article teaser/rest.
- `src/_data/legacy.json`: old `.html` URL → new route redirects.
- `src/pages/*.njk`: one template per page type (home, books, book, paintings, biography, herbal-medicine).
- `src/pages/pages.11tydata.js`: ROUTES, permalink, title, description, canonical, hreflang.
- `src/_includes/layouts/base.njk`: HTML shell.
- `src/_includes/components/`: header, footer, seo-head, viewer (painting lightbox), section-stub, page-head (title + header photo + optional `headList` checklist), macros.
- `src/legacy.njk`, `src/sitemap.njk`, `src/robots.njk`: redirects, sitemap.xml, robots.txt.
- `src/css/style.css`: prototype design (don't edit); `stage2-additions.css`, `stage3-additions.css`, `stage4-additions.css` (page header photos, biography), `stage5-additions.css` (biography layout: glance checklist, contents, cards, 2-col lists), `stage6-additions.css` (site-wide buttons: menu toggle, lang switcher, .btn, back-to-top), `stage7-additions.css` (darker brown `--ink`/`--soft` token overrides), `stage8-additions.css` (home hero `.print .ph` fix; painting gallery: masonry, `.pin` hover, home `.paint-feature` desktop layout), `stage9-additions.css` (book cover frame `.bk-frame`/`.bk` + 3D hover, book page byline/subtitle/read-soon button, `.book-about` description + verses + `<details>`; loaded globally in base.njk), `stage10-additions.css` (global, loaded last: Arabic Ruqaa headings weight 400; bio literary-works headshot `.bio-works-wrap`/`.bio-photo`; `--lapis` accent override to tan leather `#6a3a1e`), `stage11-additions.css` (global: `.frame.cutout` drop-shadow for transparent painting cut-outs), `stage14-additions.css` (herbal page only, `hm-` prefix: essay index, figures, folds, Q&A cards, notes), `stage17-additions.css` (global, loaded last: per-heading Arabic spacing fixes `#part-1-h`/`#part-7-h` + `.join`; home paintings fixed hang `.gal-home`; home `.about.one` single column; herbal IBS image `#e-ibs` contain-fit), `stage18-additions.css` (global, loaded last: home publications index `.home-works` + `.soon` pill; `#about` bottom padding), `home.css`: additions.
- `src/js/`: `nav.js` (menu), `viewer.js` (painting viewer; caption = position in `#vw[data-locale]` digits from i18n `num_locale`), `home-bg.js` (home background), `herbal.js` (opens folded Q&A/essay targeted by URL hash), `masonry.js` (Pinterest-style shortest-column layout for `.gal2` and any `.gal` except `.gal-home`; loaded via page `scripts` on home + paintings; also adds the reveal class).
- `src/assets/images/{books,dr,herbal,paintings}/`: site images.
- `tools/check-site.mjs`: post-build checks on `_site/`.
- `prototype-original/`: frozen original HTML prototype. Never edit.
- `my-content/`: source of truth for content (client PDFs, photos); committed, not part of the build, except full book PDFs (local only, gitignored by exact path). `biography/Bio.pdf` → i18n `bio`; `herbal-medicine/*.pdf` → i18n `herbal`.
- `src/_data/heroes.json`: which doctor photo (`drphotos.json` key) heads each page; rendered by `components/page-head.njk`.
- `_site/`: build output (gitignored).

## Flow
data (`src/_data` + `lib/urls.js`) → `entries.js` × languages → `pages.11tydata.js` (routes/SEO) → `src/pages/*.njk` + `_includes` → `_site/` static HTML → GitHub Pages.

## Entry points
- `npm start` / `npm run build` → `eleventy.config.js`.
- Routes: `/`, `/books/`, `/books/<slug>/`, `/paintings/`, `/biography/`, `/herbal-medicine/`; English under `/en/...`.
- `npm run check` → `tools/check-site.mjs`.
- `.claude/launch.json`: preview server config (Eleventy on port 8091).
- `.github/workflows/deploy.yml`: on push to `main`, runs `build:pages` + `check:pages` and publishes `_site/` to GitHub Pages (Pages source must be "GitHub Actions").
- i18n extras (Stage 17): `hero_name` (home h1 name with diacritics; `name` stays plain for titles/cards); `about_text` (home about paragraph); `h_books_page` (Books page h1; `h_books` still used on home); herbal section 1 renders `herbal.articles.asil` under `herbal.intro.h` (no `intro.sub`), `why` is listed in `herbal.json` essays; optional `bio.parts[].hHtml` (heading with markup, rendered `| safe` in the h2 only; TOC uses plain `h`).
