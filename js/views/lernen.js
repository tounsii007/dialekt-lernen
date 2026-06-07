// Karteikarten-Modus · Hauptkomponente
// Orchestriert Setup → Flashcard → Summary; State liegt in ./lernen/state.js.

import { el, go, shuffle, toast } from '../util.js';
import { DIALEKTE, getDialekt, ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { KATEGORIEN } from '../../data/kategorien.js';
import { getSession, setSession, clearSession } from './lernen/state.js';
import { renderSetup } from './lernen/setup.js';
import { renderFlashcard } from './lernen/flashcard.js';
import { renderSummary } from './lernen/summary.js';
import { getDeck } from '../store/decks.js';
import { getAdaptiveRecommendations } from '../util/adaptive-plan.js';
import { t } from '../util/i18n.js';

export function renderLernen(root, params) {
  root.innerHTML = '';
  const view = el('div', { class: 'view' });
  const session = getSession();

  if (!session) {
    view.appendChild(renderSetup(startSession));
    root.appendChild(view);
    if (params?.dialekt) {
      setTimeout(() => startSession({ source: params.dialekt }), 50);
    } else if (params?.deck) {
      setTimeout(() => startSession({ source: 'deck:' + params.deck }), 50);
    } else if (params?.source === 'recommendations') {
      setTimeout(() => startSession({ source: 'recommendations' }), 50);
    } else if (params?.card) {
      // Einzel-Karte aus z.B. der At-Risk-Liste — direkt starten
      setTimeout(() => startSession({ source: 'card:' + params.card }), 50);
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
    title = t('view.lernen.titleAll');
  } else if (source === 'recommendations') {
    // Adaptiver Lernplan — bis zu 10 personalisierte Empfehlungen.
    let recs = [];
    try {
      recs = getAdaptiveRecommendations(10);
    } catch {
      recs = [];
    }
    cards = (recs || []).map(r => r.entry).filter(Boolean);
    if (cards.length === 0) {
      toast(t('view.lernen.noRecs'), 'info', 2400);
      return;
    }
    title = t('view.lernen.titleRecs');
  } else if (typeof source === 'string' && source.startsWith('card:')) {
    // Einzel-Karte aus URL-Parameter (z.B. „card=dialekt.id" aus At-Risk-Liste).
    const key = source.slice('card:'.length);
    const sep = key.indexOf('.');
    if (sep < 0) { toast(t('view.lernen.cardNotFound'), 'info', 1800); return; }
    const dialektId = key.slice(0, sep);
    const ausdruckId = key.slice(sep + 1);
    const d = getDialekt(dialektId);
    const a = d?.ausdruecke.find(x => x.id === ausdruckId);
    if (!d || !a) { toast(t('view.lernen.cardNotFound'), 'info', 1800); return; }
    cards = [{ ...a, dialektId: d.id, dialektName: d.name, dialektFlag: d.flag, dialektFarbe: d.farbe }];
    title = `🎯 ${d.flag} ${a.ausdruck}`;
  } else if (typeof source === 'string' && source.startsWith('kategorie:')) {
    // Themen-Lektion: Filter über alle Dialekte nach Kategorie
    const katId = source.slice('kategorie:'.length);
    const kat = KATEGORIEN[katId];
    if (!kat) return;
    cards = ALLE_AUSDRUECKE.filter(a => a.kategorie === katId);
    if (cards.length === 0) return;
    title = `${kat.icon} ${kat.label}`;
  } else if (typeof source === 'string' && source.startsWith('deck:')) {
    // Custom-Deck: aus User-Liste hydrieren
    const deckId = source.slice('deck:'.length);
    const deck = getDeck(deckId);
    if (!deck) {
      toast(t('view.lernen.deckNotFound'), 'info', 1800);
      go('#/decks');
      return;
    }
    const seenKeys = new Set();
    cards = [];
    for (const ref of deck.expressionIds) {
      const key = ref.dialektId + '.' + ref.id;
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);
      const d = getDialekt(ref.dialektId);
      if (!d) continue;
      const a = d.ausdruecke.find(x => x.id === ref.id);
      if (!a) continue;
      cards.push({ ...a, dialektId: d.id, dialektName: d.name, dialektFlag: d.flag, dialektFarbe: d.farbe });
    }
    if (cards.length === 0) {
      toast(t('view.lernen.deckEmpty'), 'info', 2200);
      go('#/decks');
      return;
    }
    title = '🗂️ ' + deck.name;
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
