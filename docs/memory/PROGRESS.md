# Progress
_Last updated: 2026-10-13_
## Current state
- Stages 1–9 pushed. Stages 10–14 committed locally, not pushed (main ahead of origin by 7 after the Stage 14 follow-up commit). Deploy after push never verified (no `gh` CLI); Pages source may still need "GitHub Actions".
- Stage 12 (`43456a9`): Qualifications + Publications pages removed; nav "About" links to home top. Nav: About · Biography · Herbal Medicine · Books · Paintings · Contact.
- Stage 13 (`05f36d9`, `2fc322f`): Biography page wording from user (i18n only, ar+en): `sections.bio.h/sub`, `glance`, `photos.portrait.cap`, `toc`. Nav label «السيرة الذاتية» and bio `meta` title unchanged (asked user, no answer yet).
- Stage 14 (`0189cb7` + follow-up): Herbal Medicine page built from `my-content/herbal-medicine/` (2 PDFs + 5 photos): why-statement, 6 essays (folded), 13 Q&A cards in 3 topic groups (herbs; conditions & tests; recipe vs evidence) + cupping Q&A card under the cupping essay (`herbal.json` `attach`); AR+EN in i18n `herbal`, structure in `_data/herbal.json`, hero = grey-suit photo (`dr/suit.jpg`).
## "Coming soon" still on the site
- `my-content/home-and-contact/` still empty.
- 3 old books (نهر العشق، على جدار الزمن، دستوري): d2 "description in preparation"; user will send.
- "Read the book" button: disabled "Coming soon" on every book (not allowed yet).
- Bio header photo is a placeholder; user will send a new one.
## To confirm with user
- Keep `aria-current` highlight on "About" when on home?
- Rename nav link / bio page title to match new heading «السِّيرَةُ الْعِلْمِيَّةُ وَالْمِهْنِيَّةُ»? EN wording for Stage 13 headings written by Claude: proofread.
- Other paintings needing a transparent cut-out? (user flags by screenshot). Alt texts (AR/EN) written by Claude: proofread.
- Keep tan leather accent? Phone: keep bio button between paragraphs or move to end?
- Heading diacritics option 3 (strip marks except shadda in Ruqaa headings): touches the full-diacritics decision.
- Arabic transcriptions need a human proofread. EN translation quality: Claude polish / human / shorter EN?
- Per-load random shuffle of books? Limit home shelf to 4?
- Older: «و» rule for `meta.home.title/desc`; studio photo absent from home hero; folding bio intro; "قيد الصدور" on جمهورية الأقنعة ج2.
- Herbal: user chose to publish all herbal answers as written (cupping Q&A under the cupping essay, manuka + olive leaf in Q&A cards). Kept out by user: drugs lecture, «العناية بالزوجة», Venice lecture (page numbers in Claude memory `herbal-set-aside-items`).
- Herbal: proofread Claude-written sub-headings inside articles, section titles, captions/alts, full EN translation.
## Next up
1. Push Stages 10–14.
2. Set Pages source to GitHub Actions, check Actions tab, confirm live site.
3. Before launch: `preview: false`, real domain in `lib/urls.js`, README placeholders; wire real "Read the book" link when allowed.
## Known issues
- Image tooling: no PIL/ImageMagick; pip blocked. Use `sips` + Swift (CoreGraphics/ImageIO). ImageIO writes PNG/HEIC/AVIF, not WebP. Swift crop/cut-out tools lived in the session scratchpad (not in repo): rebuild if needed (border flood fill; wall mode: light pixels with blue ≥0.62×red).
- Painting sizes: full ≤1100px q60 JPEG (~120–390 KB), thumbs ≤700w/900h q45. Masonry middle column ~170px longer on 3-col desktop (acceptable).
- Placeholder cover gradient `.c1` in style.css still uses old blue #22405a (only visible if a cover image is missing).
- New full-book PDF from client: add exact path to `.gitignore` before committing.
- No pdftotext/pypdf. PDF text via swift PDFKit (Arabic comes out with false spaces + out-of-order lines); Vision OCR gives word breaks but wrong letters. Merge both, then fix order against page images rendered with PDFKit.
- `bio.sep` i18n key unused. Global `nav` styles hit any `<nav>`. README still "Dr. [Name]"/"Stage 2".
- Preview on 8091. Dev server may not rebuild includes: run `npm run build` if output looks stale.
