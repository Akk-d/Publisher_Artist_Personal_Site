// Keeps flat <name>.html output (e.g. book-1.html) so every existing
// relative link and asset path behaves exactly as in the prototype.
// Stage 5 will decide on clean URLs; this file is the single switch for it.
export default {
  permalink: (data) => `${data.page.filePathStem}.html`,
};
