// Startseite · Pomodoro — minimaler Picker + Indikator-Badge
// Ausgelagert aus home.js. Der Indikator ist ein body-weites Badge mit
// modul-lokalem State, damit er View-Wechsel überlebt (er hängt an document.body,
// nicht an der View). Die eigentlichen Timer leben in ../../util/pomodoro.js.

import { el, toast } from '../../util.js';
import { t } from '../../util/i18n.js';
import {
  startPomodoro, stopPomodoro, isPomodoroRunning,
  POMODORO_DURATIONS, requestPomodoroNotificationPermission
} from '../../util/pomodoro.js';

let pomodoroIndicator = null;

function ensurePomodoroIndicator() {
  if (pomodoroIndicator && document.body.contains(pomodoroIndicator)) return pomodoroIndicator;
  pomodoroIndicator = el('div', { class: 'pomodoro-indicator', role: 'status', ariaLive: 'polite' },
    el('span', { class: 'pomodoro-indicator-phase' }, t('view.pomodoro.phaseFocus')),
    el('span', { class: 'pomodoro-indicator-time' }, '00:00'),
    el('button', {
      class: 'pomodoro-indicator-stop', title: t('view.pomodoro.cancelTitle'),
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
  phaseEl.textContent = snap.phase === 'break' ? t('view.pomodoro.phaseBreak') : t('view.pomodoro.phaseFocus');
  indicator.classList.toggle('is-break', snap.phase === 'break');
}

export function openPomodoroPicker() {
  if (isPomodoroRunning()) {
    stopPomodoro();
    if (pomodoroIndicator?.parentNode) pomodoroIndicator.remove();
    pomodoroIndicator = null;
    toast(t('view.pomodoro.toastStopped'), 'info', 1800);
    return;
  }
  // Mini-Picker in einem Toast-ähnlichen Inline-Element
  const existing = document.querySelector('.pomodoro-picker');
  if (existing) { existing.remove(); return; }

  const picker = el('div', { class: 'pomodoro-picker' },
    el('div', { class: 'pomodoro-picker-title' }, t('view.pomodoro.pickerTitle')),
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
            toast(t('view.pomodoro.toastStarted', { n: m }), 'success', 1800);
          });
        }
      }, t('view.pomodoro.minutes', { n: m })))
    ),
    el('button', { class: 'btn btn-ghost', onClick: () => picker.remove() }, t('view.pomodoro.cancel'))
  );
  document.body.appendChild(picker);
}
