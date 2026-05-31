// Integration: reviewCard() → SRS + XP + Goals + Streak laufen verkettet.
//
// Verifiziert, dass eine einzelne reviewCard-Aktion alle gekoppelten
// Subsysteme korrekt anspricht und konsistente Daten liefert.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../../js/store/state.js';
import { reviewCard, RATING_EASY, RATING_MED, RATING_HARD } from '../../js/store/srs.js';
import { getXp, XP } from '../../js/store/xp.js';
import { comboMultiplier, applyComboToXp } from '../../js/util/combo.js';
import { getTodayProgress } from '../../js/store/goals.js';
import { getStreak } from '../../js/store/streak.js';
import { resetState } from '../_setup.js';

describe('reviewCard löst SRS + XP + Goals + Streak gleichzeitig aus', () => {
  beforeEach(resetState);

  it('EASY-Rating: XP-cardLearned wird vergeben', () => {
    reviewCard('hessisch', 'h-001', RATING_EASY);
    assert.equal(getXp(), XP.cardLearned);
  });

  it('MED-Rating: XP-cardReviewed wird vergeben (weniger als EASY)', () => {
    reviewCard('hessisch', 'h-001', RATING_MED);
    assert.equal(getXp(), XP.cardReviewed);
    assert.ok(XP.cardReviewed < XP.cardLearned);
  });

  it('HARD-Rating: XP-cardReviewed wird auch vergeben', () => {
    reviewCard('hessisch', 'h-001', RATING_HARD);
    assert.equal(getXp(), XP.cardReviewed);
  });

  it('Tages-Goal-Progress wird bei jedem Review inkrementiert', () => {
    reviewCard('hessisch', 'h-001', RATING_EASY);
    assert.equal(getTodayProgress(), 1);
    reviewCard('hessisch', 'h-002', RATING_MED);
    assert.equal(getTodayProgress(), 2);
  });

  it('Streak wird bei erstem Review heute auf 1 gesetzt', () => {
    assert.equal(getStreak(), 0);
    reviewCard('hessisch', 'h-001', RATING_EASY);
    assert.equal(getStreak(), 1);
  });

  it('SRS-Record wird gespeichert', () => {
    reviewCard('hessisch', 'h-001', RATING_EASY);
    const rec = state.gelernt['hessisch.h-001'];
    assert.ok(rec);
    assert.equal(rec.reps, 1);
    assert.equal(rec.interval, 1);
    assert.equal(rec.lapses, 0);
    assert.equal(rec.stand, 3);
  });

  it('Mehrere Reviews verkette sich konsistent', () => {
    reviewCard('hessisch', 'h-001', RATING_EASY);
    reviewCard('hessisch', 'h-002', RATING_EASY);
    reviewCard('hessisch', 'h-003', RATING_MED);
    // Drei korrekte Reviews in Folge bauen eine Combo auf (count 1→2→3); ab
    // count 3 greift der ×1.25-Multiplikator. XP wird entsprechend skaliert.
    const expectedXp =
      applyComboToXp(XP.cardLearned,  comboMultiplier(1)) +
      applyComboToXp(XP.cardLearned,  comboMultiplier(2)) +
      applyComboToXp(XP.cardReviewed, comboMultiplier(3));
    assert.equal(getXp(), expectedXp);
    assert.equal(getTodayProgress(), 3);
    assert.equal(Object.keys(state.gelernt).length, 3);
  });
});

describe('Goal-Met-Event wird ausgelöst bei genauem Erreichen des Ziels', () => {
  beforeEach(() => {
    resetState();
    // DOM-loses Test-Environment — document.dispatchEvent ist nicht da,
    // aber reviewCard fängt das in try/catch ab.
    state.goals.target = 3;
  });

  it('keine Exception wenn document fehlt', () => {
    assert.doesNotThrow(() => {
      reviewCard('hessisch', 'h-001', RATING_EASY);
      reviewCard('hessisch', 'h-002', RATING_EASY);
      reviewCard('hessisch', 'h-003', RATING_EASY);
    });
    assert.equal(getTodayProgress(), 3);
  });
});
