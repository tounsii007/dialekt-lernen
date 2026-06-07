// Favoriten · Favoriten-Liste mit optionalem Auswahl-Modus + Bulk-Aktionen
// (Zu Deck hinzufügen / Aus Favoriten entfernen).

import { el, go, toast } from '../../util.js';
import { t } from '../../util/i18n.js';
import { getDialekt } from '../../../data/dialekte.js';
import { toggleFavorit } from '../../store.js';
import { renderExpressionCard } from '../partials.js';
import { emptyIllustration } from '../../util/icons.js';
import { getDecks, addToDeck } from '../../store/decks.js';
import { openModal, confirmModal } from '../../util/modal.js';
import { openCreateDeckModal } from '../decks.js';

export function renderFavoritenList(favs, rerender) {
  const wrap = el('section', { class: 'section favoriten-list-section', style: { marginTop: '40px' } });

  if (favs.length === 0) {
    wrap.appendChild(el('div', { class: 'section-head' },
      el('div', {}, el('h2', {}, t('view.list-panel.title')))
    ));
    wrap.appendChild(el('div', { class: 'empty-state' },
      emptyIllustration('heart'),
      el('h3', {}, t('view.list-panel.emptyTitle')),
      el('div', { class: 'empty-meta' }, t('view.list-panel.emptyMeta')),
      el('button', { class: 'btn btn-primary', dataset: { magnetic: '12' }, onClick: () => go('#/entdecken') }, t('view.list-panel.emptyCta'))
    ));
    return wrap;
  }

  // Lokaler Auswahl-State (nicht persistent).
  let selectionMode = false;
  const selectedKeys = new Set();
  const keyOf = (dialektId, ausdruckId) => `${dialektId}.${ausdruckId}`;

  const grid = el('div', { class: 'expr-grid' });
  const head = el('div', { class: 'section-head', style: { alignItems: 'center', flexWrap: 'wrap', gap: '12px' } });
  const toolbar = el('div', { class: 'card', style: { padding: '12px 16px', marginBottom: '16px', display: 'none', flexWrap: 'wrap', gap: '8px', alignItems: 'center' } });

  function selectableKeys() {
    return favs
      .filter(({ dialektId, ausdruckId }) => {
        const d = getDialekt(dialektId);
        return d && d.ausdruecke.some(x => x.id === ausdruckId);
      })
      .map(({ dialektId, ausdruckId }) => keyOf(dialektId, ausdruckId));
  }

  function updateGridSelection() {
    grid.querySelectorAll('.expr-card').forEach(card => {
      const key = card.dataset.favKey;
      const isSel = key && selectedKeys.has(key);
      card.classList.toggle('is-bulk-selected', isSel);
      const cb = card.querySelector('.bulk-checkbox input');
      if (cb) cb.checked = isSel;
      const wrap = card.querySelector('.bulk-checkbox');
      if (wrap) wrap.style.display = selectionMode ? 'flex' : 'none';
    });
    updateCountLabel();
  }

  let countLabel = null;
  function updateCountLabel() {
    if (countLabel) countLabel.textContent = t('view.list-panel.countSelected', { n: selectedKeys.size });
  }

  function renderHead() {
    head.innerHTML = '';
    head.appendChild(el('div', {}, el('h2', {}, t('view.list-panel.title'))));
    const toggleBtn = el('button', {
      class: 'btn ' + (selectionMode ? 'btn-secondary' : 'btn-ghost'),
      style: { padding: '6px 14px' },
      onClick: () => {
        selectionMode = !selectionMode;
        if (!selectionMode) selectedKeys.clear();
        toolbar.style.display = selectionMode ? 'flex' : 'none';
        renderHead();
        updateGridSelection();
      }
    }, selectionMode ? t('view.list-panel.selectionEnd') : t('view.list-panel.selectionMode'));
    head.appendChild(el('div', { style: { display: 'flex', gap: '8px' } }, toggleBtn));
  }
  renderHead();

  // Toolbar-Aktionen
  countLabel = el('span', { class: 'lede', style: { fontSize: '.85rem', flex: '1' } }, t('view.list-panel.countSelected', { n: 0 }));
  toolbar.appendChild(countLabel);

  toolbar.appendChild(el('button', {
    class: 'btn btn-ghost', style: { padding: '6px 12px', fontSize: '.85rem' },
    onClick: () => {
      const all = selectableKeys();
      all.forEach(k => selectedKeys.add(k));
      updateGridSelection();
    }
  }, t('view.list-panel.selectAll')));

  toolbar.appendChild(el('button', {
    class: 'btn btn-ghost', style: { padding: '6px 12px', fontSize: '.85rem' },
    onClick: () => {
      const all = selectableKeys();
      all.forEach(k => {
        if (selectedKeys.has(k)) selectedKeys.delete(k);
        else selectedKeys.add(k);
      });
      updateGridSelection();
    }
  }, t('view.list-panel.invertSelection')));

  toolbar.appendChild(el('button', {
    class: 'btn btn-secondary', style: { padding: '6px 12px', fontSize: '.85rem' },
    onClick: async () => {
      if (selectedKeys.size === 0) { toast(t('view.list-panel.toastNothingSelected'), 'info', 1400); return; }
      await openAddToDeckDialog(Array.from(selectedKeys), rerender);
    }
  }, t('view.list-panel.addToDeck')));

  toolbar.appendChild(el('button', {
    class: 'btn btn-ghost danger-btn', style: { padding: '6px 12px', fontSize: '.85rem' },
    onClick: async () => {
      if (selectedKeys.size === 0) { toast(t('view.list-panel.toastNothingSelected'), 'info', 1400); return; }
      const n = selectedKeys.size;
      const ok = await confirmModal({
        title: t('view.list-panel.removeConfirmTitle'),
        message: n === 1
          ? t('view.list-panel.removeConfirmMsgOne', { n })
          : t('view.list-panel.removeConfirmMsg', { n }),
        confirmLabel: t('view.list-panel.removeConfirmAction'),
        danger: true
      });
      if (!ok) return;
      let removed = 0;
      for (const key of selectedKeys) {
        const [dialektId, ausdruckId] = key.split('.');
        if (!dialektId || !ausdruckId) continue;
        toggleFavorit(dialektId, ausdruckId); // toggles off, da Favorit
        removed++;
      }
      selectedKeys.clear();
      toast(t('view.list-panel.toastRemoved', { n: removed }), 'success', 1600);
      rerender();
    }
  }, t('view.list-panel.removeFromFavorites')));

  wrap.appendChild(head);
  wrap.appendChild(toolbar);

  favs.forEach(({ dialektId, ausdruckId }) => {
    const d = getDialekt(dialektId);
    if (!d) return;
    const a = d.ausdruecke.find(x => x.id === ausdruckId);
    if (!a) return;

    const card = renderExpressionCard(a, d);
    const key = keyOf(dialektId, ausdruckId);
    card.dataset.favKey = key;

    // Checkbox-Overlay
    const cb = el('input', {
      type: 'checkbox',
      'aria-label': t('view.list-panel.checkboxAria'),
      onClick: (e) => {
        e.stopPropagation();
        if (cb.checked) selectedKeys.add(key); else selectedKeys.delete(key);
        card.classList.toggle('is-bulk-selected', cb.checked);
        updateCountLabel();
      }
    });
    const cbWrap = el('label', {
      class: 'bulk-checkbox',
      style: {
        position: 'absolute', top: '8px', left: '8px',
        display: 'none', alignItems: 'center', justifyContent: 'center',
        width: '28px', height: '28px',
        background: 'var(--bg-elev)', borderRadius: '6px',
        border: '1px solid var(--border)', zIndex: '5',
        cursor: 'pointer'
      },
      onClick: (e) => e.stopPropagation()
    }, cb);
    card.style.position = card.style.position || 'relative';
    card.prepend(cbWrap);

    // Click toggling im Auswahl-Modus (außer auf Action-Buttons)
    card.addEventListener('click', (e) => {
      if (!selectionMode) return;
      const t = e.target;
      if (t.closest('.expr-action') || t.closest('.expr-note-input')) return;
      cb.checked = !cb.checked;
      if (cb.checked) selectedKeys.add(key); else selectedKeys.delete(key);
      card.classList.toggle('is-bulk-selected', cb.checked);
      updateCountLabel();
    });

    grid.appendChild(card);
  });

  wrap.appendChild(grid);
  return wrap;
}

