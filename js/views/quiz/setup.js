// Quiz · Auswahl-Screen (Modus + Dialekt)
import { el } from '../../util.js';
import { DIALEKTE } from '../../../data/dialekte.js';
import { getQuizGenauigkeit } from '../../store.js';
import { QUIZ_LENGTH } from './constants.js';
import { t } from '../../util/i18n.js';

export function renderQuizSetup(onStart) {
  const c = el('div', {});
  c.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, t('view.setup.title')),
      el('div', { class: 'lede' }, t('view.setup.lede', { n: QUIZ_LENGTH, acc: getQuizGenauigkeit() }))
    )
  ));

  // Timer toggle
  let timerEnabled = (() => { try { return localStorage.getItem('dialekto:quiz-timer') !== '0'; } catch { return true; } })();
  const timerRow = el('div', { class: 'quiz-setup-option' });
  function renderTimerToggle() {
    timerRow.innerHTML = '';
    timerRow.appendChild(el('label', { class: 'quiz-setup-toggle' },
      el('input', {
        type: 'checkbox',
        checked: timerEnabled,
        onChange: (e) => {
          timerEnabled = e.target.checked;
          try { localStorage.setItem('dialekto:quiz-timer', timerEnabled ? '1' : '0'); } catch {}
        }
      }),
      el('span', { class: 'toggle-track' }),
      el('span', { class: 'toggle-label' }, t('view.setup.timerLabel', { state: timerEnabled ? t('view.setup.on') : t('view.setup.off') }))
    ));
  }
  renderTimerToggle();
  c.appendChild(timerRow);

  const grid = el('div', { class: 'dialekt-grid' });

  grid.appendChild(modeCard({
    color: '#8338ec',
    flag: '🌍',
    name: t('view.setup.mode.mixed.name'),
    region: t('section.alleDialekte'),
    desc: t('view.setup.mode.mixed.desc'),
    onClick: () => onStart({ source: 'all', direction: 'dial->hd', timerEnabled }),
  }));

  grid.appendChild(modeCard({
    color: '#06d6a0',
    flag: '🔄',
    name: t('view.setup.mode.reverse.name'),
    region: t('view.setup.mode.reverse.region'),
    desc: t('view.setup.mode.reverse.desc'),
    onClick: () => onStart({ source: 'all', direction: 'hd->dial', timerEnabled }),
  }));

  grid.appendChild(modeCard({
    color: '#fb5607',
    flag: '🗺️',
    name: t('view.setup.mode.region.name'),
    region: t('view.setup.mode.region.region'),
    desc: t('view.setup.mode.region.desc'),
    onClick: () => onStart({ source: 'all', direction: 'guess-region', timerEnabled }),
  }));

  DIALEKTE.forEach(d => {
    grid.appendChild(modeCard({
      color: d.farbe,
      flag: d.flag,
      name: d.name,
      region: d.region,
      desc: t('view.setup.mode.dialekt.desc', { name: d.name }),
      onClick: () => onStart({ source: d.id, direction: 'dial->hd', timerEnabled }),
    }));
  });

  c.appendChild(grid);
  return c;
}

function modeCard({ color, flag, name, region, desc, onClick }) {
  return el('button', {
    class: 'dialekt-card',
    style: { '--dc': color },
    onClick
  },
    el('span', { class: 'dc-flag' }, flag),
    el('div', { class: 'dc-name' }, name),
    el('div', { class: 'dc-region' }, region),
    el('div', { class: 'dc-desc' }, desc),
    el('div', { class: 'dc-foot' },
      el('span', { class: 'dc-count' }, t('view.setup.cardCount', { n: QUIZ_LENGTH })),
      el('span', { class: 'dc-arrow' }, el('span', { html: '→' }))
    )
  );
}
