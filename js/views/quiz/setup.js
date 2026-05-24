// Quiz · Auswahl-Screen (Modus + Dialekt)
import { el } from '../../util.js';
import { DIALEKTE } from '../../../data/dialekte.js';
import { getQuizGenauigkeit } from '../../store.js';
import { QUIZ_LENGTH } from './constants.js';

export function renderQuizSetup(onStart) {
  const c = el('div', {});
  c.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, '🎯 Quiz'),
      el('div', { class: 'lede' }, `${QUIZ_LENGTH} Multiple-Choice-Fragen. Genauigkeit gesamt: ${getQuizGenauigkeit()}%`)
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
      el('span', { class: 'toggle-label' }, `⏱️ 20-Sekunden-Timer ${timerEnabled ? 'ein' : 'aus'}`)
    ));
  }
  renderTimerToggle();
  c.appendChild(timerRow);

  const grid = el('div', { class: 'dialekt-grid' });

  grid.appendChild(modeCard({
    color: '#8338ec',
    flag: '🌍',
    name: 'Bunt gemischt',
    region: 'Alle Dialekte',
    desc: 'Was bedeutet der Dialekt-Ausdruck auf Hochdeutsch?',
    onClick: () => onStart({ source: 'all', direction: 'dial->hd', timerEnabled }),
  }));

  grid.appendChild(modeCard({
    color: '#06d6a0',
    flag: '🔄',
    name: 'Umgekehrt',
    region: 'Hochdeutsch → Dialekt',
    desc: 'Welcher Dialekt-Ausdruck passt zur Hochdeutsch-Bedeutung?',
    onClick: () => onStart({ source: 'all', direction: 'hd->dial', timerEnabled }),
  }));

  grid.appendChild(modeCard({
    color: '#fb5607',
    flag: '🗺️',
    name: 'Wo wird das gesprochen?',
    region: 'Region erraten',
    desc: 'Aus welcher Region stammt dieser Ausdruck?',
    onClick: () => onStart({ source: 'all', direction: 'guess-region', timerEnabled }),
  }));

  DIALEKTE.forEach(d => {
    grid.appendChild(modeCard({
      color: d.farbe,
      flag: d.flag,
      name: d.name,
      region: d.region,
      desc: `Teste dein ${d.name}-Wissen.`,
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
      el('span', { class: 'dc-count' }, `${QUIZ_LENGTH} Fragen`),
      el('span', { class: 'dc-arrow' }, el('span', { html: '→' }))
    )
  );
}
