// Forvo-Community-Aussprachen — externe, nutzerinitiierte Links.
//
// Forvo (forvo.com) ist eine Community-Datenbank mit von Muttersprachlern
// gesprochenen Wörtern. Wir betten NICHTS ein und holen NICHTS automatisch:
// wir bauen nur eine Suchen-URL, die der Nutzer bewusst in einem neuen Tab
// öffnet. Damit bleibt die Offline-/Privacy-Säule unangetastet — kein Tracking,
// kein Auto-Fetch, keine externen Skripte.

const FORVO_SEARCH = 'https://forvo.com/search/';

/**
 * Baut eine Forvo-Such-URL für ein Wort. Leere/ungültige Eingabe → ''.
 * Das Wort wird getrimmt und URL-enkodiert.
 */
export function forvoUrl(word) {
  const w = String(word ?? '').trim();
  if (!w) return '';
  return FORVO_SEARCH + encodeURIComponent(w) + '/';
}

/**
 * Wählt die besten Kandidaten für Community-Aussprachen aus einem Ausdrücke-Pool.
 *
 * Forvo findet einzelne Wörter zuverlässiger als ganze Sätze, daher filtern wir
 * auf einzelne Tokens (kein Whitespace) und entfernen Dubletten (case-insensitiv).
 * Reihenfolge bleibt stabil (erstes Vorkommen gewinnt).
 *
 * @param {Array<{ausdruck:string}>} pool
 * @param {number} count  Maximalanzahl (Default 12)
 * @returns {Array} Teilmenge des Pools
 */
export function pickForvoWords(pool, count = 12) {
  if (!Array.isArray(pool)) return [];
  const max = Math.floor(count);
  if (!(max > 0)) return [];
  const seen = new Set();
  const out = [];
  for (const entry of pool) {
    const word = String(entry?.ausdruck ?? '').trim();
    if (!word) continue;
    if (/\s/.test(word)) continue;          // nur Einzelwörter
    const key = word.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(entry);
    if (out.length >= max) break;
  }
  return out;
}
