// Pronunciation-Scoring Tests (Web Speech ist in Node nicht verfügbar,
// aber die scoring-Funktion ist pure und testbar).

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { scorePronunciation, isPronunciationSupported } from '../js/util/pronunciation.js';

describe('scorePronunciation', () => {
  it('exakter Match → score 1', () => {
    const r = scorePronunciation('Hallo', 'Hallo');
    assert.equal(r.ok, true);
    assert.equal(r.score, 1);
  });

  it('Substring → score 0.92', () => {
    const r = scorePronunciation('Hallo', 'Hallo Welt');
    assert.equal(r.ok, true);
    assert.equal(r.score, 0.92);
  });

  it('ähnlich → ok bei ≥70%', () => {
    const r = scorePronunciation('Schorsch', 'Schorch');
    assert.ok(r.score >= 0.7);
    assert.equal(r.ok, true);
  });

  it('zu unterschiedlich → nicht ok', () => {
    const r = scorePronunciation('Hallo', 'Tschüss');
    assert.equal(r.ok, false);
    assert.ok(r.score < 0.7);
  });

  it('leere Inputs → score 0', () => {
    const r = scorePronunciation('', '');
    assert.equal(r.score, 0);
    assert.equal(r.ok, false);
  });

  it('ignoriert Diacritica via normalize', () => {
    const r = scorePronunciation('Müesli', 'muesli');
    assert.ok(r.score >= 0.7);
  });
});

describe('isPronunciationSupported', () => {
  it('returns boolean', () => {
    assert.equal(typeof isPronunciationSupported(), 'boolean');
  });
});
