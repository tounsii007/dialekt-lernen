// Session-Combo / XP-Multiplikator — pures, session-lokales Modul.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import {
  COMBO_TIMEOUT_MS,
  COMBO_TIERS,
  comboMultiplier,
  applyComboToXp,
  registerComboHit,
  getCombo,
  resetCombo,
} from '../js/util/combo.js';

describe('COMBO_TIERS / comboMultiplier', () => {
  it('Tiers sind absteigend nach Schwelle und enden bei 0', () => {
    for (let i = 1; i < COMBO_TIERS.length; i++) {
      assert.ok(COMBO_TIERS[i].at < COMBO_TIERS[i - 1].at, 'absteigend');
    }
    assert.equal(COMBO_TIERS[COMBO_TIERS.length - 1].at, 0);
  });

  it('liefert den Multiplikator je Schwelle', () => {
    assert.equal(comboMultiplier(0), 1);
    assert.equal(comboMultiplier(1), 1);
    assert.equal(comboMultiplier(2), 1);
    assert.equal(comboMultiplier(3), 1.25);
    assert.equal(comboMultiplier(4), 1.25);
    assert.equal(comboMultiplier(5), 1.5);
    assert.equal(comboMultiplier(7), 1.5);
    assert.equal(comboMultiplier(8), 1.75);
    assert.equal(comboMultiplier(11), 1.75);
    assert.equal(comboMultiplier(12), 2);
    assert.equal(comboMultiplier(100), 2);
  });

  it('ist monoton steigend', () => {
    let prev = 0;
    for (let n = 0; n <= 20; n++) {
      const m = comboMultiplier(n);
      assert.ok(m >= prev, `monoton bei ${n}`);
      prev = m;
    }
  });

  it('robust gegen Müll-Eingaben', () => {
    assert.equal(comboMultiplier(NaN), 1);
    assert.equal(comboMultiplier(undefined), 1);
    assert.equal(comboMultiplier(-5), 1);
    assert.equal(comboMultiplier(3.9), 1.25); // wird abgerundet
  });
});

describe('applyComboToXp', () => {
  it('multipliziert und rundet ganzzahlig', () => {
    assert.equal(applyComboToXp(10, 1), 10);
    assert.equal(applyComboToXp(5, 1.25), 6);   // 6.25 → 6
    assert.equal(applyComboToXp(10, 1.5), 15);
    assert.equal(applyComboToXp(5, 1.75), 9);   // 8.75 → 9
  });

  it('robust: ungültiger Multiplikator → ×1, negatives Base → 0', () => {
    assert.equal(applyComboToXp(10, NaN), 10);
    assert.equal(applyComboToXp(10, 0), 10);
    assert.equal(applyComboToXp(10, -2), 10);
    assert.equal(applyComboToXp(-7, 1.5), 0);
  });
});

describe('registerComboHit — Aufbau & Abbruch', () => {
  beforeEach(resetCombo);

  it('baut die Combo mit jedem korrekten Review auf', () => {
    const now = 1_000_000;
    assert.deepEqual(pick(registerComboHit(true, now)), { count: 1, multiplier: 1, broken: false });
    assert.deepEqual(pick(registerComboHit(true, now + 1000)), { count: 2, multiplier: 1, broken: false });
    const third = registerComboHit(true, now + 2000);
    assert.equal(third.count, 3);
    assert.equal(third.multiplier, 1.25);
    assert.equal(third.tierUp, true); // ×1 → ×1.25
  });

  it('ein Fehler bricht die Combo (broken nur, wenn vorher aktiv)', () => {
    const now = 2_000_000;
    registerComboHit(true, now);
    registerComboHit(true, now + 1);
    const broke = registerComboHit(false, now + 2);
    assert.equal(broke.count, 0);
    assert.equal(broke.multiplier, 1);
    assert.equal(broke.broken, true);

    // Zweiter Fehler direkt danach: nichts mehr zu brechen.
    const again = registerComboHit(false, now + 3);
    assert.equal(again.broken, false);
  });

  it('lange Pause kühlt die Session ab → Combo startet neu bei 1', () => {
    const now = 3_000_000;
    registerComboHit(true, now);
    registerComboHit(true, now + 1000); // count 2, lastAt = now + 1000
    // Pause länger als das Timeout — gemessen ab dem letzten Treffer.
    const afterGap = registerComboHit(true, now + 1000 + COMBO_TIMEOUT_MS + 1);
    assert.equal(afterGap.count, 1, 'neue Combo nach Timeout');
  });

  it('getCombo spiegelt den aktuellen Stand und das Maximum', () => {
    const now = 4_000_000;
    for (let i = 0; i < 5; i++) registerComboHit(true, now + i * 10);
    let c = getCombo();
    assert.equal(c.count, 5);
    assert.equal(c.multiplier, 1.5);
    assert.equal(c.best, 5);

    registerComboHit(false, now + 100); // Abbruch
    c = getCombo();
    assert.equal(c.count, 0);
    assert.equal(c.best, 5, 'best bleibt erhalten bis resetCombo');
  });

  it('resetCombo leert Zähler und Maximum', () => {
    registerComboHit(true);
    registerComboHit(true);
    resetCombo();
    assert.deepEqual(getCombo(), { count: 0, best: 0, multiplier: 1 });
  });
});

function pick(d) {
  return { count: d.count, multiplier: d.multiplier, broken: d.broken };
}
