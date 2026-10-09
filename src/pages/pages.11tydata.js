// All per-page logic lives here: URLs, titles, canonical, hreflang.
import { languages, defaultLang, abs } from "../../lib/urls.js";

const ROUTES = {
  home: () => "/",
  books: () => "/books/",
  paintings: () => "/paintings/",
  bio: () => "/biography/",
  qualifications: () => "/qualifications/",
  herbal: () => "/herbal-medicine/",
  publications: () => "/publications/",
  book: (d) => `/books/${d.entry.book.slug}/`,
};

export default {
  eleventyComputed: {
    lang: (d) => d.entry.lang,
    book: (d) => d.entry.book,
    t: (d) => d.i18n[d.entry.lang.code],
    route: (d) => ROUTES[d.pageKey](d),
    permalink: (d) => `${d.entry.lang.prefix}${ROUTES[d.pageKey](d)}index.html`,
    title: (d) => {
      const t = d.i18n[d.entry.lang.code];
      return d.pageKey === "book"
        ? `${t.books[d.entry.book.slug].title} — ${t.name}`
        : t.meta[d.pageKey].title;
    },
    description: (d) => {
      const t = d.i18n[d.entry.lang.code];
      return d.pageKey === "book" ? t.books[d.entry.book.slug].d1 : t.meta[d.pageKey].desc;
    },
    canonical: (d) => abs(ROUTES[d.pageKey](d), d.entry.lang),
    alternates: (d) =>
      languages.map((l) => ({ code: l.code, href: abs(ROUTES[d.pageKey](d), l) })),
    xDefault: (d) => abs(ROUTES[d.pageKey](d), defaultLang),
  },
};
