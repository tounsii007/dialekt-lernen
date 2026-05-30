// SM-2 Spaced-Repetition-Algorithmus (Anki-style, leicht angepasst).
// Pro Karte werden gespeichert:
//   ef        — easiness factor (>=1.3, startet bei 2.5)
//   reps      — Anzahl korrekter Reviews in Folge
//   interval  — Tage bis zum nächsten Review
//   due       — Zeitstempel des nächsten Reviews
//   lapses    — Anzahl Lapses (Bewertung "Schwer" / Fail)
//   last      — Zeitstempel des letzten Reviews
//   stand     — abgeleiteter 0..3-Status für die Legacy-UI
//
// Die Bewertungen aus der UI (1=Schwer / 2=Mittel / 3=Leicht) werden auf
// SM-2-Qualitäten gemappt (0..5):
//   1 → 2  (Fail, aber erinnert mit Hilfe)
//   2 → 3  (Korrekt, aber zögerlich)
//   3 → 5  (Perfekt erinnert)

import { state, persist, favKey } from './state.js';
import { registerStreak } from './streak.js';
import { awardXp, XP } from './xp.js';
import { incrementGoalProgress, isGoalMet, getGoalTarget } from './goals.js';

const MIN_EF = 1.3;
const INIT_EF = 2.5;
const DAY_MS = 86_400_000;

// Erzwingt eine endliche Zahl >= min; sonst fallback. Verteidigt die SM-2-Mathe
// gegen korrupte Karten-Felder (z. B. ef:"bad"/reps:NaN aus einem manipulierten
// Import — sanitizeRecord prüft nur, dass der Record ein Objekt ist, nicht die
// inneren Zahlen). Ohne diesen Schutz propagiert NaN bis ins persistierte `due`,
// und die Karte taucht in getDueCards() nie wieder auf.
function numFin(v, fallback, min = -Infinity) {
  const n = Number(v);
  return Number.isFinite(n) && n >= min ? n : fallback;
}

export const RATING_HARD = 1;
export const RATING_MED  = 2;
export const RATING_EASY = 3;

function ratingToQuality(r) {
  if (r === RATING_EASY) return 5;
  if (r === RATING_MED)  return 3;
  return 2;
}

function ratingToStand(r) {
  // 0 = unbekannt, 1 = schwer, 2 = mittel, 3 = gelernt — Legacy für UI-Marker
  if (r === RATING_EASY) return 3;
  if (r === RATING_MED)  return 2;
  return 1;
}

// Liefert das gespeicherte SRS-Objekt (oder einen Default).
export function getCardSrs(dialektId, ausdruckId) {
  const key = favKey(dialektId, ausdruckId);
  const v = state.gelernt[key];
  if (!v) return null;

  // Legacy-Records (nur stand+last) bekommen einen extrapolierten EF.
  if (v.ef == null) {
    const stand = numFin(v.stand, 0, 0);
    const last = numFin(v.last, 0);
    return {
      ef: INIT_EF,
      reps: stand >= 3 ? 2 : stand >= 2 ? 1 : 0,
      interval: stand >= 3 ? 6 : stand >= 2 ? 1 : 0,
      due: last || Date.now(),
      lapses: 0,
      last,
      stand
    };
  }
  // Numerische Felder defensiv coercen — ein korrupter Import-Record (ef:"bad",
  // reps:NaN) würde sonst verbatim in reviewCard() fließen und NaN persistieren.
  return {
    ...v,
    ef: numFin(v.ef, INIT_EF, MIN_EF),
    reps: numFin(v.reps, 0, 0),
    interval: numFin(v.interval, 0, 0),
    due: numFin(v.due, 0),
    lapses: numFin(v.lapses, 0, 0),
    last: numFin(v.last, 0),
    stand: numFin(v.stand, 0, 0),
  };
}

// Wendet SM-2 auf eine Karte an und persistiert das Ergebnis.
// rating: 1/2/3 wie bisher.
export function reviewCard(dialektId, ausdruckId, rating) {
  const key = favKey(dialektId, ausdruckId);
  const prev = getCardSrs(dialektId, ausdruckId) || {
    ef: INIT_EF, reps: 0, interval: 0, due: Date.now(), lapses: 0, last: 0, stand: 0
  };
  const q = ratingToQuality(rating);

  let { ef, reps, interval, lapses } = prev;
  if (q < 3) {
    // Lapse: zurück auf den Anfang
    reps = 0;
    interval = 1;
    lapses += 1;
  } else {
    reps += 1;
    if (reps === 1) interval = 1;
    else if (reps === 2) interval = 6;
    else interval = Math.max(1, Math.round(interval * ef));
  }
  // EF-Anpassung (SM-2-Standardformel)
  ef = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (ef < MIN_EF) ef = MIN_EF;

  const now = Date.now();
  const record = {
    ef: Number(ef.toFixed(3)),
    reps,
    interval,
    due: now + interval * DAY_MS,
    lapses,
    last: now,
    stand: ratingToStand(rating)
  };
  state.gelernt[key] = record;
  persist();
  registerStreak();
  // XP-Award je nach Bewertung
  const xpAmount = rating === RATING_EASY ? XP.cardLearned : XP.cardReviewed;
  const xpReason = rating === RATING_EASY ? 'card-learned' : 'card-reviewed';
  awardXp(xpAmount, xpReason);
  // Wöchentliche Challenges tracken (lazy import, um Zyklen zu vermeiden).
  try {
    import('./challenges.js').then(m => m.trackCardReview(dialektId, ausdruckId, xpReason)).catch(() => {});
  } catch {}
  // Tages-Lernziel tracken
  const newProgress = incrementGoalProgress(1);
  const target = getGoalTarget();
  if (newProgress === target) {
    // Exakt erreicht — Event auslösen
    try {
      document.dispatchEvent(new CustomEvent('dialekto:goalmet', { detail: { target } }));
    } catch {}
  }
  return record;
}

