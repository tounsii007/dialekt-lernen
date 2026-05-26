// Lückentext-Helper: schneidet den Ausdruck aus dem Beispielsatz heraus.
// Wird vom Cloze-Lernmodus genutzt.
//
// Strategie: finde im Beispielsatz das Wort, das mit dem Ausdruck (oder einem
// Präfix davon, ≥3 Zeichen) beginnt — case-insensitive, diakritik-tolerant.
// Falls kein Treffer: gib Original-Satz mit Lücke am Ende zurück.

import { normalize } from './text.js';

const PLACEHOLDER = '_____';

/**
 * Splittet einen Beispielsatz in [vorher, lücke, nachher].
 * @param {string} beispiel
 * @param {string} ausdruck
 * @returns {{ before: string, hidden: string, after: string, found: boolean }}
 */
export function buildCloze(beispiel, ausdruck) {
  if (!beispiel || !ausdruck) {
    return { before: beispiel || '', hidden: '', after: '', found: false };
  }

  const sentence = String(beispiel);
  const target = String(ausdruck).trim();
  if (!target) return { before: sentence, hidden: '', after: '', found: false };

  // Tokenize the sentence by word boundaries (preserving offsets)
  // We look at each "word" (sequence of letters/apostrophes/hyphens) and check
  // if it starts with a prefix of any core word of the ausdruck.
  const targetCoreWords = target
    .split(/[\s/]+/)
    .map(w => normalize(w).replace(/[^a-z0-9']/g, ''))
    .filter(w => w.length >= 3);

  if (targetCoreWords.length === 0) {
    return { before: sentence, hidden: '', after: '', found: false };
  }

  // Find tokens in the sentence — split on whitespace AND apostrophe-prefixes
  // (so "D'Hex" becomes ["D", "Hex"] and we can match Hex against Hexe).
  const tokenRegex = /[A-Za-zÄÖÜäöüß0-9\-]+/g;
  let match;
  let bestStart = -1, bestEnd = -1, bestScore = 0;

  while ((match = tokenRegex.exec(sentence)) !== null) {
    const token = match[0];
    const normToken = normalize(token);
    // Score: longest prefix-match with any target core word
    for (const cw of targetCoreWords) {
      const minLen = Math.min(normToken.length, cw.length);
      let common = 0;
      for (let i = 0; i < minLen; i++) {
        if (normToken[i] === cw[i]) common++;
        else break;
      }
      if (common >= 3 && common > bestScore) {
        bestScore = common;
        bestStart = match.index;
        bestEnd = match.index + token.length;
      }
    }
  }

  if (bestStart === -1) {
    // Fallback: append placeholder at end
    return { before: sentence.replace(/[.!?…]+$/, '').trimEnd() + ' ', hidden: '', after: sentence.match(/[.!?…]+$/)?.[0] || '', found: false };
  }

  return {
    before: sentence.slice(0, bestStart),
    hidden: sentence.slice(bestStart, bestEnd),
    after: sentence.slice(bestEnd),
    found: true,
  };
}

/**
 * Rendert den Lückentext mit Platzhalter (für reine Text-Anzeige).
 */
export function renderClozeText(beispiel, ausdruck) {
  const { before, after, found } = buildCloze(beispiel, ausdruck);
  if (!found) return beispiel + ' ' + PLACEHOLDER;
  return before + PLACEHOLDER + after;
}

export { PLACEHOLDER as CLOZE_PLACEHOLDER };
