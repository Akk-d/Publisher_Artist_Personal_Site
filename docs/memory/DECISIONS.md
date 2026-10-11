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
