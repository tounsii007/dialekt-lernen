// Integration: Store-Schreibvorgänge → persist() → Speicher-Warnung.
//
// Verzahnt favorites.js + state.js: mehrere echte Store-Operationen unter
// vollem Speicher dürfen den User nur EINMAL warnen, während der In-Memory-
// State korrekt bleibt. Nutzt eine code-basierte QuotaExceededError (code 22)
// und deckt damit einen anderen isQuotaError-Zweig ab als der Unit-Test
// (tests/state-storage.test.js, name-basiert).
//
// node --test isoliert jede Datei in einem eigenen Prozess → wir präparieren
// globalThis VOR dem dynamischen Import.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const events = [];
let quotaFull = false;
const backing = {};

globalThis.CustomEvent = class CustomEvent {
  constructor(type, init) { this.type = type; this.detail = init?.detail ?? null; }
};
globalThis.window = { dispatchEvent(e) { events.push(e); return true; } };
globalThis.localStorage = {
  getItem: (k) => (k in backing ? backing[k] : null),
  setItem: (k, v) => {
    if (quotaFull) {
      const err = new Error('quota exceeded');
      err.code = 22; // DOMException QUOTA_EXCEEDED_ERR — ohne .name
      throw err;
    }
    backing[k] = v;
  },
  removeItem: (k) => { delete backing[k]; },
};

const { state } = await import('../../js/store/state.js');
const { toggleFavorit, isFavorit } = await import('../../js/store/favorites.js');

describe('Integration: Store-Schreibvorgänge unter vollem Speicher', () => {
  it('erster Toggle unter Quota: State korrekt + genau eine Warnung (code 22)', () => {
    state.favoriten = [];
    quotaFull = true;
    events.length = 0;

    const added = toggleFavorit('hessisch', 'h-001');

    assert.equal(added, true);
    assert.equal(isFavorit('hessisch', 'h-001'), true,
      'In-Memory-State bleibt trotz Persist-Fehler korrekt');
    assert.equal(events.length, 1, 'code-22 Quota-Fehler löst genau eine Warnung aus');
    assert.equal(events[0].type, 'dialekto:storage-full');
  });

  it('weitere Store-Operationen warnen nicht erneut (One-Shot)', () => {
    events.length = 0;
    toggleFavorit('bayerisch', 'b-001');     // add
    toggleFavorit('koelsch', 'k-001');       // add
    toggleFavorit('koelsch', 'k-001');       // remove
    assert.equal(events.length, 0, 'One-Shot gilt über mehrere Store-Ops hinweg');
  });

  it('State-Mutationen wurden trotz Persist-Fehlern angewandt', () => {
    assert.equal(isFavorit('bayerisch', 'b-001'), true);
    assert.equal(isFavorit('koelsch', 'k-001'), false, 'wieder entfernt');
  });
});
