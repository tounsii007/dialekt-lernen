// Avatar Tests

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { state } from '../js/store/state.js';
import { getAvatar, setAvatar, getAvatarOptions, AVATARS } from '../js/store/avatar.js';

beforeEach(() => {
  state.avatar = {};
  state.xp = { total: 0, log: [] };
  state.visited = [];
});

describe('Avatar', () => {
  it('Default-Avatar ist "default"', () => {
    assert.equal(getAvatar().id, 'default');
  });

  it('Default-Avatar ist immer freigeschaltet', () => {
    const opts = getAvatarOptions();
    const defaultAv = opts.find(a => a.id === 'default');
    assert.equal(defaultAv.unlocked, true);
  });

  it('getAvatarOptions zeigt alle 15 Avatare', () => {
    const opts = getAvatarOptions();
    assert.equal(opts.length, AVATARS.length);
  });

  it('Locked Avatar kann nicht gesetzt werden', () => {
    const result = setAvatar('rocket'); // braucht alle 12 Dialekte besucht
    assert.equal(result, false);
    assert.equal(getAvatar().id, 'default');
  });

  it('Unlocked Avatar kann gesetzt werden', () => {
    const result = setAvatar('default');
    assert.equal(result, true);
  });

  it('Unbekannte ID kann nicht gesetzt werden', () => {
    const result = setAvatar('nonexistent');
    assert.equal(result, false);
  });

  it('Cards-Avatar braucht Level ≥ 2', () => {
    const opts = getAvatarOptions();
    const cards = opts.find(a => a.id === 'cards');
    assert.equal(cards.unlocked, false);
    // Mit genug XP für Level 2
    state.xp.total = 350; // Level 3
    const opts2 = getAvatarOptions();
    assert.equal(opts2.find(a => a.id === 'cards').unlocked, true);
  });
});
