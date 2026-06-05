// Quiz-View — ohne aktives Quiz wird die Setup-UI gerendert.

import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { mountDom, unmountDom, resetState } from '../_setup.js';

before(mountDom);
after(unmountDom);

const { renderQuiz } = await import('../../js/views/quiz.js');

function collectText(node, acc = []) {
  if (!node) return acc;
  const kids = node.childNodes || [];
  if (kids.length === 0 && node.textContent) acc.push(node.textContent);
  for (const c of kids) collectText(c, acc);
  return acc;
}

describe('renderQuiz — Setup', () => {
  beforeEach(resetState);

  it('erzeugt Inhalt ohne aktives Quiz', () => {
    const root = document.createElement('div');
    renderQuiz(root);
    assert.ok(root.childNodes.length > 0, 'Quiz-Setup sollte rendern');
  });

  it('bietet mindestens einen klickbaren Button (Start/Modus)', () => {
    const root = document.createElement('div');
    renderQuiz(root);
    const buttons = root.querySelectorAll('button');
    assert.ok(buttons.length > 0, 'kein Button im Quiz-Setup');
  });

  it('erwähnt „Quiz" in der UI', () => {
    const root = document.createElement('div');
    renderQuiz(root);
    const text = collectText(root).join(' ');
    assert.match(text, /Quiz/i, 'Quiz-Bezug fehlt');
  });
});
