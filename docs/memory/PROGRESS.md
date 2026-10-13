# Progress
_Last updated: 2026-10-13_
## Current state
- Stages 1–9 committed and pushed to origin/main (last: `9ad84e5`). Deploy run after push not verified (no `gh` CLI); Pages source may still need "GitHub Actions". Full-book PDFs purged from history, ignored by exact path.
- Stage 10 (built + checked + previewed; commit pending approval):
  - Formal headshot `src/assets/images/dr/headshot.jpg` in bio "Literary works" section (`.bio-works-wrap`, `.bio-photo`, caption `t.by` + `photos.headshot.cap`), floats inline-end at every width.
  - Arabic Ruqaa headings weight 400 site-wide; `stage10-additions.css` loaded globally from base.njk.
  - Home "About": `a1`/`a2` rewritten from bio highlights (doctorates, herbal medicine, cancer/chronic diseases, Ukraine centre, poet/artist, 5 languages, 17 works, 3 book titles); old "full bio in preparation" removed. New `read_bio` button → biography, placed under the `a1` column (right in AR, left in EN; between the paragraphs on phone).
  - Accent `--lapis` now tan leather `#6a3a1e` (was blue). Button hover not visually confirmed in preview (synthetic hover didn't trigger); variable verified.
## "Coming soon" still on the site
- Qualifications, Herbal Medicine, Publications pages: `section-stub`. `my-content/` folders empty for all three + home-and-contact. Qualifications can be built from the bio's academic part now.
- 3 old books (نهر العشق، على جدار الزمن، دستوري): d2 "description in preparation"; user will send.
- "Read the book" button: disabled "Coming soon" on every book (not allowed yet).
- Bio header photo is a placeholder; user will send a new one.
- Bio works list: 3 forthcoming titles (correct, not yet published).
## To confirm with user
- Keep tan leather accent after seeing it live? Phone: keep button between paragraphs or move to the end?
- Heading diacritics option 3 (strip marks except shadda in Ruqaa headings) needs approval: touches the full-diacritics decision.
- Arabic transcriptions need a human proofread. EN translation quality: Claude polish / human / shorter EN?
- Per-load random shuffle of books? Limit home shelf to 4?
- Older: «و» rule for `meta.home.title/desc`; studio photo absent from home hero; "At a glance" wording; folding bio intro; "قيد الصدور" on جمهورية الأقنعة ج2.
## Next up
1. Commit Stage 10 (awaiting approval), push.
2. Qualifications page from bio academic content.
3. Add new paintings from `my-content/paintings/` (crop backdrop, thumb ≤800px, `paintings.js` + i18n `paintings`/`palt`).
4. Set Pages source to GitHub Actions, check Actions tab, confirm live site.
5. Before launch: `preview: false`, real domain in `lib/urls.js`, README placeholders; wire real "Read the book" link when allowed.
## Known issues
- Placeholder cover gradient `.c1` in style.css still uses old blue #22405a (only visible if a cover image is missing).
- Cropped painting JPEGs large (157–347 KB). New full-book PDF from client: add exact path to `.gitignore` before committing.
- No pdftotext/pypdf; pip blocked. PDF text via swift PDFKit; render pages to PNG to read Arabic.
- `bio.sep` i18n key unused. Global `nav` styles hit any `<nav>`. README still "Dr. [Name]"/"Stage 2".
- Preview on 8091 (stale servers may hold 8080–8083). `#about` anchor/JS scroll unreliable in preview: use computer scroll. Built-in browser can't open scratchpad files.
