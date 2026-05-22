// Lernfortschritt pro Ausdruck.
// Stand: 0 = unbekannt, 1 = schwer, 2 = mittel, 3 = leicht/gelernt.

import { state, persist, favKey } from './state.js';
import { registerStreak } from './streak.js';

export const STATUS_UNKNOWN  = 0;
export const STATUS_HARD     = 1;
export const STATUS_MEDIUM   = 2;
export const STATUS_LEARNED  = 3;

function clampStand(stand) {
  const n = Number(stand);
  if (!Number.isFinite(n)) return STATUS_UNKNOWN;
  return Math.max(STATUS_UNKNOWN, Math.min(STATUS_LEARNED, Math.round(n)));
}

export function setLernstand(dialektId, ausdruckId, stand) {
  state.gelernt[favKey(dialektId, ausdruckId)] = {
    stand: clampStand(stand),
    last: Date.now()
  };
  persist();
  registerStreak();
}

export function getLernstand(dialektId, ausdruckId) {
  return state.gelernt[favKey(dialektId, ausdruckId)]?.stand ?? STATUS_UNKNOWN;
}

export function getLernStats() {
  const entries = Object.values(state.gelernt);
  const gelernt  = entries.filter(e => e.stand >= STATUS_LEARNED).length;
  const inArbeit = entries.filter(e => e.stand > STATUS_UNKNOWN && e.stand < STATUS_LEARNED).length;
  return { gelernt, inArbeit, gesamt: entries.length };
}
