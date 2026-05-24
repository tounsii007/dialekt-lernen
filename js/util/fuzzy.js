// Tokenisierter Fuzzy-Index für Ausdrücke und Dialekte.
// - Normalisiert und tokenisiert beim Bauen.
// - Bewertet via Token-Substring-Match + Trigram-Overlap + Bigram-Bonus
//   am Wortanfang. Liefert Score 0..1 mit Feld-Gewichten.
// - Levenshtein als Fallback für sehr kurze Bedingungen.

import { normalize } from './text.js';

const TRIGRAM_BONUS = 0.55;
const PREFIX_BONUS  = 0.35;
const EXACT_BONUS   = 1.0;

function tokens(str) {
  return normalize(str || '').split(/\s+/).filter(Boolean);
}

function trigrams(s) {
  if (!s) return new Set();
  const padded = `  ${s}  `;
  const out = new Set();
  for (let i = 0; i < padded.length - 2; i++) out.add(padded.slice(i, i + 3));
  return out;
}

function overlap(a, b) {
  if (!a.size || !b.size) return 0;
  let hits = 0;
  for (const t of a) if (b.has(t)) hits++;
  return hits / Math.max(a.size, b.size);
}

function levenshtein(a, b, max = 3) {
  if (a === b) return 0;
  if (!a || !b) return Math.max(a.length, b.length);
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const prev = new Array(b.length + 1).fill(0);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    let cur = i;
    let rowMin = cur;
    for (let j = 1; j <= b.length; j++) {
      const sub = a[i - 1] === b[j - 1] ? prev[j - 1] : prev[j - 1] + 1;
      const ins = prev[j] + 1;
      const del = cur + 1;
      const next = Math.min(sub, ins, del);
      prev[j - 1] = cur;
      cur = next;
      if (cur < rowMin) rowMin = cur;
    }
    prev[b.length] = cur;
    if (rowMin > max) return max + 1;
  }
  return prev[b.length];
}

// Indizierter Datensatz: speichert pre-computed Tokens + Trigrams pro Datensatz.
// fields: Liste von { key, weight } — Schlüssel auf das Original-Objekt.
export function buildIndex(records, fields) {
  return records.map((rec) => {
    const fieldData = fields.map((f) => {
      const raw = rec[f.key] || '';
      const norm = normalize(raw);
      return {
        key: f.key,
        weight: f.weight ?? 1,
        norm,
        tokens: tokens(raw),
        trigrams: trigrams(norm)
      };
    });
    return { rec, fieldData };
  });
}

// Score eines Datensatzes gegen ein Query.
function scoreEntry(entry, q) {
  const qNorm = normalize(q);
  if (!qNorm) return 0;
  const qTrigrams = trigrams(qNorm);
  const qTokens = tokens(q);

  let totalWeight = 0;
  let weightedScore = 0;

  for (const f of entry.fieldData) {
    totalWeight += f.weight;
    let s = 0;

    if (!f.norm) continue;

    // Exakter Substring-Match (sehr stark)
    if (f.norm.includes(qNorm)) {
      s = Math.max(s, EXACT_BONUS);
      if (f.norm.startsWith(qNorm)) s = Math.max(s, EXACT_BONUS + PREFIX_BONUS);
    }

    // Token-Prefix-Matches (z.B. "ber" matcht "berlinisch")
    for (const qt of qTokens) {
      for (const ft of f.tokens) {
        if (!qt) continue;
        if (ft === qt) s = Math.max(s, EXACT_BONUS);
        else if (ft.startsWith(qt)) s = Math.max(s, 0.8);
        else if (ft.includes(qt)) s = Math.max(s, 0.55);
        else if (qt.length >= 3) {
          const d = levenshtein(qt, ft, 2);
          if (d <= 1) s = Math.max(s, 0.6);
          else if (d <= 2) s = Math.max(s, 0.4);
        }
      }
    }

    // Trigram-Overlap (typo-tolerant für ganze Phrasen)
    if (s < 0.6 && qNorm.length >= 3) {
      const o = overlap(qTrigrams, f.trigrams);
      if (o > 0.18) s = Math.max(s, o * TRIGRAM_BONUS);
    }

    weightedScore += s * f.weight;
  }

  return totalWeight > 0 ? weightedScore / totalWeight : 0;
}

// Sucht im Index. Liefert sortierte Treffer mit Score.
export function searchIndex(index, query, { limit = 20, threshold = 0.2 } = {}) {
  if (!query || !query.trim()) return [];
  const results = [];
  for (const entry of index) {
    const s = scoreEntry(entry, query);
    if (s >= threshold) results.push({ rec: entry.rec, score: s });
  }
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}
