// Intervall-Fuzz + Load-Balancing für den FSRS-Scheduler.
//
// Problem: Ohne Streuung landen alle Karten einer Lern-Session immer wieder am
// selben Tag — die tägliche Review-Last schaukelt sich zu Spitzen auf ("Anki-
// Mittwoch"). Anki streut deshalb jedes Intervall zufällig in einem Fenster,
// dessen Breite mit dem Intervall wächst.
//
// Wir gehen einen Schritt weiter (wie Ankis neuerer Load-Balancer): Statt den
// Tag im Fenster zufällig zu wählen, nehmen wir den am WENIGSTEN ausgelasteten
// — das glättet die Last messbar besser und ist dabei deterministisch (gut für
// Tests und reproduzierbares Verhalten). Reine Zufalls-Streuung bleibt als
// Modus erhalten (rng), wenn keine Lastverteilung übergeben wird.
//
// REIN: kein DOM, kein Store. Direkt in den Web-Scheduler, einen Worker oder
// die Flutter-Portierung übernehmbar.

// Fenster-Breite wächst stückweise linear mit dem Intervall (Anki/FSRS-Werte).
export const FUZZ_RANGES = Object.freeze([
  { start: 2.5, end: 7.0, factor: 0.15 },
  { start: 7.0, end: 20.0, factor: 0.1 },
  { start: 20.0, end: Infinity, factor: 0.05 },
]);

// Mindest-Intervall, ab dem überhaupt gestreut wird. Darunter (1–2 Tage) wäre
// Fuzz sinnlos und würde frische Karten unnötig nach hinten schieben.
const FUZZ_MIN_INTERVAL = 2.5;

function roundedDays(ivl) {
  const n = Number(ivl);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.round(n));
}

// Ganzzahliges [min, max]-Tagesfenster für ein Intervall — rein, ohne Zufall.
// Unter FUZZ_MIN_INTERVAL kollabiert das Fenster auf einen einzigen Tag.
export function fuzzRange(interval) {
  const ivl = Number(interval);
  if (!Number.isFinite(ivl) || ivl < FUZZ_MIN_INTERVAL) {
    const r = roundedDays(ivl);
    return { min: r, max: r };
  }
  let delta = 1.0;
  for (const range of FUZZ_RANGES) {
    delta += range.factor * Math.max(Math.min(ivl, range.end) - range.start, 0);
  }
  let min = Math.round(ivl - delta);
  let max = Math.round(ivl + delta);
  min = Math.max(2, min);
  max = Math.max(min, max);
  return { min, max };
}

/**
 * Streut ein Intervall (Tage) innerhalb seines Fuzz-Fensters.
 *
 * @param {number} interval                Ideales Intervall in Tagen.
 * @param {object} [opts]
 * @param {boolean}        [opts.enable=true]  Aus → gerundetes Intervall, keine Streuung.
 * @param {Map<number,number>} [opts.load]     Lastverteilung: Tag-Offset → Anzahl bereits
 *                                              terminierter Reviews. Wenn gesetzt, wird der
 *                                              am wenigsten ausgelastete Tag gewählt
 *                                              (Gleichstand → Tag näher am Ideal-Intervall).
 * @param {() => number}   [opts.rng=Math.random]  Zufallsquelle für den load-losen Modus.
 * @returns {number} ganzzahliges Intervall in Tagen.
 */
export function applyFuzz(interval, opts = {}) {
  const enable = opts.enable !== false;
  const ivl = Number(interval);
  if (!enable || !Number.isFinite(ivl) || ivl < FUZZ_MIN_INTERVAL) {
    return roundedDays(ivl);
  }
  const { min, max } = fuzzRange(ivl);
  if (max <= min) return min;

  if (opts.load instanceof Map) {
    // Load-Balancing: wenigst-ausgelasteten Tag wählen, Gleichstand zugunsten
    // des Tags, der dem Ideal-Intervall am nächsten liegt.
    let bestDay = min;
    let bestCount = Infinity;
    let bestDist = Infinity;
    for (let d = min; d <= max; d++) {
      const count = opts.load.get(d) || 0;
      const dist = Math.abs(d - ivl);
      if (count < bestCount || (count === bestCount && dist < bestDist)) {
        bestDay = d;
        bestCount = count;
        bestDist = dist;
      }
    }
    return bestDay;
  }

  const rng = typeof opts.rng === 'function' ? opts.rng : Math.random;
  const r = Math.min(0.999999, Math.max(0, rng()));
  return min + Math.floor(r * (max - min + 1));
}
