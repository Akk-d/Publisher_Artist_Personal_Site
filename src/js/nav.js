/* Mobile menu toggle */
(function () {
  var menu = document.getElementById('menu'), links = document.getElementById('links');
  if (!menu || !links) return;
  menu.onclick = function (e) {
    e.currentTarget.setAttribute('aria-expanded', links.classList.toggle('open'));
  };
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    });
  });
})();
