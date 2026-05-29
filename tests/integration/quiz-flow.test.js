// Integration: Quiz-Lifecycle — Setup → Frage → Antwort → Result.
//
// Testet das Zusammenspiel von question-builder + state-Management.

import { describe, it, beforeEach, before, after } from 'node:test';
import assert from 'node:assert/strict';

import { ALLE_AUSDRUECKE, getDialekt } from '../../data/dialekte.js';
import { buildQuestion } from '../../js/views/quiz/question-builder.js';
import { resetState, mountDom, unmountDom } from '../_setup.js';

describe('buildQuestion — Multiple-Choice-Generierung', () => {
  beforeEach(resetState);

  function getPool(dialektId = 'hessisch') {
    const d = getDialekt(dialektId);
    return d.ausdruecke.map(a => ({
      ...a,
      dialektId: d.id,
      dialektName: d.name,
      dialektFlag: d.flag,
      dialektFarbe: d.farbe,
    }));
  }

  it('liefert prompt/options/correct', () => {
    const pool = getPool();
    const q = buildQuestion(pool[0], pool, 'dial->hd');
    assert.ok(typeof q.prompt === 'string');
    assert.ok(Array.isArray(q.options));
    assert.ok(typeof q.correct === 'string');
  });

  it('Optionen enthalten die korrekte Antwort', () => {
    const pool = getPool();
    const q = buildQuestion(pool[0], pool, 'dial->hd');
    assert.ok(q.options.includes(q.correct));
  });

  it('Optionen sind 4 (mit kleinem Pool weniger)', () => {
    const pool = getPool();
    const q = buildQuestion(pool[0], pool, 'dial->hd');
    assert.ok(q.options.length <= 4 && q.options.length >= 2);
  });

  it('Keine doppelten Optionen', () => {
    const pool = getPool();
    const q = buildQuestion(pool[0], pool, 'dial->hd');
    assert.equal(new Set(q.options).size, q.options.length);
  });

  it('direction "hd->dial": prompt ist Hochdeutsch', () => {
    const pool = getPool();
    const item = pool[0];
    const q = buildQuestion(item, pool, 'hd->dial');
    assert.equal(q.prompt, item.hochdeutsch);
    assert.equal(q.correct, item.ausdruck);
  });

  it('direction "dial->hd": prompt ist Ausdruck', () => {
    const pool = getPool();
    const item = pool[0];
    const q = buildQuestion(item, pool, 'dial->hd');
    assert.equal(q.prompt, item.ausdruck);
    assert.equal(q.correct, item.hochdeutsch);
  });

  it('robust mit pool < 4 Items', () => {
    const small = getPool().slice(0, 2);
    assert.doesNotThrow(() => buildQuestion(small[0], small, 'dial->hd'));
  });
});

describe('Quiz-Flow: viele Fragen aus echten Daten', () => {
  it('100 zufällige Fragen lassen sich ohne Crash bauen', () => {
    const pool = ALLE_AUSDRUECKE;
    for (let i = 0; i < 100; i++) {
      const item = pool[Math.floor(Math.random() * pool.length)];
      const q = buildQuestion(item, pool, 'dial->hd');
      assert.ok(q.prompt);
      assert.ok(q.correct);
      assert.ok(q.options.includes(q.correct));
    }
  });

  it('Region-erraten: korrekte Antwort ist Dialekt-Name', () => {
    const pool = ALLE_AUSDRUECKE.slice(0, 50);
    const q = buildQuestion(pool[0], pool, 'region');
    // Bei Region-Modus ist die korrekte Antwort der Dialekt-Name
    assert.ok(q.correct);
    assert.ok(q.options.includes(q.correct));
  });
});

describe('renderQuizQuestion — Antwort-Markierung über data-Flag', () => {
  before(mountDom);
  after(unmountDom);

  // Sammelt alle gerenderten Antwort-Buttons aus dem FakeDOM-Baum.
  // (querySelectorAll ist im Mock ein No-op → manuell traversieren.)
  function collectOptions(node, out = []) {
    if (node && node.className === 'quiz-option') out.push(node);
    for (const c of (node?.childNodes || [])) collectOptions(c, out);
    return out;
  }

  it('markiert genau die korrekte Option — auch bei Substring-Kollision', async () => {
    const { renderQuizQuestion } = await import('../../js/views/quiz/question.js');
    // "Hausmeister" enthält "Haus" als Substring — der frühere
    // textContent.includes()-Match hätte hier die falsche Karte markiert.
    const q = {
      prompt: 'Haus', sub: '',
      item: { ausdruck: 'Haus', dialektLang: 'de-DE' },
      options: ['Hausmeister', 'Haus', 'Maus', 'Laus'],
      correct: 'Haus',
    };
    const quiz = { questions: [q], idx: 0, score: 0, history: [], timerEnabled: false };
    const wrap = renderQuizQuestion(quiz, { onAbort() {}, onAnswer() {} });

    const buttons = collectOptions(wrap);
    assert.equal(buttons.length, 4);

    const flagged = buttons.filter(b => b.dataset.isCorrect === '1');
    assert.equal(flagged.length, 1, 'genau eine Option ist als korrekt geflaggt');
    assert.equal(flagged[0].dataset.opt, 'Haus');

    // Der Substring-Treffer darf NICHT als korrekt markiert sein.
    const hausmeister = buttons.find(b => b.dataset.opt === 'Hausmeister');
    assert.equal(hausmeister.dataset.isCorrect, '0');
  });
});
