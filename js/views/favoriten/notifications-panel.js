// Favoriten · Benachrichtigungen — tägliche Erinnerung (Permission, Uhrzeit, Test).

import { el, toast } from '../../util.js';
import {
  getNotificationStatus, setNotificationSettings,
  enableNotifications, disableNotifications
} from '../../store/notifications.js';
import { showNotification } from '../../util/push.js';

export function renderNotificationSettings() {
  const status = getNotificationStatus();
  const { supported, permission, settings } = status;

  const wrap = el('section', { class: 'section notify-section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, '🔔 Tägliche Erinnerung'),
        el('div', { class: 'lede' }, supported
          ? 'Bekomme eine sanfte Benachrichtigung, damit dein Streak nicht reißt.'
          : 'Dein Browser unterstützt keine Benachrichtigungen — diese Funktion ist nicht verfügbar.')
      )
    )
  );

  if (!supported) {
    wrap.appendChild(el('div', { class: 'card' },
      el('div', { class: 'lede' }, 'Notifications werden vom Browser nicht unterstützt.')
    ));
    return wrap;
  }

  const timeInput = el('input', {
    type: 'time',
    value: `${String(settings.hour).padStart(2,'0')}:${String(settings.minute).padStart(2,'0')}`,
    class: 'time-input',
    style: { padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--border, rgba(255,255,255,.15))', fontFamily: 'inherit' }
  });

  const enableBtn = el('button', {
    class: 'btn ' + (settings.enabled ? 'btn-secondary' : 'btn-primary'),
    dataset: { magnetic: '10' }
  }, settings.enabled ? 'Aktiv ✓ — deaktivieren' : 'Erinnerung aktivieren');

  const testBtn = el('button', {
    class: 'btn btn-ghost', dataset: { magnetic: '10' }
  }, '🔔 Test-Benachrichtigung');

  const statusLine = el('div', { class: 'lede', style: { fontSize: '.85rem', marginTop: '6px' } });
  const refreshStatus = () => {
    const s = getNotificationStatus();
    let txt;
    if (s.permission === 'denied') {
      txt = 'Permission wurde abgelehnt — bitte in den Browser-Einstellungen erlauben.';
    } else if (s.permission === 'default') {
      txt = 'Benachrichtigungen sind nicht aktiviert.';
    } else if (s.settings.enabled) {
      txt = `Aktiv — täglich um ${String(s.settings.hour).padStart(2,'0')}:${String(s.settings.minute).padStart(2,'0')}.`;
    } else {
      txt = 'Permission erteilt — Erinnerung ist aber ausgeschaltet.';
    }
    statusLine.textContent = txt;
  };
  refreshStatus();

  enableBtn.addEventListener('click', async () => {
    const cur = getNotificationStatus();
    if (cur.settings.enabled) {
      disableNotifications();
      enableBtn.textContent = 'Erinnerung aktivieren';
      enableBtn.classList.remove('btn-secondary');
      enableBtn.classList.add('btn-primary');
      refreshStatus();
      toast('Erinnerung deaktiviert', 'info', 1400);
      return;
    }
    const res = await enableNotifications();
    if (res.ok) {
      enableBtn.textContent = 'Aktiv ✓ — deaktivieren';
      enableBtn.classList.remove('btn-primary');
      enableBtn.classList.add('btn-secondary');
      toast('Erinnerung aktiviert 🔔', 'success', 1600);
    } else if (res.permission === 'denied') {
      toast('Permission wurde abgelehnt — bitte im Browser erlauben.', 'info', 2400);
    } else {
      toast('Permission nicht erteilt.', 'info', 1600);
    }
    refreshStatus();
  });

  timeInput.addEventListener('change', () => {
    const [h, m] = (timeInput.value || '19:00').split(':').map(Number);
    setNotificationSettings({ hour: h, minute: m });
    refreshStatus();
    toast(`Erinnerung auf ${timeInput.value} gesetzt`, 'success', 1200);
  });

  testBtn.addEventListener('click', async () => {
    const s = getNotificationStatus();
    if (s.permission !== 'granted') {
      const res = await enableNotifications();
      if (!res.ok) {
        toast('Bitte zuerst Benachrichtigungen erlauben.', 'info', 1800);
        return;
      }
    }
    const n = showNotification({
      title: 'Dialekto — Test 🔔',
      body: 'Wenn du das siehst, funktionieren Benachrichtigungen.',
      tag: 'dialekto-test',
      url: '#/lernen'
    });
    if (!n) toast('Test fehlgeschlagen — Browser blockt Benachrichtigungen.', 'info', 2000);
  });

  wrap.appendChild(el('div', { class: 'card notify-card', dataset: { spotlight: '' } },
    el('div', { class: 'notify-row', style: { display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' } },
      el('label', { style: { display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' } },
        el('span', {}, 'Tägliche Uhrzeit'),
        timeInput
      ),
      enableBtn,
      testBtn
    ),
    statusLine
  ));

  return wrap;
}
