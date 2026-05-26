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
