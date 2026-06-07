// Favoriten · Tages-Chest — einmal pro Tag öffenbar, Belohnung skaliert mit
// aufeinanderfolgenden Öffnungstagen. Alles offline verdient — kein Kauf.

import { el, toast } from '../../util.js';
import { getChestState, openChest } from '../../store.js';
import { confettiBurst } from '../../util/motion.js';
import { sfx } from '../../util/sounds.js';
import { t } from '../../util/i18n.js';

export function renderChestCard(rerender) {
  const cs = getChestState();

  const head = el('div', { class: 'streak-head' },
    el('div', {},
      el('div', { class: 'card-title' }, t('view.chest-panel.title')),
      el('div', { class: 'lede', style: { fontSize: '.85rem' } },
        t('view.chest-panel.lede'))
    )
  );

  const lid = el('div', {
    class: 'chest-visual' + (cs.canOpen ? ' is-ready' : ' is-open'),
    'aria-hidden': 'true'
  }, cs.canOpen ? '🎁' : '📦');

  const body = el('div', { class: 'chest-body' });

  if (cs.canOpen) {
    const teaser = [`+${cs.preview.xp} XP`];
    if (cs.preview.freeze) teaser.push(t('view.chest-panel.teaserFreeze'));
    if (cs.preview.jackpot) teaser.push(t('view.chest-panel.teaserJackpot'));

    body.appendChild(el('div', { class: 'chest-streak-line' },
      cs.claimStreak > 0
        ? t('view.chest-panel.streakLine', { n: cs.claimStreak, day: cs.upcomingStreak })
        : t('view.chest-panel.firstChest')));
    body.appendChild(el('div', { class: 'chest-teaser' }, t('view.chest-panel.todayInside', { items: teaser.join(' · ') })));

    const btn = el('button', {
      class: 'btn btn-primary chest-open-btn', dataset: { magnetic: '12' },
      onClick: () => {
        const res = openChest();
        if (!res.opened) { rerender(); return; }
        try { sfx.unlock(); } catch {}
        try { confettiBurst(btn, { count: res.reward.jackpot ? 130 : 70 }); } catch {}
        const parts = [`+${res.reward.xp} XP`];
        if (res.reward.freeze) parts.push(t('view.chest-panel.rewardFreeze'));
        toast((res.reward.jackpot ? t('view.chest-panel.toastJackpot') : t('view.chest-panel.toastOpened')) + parts.join(' · '),
          'success', 3000);
        rerender();
      }
    }, t('view.chest-panel.openBtn'));
    body.appendChild(btn);
  } else {
    const r = cs.lastReward;
    const parts = [];
    if (r) {
      parts.push(`+${r.xp} XP`);
      if (r.freeze) parts.push(t('view.chest-panel.claimedFreeze'));
    }
    body.appendChild(el('div', { class: 'chest-streak-line' },
      t('view.chest-panel.streakOpened', { n: cs.claimStreak })));
    body.appendChild(el('div', { class: 'chest-claimed' },
      r ? t('view.chest-panel.todayReceived', { items: parts.join(' · ') }) + (r.jackpot ? t('view.chest-panel.jackpotSuffix') : '') : t('view.chest-panel.alreadyOpened')));
    body.appendChild(el('div', { class: 'lede', style: { fontSize: '.82rem', marginTop: '6px' } },
      t('view.chest-panel.comeBack', { n: cs.claimStreak + 1 })));
  }

  return el('div', { class: 'card chest-card' + (cs.canOpen ? ' is-ready' : ''), dataset: { spotlight: '', reveal: '' } },
    head,
    el('div', { class: 'chest-main' }, lid, body)
  );
}
