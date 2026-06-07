// Custom-Decks · Listen-Ansicht + Erstellen / Löschen / Lernen-Start.

import { el, go, toast } from '../util.js';
import { getDecks, createDeck, deleteDeck, updateDeck, deckSize } from '../store/decks.js';
import { getDialekt } from '../../data/dialekte.js';
import { openModal, confirmModal, closeModal } from '../util/modal.js';
import { emptyIllustration, icon } from '../util/icons.js';
import { t } from '../util/i18n.js';

const COLOR_PRESETS = [
  '#ef476f', '#06d6a0', '#118ab2', '#ffd166', '#8338ec',
  '#fb5607', '#3a86ff', '#ff006e', '#06a77d', '#d62246',
  '#7209b7', '#4cc9f0', '#f72585', '#4361ee', '#10b981', '#f59e0b'
];

// Text-Input für Deck-Namen — gemeinsam von Create- und Edit-Modal genutzt.
// Styling steckt in .deck-modal-input (styles.css), nicht mehr inline.
function deckNameInput({ value = '', placeholder } = {}) {
  const attrs = { type: 'text', value, class: 'deck-modal-input' };
  if (placeholder) attrs.placeholder = placeholder;
  return el('input', attrs);
}

// Farb-Auswahl-Reihe. Liefert { row, getColor } — kapselt den Auswahl-State,
// damit beide Modals nicht je eine eigene paint()-Kopie brauchen.
function deckColorRow(initialColor) {
  let selected = initialColor;
  const row = el('div', { class: 'deck-swatch-row' });
  function paint() {
    row.innerHTML = '';
    COLOR_PRESETS.forEach((c, i) => {
      row.appendChild(el('button', {
        type: 'button',
        'aria-label': t('view.decks.swatchAria', { n: i + 1, total: COLOR_PRESETS.length }),
        'aria-pressed': c === selected ? 'true' : 'false',
        title: c,
        class: 'deck-swatch' + (c === selected ? ' is-selected' : ''),
        style: { background: c },
        onClick: () => { selected = c; paint(); }
      }));
    });
  }
  paint();
  return { row, getColor: () => selected };
}

export function renderDecks(root) {
  root.innerHTML = '';
  const view = el('div', { class: 'view' });

  view.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, t('view.decks.title')),
      el('div', { class: 'lede' }, t('view.decks.lede'))
    ),
    el('div', { style: { display: 'flex', gap: '8px' } },
      el('button', {
        class: 'btn btn-primary',
        dataset: { magnetic: '10' },
        onClick: () => openCreateDeckModal(() => renderDecks(document.getElementById('app')))
      }, t('view.decks.newDeck'))
    )
  ));

  const decks = getDecks();

  if (decks.length === 0) {
    view.appendChild(el('div', { class: 'empty-state' },
      emptyIllustration('sparkles'),
      el('h3', {}, t('view.decks.emptyTitle')),
      el('div', { class: 'empty-meta' }, t('view.decks.emptyMeta')),
      el('button', {
        class: 'btn btn-primary',
        dataset: { magnetic: '12' },
        onClick: () => openCreateDeckModal(() => renderDecks(document.getElementById('app')))
      }, t('view.decks.emptyCta'))
    ));
    root.appendChild(view);
    return;
  }

  const grid = el('div', { class: 'dialekt-grid', style: { marginTop: '16px' } });
  decks.forEach(deck => grid.appendChild(renderDeckCard(deck)));
  view.appendChild(grid);

  root.appendChild(view);
}

