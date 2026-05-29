// time-heatmap.js — Lernzeit-Heatmap (Wochentag × Stunde).

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import {
  getTimeHeatmap, dayName, hourLabel, describeBestSlot,
} from '../js/util/time-heatmap.js';
import { resetState } from './_setup.js';

describe('getTimeHeatmap', () => {
  beforeEach(resetState);

  it('liefert 7×24 Matrix mit Nullen bei leerem State', () => {
    const r = getTimeHeatmap();
    assert.equal(r.matrix.length, 7);
    assert.equal(r.matrix[0].length, 24);
    assert.ok(r.matrix.every(row => row.every(v => v === 0)));
    assert.equal(r.maxCount, 0);
  });

  it('zählt XP-Log-Einträge nach Tag/Stunde', () => {
    const now = new Date();
    state.xp = {
      total: 100,
      log: [
        { amount: 10, reason: 'a', ts: now.getTime() },
        { amount: 10, reason: 'b', ts: now.getTime() },
      ],
    };
    const r = getTimeHeatmap();
    assert.equal(r.matrix[now.getDay()][now.getHours()], 2);
    assert.equal(r.maxCount, 2);
  });

  it('zählt SRS-Reviews aus state.gelernt', () => {
    const now = Date.now();
    state.gelernt = {
      'a.1': { last: now },
      'a.2': { last: now },
    };
    const r = getTimeHeatmap();
    const d = new Date(now);
    assert.equal(r.matrix[d.getDay()][d.getHours()], 2);
  });

  it('ignoriert alte Einträge (cutoff)', () => {
    const oldTs = Date.now() - 200 * 86_400_000;
    state.xp = { total: 0, log: [{ amount: 1, reason: 'x', ts: oldTs }] };
    const r = getTimeHeatmap(90);
    assert.equal(r.maxCount, 0);
  });

  it('findet bestDay/bestHour korrekt', () => {
    const now = new Date();
    now.setHours(14, 0, 0, 0);
    state.xp = {
      total: 0,
      log: [
        { amount: 1, reason: 'a', ts: now.getTime() },
        { amount: 1, reason: 'b', ts: now.getTime() },
        { amount: 1, reason: 'c', ts: now.getTime() },
      ],
    };
    const r = getTimeHeatmap();
    assert.equal(r.bestDay, now.getDay());
    assert.equal(r.bestHour, 14);
  });
});

describe('dayName / hourLabel', () => {
  it('dayName liefert deutsche Kürzel', () => {
    assert.equal(dayName(0), 'So');
    assert.equal(dayName(1), 'Mo');
    assert.equal(dayName(6), 'Sa');
  });

  it('hourLabel zweistellig + ":00"', () => {
    assert.equal(hourLabel(0), '00:00');
    assert.equal(hourLabel(9), '09:00');
    assert.equal(hourLabel(23), '23:00');
  });
});

describe('describeBestSlot', () => {
  it('null wenn kein bester Slot', () => {
    assert.equal(describeBestSlot(-1, -1), null);
  });

  it('"abends" für 19 Uhr', () => {
    const r = describeBestSlot(19, 1); // Mo, 19 Uhr
    assert.match(r, /Mo/);
    assert.match(r, /abends/);
    assert.match(r, /19:00/);
  });

  it('"morgens" für 8 Uhr', () => {
    const r = describeBestSlot(8, 3);
    assert.match(r, /Mi/);
    assert.match(r, /morgens/);
  });

  it('"früh morgens" für 4 Uhr', () => {
    const r = describeBestSlot(4, 0);
    assert.match(r, /früh morgens/);
  });

  it('"spät abends" für 23 Uhr', () => {
    const r = describeBestSlot(23, 5);
    assert.match(r, /spät abends/);
  });
});
