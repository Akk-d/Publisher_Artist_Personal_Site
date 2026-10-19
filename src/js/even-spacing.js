/* Stage 22. Even word gaps in Arabic calligraphic headings (Aref Ruqaa).
   The font's word space is very narrow (0.15em), so the gap the eye sees depends on the letters on each side: before «وَ»
   words almost touch (0.15em), after «عَلَى» they float apart (0.55em). Once the font has loaded, each word is drawn on a
   canvas and, row by row, the closest approach of the two neighbouring words is found; every space then gets a margin so
   that this visible gap is TARGET em everywhere (the font's typical gap). Without JS, or if the font did not load,
   headings keep the font's own spacing. Overrides any CSS word-spacing on the heading (stage17 #part-7-h).
   A «و» or «ر» tail can sweep under the next word, so the words' outer outlines are also kept MIN_EDGE apart, and a
   word's leading «وَ» is pulled onto the rest of its word (stage17 did this by hand with .join). */
(() => {
  const TARGET = 0.24; // visible gap between words, in em (median of the site's headings)
  const MIN_EDGE = 0.14; // smallest gap between the words' outer outlines, in em
  const INNER = 0.06; // largest gap after a word's leading «وَ», in em
  const WAW = /^\u0648[\u064B-\u065F\u0670]*/; // «و» with its marks
  const FONT = "Aref Ruqaa";
  if (document.documentElement.dir !== "rtl" || !document.fonts) return;

  const S = 100, H = 300, BASE = 180, PAD = 20;
  const cache = new Map();

  // Per pixel row: ink distance from the word's left edge (L) and right edge (R) of its advance box; null = no ink.
  function profile(word, font, ls) {
    const key = font + "|" + ls + "|" + word;
    if (cache.has(key)) return cache.get(key);
    const cv = document.createElement("canvas");
    const c = cv.getContext("2d", { willReadFrequently: true });
    const setup = () => { c.font = font; c.direction = "rtl"; c.textAlign = "right"; if ("letterSpacing" in c) c.letterSpacing = ls; };
    setup();
    const adv = c.measureText(word).width;
    const W = Math.ceil(adv) + 2 * PAD;
    cv.width = W; cv.height = H; // resizing resets the context
    setup();
    const X = W - PAD;
    c.fillText(word, X, BASE);
    const d = c.getImageData(0, 0, W, H).data;
    const L = [], R = [];
    for (let y = 0; y < H; y++) {
      let l = -1, r = -1;
      for (let x = 0; x < W; x++) if (d[(y * W + x) * 4 + 3] > 60) { if (l < 0) l = x; r = x; }
      L.push(l < 0 ? null : (l - (X - adv)) / S);
      R.push(r < 0 ? null : (X - 1 - r) / S);
    }
    const p = { L, R };
    cache.set(key, p);
    return p;
  }

  function even(el) {
    const cs = getComputedStyle(el);
    if (!cs.fontFamily.replace(/["']/g, "").startsWith(FONT)) return;
    const words = el.textContent.trim().split(/\s+/);
    if (words.length < 2) return;
    const ls = cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
    const font = `${cs.fontStyle} ${cs.fontWeight} ${S}px ${cs.fontFamily}`;
    const em = parseFloat(cs.fontSize);

    // Wrap each space between words in a span (spaces break Arabic joining, so shaping is unchanged).
    const gaps = [], joins = [];
    let seenWord = false, atStart = true; // atStart: the next text begins a word
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const n of nodes) {
      const parts = n.data.split(/(\s+)/);
      if (parts.length < 2 && !(atStart && WAW.test(n.data))) { if (n.data) { seenWord = seenWord || !!n.data.trim(); atStart = !n.data.trim(); } continue; }
      const frag = document.createDocumentFragment();
      for (const p of parts) {
        if (!p) continue;
        if (/^\s+$/.test(p) && seenWord) {
          const s = document.createElement("span");
          s.className = "wsp"; s.textContent = " ";
          gaps.push(s); frag.append(s);
          atStart = true;
        } else {
          const w = atStart && !/^\s+$/.test(p) && p.match(WAW);
          if (w && p.length > w[0].length) {
            const j = document.createElement("span");
            j.className = "wj"; j.textContent = w[0];
            joins.push([j, p.slice(w[0].length)]);
            frag.append(j, p.slice(w[0].length));
          } else frag.append(p);
          if (p.trim()) seenWord = true;
          atStart = !p.trim();
        }
      }
      n.replaceWith(frag);
    }
    // A space after the last word is not a gap.
    while (gaps.length > words.length - 1) gaps.pop().replaceWith(" ");
    if (gaps.length !== words.length - 1) return;

    // A leading «وَ» does not join the next letter, and this font leaves a gap after it as wide as a word space;
    // pull the rest of the word in so the gap inside the word is at most INNER em (never widened).
    for (const [j, rest] of joins) {
      const a = profile(j.textContent, font, ls), b = profile(rest.split(/\s/)[0], font, ls);
      let ink = Infinity;
      for (let y = 0; y < H; y++) if (a.L[y] !== null && b.R[y] !== null) ink = Math.min(ink, a.L[y] + b.R[y]);
      if (isFinite(ink) && ink > INNER) j.style.marginInlineEnd = (INNER - ink).toFixed(3) + "em";
    }

    el.style.wordSpacing = "0";
    gaps.forEach((s, i) => {
      const a = profile(words[i], font, ls), b = profile(words[i + 1], font, ls); // RTL: words[i] is on the right
      // ink: closest approach at the same height. edge: gap between the words' outer outlines at any height; a «و» or
      // «ر» tail sweeping under the next word's «ا» leaves a wide gap per row but reads as touching, so edge never
      // drops below MIN_EDGE.
      let ink = Infinity, aL = Infinity, bR = Infinity;
      for (let y = 0; y < H; y++) {
        if (a.L[y] !== null) aL = Math.min(aL, a.L[y]);
        if (b.R[y] !== null) bR = Math.min(bR, b.R[y]);
        if (a.L[y] !== null && b.R[y] !== null) ink = Math.min(ink, a.L[y] + b.R[y]);
      }
      if (!isFinite(ink)) return;
      const space = s.getBoundingClientRect().width / em;
      const m = Math.max(TARGET - space - ink, MIN_EDGE - space - aL - bR);
      s.style.marginInlineEnd = m.toFixed(3) + "em";
    });
  }

  /* Body text (Amiri): the font tucks some letters under a non-joining letter's tail (e.g. «ك» under «ر» in «المعركة»),
     but a vowel mark on that letter («رَ») breaks the kerning pair and leaves a gap as wide as a word space («المعر كة»).
     Vowel marks take no width, so a word that gets narrower when the marks after such a letter are removed has lost
     kerning there; that letter is wrapped in a span with the lost amount as a negative margin. */
  const BODY_FONT = "Amiri";
  const LOST = /[\u0627\u0623\u0625\u0622\u062F\u0630\u0631\u0632\u0648\u0624][\u064B-\u065F\u0670]+(?=[\u0621-\u064A])/g;
  const kc = document.createElement("canvas").getContext("2d");
  const widths = new Map();
  const width = (font, w) => {
    const key = font + "|" + w;
    if (!widths.has(key)) { kc.font = font; kc.direction = "rtl"; kc.fontKerning = "normal"; widths.set(key, kc.measureText(w).width / S); }
    return widths.get(key);
  };

  function kern(root) {
    const fonts = new Map();
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    const has = new RegExp(LOST.source); // not global: .test() on a /g regex keeps state between strings
    while (walker.nextNode()) if (has.test(walker.currentNode.data)) nodes.push(walker.currentNode);
    for (const n of nodes) {
      const parent = n.parentElement;
      if (!parent || parent.closest("script, style, h1, h2, h3")) continue;
      if (!fonts.has(parent)) {
        const cs = getComputedStyle(parent);
        fonts.set(parent, cs.fontFamily.replace(/["']/g, "").startsWith(BODY_FONT) ? `${cs.fontStyle} ${cs.fontWeight} ${S}px ${cs.fontFamily}` : null);
      }
      const font = fonts.get(parent);
      if (!font) continue;
      const t = n.data, fixes = [];
      for (const m of t.matchAll(LOST)) {
        const start = Math.max(t.lastIndexOf(" ", m.index), t.lastIndexOf("\n", m.index)) + 1;
        let end = t.slice(m.index).search(/\s/);
        end = end < 0 ? t.length : m.index + end;
        const word = t.slice(start, end), i = m.index - start;
        const bare = word.slice(0, i + 1) + word.slice(i + m[0].length);
        const lost = width(font, word) - width(font, bare);
        if (lost > 0.02) fixes.push([m.index, m[0].length, lost]);
      }
      if (!fixes.length) continue;
      const frag = document.createDocumentFragment();
      let at = 0;
      for (const [i, len, lost] of fixes) {
        frag.append(t.slice(at, i));
        const k = document.createElement("span");
        k.className = "kn"; k.textContent = t.slice(i, i + len);
        k.style.marginInlineEnd = (-lost).toFixed(3) + "em";
        frag.append(k);
        at = i + len;
      }
      frag.append(t.slice(at));
      n.replaceWith(frag);
    }
  }

  // The Arabic sample makes the browser fetch the fonts' Arabic subsets, not only their Latin ones.
  const sample = "عَ ل";
  Promise.all([document.fonts.ready, document.fonts.load(`16px "${FONT}"`, sample), document.fonts.load(`16px "${BODY_FONT}"`, sample)]).then(() => {
    if (document.fonts.check(`16px "${FONT}"`, sample)) document.querySelectorAll("h1, h2, h3").forEach(even);
    if (document.fonts.check(`16px "${BODY_FONT}"`, sample)) kern(document.body);
  });
})();
