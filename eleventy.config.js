// STAGE 1: skeleton. Output must be byte-identical to the prototype.
export default function (eleventyConfig) {
  // Copied as-is, no processing. Moved into css/ and js/ in Stage 2.
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/site.js");

  return {
    dir: { input: "src", output: "_site" },
    // .html files are treated as plain HTML: no template engine touches them.
    htmlTemplateEngine: false,
    markdownTemplateEngine: "njk",
  };
}
