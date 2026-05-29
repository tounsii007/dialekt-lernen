// Lernfortschritt pro Ausdruck — jetzt mit SM-2 unter der Haube.
// Stand: 0 = unbekannt, 1 = schwer, 2 = mittel, 3 = leicht/gelernt (Legacy-UI-Marker).

import { state, persist, favKey } from './state.js';
import { registerStreak } from './streak.js';
import { reviewCard, migrateLegacyEntries } from './srs.js';

export const STATUS_UNKNOWN  = 0;
export const STATUS_HARD     = 1;
export const STATUS_MEDIUM   = 2;
export const STATUS_LEARNED  = 3;

// Migration beim Modul-Load — idempotent.
migrateLegacyEntries();

function clampStand(stand) {
  const n = Number(stand);
  if (!Number.isFinite(n)) return STATUS_UNKNOWN;
  return Math.max(STATUS_UNKNOWN, Math.min(STATUS_LEARNED, Math.round(n)));
}

// Bewertungen aus der UI laufen nun durch SM-2.
export function setLernstand(dialektId, ausdruckId, stand) {
  const s = clampStand(stand);
  if (s === STATUS_UNKNOWN) {
    // Zurücksetzen — Eintrag löschen
    delete state.gelernt[favKey(dialektId, ausdruckId)];
    persist();
    return;
  }
  reviewCard(dialektId, ausdruckId, s);
  // registerStreak() bereits in reviewCard()
}

export function getLernstand(dialektId, ausdruckId) {
  return state.gelernt[favKey(dialektId, ausdruckId)]?.stand ?? STATUS_UNKNOWN;
}

export function getLernStats() {
  // Korrupte Einträge (null/Nicht-Objekt/Array) ignorieren — z. B. aus manipulierten
  // Backups oder direkt editiertem localStorage —, sonst wirft .stand einen TypeError.
  const entries = Object.values(state.gelernt || {})
    .filter(e => e && typeof e === 'object' && !Array.isArray(e));
  const gelernt  = entries.filter(e => (e.stand ?? 0) >= STATUS_LEARNED).length;
  const inArbeit = entries.filter(e => (e.stand ?? 0) > STATUS_UNKNOWN && (e.stand ?? 0) < STATUS_LEARNED).length;
  return { gelernt, inArbeit, gesamt: entries.length };
}
