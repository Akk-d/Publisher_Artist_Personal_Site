# Progress
_Last updated: 2026-10-11_
## Current state
- Stage 1–3 committed: Eleventy 3 site, Arabic at `/`, English at `/en/`, per-language pages, hreflang, sitemap, robots, legacy `.html` redirects.
- Sections live: home, books (+ one page per book), paintings (with viewer), biography.
- Stub sections ("coming soon"): qualifications, herbal medicine, publications.
- `site.js` has `preview: true` (shows "Design preview" banner).
## In progress
- Uncommitted: real images (`src/assets/images/{books,dr,paintings}`, `drphotos.json`, `stage3-additions.css`) wired into books, book, paintings, home, biography; i18n ar/en, books.json, legacy.json, paintings.js updated.
- `my-content/` + `my-content.zip` (raw source material from the client) untracked; not yet decided whether to commit or gitignore.
## Next up
1. Verify and commit the real-images work (`npm run build && npm run check`).
2. Fill stub sections from `my-content/` (qualifications, herbal-medicine, publications are empty so far; biography has `Bio.pdf`).
3. Home & contact content (`my-content/home-and-contact/` empty).
4. Before launch: set `preview: false`, set real domain in `lib/urls.js`, replace "Dr. [Name]" placeholder.
## Known issues
- No TODO/FIXME comments in code.
- README title still "Dr. [Name]" placeholder and says "Stage 2".
- `/wrapup` runs `git add -A`: would commit `my-content.zip` and `my-content/` unless gitignored.