function renderDeckCard(deck) {
  const size = deckSize(deck.id);

  // Preview: max. 3 Dialekt-Flaggen
  const dialektFlags = [];
  const seen = new Set();
  for (const ref of deck.expressionIds) {
    if (seen.has(ref.dialektId)) continue;
    seen.add(ref.dialektId);
    const d = getDialekt(ref.dialektId);
    if (d) dialektFlags.push(d.flag);
    if (dialektFlags.length >= 4) break;
  }
  const flagText = dialektFlags.length ? dialektFlags.join(' ') : '🗂️';

  const card = el('div', {
    class: 'dialekt-card',
    style: { '--dc': deck.color, position: 'relative', cursor: 'default' },
    dataset: { spotlight: '' }
  },
    el('span', { class: 'dc-flag' }, flagText),
    el('div', { class: 'dc-name' }, deck.name),
    el('div', { class: 'dc-region' }, size === 0
      ? t('view.decks.emptyDeck')
      : (size === 1 ? t('view.decks.exprOne', { n: size }) : t('view.decks.exprMany', { n: size }))),
    el('div', { class: 'dc-desc' },
      t('view.decks.createdOn', { date: new Date(deck.createdAt || Date.now()).toLocaleDateString('de-DE') })
    ),
    el('div', { class: 'dc-foot', style: { gap: '8px', flexWrap: 'wrap' } },
      el('button', {
        class: 'btn btn-primary',
        style: { padding: '6px 14px', fontSize: '.85rem' },
        onClick: () => {
          if (size === 0) {
            toast(t('view.decks.emptyToast'), 'info', 2400);
            return;
          }
          go(`#/lernen?deck=${encodeURIComponent(deck.id)}`);
        }
      }, t('view.decks.learn')),
      el('button', {
        class: 'btn btn-ghost',
        style: { padding: '6px 12px', fontSize: '.85rem' },
        onClick: () => openEditDeckModal(deck, () => renderDecks(document.getElementById('app')))
      }, t('view.decks.edit')),
      el('button', {
        class: 'btn btn-ghost danger-btn',
        style: { padding: '6px 12px', fontSize: '.85rem' },
        onClick: async () => {
          const ok = await confirmModal({
            title: t('view.decks.deleteTitle'),
            message: t('view.decks.deleteConfirm', { name: deck.name }),
            confirmLabel: t('view.decks.deleteAction'),
            danger: true
          });
          if (!ok) return;
          deleteDeck(deck.id);
          toast(t('view.decks.deleted'), 'success', 1400);
          renderDecks(document.getElementById('app'));
        }
      }, '🗑️')
    )
  );

  return card;
}

/**
 * openCreateDeckModal — öffentlich exportiert, damit auch z. B. die Favoriten-View
 * direkt aus dem Bulk-Action-Menü neue Decks anlegen kann.
 * @param {(deckId: string|null) => void} onCreated — Callback nach Erstellen (deckId oder null bei Abbruch).
 * @param {{ initialName?: string }} [opts]
 */
export function openCreateDeckModal(onCreated, { initialName = '' } = {}) {
  const nameInput = deckNameInput({
    value: initialName,
    placeholder: t('view.decks.namePlaceholder')
  });
  const { row: colorRow, getColor } = deckColorRow(
    COLOR_PRESETS[Math.floor(Math.random() * COLOR_PRESETS.length)]
  );

  let created = false;

  openModal({
    title: t('view.decks.createTitle'),
    content: [
      el('label', { class: 'deck-modal-label' }, t('view.decks.labelName')),
      nameInput,
      el('label', { class: 'deck-modal-label' }, t('view.decks.labelColor')),
      colorRow,
      el('p', { class: 'lede', style: { fontSize: '.85rem' } },
        t('view.decks.createHint')
      )
    ],
    actions: [
      { label: t('btn.cancel'), variant: 'ghost', onClick: () => { /* cancel */ } },
      {
        label: t('view.decks.createAction'), variant: 'primary',
        onClick: () => {
          const name = nameInput.value.trim();
          if (!name) {
            toast(t('view.decks.nameRequired'), 'info', 1600);
            nameInput.focus();
            return false; // verhindere Schließen
          }
          const id = createDeck({ name, color: getColor() });
          created = true;
          toast(t('view.decks.created'), 'success', 1400);
          if (onCreated) onCreated(id);
        }
      }
    ],
    onClose: () => { if (!created && onCreated) onCreated(null); }
  });

  setTimeout(() => nameInput.focus(), 80);
}

function openEditDeckModal(deck, onSaved) {
  const nameInput = deckNameInput({ value: deck.name });
  const { row: colorRow, getColor } = deckColorRow(deck.color);

  openModal({
    title: t('view.decks.editTitle'),
    content: [
      el('label', { class: 'deck-modal-label' }, t('view.decks.labelName')),
      nameInput,
      el('label', { class: 'deck-modal-label' }, t('view.decks.labelColor')),
      colorRow
    ],
    actions: [
      { label: t('btn.cancel'), variant: 'ghost', onClick: () => {} },
      {
        label: t('btn.save'), variant: 'primary',
        onClick: () => {
          const name = nameInput.value.trim();
          if (!name) { toast(t('view.decks.nameEmpty'), 'info', 1600); return false; }
          updateDeck(deck.id, { name, color: getColor() });
          toast(t('view.decks.saved'), 'success', 1400);
          if (onSaved) onSaved();
        }
      }
    ]
  });

  setTimeout(() => nameInput.focus(), 80);
}
