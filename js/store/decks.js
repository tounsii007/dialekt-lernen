// Custom-Decks: Benutzer-eigene Listen aus Ausdrücken quer durch alle Dialekte.
// expressionIds werden als Array von { dialektId, id }-Objekten gespeichert.

import { state, persist } from './state.js';

const DEFAULT_COLOR = '#8338ec';

function ensure() {
  if (!Array.isArray(state.decks)) state.decks = [];
  return state.decks;
}

function makeId() {
  // Kollisionsfrei genug für lokale Decks — Zeit + Random.
  return 'deck_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

function sameRef(a, b) {
  return a && b && a.dialektId === b.dialektId && a.id === b.id;
}

function normalizeRef(ref) {
  if (!ref || typeof ref !== 'object') return null;
  const dialektId = String(ref.dialektId || '').trim();
  const id = String(ref.id || ref.ausdruckId || '').trim();
  if (!dialektId || !id) return null;
  return { dialektId, id };
}

/**
 * createDeck — legt ein neues Deck an.
 * @param {{ name: string, color?: string, expressionIds?: Array<{dialektId,id}> }} opts
 * @returns {string} Die ID des angelegten Decks.
 */
export function createDeck({ name, color = DEFAULT_COLOR, expressionIds = [] } = {}) {
  const decks = ensure();
  const cleanName = String(name || '').trim() || 'Unbenanntes Deck';
  const cleanColor = typeof color === 'string' && color.trim() ? color.trim() : DEFAULT_COLOR;
  const cleanRefs = Array.isArray(expressionIds)
    ? expressionIds.map(normalizeRef).filter(Boolean)
    : [];

  const id = makeId();
  decks.push({
    id,
    name: cleanName,
    color: cleanColor,
    expressionIds: cleanRefs,
    createdAt: Date.now()
  });
  persist();
  return id;
}

/**
 * getDecks — alle Decks (neueste zuerst).
 * @returns {Array<{id, name, color, expressionIds, createdAt}>}
 */
export function getDecks() {
  return ensure().slice().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

/**
 * getDeck — einzelnes Deck anhand der ID.
 */
export function getDeck(deckId) {
  return ensure().find(d => d.id === deckId) || null;
}

/**
 * addToDeck — Ausdruck zu Deck hinzufügen. Duplikate werden ignoriert.
 * @param {string} deckId
 * @param {{dialektId, id}} ausdruckRef
 * @returns {boolean} true wenn hinzugefügt, false wenn schon vorhanden / ungültig.
 */
export function addToDeck(deckId, ausdruckRef) {
  const deck = getDeck(deckId);
  const ref = normalizeRef(ausdruckRef);
  if (!deck || !ref) return false;
  if (deck.expressionIds.some(x => sameRef(x, ref))) return false;
  deck.expressionIds.push(ref);
  persist();
  return true;
}

/**
 * removeFromDeck — Ausdruck aus Deck entfernen.
 */
export function removeFromDeck(deckId, ausdruckRef) {
  const deck = getDeck(deckId);
  const ref = normalizeRef(ausdruckRef);
  if (!deck || !ref) return false;
  const before = deck.expressionIds.length;
  deck.expressionIds = deck.expressionIds.filter(x => !sameRef(x, ref));
  const changed = deck.expressionIds.length !== before;
  if (changed) persist();
  return changed;
}

/**
 * deleteDeck — entfernt ein Deck komplett.
 */
export function deleteDeck(deckId) {
  const decks = ensure();
  const idx = decks.findIndex(d => d.id === deckId);
  if (idx < 0) return false;
  decks.splice(idx, 1);
  persist();
  return true;
}

/**
 * renameDeck — Deck umbenennen / Farbe ändern.
 */
export function updateDeck(deckId, { name, color } = {}) {
  const deck = getDeck(deckId);
  if (!deck) return false;
  if (typeof name === 'string' && name.trim()) deck.name = name.trim();
  if (typeof color === 'string' && color.trim()) deck.color = color.trim();
  persist();
  return true;
}

/**
 * countDecks — wie viele Decks existieren?
 */
export function countDecks() {
  return ensure().length;
}

/**
 * deckSize — wie viele Ausdrücke im Deck?
 */
export function deckSize(deckId) {
  const deck = getDeck(deckId);
  return deck ? deck.expressionIds.length : 0;
}
