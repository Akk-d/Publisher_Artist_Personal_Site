/* Full-screen painting viewer (zoom, pan, pinch, keyboard).
   Logic is unchanged from the prototype; only the data source differs:
   paintings are now read from the page's own <figure class="frame"> elements. Paintings have no titles,
   so the caption slot shows the position ("3 / 21") in the digits of #vw[data-locale] (i18n num_locale). */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const B = document.body, vw = $('#vw'), vs = $('#vs');
  const frames = $$('.frame');
  if (!vw || !frames.length) return;
  const V = { i: 0, s: 1, x: 0, y: 0 }, ptr = new Map();
  let pd = 0;
  const isRTL = () => document.documentElement.dir === 'rtl';

  const draw = () => { vs.style.transform = `translate(${V.x}px,${V.y}px) scale(${V.s})`; vs.classList.toggle('z', V.s > 1); };
  function zoom(f, cx, cy) {
    const n = Math.min(8, Math.max(1, V.s * f)), r = n / V.s, R = vw.getBoundingClientRect(),
      ox = (cx ?? R.width / 2) - R.width / 2, oy = (cy ?? R.height / 2) - R.height / 2;
    V.x = ox - (ox - V.x) * r; V.y = oy - (oy - V.y) * r; V.s = n;
    if (n === 1) V.x = V.y = 0;
    draw();
  }
  function show(i) {
    V.i = (i + frames.length) % frames.length; V.s = 1; V.x = V.y = 0;
    const f = frames[V.i];
    vs.innerHTML = f.querySelector('svg,img').outerHTML;
    const im = vs.querySelector('img');
    if (im) {  // zoom uses the full-size file: AVIF when the browser chose AVIF for the thumbnail, else the JPEG
      im.removeAttribute('loading'); im.removeAttribute('srcset'); im.removeAttribute('sizes');
      const avif = /\.avif(\?|$)/.test(f.querySelector('img').currentSrc || '');
      const full = (avif && im.dataset.fullAvif) || im.dataset.full;
      if (full) im.src = full;
    }
    const n = x => x.toLocaleString(vw.dataset.locale);
    $('#vcap').textContent = `${n(V.i + 1)} / ${n(frames.length)}`;
    draw();
  }
  function openV(i) { vw.hidden = false; B.style.overflow = 'hidden'; show(i); $('#vx').focus(); }
  function closeV() { vw.hidden = true; B.style.overflow = ''; }

  document.addEventListener('click', e => { const f = e.target.closest('.frame'); if (f) openV(frames.indexOf(f)); });
  document.addEventListener('keydown', e => {
    const f = e.target.closest && e.target.closest('.frame');
    if (f && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openV(frames.indexOf(f)); }
    if (vw.hidden) return;
    if (e.key === 'Escape') closeV();
    if (e.key === 'ArrowRight') show(V.i + (isRTL() ? -1 : 1));
    if (e.key === 'ArrowLeft') show(V.i + (isRTL() ? 1 : -1));
    if (e.key === '+' || e.key === '=') zoom(1.4);
    if (e.key === '-') zoom(1 / 1.4);
  });
  $('#vx').onclick = closeV; $('#vp').onclick = () => show(V.i - 1); $('#vn').onclick = () => show(V.i + 1);
  $('#zi').onclick = () => zoom(1.5); $('#zo').onclick = () => zoom(1 / 1.5);
  $('#zr').onclick = () => { V.s = 1; V.x = V.y = 0; draw(); };
  vw.addEventListener('wheel', e => { e.preventDefault(); zoom(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX, e.clientY); }, { passive: false });
  vs.addEventListener('dblclick', e => { V.s > 1 ? (V.s = 1, V.x = V.y = 0, draw()) : zoom(3, e.clientX, e.clientY); });
  vs.addEventListener('pointerdown', e => { vs.setPointerCapture(e.pointerId); ptr.set(e.pointerId, [e.clientX, e.clientY]); vs.classList.add('d'); pd = 0; });
  vs.addEventListener('pointermove', e => {
    const p = ptr.get(e.pointerId); if (!p) return;
    if (ptr.size === 2) {
      const o = [...ptr.entries()].find(([k]) => k !== e.pointerId)[1], d = Math.hypot(e.clientX - o[0], e.clientY - o[1]);
      if (pd) zoom(d / pd, (e.clientX + o[0]) / 2, (e.clientY + o[1]) / 2); pd = d;
    } else if (V.s > 1) { V.x += e.clientX - p[0]; V.y += e.clientY - p[1]; draw(); }
    p[0] = e.clientX; p[1] = e.clientY;
  });
  ['pointerup', 'pointercancel'].forEach(t => vs.addEventListener(t, e => { ptr.delete(e.pointerId); pd = 0; if (!ptr.size) vs.classList.remove('d'); }));
})();
