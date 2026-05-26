// Hangman-Logik Tests

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { newGame, guess, isWon, isLost, display, remainingAlphabet } from '../js/util/hangman.js';

describe('Hangman', () => {
  it('newGame initialisiert mit Word + 0 Fehlern', () => {
    const g = newGame('hallo');
    assert.equal(g.word, 'hallo');
    assert.equal(g.mistakes, 0);
    assert.equal(g.guessed.size, 0);
    assert.equal(g.hits.size, 0);
  });

  it('newGame normalisiert auf lowercase', () => {
    const g = newGame('HALLO');
    assert.equal(g.word, 'hallo');
  });

  it('guess trifft einen Buchstaben', () => {
    let g = newGame('hallo');
    g = guess(g, 'h');
    assert.ok(g.hits.has('h'));
    assert.equal(g.mistakes, 0);
  });

  it('guess miss erhöht mistakes', () => {
    let g = newGame('hallo');
    g = guess(g, 'x');
    assert.equal(g.mistakes, 1);
    assert.equal(g.hits.size, 0);
  });

  it('doppeltes guess wird ignoriert', () => {
    let g = newGame('hallo');
    g = guess(g, 'h');
    const m1 = g.mistakes;
    g = guess(g, 'h');
    assert.equal(g.mistakes, m1);
  });

  it('display zeigt Lücken', () => {
    let g = newGame('hi');
    assert.equal(display(g), '_ _');
    g = guess(g, 'h');
    assert.equal(display(g), 'h _');
  });

  it('isWon wenn alle Buchstaben getroffen', () => {
    let g = newGame('hi');
    g = guess(g, 'h');
    g = guess(g, 'i');
    assert.equal(isWon(g), true);
  });

  it('isLost nach maxMistakes', () => {
    let g = newGame('hallo', 3);
    g = guess(g, 'x'); g = guess(g, 'y'); g = guess(g, 'z');
    assert.equal(isLost(g), true);
  });

  it('remainingAlphabet entfernt geratene', () => {
    let g = newGame('hallo');
    g = guess(g, 'h');
    const rem = remainingAlphabet(g);
    assert.ok(!rem.includes('h'));
    assert.ok(rem.includes('a'));
  });
});
