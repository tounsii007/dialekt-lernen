// Shadowing-Trainer · reine Logik (kein DOM/Audio).
//
// „Shadowing" ist eine bewährte Sprech-Technik: hören → sofort nachsprechen →
// Rückmeldung → nächster Ausdruck. Diese Datei kapselt die testbare Mathematik
// (Bewertung, XP, Aggregation, Queue-Aufbau); die View ruft sie auf. Bewusst
// ohne Store-/DOM-Import, damit alles in Node ohne Browser testbar bleibt.

// Sternchen-Schwellen für einen Aussprache-Score (0..1, z. B. aus
// scoreBestAlternative). Großzügiger als der reine Erkennungs-Schwellwert (0.7),
// weil aktives Sprechen schwerer ist als Wiedererkennen — wir wollen ermutigen.
export const SHADOW_THRESHOLDS = [
  { min: 0.9,  stars: 3, label: 'Perfekt!' },
  { min: 0.75, stars: 2, label: 'Sehr gut' },
  { min: 0.6,  stars: 1, label: 'Fast' },
  { min: 0,    stars: 0, label: 'Nochmal' },
];

/**
 * Bewertet einen Aussprache-Score als Sterne + Label.
 * @param {number} score 0..1
 * @returns {{ stars:number, label:string, ok:boolean, score:number }}
 */
export function gradeShadow(score) {
  const s = Number.isFinite(score) ? Math.max(0, Math.min(1, score)) : 0;
  for (const t of SHADOW_THRESHOLDS) {
    if (s >= t.min) return { stars: t.stars, label: t.label, ok: t.stars >= 1, score: s };
  }
  return { stars: 0, label: 'Nochmal', ok: false, score: s };
}

// XP je Sternebewertung. An XP.cardReviewed (5) angelehnt, mit Bonus für saubere
// Aussprache. 0 Sterne → kein XP (kein „Teilnahme-XP", sonst entwertet sich der
// Lernerfolg). Index = Sterne (0..3).
const XP_BY_STARS = [0, 4, 7, 12];

export function shadowXp(stars) {
  const n = Math.max(0, Math.min(3, Math.round(Number(stars) || 0)));
  return XP_BY_STARS[n];
}

/**
 * Aggregiert die Einzel-Ergebnisse einer Shadowing-Session.
 * @param {Array<{score:number, stars:number, xp:number}>} results
 * @returns {{count, passed, perfect, stars, maxStars, xp, avgScore, accuracyPct}}
 */
export function summarizeShadow(results) {
  const list = Array.isArray(results) ? results : [];
  const count = list.length;
  let stars = 0, xp = 0, passed = 0, perfect = 0, scoreSum = 0;
  for (const r of list) {
    const st = Math.max(0, Math.min(3, Math.round(Number(r && r.stars) || 0)));
    stars += st;
    xp += Math.max(0, Number(r && r.xp) || 0);
    const sc = Number(r && r.score);
    if (Number.isFinite(sc)) scoreSum += Math.max(0, Math.min(1, sc));
    if (st >= 1) passed++;
    if (st === 3) perfect++;
  }
  return {
    count, passed, perfect, stars,
    maxStars: count * 3,
    xp,
    avgScore: count ? scoreSum / count : 0,
    accuracyPct: count ? Math.round((passed / count) * 100) : 0,
  };
}

/**
 * Wählt bis zu `count` Einträge aus `items` per Fisher-Yates-Mischung.
 * rng ist injizierbar (für deterministische Tests); das Original bleibt
 * unangetastet. count außerhalb [0, items.length] wird geklemmt.
 * @returns {Array} gemischte Teilmenge der Länge min(count, items.length)
 */
export function buildShadowQueue(items, count, rng = Math.random) {
  const src = Array.isArray(items) ? items.slice() : [];
  for (let i = src.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = src[i]; src[i] = src[j]; src[j] = tmp;
  }
  const n = Math.max(0, Math.min(src.length, Math.floor(Number(count) || 0)));
  return src.slice(0, n);
}
