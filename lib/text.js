// Arabic tashkeel (harakat, tanween, shadda, sukun, dagger alif) removed: for search titles and descriptions only.
// The page text itself keeps its tashkeel.
export const plain = (s) => (typeof s === "string" ? s.replace(/[ً-ْٰ]/g, "") : s);

// The same for every string inside an object (structured data).
export const plainDeep = (v) =>
  Array.isArray(v) ? v.map(plainDeep)
  : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, plainDeep(x)]))
  : plain(v);
