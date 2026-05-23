import { el, go, speak, escapeHtml, toast } from '../util.js';
import { KATEGORIEN } from '../../data/kategorien.js';
import { isFavorit, toggleFavorit, getLernstand, setLernstand } from '../store.js';

export function renderDialektCard(d) {
  return el('button', {
    class: 'dialekt-card',
    style: { '--dc': d.farbe },
    dataset: { spotlight: '' },
    onClick: () => go(`#/dialekt/${d.id}`)
  },
    el('span', { class: 'dc-flag' }, d.flag),
    el('div', { class: 'dc-name' }, d.name),
    el('div', { class: 'dc-region' }, d.region),
    el('div', { class: 'dc-desc' }, d.beschreibung),
    el('div', { class: 'dc-foot' },
      el('span', { class: 'dc-count' }, `${d.ausdruecke.length} Ausdrücke`),
      el('span', { class: 'dc-arrow' }, el('span', { html: '→' }))
    )
  );
}

export function renderExpressionCard(a, dialekt) {
  const fav = isFavorit(dialekt.id, a.id);
  const stand = getLernstand(dialekt.id, a.id);
  const cat = KATEGORIEN[a.kategorie] || { label: a.kategorie, icon: '·' };

  const favBtn = el('button', {
    class: 'expr-action' + (fav ? ' is-active' : ''),
    title: fav ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen',
    onClick: (e) => {
      e.stopPropagation();
      const added = toggleFavorit(dialekt.id, a.id);
      favBtn.classList.toggle('is-active', added);
      favBtn.title = added ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen';
      toast(added ? 'Zu Favoriten hinzugefügt' : 'Aus Favoriten entfernt', 'success', 1400);
    }
  }, el('span', { html: fav ? '♥' : '♡' }));

  const learnBtn = el('button', {
    class: 'expr-action' + (stand >= 3 ? ' is-learned' : ''),
    title: stand >= 3 ? 'Als nicht gelernt markieren' : 'Als gelernt markieren',
    onClick: (e) => {
      e.stopPropagation();
      const next = stand >= 3 ? 0 : 3;
      setLernstand(dialekt.id, a.id, next);
      learnBtn.classList.toggle('is-learned', next >= 3);
      toast(next >= 3 ? 'Als gelernt markiert ✓' : 'Lernstand zurückgesetzt', 'success', 1400);
    }
  }, el('span', { html: '✓' }));

  const speakBtn = el('button', {
    class: 'expr-action',
    title: 'Anhören',
    onClick: (e) => { e.stopPropagation(); speak(a.ausdruck); }
  }, el('span', { html: '🔊' }));

  return el('article', { class: 'expr-card', dataset: { id: a.id, cat: a.kategorie } },
    el('div', { class: 'expr-head' },
      el('div', {},
        el('div', { class: 'expr-cat' }, cat.icon + ' ' + cat.label),
        el('div', { class: 'expr-text' }, a.ausdruck)
      )
    ),
    el('div', { class: 'expr-hd' }, a.hochdeutsch),
    el('div', { class: 'expr-meaning' }, a.bedeutung),
    a.beispiel ? el('div', { class: 'expr-example' },
      el('strong', {}, '„' + a.beispiel + '"'),
      a.beispiel_hd || ''
    ) : null,
    el('div', { class: 'expr-foot' },
      el('span', { class: 'region-tag' }, dialekt.flag + ' ' + dialekt.name),
      el('div', { class: 'expr-actions' }, speakBtn, favBtn, learnBtn)
    )
  );
}
