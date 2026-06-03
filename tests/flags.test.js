// flags.js — inline SVG-Flaggen für die Sprachauswahl.

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mountDom, unmountDom } from './_setup.js';

before(mountDom);
after(unmountDom);

const { flagSvg, hasFlag } = await import('../js/util/flags.js');

describe('flagSvg', () => {
  it('liefert ein SVG-Element', () => {
    const el = flagSvg('de');
    assert.equal(el.tagName, 'SVG');
    assert.equal(el.getAttribute('class'), 'lang-flag');
  });

  it('hat Markup für jede unterstützte Sprache', () => {
    for (const l of ['de', 'en', 'tr', 'fr', 'es']) {
      const el = flagSvg(l);
      assert.ok(el.innerHTML && el.innerHTML.length > 10, `Flagge ${l} sollte Markup haben`);
    }
  });

  it('Größe skaliert 3:2 (Breite = 1.5 × Höhe)', () => {
    const el = flagSvg('fr', 20);
    assert.equal(el.getAttribute('height'), '20');
    assert.equal(el.getAttribute('width'), '30');
  });

  it('unbekannte Sprache → grauer Fallback, kein Crash', () => {
    assert.doesNotThrow(() => flagSvg('xx'));
    assert.equal(hasFlag('xx'), false);
    assert.equal(hasFlag('de'), true);
  });
});
