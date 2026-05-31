// Tests für die Progressive-Disclosure-Auswahllogik + Seen-Tracking.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import {
  pickNextTip,
  TIPS,
  getSeenTips,
  markTipSeen,
  resetTips,
} from '../js/util/progressive-disclosure.js';

describe('pickNextTip', () => {
  const tips = [
    { id: 'a', route: 'home', requires: () => true },
    { id: 'b', route: 'home', requires: (c) => (c.learned || 0) >= 3 },
    { id: 'c', requires: () => true }, // ohne Route → überall
  ];

  it('liefert den ersten ungesehenen, passenden Tipp', () => {
    assert.equal(pickNextTip(tips, [], { route: 'home', learned: 0 })?.id, 'a');
  });

  it('überspringt bereits gesehene Tipps', () => {
    assert.equal(pickNextTip(tips, ['a'], { route: 'home', learned: 0 })?.id, 'c');
  });

  it('respektiert die requires-Bedingung', () => {
    assert.equal(pickNextTip(tips, ['a', 'c'], { route: 'home', learned: 0 }), null);
    assert.equal(
        pickNextTip(tips, ['a', 'c'], { route: 'home', learned: 3 })?.id, 'b');
  });

  it('Tipp ohne Route matcht jeden Kontext', () => {
    assert.equal(pickNextTip(tips, [], { route: 'quiz' })?.id, 'c');
  });

  it('null, wenn alle gesehen', () => {
    assert.equal(
        pickNextTip(tips, ['a', 'b', 'c'], { route: 'home', learned: 9 }), null);
  });
});

describe('TIPS-Definition', () => {
  it('hat eindeutige IDs', () => {
    const ids = TIPS.map((t) => t.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  it('jeder Tipp hat body + requires()', () => {
    for (const t of TIPS) {
      assert.equal(typeof t.body, 'string');
      assert.ok(t.body.length > 0);
      assert.equal(typeof t.requires, 'function');
    }
  });
});

describe('Seen-Tracking (State)', () => {
  beforeEach(() => resetTips());

  it('markTipSeen + getSeenTips Roundtrip, idempotent', () => {
    assert.deepEqual(getSeenTips(), []);
    markTipSeen('pd-quiz');
    assert.ok(getSeenTips().includes('pd-quiz'));
    markTipSeen('pd-quiz');
    assert.equal(getSeenTips().filter((x) => x === 'pd-quiz').length, 1);
  });
});
