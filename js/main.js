(function () {
  var header = document.querySelector('.header');
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.mobile-menu');

  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 10); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.querySelector('.o').style.display = open ? 'none' : '';
    burger.querySelector('.c').style.display = open ? '' : 'none';
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });

  // scroll reveal
  var els = document.querySelectorAll('.reveal,.reveal-img');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else els.forEach(function (el) { el.classList.add('in'); });

  // before/after sliders
  document.querySelectorAll('.cmp').forEach(function (c) {
    var r = c.querySelector('input');
    r.addEventListener('input', function () { c.style.setProperty('--pos', r.value + '%'); });
  });

  // quote forms: opens the visitor's email app addressed to Usafi (no backend required)
  var TO = 'usaficleaningservice2023@gmail.com';
  document.querySelectorAll('form[data-quote]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var lines = [];
      new FormData(f).forEach(function (v, k) {
        if (v) lines.push((f.querySelector('[name="' + k + '"]').getAttribute('data-label') || k) + ': ' + v);
      });
      location.href = 'mailto:' + TO + '?subject=' + encodeURIComponent('Free Quote Request') +
        '&body=' + encodeURIComponent(lines.join('\n'));
      var ok = f.querySelector('.form-ok'); if (ok) ok.style.display = 'block';
      f.reset();
    });
  });
})();
// safety net: never leave content hidden if the observer doesn't fire
setTimeout(function () { document.querySelectorAll('.reveal,.reveal-img').forEach(function (el) { el.classList.add('in'); }); }, 2500);
