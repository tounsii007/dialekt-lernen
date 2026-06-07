// Lernpfad / Skill-Tree-View: eine gewundene Reise durch alle Dialekte.
// Knoten schalten nacheinander frei (siehe store/skilltree.js). Gesperrte
// Knoten geben einen Hinweis statt zu navigieren; freie Knoten starten eine
// fokussierte Lern-Session für den jeweiligen Dialekt.

import { el, go, toast } from '../util.js';
import { getLernpfad, getLernpfadSummary, STAGE_GOAL } from '../store/skilltree.js';
import { sfx } from '../util/sounds.js';
import { t } from '../util/i18n.js';

export function renderLernpfad(root) {
  root.innerHTML = '';
  const view = el('div', { class: 'view lernpfad-view' });

  const nodes = getLernpfad();
  const summary = getLernpfadSummary();
  const pct = summary.totalUnits
    ? Math.round((summary.completedUnits / summary.totalUnits) * 100)
    : 0;

  view.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, `🗺️ ${t('view.lernpfad.title')}`),
      el('div', { class: 'lede' },
        t('view.lernpfad.lede'))
    )
  ));

  // Gesamtfortschritt.
  view.appendChild(el('div', { class: 'pfad-progress card', dataset: { spotlight: '' } },
    el('div', { class: 'pfad-progress-top' },
      el('span', { class: 'pfad-progress-label' },
        summary.allComplete
          ? `🏆 ${t('view.lernpfad.allComplete')}`
          : t('view.lernpfad.progress', { n: summary.completedUnits, total: summary.totalUnits })),
      el('span', { class: 'pfad-progress-pct' }, `${pct}%`)
    ),
    el('div', { class: 'pfad-progress-bar' },
      el('div', { class: 'pfad-progress-fill', style: { width: `${pct}%` } })
    ),
    summary.current
      ? el('div', { class: 'pfad-progress-hint' },
          t('view.lernpfad.currentHint', {
            flag: summary.current.flag,
            name: summary.current.name,
            n: Math.max(0, summary.current.goal - summary.current.learned),
          }))
      : null
  ));

  // Der gewundene Pfad.
  const path = el('div', { class: 'pfad' });
  nodes.forEach((n, i) => path.appendChild(renderNode(n, i)));
  view.appendChild(path);

  // Legende.
  view.appendChild(el('div', { class: 'pfad-legend' },
    el('span', {}, `★ ${t('view.lernpfad.legendMastered')}`),
    el('span', {}, `● ${t('view.lernpfad.legendActive')}`),
    el('span', {}, `🔒 ${t('view.lernpfad.legendLocked')}`),
    el('span', { class: 'pfad-legend-goal' }, t('view.lernpfad.legendGoal', { n: STAGE_GOAL }))
  ));

  root.appendChild(view);
}

function renderNode(n, i) {
  const stateClass = n.complete ? 'is-complete' : n.current ? 'is-current' : n.unlocked ? 'is-open' : 'is-locked';
  const emoji = n.unlocked ? n.flag : '🔒';

  const onClick = () => {
    if (!n.unlocked) {
      toast(`🔒 ${t('view.lernpfad.lockedToast', { name: n.name })}`, 'info', 2600);
      try { sfx.wrong(); } catch {}
      return;
    }
    try { sfx.click(); } catch {}
    go(`#/lernen?dialekt=${encodeURIComponent(n.id)}`);
  };

  const btn = el('button', {
    class: 'pfad-node-btn',
    style: { '--dc': n.farbe },
    'aria-label': n.unlocked
      ? t('view.lernpfad.nodeAriaOpen', { name: n.name, n: n.learned, goal: n.goal })
      : t('view.lernpfad.nodeAriaLocked', { name: n.name }),
    title: n.unlocked ? `${n.name} · ${n.learned}/${n.goal}` : t('view.lernpfad.nodeTitleLocked', { name: n.name }),
    onClick,
  },
    el('span', { class: 'pfad-node-emoji' }, emoji),
    n.complete ? el('span', { class: 'pfad-node-badge' }, '★') : null
  );

  const disc = el('div', {
    class: 'pfad-node-disc',
    style: { '--pct': String(n.percent) },
  }, btn);

  const sub = n.complete
    ? `★ ${t('view.lernpfad.subMastered')}`
    : !n.unlocked
      ? t('view.lernpfad.subLocked')
      : `${n.learned} / ${n.goal}`;

  return el('div', { class: `pfad-row pfad-pos-${i % 4}`, dataset: { reveal: '' } },
    el('div', { class: `pfad-node ${stateClass}` },
      n.current ? el('div', { class: 'pfad-start-bubble' }, t('view.lernpfad.start')) : null,
      disc,
      el('div', { class: 'pfad-node-label' }, n.name),
      el('div', { class: 'pfad-node-sub' }, sub)
    )
  );
}
