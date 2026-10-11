# Project: dr-name-site
Multilingual (Arabic default, English) static personal site for a doctor, author and painter: books, paintings, biography, qualifications, herbal medicine, publications. Built with Eleventy, published on GitHub Pages.

## Stack & commands
- Run: `npm start` (Eleventy dev server with live reload)
- Test: `npm run build && npm run check` (link/asset/SEO checks on `_site/`)
- Build/lint: `npm run build` · GitHub Pages build: `npm run build:pages` then `npm run check:pages`
- Clean: `npm run clean`

## Conventions
- Node ESM (`"type": "module"`); templates are Nunjucks (`.njk`).
- All user-facing text lives in `src/_data/i18n/{ar,en}.json`; never hard-code text in templates. Keep both files in sync (same keys).
- Book facts in `src/_data/books.json`; book titles/descriptions in i18n under `books.<slug>`.
- Languages, domain and base path only in `lib/urls.js`. Always build links with filters: `href`, `asset`, `abs` (never raw `/...` paths) so `PATH_PREFIX` works.
- Pages are generated per language via `src/_data/entries.js` + `src/pages/pages.11tydata.js` (routes, titles, canonical, hreflang). Add a page = add a route there + an entry + i18n `meta`/`sections` keys.
- `src/css/style.css` is the original prototype design; don't edit it. Put new styles in `src/css/stageN-additions.css`.
- `prototype-original/` is a frozen copy of the prototype. Never edit.
- Arabic is RTL: use logical CSS properties (`inset-inline`, etc.) and `[dir=rtl]` overrides.
- Unfinished sections use `components/section-stub.njk`.
- Commits are named by stage ("Stage N: ...").

## Memory system
Project memory lives in `docs/memory/`. Do NOT read these files unless needed:
- `PROGRESS.md`: current state and next steps (read at the start of each task)
- `DECISIONS.md`: past decisions and reasons (read before changing architecture or dependencies)
- `ARCHITECTURE.md`: where things live (read when you need to find code)
Never re-decide something recorded in DECISIONS.md without asking me.
At the end of each task I will run /wrapup to update memory.
