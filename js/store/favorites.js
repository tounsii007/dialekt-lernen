// Favoriten: Persistierte Liste von (dialektId, ausdruckId)-Paaren.

import { state, persist, favKey } from './state.js';

export function isFavorit(dialektId, ausdruckId) {
  return state.favoriten.includes(favKey(dialektId, ausdruckId));
}

export function toggleFavorit(dialektId, ausdruckId) {
  const key = favKey(dialektId, ausdruckId);
  const idx = state.favoriten.indexOf(key);
  const added = idx < 0;
  if (added) state.favoriten.push(key);
  else       state.favoriten.splice(idx, 1);
  persist();
  return added;
}

export function getFavoriten() {
  return state.favoriten.map(key => {
    const [dialektId, ausdruckId] = key.split('.');
    return { dialektId, ausdruckId };
  });
}
