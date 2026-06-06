// Aussprache (Respelling) pro Dialekt — ein charakteristischer Fall je Dialekt.
// Stellt sicher, dass jede dialektale Lautregel greift und kein Profil leer läuft.
// Ergänzt die allgemeine Logik in voice-profiles.test.js.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { respellForTts, VOICE_PROFILES, hasVoiceProfile } from '../js/util/voice-profiles.js';
import { DIALEKTE } from '../data/dialekte.js';

// Pro Dialekt: Eingabe → erwartetes Lautmerkmal (Regex auf dem Ergebnis).
// `note` dokumentiert die geprüfte Aussprache-Eigenheit.
const CASES = [
  // — Bairisch-österreichischer Raum: „ist→is", „nicht→net" —
  { id: 'bayerisch',        input: 'Das ist nicht so',     expect: /\bis\b.*\bnet\b/, note: 'ist→is, nicht→net' },
  { id: 'oberpfaelzisch',   input: 'Das ist nicht so',     expect: /\bis\b.*\bnet\b/, note: 'ist→is, nicht→net' },
  { id: 'wienerisch',       input: 'Das ist gut',          expect: /\bis\b/,          note: 'ist→is' },
  { id: 'tirolerisch',      input: 'Das ist gut',          expect: /\bis\b/,          note: 'ist→is' },
  { id: 'steirisch',        input: 'Das ist gut',          expect: /\bis\b/,          note: 'ist→is' },
  { id: 'kaerntnerisch',    input: 'Das ist gut',          expect: /\bis\b/,          note: 'ist→is' },

  // — Fränkisch/Mitteldeutsch: Lenisierung p/t/k → b/d/g —
  { id: 'fraenkisch',       input: 'Tag',                  expect: /dag/,             note: 't→d (Lenisierung)' },
  { id: 'thueringisch',     input: 'Tag ist',              expect: /dag.*\bis\b/,     note: 't→d, ist→is' },
  { id: 'saechsisch',       input: 'Bein',                 expect: /been/,            note: 'ei→ee' },

  // — Alemannisch/Schwäbisch: st→scht, sp→schp, k→ch —
  { id: 'schwaebisch',      input: 'Fenster',              expect: /fenschter/,       note: 'st→scht' },
  { id: 'badisch',          input: 'Fenster',              expect: /fenschter/,       note: 'st→scht' },
  { id: 'alemannisch',      input: 'Kind',                 expect: /chind/,           note: 'k→ch initial' },
  { id: 'vorarlbergerisch', input: 'Kind Fenster',         expect: /chind.*fenschter/, note: 'k→ch, st→scht' },
  { id: 'schwizerduetsch',  input: 'Kind ist',             expect: /chind.*\bis\b/,   note: 'k→ch, ist→is' },

  // — Rheinfränkisch/Hessisch: ich→isch, das→des, Tag→tach —
  { id: 'pfaelzisch',       input: 'ich das',              expect: /isch.*des/,       note: 'ich→isch, das→des' },
  { id: 'saarlaendisch',    input: 'ich das',              expect: /isch.*des/,       note: 'ich→isch, das→des' },
  { id: 'hessisch',         input: 'Tag',                  expect: /tach/,            note: 'g→ch im Auslaut' },

  // — Rheinland/Ruhr: g→j, ich→isch, das→dat/wat —
  { id: 'koelsch',          input: 'gut ich',              expect: /jut.*isch/,       note: 'g→j, ich→isch' },
  { id: 'ruhrdeutsch',      input: 'das was',              expect: /dat.*wat/,        note: 'das→dat, was→wat' },

  // — Berlin/Brandenburg: g→j, ich→ick, das→dat —
  { id: 'berlinisch',       input: 'gut ich',              expect: /jut.*ick/,        note: 'g→j, ich→ick' },
  { id: 'brandenburgisch',  input: 'gut das',              expect: /jut.*dat/,        note: 'g→j, das→dat' },

  // — Niederdeutsch (Platt): das→dat, ich→ik, pf→p —
  { id: 'plattdeutsch',     input: 'Apfel ich',            expect: /apel.*\bik\b/,    note: 'pf→p, ich→ik' },
  { id: 'ostfriesisch',     input: 'Apfel das',            expect: /apel.*dat/,       note: 'pf→p, das→dat' },
  { id: 'mecklenburgisch',  input: 'Apfel das',            expect: /apel.*dat/,       note: 'pf→p, das→dat' },
];

describe('Respelling — charakteristische Aussprache pro Dialekt', () => {
  for (const { id, input, expect, note } of CASES) {
    it(`${id}: „${input}" → ${note}`, () => {
      assert.ok(hasVoiceProfile(id), `Kein Stimmprofil für „${id}"`);
      const out = respellForTts(input, id);
      assert.match(out, expect, `„${input}" → „${out}" erfüllt ${expect} nicht`);
    });
  }
});

describe('Respelling — Abdeckung & Robustheit', () => {
  it('jeder registrierte Dialekt hat einen Aussprache-Testfall', () => {
    const tested = new Set(CASES.map((c) => c.id));
    for (const d of DIALEKTE) {
      assert.ok(tested.has(d.id), `Aussprache-Testfall fehlt für „${d.id}"`);
    }
  });

  it('jeder Profil-Dialekt mit Regeln verändert mindestens einen Probe-Satz', () => {
    const probe = 'Ich sage: das ist nicht der Apfel im Fenster, gut Kind!';
    for (const [id, p] of Object.entries(VOICE_PROFILES)) {
      if (!p.respell || !p.respell.length) continue;
      const out = respellForTts(probe, id);
      assert.notEqual(out, probe.toLowerCase(), `„${id}" hat den Satz nicht verändert`);
      assert.ok(out.trim().length, `„${id}" lieferte leer`);
    }
  });
});
