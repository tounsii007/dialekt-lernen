// Custom-Decks · Listen-Ansicht + Erstellen / Löschen / Lernen-Start.

import { el, go, toast } from '../util.js';
import { getDecks, createDeck, deleteDeck, updateDeck, deckSize } from '../store/decks.js';
import { getDialekt } from '../../data/dialekte.js';
import { openModal, confirmModal, closeModal } from '../util/modal.js';
import { emptyIllustration, icon } from '../util/icons.js';

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
    COLOR_PRESETS.forEach(c => {
      row.appendChild(el('button', {
        type: 'button',
        'aria-label': `Farbe ${c}`,
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
      el('h2', {}, '🗂️ Eigene Decks'),
      el('div', { class: 'lede' }, 'Stelle eigene Lern-Sammlungen aus Ausdrücken zusammen — quer durch alle Dialekte.')
    ),
    el('div', { style: { display: 'flex', gap: '8px' } },
      el('button', {
        class: 'btn btn-primary',
        dataset: { magnetic: '10' },
        onClick: () => openCreateDeckModal(() => renderDecks(document.getElementById('app')))
      }, '+ Neues Deck')
    )
  ));

  const decks = getDecks();

  if (decks.length === 0) {
    view.appendChild(el('div', { class: 'empty-state' },
      emptyIllustration('sparkles'),
      el('h3', {}, 'Noch keine eigenen Decks'),
      el('div', { class: 'empty-meta' }, 'Erstelle ein Deck und fülle es über die Bulk-Aktionen in den Favoriten oder direkt aus Ausdruck-Karten.'),
      el('button', {
        class: 'btn btn-primary',
        dataset: { magnetic: '12' },
        onClick: () => openCreateDeckModal(() => renderDecks(document.getElementById('app')))
      }, '+ Erstes Deck anlegen')
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
    el('div', { class: 'dc-region' }, size === 0 ? 'Leeres Deck' : `${size} Ausdr${size === 1 ? 'uck' : 'ücke'}`),
    el('div', { class: 'dc-desc' },
      `Eigene Sammlung · Erstellt am ${new Date(deck.createdAt || Date.now()).toLocaleDateString('de-DE')}`
    ),
    el('div', { class: 'dc-foot', style: { gap: '8px', flexWrap: 'wrap' } },
      el('button', {
        class: 'btn btn-primary',
        style: { padding: '6px 14px', fontSize: '.85rem' },
        onClick: () => {
          if (size === 0) {
            toast('Deck ist leer — füge zuerst Ausdrücke hinzu (z. B. via Favoriten-Bulk).', 'info', 2400);
            return;
          }
          go(`#/lernen?deck=${encodeURIComponent(deck.id)}`);
        }
      }, '▶ Lernen'),
      el('button', {
        class: 'btn btn-ghost',
        style: { padding: '6px 12px', fontSize: '.85rem' },
        onClick: () => openEditDeckModal(deck, () => renderDecks(document.getElementById('app')))
      }, '✎ Bearbeiten'),
      el('button', {
        class: 'btn btn-ghost danger-btn',
        style: { padding: '6px 12px', fontSize: '.85rem' },
        onClick: async () => {
          const ok = await confirmModal({
            title: 'Deck löschen?',
            message: `„${deck.name}" wirklich entfernen? Die Ausdrücke selbst bleiben natürlich erhalten.`,
            confirmLabel: 'Löschen',
            danger: true
          });
          if (!ok) return;
          deleteDeck(deck.id);
          toast('Deck gelöscht', 'success', 1400);
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
    placeholder: 'Name des Decks (z. B. „Wienerische Lieblinge")'
  });
  const { row: colorRow, getColor } = deckColorRow(
    COLOR_PRESETS[Math.floor(Math.random() * COLOR_PRESETS.length)]
  );

  let created = false;

  openModal({
    title: 'Neues Deck',
    content: [
      el('label', { class: 'deck-modal-label' }, 'Name'),
      nameInput,
      el('label', { class: 'deck-modal-label' }, 'Farbe'),
      colorRow,
      el('p', { class: 'lede', style: { fontSize: '.85rem' } },
        'Deck wird leer angelegt. Befülle es über die Favoriten-Seite mit Bulk-Aktionen oder über das ＋ Symbol an Ausdrücken.'
      )
    ],
    actions: [
      { label: 'Abbrechen', variant: 'ghost', onClick: () => { /* cancel */ } },
      {
        label: 'Anlegen', variant: 'primary',
        onClick: () => {
          const name = nameInput.value.trim();
          if (!name) {
            toast('Bitte einen Namen vergeben', 'info', 1600);
            nameInput.focus();
            return false; // verhindere Schließen
          }
          const id = createDeck({ name, color: getColor() });
          created = true;
          toast('Deck angelegt ✓', 'success', 1400);
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
    title: 'Deck bearbeiten',
    content: [
      el('label', { class: 'deck-modal-label' }, 'Name'),
      nameInput,
      el('label', { class: 'deck-modal-label' }, 'Farbe'),
      colorRow
    ],
    actions: [
      { label: 'Abbrechen', variant: 'ghost', onClick: () => {} },
      {
        label: 'Speichern', variant: 'primary',
        onClick: () => {
          const name = nameInput.value.trim();
          if (!name) { toast('Name darf nicht leer sein', 'info', 1600); return false; }
          updateDeck(deck.id, { name, color: getColor() });
          toast('Deck gespeichert ✓', 'success', 1400);
          if (onSaved) onSaved();
        }
      }
    ]
  });

  setTimeout(() => nameInput.focus(), 80);
}
