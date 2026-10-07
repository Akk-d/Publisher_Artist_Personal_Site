# Eleventy migration — Stage 1 (skeleton)

Goal: Eleventy builds your prototype into a `_site/` that is **byte-identical** to the original.

## Do this
1. Copy your 9 prototype files into BOTH folders:
   - `src/`                 (Eleventy input)
   - `prototype-original/`  (frozen reference — never edit)
   Files: index.html, index-2.html, books.html, book-1.html, book-2.html,
   book-3.html, paintings.html, site.js, style.css
2. `git init && git add -A && git commit -m "prototype baseline" && git tag prototype-v0`
3. `npm install`
4. `npm run build`
5. `npm run verify`   → must print PASS
6. `npm start`        → open http://localhost:8080 and click through
   AR/EN toggle, menu, books, painting zoom viewer, home animation.

## What Stage 1 deliberately does NOT do
No layouts, no clean URLs, no folder moves, no SEO changes, no JS changes.
`src/src.11tydata.js` keeps flat `name.html` URLs so relative paths keep working.
