// settings.js — Nutzer-Einstellungen (Animationen, Erklärungs-Sprache).

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import {
  getAnimationsEnabled, setAnimationsEnabled,
  getExplanationLang, setExplanationLang, EXPLANATION_LANGS
} from '../js/store/settings.js';
import { resetState } from './_setup.js';

describe('Animationen-Einstellung', () => {
  beforeEach(resetState);

  it('Default: an', () => {
    assert.equal(getAnimationsEnabled(), true);
  });

  it('lässt sich abschalten und persistiert', () => {
    setAnimationsEnabled(false);
    assert.equal(getAnimationsEnabled(), false);
    assert.equal(state.settings.animations, false);
  });

  it('lässt sich wieder anschalten', () => {
    setAnimationsEnabled(false);
    setAnimationsEnabled(true);
    assert.equal(getAnimationsEnabled(), true);
  });
});

describe('Erklärungs-Sprache', () => {
  beforeEach(resetState);

  it('Default: de', () => {
    assert.equal(getExplanationLang(), 'de');
  });

  it('akzeptiert unterstützte Sprachen', () => {
    for (const l of EXPLANATION_LANGS) {
      setExplanationLang(l);
      assert.equal(getExplanationLang(), l);
    }
  });

  it('fällt bei unbekannter Sprache auf de zurück', () => {
    setExplanationLang('xx');
    assert.equal(getExplanationLang(), 'de');
  });
});
