/* Pinterest-style masonry for the painting galleries (.gal2 on the paintings page; the home .gal-home has a fixed layout).
   Each painting goes into the currently shortest column, keeping DOM order for keyboard and screen readers.
   Column count follows the gallery width (CSS --min = narrowest column). Very wide paintings may span two
   columns; very tall ones are capped in height (--maxh) so no single work dominates.
   Without this script (or ResizeObserver) the CSS columns fallback in stage8-additions.css is used. */
(function () {
  const grids = [...document.querySelectorAll('.gal:not(.gal-home), .gal2')];
  if (!grids.length || !('ResizeObserver' in window)) return;
  const ROW = 2; // px per grid row; items span ceil(height / ROW) rows

  function layout(g) {
    const items = [...g.children];
    const cs = getComputedStyle(g);
    const gap = parseFloat(cs.columnGap) || 0;
    const min = parseFloat(cs.getPropertyValue('--min')) || 240;
    const W = g.clientWidth;
    if (!W || !items.length) return;
    let cols = Math.floor((W + gap) / (min + gap));
    cols = Math.min(items.length, Math.max(cols, W >= 300 ? 2 : 1));
    const colW = (W - gap * (cols - 1)) / cols;
    g.style.setProperty('--cols', cols);
    g.style.setProperty('--maxh', Math.round(colW * 2) + 'px');
    g.classList.add('is-masonry');

    const filled = new Array(cols).fill(0); // rows used per column
    items.forEach((it, i) => {
      it.style.setProperty('--i', i);
      const r = parseFloat(it.style.getPropertyValue('--r')) || 1;
      const span = cols >= 3 && r >= 1.9 ? 2 : 1;
      let best = 0, top = Infinity;
      for (let c = 0; c + span <= cols; c++) {
        const h = Math.max(...filled.slice(c, c + span));
        if (h < top) { top = h; best = c; }
      }
      it.style.gridColumn = `${best + 1} / span ${span}`;
      it.style.gridRow = 'auto';
      const rows = Math.ceil((it.getBoundingClientRect().height + gap) / ROW);
      it.style.gridRow = `${top + 1} / span ${rows}`;
      for (let c = best; c < best + span; c++) filled[c] = top + rows;
    });
  }

  let queued = false;
  const schedule = () => { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; grids.forEach(layout); }); };
  const ro = new ResizeObserver(schedule);
  grids.forEach(g => { ro.observe(g); [...g.children].forEach(it => ro.observe(it)); });
  if (document.fonts) document.fonts.ready.then(schedule);
  // Paintings fade in (staggered, CSS) the first time a gallery scrolls into view.
  const reveal = g => g.classList.add('is-in');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
    grids.forEach(g => io.observe(g));
  } else grids.forEach(reveal);
  schedule();
})();
