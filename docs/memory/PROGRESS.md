# Progress
_Last updated: 2026-10-11_
## Current state
- Stages 1–3 committed: Eleventy 3 site, Arabic at `/`, English at `/en/`, per-language pages, hreflang, sitemap, robots, legacy `.html` redirects, real images.
- Stage 4 (uncommitted, build + check pass):
  - `my-content/` is the source of truth (rule in CLAUDE.md); `my-content.zip` deleted.
  - Biography page shows the full `Bio.pdf` content (i18n `bio`, ar + en translation): intro, academic, medical, literary, 17 works (3 linked to book pages, 3 marked forthcoming), languages/arts, reading list (36 books).
  - Header photo per page via `heroes.json` + `components/page-head.njk`: books=reading, paintings=studio, bio/qualifications/publications=portrait (writing); herbal has none (user said drop the flowers painting).
  - Preview banner no longer lists the biography as placeholder.
- Stub sections ("coming soon"): qualifications, herbal medicine, publications.
- `site.js` has `preview: true` (shows "Design preview" banner).
## To confirm with user
- "قيد الصدور" assigned to جمهورية الأقنعة ج2 (it sat on its own line in the PDF).
- Source fixes: "مِنْهَجُ"→"مَنْهَجُ" in دستوري; stray "ن" before التحصيل removed.
## Next up
1. Commit Stage 4.
2. Qualifications page: could reuse the academic part of the bio (degrees) until `my-content/qualifications/` has material.
3. Herbal medicine, publications: wait for content in `my-content/`.
4. Home & contact content (`my-content/home-and-contact/` empty).
5. Before launch: `preview: false`, real domain in `lib/urls.js`, decide name form ("يوسف بن أحمد" on site vs "يوسف أحمد" in Bio.pdf), replace "Dr. [Name]" placeholders.
## Known issues
- README title still "Dr. [Name]" placeholder and says "Stage 2".
- An old server may hold port 8080; preview config uses 8091.
- User's `!` shell in Claude doesn't load nvm (`~/.zshrc`); run npm in a real terminal or `source ~/.nvm/nvm.sh` first.
