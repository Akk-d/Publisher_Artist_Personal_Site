// All per-page logic lives here: URLs, titles, canonical, hreflang.
import { languages, defaultLang, abs, asset, origin } from "../../lib/urls.js";
import { plain, plainDeep } from "../../lib/text.js";

const ROUTES = {
  home: () => "/",
  books: () => "/books/",
  paintings: () => "/paintings/",
  bio: () => "/biography/",
  herbal: () => "/herbal-medicine/",
  book: (d) => `/books/${d.entry.book.slug}/`,
};

// Sharing image per page (og:image): the book's cover, else a photo of the doctor.
const PAGE_PHOTO = { home: "studio", bio: "headshot" };
const photo = (d, key) => {
  const p = d.drphotos.find((x) => x.key === key);
  return { src: origin + asset(`/assets/images/dr/${key}.jpg`), w: p.w, h: p.h,
    alt: plain(d.i18n[d.entry.lang.code].photos[key].alt) };
};

// "Dr. Name" -> { prefix: "Dr.", name: "Name" }
const splitName = (n) => { const m = n.match(/^(د\.|Dr\.)\s*(.*)$/); return m ? { prefix: m[1], name: m[2] } : { name: n }; };

export default {
  eleventyComputed: {
    lang: (d) => d.entry.lang,
    book: (d) => d.entry.book,
    t: (d) => d.i18n[d.entry.lang.code],
    route: (d) => ROUTES[d.pageKey](d),
    permalink: (d) => `${d.entry.lang.prefix}${ROUTES[d.pageKey](d)}index.html`,
    title: (d) => {
      const t = d.i18n[d.entry.lang.code];
      return plain(d.pageKey === "book"
        ? `${t.books[d.entry.book.slug].title} — ${t.name}`
        : t.meta[d.pageKey].title);
    },
    description: (d) => {
      const t = d.i18n[d.entry.lang.code];
      return plain(d.pageKey === "book" ? t.books[d.entry.book.slug].d1 : t.meta[d.pageKey].desc);
    },
    canonical: (d) => abs(ROUTES[d.pageKey](d), d.entry.lang),
    alternates: (d) =>
      languages.map((l) => ({ code: l.code, href: abs(ROUTES[d.pageKey](d), l) })),
    xDefault: (d) => abs(ROUTES[d.pageKey](d), defaultLang),
    ogType: (d) => (d.pageKey === "book" ? "book" : d.pageKey === "bio" ? "profile" : "website"),
    ogImage: (d) => {
      if (d.pageKey === "book") {
        const b = d.entry.book, t = d.i18n[d.entry.lang.code];
        return { src: origin + asset(b.image), w: b.w, h: b.h, alt: plain(t.books[b.slug].title) };
      }
      return photo(d, PAGE_PHOTO[d.pageKey] || d.heroes[d.pageKey]);
    },
    // Structured data (JSON-LD) so search engines know who the doctor is and what his books are.
    jsonld: (d) => {
      const lang = d.entry.lang, t = d.i18n[lang.code];
      const home = abs("/", lang), canonical = abs(ROUTES[d.pageKey](d), lang);
      const own = splitName(t.name);
      const person = {
        "@type": "Person", "@id": abs("/", defaultLang) + "#person",
        name: own.name, ...(own.prefix && { honorificPrefix: own.prefix }),
        alternateName: [...new Set(languages.filter((l) => l.code !== lang.code)
          .map((l) => splitName(d.i18n[l.code].name).name))],
        url: abs("/", defaultLang), image: photo(d, "headshot").src, description: t.meta.home.desc,
        sameAs: ["https://whatsapp.com/channel/0029Vb8Z7lzInlqMtByzUd1C"],
      };
      const ref = { "@id": person["@id"] };
      const graph = [person];
      if (d.pageKey === "home") graph.push({ "@type": "WebSite", "@id": home + "#website", url: home,
        name: t.name, description: t.meta.home.desc, inLanguage: lang.code, publisher: ref, about: ref });
      if (d.pageKey === "bio") graph.push({ "@type": "ProfilePage", url: canonical, name: t.meta.bio.title,
        inLanguage: lang.code, mainEntity: ref });
      if (d.pageKey === "book") {
        const b = d.entry.book, bt = t.books[b.slug];
        graph.push({
          "@type": "Book", "@id": canonical + "#book", url: canonical, name: bt.title,
          ...(bt.sub && { alternativeHeadline: bt.sub }), description: bt.d1, image: origin + asset(b.image),
          author: ref, inLanguage: "ar", ...(bt.pub && { publisher: { "@type": "Organization", name: bt.pub.split(" — ")[0],
            ...(bt.pub.includes(" — ") && { address: bt.pub.split(" — ")[1] }) } }),
          ...(b.year && { datePublished: b.year }), ...(b.isbn && { isbn: b.isbn }),
          ...(b.pages && { numberOfPages: Number(b.pages) }),
        });
        graph.push({ "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: t.name, item: home },
          { "@type": "ListItem", position: 2, name: t.n_books, item: abs("/books/", lang) },
          { "@type": "ListItem", position: 3, name: bt.title, item: canonical },
        ] });
      }
      return plainDeep({ "@context": "https://schema.org", "@graph": graph });
    },
  },
};
