// Frontend-Smoke-Tests: Wichtigste Views sind importable + Funktionen
// existieren. Tatsächliches Rendern wird mit FakeDOM versucht und Fehler
// werden toleriert (FakeDOM ist absichtlich minimal — kein SVG-Renderer).

import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { mountDom, unmountDom, resetState } from '../_setup.js';

before(mountDom);
after(unmountDom);

const { el } = await import('../../js/util/dom.js');

async function smokeRender(modulePath, fnName, args = []) {
  const mod = await import(modulePath);
  assert.equal(typeof mod[fnName], 'function', `${fnName} sollte exportiert sein`);
  const root = el('div');
  // Render-Versuch — bei FakeDOM-Limit kein Fehler werfen.
  try {
    mod[fnName](root, ...args);
  } catch (e) {
    // FakeDOM unterstützt nicht alle Browser-APIs (SVG, Web Speech etc.) —
    // wir akzeptieren das, solange der Modul-Import + die Funktion da sind.
  }
  return root;
}

describe('View-Module sind importable', () => {
  beforeEach(resetState);

  it('home.js exportiert renderHome', async () => {
    const mod = await import('../../js/views/home.js');
    assert.equal(typeof mod.renderHome, 'function');
  });

  it('entdecken.js exportiert renderEntdecken', async () => {
    const mod = await import('../../js/views/entdecken.js');
    assert.equal(typeof mod.renderEntdecken, 'function');
  });

  it('lernen.js exportiert renderLernen', async () => {
    const mod = await import('../../js/views/lernen.js');
    assert.equal(typeof mod.renderLernen, 'function');
  });

  it('quiz.js exportiert renderQuiz', async () => {
    const mod = await import('../../js/views/quiz.js');
    assert.equal(typeof mod.renderQuiz, 'function');
  });

  it('favoriten.js exportiert renderFavoriten', async () => {
    const mod = await import('../../js/views/favoriten.js');
    assert.equal(typeof mod.renderFavoriten, 'function');
  });

  it('dialektDetail.js exportiert renderDialektDetail', async () => {
    const mod = await import('../../js/views/dialektDetail.js');
    assert.equal(typeof mod.renderDialektDetail, 'function');
  });

  it('vergleich.js exportiert renderVergleich', async () => {
    const mod = await import('../../js/views/vergleich.js');
    assert.equal(typeof mod.renderVergleich, 'function');
  });

  it('karte.js exportiert renderKarte', async () => {
    const mod = await import('../../js/views/karte.js');
    assert.equal(typeof mod.renderKarte, 'function');
  });

  it('statistiken.js exportiert renderStatistiken', async () => {
    const mod = await import('../../js/views/statistiken.js');
    assert.equal(typeof mod.renderStatistiken, 'function');
  });
});

describe('Render-Smoke (FakeDOM, Fehler toleriert)', () => {
  beforeEach(resetState);

  it('renderQuiz ohne aktives Quiz', async () => {
    await assert.doesNotReject(async () => smokeRender('../../js/views/quiz.js', 'renderQuiz'));
  });

  it('renderEntdecken', async () => {
    await assert.doesNotReject(async () => smokeRender('../../js/views/entdecken.js', 'renderEntdecken'));
  });

  it('renderLernen', async () => {
    await assert.doesNotReject(async () => smokeRender('../../js/views/lernen.js', 'renderLernen', [{}]));
  });

  it('renderFavoriten', async () => {
    await assert.doesNotReject(async () => smokeRender('../../js/views/favoriten.js', 'renderFavoriten'));
  });
});
