// Pronunciation-Scoring Tests (Web Speech ist in Node nicht verfügbar,
// aber die scoring-Funktion ist pure und testbar).

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  scorePronunciation,
  isPronunciationSupported,
  phoneticFold,
  scoreBestAlternative,
} from '../js/util/pronunciation.js';

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

describe('phoneticFold', () => {
  it('kollabiert doppelte Buchstaben', () => {
    assert.equal(phoneticFold('mann'), 'man');
    assert.equal(phoneticFold('schiff'), 'schif');
  });
  it('faltet ph→f, ck→k, th→t', () => {
    assert.equal(phoneticFold('photo'), 'foto');
    assert.equal(phoneticFold('zucker'), 'tsuker');
    assert.equal(phoneticFold('thron'), 'tron');
  });
  it('leere/fehlende Eingabe → leerer String', () => {
    assert.equal(phoneticFold(''), '');
    assert.equal(phoneticFold(null), '');
  });
});

describe('scorePronunciation — phonetische Toleranz', () => {
  it('lautgleiche Schreibweisen → score 0.9 (ph~f)', () => {
    const r = scorePronunciation('Foto', 'Photo');
    assert.equal(r.score, 0.9);
    assert.equal(r.ok, true);
  });
  it('Dialekt-Schreibweise besteht dank Laut-Faltung (Vadder ~ Fatter)', () => {
    const r = scorePronunciation('Vadder', 'Fatter');
    assert.ok(r.score >= 0.7, `erwartet >=0.7, war ${r.score}`);
    assert.equal(r.ok, true);
  });
  it('zu unterschiedlich bleibt trotz Faltung nicht ok', () => {
    const r = scorePronunciation('Hallo', 'Tschüss');
    assert.equal(r.ok, false);
  });
});

describe('scoreBestAlternative', () => {
  it('wählt die beste Variante aus der Liste', () => {
    const r = scoreBestAlternative('Hallo', ['Tschüss', 'Hallo', 'xyz']);
    assert.equal(r.transcript, 'Hallo');
    assert.equal(r.score, 1);
    assert.equal(r.ok, true);
  });
  it('leere/fehlende Liste → score 0, ok false', () => {
    assert.equal(scoreBestAlternative('Hallo', []).score, 0);
    assert.equal(scoreBestAlternative('Hallo', undefined).ok, false);
    assert.equal(scoreBestAlternative('Hallo', null).transcript, '');
  });
  it('akzeptiert einen einzelnen String', () => {
    const r = scoreBestAlternative('Hallo', 'Hallo');
    assert.equal(r.score, 1);
  });
  it('ignoriert leere/nicht-String-Einträge', () => {
    const r = scoreBestAlternative('Hallo', ['', null, 'Hallo']);
    assert.equal(r.transcript, 'Hallo');
    assert.equal(r.ok, true);
  });
});

describe('isPronunciationSupported', () => {
  it('returns boolean', () => {
    assert.equal(typeof isPronunciationSupported(), 'boolean');
  });
});
