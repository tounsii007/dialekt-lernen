// Daten-Integrität — deckt strukturelle Schwachstellen in den Dialekt-Daten auf
// (6759 Ausdrücke / 24 Dialekte). Läuft rein datengetrieben, kein DOM nötig.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { DIALEKTE, ALLE_AUSDRUECKE, DIALEKT_INDEX, getDialekt, getAusdruck } from '../../data/dialekte.js';
import { DIALEKT_COUNT, AUSDRUCK_COUNT } from '../../js/version.js';

describe('Dialekte · Struktur', () => {
  it('DIALEKTE ist nicht leer und matcht die Versions-Zählung', () => {
    assert.ok(Array.isArray(DIALEKTE) && DIALEKTE.length > 0);
    assert.equal(DIALEKTE.length, DIALEKT_COUNT, 'DIALEKTE.length ≠ version.DIALEKT_COUNT');
  });

  it('jeder Dialekt hat id/name/flag/farbe(Hex)/ausdruecke[]', () => {
    for (const d of DIALEKTE) {
      assert.ok(d.id && typeof d.id === 'string', `id fehlt: ${d.name}`);
      assert.ok(d.name && d.name.trim().length > 0, `name fehlt: ${d.id}`);
      assert.ok(d.flag && d.flag.length >= 1, `flag fehlt: ${d.id}`);
      assert.ok(/^#[0-9a-fA-F]{6}$/.test(d.farbe), `farbe kein Hex (${d.id}): ${d.farbe}`);
      assert.ok(Array.isArray(d.ausdruecke) && d.ausdruecke.length > 0, `keine Ausdrücke: ${d.id}`);
    }
  });

  it('Dialekt-IDs sind eindeutig', () => {
    const ids = DIALEKTE.map(d => d.id);
    assert.equal(new Set(ids).size, ids.length, 'doppelte Dialekt-ID');
  });

  it('jeder Dialekt hat eine sinnvolle Mindestzahl an Ausdrücken (≥ 20)', () => {
    const dünn = DIALEKTE.filter(d => d.ausdruecke.length < 20).map(d => `${d.id}:${d.ausdruecke.length}`);
    assert.deepEqual(dünn, [], `zu dünne Dialekte: ${dünn}`);
  });

  it('DIALEKT_INDEX liefert O(1)-Lookup für jeden Dialekt', () => {
    for (const d of DIALEKTE) assert.equal(DIALEKT_INDEX[d.id]?.id, d.id);
  });
});

describe('Ausdrücke · Felder & Eindeutigkeit', () => {
  it('ALLE_AUSDRUECKE matcht Summe der Dialekt-Ausdrücke und Versions-Zählung', () => {
    const sum = DIALEKTE.reduce((n, d) => n + d.ausdruecke.length, 0);
    assert.equal(ALLE_AUSDRUECKE.length, sum, 'ALLE_AUSDRUECKE ≠ Summe');
    assert.equal(ALLE_AUSDRUECKE.length, AUSDRUCK_COUNT, 'ALLE_AUSDRUECKE ≠ version.AUSDRUCK_COUNT');
  });

  it('jeder Ausdruck hat nicht-leeres ausdruck + hochdeutsch (ohne Rand-Whitespace)', () => {
    const bad = [];
    for (const a of ALLE_AUSDRUECKE) {
      if (!a.ausdruck || a.ausdruck.trim().length === 0) bad.push(`leer.ausdruck @${a.dialektId}/${a.id}`);
      else if (a.ausdruck !== a.ausdruck.trim()) bad.push(`whitespace.ausdruck "${a.ausdruck}" @${a.dialektId}/${a.id}`);
      if (!a.hochdeutsch || a.hochdeutsch.trim().length === 0) bad.push(`leer.hochdeutsch @${a.dialektId}/${a.id}`);
      else if (a.hochdeutsch !== a.hochdeutsch.trim()) bad.push(`whitespace.hochdeutsch @${a.dialektId}/${a.id}`);
    }
    assert.deepEqual(bad.slice(0, 20), [], `${bad.length} Feld-Probleme, z.B.: ${bad.slice(0, 8).join(' | ')}`);
  });

  it('Ausdruck-IDs sind innerhalb jedes Dialekts eindeutig', () => {
    for (const d of DIALEKTE) {
      const ids = d.ausdruecke.map(a => a.id);
      assert.equal(new Set(ids).size, ids.length, `doppelte Ausdruck-ID in ${d.id}`);
    }
  });

  it('ALLE_AUSDRUECKE ist mit dialektId/dialektName/dialektFlag angereichert', () => {
    for (const a of ALLE_AUSDRUECKE.slice(0, 500)) {
      assert.ok(a.dialektId && a.dialektName && a.dialektFlag, `Anreicherung fehlt @${a.id}`);
      assert.equal(DIALEKT_INDEX[a.dialektId]?.name, a.dialektName, `dialektName inkonsistent @${a.id}`);
    }
  });

  it('getAusdruck/getDialekt liefern konsistente Objekte', () => {
    const a = ALLE_AUSDRUECKE[0];
    assert.equal(getDialekt(a.dialektId)?.id, a.dialektId);
    assert.equal(getAusdruck(a.dialektId, a.id)?.id, a.id);
  });
});
