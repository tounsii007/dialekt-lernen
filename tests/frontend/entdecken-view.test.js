// Entdecken-View — rendert das Dialekt-Raster + Live-Suche.

import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { mountDom, unmountDom, resetState } from '../_setup.js';

before(mountDom);
after(unmountDom);

const { renderEntdecken } = await import('../../js/views/entdecken.js');
const { DIALEKTE } = await import('../../data/dialekte.js');

describe('renderEntdecken', () => {
  beforeEach(resetState);

  it('rendert ein Such-Eingabefeld', () => {
    const root = document.createElement('div');
    renderEntdecken(root);
    assert.ok(root.querySelector('input'), 'Suchfeld fehlt');
  });

  it('rendert eine Dialekt-Karte pro Dialekt', () => {
    const root = document.createElement('div');
    renderEntdecken(root);
    const cards = root.querySelectorAll('.dialekt-card');
    assert.ok(cards.length >= DIALEKTE.length, `nur ${cards.length} Karten für ${DIALEKTE.length} Dialekte`);
  });

  it('Live-Suche filtert das Raster (input-Event)', () => {
    const root = document.createElement('div');
    renderEntdecken(root);
    const input = root.querySelector('input');
    const before = root.querySelectorAll('.dialekt-card').length;
    input.value = 'zzzznichtvorhanden';
    input.dispatchEvent({ type: 'input', target: input });
    const after = root.querySelectorAll('.dialekt-card').length;
    assert.ok(after < before, `Suche sollte filtern: vorher ${before}, nachher ${after}`);
  });
});
