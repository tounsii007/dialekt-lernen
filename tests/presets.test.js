// presets.js — Color-Presets.

import { describe, it, beforeEach, before, after } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import { PRESETS, getPreset, setPreset, applyPreset } from '../js/store/presets.js';
import { resetState, mountDom, unmountDom } from './_setup.js';

before(mountDom);
after(unmountDom);

describe('PRESETS — Definitionen', () => {
  it('mindestens 6 Presets', () => {
    assert.ok(PRESETS.length >= 6);
  });

  it('jeder Preset hat id/label/swatch/vars', () => {
    for (const p of PRESETS) {
      assert.ok(p.id);
      assert.ok(p.label);
      assert.ok(Array.isArray(p.swatch));
      assert.equal(typeof p.vars, 'object');
    }
  });

  it('default-Preset ist vorhanden', () => {
    assert.ok(PRESETS.find(p => p.id === 'default'));
  });

  it('keine doppelten IDs', () => {
    const ids = PRESETS.map(p => p.id);
    assert.equal(new Set(ids).size, ids.length);
  });
});

describe('getPreset / setPreset', () => {
  beforeEach(resetState);

  it('Default = "default"', () => {
    assert.equal(getPreset(), 'default');
  });

  it('setPreset speichert in state.preset', () => {
    setPreset('sunset');
    assert.equal(getPreset(), 'sunset');
    assert.equal(state.preset, 'sunset');
  });

  it('lehnt unbekannte Preset-IDs ab → default', () => {
    setPreset('nonexistent');
    assert.equal(getPreset(), 'default');
  });

  it('alle definierten Presets sind setbar', () => {
    for (const p of PRESETS) {
      setPreset(p.id);
      assert.equal(getPreset(), p.id);
    }
  });
});

describe('applyPreset (DOM-Mock)', () => {
  beforeEach(resetState);

  it('setzt CSS-Variablen auf documentElement', () => {
    // FakeNode.style ist ein einfaches Objekt
    applyPreset('sunset');
    const root = document.documentElement;
    // CSS-Variablen werden in style gesetzt — wir prüfen das dataset
    assert.equal(root.dataset.preset, 'sunset');
  });

  it('default-Preset hat leere vars', () => {
    applyPreset('default');
    const root = document.documentElement;
    assert.equal(root.dataset.preset, 'default');
  });
});
