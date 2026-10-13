# Progress
_Last updated: 2026-10-13_
## Current state
- Stages 1–9 pushed. Stage 10 committed locally (`c156da5`), not pushed (main ahead of origin by 1). Deploy after push never verified (no `gh` CLI); Pages source may still need "GitHub Actions".
- Stage 11 (built + checked + previewed; commit pending approval):
  - All 21 unique paintings from `my-content/paintings/` on the paintings page (2 of 23 files are exact duplicates, skipped). Old 4 images replaced; `canal` now uses the plain photo instead of the old room shot.
  - No visible titles anywhere: `paintingFrame(p, alt)` has no figcaption; i18n `paintings` titles removed; `palt` alt text for all 21 (slug keys). Viewer caption shows position "3 / 21" in `num_locale` digits (AR Arabic-Indic).
  - Home paintings section: 4 picks by `home` order (horse, music-lesson, sailing-ship, harbour-boats), layout unchanged.
  - Crops re-done with light-edge peeling (no white strips). Carved frames `flowers`, `cottage-stream`, `alpine-lake` are transparent AVIF (`cut: true`, `.frame.cutout` drop-shadow in stage11 CSS).
  - Preview banner `note` no longer mentions painting titles.
## "Coming soon" still on the site
- Qualifications, Herbal Medicine, Publications pages: `section-stub`. `my-content/` folders empty for all three + home-and-contact. Qualifications can be built from the bio's academic part now.
- 3 old books (نهر العشق، على جدار الزمن، دستوري): d2 "description in preparation"; user will send.
- "Read the book" button: disabled "Coming soon" on every book (not allowed yet).
- Bio header photo is a placeholder; user will send a new one.
## To confirm with user
- Other paintings needing a transparent cut-out? (user flags by screenshot). Alt texts (AR/EN) written by Claude: proofread.
- Keep tan leather accent? Phone: keep bio button between paragraphs or move to end?
- Heading diacritics option 3 (strip marks except shadda in Ruqaa headings): touches the full-diacritics decision.
- Arabic transcriptions need a human proofread. EN translation quality: Claude polish / human / shorter EN?
- Per-load random shuffle of books? Limit home shelf to 4?
- Older: «و» rule for `meta.home.title/desc`; studio photo absent from home hero; "At a glance" wording; folding bio intro; "قيد الصدور" on جمهورية الأقنعة ج2.
## Next up
1. Commit Stage 11 (awaiting approval), push Stage 10 + 11.
2. Qualifications page from bio academic content.
3. Set Pages source to GitHub Actions, check Actions tab, confirm live site.
4. Before launch: `preview: false`, real domain in `lib/urls.js`, README placeholders; wire real "Read the book" link when allowed.
## Known issues
- Image tooling: no PIL/ImageMagick; pip blocked. Use `sips` + Swift (CoreGraphics/ImageIO). ImageIO writes PNG/HEIC/AVIF, not WebP. Swift crop/cut-out tools lived in the session scratchpad (not in repo): rebuild if needed (border flood fill; wall mode: light pixels with blue ≥0.62×red).
- Painting sizes: full ≤1100px q60 JPEG (~120–390 KB), thumbs ≤700w/900h q45. Masonry middle column ~170px longer on 3-col desktop (acceptable).
- Placeholder cover gradient `.c1` in style.css still uses old blue #22405a (only visible if a cover image is missing).
- New full-book PDF from client: add exact path to `.gitignore` before committing.
- No pdftotext/pypdf. PDF text via swift PDFKit; render pages to PNG to read Arabic.
- `bio.sep` i18n key unused. Global `nav` styles hit any `<nav>`. README still "Dr. [Name]"/"Stage 2".
- Preview on 8091. Dev server may not rebuild includes: run `npm run build` if output looks stale. `#about` anchor/JS scroll unreliable in preview.
