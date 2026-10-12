# Progress
_Last updated: 2026-10-12_
## Current state
- Stages 1–8 committed (last: `ef0c515` new books + paintings source files). Not pushed.
- Stage 9 (uncommitted, built + checked + previewed desktop/mobile):
  - 5 new books from `my-content/books/untitled folder 4–8`: `fi-rihab-al-hurriya` (4), `fi-hadrat-al-samt` (5), `nahnu-asl-al-hikaya` (6, both texts; 2nd under heading "مفتاح الحكاية"), `kalimat-ahd-wa-rayat-qurb` (7), `sumuw-al-atifa` (8; cover = PDF title page, no publisher, text from the .pages file).
  - i18n `books.<slug>`: title, `sub` (cover subtitle), type/pub, d1, `desc[]` (string = paragraph, `[a,b]` = verse, `{h}` = heading). Arabic transcribed from PDFs (3 garbled → typed from page images); English = Claude translation.
  - Book page: byline "تأليف/By + name", disabled "Read the book · Coming soon" button (user: full book must NOT be readable/downloadable yet), "About the book" with first 3 items + `<details>` "Read the full text", sticky framed cover, empty meta hidden.
  - Cards show author name instead of publisher. Shelf order mixed (user said "random order"; interpreted as any order, not per-load shuffle).
  - Covers: `.bk-frame` gold hairline mat + spine shading; hover = rotateY turn on spine + deeper shadow + light sweep (reduced-motion off). `stage9-additions.css`, loaded globally in base.njk.
  - Bio works list: 5 new titles linked by slug; EN title renamed to "A Word of Covenant and a Banner of Nearness". Books meta desc lists all 8.
## To confirm with user
- Arabic transcriptions need a human proofread (diacritics typed by hand).
- English translations: user asked about literary quality; offered (1) Claude polish pass, (2) human literary translator, (3) shorter EN descriptions. No answer yet.
- Per-load random shuffle of books wanted? Limit home shelf to 4 (8 is long on mobile)?
- Descriptions for the 3 old books (user will add); they still show "coming soon" d2.
- Older open items: «و» rule for `meta.home.title/desc`; studio photo absent from home hero; "At a glance" wording; folding bio intro; "قيد الصدور" on جمهورية الأقنعة ج2.
## Next up
1. Commit Stage 9 (awaiting approval).
2. Add new paintings from `my-content/paintings/` (crop backdrop, thumb ≤800px, `paintings.js` + i18n `paintings`/`palt`).
3. Push, set Pages source to GitHub Actions, confirm live site.
4. Qualifications page (could reuse academic bio part). Herbal, publications, contact: wait for content.
5. Before launch: `preview: false`, real domain in `lib/urls.js`, README placeholders; wire real "Read the book" link when allowed.
## Known issues
- Cropped painting JPEGs large (157–347 KB); `nahnu-asl-al-hikaya.jpg` ~260 KB.
- No pdftotext/pypdf; pip blocked. PDF text via swift PDFKit (`PDFDocument.string`) inserts spaces in Arabic; render pages to PNG with PDFKit to read. `.pages` text: unzip `Index/Document.iwa`, snappy-decompress (custom no-CRC framing).
- `bio.sep` i18n key unused. Global `nav` styles hit any `<nav>`. README still "Dr. [Name]"/"Stage 2".
- Stale eleventy servers may hold 8080–8083; preview uses 8091. User shell may need `source ~/.nvm/nvm.sh`.
