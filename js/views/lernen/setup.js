// Karteikarten-Modus · Auswahl-Bildschirm
import { el } from '../../util.js';
import { DIALEKTE, ALLE_AUSDRUECKE } from '../../../data/dialekte.js';
import { icon } from '../../util/icons.js';

const MODES = [
  { id: 'normal',  icon: 'cards',    title: 'Klassisch',       desc: 'Dialekt → Hochdeutsch' },
  { id: 'reverse', icon: 'refresh',  title: 'Umgekehrt',       desc: 'Hochdeutsch → Dialekt' },
  { id: 'mc',      icon: 'target',   title: 'Multiple Choice', desc: '4 Optionen — tippe die Bedeutung' },
  { id: 'type',    icon: 'keyboard', title: 'Tippen',          desc: 'Antwort eintippen (mit Toleranz)' },
  { id: 'audio',   icon: 'speaker',  title: 'Nur Audio',       desc: 'Hör zu, dann antworte' }
];

export function renderSetup(onStart) {
  const container = el('div', {});

  container.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, '🃏 Karteikarten lernen'),
      el('div', { class: 'lede' }, 'Wähle Modus + Quelle. Wische, klicke oder nutze die Pfeiltasten.')
    )
  ));

  // Modus-Switcher (gespeichert im sessionStorage)
  let currentMode = (() => {
    try { return sessionStorage.getItem('dialekto:learnMode') || 'normal'; } catch { return 'normal'; }
  })();

  const modeRow = el('div', { class: 'learn-mode-row' });
  function renderModes() {
    modeRow.innerHTML = '';
    MODES.forEach((m) => {
      const btn = el('button', {
        class: 'learn-mode' + (currentMode === m.id ? ' is-active' : ''),
        onClick: () => {
          currentMode = m.id;
          try { sessionStorage.setItem('dialekto:learnMode', currentMode); } catch {}
          renderModes();
        }
      },
        el('span', { class: 'learn-mode-icon' }, icon(m.icon, { size: 22 })),
        el('span', { class: 'learn-mode-text' },
          el('strong', {}, m.title),
          el('span', {}, m.desc)
        )
      );
      modeRow.appendChild(btn);
    });
  }
  renderModes();
  container.appendChild(modeRow);

  const opts = el('div', { class: 'dialekt-grid' });

  const allCard = el('button', {
    class: 'dialekt-card',
    style: { '--dc': '#8338ec' },
    onClick: () => onStart({ source: 'all', mode: currentMode })
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
      onClick: () => onStart({ source: d.id, mode: currentMode })
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