// Dialog zur Auswahl eines Decks (oder zum Neuanlegen).
async function openAddToDeckDialog(selectedKeys, rerender) {
  const decks = getDecks();

  const refs = selectedKeys.map(k => {
    const [dialektId, id] = k.split('.');
    return { dialektId, id };
  });

  let selectedDeckId = decks[0]?.id || null;

  const buildDeckList = () => {
    if (decks.length === 0) {
      return el('p', { class: 'lede' }, t('view.list-panel.noDecks'));
    }
    const list = el('div', { style: { display: 'grid', gap: '8px', maxHeight: '300px', overflowY: 'auto', padding: '4px' } });
    decks.forEach(d => {
      const row = el('label', {
        style: {
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px 12px', borderRadius: 'var(--r-md)',
          border: '1px solid var(--border)', cursor: 'pointer',
          background: 'var(--bg-soft)'
        }
      },
        el('input', {
          type: 'radio', name: 'deckChoice', value: d.id,
          checked: d.id === selectedDeckId,
          onClick: () => { selectedDeckId = d.id; }
        }),
        el('span', { style: { width: '14px', height: '14px', borderRadius: '50%', background: d.color, flexShrink: '0' } }),
        el('div', { style: { flex: '1' } },
          el('div', { style: { fontWeight: '600' } }, d.name),
          el('div', { class: 'lede', style: { fontSize: '.8rem' } },
            t('view.list-panel.deckEntries', { n: d.expressionIds.length })
          )
        )
      );
      list.appendChild(row);
    });
    return list;
  };

  const listWrap = el('div', {}, buildDeckList());

  openModal({
    title: t('view.list-panel.addToDeckTitle', { n: selectedKeys.length }),
    content: [
      listWrap,
      el('div', { style: { marginTop: '12px', display: 'flex', justifyContent: 'flex-end' } },
        el('button', {
          class: 'btn btn-ghost',
          style: { padding: '6px 12px' },
          onClick: () => {
            openCreateDeckModal((newDeckId) => {
              if (!newDeckId) return;
              // Nach Anlegen: gleich hinzufügen
              let added = 0;
              for (const ref of refs) {
                if (addToDeck(newDeckId, ref)) added++;
              }
              toast(t('view.list-panel.toastAddedToNewDeck', { n: added }), 'success', 1800);
              rerender();
            });
          }
        }, t('view.list-panel.newDeck'))
      )
    ],
    actions: [
      { label: t('view.list-panel.cancel'), variant: 'ghost', onClick: () => {} },
      {
        label: t('view.list-panel.add'),
        variant: 'primary',
        onClick: () => {
          if (!selectedDeckId) {
            toast(t('view.list-panel.toastChooseDeck'), 'info', 1800);
            return false;
          }
          let added = 0, skipped = 0;
          for (const ref of refs) {
            if (addToDeck(selectedDeckId, ref)) added++;
            else skipped++;
          }
          const msg = skipped > 0
            ? t('view.list-panel.toastAddedSkipped', { added, skipped })
            : t('view.list-panel.toastAdded', { n: added });
          toast(msg, 'success', 1800);
          rerender();
        }
      }
    ]
  });
}
