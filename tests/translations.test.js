// Erklärungs-Übersetzungen — Loader + Daten-Integrität.

import { describe, it, before, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { resetState } from './_setup.js';
import { setExplanationLang } from '../js/store/settings.js';
import { initTranslations, translatedBedeutung } from '../js/util/translations.js';
import { getAusdruck } from '../data/dialekte.js';

const LANGS = ['en', 'tr', 'fr', 'es'];
const maps = {};

before(async () => {
  for (const l of LANGS) {
    maps[l] = (await import(`../data/translations/${l}.js`)).default;
  }
});

describe('Übersetzungs-Daten', () => {
  it('alle 4 Sprachen haben denselben Key-Satz', () => {
    const ref = Object.keys(maps.en).sort().join(',');
    for (const l of LANGS) {
      assert.equal(Object.keys(maps[l]).sort().join(','), ref, `${l}: Key-Satz weicht ab`);
    }
  });

  it('jeder Key referenziert einen existierenden Ausdruck + nicht-leerer Wert', () => {
    for (const l of LANGS) {
      for (const [key, val] of Object.entries(maps[l])) {
        const dot = key.indexOf('.');
        assert.ok(dot > 0, `${l}: ungültiger Key ${key}`);
        const d = key.slice(0, dot), id = key.slice(dot + 1);
        assert.ok(getAusdruck(d, id), `${l}: Key ${key} → kein Ausdruck`);
        assert.ok(typeof val === 'string' && val.trim().length > 0, `${l}: ${key} leer`);
      }
    }
  });
});

describe('translatedBedeutung', () => {
  beforeEach(resetState);

  it('de (Default) → null (Fallback auf deutsches Original)', async () => {
    setExplanationLang('de');
    await initTranslations();
    assert.equal(translatedBedeutung('hessisch', 'h-001'), null);
  });

  it('en → liefert englische Erklärung', async () => {
    setExplanationLang('en');
    await initTranslations();
    const t = translatedBedeutung('hessisch', 'h-001');
    assert.ok(t && /greeting/i.test(t), 'sollte englische Erklärung sein');
  });

  it('unbekannter Key → null', async () => {
    setExplanationLang('en');
    await initTranslations();
    assert.equal(translatedBedeutung('hessisch', 'h-999'), null);
  });
});
