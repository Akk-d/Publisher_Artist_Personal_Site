# Progress
_Last updated: 2026-10-12_
## Current state
- Stages 1–6 committed: Eleventy 3 site, Arabic at `/`, English at `/en/`, per-language pages, hreflang, sitemap, robots, legacy redirects, real images, per-page header photos (`heroes.json`), James Clear–style biography (Stage 5, `stage5-additions.css`), deploy workflow.
- Stage 6 (`f817f23`): button renovation in `src/css/stage6-additions.css` (loaded last in `base.njk`): solid ink mobile menu button with CSS ☰/✕ icon and lapis open state, framed open-menu panel, segmented language switcher, larger `.btn`/`.btn.ghost` with offset shadow (RTL-aware), outlined "Back to top" with ↑. Build + check pass; checked ar/en, desktop + mobile.
- Stage 7 (`e65bd9a`): darker text per user feedback, still brown: `--ink` #2a2118→#241a10, `--soft` #5b4c38→#45372a (contrast on paper 10.6:1 / 7.1:1) in `stage7-additions.css`. Build + check pass. If still too light, next step ~#3d3024 for `--soft`.
- Stub sections ("coming soon"): qualifications, herbal medicine, publications.
- `site.js` has `preview: true` (shows "Design preview" banner).
## To confirm with user
- New untracked photo `my-content/dr_photos/Pasted 2026-10-12 at 2.26.53 AM.heic` (added by user): not yet used on the site.
- Wording of the "At a glance" lines and card titles (ar + en), written by Claude from Bio.pdf facts.
- Whether to fold the 10-paragraph intro behind "Read more" (currently all visible).
- "قيد الصدور" assigned to جمهورية الأقنعة ج2 (it sat on its own line in the PDF).
- Source fixes: "مِنْهَجُ"→"مَنْهَجُ" in دستوري; stray "ن" before التحصيل removed.
## Next up
1. Push, set Pages source to GitHub Actions, confirm live site (incl. new buttons).
2. Qualifications page: could reuse the academic part of the bio (degrees) until `my-content/qualifications/` has material.
3. Herbal medicine, publications: wait for content in `my-content/`.
4. Home & contact content (`my-content/home-and-contact/` empty).
5. Before launch: `preview: false`, real domain in `lib/urls.js`, decide name form ("يوسف بن أحمد" on site vs "يوسف أحمد" in Bio.pdf), replace "Dr. [Name]" placeholders.
## Known issues
- `bio.sep` i18n key is now unused (book list shows author on its own line); can be removed.
- Global `nav` styles in style.css hit any `<nav>`; `nav.bio-toc` overrides them.
- Book page "← back" link (`.type`) and viewer controls were not restyled in Stage 6.
- README title still "Dr. [Name]" placeholder and says "Stage 2".
- An old server may hold port 8080; preview config uses 8091.
- User's `!` shell in Claude doesn't load nvm (`~/.zshrc`); run npm in a real terminal or `source ~/.nvm/nvm.sh` first.
