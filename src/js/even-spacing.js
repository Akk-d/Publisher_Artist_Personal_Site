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

  // The Arabic sample makes the browser fetch the font's Arabic subset, not only its Latin one.
  const sample = "عَ ل";
  Promise.all([document.fonts.ready, document.fonts.load(`16px "${FONT}"`, sample)]).then(() => {
    if (!document.fonts.check(`16px "${FONT}"`, sample)) return;
    document.querySelectorAll("h1, h2, h3").forEach(even);
  });
})();
