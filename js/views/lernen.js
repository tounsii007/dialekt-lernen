// Karteikarten-Modus · Hauptkomponente
// Orchestriert Setup → Flashcard → Summary; State liegt in ./lernen/state.js.

import { el, go, shuffle } from '../util.js';
import { DIALEKTE, getDialekt, ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { getSession, setSession, clearSession } from './lernen/state.js';
import { renderSetup } from './lernen/setup.js';
import { renderFlashcard } from './lernen/flashcard.js';
import { renderSummary } from './lernen/summary.js';

export function renderLernen(root, params) {
  root.innerHTML = '';
  const view = el('div', { class: 'view' });
  const session = getSession();

  if (!session) {
    view.appendChild(renderSetup(startSession));
    root.appendChild(view);
    if (params?.dialekt) {
      setTimeout(() => startSession({ source: params.dialekt }), 50);
    }
    return;
  }

  if (session.idx >= session.cards.length) {
    const finished = session;
    clearSession();
    view.appendChild(renderSummary(finished, () => {
      go('#/lernen');
      renderLernen(document.getElementById('app'));
    }));
    root.appendChild(view);
    return;
  }

  view.appendChild(renderFlashcard(session, {
    onPrev: prev,
    onRate: rate,
    onAbort: abort,
    onRerender: rerender,
    onFlip: flip,
  }));
  root.appendChild(view);
}

function startSession({ source, mode = 'normal' }) {
  let cards = [];
  let title = '';
  if (source === 'all') {
    cards = ALLE_AUSDRUECKE.slice();
    title = 'Alle Dialekte';
  } else {
    const d = getDialekt(source);
    if (!d) return;
    cards = d.ausdruecke.map(a => ({ ...a, dialektId: d.id, dialektName: d.name, dialektFlag: d.flag, dialektFarbe: d.farbe }));
    title = d.name;
  }
  setSession({
    title,
    mode,
    cards: shuffle(cards),
    idx: 0,
    flipped: false,
    rated: { easy: 0, med: 0, hard: 0 }
  });
  rerender();
}

function flip(cardEl) {
  const session = getSession();
  if (!session) return;
  session.flipped = !session.flipped;
  cardEl.classList.toggle('is-flipped', session.flipped);
}

function prev() {
  const session = getSession();
  if (session && session.idx > 0) {
    session.idx--;
    session.flipped = false;
    rerender();
  }
}

function rate(stand) {
  const session = getSession();
  if (!session) return;
  if (stand === 3) session.rated.easy++;
  else if (stand === 2) session.rated.med++;
  else session.rated.hard++;
  session.idx++;
  session.flipped = false;
  rerender();
}

function abort() {
  clearSession();
  rerender();
}

function rerender() {
  renderLernen(document.getElementById('app'));
}

// Keyboard shortcuts (vom Router gerufen)
export function handleLernKey(e) {
  const session = getSession();
  if (!session) return;
  if (e.key === ' ') {
    e.preventDefault();
    const card = document.querySelector('.flashcard');
    if (card) flip(card);
  } else if (e.key === 'ArrowRight' && session.flipped) {
    rate(3);
  } else if (e.key === 'ArrowLeft') {
    prev();
  } else if (e.key === '1') rate(1);
  else if (e.key === '2') rate(2);
  else if (e.key === '3') rate(3);
}

export function resetLernSession() { clearSession(); }
