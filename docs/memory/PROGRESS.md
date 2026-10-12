# Progress
_Last updated: 2026-10-12_
## Current state
- Stages 1–7 committed: Eleventy 3 site, Arabic at `/`, English at `/en/`, per-language pages, hreflang, sitemap, robots, legacy redirects, real images, per-page header photos (`heroes.json`), James Clear–style biography, button renovation (Stage 6), darker brown text (Stage 7), deploy workflow.
- Stage 8 (`2d34f9b`..`bba67de`, not pushed):
  - Name is now "د. يوسف أحمد الميعاري" / "Dr. Yousef Ahmad Al-Maiari" everywhere (no "بن"/"bin"); "[الاسم]" placeholders in ar meta descs filled.
  - Home hero: user's new photo (`my-content/dr_photos/Pasted 2026-10-12 at 2.26.53 AM.heic` → `src/assets/images/dr/standing.jpg`, 960×1280) replaces the studio photo in the FRONT print frame. Back print still `portrait.jpg`. Caption `cap` = name only. On mobile the frame sits directly under the lede.
  - "Explore the books" hero button removed (desktop + mobile); `cta` i18n key deleted.
  - `stage8-additions.css`: `.print .ph` grid fix so tall photos stay inside the frame.
  - Arabic lede: commas, «و» only before last item: "طبيبٌ، أديبٌ، شاعرٌ ورسّام — كتبٌ عن العشق، الزمن والحياة، ولوحاتٌ من المرسم."
  - Paintings (uncommitted, user approved look): white photo backdrop cropped off horse/birch/flowers (canal untouched); cream mat dropped. Pinterest masonry via `src/js/masonry.js` on home + paintings page (CSS columns fallback). Home desktop (≥900px): title/sub/button beside a 2-col masonry (`.paint-feature`); user loved the mobile view.
- Biography page header photo unchanged (`portrait`). User calls the home hero / #about area "the about page", NOT the biography page.
- Stub sections ("coming soon"): qualifications, herbal medicine, publications.
- `site.js` has `preview: true` (shows "Design preview" banner).
## To confirm with user
- Apply the same «و» rule to home `meta.home.title`/`desc` ("طبيب وأديب وشاعر ورسّام") and elsewhere? (asked, no answer yet)
- Studio photo no longer shown in home hero (still on paintings page header). OK?
- Wording of the "At a glance" lines and card titles (ar + en), written by Claude from Bio.pdf facts.
- Whether to fold the 10-paragraph intro behind "Read more".
- "قيد الصدور" assigned to جمهورية الأقنعة ج2.
## Next up
0. Commit the painting work (awaiting approval). `my-content/` changes are the user's: originals of the 4 site paintings were deleted, ~24 new painting photos and 5 new book folders (`books/untitled folder 4–8`, PDFs) were added. Ask before committing those.
1. Add the new paintings from `my-content/paintings/` (crop white backdrop, thumb ≤800px, add to `paintings.js` + i18n `paintings`/`palt` titles). Masonry handles any count/ratio.
1b. Add the new books from `my-content/books/untitled folder 4–8`.
2. Push, set Pages source to GitHub Actions, confirm live site.
2. Qualifications page: could reuse the academic part of the bio until `my-content/qualifications/` has material.
3. Herbal medicine, publications, home & contact: wait for content in `my-content/`.
4. Before launch: `preview: false`, real domain in `lib/urls.js`, replace "Dr. [Name]" placeholders (README).
## Known issues
- Cropped painting JPEGs are larger than before (thumbs 157–347 KB); could recompress / use smaller thumbs or WebP.
- Built-in browser pane was hidden while testing, which pauses rAF/animations; masonry fade-in was not watched live.
- `bio.sep` i18n key unused; can be removed.
- Global `nav` styles in style.css hit any `<nav>`; `nav.bio-toc` overrides them.
- Book page "← back" link and viewer controls not restyled in Stage 6.
- README title still "Dr. [Name]" placeholder and says "Stage 2".
- Stale eleventy servers: user had paused (Ctrl+Z) servers holding 8081–8083 and an old one on 8080 serving outdated content; `npm start` then picks the next free port. Use Ctrl+C to stop; `npm start -- --port=8081` for a fixed port. Preview config uses 8091.
- User's shell may not load nvm: `source ~/.nvm/nvm.sh` before npm if "command not found".
