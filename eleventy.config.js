import { base, asset, href, abs, defaultLang, origin } from "./lib/urls.js";

export default function (eleventyConfig) {
  // Copied as-is, never processed.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addFilter("href", href);                 // page link in a language
  eleventyConfig.addFilter("abs", abs);                   // absolute URL (canonical, sitemap)
  eleventyConfig.addFilter("asset", asset);               // /css/style.css -> with base path
  eleventyConfig.addFilter("prependOrigin", (p) => origin + p);
  eleventyConfig.addFilter("absDefault", (r) => abs(r, defaultLang));
  eleventyConfig.addFilter("hrefDefault", (r) => href(r, defaultLang));
  // Short book shelf: the featured books in their `featured` order (1 first), minus `skipSlug`, topped up in list order to `n`.
  eleventyConfig.addFilter("shelf", (books, skipSlug = "", n = 3) => {
    const pool = books.filter((b) => b.slug !== skipSlug);
    const featured = pool.filter((b) => b.featured).sort((x, y) => Number(x.featured) - Number(y.featured));
    return [...featured, ...pool.filter((b) => !b.featured)].slice(0, n);
  });

  // Article teaser: the opening paragraphs (up to `n`, stopping at the first heading/list) and the rest.
  eleventyConfig.addFilter("splitLead", (blocks = [], n = 2) => {
    let i = 0;
    while (i < n && i < blocks.length && typeof blocks[i] === "string") i++;
    return [blocks.slice(0, i), blocks.slice(i)];
  });

  return {
    dir: { input: "src", output: "_site" },
    pathPrefix: base,
    markdownTemplateEngine: "njk",
  };
}
