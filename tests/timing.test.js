// timing.js — debounce.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { debounce } from '../js/util/timing.js';

describe('debounce', () => {
  it('verzögert Aufruf', async () => {
    let calls = 0;
    const d = debounce(() => { calls++; }, 30);
    d();
    d();
    d();
    assert.equal(calls, 0); // nicht sofort
    await new Promise(r => setTimeout(r, 60));
    assert.equal(calls, 1);
  });

  it('letzte Argumente gewinnen', async () => {
    let last;
    const d = debounce((v) => { last = v; }, 20);
    d('a');
    d('b');
    d('c');
    await new Promise(r => setTimeout(r, 50));
    assert.equal(last, 'c');
  });

  it('mehrere Bursts → mehrere Calls', async () => {
    let calls = 0;
    const d = debounce(() => { calls++; }, 20);
    d();
    await new Promise(r => setTimeout(r, 40));
    d();
    await new Promise(r => setTimeout(r, 40));
    assert.equal(calls, 2);
  });

  it('preserviert this-Kontext', async () => {
    const obj = {
      v: 42,
      get: debounce(function() { obj.captured = this.v; }, 10),
    };
    obj.get();
    await new Promise(r => setTimeout(r, 30));
    assert.equal(obj.captured, 42);
  });

  it('default wait = 250ms', async () => {
    let calls = 0;
    const d = debounce(() => { calls++; });
    d();
    await new Promise(r => setTimeout(r, 100));
    assert.equal(calls, 0);
    await new Promise(r => setTimeout(r, 200));
    assert.equal(calls, 1);
  });
});
