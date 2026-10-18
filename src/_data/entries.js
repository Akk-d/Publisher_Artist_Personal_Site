// One entry per page per language. Eleventy turns each entry into one HTML file.
import { readFileSync } from "node:fs";
import { languages } from "../../lib/urls.js";
import herbalArticles from "./herbalArticles.js";
const books = JSON.parse(readFileSync(new URL("./books.json", import.meta.url)));

export default {
  home: languages.map((lang) => ({ lang })),
  books: languages.map((lang) => ({ lang })),
  paintings: languages.map((lang) => ({ lang })),
  bio: languages.map((lang) => ({ lang })),
  herbal: languages.map((lang) => ({ lang })),
  book: languages.flatMap((lang) => books.map((book) => ({ lang, book }))),
  article: languages.flatMap((lang) => herbalArticles.map((article) => ({ lang, article }))),
};
