// Languages, base path and URL helpers. Edit here to add a language or change domain.
export const languages = [
  { code: "ar", dir: "rtl", label: "عربي", prefix: "",    ogLocale: "ar_AR" }, // default language, lives at /
  { code: "en", dir: "ltr", label: "EN",   prefix: "/en", ogLocale: "en_US" },
  // To add French later: { code: "fr", dir: "ltr", label: "FR", prefix: "/fr", ogLocale: "fr_FR" }
  // then create src/_data/i18n/fr.json. Nothing else changes.
];
export const defaultLang = languages[0];

// Where the site is published. Change both when you move to a custom domain.
export const origin = process.env.SITE_ORIGIN || "https://akk-d.github.io";
let p = process.env.PATH_PREFIX || "/"; // GitHub Pages project site: /Publisher_Artist_Personal_Site/
if (!p.startsWith("/")) p = "/" + p;
if (!p.endsWith("/")) p += "/";
export const base = p;

export const asset = (path) => base + path.replace(/^\//, "");
export const href = (route, lang) =>
  base + (lang.prefix ? lang.prefix.slice(1) + "/" : "") + route.replace(/^\//, "");
export const abs = (route, lang) => origin + href(route, lang);
