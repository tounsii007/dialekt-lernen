// Karteikarten-Modus · Auswahl-Bildschirm
import { el } from '../../util.js';
import { DIALEKTE, ALLE_AUSDRUECKE } from '../../../data/dialekte.js';
import { KATEGORIE_LIST } from '../../../data/kategorien.js';
import { icon } from '../../util/icons.js';
import { getLernstand, STATUS_LEARNED, STATUS_MEDIUM } from '../../store.js';

// Themen-Farben (zyklisch über die Kategorien)
const THEMEN_FARBEN = [
  '#ef476f', '#06d6a0', '#118ab2', '#ffd166', '#8338ec',
  '#fb5607', '#3a86ff', '#ff006e', '#06a77d', '#d62246',
  '#7209b7', '#4cc9f0', '#f72585', '#4361ee', '#10b981', '#f59e0b'
];

const MODES = [
  { id: 'normal',  icon: 'cards',    title: 'Klassisch',       desc: 'Dialekt → Hochdeutsch' },
  { id: 'reverse', icon: 'refresh',  title: 'Umgekehrt',       desc: 'Hochdeutsch → Dialekt' },
  { id: 'mc',      icon: 'target',   title: 'Multiple Choice', desc: '4 Optionen — tippe die Bedeutung' },
  { id: 'type',    icon: 'keyboard', title: 'Tippen',          desc: 'Antwort eintippen (mit Toleranz)' },
  { id: 'cloze',   icon: 'target',   title: 'Lückentext',      desc: 'Fehlendes Wort im Satz ergänzen' },
  { id: 'audio',   icon: 'speaker',  title: 'Nur Audio',       desc: 'Hör zu, dann antworte' },
  { id: 'pron',    icon: 'speaker',  title: 'Aussprache',      desc: 'Sprechen üben mit Mikrofon' }
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

  // Themen-Lektionen — kuratierter Pfad nach Kategorie über alle Dialekte
  container.appendChild(el('div', { class: 'section-head', style: { marginTop: '32px' } },
    el('div', {},
      el('h3', { style: { fontSize: '1.5rem' } }, '🎯 Themen-Lektionen'),
      el('div', { class: 'lede' }, 'Fokussiert nach Kategorie — quer durch alle Dialekte.')
    )
  ));

  const themen = el('div', { class: 'dialekt-grid' });
  // Counts und Lernstand-Aggregation pro Kategorie über alle Dialekte
  const statsByKat = {};
  ALLE_AUSDRUECKE.forEach(a => {
    const s = statsByKat[a.kategorie] || (statsByKat[a.kategorie] = { total: 0, learned: 0, started: 0 });
    s.total++;
    const stand = getLernstand(a.dialektId, a.id);
    if (stand >= STATUS_LEARNED) s.learned++;
    else if (stand >= STATUS_MEDIUM) s.started++;
  });

  KATEGORIE_LIST.forEach((kat, i) => {
    const stats = statsByKat[kat.id];
    if (!stats || stats.total === 0) return;
    const color = THEMEN_FARBEN[i % THEMEN_FARBEN.length];
    const pct = Math.round((stats.learned / stats.total) * 100);
    const progressLabel = stats.learned > 0
      ? `${stats.learned}/${stats.total} gelernt (${pct}%)`
      : (stats.started > 0 ? `${stats.started}/${stats.total} angefangen` : `${stats.total} Karten`);
    const card = el('button', {
      class: 'dialekt-card thema-card',
      style: { '--dc': color, '--progress': pct + '%' },
      onClick: () => onStart({ source: 'kategorie:' + kat.id, mode: currentMode }),
      'aria-label': `${kat.label}: ${progressLabel}`,
    },
      el('span', { class: 'dc-flag' }, kat.icon),
      el('div', { class: 'dc-name' }, kat.label),
      el('div', { class: 'dc-region' }, 'Thema · alle Dialekte'),
      el('div', { class: 'dc-desc' }, `Alle ${kat.label.toLowerCase().replace(/ &.*$/, '')}-Ausdrücke kompakt — perfekt für eine Themen-Session.`),
      el('div', { class: 'thema-progress', title: progressLabel },
        el('div', { class: 'thema-progress-bar', style: { width: pct + '%', background: color } })
      ),
      el('div', { class: 'dc-foot' },
        el('span', { class: 'dc-count' }, progressLabel),
        el('span', { class: 'dc-arrow' }, el('span', { html: '→' }))
      )
    );
    themen.appendChild(card);
  });
  container.appendChild(themen);

  return container;
}
