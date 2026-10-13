/* Herbal Medicine page: a link to a question or article (#q-…, #e-…) opens its folded text. */
(function () {
  function openTarget() {
    var el = location.hash && document.getElementById(location.hash.slice(1));
    if (!el) return;
    if (el.tagName === 'DETAILS') el.open = true;
    var more = el.querySelector && el.querySelector(':scope > .hm-more');
    if (more) more.open = true;
  }
  openTarget();
  window.addEventListener('hashchange', openTarget);
})();
