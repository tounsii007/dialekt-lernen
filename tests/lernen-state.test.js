// views/lernen/state.js — Session-State.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { getSession, setSession, clearSession } from '../js/views/lernen/state.js';

describe('Lernen-Session-State', () => {
  it('initial null', () => {
    clearSession();
    assert.equal(getSession(), null);
  });

  it('setSession + getSession Round-Trip', () => {
    setSession({ title: 'Test', cards: [], idx: 0 });
    const s = getSession();
    assert.equal(s.title, 'Test');
  });

  it('clearSession setzt zurück auf null', () => {
    setSession({ idx: 5 });
    clearSession();
    assert.equal(getSession(), null);
  });

  it('setSession ersetzt komplett', () => {
    setSession({ a: 1 });
    setSession({ b: 2 });
    assert.equal(getSession().a, undefined);
    assert.equal(getSession().b, 2);
    clearSession();
  });
});
