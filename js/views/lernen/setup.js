// Karteikarten-Modus · Auswahl-Bildschirm
import { el } from '../../util.js';
import { DIALEKTE, ALLE_AUSDRUECKE } from '../../../data/dialekte.js';

export function renderSetup(onStart) {
  const container = el('div', {});

  container.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, '🃏 Karteikarten lernen'),
      el('div', { class: 'lede' }, 'Wähle eine Quelle und lerne im eigenen Tempo. Wische, klicke oder nutze die Pfeiltasten.')
    )
  ));

  const opts = el('div', { class: 'dialekt-grid' });

  const allCard = el('button', {
    class: 'dialekt-card',
    style: { '--dc': '#8338ec' },
    onClick: () => onStart({ source: 'all' })
  },
    el('span', { class: 'dc-flag' }, '🌍'),
    el('div', { class: 'dc-name' }, 'Alle Dialekte'),
    el('div', { class: 'dc-region' }, 'Bunte Mischung'),
    el('div', { class: 'dc-desc' }, 'Lerne quer durch alle Regionen. Ideal zum Auffrischen.'),
    el('div', { class: 'dc-foot' },
      el('span', { class: 'dc-count' }, `${ALLE_AUSDRUECKE.length} Karten`),
      el('span', { class: 'dc-arrow' }, el('span', { html: '→' }))
    )
  );
  opts.appendChild(allCard);

  DIALEKTE.forEach(d => {
    const c = el('button', {
      class: 'dialekt-card',
      style: { '--dc': d.farbe },
      onClick: () => onStart({ source: d.id })
    },
      el('span', { class: 'dc-flag' }, d.flag),
      el('div', { class: 'dc-name' }, d.name),
      el('div', { class: 'dc-region' }, d.region),
      el('div', { class: 'dc-desc' }, `Lerne die wichtigsten Ausdrücke aus ${d.bundesland}.`),
      el('div', { class: 'dc-foot' },
        el('span', { class: 'dc-count' }, `${d.ausdruecke.length} Karten`),
        el('span', { class: 'dc-arrow' }, el('span', { html: '→' }))
      )
    );
    opts.appendChild(c);
  });

  container.appendChild(opts);
  return container;
}
