// Startseite · Pomodoro — minimaler Picker + Indikator-Badge
// Ausgelagert aus home.js. Der Indikator ist ein body-weites Badge mit
// modul-lokalem State, damit er View-Wechsel überlebt (er hängt an document.body,
// nicht an der View). Die eigentlichen Timer leben in ../../util/pomodoro.js.

import { el, toast } from '../../util.js';
import {
  startPomodoro, stopPomodoro, isPomodoroRunning,
  POMODORO_DURATIONS, requestPomodoroNotificationPermission
} from '../../util/pomodoro.js';

let pomodoroIndicator = null;

function ensurePomodoroIndicator() {
  if (pomodoroIndicator && document.body.contains(pomodoroIndicator)) return pomodoroIndicator;
  pomodoroIndicator = el('div', { class: 'pomodoro-indicator', role: 'status', ariaLive: 'polite' },
    el('span', { class: 'pomodoro-indicator-phase' }, 'Fokus'),
    el('span', { class: 'pomodoro-indicator-time' }, '00:00'),
    el('button', {
      class: 'pomodoro-indicator-stop', title: 'Pomodoro abbrechen',
      onClick: () => {
        stopPomodoro();
        if (pomodoroIndicator?.parentNode) pomodoroIndicator.remove();
        pomodoroIndicator = null;
      }
    }, '✕')
  );
  document.body.appendChild(pomodoroIndicator);
  return pomodoroIndicator;
}

function updatePomodoroIndicator(snap) {
  const indicator = ensurePomodoroIndicator();
  const mm = String(Math.floor(snap.remainingMs / 60000)).padStart(2, '0');
  const ss = String(Math.floor((snap.remainingMs % 60000) / 1000)).padStart(2, '0');
  indicator.querySelector('.pomodoro-indicator-time').textContent = `${mm}:${ss}`;
  const phaseEl = indicator.querySelector('.pomodoro-indicator-phase');
  phaseEl.textContent = snap.phase === 'break' ? 'Pause' : 'Fokus';
  indicator.classList.toggle('is-break', snap.phase === 'break');
}

export function openPomodoroPicker() {
  if (isPomodoroRunning()) {
    stopPomodoro();
    if (pomodoroIndicator?.parentNode) pomodoroIndicator.remove();
    pomodoroIndicator = null;
    toast('Pomodoro gestoppt', 'info', 1800);
    return;
  }
  // Mini-Picker in einem Toast-ähnlichen Inline-Element
  const existing = document.querySelector('.pomodoro-picker');
  if (existing) { existing.remove(); return; }

  const picker = el('div', { class: 'pomodoro-picker' },
    el('div', { class: 'pomodoro-picker-title' }, 'Pomodoro-Session'),
    el('div', { class: 'pomodoro-picker-row' },
      ...POMODORO_DURATIONS.map(m => el('button', {
        class: 'pomodoro-picker-btn' + (m === 25 ? ' is-default' : ''),
        onClick: () => {
          picker.remove();
          requestPomodoroNotificationPermission().finally(() => {
            startPomodoro({
              minutes: m,
              breakMinutes: 5,
              onTick: updatePomodoroIndicator,
              onPhaseChange: (phase, snap) => {
                if (phase === 'stopped') return;
                updatePomodoroIndicator(snap);
              },
              onComplete: () => {
                if (pomodoroIndicator?.parentNode) pomodoroIndicator.remove();
                pomodoroIndicator = null;
              }
            });
            toast(`Pomodoro gestartet (${m} min)`, 'success', 1800);
          });
        }
      }, `${m} min`))
    ),
    el('button', { class: 'btn btn-ghost', onClick: () => picker.remove() }, 'Abbrechen')
  );
  document.body.appendChild(picker);
}
