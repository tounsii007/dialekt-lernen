// Unit: state.js saveAll() — Speicher-Warnung statt stillem Datenverlust.
//
// state.js liest localStorage beim Import und exportiert persist(). saveAll()
// ist intern; wir lösen es über persist() aus. Bei vollem Speicher
// (QuotaExceededError) feuert es EINMALIG das Event 'dialekto:storage-full';
// bei Privacy-Mode / sonstigen Schreibfehlern bleibt es absichtlich still.
//
// `node --test` isoliert jede Datei in einem eigenen Prozess → frischer
// Modul-Cache. Daher dürfen wir globalThis VOR dem dynamischen Import
// von state.js präparieren, damit safeStorage() unseren Mock benutzt.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// --- Mock-Globals VOR dem state.js-Import ---
const events = [];
let throwMode = null; // null | 'quota' | 'other'
const backing = {};

globalThis.CustomEvent = class CustomEvent {
  constructor(type, init) { this.type = type; this.detail = init?.detail ?? null; }
};
globalThis.window = {
  dispatchEvent(e) { events.push(e); return true; },
};
globalThis.localStorage = {
  getItem: (k) => (k in backing ? backing[k] : null),
  setItem: (k, v) => {
    if (throwMode === 'quota') {
      const err = new Error('storage quota exceeded');
      err.name = 'QuotaExceededError';
      throw err;
    }
    if (throwMode === 'other') {
      // z.B. Privacy-Mode / SecurityError — kein Quota-Problem.
      throw new Error('write blocked by privacy mode');
    }
    backing[k] = v;
  },
  removeItem: (k) => { delete backing[k]; },
};

const { persist } = await import('../js/store/state.js');

// Reihenfolge ist relevant: storageWarned ist ein modulweiter One-Shot-Flag.
describe('saveAll — Speicher-Warnung (dialekto:storage-full)', () => {
  it('Import von state.js feuert kein Event (loadAll ruft kein saveAll)', () => {
    assert.equal(events.length, 0);
  });

  it('normaler Save feuert kein Event', () => {
    events.length = 0;
    throwMode = null;
    persist();
    assert.equal(events.length, 0);
  });

  it('nicht-Quota-Fehler (Privacy/Security) bleibt still', () => {
    events.length = 0;
    throwMode = 'other';
    persist();
    assert.equal(events.length, 0, 'nur Quota soll warnen, nicht jeder Schreibfehler');
  });

  it('QuotaExceededError feuert genau ein dialekto:storage-full', () => {
    events.length = 0;
    throwMode = 'quota';
    persist();
    assert.equal(events.length, 1);
    assert.equal(events[0].type, 'dialekto:storage-full');
  });

  it('One-Shot: weitere Quota-Fehler feuern NICHT erneut', () => {
    events.length = 0;
    throwMode = 'quota';
    persist();
    persist();
    persist();
    assert.equal(events.length, 0, 'Warnung nur einmal pro Sitzung');
  });
});
