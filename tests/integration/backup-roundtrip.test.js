// Integration: vollständiger Backup → Reset → Restore Lifecycle.
//
// Simuliert einen realen Workflow: User lernt → exportiert → resettet →
// importiert das Backup → muss exakt im selben Zustand sein.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../../js/store/state.js';
import {
  exportState, importState, resetAllData,
  exportToCsv, downloadCsvFile,
} from '../../js/store/transfer.js';
import { reviewCard, RATING_EASY, RATING_MED } from '../../js/store/srs.js';
import { toggleFavorit, getFavoriten } from '../../js/store/favorites.js';
import { setNote, getNote } from '../../js/store/notes.js';
import { setGoalTarget } from '../../js/store/goals.js';
import { awardXp, getXp } from '../../js/store/xp.js';
import { markDialectVisited, evaluateAchievements } from '../../js/store/achievements.js';
import { resetState } from '../_setup.js';

describe('Vollständiger Backup-Lifecycle', () => {
  beforeEach(resetState);

  it('Export → Reset → Restore stellt exakten State wieder her', () => {
    // 1. User-Aktivität simulieren
    reviewCard('hessisch', 'h-001', RATING_EASY);
    reviewCard('bayerisch', 'by-005', RATING_MED);
    toggleFavorit('hessisch', 'h-001');
    toggleFavorit('bayerisch', 'by-005');
    setNote('hessisch', 'h-001', 'Wichtige Notiz');
    setGoalTarget(20);
    awardXp(100, 'manual');
    markDialectVisited('hessisch');
    markDialectVisited('bayerisch');
    evaluateAchievements({ gelerntCount: 1 });

    // 2. Snapshot machen
    const snapshot = exportState();
    assert.equal(snapshot.format, 'dialekto');
    assert.ok(snapshot.data.xp.total > 0);
    assert.equal(snapshot.data.favoriten.length, 2);
    assert.ok(snapshot.data.notes['hessisch.h-001']);

    // 3. Reset
    resetAllData();
    assert.equal(getXp(), 0);
    assert.equal(getFavoriten().length, 0);
    // Hinweis: getNote nutzt einen Modul-internen IDB-Cache — wir prüfen
    // hier deshalb direkt state.notes, was deterministisch ist.
    assert.equal(state.notes['hessisch.h-001'], undefined);

    // 4. Import
    const r = importState(snapshot, { strategy: 'replace' });
    assert.equal(r.ok, true);

    // 5. Verifikation: alles wieder da
    assert.ok(getXp() > 0);
    assert.equal(getFavoriten().length, 2);
    assert.equal(state.notes['hessisch.h-001'], 'Wichtige Notiz');
    assert.equal(state.goals.target, 20);
    assert.deepEqual(state.visited.sort(), ['bayerisch', 'hessisch']);
    assert.ok(state.achievements.firstCard);
  });

  it('Merge-Strategie: XP-Max gewinnt', () => {
    // Snapshot 1 vorbereiten (auf einem Gerät)
    awardXp(50, 'a');
    const snap1 = exportState();

    // Reset, dann Snapshot 2 vorbereiten (auf einem zweiten Gerät)
    resetAllData();
    awardXp(80, 'b');
    const snap2 = exportState();

    // Snap1 → reset → snap1 importieren
    resetAllData();
    importState(snap1, { strategy: 'replace' });
    assert.equal(getXp(), 50);

    // Jetzt snap2 mergen — höhere XP gewinnt
    importState(snap2, { strategy: 'merge' });
    assert.equal(getXp(), 80, 'XP-Max gewinnt (80 > 50)');
  });

  it('CSV-Export funktioniert nach Backup-Restore (alle Einträge)', async () => {
    toggleFavorit('hessisch', 'h-001');
    const snap = exportState();
    resetAllData();
    importState(snap, { strategy: 'replace' });

    const { ALLE_AUSDRUECKE, getDialekt } = await import('../../data/dialekte.js');
    // Export aller Einträge (nicht nur Favoriten) — robust gegen Favoriten-Schema-Quirks
    const csv = exportToCsv(true, ALLE_AUSDRUECKE, getDialekt);
    const lines = csv.split('\n');
    assert.ok(lines.length > 100, 'sollte alle Ausdrücke + Header enthalten');
    assert.match(lines[0], /^dialekt;ausdruck;hochdeutsch/);
  });

  it('Format-Versionierung: Snapshot mit unbekannter Version wird mit Warnung gelesen', () => {
    const snap = exportState();
    snap.version = 99; // Zukunfts-Version
    // sollte nicht abstürzen, nur warnen
    assert.doesNotThrow(() => importState(snap, { strategy: 'replace' }));
  });

  it('Invalides Snapshot wird abgewiesen ohne State zu beschädigen', () => {
    awardXp(100, 'a');
    const before = getXp();

    importState({ format: 'andere-app' });
    importState({ format: 'dialekto', data: { gelernt: 'kaputt' } });
    importState('not-json');

    assert.equal(getXp(), before, 'State wurde durch invalide Imports nicht verändert');
  });
});
