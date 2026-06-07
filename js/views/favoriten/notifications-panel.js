// Favoriten · Benachrichtigungen — tägliche Erinnerung (Permission, Uhrzeit, Test).

import { el, toast } from '../../util.js';
import { t } from '../../util/i18n.js';
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
        el('h2', {}, t('view.notifications-panel.title')),
        el('div', { class: 'lede' }, supported
          ? t('view.notifications-panel.ledeSupported')
          : t('view.notifications-panel.ledeUnsupported'))
      )
    )
  );

  if (!supported) {
    wrap.appendChild(el('div', { class: 'card' },
      el('div', { class: 'lede' }, t('view.notifications-panel.notSupportedCard'))
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
  }, settings.enabled ? t('view.notifications-panel.btnDisable') : t('view.notifications-panel.btnEnable'));

  const testBtn = el('button', {
    class: 'btn btn-ghost', dataset: { magnetic: '10' }
  }, t('view.notifications-panel.testBtn'));

  const statusLine = el('div', { class: 'lede', style: { fontSize: '.85rem', marginTop: '6px' } });
  const refreshStatus = () => {
    const s = getNotificationStatus();
    let txt;
    if (s.permission === 'denied') {
      txt = t('view.notifications-panel.statusDenied');
    } else if (s.permission === 'default') {
      txt = t('view.notifications-panel.statusDefault');
    } else if (s.settings.enabled) {
      txt = t('view.notifications-panel.statusActive', { time: `${String(s.settings.hour).padStart(2,'0')}:${String(s.settings.minute).padStart(2,'0')}` });
    } else {
      txt = t('view.notifications-panel.statusOff');
    }
    statusLine.textContent = txt;
  };
  refreshStatus();

  enableBtn.addEventListener('click', async () => {
    const cur = getNotificationStatus();
    if (cur.settings.enabled) {
      disableNotifications();
      enableBtn.textContent = t('view.notifications-panel.btnEnable');
      enableBtn.classList.remove('btn-secondary');
      enableBtn.classList.add('btn-primary');
      refreshStatus();
      toast(t('view.notifications-panel.toastDisabled'), 'info', 1400);
      return;
    }
    const res = await enableNotifications();
    if (res.ok) {
      enableBtn.textContent = t('view.notifications-panel.btnDisable');
      enableBtn.classList.remove('btn-primary');
      enableBtn.classList.add('btn-secondary');
      toast(t('view.notifications-panel.toastEnabled'), 'success', 1600);
    } else if (res.permission === 'denied') {
      toast(t('view.notifications-panel.toastDenied'), 'info', 2400);
    } else {
      toast(t('view.notifications-panel.toastNotGranted'), 'info', 1600);
    }
    refreshStatus();
  });

  timeInput.addEventListener('change', () => {
    const [h, m] = (timeInput.value || '19:00').split(':').map(Number);
    setNotificationSettings({ hour: h, minute: m });
    refreshStatus();
    toast(t('view.notifications-panel.toastTimeSet', { time: timeInput.value }), 'success', 1200);
  });

  testBtn.addEventListener('click', async () => {
    const s = getNotificationStatus();
    if (s.permission !== 'granted') {
      const res = await enableNotifications();
      if (!res.ok) {
        toast(t('view.notifications-panel.toastAllowFirst'), 'info', 1800);
        return;
      }
    }
    const n = showNotification({
      title: t('view.notifications-panel.testNotifTitle'),
      body: t('view.notifications-panel.testNotifBody'),
      tag: 'dialekto-test',
      url: '#/lernen'
    });
    if (!n) toast(t('view.notifications-panel.toastTestFailed'), 'info', 2000);
  });

  wrap.appendChild(el('div', { class: 'card notify-card', dataset: { spotlight: '' } },
    el('div', { class: 'notify-row', style: { display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' } },
      el('label', { style: { display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' } },
        el('span', {}, t('view.notifications-panel.dailyTime')),
        timeInput
      ),
      enableBtn,
      testBtn
    ),
    statusLine
  ));

  return wrap;
}
