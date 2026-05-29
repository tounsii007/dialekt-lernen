// Frontend: Render-Smoke-Tests für partials.js.
//
// Wir prüfen, dass renderExpressionCard/renderDialektCard ohne Crash laufen
// und die richtige Struktur erzeugen (Klassen, dataset, Tag).

import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { mountDom, unmountDom, resetState } from '../_setup.js';

before(mountDom);
after(unmountDom);

const partials = await import('../../js/views/partials.js');
const { ALLE_AUSDRUECKE, getDialekt } = await import('../../data/dialekte.js');

const dialekt = getDialekt('hessisch');
const sampleAusdruck = ALLE_AUSDRUECKE.find(a => a.dialektId === 'hessisch');

describe('renderDialektCard', () => {
  beforeEach(resetState);

  it('liefert einen Button', () => {
    const card = partials.renderDialektCard(dialekt);
    assert.equal(card.tagName, 'BUTTON');
  });

  it('hat Klasse "dialekt-card"', () => {
    const card = partials.renderDialektCard(dialekt);
    assert.equal(card.className, 'dialekt-card');
  });

  it('hat dataset.spotlight und dataset.tilt', () => {
    const card = partials.renderDialektCard(dialekt);
    assert.equal(card.dataset.spotlight, '');
    assert.equal(card.dataset.tilt, '');
  });

  it('enthält mehrere Kind-Elemente (Flag, Name, Region, Desc, Foot)', () => {
    const card = partials.renderDialektCard(dialekt);
    assert.ok(card.children.length >= 5);
  });
});

describe('renderExpressionCard', () => {
  beforeEach(resetState);

  it('liefert eine article', () => {
    const card = partials.renderExpressionCard(sampleAusdruck, dialekt);
    assert.equal(card.tagName, 'ARTICLE');
  });

  it('hat dataset.id und dataset.cat', () => {
    const card = partials.renderExpressionCard(sampleAusdruck, dialekt);
    assert.equal(card.dataset.id, sampleAusdruck.id);
    assert.equal(card.dataset.cat, sampleAusdruck.kategorie);
  });

  it('mehrere Sektionen vorhanden (head, hd, meaning, ...)', () => {
    const card = partials.renderExpressionCard(sampleAusdruck, dialekt);
    assert.ok(card.children.length >= 3);
  });

  it('robust mit verschiedenen Dialekten und Ausdrücken', () => {
    for (const dId of ['hessisch', 'bayerisch', 'plattdeutsch']) {
      const d = getDialekt(dId);
      const a = ALLE_AUSDRUECKE.find(x => x.dialektId === dId);
      assert.doesNotThrow(() => partials.renderExpressionCard(a, d));
    }
  });

  it('robust auch bei Ausdrücken ohne Beispiel', () => {
    const minimal = {
      id: 'test-001',
      ausdruck: 'X',
      hochdeutsch: 'Y',
      bedeutung: 'Z'.repeat(100),
      kategorie: 'alltag',
      beispiel: null,
      beispiel_hd: null,
    };
    assert.doesNotThrow(() => partials.renderExpressionCard(minimal, dialekt));
  });
});
