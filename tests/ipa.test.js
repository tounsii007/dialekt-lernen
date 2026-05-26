// IPA-Konvertierung Tests

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { toIpa, formatIpa } from '../js/util/ipa.js';

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
