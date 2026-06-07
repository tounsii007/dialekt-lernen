export const meta = {
  name: 'translate-bedeutungen',
  description: 'Übersetzt die deutschen Ausdrucks-Erklärungen batchweise in EN/TR/FR/ES',
  phases: [{ title: 'Übersetzen', detail: 'ein Agent pro Batch-Datei (_batches/bNNN.json)' }],
};

let A = args;
if (typeof A === 'string') { try { A = JSON.parse(A); } catch (e) { A = {}; } }
if (typeof A !== 'object' || !A) A = {};
const firstBatch = A.firstBatch || 0;
const count = A.count || 16;
const pad = A.pad || 3;

const batchNums = [];
for (let i = 0; i < count; i++) batchNums.push(firstBatch + i);

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    batch: { type: 'number' },
    count: { type: 'number' },
    translations: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          key: { type: 'string' }, en: { type: 'string' }, tr: { type: 'string' },
          fr: { type: 'string' }, es: { type: 'string' },
        },
        required: ['key', 'en', 'tr', 'fr', 'es'],
      },
    },
  },
  required: ['batch', 'translations'],
};

function fname(n) { return 'data/translations/_batches/b' + String(n).padStart(pad, '0') + '.json'; }

function buildPrompt(n) {
  const f = fname(n);
  return [
    'Du uebersetzt Dialekt-Erklaerungen der Dialekto-App in vier Sprachen.',
    '',
    'SCHRITT 1: Lies die Datei ' + f + '. Sie ist ein JSON-Array von Objekten { key, de }:',
    'key = "<dialektId>.<ausdruckId>", de = deutsche Erklaerung des Ausdrucks.',
    'Bearbeite NUR diese Datei und ALLE ihre Eintraege. Lies/aendere keine anderen Dateien.',
    '',
    'SCHRITT 2: Uebersetze fuer JEDEN Eintrag die deutsche "de"-Erklaerung natuerlich und praezise in:',
    'en (Englisch), tr (Tuerkisch), fr (Franzoesisch), es (Spanisch).',
    'Richtlinien:',
    '- Es sind ERKLAERUNGEN von Dialektausdruecken (oft mit Herkunft, Beispielen, Region). Uebersetze',
    '  den erklaerenden Fliesstext idiomatisch. Der dialektale Ausdruck selbst und Eigennamen (Orte,',
    '  „Bembel", „Moin", Regionen, Personen) bleiben im Original — wie im DE-Text ggf. kurz erlaeutert.',
    '- Ton und Informationsgehalt exakt erhalten. Keine Zusaetze, keine Auslassungen.',
    '- Gib NIE den unveraenderten deutschen Satz als Uebersetzung zurueck (ausser reine Eigennamen).',
    '- Achte auf korrekte Sprache je Feld (tr=Tuerkisch, fr=Franzoesisch, es=Spanisch).',
    '',
    'RUECKGABE: { batch: ' + n + ', count: <Anzahl>, translations: [ { key, en, tr, fr, es } ] }.',
    'key MUSS exakt aus der Datei stammen. Gib ALLE Eintraege der Datei zurueck.',
  ].join('\n');
}

phase('Übersetzen');
const thunks = batchNums.map(function (n) {
  return function () {
    return agent(buildPrompt(n), { label: 'tr:b' + n, schema: SCHEMA });
  };
});
const raw = await parallel(thunks);
const results = raw.filter(Boolean);
const totalTr = results.reduce(function (s, r) { return s + ((r.translations && r.translations.length) || 0); }, 0);
log(results.length + '/' + batchNums.length + ' Batches uebersetzt, ' + totalTr + ' Eintraege (b' + firstBatch + '–b' + (firstBatch + count - 1) + ')');
return results;
