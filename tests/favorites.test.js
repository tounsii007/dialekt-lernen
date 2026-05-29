// favorites.js — Favoriten add/remove/list.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import { isFavorit, toggleFavorit, getFavoriten } from '../js/store/favorites.js';
import { resetState } from './_setup.js';

describe('toggleFavorit', () => {
  beforeEach(resetState);

  it('fügt einen Favoriten hinzu', () => {
    const added = toggleFavorit('hessisch', 'h-001');
    assert.equal(added, true);
    assert.equal(isFavorit('hessisch', 'h-001'), true);
  });

  it('entfernt einen Favoriten bei zweitem Toggle', () => {
    toggleFavorit('hessisch', 'h-001');
    const removed = toggleFavorit('hessisch', 'h-001');
    assert.equal(removed, false);
    assert.equal(isFavorit('hessisch', 'h-001'), false);
  });

  it('mehrere Favoriten parallel', () => {
    toggleFavorit('hessisch', 'h-001');
    toggleFavorit('bayerisch', 'by-001');
    toggleFavorit('plattdeutsch', 'p-001');
    assert.equal(state.favoriten.length, 3);
  });

  it('persistiert in state.favoriten als ".(-getrennte Keys', () => {
    toggleFavorit('berlinisch', 'b-042');
    assert.ok(state.favoriten.includes('berlinisch.b-042'));
  });
});

describe('isFavorit', () => {
  beforeEach(resetState);

  it('false für nicht-existierenden Favoriten', () => {
    assert.equal(isFavorit('xyz', 'xyz-001'), false);
  });

  it('true nach Hinzufügen', () => {
    toggleFavorit('hessisch', 'h-001');
    assert.equal(isFavorit('hessisch', 'h-001'), true);
  });
});

describe('getFavoriten', () => {
  beforeEach(resetState);

  it('leeres Array bei keinem Favoriten', () => {
    assert.deepEqual(getFavoriten(), []);
  });

  it('liefert {dialektId, ausdruckId}-Objekte', () => {
    toggleFavorit('hessisch', 'h-001');
    toggleFavorit('bayerisch', 'by-005');
    const favs = getFavoriten();
    assert.equal(favs.length, 2);
    assert.deepEqual(favs[0], { dialektId: 'hessisch', ausdruckId: 'h-001' });
    assert.deepEqual(favs[1], { dialektId: 'bayerisch', ausdruckId: 'by-005' });
  });

  it('Reihenfolge entspricht Insert-Order', () => {
    ['c', 'a', 'b'].forEach(id => toggleFavorit('hessisch', id));
    const ids = getFavoriten().map(f => f.ausdruckId);
    assert.deepEqual(ids, ['c', 'a', 'b']);
  });
});
