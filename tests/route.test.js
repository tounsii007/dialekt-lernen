// route.js — History-API-Routing mit englischen, hash-losen URLs.
// Interne Keys bleiben deutsch; die URL nutzt englische Slugs.

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mountDom, unmountDom } from './_setup.js';

before(mountDom);
after(unmountDom);

const { parseHash, go, toPublicPath } = await import('../js/util/route.js');

function setPath(pathname, search = '') {
  globalThis.window.location.pathname = pathname;
  globalThis.window.location.search = search;
  globalThis.location = globalThis.window.location;
}

describe('parseHash (Pfad → interne Segmente)', () => {
  it('Wurzel "/" → segs ["home"], params leer', () => {
    setPath('/');
    const r = parseHash();
    assert.deepEqual(r.segs, ['home']);
    assert.deepEqual(r.params, {});
  });

  it('englischer Slug /explore → ["entdecken"]', () => {
    setPath('/explore');
    assert.deepEqual(parseHash().segs, ['entdecken']);
  });

  it('mehrteilig /dialect/hessisch → ["dialekt","hessisch"]', () => {
    setPath('/dialect/hessisch');
    assert.deepEqual(parseHash().segs, ['dialekt', 'hessisch']);
  });

  it('Query-Parameter /quiz?...', () => {
    setPath('/quiz', '?source=hessisch&direction=hd-to-dial');
    const r = parseHash();
    assert.deepEqual(r.segs, ['quiz']);
    assert.equal(r.params.source, 'hessisch');
    assert.equal(r.params.direction, 'hd-to-dial');
  });

  it('mehrere Parameter dekodiert (/map?…)', () => {
    setPath('/map', '?lat=50.1&lng=8.7&zoom=10');
    const { params } = parseHash();
    assert.equal(Object.keys(params).length, 3);
  });

  it('unbekannter Slug fällt auf sich selbst zurück', () => {
    setPath('/voellig-unbekannt');
    assert.deepEqual(parseHash().segs, ['voellig-unbekannt']);
  });
});

describe('toPublicPath (interner Key → englischer Pfad)', () => {
  it('deutscher Key → englischer Slug', () => {
    assert.equal(toPublicPath('#/karte'), '/map');
    assert.equal(toPublicPath('/lernen'), '/learn');
    assert.equal(toPublicPath('entdecken'), '/explore');
  });
  it('home → "/"', () => {
    assert.equal(toPublicPath('#/'), '/');
  });
  it('mehrteilig + Query bleibt erhalten', () => {
    assert.equal(toPublicPath('#/dialekt/hessisch'), '/dialect/hessisch');
    assert.equal(toPublicPath('#/quiz?source=x'), '/quiz?source=x');
  });
});

describe('go (History-API)', () => {
  it('navigiert zur englischen URL', () => {
    go('/lernen');
    assert.equal(globalThis.window.location.pathname, '/learn');
  });

  it('akzeptiert auch Hash-Präfix und übersetzt', () => {
    go('#/karte');
    assert.equal(globalThis.window.location.pathname, '/map');
  });
});
