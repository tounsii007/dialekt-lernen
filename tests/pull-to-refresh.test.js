// Tests für die Pull-to-Refresh-Logik (reiner Kern + No-op ohne DOM).

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  applyResistance,
  shouldTrigger,
  attachPullToRefresh,
  PTR_THRESHOLD,
  PTR_MAX,
} from '../js/util/pull-to-refresh.js';

describe('pull-to-refresh', () => {
  it('applyResistance dämpft, ignoriert Aufwärts-Ziehen und deckelt', () => {
    assert.equal(applyResistance(100, 0.5), 50);
    assert.equal(applyResistance(0), 0);
    assert.equal(applyResistance(-30), 0);
    assert.equal(applyResistance(10000, 0.5), PTR_MAX);
  });

  it('shouldTrigger erst ab Schwellwert', () => {
    assert.equal(shouldTrigger(PTR_THRESHOLD), true);
    assert.equal(shouldTrigger(PTR_THRESHOLD - 1), false);
    assert.equal(shouldTrigger(PTR_THRESHOLD + 10), true);
    assert.equal(shouldTrigger(0), false);
  });

  it('attachPullToRefresh ist ohne document eine sichere No-op', () => {
    const detach = attachPullToRefresh({ onRefresh: () => {} });
    assert.equal(typeof detach, 'function');
    detach(); // darf nicht werfen
  });
});
