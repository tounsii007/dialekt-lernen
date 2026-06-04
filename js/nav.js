// Floating dock navigation: decorate top + bottom nav with icons and
// a sliding active indicator that animates between items.

import { $, $$, parseHash } from './util.js';
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

// Aktuelle Route (interner Key) aus der URL, Default 'home'.
function currentRoute() {
  return parseHash().segs[0] || 'home';
}

// „Mehr"-Menü: markiert den aktiven Untereintrag + den Mehr-Button, falls die
// aktuelle Route in der Überlauf-Gruppe liegt. Der Indikator nutzt dann den
// Mehr-Button als Ziel (er trägt .nav-link).
function syncMoreActive() {
  const moreBtn = document.querySelector('.nav-more-btn');
  if (!moreBtn) return;
  const route = currentRoute();
  let activeInMore = false;
  document.querySelectorAll('.nav-more-link').forEach(a => {
    const on = a.dataset.route === route;
    a.classList.toggle('is-active', on);
    if (on) activeInMore = true;
  });
  moreBtn.classList.toggle('is-active', activeInMore);
}

// „Mehr" ist ein Disclosure (kein Menü): Button mit aria-expanded klappt einen
// Container aus, dessen Inhalt normale, per Tab erreichbare Links sind. Daher
// KEIN role=menu / menuitem und kein Roving-Tabindex — die Links behalten ihre
// native Link-Semantik. Verdrahtet werden Toggle, Außenklick, Escape (schließt
// + Fokus zurück zum Button) und „Auswahl schließt".
function wireMoreDropdown() {
  const more = document.querySelector('.nav-more');
  if (!more || more.dataset.bound) return;
  more.dataset.bound = '1';
  const btn = more.querySelector('.nav-more-btn');
  const menu = more.querySelector('.nav-more-menu');
  if (!btn || !menu) return;
  const isOpen = () => !menu.hidden;
  const setOpen = (open, { focusBtn = false } = {}) => {
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) document.dispatchEvent(new CustomEvent('dialekto:menuOpen', { detail: menu }));
    else if (focusBtn) btn.focus();
  };
  btn.addEventListener('click', (e) => { e.stopPropagation(); setOpen(menu.hidden); });
  menu.addEventListener('click', () => setOpen(false));
  document.addEventListener('click', (e) => { if (!more.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !isOpen()) return;
    // Fokus nur zurückgeben, wenn er innerhalb des Disclosure liegt — sonst
    // (Escape an anderer Stelle) nur schließen, ohne den Fokus zu verschieben.
    setOpen(false, { focusBtn: more.contains(document.activeElement) });
  });
  // Anderes Topbar-Menü öffnet → dieses schließen.
  document.addEventListener('dialekto:menuOpen', (e) => { if (e.detail !== menu) setOpen(false); });
}

export function initNav() {
  const nav = $('.nav');
  if (!nav) return;
  decorateLinks();
  wireMoreDropdown();
  syncMoreActive();

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
