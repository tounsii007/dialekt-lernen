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
  // 'ch' wird NICHT hier ersetzt, sondern nach der Schleife kontextsensitiv
  // aufgelöst (ich-Laut ç vs. ach-Laut x). So bleibt literales 'x'/'ks'
  // (nix, Hexe, Taxi) unberührt — die frühere Rückwärts-Korrektur verfälschte es.
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

  // Dialekt-Overrides: Mehrzeichen-Overrides (z. B. 'ch'→χ/ʃ) MÜSSEN vor den
  // Standardregeln laufen, sonst greift die generische 'ch'-Auflösung zuerst.
  // Einzelbuchstaben-Overrides (t→d, p→b, g→k/j, k→kʰ) hingegen ERST NACH den
  // Mehrzeichen-RULES — liefen sie davor, zerstörten sie Digraphen wie
  // 'th'/'pf'/'ng' ('theater'→'dheater', 'finger'→'finker'), bevor deren Regel greift.
  const overrides = (dialektId && DIALECT_OVERRIDES[dialektId]) || [];
  for (const [from, to] of overrides) {
    if (from.length >= 2) s = s.replace(new RegExp(from, 'g'), to);
  }

  // Standard-Regeln (Mehr-Zeichen zuerst, weshalb RULES so sortiert ist)
  for (const [from, to] of RULES) {
    s = s.replace(new RegExp(from, 'g'), to);
  }

  // 'ch' kontextsensitiv auflösen (steht hier noch als literales "ch", da es
  // keiner RULES-Regel unterliegt; 'sch'/'chs'/'tsch' wurden bereits ersetzt):
  //   ach-Laut [x] nach dunklem Vokal a/o/u (inkl. Diphthong aʊ̯),
  //   sonst ich-Laut [ç]. Dialekt-Overrides (χ/ʃ) haben 'ch' ggf. schon ersetzt.
  s = s.replace(/([aouʊ]̯?)ch/g, '$1x');
  s = s.replace(/ch/g, 'ç');

  // Einzelbuchstaben-Overrides jetzt — nach den Digraph-RULES, damit sie
  // 'th'/'pf'/'ng' nicht vorab zerstören.
  for (const [from, to] of overrides) {
    if (from.length === 1) s = s.replace(new RegExp(from, 'g'), to);
  }

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
