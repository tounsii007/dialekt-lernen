// Favoriten: Persistierte Liste von (dialektId, ausdruckId)-Paaren.

import { state, persist, favKey } from './state.js';

// Defensiv: liefert immer ein Array, auch wenn state.favoriten korrupt ist.
function favs() {
  if (!Array.isArray(state.favoriten)) state.favoriten = [];
  return state.favoriten;
}

export function isFavorit(dialektId, ausdruckId) {
  if (!dialektId || !ausdruckId) return false;
  return favs().includes(favKey(dialektId, ausdruckId));
}

export function toggleFavorit(dialektId, ausdruckId) {
  if (!dialektId || !ausdruckId) return false;
  const list = favs();
  const key = favKey(dialektId, ausdruckId);
  const idx = list.indexOf(key);
  const added = idx < 0;
  if (added) list.push(key);
  else       list.splice(idx, 1);
  persist();
  return added;
}

export function getFavoriten() {
  return favs().map(key => {
    // Robust gegen Nicht-String-Einträge (z. B. Legacy-Objekte aus Importen).
    const s = String(key);
    const dot = s.indexOf('.');
    if (dot < 0) return { dialektId: s, ausdruckId: '' };
    return { dialektId: s.slice(0, dot), ausdruckId: s.slice(dot + 1) };
  });
}
