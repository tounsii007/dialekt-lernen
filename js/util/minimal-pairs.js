// Minimal-Paar-Drills — Klangpaare innerhalb eines Dialekts.
//
// Ein Minimal-Paar sind zwei Ausdrücke, die fast gleich klingen, sich aber
// unterscheiden (z. B. „Mädsche" ~ „Mädche"). Der Hörtrainer spielt einen
// Ausdruck vor und der Lernende wählt, welchen der beiden ähnlichen Ausdrücke
// er gehört hat — schult das feine Hören dialektaler Lautunterschiede.
//
// Reine Logik: kein DOM, kein Audio, keine Store-Imports → voll testbar.

import { normalize } from './text.js';
import { phoneticFold } from './pronunciation.js';

// Phonetischer Schlüssel eines Ausdrucks: normalisiert + lautlich gefaltet.
export function phoneticKey(s) {
  return phoneticFold(normalize(s ?? ''));
}

// Levenshtein-Distanz (lokale Kopie — pronunciation.js exportiert sie nicht).
function editDistance(a, b) {
  if (a === b) return 0;
  if (!a || !b) return Math.max(a.length, b.length);
  const m = a.length, n = b.length;
  const dp = new Array(n + 1);
  for (let j = 0; j <= n; j++) dp[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + cost);
      prev = tmp;
    }
  }
  return dp[n];
}

/**
 * Lautliche Distanz zweier Ausdrücke (0 = klingt identisch).
 */
export function phoneticDistance(a, b) {
  return editDistance(phoneticKey(a), phoneticKey(b));
}

/**
 * Findet den am ehesten verwechselbaren Partner zu `target` im Pool.
 *
 * Gesucht wird der lautlich nächste *andere* Ausdruck desselben Dialekts mit
 * Distanz 1..maxDistance (0 = klingt identisch → keine sinnvolle Übung).
 *
 * @param {{id?:any, ausdruck:string, dialektId?:any}} target
 * @param {Array} pool
 * @param {{maxDistance?:number, minLen?:number}} [opts]
 * @returns {{ item:object, distance:number } | null}
 */
export function findConfusable(target, pool, { maxDistance = 3, minLen = 2 } = {}) {
  if (!target || !Array.isArray(pool)) return null;
  const key = phoneticKey(target.ausdruck);
  if (key.length < minLen) return null;

  let best = null;
  for (const c of pool) {
    if (!c || c === target) continue;
    if (c.id != null && target.id != null && c.id === target.id) continue;
    // Nur innerhalb desselben Dialekts vergleichen (dialekt-spezifisch).
    if (c.dialektId != null && target.dialektId != null && c.dialektId !== target.dialektId) continue;
    const ckey = phoneticKey(c.ausdruck);
    if (ckey.length < minLen) continue;
    if (ckey === key) continue;            // klingt identisch → überspringen
    const d = editDistance(key, ckey);
    if (d < 1 || d > maxDistance) continue;
    if (!best || d < best.distance) best = { item: c, distance: d };
    if (best.distance === 1) break;        // bestmöglich, abbrechen
  }
  return best;
}

// Fisher-Yates-Kopie (mutiert das Original nicht).
function shuffled(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Baut bis zu `count` Minimal-Paar-Drills. Jeder Drill nutzt zwei Ausdrücke
 * höchstens einmal, damit sich Übungen nicht wiederholen.
 *
 * @returns {Array<{ id, target, confusable, distance, options:Array, answerId }>}
 */
export function buildPairDrills(pool, count, rng = Math.random) {
  if (!Array.isArray(pool)) return [];
  const max = Math.floor(count);
  if (!(max > 0)) return [];

  const order = shuffled(pool, rng);
  const used = new Set();
  const drills = [];

  for (const target of order) {
    if (drills.length >= max) break;
    if (!target || used.has(target)) continue;
    const remaining = pool.filter((c) => c !== target && !used.has(c));
    const match = findConfusable(target, remaining);
    if (!match) continue;
    used.add(target);
    used.add(match.item);
    drills.push({
      id: target.id ?? target.ausdruck,
      target,
      confusable: match.item,
      distance: match.distance,
      options: shuffled([target, match.item], rng),
      answerId: target.id ?? target.ausdruck,
    });
  }
  return drills;
}

/**
 * Bewertet eine Drill-Antwort.
 * @returns {{ correct:boolean, answerId }}
 */
export function gradePair(drill, chosenId) {
  if (!drill) return { correct: false, answerId: null };
  return { correct: chosenId === drill.answerId, answerId: drill.answerId };
}

/**
 * Fasst Drill-Ergebnisse zusammen.
 * @param {Array<{correct:boolean}>} results
 * @returns {{ count, correct, accuracyPct }}
 */
export function summarizePairs(results) {
  if (!Array.isArray(results) || results.length === 0) {
    return { count: 0, correct: 0, accuracyPct: 0 };
  }
  let correct = 0;
  for (const r of results) if (r && r.correct) correct++;
  return {
    count: results.length,
    correct,
    accuracyPct: Math.round((correct / results.length) * 100),
  };
}
