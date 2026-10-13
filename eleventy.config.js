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
  // Short book shelf: the featured books (first uploaded), minus `skipSlug`, topped up in list order to `n`.
  eleventyConfig.addFilter("shelf", (books, skipSlug = "", n = 3) => {
    const pool = books.filter((b) => b.slug !== skipSlug);
    return [...pool.filter((b) => b.featured), ...pool.filter((b) => !b.featured)].slice(0, n);
  });

  return {
    dir: { input: "src", output: "_site" },
    pathPrefix: base,
    markdownTemplateEngine: "njk",
  };
}
