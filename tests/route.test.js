// route.js — Hash-Routing-Helper.

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mountDom, unmountDom } from './_setup.js';

before(mountDom);
after(unmountDom);

const { parseHash, go } = await import('../js/util/route.js');

function setHash(h) { globalThis.window.location.hash = h; globalThis.location = globalThis.window.location; }

describe('parseHash', () => {
  it('Default-Hash → segs leer, params leer', () => {
    setHash('');
    const r = parseHash();
    assert.deepEqual(r.segs, []);
    assert.deepEqual(r.params, {});
  });

  it('einfache Route /entdecken', () => {
    setHash('#/entdecken');
    assert.deepEqual(parseHash().segs, ['entdecken']);
  });

  it('mehrteilige Route /dialekt/hessisch', () => {
    setHash('#/dialekt/hessisch');
    assert.deepEqual(parseHash().segs, ['dialekt', 'hessisch']);
  });

  it('Query-Parameter', () => {
    setHash('#/quiz?source=hessisch&direction=hd-to-dial');
    const r = parseHash();
    assert.deepEqual(r.segs, ['quiz']);
    assert.equal(r.params.source, 'hessisch');
    assert.equal(r.params.direction, 'hd-to-dial');
  });

  it('mehrere Parameter dekodiert', () => {
    setHash('#/karte?lat=50.1&lng=8.7&zoom=10');
    const { params } = parseHash();
    assert.equal(Object.keys(params).length, 3);
  });

  it('liefert raw-Pfad zur Weiterverarbeitung', () => {
    setHash('#/dialekt/bayerisch');
    assert.equal(parseHash().raw, '/dialekt/bayerisch');
  });
});

describe('go', () => {
  it('setzt location.hash mit #-Präfix', () => {
    go('/lernen');
    assert.equal(globalThis.window.location.hash, '#/lernen');
  });

  it('akzeptiert auch Hash mit Präfix', () => {
    go('#/quiz');
    assert.equal(globalThis.window.location.hash, '#/quiz');
  });
});
