// Progressive Disclosure — kontextuelle Tipps, die nach und nach erscheinen,
// statt alles auf einmal zu zeigen (Ergänzung zur Willkommens-Tour).
//
// Ein Tipp erscheint höchstens einmal, nur in seinem Kontext (Route + Bedingung)
// und nur einer pro Navigation. Reiner Auswahl-Kern (pickNextTip) ist testbar;
// die DOM-Anzeige ist in Nicht-Browser-Umgebungen eine No-op.

import { state, persist } from '../store/state.js';

// Tipps in Reihenfolge wachsender Tiefe — Grundfunktionen zuerst.
export const TIPS = [
  {
    id: 'pd-vergleich',
    route: 'entdecken',
    body: '💡 Im Dialekt-Vergleich siehst du dasselbe Wort quer durch alle Regionen.',
    requires: () => true,
  },
  {
    id: 'pd-favoriten',
    route: 'dialekt',
    body: '💡 Tippe das Herz an einem Ausdruck, um ihn zu sammeln und gezielt zu üben.',
    requires: () => true,
  },
  {
    id: 'pd-srs',
    route: 'lernen',
    body: '💡 Bewerte ehrlich — der Scheduler plant die nächste Wiederholung optimal fürs Gedächtnis.',
    requires: () => true,
  },
  {
    id: 'pd-goal',
    route: 'home',
    body: '💡 Setz dir in den Statistiken ein Tagesziel — kleine Häppchen, große Wirkung.',
    requires: (c) => (c.learned || 0) >= 1,
  },
  {
    id: 'pd-quiz',
    route: 'home',
    body: '💡 Teste dein Wissen im Quiz — schnell gespielt, mehr XP.',
    requires: (c) => (c.learned || 0) >= 3,
  },
];

export function getSeenTips() {
  return Array.isArray(state.seenTips) ? state.seenTips : [];
}

export function markTipSeen(id) {
  const seen = getSeenTips();
  if (seen.includes(id)) return;
  state.seenTips = [...seen, id];
  persist();
}

export function resetTips() {
  state.seenTips = [];
  persist();
}

// Reiner Kern: erster ungesehener Tipp, dessen Route zum Kontext passt (oder
// ohne Route) und dessen Bedingung erfüllt ist. Sonst null.
export function pickNextTip(tips, seen, ctx = {}) {
  const seenSet = new Set(seen);
  for (const t of tips) {
    if (seenSet.has(t.id)) continue;
    if (t.route && t.route !== ctx.route) continue;
    try {
      if (!t.requires(ctx)) continue;
    } catch {
      continue;
    }
    return t;
  }
  return null;
}

let activeTip = null;

// Zeigt einen Tipp als kleinen, schließbaren Coachmark (Browser-only).
export function showTip(tip) {
  if (typeof document === 'undefined' || !tip || activeTip) return;
  const el = document.createElement('div');
  el.className = 'pd-tip';
  el.setAttribute('role', 'status');
  const text = document.createElement('span');
  text.className = 'pd-tip-text';
  text.textContent = tip.body;
  const close = document.createElement('button');
  close.className = 'pd-tip-dismiss';
  close.setAttribute('aria-label', 'Tipp schließen');
  close.textContent = '×';
  el.appendChild(text);
  el.appendChild(close);

  const dismiss = () => {
    if (el.parentNode) el.parentNode.removeChild(el);
    if (activeTip === el) activeTip = null;
  };
  close.addEventListener('click', dismiss);
  document.body.appendChild(el);
  activeTip = el;
  requestAnimationFrame(() => el.classList.add('is-in'));
  setTimeout(dismiss, 9000);
}

// Komfort: passenden Tipp wählen, anzeigen, als gesehen markieren.
// Legt sich nicht über die Willkommens-Tour. Liefert den Tipp oder null.
export function maybeShowTip(ctx = {}) {
  if (typeof document === 'undefined') return null;
  if (document.querySelector('.onboard-overlay')) return null;
  const tip = pickNextTip(TIPS, getSeenTips(), ctx);
  if (!tip) return null;
  markTipSeen(tip.id);
  showTip(tip);
  return tip;
}
