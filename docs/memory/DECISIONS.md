# Decisions
Format: - YYYY-MM-DD: <decision>. <reason>.

- 2026-10-11: Eleventy 3 static site generator, no frontend framework. Content site with no backend; simple build and free hosting (inferred).
- 2026-10-11: Nunjucks templates, Node ESM config. Eleventy's default rich templating; modern JS modules (inferred).
- 2026-10-11: No database; all content in `src/_data/` JSON/JS files. Small, rarely changing content, easy to edit by hand (inferred).
- 2026-10-11: Hosted on GitHub Pages as a project site (`PATH_PREFIX=/Publisher_Artist_Personal_Site/`), domain configurable in `lib/urls.js`. Free hosting; custom domain later (inferred).
- 2026-10-11: Arabic is the default language at `/`, other languages under `/<code>/`; languages defined in one list in `lib/urls.js`. Primary audience is Arabic; adding a language = one line + one i18n file (inferred).
- 2026-10-11: Pages generated from `entries.js` × languages with routing in `pages.11tydata.js`. One template per page type, SEO (canonical/hreflang) computed centrally (inferred).
- 2026-10-11: Keep prototype `style.css` untouched; new CSS goes in `stageN-additions.css`; `prototype-original/` frozen. Preserve the approved design and allow diffing against it (inferred).
- 2026-10-11: Old prototype URLs (`book-1.html` etc.) kept as meta-refresh redirects via `legacy.json`. Avoid breaking existing links on static hosting (inferred).
- 2026-10-11: Custom `tools/check-site.mjs` instead of a test framework. Zero extra dependencies; checks links, assets and SEO tags on built output (inferred).
- 2026-10-11: `my-content/` is the committed source of truth for content; `my-content.zip` removed as a duplicate. One canonical place for the client's material.
- 2026-10-11: Page header photos use only the client's own photos (no generated images), mapped per page in `heroes.json`; pages without a fitting photo get none (herbal medicine). Keep imagery authentic.
- 2026-10-11: Long-form content (biography) stored in i18n as structured arrays (`bio.intro`, `bio.parts[]` with p/list/works/books), Arabic keeping the source's full diacritics; English is a Claude translation approved by the user. Keeps all text in i18n while letting templates loop.
- 2026-10-11: Biography laid out like jamesclear.com/about (user request): summary checklist + contents + ruled sections, all source text kept visible. Long pages stay readable without cutting client text.
- 2026-10-11: Deploy via GitHub Actions (build on push to main), `_site/` stays gitignored. No manual deploy step; checks gate publishing.
- 2026-10-12: Buttons restyled for visibility (users couldn't see the menu): solid ink fill, 44px targets, lapis hover, gold focus, CSS-only ☰/✕ icon (no new i18n text). Stage 6 CSS loads after per-page styles so it wins over them.
- 2026-10-12: Text darkened on user feedback but must stay warm brown, never black/grey (user's explicit rule). Done by overriding `--ink`/`--soft` tokens in a stage CSS file, not editing style.css.
- 2026-10-12: Name shown as "يوسف أحمد الميعاري" / "Yousef Ahmad Al-Maiari" without "بن"/"bin" (user request; matches Bio.pdf).
- 2026-10-12: Arabic lists use commas with «و» only before the last item, like English "A, B and C" (user's style rule; repeated «و» is discouraged).
- 2026-10-12: Paintings shown without the cream paper mat and with the white photo backdrop cropped off (user request); the photographed frame is the frame. Gallery is a JS shortest-column masonry (user wanted Pinterest) with a CSS-columns fallback; tall works capped at 2× column width, very wide ones (ratio ≥1.9) span 2 columns, never cropped.
- 2026-10-12: Book descriptions stored in i18n as `books.<slug>.desc[]` (string = paragraph, `[a,b]` = verse hemistichs, `{h}` = heading), full Arabic with diacritics, shown as 3 items + `<details>` for the rest. Keeps client text complete while pages stay scannable. Full book PDFs are not published (user: no reading/downloading yet); "Read the book" is a disabled placeholder.
- 2026-10-12: Book covers framed by a static gold hairline mat (`.bk-frame`) with the book turning on its spine on hover (user wanted a motion other than lifting). Frame stays still so the motion reads as a book, not a card.
- 2026-10-13: Full book PDFs never go in git, history included (user: full books must not be public yet; repo is pushed to GitHub). They stay in `my-content/` on disk and are ignored by exact path, so description PDFs in the same folders remain tracked.
- 2026-10-13: Arabic Aref Ruqaa headings use weight 400 site-wide (stage10, global); diacritics kept in full. The bold cut made stacked marks (shadda + kasra) collide; user chose lighter weight over stripping marks.
- 2026-10-13: Accent `--lapis` changed from blue #22405a to tan-leather brown #6a3a1e (user wanted an accent closer to the books/paper/ink theme; picked from 6 book-and-ink options). Overridden in stage10 CSS; variable name kept so all existing rules follow.
- 2026-10-13: Paintings have no visible titles or names (user request); alt text only (i18n `palt`, slug keys). Viewer shows position "n / total" instead. Home shows a hand-picked subset (`home` order in `paintings.js`), the paintings page shows all.
- 2026-10-13: Carved/ornate frames whose backdrop shows between the carving get a transparent AVIF cut-out (`cut: true`) instead of a rectangular crop (user saw white/wall margins). AVIF because ImageIO can't write WebP and PNG is heavier; these use a shaped drop-shadow, not the box shadow.
- 2026-10-13: Qualifications and Publications pages removed (user request); academic details live in the biography only. Nav "About" goes to the home page top, not `/#about` (user chose this over scroll-without-hash or linking to the biography).
