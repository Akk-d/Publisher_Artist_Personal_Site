/* Herbal Medicine page: essays and questions now have their own pages. An old shared link to one of them
   (#q-…, #e-…) opens that page. Clicks on the page's own contents list (#e-…) still just scroll. */
(function () {
  var el = location.hash && document.getElementById(location.hash.slice(1));
  if (!el) return;
  var link = el.matches('a.hm-qa-link') ? el : el.querySelector('.hm-more-link a');
  if (link) location.replace(link.href);
})();
