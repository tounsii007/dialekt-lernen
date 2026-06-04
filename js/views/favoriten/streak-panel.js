// Favoriten · Streak-Schutz: verdiente Freezes, Reparatur-Token, Wochenend-Amulett.
// Alles offline verdient — keine Käufe (Privacy-/Offline-Säule bleibt intakt).

import { el, toast } from '../../util.js';
import {
  getStreakProtection, setWeekendAmulet, repairStreak, REPAIR_WINDOW_DAYS
} from '../../store.js';
import { sfx } from '../../util/sounds.js';

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
    item('❄️', 'Streak-Freeze', p.freezes, p.maxFreezes,
      `Überbrückt einen verpassten Tag automatisch. Alle 5 Streak-Tage verdienst du einen.`),
    item('🔧', 'Reparatur', p.repairs, p.maxRepairs,
      `Stellt einen gerissenen Streak wieder her (binnen ${REPAIR_WINDOW_DAYS} Tagen). Alle 20 Tage gibt es eine.`)
  );

  // Wochenend-Amulett: opt-in Toggle (deckt Sa/So gratis ab, wenn ausgerüstet).
  const amuletToggle = el('input', {
    type: 'checkbox',
    checked: p.weekendAmulet,
    'aria-label': 'Wochenend-Amulett ausrüsten',
    onClick: (e) => {
      const on = setWeekendAmulet(e.target.checked);
      try { sfx.toggle(); } catch {}
      toast(on ? 'Wochenend-Amulett ausgerüstet 🛡️' : 'Wochenend-Amulett abgelegt', 'info', 1600);
    }
  });
  const amuletRow = el('label', { class: 'streak-amulet-row' },
    el('span', { class: 'streak-prot-emoji' }, '🛡️'),
    el('div', { class: 'streak-prot-body' },
      el('div', { class: 'streak-prot-title' }, 'Wochenend-Amulett'),
      el('div', { class: 'streak-prot-hint' },
        'Wenn ausgerüstet, zählen verpasste Wochenenden (Sa/So) nicht gegen deinen Streak — ganz ohne Freeze.')
    ),
    el('span', { class: 'streak-amulet-switch' }, amuletToggle, el('span', { class: 'streak-amulet-knob' }))
  );

  const card = el('div', { class: 'card streak-prot-card', dataset: { spotlight: '', reveal: '' } },
    el('div', { class: 'streak-head' },
      el('div', {},
        el('div', { class: 'card-title' }, '🛡️ Streak-Schutz'),
        el('div', { class: 'lede', style: { fontSize: '.85rem' } },
          'Schütze deine Serie — alles wird durchs Lernen verdient, nichts gekauft.')
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
          toast(`Streak repariert — zurück auf ${getStreakProtection().count} Tage! 🔧`, 'success', 2400);
          rerender();
        } else {
          toast('Reparatur nicht mehr möglich.', 'info', 1800);
        }
      }
    }, `🔧 Streak reparieren (war ${p.lastBreak.prevCount} Tage)`);

    card.appendChild(el('div', { class: 'streak-repair-cta' },
      el('div', { class: 'lede', style: { fontSize: '.88rem' } },
        `Dein ${p.lastBreak.prevCount}-Tage-Streak ist gerissen. Mit einer Reparatur holst du ihn zurück.`),
      repairBtn
    ));
  }

  return card;
}
