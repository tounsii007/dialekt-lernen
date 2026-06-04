// Favoriten · Tages-Chest — einmal pro Tag öffenbar, Belohnung skaliert mit
// aufeinanderfolgenden Öffnungstagen. Alles offline verdient — kein Kauf.

import { el, toast } from '../../util.js';
import { getChestState, openChest } from '../../store.js';
import { confettiBurst } from '../../util/motion.js';
import { sfx } from '../../util/sounds.js';

export function renderChestCard(rerender) {
  const cs = getChestState();

  const head = el('div', { class: 'streak-head' },
    el('div', {},
      el('div', { class: 'card-title' }, '🎁 Tages-Chest'),
      el('div', { class: 'lede', style: { fontSize: '.85rem' } },
        'Jeden Tag eine Belohnung — je länger deine Serie, desto mehr.')
    )
  );

  const lid = el('div', {
    class: 'chest-visual' + (cs.canOpen ? ' is-ready' : ' is-open'),
    'aria-hidden': 'true'
  }, cs.canOpen ? '🎁' : '📦');

  const body = el('div', { class: 'chest-body' });

  if (cs.canOpen) {
    const teaser = [`+${cs.preview.xp} XP`];
    if (cs.preview.freeze) teaser.push('❄️ Freeze');
    if (cs.preview.jackpot) teaser.push('🎉 Jackpot');

    body.appendChild(el('div', { class: 'chest-streak-line' },
      cs.claimStreak > 0
        ? `🔥 ${cs.claimStreak} Tage in Folge — heute wäre Tag ${cs.upcomingStreak}.`
        : 'Öffne deinen ersten Chest!'));
    body.appendChild(el('div', { class: 'chest-teaser' }, 'Heute drin: ' + teaser.join(' · ')));

    const btn = el('button', {
      class: 'btn btn-primary chest-open-btn', dataset: { magnetic: '12' },
      onClick: () => {
        const res = openChest();
        if (!res.opened) { rerender(); return; }
        try { sfx.unlock(); } catch {}
        try { confettiBurst(btn, { count: res.reward.jackpot ? 130 : 70 }); } catch {}
        const parts = [`+${res.reward.xp} XP`];
        if (res.reward.freeze) parts.push('❄️ +1 Streak-Freeze');
        toast((res.reward.jackpot ? '🎉 JACKPOT! ' : '🎁 Chest geöffnet! ') + parts.join(' · '),
          'success', 3000);
        rerender();
      }
    }, 'Chest öffnen');
    body.appendChild(btn);
  } else {
    const r = cs.lastReward;
    const parts = [];
    if (r) {
      parts.push(`+${r.xp} XP`);
      if (r.freeze) parts.push('❄️ +1 Freeze');
    }
    body.appendChild(el('div', { class: 'chest-streak-line' },
      `🔥 ${cs.claimStreak} Tage in Folge geöffnet`));
    body.appendChild(el('div', { class: 'chest-claimed' },
      r ? `Heute erhalten: ${parts.join(' · ')}${r.jackpot ? ' · 🎉 Jackpot!' : ''}` : 'Heute schon geöffnet.'));
    body.appendChild(el('div', { class: 'lede', style: { fontSize: '.82rem', marginTop: '6px' } },
      `Komm morgen wieder für Tag ${cs.claimStreak + 1}.`));
  }

  return el('div', { class: 'card chest-card' + (cs.canOpen ? ' is-ready' : ''), dataset: { spotlight: '', reveal: '' } },
    head,
    el('div', { class: 'chest-main' }, lid, body)
  );
}
