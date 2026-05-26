// Push-/Notification-Hilfen — nutzt die Web Notifications API.
//
// API:
//   isPushSupported()                         → boolean
//   getPushPermission()                       → 'granted' | 'denied' | 'default' | 'unsupported'
//   requestPushPermission()                   → Promise<'granted'|'denied'|'default'|'unsupported'>
//   showNotification({ title, body, tag?, requireInteraction?, icon?, url? })
//                                              → Notification | null
//   schedulePomodoroBreak(minutes, opts?)     → cancel-fn
//   scheduleDailyReminder(hour, minute, opts?)→ cancel-fn (täglich)
//   cancelDailyReminder()                     → void
//
// Hinweise:
//   - In Browsern ohne Permission/Notification-Unterstützung sind alle Funktionen No-Ops.
//   - Timer werden modul-intern verwaltet, damit erneutes Scheduling alte cancelt.

const DEFAULT_ICON = 'data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 192 192%22%3E%3Crect width%3D%22192%22 height%3D%22192%22 rx%3D%2238%22 fill%3D%22%238b5cf6%22%2F%3E%3Ctext x%3D%2296%22 y%3D%22128%22 font-size%3D%22110%22 text-anchor%3D%22middle%22 fill%3D%22white%22%3E%F0%9F%97%A3%EF%B8%8F%3C%2Ftext%3E%3C%2Fsvg%3E';

let pomodoroTimer = null;
let dailyTimeout = null;
let dailyInterval = null;

export function isPushSupported() {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getPushPermission() {
  if (!isPushSupported()) return 'unsupported';
  return Notification.permission;
}

export async function requestPushPermission() {
  if (!isPushSupported()) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  try {
    const res = await Notification.requestPermission();
    return res || 'default';
  } catch {
    return 'default';
  }
}

export function showNotification(opts = {}) {
  if (!isPushSupported()) return null;
  if (Notification.permission !== 'granted') return null;
  const {
    title = 'Dialekto',
    body = '',
    tag,
    requireInteraction = false,
    icon = DEFAULT_ICON,
    url
  } = opts;
  try {
    const n = new Notification(title, { body, tag, requireInteraction, icon });
    if (url) {
      n.addEventListener('click', () => {
        try {
          window.focus();
          if (url.startsWith('#')) {
            location.hash = url;
          } else {
            location.href = url;
          }
        } catch {}
        n.close();
      });
    }
    return n;
  } catch {
    return null;
  }
}

// Pomodoro-Pause: nach `minutes` Minuten eine Benachrichtigung.
export function schedulePomodoroBreak(minutes, opts = {}) {
  if (pomodoroTimer) {
    clearTimeout(pomodoroTimer);
    pomodoroTimer = null;
  }
  const ms = Math.max(1, Number(minutes) || 25) * 60_000;
  pomodoroTimer = setTimeout(() => {
    showNotification({
      title: opts.title || 'Pomodoro-Pause! ☕',
      body: opts.body || 'Zeit für eine kurze Pause — dehn dich und trink Wasser.',
      tag: 'dialekto-pomodoro',
      requireInteraction: false,
      url: opts.url
    });
    pomodoroTimer = null;
  }, ms);
  return () => {
    if (pomodoroTimer) {
      clearTimeout(pomodoroTimer);
      pomodoroTimer = null;
    }
  };
}

function msUntilNext(hour, minute) {
  const now = new Date();
  const target = new Date(now);
  target.setHours(hour, minute, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  return target - now;
}

// Tägliche Erinnerung: einmaliger setTimeout bis zur ersten Auslösung,
// dann 24h-Intervall. Bei erneutem Aufruf werden alte Timer abgeräumt.
export function scheduleDailyReminder(hour, minute, opts = {}) {
  cancelDailyReminder();
  if (!isPushSupported() || Notification.permission !== 'granted') {
    return () => {};
  }
  const h = Math.max(0, Math.min(23, Number(hour) || 0));
  const m = Math.max(0, Math.min(59, Number(minute) || 0));
  const fire = () => {
    showNotification({
      title: opts.title || 'Dialekto — Zeit zu lernen! 📚',
      body: opts.body || 'Halte deinen Streak am Leben — eine kurze Karteikarten-Runde wartet.',
      tag: 'dialekto-daily',
      requireInteraction: false,
      url: opts.url || '#/lernen'
    });
  };
  dailyTimeout = setTimeout(() => {
    fire();
    dailyInterval = setInterval(fire, 24 * 60 * 60_000);
    dailyTimeout = null;
  }, msUntilNext(h, m));
  return cancelDailyReminder;
}

export function cancelDailyReminder() {
  if (dailyTimeout) { clearTimeout(dailyTimeout); dailyTimeout = null; }
  if (dailyInterval) { clearInterval(dailyInterval); dailyInterval = null; }
}
