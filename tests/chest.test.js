// Täglicher Belohnungs-Chest — deterministisch über injizierte Tagesschlüssel.
// Prüft: einmal pro Tag öffenbar, Folge-Tage skalieren, Lücke setzt zurück,
// XP-/Freeze-Belohnungen werden tatsächlich vergeben.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import { resetState } from './_setup.js';
import { getXp } from '../js/store/xp.js';
import { MAX_FREEZES } from '../js/store/streak.js';
import {
  getChestState, openChest, previewReward,
  CHEST_FREEZE_EVERY, CHEST_JACKPOT_EVERY,
} from '../js/store/chest.js';

// Aufeinanderfolgende Kalendertage im Januar (keine DST-Übergänge → diff == 1).
const day = (n) => `2026-1-${n}`;

beforeEach(() => resetState());

describe('previewReward', () => {
  it('Sockel + Tagesbonus für frühe Folge-Tage', () => {
    assert.deepEqual(previewReward(1), { xp: 25, freeze: false, jackpot: false });
    assert.deepEqual(previewReward(2), { xp: 30, freeze: false, jackpot: false });
  });

  it('jeder 3. Tag legt einen Freeze obendrauf', () => {
    assert.equal(previewReward(CHEST_FREEZE_EVERY).freeze, true);
    assert.equal(previewReward(CHEST_FREEZE_EVERY * 2).freeze, true);
    assert.equal(previewReward(CHEST_FREEZE_EVERY + 1).freeze, false);
  });

  it('jeder 7. Tag ist Jackpot (XP verdoppelt)', () => {
    const r = previewReward(CHEST_JACKPOT_EVERY);
    assert.equal(r.jackpot, true);
    // Basis bei Tag 7: 20 + 7*5 = 55, verdoppelt → 110.
    assert.equal(r.xp, 110);
  });

  it('Tagesbonus deckelt (Tag 12 == Tag 15 in der Basis)', () => {
    // 20 + min(streak,12)*5 = 80 für beide; 15 ist weder durch 7 teilbar noch
    // identisch zu 12 bei Freeze (beide %3==0).
    assert.equal(previewReward(12).xp, 80);
    assert.equal(previewReward(15).xp, 80);
  });
});

describe('getChestState — Defaults', () => {
  it('frischer Zustand ist öffenbar', () => {
    const s = getChestState(day(1));
    assert.equal(s.canOpen, true);
    assert.equal(s.claimStreak, 0);
    assert.equal(s.totalOpened, 0);
    assert.equal(s.lastReward, null);
    assert.equal(s.upcomingStreak, 1);
    assert.deepEqual(s.preview, previewReward(1));
  });
});

describe('openChest — Tageslogik', () => {
  it('öffnen vergibt XP und markiert den Tag', () => {
    const before = getXp();
    const res = openChest(day(1));
    assert.equal(res.opened, true);
    assert.equal(res.reward.claimStreak, 1);
    assert.equal(res.reward.xp, 25);
    assert.equal(getXp(), before + 25);
    assert.equal(state.chest.lastDay, day(1));
    assert.equal(state.chest.claimStreak, 1);
    assert.equal(state.chest.totalOpened, 1);
  });

  it('zweites Öffnen am selben Tag ist gesperrt', () => {
    openChest(day(1));
    const xpAfterFirst = getXp();
    const res = openChest(day(1));
    assert.equal(res.opened, false);
    assert.equal(res.reason, 'already');
    assert.equal(getXp(), xpAfterFirst, 'keine weitere XP');
    assert.equal(state.chest.totalOpened, 1);
  });

  it('aufeinanderfolgende Tage erhöhen den Claim-Streak', () => {
    openChest(day(1));
    const r2 = openChest(day(2));
    const r3 = openChest(day(3));
    assert.equal(r2.reward.claimStreak, 2);
    assert.equal(r3.reward.claimStreak, 3);
    assert.equal(state.chest.claimStreak, 3);
    assert.equal(state.chest.totalOpened, 3);
  });

  it('eine Lücke setzt den Claim-Streak zurück auf 1', () => {
    openChest(day(1));
    openChest(day(2)); // claimStreak 2
    const gap = openChest(day(5)); // Tag 3 & 4 verpasst
    assert.equal(gap.reward.claimStreak, 1);
    assert.equal(state.chest.claimStreak, 1);
  });
});

describe('openChest — Belohnungen werden vergeben', () => {
  it('Freeze am 3. Folgetag landet im Streak-Schutz', () => {
    assert.equal(state.streak.freezes, 0);
    openChest(day(1));
    openChest(day(2));
    const r3 = openChest(day(3)); // 3 % FREEZE_EVERY == 0
    assert.equal(r3.reward.freeze, true);
    assert.equal(state.streak.freezes, 1, 'ein Freeze gutgeschrieben');
  });

  it('Freeze-Belohnung respektiert das Maximum', () => {
    state.streak.freezes = MAX_FREEZES; // bereits voll
    openChest(day(1));
    openChest(day(2));
    const r3 = openChest(day(3));
    assert.equal(r3.reward.freeze, false, 'kein Freeze über das Maximum hinaus');
    assert.equal(state.streak.freezes, MAX_FREEZES);
  });

  it('Jackpot am 7. Folgetag verdoppelt die XP', () => {
    let before;
    for (let i = 1; i <= 6; i++) openChest(day(i));
    before = getXp();
    const r7 = openChest(day(7));
    assert.equal(r7.reward.jackpot, true);
    assert.equal(getXp() - before, 110);
  });
});
