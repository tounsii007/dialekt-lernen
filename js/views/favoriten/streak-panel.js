// Favoriten · Streak-Schutz: verdiente Freezes, Reparatur-Token, Wochenend-Amulett.
// Alles offline verdient — keine Käufe (Privacy-/Offline-Säule bleibt intakt).

import { el, toast } from '../../util.js';
import {
  getStreakProtection, setWeekendAmulet, repairStreak, REPAIR_WINDOW_DAYS
} from '../../store.js';
import { sfx } from '../../util/sounds.js';
import { t } from '../../util/i18n.js';

export function renderStreakProtection(rerender) {
  const p = getStreakProtection();

  const pip = (filled) => el('span', {
    class: 'streak-pip' + (filled ? ' is-filled' : ''),
    'aria-hidden': 'true'
  });
  const pips = (have, max) => {
    const row = el('div', { class: 'streak-pips' });
    for (let i = 0; i < max; i++) row.appendChild(pip(i < have));
    return row;
  };

  // Eine Schutz-Kachel (Icon, Titel, Menge, Pip-Anzeige, Hinweis).
  const item = (emoji, title, have, max, hint) =>
    el('div', { class: 'streak-prot-item', dataset: { spotlight: '' } },
      el('div', { class: 'streak-prot-emoji' }, emoji),
      el('div', { class: 'streak-prot-body' },
        el('div', { class: 'streak-prot-title' }, title),
        el('div', { class: 'streak-prot-count' }, `${have} / ${max}`),
        pips(have, max),
        el('div', { class: 'streak-prot-hint' }, hint)
      )
    );

  const grid = el('div', { class: 'streak-prot-grid' },
    item('❄️', t('view.streak-panel.freezeTitle'), p.freezes, p.maxFreezes,
      t('view.streak-panel.freezeHint')),
    item('🔧', t('view.streak-panel.repairTitle'), p.repairs, p.maxRepairs,
      t('view.streak-panel.repairHint', { n: REPAIR_WINDOW_DAYS }))
  );

  // Wochenend-Amulett: opt-in Toggle (deckt Sa/So gratis ab, wenn ausgerüstet).
  const amuletToggle = el('input', {
    type: 'checkbox',
    checked: p.weekendAmulet,
    'aria-label': t('view.streak-panel.amuletEquipAria'),
    onClick: (e) => {
      const on = setWeekendAmulet(e.target.checked);
      try { sfx.toggle(); } catch {}
      toast(on ? t('view.streak-panel.amuletEquipped') : t('view.streak-panel.amuletRemoved'), 'info', 1600);
    }
  });
  const amuletRow = el('label', { class: 'streak-amulet-row' },
    el('span', { class: 'streak-prot-emoji' }, '🛡️'),
    el('div', { class: 'streak-prot-body' },
      el('div', { class: 'streak-prot-title' }, t('view.streak-panel.amuletTitle')),
      el('div', { class: 'streak-prot-hint' },
        t('view.streak-panel.amuletHint'))
    ),
    el('span', { class: 'streak-amulet-switch' }, amuletToggle, el('span', { class: 'streak-amulet-knob' }))
  );

  const card = el('div', { class: 'card streak-prot-card', dataset: { spotlight: '', reveal: '' } },
    el('div', { class: 'streak-head' },
      el('div', {},
        el('div', { class: 'card-title' }, t('view.streak-panel.title')),
        el('div', { class: 'lede', style: { fontSize: '.85rem' } },
          t('view.streak-panel.lede'))
      )
    ),
    grid,
    amuletRow
  );

  // Reparatur-Aufruf, falls der Streak gerade gerissen ist und reparierbar.
  if (p.canRepair && p.lastBreak) {
    const repairBtn = el('button', {
      class: 'btn btn-primary', dataset: { magnetic: '10' },
      onClick: () => {
        if (repairStreak()) {
          try { sfx.unlock(); } catch {}
          toast(t('view.streak-panel.repairToastSuccess', { n: getStreakProtection().count }), 'success', 2400);
          rerender();
        } else {
          toast(t('view.streak-panel.repairToastFail'), 'info', 1800);
        }
      }
    }, t('view.streak-panel.repairBtn', { n: p.lastBreak.prevCount }));

    card.appendChild(el('div', { class: 'streak-repair-cta' },
      el('div', { class: 'lede', style: { fontSize: '.88rem' } },
        t('view.streak-panel.repairCta', { n: p.lastBreak.prevCount })),
      repairBtn
    ));
  }

  return card;
}
