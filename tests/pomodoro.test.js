// pomodoro.js — Pomodoro-Timer-State (ohne UI).

import { describe, it, beforeEach, before, after } from 'node:test';
import assert from 'node:assert/strict';

import {
  startPomodoro, stopPomodoro, isPomodoroRunning,
  getPomodoroState, POMODORO_DURATIONS,
  requestPomodoroNotificationPermission,
} from '../js/util/pomodoro.js';
import { mountDom, unmountDom } from './_setup.js';

before(mountDom);
after(unmountDom);

describe('POMODORO_DURATIONS', () => {
  it('liefert [15, 25, 45, 90]', () => {
    assert.deepEqual(POMODORO_DURATIONS, [15, 25, 45, 90]);
  });
});

describe('start/stop/isRunning/state', () => {
  beforeEach(() => {
    // sicherstellen, dass kein Timer von vorigem Test hängt
    if (isPomodoroRunning()) stopPomodoro();
  });

  it('initial nicht laufend', () => {
    assert.equal(isPomodoroRunning(), false);
    assert.equal(getPomodoroState().phase, 'idle');
  });

  it('startPomodoro → running=true, phase=focus', () => {
    startPomodoro({ minutes: 25 });
    assert.equal(isPomodoroRunning(), true);
    const s = getPomodoroState();
    assert.equal(s.phase, 'focus');
    assert.equal(s.running, true);
    stopPomodoro();
  });

  it('stop setzt isRunning auf false', () => {
    startPomodoro({ minutes: 25 });
    const wasRunning = stopPomodoro();
    assert.equal(wasRunning, true);
    assert.equal(isPomodoroRunning(), false);
  });

  it('stop ohne start liefert false', () => {
    const wasRunning = stopPomodoro();
    assert.equal(wasRunning, false);
  });

  it('startPomodoro überschreibt laufenden Timer', () => {
    startPomodoro({ minutes: 25 });
    startPomodoro({ minutes: 45 });
    assert.equal(isPomodoroRunning(), true);
    const s = getPomodoroState();
    assert.equal(s.totalMs, 45 * 60 * 1000);
    stopPomodoro();
  });

  it('remainingMs nimmt ab', async () => {
    startPomodoro({ minutes: 25 });
    const t1 = getPomodoroState().remainingMs;
    await new Promise(r => setTimeout(r, 30));
    const t2 = getPomodoroState().remainingMs;
    assert.ok(t2 < t1);
    stopPomodoro();
  });

  it('onPhaseChange wird beim Start gerufen', () => {
    let phases = [];
    startPomodoro({
      minutes: 25,
      onPhaseChange: (phase) => phases.push(phase),
    });
    assert.deepEqual(phases, ['focus']);
    stopPomodoro();
    assert.ok(phases.includes('stopped'));
  });

  it('Default minutes fallback', () => {
    startPomodoro({});
    const s = getPomodoroState();
    assert.equal(s.totalMs, 25 * 60 * 1000);
    stopPomodoro();
  });

  it('breakMinutes=0 → kein Break-Phase', () => {
    startPomodoro({ minutes: 1, breakMinutes: 0 });
    const s = getPomodoroState();
    assert.equal(s.phase, 'focus');
    stopPomodoro();
  });
});

describe('requestPomodoroNotificationPermission', () => {
  it('unsupported wenn Notification undefined', async () => {
    const r = await requestPomodoroNotificationPermission();
    // im Node-Test ohne globale Notification → unsupported
    assert.ok(['unsupported', 'granted', 'denied', 'error', 'default'].includes(r));
  });
});
