'use strict';
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.mobile-nav');
const closeMenu = () => {
  if (!toggle || !menu) return;
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-label','Otwórz menu');
  menu.hidden = true;
  document.body.classList.remove('menu-open');
};
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const shouldOpen = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(shouldOpen));
    toggle.setAttribute('aria-label', shouldOpen ? 'Zamknij menu' : 'Otwórz menu');
    menu.hidden = !shouldOpen;
    document.body.classList.toggle('menu-open', shouldOpen);
  });
  menu.querySelectorAll('a').forEach(anchor => anchor.addEventListener('click',closeMenu));
  document.addEventListener('keydown', event => { if(event.key === 'Escape') closeMenu(); });
  window.matchMedia('(min-width: 981px)').addEventListener('change', event => { if(event.matches) closeMenu(); });
}
const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
const navLinks = [...document.querySelectorAll('.desktop-nav .nav-link')];
const sections = [...document.querySelectorAll('header#start, main section[id]')];
if ('IntersectionObserver' in window) {
 const observer = new IntersectionObserver(entries => {
   const eligible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio);
   if (!eligible.length) return;
   const id = eligible[0].target.id;
   navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
 }, {rootMargin:'-20% 0px -68% 0px', threshold: [0,0.1,0.5]});
 sections.forEach(section=>observer.observe(section));
}
