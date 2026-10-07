# Dr. [Name] — Eleventy site (Stage 2)

Commands:  npm start (preview) · npm run build · npm run check · npm run build:pages · npm run check:pages

Where things live:
- Text (Arabic/English)  -> src/_data/i18n/ar.json, en.json
- Books                  -> src/_data/books.json (facts) + i18n files (titles/descriptions)
- Paintings              -> src/_data/paintings.js
- Languages / domain     -> lib/urls.js
- Layout, header, footer -> src/_includes/
- Page templates         -> src/pages/
- Your design            -> src/css/style.css (unchanged from the prototype)
- prototype-original/    -> frozen copy of the prototype. Never edit.

Add a language (e.g. French): add one line in lib/urls.js, create src/_data/i18n/fr.json
(copy en.json and translate). Pages, URLs, hreflang and sitemap are generated automatically.
