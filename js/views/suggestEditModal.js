// Edit-Vorschlag-Modal: Bietet Felder zum Korrigieren eines Ausdrucks an.
// Speichert lokal als Suggestion (NICHT in den Daten ändern!).

import { el, toast } from '../util.js';
import { openModal } from '../util/modal.js';
import { addSuggestion } from '../store/suggestions.js';
import { t } from '../util/i18n.js';

const FIELDS = [
  { key: 'ausdruck',    labelKey: 'view.suggestEditModal.fieldAusdruck' },
  { key: 'hochdeutsch', labelKey: 'view.suggestEditModal.fieldHochdeutsch' },
  { key: 'beispiel',    labelKey: 'view.suggestEditModal.fieldBeispiel' },
  { key: 'beispiel_hd', labelKey: 'view.suggestEditModal.fieldBeispielHd' },
  { key: 'bedeutung',   labelKey: 'view.suggestEditModal.fieldBedeutung' }
];

/**
 * openSuggestEditModal — Edit-Stift öffnet diesen Dialog.
 * @param {object} dialekt — Dialekt-Objekt (mit id, name, flag).
 * @param {object} ausdruck — Ausdruck-Objekt.
 * @param {() => void} [onSaved] — optionaler Callback nach erfolgreichem Speichern.
 */
export function openSuggestEditModal(dialekt, ausdruck, onSaved) {
  const inputs = {};
  const wrap = el('div', { style: { display: 'grid', gap: '12px' } });

  wrap.appendChild(el('p', { class: 'lede', style: { margin: '0 0 8px', fontSize: '.9rem' } },
    `${dialekt.flag} ${dialekt.name} · `,
    el('code', { style: { background: 'var(--bg-soft)', padding: '2px 6px', borderRadius: '4px' } }, ausdruck.id)
  ));

  FIELDS.forEach(f => {
    const currentValue = ausdruck[f.key] || '';
    const isMulti = f.key === 'bedeutung' || f.key === 'beispiel' || f.key === 'beispiel_hd';
    const input = isMulti
      ? el('textarea', {
          rows: f.key === 'bedeutung' ? 4 : 2,
          style: {
            width: '100%', padding: '10px 12px', borderRadius: 'var(--r-md)',
            border: '1px solid var(--border)', background: 'var(--bg-soft)',
            color: 'var(--text)', fontSize: '.95rem', fontFamily: 'inherit', resize: 'vertical'
          }
        })
      : el('input', {
          type: 'text',
          style: {
            width: '100%', padding: '10px 12px', borderRadius: 'var(--r-md)',
            border: '1px solid var(--border)', background: 'var(--bg-soft)',
            color: 'var(--text)', fontSize: '.95rem'
          }
        });
    input.value = currentValue;
    inputs[f.key] = { input, original: currentValue };

    wrap.appendChild(el('div', {},
      el('label', { style: { display: 'block', fontSize: '.78rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '.04em' } }, t(f.labelKey)),
      input
    ));
  });

  const noteArea = el('textarea', {
    rows: 2,
    placeholder: t('view.suggestEditModal.notePlaceholder'),
    style: {
      width: '100%', padding: '10px 12px', borderRadius: 'var(--r-md)',
      border: '1px solid var(--border)', background: 'var(--bg-soft)',
      color: 'var(--text)', fontSize: '.9rem', fontFamily: 'inherit', resize: 'vertical'
    }
  });
  wrap.appendChild(el('div', {},
    el('label', { style: { display: 'block', fontSize: '.78rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '.04em' } }, t('view.suggestEditModal.noteLabel')),
    noteArea
  ));

  wrap.appendChild(el('p', { class: 'lede', style: { fontSize: '.8rem', margin: '4px 0 0', padding: '8px 12px', background: 'var(--bg-soft)', borderRadius: 'var(--r-sm)', borderLeft: '3px solid var(--brand)' } },
    t('view.suggestEditModal.localInfo')
  ));

  openModal({
    title: t('view.suggestEditModal.title'),
    content: wrap,
    actions: [
      { label: t('view.suggestEditModal.cancel'), variant: 'ghost', onClick: () => {} },
      {
        label: t('view.suggestEditModal.save'),
        variant: 'primary',
        onClick: () => {
          let saved = 0;
          for (const f of FIELDS) {
            const { input, original } = inputs[f.key];
            const proposed = input.value;
            if (proposed === original) continue;
            const ok = addSuggestion({
              dialektId: dialekt.id,
              id: ausdruck.id,
              field: f.key,
              currentValue: original,
              proposedValue: proposed,
              note: noteArea.value
            });
            if (ok) saved++;
          }
          if (saved === 0) {
            toast(t('view.suggestEditModal.noChanges'), 'info', 1800);
            return false;
          }
          toast(saved === 1 ? t('view.suggestEditModal.savedOne') : t('view.suggestEditModal.savedMany', { n: saved }), 'success', 1800);
          if (onSaved) onSaved();
        }
      }
    ]
  });
}
