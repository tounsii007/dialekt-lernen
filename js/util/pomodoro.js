// Pomodoro-Lern-Session: 25 Min Lernen + 5 Min Pause (klassisch),
// konfigurierbar auf 15/25/45/90 min. Kein eigenes UI — nur Timer-State
// und Callbacks. Wer ein Indikator-Badge will, hängt das selber rein.
//
// Notifications:
//   - via Notification API, wenn Permission erteilt
//   - sonst Toast als Fallback
//
// API:
//   startPomodoro({ minutes, breakMinutes, onTick, onPhaseChange, onComplete })
//   stopPomodoro()
//   getPomodoroState() → { phase, remainingMs, totalMs, running, cycle }
//   isPomodoroRunning()
//   requestPomodoroNotificationPermission()

import { toast } from './toast.js';

export const POMODORO_DURATIONS = [15, 25, 45, 90];
const DEFAULT_MINUTES = 25;
const DEFAULT_BREAK   = 5;
const TICK_MS = 1000;

let timer = null;
let state = null;

function notify(title, body) {
  try {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      const n = new Notification(title, { body, icon: '/icons/icon-192.png', silent: false });
      // Auto-close nach 6 s
      setTimeout(() => { try { n.close(); } catch {} }, 6000);
      return;
    }
  } catch {}
  // Fallback — Toast (nur wenn DOM verfügbar)
  if (typeof document !== 'undefined') {
    try { toast(`${title} — ${body}`, 'info', 4200); } catch {}
  }
}

export function requestPomodoroNotificationPermission() {
  try {
    if (typeof Notification === 'undefined') return Promise.resolve('unsupported');
    if (Notification.permission === 'granted') return Promise.resolve('granted');
    if (Notification.permission === 'denied')  return Promise.resolve('denied');
    return Notification.requestPermission();
  } catch {
    return Promise.resolve('error');
  }
}

function clearTimer() {
  if (timer) { clearInterval(timer); timer = null; }
}

function snapshot() {
  if (!state) return { phase: 'idle', remainingMs: 0, totalMs: 0, running: false, cycle: 0 };
  return {
    phase:       state.phase,
    remainingMs: Math.max(0, state.endsAt - Date.now()),
    totalMs:     state.totalMs,
    running:     true,
    cycle:       state.cycle
  };
}

function enterPhase(phase, minutes) {
  if (!state) return;
  state.phase    = phase;
  state.totalMs  = minutes * 60 * 1000;
  state.endsAt   = Date.now() + state.totalMs;
  if (typeof state.onPhaseChange === 'function') {
    try { state.onPhaseChange(phase, snapshot()); } catch {}
  }
  if (phase === 'focus') notify('Pomodoro · Fokus', `${minutes} Minuten konzentriertes Lernen.`);
  else if (phase === 'break') notify('Pomodoro · Pause', `${minutes} Minuten Pause — strecken, trinken.`);
}

function tick() {
  if (!state) return;
  const now = Date.now();
  const remaining = state.endsAt - now;
  if (typeof state.onTick === 'function') {
    try { state.onTick(snapshot()); } catch {}
  }
  if (remaining <= 0) {
    if (state.phase === 'focus') {
      state.cycle += 1;
      // Wenn breakMinutes 0 → komplett fertig
      if (!state.breakMinutes || state.breakMinutes <= 0) {
        finish();
        return;
      }
      enterPhase('break', state.breakMinutes);
    } else if (state.phase === 'break') {
      // Nach der Pause: einmaliger Durchgang → fertig
      finish();
    }
  }
}

function finish() {
  const snap = snapshot();
  const onComplete = state && state.onComplete;
  notify('Pomodoro fertig', 'Gut gemacht! Eine Lerneinheit ist abgeschlossen.');
  clearTimer();
  state = null;
  if (typeof onComplete === 'function') {
    try { onComplete(snap); } catch {}
  }
}

export function startPomodoro(opts = {}) {
  // Wenn schon einer läuft, vorher stoppen.
  if (state) stopPomodoro();

  const minutes      = Number(opts.minutes) > 0
    ? Math.round(opts.minutes)
    : DEFAULT_MINUTES;
  const breakMinutes = Number(opts.breakMinutes) >= 0
    ? Math.round(opts.breakMinutes)
    : DEFAULT_BREAK;

  state = {
    phase: 'focus',
    totalMs: minutes * 60 * 1000,
    endsAt: Date.now() + minutes * 60 * 1000,
    cycle: 0,
    breakMinutes,
    onTick:        typeof opts.onTick        === 'function' ? opts.onTick        : null,
    onPhaseChange: typeof opts.onPhaseChange === 'function' ? opts.onPhaseChange : null,
    onComplete:    typeof opts.onComplete    === 'function' ? opts.onComplete    : null
  };

  // Erste Phase initial melden (synchron — Caller kann State sofort lesen).
  if (typeof state.onPhaseChange === 'function') {
    try { state.onPhaseChange('focus', snapshot()); } catch {}
  }
  notify('Pomodoro · Fokus', `${minutes} Minuten konzentriertes Lernen.`);

  timer = setInterval(tick, TICK_MS);
  return snapshot();
}

export function stopPomodoro() {
  clearTimer();
  const wasRunning = !!state;
  if (state && typeof state.onPhaseChange === 'function') {
    try { state.onPhaseChange('stopped', snapshot()); } catch {}
  }
  state = null;
  return wasRunning;
}

export function getPomodoroState() {
  return snapshot();
}

export function isPomodoroRunning() {
  return !!state;
}
