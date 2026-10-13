# Progress
_Last updated: 2026-10-13_
## Current state
- Stages 1–9 pushed. Stages 10 (`c156da5`) and 11 (`f3b8c87`) committed locally, not pushed (main ahead of origin by 2). Deploy after push never verified (no `gh` CLI); Pages source may still need "GitHub Actions".
- Stage 12 (built + checked + previewed; commit pending approval):
  - Qualifications and Publications pages removed (both were `section-stub`): templates, routes, entries, heroes keys, nav links and their i18n keys (`n_qual`, `n_pubs`, `meta.*`, `sections.*`) in ar+en. Bio text untouched.
  - Nav "About" (نبذة) now links to the home page top (`/`, `/en/`), not `/#about`; it gets `aria-current` on home. The `#about` section on home is still there.
  - Nav now: About · Biography · Herbal Medicine · Books · Paintings · Contact.
## "Coming soon" still on the site
- Herbal Medicine page: `section-stub`; `my-content/` folders empty for it + home-and-contact.
- 3 old books (نهر العشق، على جدار الزمن، دستوري): d2 "description in preparation"; user will send.
- "Read the book" button: disabled "Coming soon" on every book (not allowed yet).
- Bio header photo is a placeholder; user will send a new one.
## To confirm with user
- Keep `aria-current` highlight on "About" when on home?
- Other paintings needing a transparent cut-out? (user flags by screenshot). Alt texts (AR/EN) written by Claude: proofread.
- Keep tan leather accent? Phone: keep bio button between paragraphs or move to end?
- Heading diacritics option 3 (strip marks except shadda in Ruqaa headings): touches the full-diacritics decision.
- Arabic transcriptions need a human proofread. EN translation quality: Claude polish / human / shorter EN?
- Per-load random shuffle of books? Limit home shelf to 4?
- Older: «و» rule for `meta.home.title/desc`; studio photo absent from home hero; "At a glance" wording; folding bio intro; "قيد الصدور" on جمهورية الأقنعة ج2.
## Next up
1. Commit Stage 12 (awaiting approval), push Stages 10–12.
2. Set Pages source to GitHub Actions, check Actions tab, confirm live site.
3. Before launch: `preview: false`, real domain in `lib/urls.js`, README placeholders; wire real "Read the book" link when allowed.
## Known issues
- Image tooling: no PIL/ImageMagick; pip blocked. Use `sips` + Swift (CoreGraphics/ImageIO). ImageIO writes PNG/HEIC/AVIF, not WebP. Swift crop/cut-out tools lived in the session scratchpad (not in repo): rebuild if needed (border flood fill; wall mode: light pixels with blue ≥0.62×red).
- Painting sizes: full ≤1100px q60 JPEG (~120–390 KB), thumbs ≤700w/900h q45. Masonry middle column ~170px longer on 3-col desktop (acceptable).
- Placeholder cover gradient `.c1` in style.css still uses old blue #22405a (only visible if a cover image is missing).
- New full-book PDF from client: add exact path to `.gitignore` before committing.
- No pdftotext/pypdf. PDF text via swift PDFKit; render pages to PNG to read Arabic.
- `bio.sep` i18n key unused. Global `nav` styles hit any `<nav>`. README still "Dr. [Name]"/"Stage 2".
- Preview on 8091. Dev server may not rebuild includes: run `npm run build` if output looks stale.
