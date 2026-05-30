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
import {
  GRADE_AGAIN, GRADE_HARD, GRADE_GOOD, GRADE_EASY,
  STATE_LEARNING, STATE_REVIEW,
  S_MIN,
  schedule as fsrsSchedule, previewIntervals as fsrsPreview,
} from '../util/fsrs.js';

const MIN_EF = 1.3;
const INIT_EF = 2.5;
const DAY_MS = 86_400_000;

function clamp(x, lo, hi) { return Math.min(hi, Math.max(lo, x)); }

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
  // FSRS-Records haben ebenfalls kein `ef`, dürfen hier aber NICHT landen —
  // sie werden weiter unten im FSRS-Zweig behandelt.
  if (v.ef == null && v.sched !== 'fsrs') {
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
  // FSRS-Records: eigener Algorithmus-Zweig. Defensiv coercen wie bei SM-2.
  // `ef` ist ein Platzhalter, damit Legacy-Consumer (forgetting-curve etc.)
  // weiterhin ein Feld vorfinden; die Terminierung läuft über difficulty/stability.
  if (v.sched === 'fsrs') {
    return {
      sched: 'fsrs',
      difficulty: numFin(v.difficulty, 5, 1),
      stability: numFin(v.stability, S_MIN, S_MIN),
      state: numFin(v.state, STATE_REVIEW, 0),
      reps: numFin(v.reps, 0, 0),
      lapses: numFin(v.lapses, 0, 0),
      interval: numFin(v.interval, 0, 0),
      due: numFin(v.due, 0),
      last: numFin(v.last, 0),
      stand: numFin(v.stand, 0, 0),
      ef: INIT_EF,
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

// Gemeinsame Seiteneffekte nach einem Review: Streak, XP, Challenges, Tagesziel.
// Von beiden Schedulern (SM-2 und FSRS) genutzt, damit die Gamification
// identisch bleibt, egal welcher Algorithmus terminiert. `isEasy` steuert nur
// die XP-Höhe (Leicht = "gelernt", sonst = "wiederholt").
function applyReviewSideEffects(dialektId, ausdruckId, isEasy) {
  registerStreak();
  const xpAmount = isEasy ? XP.cardLearned : XP.cardReviewed;
  const xpReason = isEasy ? 'card-learned' : 'card-reviewed';
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
  applyReviewSideEffects(dialektId, ausdruckId, rating === RATING_EASY);
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

// ── FSRS-Integration ──────────────────────────────────────────────────────
// Ab hier der moderne Scheduler. `state.srs` wählt den Algorithmus; FSRS ist
// Default (schlägt SM-2/Anki-Default). Der SM-2-Pfad oben bleibt voll intakt,
// damit ein Scheduler-Wechsel verlustfrei möglich ist.

const SRS_LOG_MAX = 5000;

// Liest die SRS-Konfiguration defensiv (Scheduler, Wunsch-Retention, Fuzz,
// optimierte Parameter). Retention auf einen sinnvollen Bereich begrenzt.
export function getSrsConfig() {
  const c = (state.srs && typeof state.srs === 'object') ? state.srs : {};
  return {
    scheduler: c.scheduler === 'sm2' ? 'sm2' : 'fsrs',
    retention: clamp(numFin(c.retention, 0.9), 0.7, 0.97),
    fuzz: c.fuzz !== false,
    params: Array.isArray(c.params) && c.params.length === 19 ? c.params.slice() : null,
  };
}

// Aktualisiert die SRS-Konfiguration (Teil-Patch) und persistiert.
export function setSrsConfig(patch) {
  const next = { ...getSrsConfig(), ...(patch || {}) };
  state.srs = {
    scheduler: next.scheduler === 'sm2' ? 'sm2' : 'fsrs',
    retention: clamp(numFin(next.retention, 0.9), 0.7, 0.97),
    fuzz: next.fuzz !== false,
    params: Array.isArray(next.params) && next.params.length === 19 ? next.params.slice() : null,
  };
  persist();
  return state.srs;
}

// 3-Knopf-UI (Schwer/Mittel/Leicht) → FSRS-Grade. Die Legacy-UI hat keinen
// separaten "Hard"-Knopf, daher MED→GOOD. Bekommt die UI später 4 Knöpfe,
// kann der Grade direkt an reviewCardScheduled übergeben werden.
function ratingToGrade(rating) {
  if (rating === RATING_EASY) return GRADE_EASY;
  if (rating === RATING_MED)  return GRADE_GOOD;
  return GRADE_AGAIN;
}

// FSRS-Grade → Legacy-stand (0..3) für UI-Marker.
function gradeToStand(grade) {
  if (grade >= GRADE_EASY) return 3;
  if (grade >= GRADE_GOOD) return 2;
  return 1;
}

// Liefert eine FSRS-Karte (im fsrs.js-Format) für eine Karten-ID, oder null
// für eine Neukarte (dann seedet fsrsSchedule selbst). Existiert nur ein
// SM-2-Record, wird er faul in den FSRS-Raum übersetzt, damit ein
// Scheduler-Wechsel den Fortschritt nicht verwirft:
//   difficulty ← aus EF abgeleitet (hoher EF ⇒ leicht ⇒ niedrige Difficulty)
//   stability  ← bisheriges Intervall (mind. S_MIN)
function getFsrsCard(dialektId, ausdruckId) {
  const key = favKey(dialektId, ausdruckId);
  const v = state.gelernt[key];
  if (v && v.sched === 'fsrs') {
    return {
      difficulty: numFin(v.difficulty, 5, 1),
      stability: numFin(v.stability, S_MIN, S_MIN),
      state: numFin(v.state, STATE_REVIEW, 0),
      reps: numFin(v.reps, 0, 0),
      lapses: numFin(v.lapses, 0, 0),
      lastReview: numFin(v.last, 0) || 0,
      due: numFin(v.due, 0) || Date.now(),
    };
  }
  if (v) {
    const sm = getCardSrs(dialektId, ausdruckId);
    if (sm && sm.reps > 0) {
      return {
        difficulty: clamp(8.0 - (sm.ef - MIN_EF) * 3, 1, 10),
        stability: Math.max(sm.interval || 0, S_MIN),
        state: STATE_REVIEW,
        reps: sm.reps,
        lapses: sm.lapses || 0,
        lastReview: sm.last || 0,
        due: sm.due || Date.now(),
      };
    }
  }
  return null;
}

// Hängt einen Eintrag ans Review-Log (für den FSRS-Optimizer in Iter 4) und
// kappt die Länge. Persistiert NICHT selbst — der Caller bündelt persist().
function appendSrsLog(entry) {
  if (!Array.isArray(state.srsLog)) state.srsLog = [];
  state.srsLog.push(entry);
  if (state.srsLog.length > SRS_LOG_MAX) {
    state.srsLog.splice(0, state.srsLog.length - SRS_LOG_MAX);
  }
}

// Wendet FSRS auf eine Karte an, persistiert den Superset-Record und löst die
// gemeinsamen Seiteneffekte aus. `grade` ist ein FSRS-Grade (1..4).
export function reviewCardFsrs(dialektId, ausdruckId, grade, now = Date.now()) {
  const key = favKey(dialektId, ausdruckId);
  const cfg = getSrsConfig();
  const g = clamp(numFin(grade, GRADE_GOOD), 1, 4);
  const prevCard = getFsrsCard(dialektId, ausdruckId);
  const res = fsrsSchedule(prevCard, g, now, {
    params: cfg.params || undefined,
    desiredRetention: cfg.retention,
  });
  const c = res.card;
  const record = {
    sched: 'fsrs',
    difficulty: c.difficulty,
    stability: c.stability,
    state: c.state,
    reps: c.reps,
    lapses: c.lapses,
    interval: res.interval,
    due: c.due,
    last: now,
    stand: gradeToStand(g),
  };
  state.gelernt[key] = record;
  // Kompaktes Log fürs spätere Parameter-Fitting: t=Zeit, g=Grade,
  // r=Retrievability beim Review, s/d = neue Stabilität/Difficulty.
  appendSrsLog({ key, t: now, g, r: Number(res.retrievability.toFixed(4)), s: c.stability, d: c.difficulty });
  persist();
  applyReviewSideEffects(dialektId, ausdruckId, g >= GRADE_EASY);
  return record;
}

// Scheduler-agnostischer Einstieg: routet je nach state.srs.scheduler.
// `rating` ist die 3-Knopf-Bewertung (1..3); optionales `grade` (1..4)
// überschreibt das Mapping, falls die UI bereits 4 Knöpfe liefert.
export function reviewCardScheduled(dialektId, ausdruckId, rating, grade = null) {
  if (getSrsConfig().scheduler === 'fsrs') {
    const g = grade != null ? clamp(numFin(grade, GRADE_GOOD), 1, 4) : ratingToGrade(rating);
    return reviewCardFsrs(dialektId, ausdruckId, g, Date.now());
  }
  return reviewCard(dialektId, ausdruckId, rating);
}

// Intervall-Vorschau (Tage) je Bewertung — für die Anki-Stil-Buttons.
// Nur im FSRS-Modus sinnvoll; im SM-2-Modus null.
export function getReviewPreview(dialektId, ausdruckId, now = Date.now()) {
  const cfg = getSrsConfig();
  if (cfg.scheduler !== 'fsrs') return null;
  return fsrsPreview(getFsrsCard(dialektId, ausdruckId), now, {
    params: cfg.params || undefined,
    desiredRetention: cfg.retention,
  });
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
    // FSRS-Records nicht anfassen — sie haben kein `ef`, sind aber kein Legacy.
    if (v.ef != null || v.sched === 'fsrs') continue;
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
