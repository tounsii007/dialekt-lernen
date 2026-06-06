import { el, go, speak, escapeHtml, toast } from '../util.js';
import { KATEGORIEN } from '../../data/kategorien.js';
import { isFavorit, toggleFavorit, getLernstand, setLernstand, getNote, setNote } from '../store.js';
import { reportCorrection } from '../util/feedback.js';
import { shareCard } from '../util/share-card.js';
import { openSuggestEditModal } from './suggestEditModal.js';
import { getExplanationLang } from '../store/settings.js';
import { translatedBedeutung } from '../util/translations.js';
import { flagSvg } from '../util/flags.js';

// Erklärung („bedeutung") — übersetzt anzeigen, wenn eine Erklärungs-Sprache ≠ de
// gewählt ist UND eine Übersetzung vorliegt; sonst deutsches Original.
// Bei Übersetzung: Sprach-Badge + das deutsche Original ausklappbar.
function meaningEl(a, dialekt) {
  const lang = getExplanationLang();
  const tr = lang !== 'de' ? translatedBedeutung(dialekt.id, a.id) : null;
  if (!tr) return el('div', { class: 'expr-meaning' }, a.bedeutung);
  return el('div', { class: 'expr-meaning expr-meaning-tr' },
    el('span', { class: 'expr-lang-badge', title: `Erklärung auf ${lang.toUpperCase()}` },
      flagSvg(lang, 11), el('span', {}, lang.toUpperCase())),
    el('span', { class: 'expr-meaning-text' }, tr),
    el('details', { class: 'expr-meaning-orig' },
      el('summary', {}, 'Original (DE)'),
      el('span', {}, a.bedeutung)
    )
  );
}

export function renderDialektCard(d) {
  return el('button', {
    class: 'dialekt-card',
    style: { '--dc': d.farbe },
    dataset: { spotlight: '', tilt: '', tiltMax: '6' },
    'aria-label': `${d.name}, ${d.region}, ${d.ausdruecke.length} Ausdrücke`,
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
    'aria-pressed': fav ? 'true' : 'false',
    'aria-label': fav ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen',
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
    'aria-pressed': stand >= 3 ? 'true' : 'false',
    'aria-label': stand >= 3 ? 'Als nicht gelernt markieren' : 'Als gelernt markieren',
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
    'aria-label': `„${a.ausdruck}" anhören`,
    onClick: (e) => { e.stopPropagation(); speak(a.ausdruck, dialekt.lang || 'de-DE', { dialektId: dialekt.id }); }
  }, el('span', { html: '🔊' }));

  const note = getNote(dialekt.id, a.id);
  const noteArea = el('textarea', {
    class: 'expr-note-input',
    placeholder: 'Eigene Notiz hinzufügen…',
    maxlength: 280,
    rows: 2
  });
  noteArea.value = note;
  const noteWrap = el('div', { class: 'expr-note' + (note ? ' has-note' : '') }, noteArea);
  noteArea.addEventListener('blur', () => {
    const v = noteArea.value;
    setNote(dialekt.id, a.id, v);
    noteWrap.classList.toggle('has-note', !!v.trim());
  });

  const noteBtn = el('button', {
    class: 'expr-action' + (note ? ' is-active' : ''),
    title: 'Notiz',
    'aria-label': 'Notiz bearbeiten',
    onClick: (e) => {
      e.stopPropagation();
      noteWrap.classList.toggle('is-open');
      if (noteWrap.classList.contains('is-open')) setTimeout(() => noteArea.focus(), 50);
    }
  }, el('span', { html: '📝' }));

  const reportBtn = el('button', {
    class: 'expr-action expr-action-report',
    title: 'Korrektur melden (öffnet GitHub-Issue)',
    'aria-label': `Korrektur für „${a.ausdruck}" melden`,
    onClick: (e) => {
      e.stopPropagation();
      const ok = reportCorrection(dialekt, a);
      if (ok) toast('Issue-Formular geöffnet — danke fürs Helfen!', 'success', 2200);
      else toast('Konnte nicht öffnen — Popup-Blocker?', 'info', 2400);
    }
  }, el('span', { html: '🚩' }));

  const editBtn = el('button', {
    class: 'expr-action expr-action-edit',
    title: 'Korrektur vorschlagen (lokal speichern)',
    'aria-label': `Korrektur für „${a.ausdruck}" vorschlagen`,
    onClick: (e) => {
      e.stopPropagation();
      openSuggestEditModal(dialekt, a);
    }
  }, el('span', { html: '✎' }));

  const shareBtn = el('button', {
    class: 'expr-action expr-action-share',
    title: 'Karte als Bild teilen',
    'aria-label': `„${a.ausdruck}" als Bild teilen`,
    onClick: async (e) => {
      e.stopPropagation();
      const btn = e.currentTarget;
      btn.disabled = true;
      try {
        const payload = {
          ausdruck: a.ausdruck,
          hochdeutsch: a.hochdeutsch,
          bedeutung: a.bedeutung,
          beispiel: a.beispiel,
          kategorie: a.kategorie,
          dialektName: dialekt.name,
          dialektFlag: dialekt.flag,
          dialektFarbe: dialekt.farbe,
        };
        const result = await shareCard(payload);
        toast(result === 'shared' ? 'Karte geteilt ✓' : 'Bild heruntergeladen ↓', 'success', 1600);
      } catch (err) {
        toast('Teilen fehlgeschlagen', 'error', 2000);
      } finally {
        btn.disabled = false;
      }
    }
  }, el('span', { html: '📤' }));

  return el('article', { class: 'expr-card', dataset: { id: a.id, cat: a.kategorie } },
    el('div', { class: 'expr-head' },
      el('div', {},
        el('div', { class: 'expr-cat' }, cat.icon + ' ' + cat.label),
        el('div', { class: 'expr-text' }, a.ausdruck)
      )
    ),
    el('div', { class: 'expr-hd' }, a.hochdeutsch),
    meaningEl(a, dialekt),
    a.beispiel ? el('div', { class: 'expr-example' },
      el('strong', {}, '„' + a.beispiel + '"'),
      a.beispiel_hd || ''
    ) : null,
    noteWrap,
    el('div', { class: 'expr-foot' },
      el('span', { class: 'region-tag' }, dialekt.flag + ' ' + dialekt.name),
      el('div', { class: 'expr-actions' }, speakBtn, noteBtn, favBtn, learnBtn, shareBtn, editBtn, reportBtn)
    )
  );
}
