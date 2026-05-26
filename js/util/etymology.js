// Etymologie-Extraktion aus Bedeutungs-Texten.
// Viele Bedeutungs-Einträge enthalten Wortherkunfts-Sätze wie
// „kommt von …", „leitet sich vom mittelhochdeutschen …", „verwandt mit …".
// Diese Sätze ziehen wir per Heuristik heraus und zeigen sie separat
// im Etymologie-Tab der Dialekt-Detail-Ansicht.

const ETYM_KEYWORDS = [
  // Direkte Herkunfts-Phrasen
  'kommt von',
  'kommt vom',
  'kommt aus',
  'stammt von',
  'stammt vom',
  'stammt aus',
  'leitet sich von',
  'leitet sich vom',
  'leitet sich aus',
  'abgeleitet von',
  'abgeleitet vom',
  'abgeleitet aus',
  'abgeleitet ',          // fängt auch „… ist abgeleitet …" ab
  'entlehnt aus',
  'entlehnt vom',
  'entlehnt von',
  'entlehnt ',            // „aus dem Französischen entlehnt"
  'hat seinen ursprung',
  'hat seinen wortursprung',
  'ursprünglich aus',
  'ursprünglich vom',
  'ursprünglich von',
  'verwandt mit',
  'verwandt zum',
  'eng verwandt',
  // Sprach-Indikatoren
  'althochdeutsch',
  'mittelhochdeutsch',
  'niederdeutsch',
  'westgermanisch',
  'germanisch',
  'lateinisch',
  'lateinischen',
  'französisch',
  'französischen',
  'italienisch',
  'italienischen',
  'jiddisch',
  'jiddischen',
  'romanisch',
  'romanischen',
  'rotwelsch',
  'rotwelschen',
  'hebräisch',
  'hebräischen',
  'niederländisch',
  'niederländischen',
  // Etymologie-Marker
  'etymologisch',
  'etymologie',
  'wortursprung',
  'wortherkunft',
  'sprachlich verwandt',
  'sprachverwandt',
  'sprachgeschichtlich',
  'lehnwort',
  'fremdwort',
];

// Vorab normalisierte Lowercase-Variante für den Vergleich.
const ETYM_KEYWORDS_LC = ETYM_KEYWORDS.map(k => k.toLowerCase());

/**
 * Zerlegt einen Bedeutungs-Text in einzelne Sätze.
 * Trennt an Satzzeichen, behandelt Abkürzungen mit Punkt naiv —
 * für unsere Datentexte reicht das.
 */
function splitSentences(text) {
  if (!text) return [];
  // Erst nach Satzzeichen-Folgen splitten (. ! ?), Satzzeichen behalten.
  const parts = String(text)
    .split(/(?<=[.!?])\s+(?=[A-ZÄÖÜ„])/u)
    .map(s => s.trim())
    .filter(Boolean);
  return parts;
}

/**
 * Prüft, ob ein Satz ein Etymologie-Schlüsselwort enthält.
 */
function isEtymologySentence(sentence) {
  if (!sentence) return false;
  const lc = sentence.toLowerCase();
  return ETYM_KEYWORDS_LC.some(kw => lc.includes(kw));
}

/**
 * Extrahiert alle Sätze aus dem Bedeutungs-Text, die auf Wortherkunft
 * hindeuten — gut für den Etymologie-Tab.
 *
 * @param {string} bedeutungText
 * @returns {string[]} Sätze mit Etymologie-Bezug, in Original-Reihenfolge.
 */
export function extractEtymology(bedeutungText) {
  if (!bedeutungText || typeof bedeutungText !== 'string') return [];
  const sentences = splitSentences(bedeutungText);
  const hits = [];
  for (const s of sentences) {
    if (isEtymologySentence(s)) hits.push(s);
  }
  return hits;
}

/**
 * True, wenn der Text mindestens einen Etymologie-Hinweis hat.
 * Nutzen wir, um den Tab/Toggle nur zu zeigen, wenn es etwas zu zeigen gibt.
 */
export function hasEtymology(bedeutungText) {
  return extractEtymology(bedeutungText).length > 0;
}
