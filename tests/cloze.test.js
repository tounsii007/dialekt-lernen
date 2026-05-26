// Lückentext-Logik: extrahiere das Ausdruck-Wort aus dem Beispielsatz.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { buildCloze, renderClozeText, CLOZE_PLACEHOLDER } from '../js/util/cloze.js';

describe('buildCloze — Wortgrenzen erkennen', () => {
  it('Einfacher Treffer am Anfang', () => {
    const r = buildCloze('Bembel mit fünf Schoppen.', 'Bembel');
    assert.equal(r.found, true);
    assert.equal(r.before, '');
    assert.equal(r.hidden, 'Bembel');
    assert.equal(r.after, ' mit fünf Schoppen.');
  });

  it('Treffer in der Mitte', () => {
    const r = buildCloze('Bring emol en Bembel mit!', 'Bembel');
    assert.equal(r.found, true);
    assert.equal(r.hidden, 'Bembel');
  });

  it('Geclippte Dialektform (Hex → Hexe-Ausdruck)', () => {
    const r = buildCloze("D'Hex isch durch d'Strasse gflogen.", 'Hexe');
    assert.equal(r.found, true);
    // Sollte "Hex" als Match finden
    assert.equal(r.hidden, 'Hex');
  });

  it('Case-insensitiv — findet eines der core-words', () => {
    const r = buildCloze('GUTE Morgen!', 'guete morge');
    assert.equal(r.found, true);
    // findet entweder GUTE oder Morgen (das mit dem längsten Präfix-Match)
    assert.ok(['GUTE', 'Morgen'].includes(r.hidden));
  });

  it('Mehrwort-Ausdruck — findet einen der core-words', () => {
    const r = buildCloze('Ich sage Glück Auf zu allen!', 'Glück auf');
    assert.equal(r.found, true);
    // "Glück" ist core word, sollte gefunden werden
    assert.ok(['Glück', 'Auf'].includes(r.hidden));
  });

  it('Diakritik-tolerant', () => {
    const r = buildCloze('Die Mödl ist freundlich.', 'Madl');
    // "Madl" → "madl", "Mödl" → "modl"; gemeinsamer Präfix "m" — nur 1 Zeichen,
    // also kein Match. Erwartung: kein Treffer.
    assert.equal(r.found, false);
  });

  it('Kein Match → Fallback mit Platzhalter am Ende', () => {
    const r = buildCloze('Hallo Welt!', 'xyz');
    assert.equal(r.found, false);
  });
});

describe('renderClozeText — Platzhalter einfügen', () => {
  it('Ersetzt Ausdruck mit _____', () => {
    const text = renderClozeText('Bring emol en Bembel mit!', 'Bembel');
    assert.ok(text.includes(CLOZE_PLACEHOLDER));
    assert.ok(!text.includes('Bembel'));
  });

  it('Kein Match → Platzhalter angehängt', () => {
    const text = renderClozeText('Hallo Welt!', 'xyz');
    assert.ok(text.includes(CLOZE_PLACEHOLDER));
  });
});

describe('buildCloze — Edge Cases', () => {
  it('Leerer Ausdruck → kein Cloze', () => {
    const r = buildCloze('Hallo!', '');
    assert.equal(r.found, false);
  });

  it('Leerer Beispielsatz → kein Cloze', () => {
    const r = buildCloze('', 'Bembel');
    assert.equal(r.found, false);
  });

  it('Ausdruck mit Sonderzeichen (Apostroph)', () => {
    const r = buildCloze("Ick sag dir wat.", "Ick");
    assert.equal(r.found, true);
    assert.equal(r.hidden, 'Ick');
  });
});
