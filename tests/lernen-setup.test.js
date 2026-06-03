// Frontend: Struktur-Smoke-Test für die neue Lernen-Setup-Seite (Lern-Hub).
// FakeDOM hat kein echtes querySelectorAll → wir traversieren .children selbst.

import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { mountDom, unmountDom, resetState } from './_setup.js';

before(mountDom);
after(unmountDom);

const { renderSetup } = await import('../js/views/lernen/setup.js');
const { DIALEKTE } = await import('../data/dialekte.js');
const { setLernstand, STATUS_LEARNED } = await import('../js/store/learning.js');

// Rekursiv alle Knoten sammeln, deren className-Token-Liste `cls` enthält.
function byClass(root, cls) {
  const out = [];
  (function walk(node) {
    for (const c of (node.children || [])) {
      if (String(c.className || '').split(/\s+/).includes(cls)) out.push(c);
      walk(c);
    }
  })(root);
  return out;
}

const noop = () => {};

describe('renderSetup — Lern-Hub-Struktur', () => {
  beforeEach(resetState);

  it('Root trägt .lernen-view', () => {
    const v = renderSetup(noop);
    assert.ok(String(v.className).split(/\s+/).includes('lernen-view'));
  });

  it('genau 3 Modus-Gruppen mit insgesamt 10 Modus-Buttons', () => {
    const v = renderSetup(noop);
    assert.equal(byClass(v, 'learn-mode-group').length, 3);
    assert.equal(byClass(v, 'learn-mode').length, 10);
  });

  it('genau ein aktiver Modus', () => {
    const v = renderSetup(noop);
    const active = byClass(v, 'learn-mode').filter(b =>
      String(b.className).split(/\s+/).includes('is-active'));
    assert.equal(active.length, 1);
  });

  it('Level-Block + 5 Dashboard-Kacheln vorhanden', () => {
    const v = renderSetup(noop);
    assert.equal(byClass(v, 'lv-level-num').length, 1);
    assert.equal(byClass(v, 'lv-stat').length, 5);
  });

  it('eine "Alle Dialekte"-Karte + je eine Karte pro Dialekt (mit Fortschrittsbalken)', () => {
    const v = renderSetup(noop);
    assert.equal(byClass(v, 'lv-all-card').length, 1);
    // Alle + jeder Dialekt sind learn-dialekt-cards (Themen kommen zusätzlich obendrauf).
    assert.ok(byClass(v, 'learn-dialekt-card').length >= DIALEKTE.length + 1);
    // Jede dieser Karten hat genau einen Fortschrittsbalken.
    assert.ok(byClass(v, 'ldc-progress-fill').length >= DIALEKTE.length + 1);
  });

  it('alle [data-count]-Werte sind endliche Zahlen', () => {
    const v = renderSetup(noop);
    for (const n of byClass(v, 'lv-stat-num')) {
      assert.ok(Number.isFinite(Number(n.dataset.count)), `count=${n.dataset.count}`);
    }
  });

  it('rendert ohne Fehler — frisch und nach Lernfortschritt', () => {
    assert.doesNotThrow(() => renderSetup(noop));
    DIALEKTE[0].ausdruecke.slice(0, 5).forEach(a =>
      setLernstand(DIALEKTE[0].id, a.id, STATUS_LEARNED));
    assert.doesNotThrow(() => renderSetup(noop));
  });

  it('Modus-Auswahl ruft onStart mit gewähltem Modus + Quelle nicht beim Rendern', () => {
    let called = 0;
    renderSetup(() => { called++; });
    assert.equal(called, 0); // onStart darf erst bei Klick feuern, nicht beim Aufbau
  });
});
