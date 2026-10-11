# Architecture

## Map
- `eleventy.config.js`: passthrough (css/js/assets), URL filters, input `src` → output `_site`, pathPrefix.
- `lib/urls.js`: languages list, origin/base path, `href`/`asset`/`abs` helpers.
- `src/_data/site.js`: global flags (`preview` banner).
- `src/_data/languages.js`: re-exports languages for templates.
- `src/_data/entries.js`: one entry per page per language (books → per book too).
- `src/_data/i18n/ar.json`, `en.json`: all UI/page text, meta titles/descs, book texts.
- `src/_data/books.json`: book facts (slug, etc.).
- `src/_data/paintings.js`: paintings list.
- `src/_data/drphotos.json`: doctor photos (key, width, height).
- `src/_data/legacy.json`: old `.html` URL → new route redirects.
- `src/pages/*.njk`: one template per page type (home, books, book, paintings, biography, qualifications, herbal-medicine, publications).
- `src/pages/pages.11tydata.js`: ROUTES, permalink, title, description, canonical, hreflang.
- `src/_includes/layouts/base.njk`: HTML shell.
- `src/_includes/components/`: header, footer, seo-head, viewer (painting lightbox), section-stub, page-head (title + header photo + optional `headList` checklist), macros.
- `src/legacy.njk`, `src/sitemap.njk`, `src/robots.njk`: redirects, sitemap.xml, robots.txt.
- `src/css/style.css`: prototype design (don't edit); `stage2-additions.css`, `stage3-additions.css`, `stage4-additions.css` (page header photos, biography), `stage5-additions.css` (biography layout: glance checklist, contents, cards, 2-col lists), `home.css`: additions.
- `src/js/`: `nav.js` (menu), `viewer.js` (painting viewer), `home-bg.js` (home background).
- `src/assets/images/{books,dr,paintings}/`: site images.
- `tools/check-site.mjs`: post-build checks on `_site/`.
- `prototype-original/`: frozen original HTML prototype. Never edit.
- `my-content/`: source of truth for content (client PDFs, photos); committed, not part of the build. `biography/Bio.pdf` → i18n `bio`.
- `src/_data/heroes.json`: which doctor photo (`drphotos.json` key) heads each page; rendered by `components/page-head.njk`.
- `_site/`: build output (gitignored).

## Flow
data (`src/_data` + `lib/urls.js`) → `entries.js` × languages → `pages.11tydata.js` (routes/SEO) → `src/pages/*.njk` + `_includes` → `_site/` static HTML → GitHub Pages.

## Entry points
- `npm start` / `npm run build` → `eleventy.config.js`.
- Routes: `/`, `/books/`, `/books/<slug>/`, `/paintings/`, `/biography/`, `/qualifications/`, `/herbal-medicine/`, `/publications/`; English under `/en/...`.
- `npm run check` → `tools/check-site.mjs`.
- `.claude/launch.json`: preview server config (Eleventy on port 8091).
- `.github/workflows/deploy.yml`: on push to `main`, runs `build:pages` + `check:pages` and publishes `_site/` to GitHub Pages (Pages source must be "GitHub Actions").
