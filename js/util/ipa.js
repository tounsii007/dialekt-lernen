// Naive deutsche → IPA Konvertierung.
// Best-effort, kein 100%iges Linguistik-Werkzeug — aber ausreichend für
// visuelle Aussprache-Hilfen zu Dialekt-Ausdrücken.
//
// Regelbasiert: bekannte deutsche Mehrzeichen → IPA-Symbole.
// Erweiterbar pro Dialekt über `dialectOverrides`.

const RULES = [
  // Mehr-Buchstaben zuerst!
  ['sch', 'ʃ'],
  ['tsch', 't͡ʃ'],
  ['chs', 'ks'],
  ['ck', 'k'],
  ['qu', 'kv'],
  ['pf', 'p͡f'],
  ['ng', 'ŋ'],
  ['ie', 'iː'],
  ['ei', 'aɪ̯'],
  ['ai', 'aɪ̯'],
  ['eu', 'ɔɪ̯'],
  ['äu', 'ɔɪ̯'],
  ['au', 'aʊ̯'],
  ['ph', 'f'],
  ['th', 't'],
  // Einzelbuchstaben
  ['ä', 'ɛ'],
  ['ö', 'œ'],
  ['ü', 'ʏ'],
  ['ß', 's'],
  ['z', 't͡s'],
  ['v', 'f'],
  ['w', 'v'],
  ['y', 'y'],
  ['j', 'j'],
  ['ch', 'x'], // wird unten nach „weichem ch" verfeinert
];

// Dialekt-spezifische Anpassungen
const DIALECT_OVERRIDES = {
  schwizerduetsch: [
    ['ch', 'χ'],  // Schweizer hartes Ch
    ['k',  'kʰ'], // Schweizer kehlig
  ],
  alemannisch: [
    ['ch', 'χ'],
  ],
  koelsch: [
    ['g',  'j'],  // jot statt gut
    ['ch', 'ʃ'],
  ],
  berlinisch: [
    ['g', 'j'],   // jeht, jut, jrün
  ],
  saechsisch: [
    ['g', 'k'],
    ['t', 'd'],
    ['p', 'b'],
  ],
};

/**
 * Convert a German word/phrase to a naive IPA transcription.
 * @param {string} word
 * @param {string} dialektId — optional, applies dialect overrides
 * @returns {string} IPA transcription (without slashes)
 */
export function toIpa(word, dialektId = null) {
  if (!word) return '';
  let s = String(word).toLowerCase().trim();
  // Apostrophes & punctuation strippen
  s = s.replace(/[!?.,;:„"]/g, '');

  // Erst dialekt-spezifische Ersetzungen (machen oft Mehr-Zeichen-Patterns kaputt,
  // also vor den Standardregeln anwenden, aber nur für ausgewählte Patterns).
  if (dialektId && DIALECT_OVERRIDES[dialektId]) {
    for (const [from, to] of DIALECT_OVERRIDES[dialektId]) {
      // Nur Wortanfang oder isolierte Vorkommen für robuste Heuristik
      s = s.replace(new RegExp(from, 'g'), to);
    }
  }

  // Standard-Regeln (Mehr-Zeichen zuerst, weshalb RULES so sortiert ist)
  for (const [from, to] of RULES) {
    s = s.replace(new RegExp(from, 'g'), to);
  }

  // „weiches ch" nach hellen Vokalen: ɛ, ɪ, e, i → ç
  // (Hack: nach Standardregel wurde ch → x; wir korrigieren rückwärts)
  s = s.replace(/([ɛɪei])x/g, '$1ç');

  // r am Wortende → ɐ (Vokalisierung), r vor Konsonant → ɐ
  s = s.replace(/r(?=$| )/g, 'ɐ');

  // Vokale am Wortende lang aussprechen (sehr grob)
  // (kein Längenzeichen einfügen, weil das bei kurzen Funktionswörtern falsch wäre)

  return s.trim();
}

/**
 * Format als IPA mit Slash-Wrapper.
 * Beispiel: formatIpa('Buchstabe') → '/buːxʃtaːbə/'
 */
export function formatIpa(word, dialektId = null) {
  return '/' + toIpa(word, dialektId) + '/';
}

// --- Silbenzerlegung (heuristisch) -----------------------------------------
// Best-effort deutsche Silbentrennung nach dem Prinzip des maximalen Anlauts:
// So viele Konsonanten wie möglich gehören zur folgenden Silbe, solange sie
// einen zulässigen deutschen Anlaut bilden. Kein 100%iges Linguistik-Werkzeug
// (Hiatus wie „Fei-er" wird nicht erkannt) — reicht aber als Lernhilfe.

const SYL_VOWEL_RE = /[aeiouäöüyàáâéèêíìîóòôúùû]/i;

// Zulässige Mehr-Konsonant-Anlaute (längste zuerst geprüft via Längenvergleich).
const SYL_ONSETS = [
  'schw', 'schl', 'schr', 'spr', 'str', 'spl',
  'sch', 'sp', 'st', 'sk',
  'ch', 'ck', 'ph', 'th', 'pf', 'qu',
  'pl', 'pr', 'bl', 'br', 'fl', 'fr', 'gl', 'gr', 'kl', 'kr', 'tr', 'dr',
  'gn', 'kn', 'zw', 'tw',
];

function syllabifyWord(w) {
  if (!w || !SYL_VOWEL_RE.test(w)) return [w];
  const lower = w.toLowerCase();

  // Maximale Vokal-Läufe als Silbenkerne sammeln.
  const runs = [];
  let i = 0;
  while (i < lower.length) {
    if (SYL_VOWEL_RE.test(lower[i])) {
      let j = i;
      while (j < lower.length && SYL_VOWEL_RE.test(lower[j])) j++;
      runs.push([i, j]);
      i = j;
    } else {
      i++;
    }
  }
  if (runs.length <= 1) return [w];

  // Trennstellen vor jedem Kern ab dem zweiten bestimmen.
  const breaks = [];
  for (let r = 1; r < runs.length; r++) {
    const clusterStart = runs[r - 1][1];
    const clusterEnd = runs[r][0];
    const cluster = lower.slice(clusterStart, clusterEnd);
    let breakPos;
    if (cluster.length === 0) {
      breakPos = clusterEnd; // Hiatus — zwischen den Vokalen trennen
    } else {
      // Mindestens der letzte Konsonant wandert zur Folgesilbe; längeren
      // zulässigen Anlaut bevorzugen (maximaler Anlaut).
      let onsetLen = 1;
      for (const o of SYL_ONSETS) {
        if (o.length <= cluster.length && cluster.slice(-o.length) === o && o.length > onsetLen) {
          onsetLen = o.length;
        }
      }
      breakPos = clusterEnd - onsetLen;
    }
    breaks.push(breakPos);
  }

  const parts = [];
  let start = 0;
  for (const b of breaks) {
    if (b > start) { parts.push(w.slice(start, b)); start = b; }
  }
  parts.push(w.slice(start));
  return parts.filter((p) => p.length);
}

/**
 * Zerlegt ein Wort oder eine Phrase in Silben.
 * Phrasen werden an Leerzeichen getrennt, jedes Wort einzeln zerlegt.
 * @param {string} text
 * @returns {string[]} Silben (über Wortgrenzen hinweg flach)
 */
export function splitSyllables(text) {
  if (!text) return [];
  return String(text)
    .trim()
    .split(/\s+/)
    .flatMap((token) => syllabifyWord(token));
}
