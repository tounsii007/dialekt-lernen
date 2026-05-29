// Quiz-State (views/quiz/state.js) + Quiz-Store (store/quiz.js).

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import { getQuiz, setQuiz, clearQuiz } from '../js/views/quiz/state.js';
import {
  saveQuizResult, getQuizHistory, getQuizGenauigkeit,
} from '../js/store/quiz.js';
import { resetState } from './_setup.js';

describe('views/quiz/state — Session-State', () => {
  it('initial null', () => {
    clearQuiz();
    assert.equal(getQuiz(), null);
  });

  it('setQuiz + getQuiz', () => {
    setQuiz({ idx: 0, questions: [], score: 0 });
    assert.equal(getQuiz().idx, 0);
  });

  it('clearQuiz', () => {
    setQuiz({ idx: 5 });
    clearQuiz();
    assert.equal(getQuiz(), null);
  });
});

describe('store/quiz — Historie und Statistik', () => {
  beforeEach(resetState);

  it('saveQuizResult fügt Eintrag hinzu', () => {
    saveQuizResult(8, 10, 'hessisch');
    assert.equal(state.quizHistory.length, 1);
    assert.equal(state.quizHistory[0].score, 8);
  });

  it('saveQuizResult aktualisiert lernStats', () => {
    saveQuizResult(7, 10);
    assert.equal(state.lernStats.total, 10);
    assert.equal(state.lernStats.korrekt, 7);
  });

  it('kumuliert über mehrere Quizze', () => {
    saveQuizResult(5, 10);
    saveQuizResult(8, 10);
    assert.equal(state.lernStats.total, 20);
    assert.equal(state.lernStats.korrekt, 13);
  });

  it('History wird auf MAX_HISTORY (50) begrenzt', () => {
    for (let i = 0; i < 60; i++) saveQuizResult(5, 10);
    assert.equal(state.quizHistory.length, 50);
  });

  it('clampt negative oder NaN-Werte', () => {
    saveQuizResult(-5, 10);
    assert.equal(state.lernStats.korrekt, 0);
    saveQuizResult(8, NaN);
    assert.equal(state.lernStats.total, 10);
  });

  it('getQuizHistory liefert reverse-sortiert (neueste zuerst)', () => {
    saveQuizResult(5, 10);
    saveQuizResult(8, 10);
    const h = getQuizHistory();
    assert.equal(h[0].score, 8);
  });

  it('getQuizGenauigkeit: 0 wenn noch keine Quizze', () => {
    assert.equal(getQuizGenauigkeit(), 0);
  });

  it('getQuizGenauigkeit: Prozent der Gesamtleistung', () => {
    saveQuizResult(7, 10);
    saveQuizResult(8, 10);
    // 15/20 = 75%
    assert.equal(getQuizGenauigkeit(), 75);
  });
});
