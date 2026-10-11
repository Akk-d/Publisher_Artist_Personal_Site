# Progress
_Last updated: 2026-10-11_
## Current state
- Stages 1–4 committed: Eleventy 3 site, Arabic at `/`, English at `/en/`, per-language pages, hreflang, sitemap, robots, legacy redirects, real images, full biography from `my-content/biography/Bio.pdf`, per-page header photos (`heroes.json`).
- Stage 5 (uncommitted, build + check pass, checked in browser ar/en, desktop + mobile): biography redesigned James Clear–style:
  - Header: title + photo + "At a glance" gold checklist (`bio.highlights`, via optional `headList`/`headListH` in `page-head.njk`).
  - "On this page" contents box linking to `#intro` and `#part-N`.
  - Sections split by thin rules, narrow column, "Back to top" per section.
  - Works in 2 columns with "forthcoming" pill; languages part now `cards` (Languages / Art and sport) + `end` paragraph; reading list in 2 columns (title over author).
  - Styles in `src/css/stage5-additions.css`.
- Stub sections ("coming soon"): qualifications, herbal medicine, publications.
- `site.js` has `preview: true` (shows "Design preview" banner).
## To confirm with user
- Wording of the new "At a glance" lines and card titles (ar + en), written by Claude from Bio.pdf facts.
- Whether to fold the 10-paragraph intro behind "Read more" (currently all visible).
- "قيد الصدور" assigned to جمهورية الأقنعة ج2 (it sat on its own line in the PDF).
- Source fixes: "مِنْهَجُ"→"مَنْهَجُ" in دستوري; stray "ن" before التحصيل removed.
## Next up
1. Commit Stage 5.
2. Qualifications page: could reuse the academic part of the bio (degrees) until `my-content/qualifications/` has material.
3. Herbal medicine, publications: wait for content in `my-content/`.
4. Home & contact content (`my-content/home-and-contact/` empty).
5. Before launch: `preview: false`, real domain in `lib/urls.js`, decide name form ("يوسف بن أحمد" on site vs "يوسف أحمد" in Bio.pdf), replace "Dr. [Name]" placeholders.
## Known issues
- `bio.sep` i18n key is now unused (book list shows author on its own line); can be removed.
- Global `nav` styles in style.css hit any `<nav>`; `nav.bio-toc` overrides them.
- README title still "Dr. [Name]" placeholder and says "Stage 2".
- An old server may hold port 8080; preview config uses 8091.
- User's `!` shell in Claude doesn't load nvm (`~/.zshrc`); run npm in a real terminal or `source ~/.nvm/nvm.sh` first.
