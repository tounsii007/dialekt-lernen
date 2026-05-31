// IPA-Konvertierung Tests

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { toIpa, formatIpa, splitSyllables } from '../js/util/ipa.js';

describe('toIpa', () => {
  it('handles simple words', () => {
    assert.equal(toIpa('haus'), 'haʊ̯s');
  });
  it('converts sch to ʃ', () => {
    assert.equal(toIpa('schule'), 'ʃule');
  });
  it('converts ng to ŋ', () => {
    const result = toIpa('jung');
    assert.ok(result.endsWith('ŋ'), `expected ng→ŋ, got: ${result}`);
  });
  it('handles dialekt overrides — kölsch g→j', () => {
    const koelsch = toIpa('gut', 'koelsch');
    assert.ok(koelsch.startsWith('j'), `expected j-start, got: ${koelsch}`);
  });
  it('handles dialekt overrides — schweizer ch→χ', () => {
    const ch = toIpa('chuche', 'schwizerduetsch');
    assert.ok(ch.includes('χ'), `expected χ, got: ${ch}`);
  });
  it('handles empty input', () => {
    assert.equal(toIpa(''), '');
    assert.equal(toIpa(null), '');
  });
});

describe('formatIpa', () => {
  it('wraps with slashes', () => {
    const result = formatIpa('test');
    assert.ok(result.startsWith('/') && result.endsWith('/'));
  });
});

describe('splitSyllables', () => {
  it('leeres / fehlendes Eingabe → []', () => {
    assert.deepEqual(splitSyllables(''), []);
    assert.deepEqual(splitSyllables(null), []);
  });

  it('einsilbige Wörter bleiben ungetrennt', () => {
    assert.deepEqual(splitSyllables('Haus'), ['Haus']);
    assert.deepEqual(splitSyllables('Mann'), ['Mann']);
  });

  it('V-CV: ein Konsonant wandert zur Folgesilbe', () => {
    assert.deepEqual(splitSyllables('Hase'), ['Ha', 'se']);
  });

  it('VC-CV: bei zwei Konsonanten bleibt einer bei der Vorsilbe', () => {
    assert.deepEqual(splitSyllables('Morgen'), ['Mor', 'gen']);
  });

  it('maximaler Anlaut: „sch" bleibt zusammen in der Folgesilbe', () => {
    assert.deepEqual(splitSyllables('Wäsche'), ['Wä', 'sche']);
  });

  it('„st" als Anlaut der Folgesilbe', () => {
    assert.deepEqual(splitSyllables('Sprache'), ['Spra', 'che']);
  });

  it('behält Groß-/Kleinschreibung bei', () => {
    const parts = splitSyllables('Lampe');
    assert.equal(parts.join(''), 'Lampe');
    assert.equal(parts[0][0], 'L');
  });

  it('Phrasen werden über Wortgrenzen flach zerlegt', () => {
    const parts = splitSyllables('gute Nacht');
    // „gu-te" + „Nacht" (einsilbig) → mindestens drei Teile, Wortinhalt erhalten.
    assert.ok(parts.length >= 3);
    assert.equal(parts.join('').replace(/\s/g, ''), 'guteNacht');
  });

  it('jede Silbe enthält mindestens einen Vokal', () => {
    for (const w of ['Brezel', 'Fenster', 'Apfel', 'Wasser']) {
      for (const syl of splitSyllables(w)) {
        assert.match(syl, /[aeiouäöüy]/i, `Silbe „${syl}" von „${w}" ohne Vokal`);
      }
    }
  });
});
