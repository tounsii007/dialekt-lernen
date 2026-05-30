// Combo-HUD: animiertes Combo-/Multiplikator-Feedback während einer Session.
// Hört auf `dialekto:combo` (aus util/combo.js) und zeigt eine Badge, die bei
// jedem Treffer „bumpt", bei einem neuen Multiplikator-Tier groß aufpoppt und
// beim Abbruch kurz wackelt und verschwindet.

import { COMBO_TIMEOUT_MS } from './combo.js';

let badgeEl = null;
let liveRegion = null;
let hideTimer = null;

function getBadge() {
  if (badgeEl && document.body.contains(badgeEl)) return badgeEl;
  badgeEl = document.createElement('div');
  badgeEl.id = 'comboBadge';
  badgeEl.className = 'combo-badge';
  badgeEl.setAttribute('aria-hidden', 'true'); // rein visuell — SR via Live-Region
  badgeEl.innerHTML = `
    <span class="combo-badge-flame" aria-hidden="true">🔥</span>
    <span class="combo-badge-count"></span>
    <span class="combo-badge-mult"></span>
  `;
  document.body.appendChild(badgeEl);
  return badgeEl;
}

function getLiveRegion() {
  if (liveRegion && document.body.contains(liveRegion)) return liveRegion;
  liveRegion = document.createElement('div');
  liveRegion.className = 'sr-only';
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  document.body.appendChild(liveRegion);
  return liveRegion;
}

function announce(message) {
  const region = getLiveRegion();
  region.textContent = '';
  setTimeout(() => { region.textContent = message; }, 30);
}

// Animation neu anstoßen: Klasse entfernen, Reflow erzwingen, neu setzen.
function pop(el, cls) {
  el.classList.remove('is-bump', 'is-tierup');
  void el.offsetWidth;
  el.classList.add(cls);
}

export function initComboHud() {
  if (typeof document === 'undefined') return;
  document.addEventListener('dialekto:combo', (e) => {
    const d = e.detail || {};
    const badge = getBadge();

    if (d.broken) {
      if (badge.classList.contains('is-visible')) {
        badge.classList.add('is-broken');
        announce('Combo unterbrochen');
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
          badge.classList.remove('is-visible', 'is-broken');
        }, 600);
      }
      return;
    }

    // Erst ab 2 zeigen — bei 1 „wärmt" die Combo nur auf.
    if (!(d.count >= 2)) return;

    badge.classList.remove('is-broken');
    badge.querySelector('.combo-badge-count').textContent = `${d.count}× Combo`;
    const multEl = badge.querySelector('.combo-badge-mult');
    if (d.multiplier > 1) {
      multEl.textContent = `XP ×${d.multiplier}`;
      multEl.style.display = '';
    } else {
      multEl.textContent = '';
      multEl.style.display = 'none';
    }

    badge.classList.add('is-visible');
    pop(badge, d.tierUp ? 'is-tierup' : 'is-bump');
    if (d.tierUp) announce(`Combo-Bonus aktiv: XP mal ${d.multiplier}`);

    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { badge.classList.remove('is-visible'); }, COMBO_TIMEOUT_MS);
  });
}
