// Floating dock navigation: decorate top + bottom nav with icons and
// a sliding active indicator that animates between items.

import { $, $$ } from './util.js';
import { icon } from './util/icons.js';

const NAV_ICONS = {
  home:      () => icon('sparkles', { size: 18 }),
  entdecken: () => icon('map',      { size: 18 }),
  lernen:    () => icon('cards',    { size: 18 }),
  quiz:      () => icon('target',   { size: 18 }),
  favoriten: () => icon('heart',    { size: 18 }),
};

function decorateLinks() {
  $$('.nav .nav-link').forEach((link) => {
    if (link.dataset.decorated) return;
    const route = link.dataset.route;
    const factory = NAV_ICONS[route];
    if (!factory) return;
    const ic = factory();
    link.prepend(ic);
    link.dataset.decorated = '1';
    // Add tooltip-style label for compact mobile view
    if (!link.querySelector('.nav-tip')) {
      const span = document.createElement('span');
      span.className = 'nav-tip';
      span.textContent = link.querySelector('span')?.textContent || '';
      link.appendChild(span);
    }
  });
}

function moveIndicator(nav) {
  if (!nav) return;
  const active = nav.querySelector('.nav-link.is-active');
  const indicator = nav.querySelector('.nav-indicator');
  if (!active || !indicator) return;
  const r = active.getBoundingClientRect();
  const nr = nav.getBoundingClientRect();
  indicator.style.transform = `translateX(${(r.left - nr.left + nav.scrollLeft).toFixed(1)}px)`;
  indicator.style.width = r.width.toFixed(1) + 'px';
  indicator.style.height = r.height.toFixed(1) + 'px';
}

let resizeBound = false;
let mutationObserver = null;

export function syncMobileNav() {
  const topActive = document.querySelector('.nav-link.is-active');
  const activeRoute = topActive?.dataset.route;
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.classList.toggle('is-active', item.dataset.route === activeRoute);
  });
}

export function initNav() {
  const nav = $('.nav');
  if (!nav) return;
  decorateLinks();

  // Inject the sliding indicator behind the links
  if (!nav.querySelector('.nav-indicator')) {
    const ind = document.createElement('span');
    ind.className = 'nav-indicator';
    nav.prepend(ind);
  }

  moveIndicator(nav);

  if (!mutationObserver) {
    mutationObserver = new MutationObserver(() => moveIndicator(nav));
    mutationObserver.observe(nav, { attributes: true, subtree: true, attributeFilter: ['class'] });
  }
  if (!resizeBound) {
    window.addEventListener('resize', () => moveIndicator(nav), { passive: true });
    resizeBound = true;
  }
}
