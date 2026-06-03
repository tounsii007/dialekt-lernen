// Verwandte-Ausdrücke-Finder.
// Findet Ausdrücke mit gleicher oder verwandter Bedeutung (Hochdeutsch-Übersetzung)
// quer durch alle Dialekte — perfekt für Cross-Linking („siehe auch").

import { ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { normalize } from './text.js';
import { shuffle } from './random.js';

const STOPWORDS = new Set([
  'der', 'die', 'das', 'ein', 'eine', 'einen', 'eines', 'einer',
  'und', 'oder', 'aber', 'auch', 'sehr',
  'mit', 'von', 'fuer', 'auf', 'bei', 'in',
  'ist', 'sind', 'war',
]);

function coreWords(s) {
  return normalize(s || '')
    .split(/[\s\-/]+/)
    .filter(w => w.length >= 3 && !STOPWORDS.has(w));
}

// Lazy-Cache: pro Ausdruck einmalig die Kernwort-Menge (Set) und die
// normalisierte Hochdeutsch-Form. Vorher wurden beide bei JEDEM Aufruf für
// alle ~6700 Ausdrücke neu berechnet (teures normalize + split + filter pro
// String) — beim Durchscrollen großer Dialekte spürbarer Jank. Jetzt fällt
// pro Aufruf nur noch ein Set-Vergleich an; die teure Textarbeit passiert
// genau einmal beim ersten Aufruf.
let _cache = null;
function getCache() {
  if (_cache) return _cache;
  _cache = new Map();
  for (const a of ALLE_AUSDRUECKE) {
    _cache.set(a, {
      words: new Set(coreWords(a.hochdeutsch)),
      normHd: normalize(a.hochdeutsch || ''),
    });
  }
  return _cache;
}

/**
 * Findet bis zu `limit` verwandte Ausdrücke aus anderen Dialekten.
 * Match-Heuristik: identische oder überlappende Kernworte in hochdeutsch.
 *
 * @param {object} entry — der aktuelle Ausdruck { dialektId, id, hochdeutsch, kategorie }
 * @param {number} limit
 * @returns {Array<{ entry, score, reason }>}
 */
export function findRelatedExpressions(entry, limit = 5) {
  if (!entry?.hochdeutsch) return [];
  const ownWords = new Set(coreWords(entry.hochdeutsch));
  if (ownWords.size === 0) return [];
  const ownNorm = normalize(entry.hochdeutsch);
  const cache = getCache();

  const results = [];
  for (const other of ALLE_AUSDRUECKE) {
    if (other.dialektId === entry.dialektId && other.id === entry.id) continue;
    const c = cache.get(other);
    if (!c || c.words.size === 0) continue;

    let overlap = 0;
    for (const w of c.words) {
      if (ownWords.has(w)) overlap++;
    }
    if (overlap === 0) continue;

    // Score: Overlap-Ratio + Bonus für gleiche Kategorie
    let score = overlap / Math.max(ownWords.size, c.words.size);
    if (other.kategorie === entry.kategorie) score += 0.1;

    let reason = `Bedeutung ähnlich (${overlap} Wort${overlap > 1 ? 'e' : ''})`;
    if (c.normHd === ownNorm) {
      reason = 'Gleiche Bedeutung';
      score = 1.5; // boost exact matches
    }

    results.push({ entry: other, score, reason });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}

/**
 * Findet Ausdrücke in der gleichen Kategorie (für „mehr aus dieser Kategorie").
 */
export function findSameCategoryExpressions(entry, limit = 5) {
  if (!entry?.kategorie) return [];
  const pool = ALLE_AUSDRUECKE.filter(a =>
    a.kategorie === entry.kategorie && !(a.dialektId === entry.dialektId && a.id === entry.id));
  return shuffle(pool).slice(0, limit);
}
