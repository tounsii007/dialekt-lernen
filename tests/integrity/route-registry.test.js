// Routen-Registry — Konsistenz der Single-Source-Registry (js/util/route.js) und
// Round-Trip der URL-Übersetzung (interner Key ↔ öffentlicher englischer Slug).

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mountDom, unmountDom } from '../_setup.js';

before(mountDom);
after(unmountDom);

const { ROUTES, ROUTE_LABELS } = await import('../../js/util/route.js');
const { toPublicPath, parseHash } = await import('../../js/util/route.js');

describe('ROUTES-Registry · Konsistenz', () => {
  it('hat Einträge und jeder Eintrag besitzt einen slug-String', () => {
    const keys = Object.keys(ROUTES);
    assert.ok(keys.length >= 18, `zu wenige Routen: ${keys.length}`);
    for (const [k, r] of Object.entries(ROUTES)) {
      assert.equal(typeof r.slug, 'string', `slug fehlt: ${k}`);
      assert.ok(r.label && r.label.trim().length > 0, `label fehlt: ${k}`);
    }
  });

  it('Slugs sind eindeutig', () => {
    const slugs = Object.values(ROUTES).map(r => r.slug);
    assert.equal(new Set(slugs).size, slugs.length, `doppelter Slug: ${slugs}`);
  });

  it('ROUTE_LABELS deckt jeden Routen-Key ab', () => {
    for (const k of Object.keys(ROUTES)) assert.ok(ROUTE_LABELS[k], `Label fehlt: ${k}`);
  });

  it('keine Route trägt mehr ein lazy-Flag (alle Views werden eager geladen)', () => {
    const stillLazy = Object.entries(ROUTES).filter(([, r]) => r.lazy).map(([k]) => k);
    assert.deepEqual(stillLazy, [], `lazy-Flag übrig: ${stillLazy}`);
  });
});

describe('URL-Übersetzung · Round-Trip key → slug → key', () => {
  it('toPublicPath erzeugt englische Slug-Pfade', () => {
    assert.equal(toPublicPath('entdecken'), '/explore');
    assert.equal(toPublicPath('karte'), '/map');
    assert.equal(toPublicPath('home'), '/');
  });

  it('parseHash übersetzt öffentliche Pfade zurück in interne Keys', () => {
    for (const key of Object.keys(ROUTES)) {
      const path = toPublicPath(key);
      // FakeDOM-location für parseHash setzen
      const [p, q = ''] = path.split('?');
      globalThis.window.location.pathname = p || '/';
      globalThis.window.location.search = q ? '?' + q : '';
      const { segs } = parseHash();
      assert.equal(segs[0], key, `Round-Trip fehlgeschlagen für ${key} (${path} → ${segs[0]})`);
    }
  });

  it('erhält zusätzliche Pfad-Segmente (z.B. dialekt/hessisch)', () => {
    assert.equal(toPublicPath('dialekt/hessisch'), '/dialect/hessisch');
    globalThis.window.location.pathname = '/dialect/hessisch';
    globalThis.window.location.search = '';
    const { segs } = parseHash();
    assert.deepEqual(segs, ['dialekt', 'hessisch']);
  });
});