// Karten, die spätestens heute fällig sind.
export function getDueCards(allCards) {
  const now = Date.now();
  return allCards
    .map((a) => ({ ...a, _srs: getCardSrs(a.dialektId, a.id) }))
    .filter((a) => a._srs && a._srs.due <= now)
    .sort((a, b) => a._srs.due - b._srs.due);
}

// Statistik-Hilfsfunktionen.
export function getSrsStats(allCards) {
  const now = Date.now();
  let due = 0, learned = 0, learning = 0, fresh = 0;
  for (const a of allCards) {
    const s = getCardSrs(a.dialektId, a.id);
    if (!s) { fresh += 1; continue; }
    if (s.reps >= 2 && s.interval >= 6) learned += 1;
    else if (s.reps > 0) learning += 1;
    if (s.due <= now) due += 1;
  }
  return { due, learned, learning, fresh };
}

// Pure SM-2-Berechnung ohne State-Side-Effects.
// Erwartet vorigen SRS-Record (oder null/undefined) und rating (1..3),
// liefert einen neuen Record zurück. Kein localStorage, kein XP, kein
// Streak — nur Mathematik. Wird auch vom Worker (`srs-worker.js`)
// und vom Host-Wrapper (`srs-worker-host.js`) genutzt.
//
// Diese Funktion ist bewusst portabel: sie kann von einer Worker-Umgebung
// importiert werden (ohne `state.js` zu laden), solange der Caller den
// vorigen Record explizit übergibt.
export function getSrsAlgorithm() {
  return {
    INIT_EF,
    MIN_EF,
    DAY_MS,
    RATING_HARD,
    RATING_MED,
    RATING_EASY,
    ratingToQuality,
    ratingToStand,
    /**
     * @param {object|null} prev — voriger SRS-Record (ef/reps/interval/...) oder null.
     * @param {1|2|3} rating
     * @returns {{ef:number,reps:number,interval:number,due:number,lapses:number,last:number,stand:number}}
     */
    review(prev, rating) {
      const now = Date.now();
      const base = prev || {
        ef: INIT_EF, reps: 0, interval: 0, due: now, lapses: 0, last: 0, stand: 0
      };
      const q = ratingToQuality(rating);
      let ef = numFin(base.ef, INIT_EF, MIN_EF);
      let reps = numFin(base.reps, 0, 0);
      let interval = numFin(base.interval, 0, 0);
      let lapses = numFin(base.lapses, 0, 0);
      if (q < 3) {
        reps = 0;
        interval = 1;
        lapses += 1;
      } else {
        reps += 1;
        if (reps === 1) interval = 1;
        else if (reps === 2) interval = 6;
        else interval = Math.max(1, Math.round(interval * ef));
      }
      ef = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
      if (ef < MIN_EF) ef = MIN_EF;
      return {
        ef: Number(ef.toFixed(3)),
        reps,
        interval,
        due: now + interval * DAY_MS,
        lapses,
        last: now,
        stand: ratingToStand(rating)
      };
    }
  };
}

// Migration: alle Legacy-Records bekommen EF/reps/interval/due zugeordnet.
// Idempotent — kann auf jedem Start laufen.
export function migrateLegacyEntries() {
  let changed = false;
  for (const key of Object.keys(state.gelernt || {})) {
    const v = state.gelernt[key];
    if (!v || typeof v !== 'object') continue;
    if (v.ef != null) continue;
    const stand = v.stand || 0;
    state.gelernt[key] = {
      ef: INIT_EF,
      reps: stand >= 3 ? 2 : stand >= 2 ? 1 : 0,
      interval: stand >= 3 ? 6 : stand >= 2 ? 1 : 0,
      due: v.last || Date.now(),
      lapses: 0,
      last: v.last || 0,
      stand
    };
    changed = true;
  }
  if (changed) persist();
}
