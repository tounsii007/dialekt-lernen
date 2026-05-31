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
  retrievability,
} from '../util/fsrs.js';
import { optimize as fsrsOptimize, buildSequences } from '../util/fsrs-optimizer.js';
import { applyFuzz } from '../util/fsrs-fuzz.js';
import { registerComboHit, applyComboToXp } from '../util/combo.js';

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
function applyReviewSideEffects(dialektId, ausdruckId, isEasy, correct = true) {
  registerStreak();
  // Combo zuerst aktualisieren — ein korrektes Review steigert den Multiplikator,
  // ein Fehler bricht die Serie. Der Multiplikator skaliert dann die XP.
  const hit = registerComboHit(correct);
  const baseXp = isEasy ? XP.cardLearned : XP.cardReviewed;
  const xpReason = isEasy ? 'card-learned' : 'card-reviewed';
  awardXp(applyComboToXp(baseXp, hit.multiplier), xpReason);
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
  // Combo-Korrektheit: SM-2-Lapse ist q < 3 (Knopf „Schwer").
  applyReviewSideEffects(dialektId, ausdruckId, rating === RATING_EASY, q >= 3);
  return record;
}

// Lapse-Schwelle, ab der eine Karte als „Leech" (Dauer-Problemkarte) gilt —
// wie Ankis Default. Solche Karten haben einen strukturellen Mangel (mehrdeutig,
// zu komplex) und fressen unverhältnismäßig viel Übungszeit; sie verdienen
// gezielte Aufmerksamkeit statt blinder Wiederholung.
export const LEECH_LAPSES = 8;

// Ist diese Karte ein Leech? (rein lesend, defensiv gegen korrupte lapses)
export function isLeech(srs) {
  return !!srs && numFin(srs.lapses, 0, 0) >= LEECH_LAPSES;
}

// Geschätzte aktuelle Retrievability einer Karte (0..1) — wie wahrscheinlich
// der Nutzer sie JETZT noch erinnert. FSRS-Karten nutzen ihre Stabilität,
// SM-2-Karten das Intervall als Stabilitäts-Proxy. Niedrig = dringend.
function cardRetrievability(srs, now) {
  if (!srs) return 1;
  const stability = srs.sched === 'fsrs'
    ? numFin(srs.stability, S_MIN, S_MIN)
    : Math.max(numFin(srs.interval, 0, 0), S_MIN);
  const last = numFin(srs.last, 0);
  // last==0 (Legacy/korrupt) ⇒ riesiges elapsed ⇒ R≈0 ⇒ zuerst dran. Gewollt.
  const elapsed = Math.max(0, (now - last) / DAY_MS);
  return retrievability(elapsed, stability);
}

// Karten, die spätestens heute fällig sind — sortiert nach Retrievability
// (am stärksten vom Vergessen bedrohte zuerst). Das schlägt Ankis reine
// Fälligkeits-Sortierung: bei einem Rückstand übt man die Karten zuerst, die
// man sonst als Erstes verliert. `due` dient nur als stabiler Gleichstand-Tie.
export function getDueCards(allCards) {
  const now = Date.now();
  return allCards
    .map((a) => ({ ...a, _srs: getCardSrs(a.dialektId, a.id) }))
    .filter((a) => a._srs && a._srs.due <= now)
    .map((a) => ({ ...a, _r: cardRetrievability(a._srs, now) }))
    .sort((a, b) => a._r - b._r || a._srs.due - b._srs.due);
}

// Leeches absteigend nach Lapses — für Problemkarten-Anzeige/Drills.
export function getLeeches(allCards) {
  const out = [];
  for (const a of allCards) {
    const s = getCardSrs(a.dialektId, a.id);
    if (isLeech(s)) out.push({ ...a, lapses: numFin(s.lapses, 0, 0), _srs: s });
  }
  return out.sort((x, y) => y.lapses - x.lapses);
}

// Statistik-Hilfsfunktionen.
export function getSrsStats(allCards) {
  const now = Date.now();
  let due = 0, learned = 0, learning = 0, fresh = 0, leeches = 0;
  for (const a of allCards) {
    const s = getCardSrs(a.dialektId, a.id);
    if (!s) { fresh += 1; continue; }
    if (s.reps >= 2 && s.interval >= 6) learned += 1;
    else if (s.reps > 0) learning += 1;
    if (s.due <= now) due += 1;
    if (isLeech(s)) leeches += 1;
  }
  return { due, learned, learning, fresh, leeches };
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

// Verteilung künftig fälliger Karten auf Tage (Offset ab `now`) — Grundlage
// für das Load-Balancing. Überfällige Karten (Offset <= 0) zählen nicht zur
// künftigen Last.
function buildDueDayHistogram(now) {
  const hist = new Map();
  const g = state.gelernt || {};
  for (const k of Object.keys(g)) {
    const due = Number(g[k] && g[k].due);
    if (!Number.isFinite(due)) continue;
    const day = Math.round((due - now) / DAY_MS);
    if (day <= 0) continue;
    hist.set(day, (hist.get(day) || 0) + 1);
  }
  return hist;
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

  // Load-Balancing-Fuzz nur für echte Mehrtages-Intervalle. Same-Day-/Lern-
  // Schritte (< 2.5 Tage) behalten ihr exaktes `due` aus schedule().
  let interval = res.interval;
  let due = c.due;
  if (cfg.fuzz && interval >= 2.5) {
    interval = applyFuzz(interval, { load: buildDueDayHistogram(now) });
    due = now + interval * DAY_MS;
  }

  const record = {
    sched: 'fsrs',
    difficulty: c.difficulty,
    stability: c.stability,
    state: c.state,
    reps: c.reps,
    lapses: c.lapses,
    interval,
    due,
    last: now,
    stand: gradeToStand(g),
  };
  state.gelernt[key] = record;
  // Kompaktes Log fürs spätere Parameter-Fitting: t=Zeit, g=Grade,
  // r=Retrievability beim Review, s/d = neue Stabilität/Difficulty.
  appendSrsLog({ key, t: now, g, r: Number(res.retrievability.toFixed(4)), s: c.stability, d: c.difficulty });
  persist();
  // Combo-Korrektheit: nur „Again" (Grade 1) bricht die Serie; Hard/Good/Easy zählen.
  applyReviewSideEffects(dialektId, ausdruckId, g >= GRADE_EASY, g > GRADE_AGAIN);
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

// Kennzahlen über das Review-Log für die Optimizer-UI:
//   total      — Roh-Einträge im Log
//   reviewable — bewertbare Reviews (jedes außer dem ersten je Karte)
//   cards      — Karten mit mindestens einem Review
export function getSrsLogStats() {
  const log = Array.isArray(state.srsLog) ? state.srsLog : [];
  const { scored, cards } = buildSequences(log);
  return { total: log.length, reviewable: scored, cards };
}

// Fittet die FSRS-Gewichte aus dem Review-Log und übernimmt sie (sofern
// genug Daten vorliegen) als nutzerspezifische Parameter. Liefert das
// Optimizer-Ergebnis zurück (ok/Loss/Anzahl), damit die UI Feedback geben kann.
// opts.apply === false rechnet nur, ohne zu speichern (Vorschau/Tests).
export function optimizeSrsParams(opts = {}) {
  const log = Array.isArray(state.srsLog) ? state.srsLog : [];
  const res = fsrsOptimize(log, opts);
  if (res.ok && opts.apply !== false) {
    setSrsConfig({ params: res.params });
  }
  return res;
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
