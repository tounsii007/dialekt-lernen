// Favoriten · Korrektur-Vorschläge — Übersicht aller eigenen Vorschläge + JSON-Export.

import { el, toast } from '../../util.js';
import { getDialekt } from '../../../data/dialekte.js';
import { getSuggestions, removeSuggestion, exportSuggestionsAsJson } from '../../store/suggestions.js';
import { confirmModal } from '../../util/modal.js';
import { t } from '../../util/i18n.js';

export function renderSuggestionsPanel(rerender) {
  const list = getSuggestions();
  const n = list.length;

  const wrap = el('section', { class: 'section', dataset: { reveal: '' }, style: { marginTop: '24px' } });
  wrap.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, t('view.suggestions-panel.title')),
      el('div', { class: 'lede' }, n === 0
        ? t('view.suggestions-panel.empty')
        : (n === 1 ? t('view.suggestions-panel.ledeOne') : t('view.suggestions-panel.lede', { n })))
    )
  ));

  if (n === 0) return wrap;

  const actions = el('div', { class: 'data-tools-row', style: { marginBottom: '12px' } },
    el('button', {
      class: 'btn btn-primary', dataset: { magnetic: '10' },
      onClick: () => {
        const json = exportSuggestionsAsJson();
        try {
          const blob = new Blob([json], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          const stamp = new Date().toISOString().slice(0, 10);
          a.href = url;
          a.download = `dialekto-suggestions-${stamp}.json`;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
          toast(t('view.suggestions-panel.toastJsonDownloaded'), 'success', 1600);
        } catch {
          toast(t('view.suggestions-panel.toastDownloadFailed'), 'info', 1800);
        }
      }
    }, t('view.suggestions-panel.exportJson')),
    el('button', {
      class: 'btn btn-secondary', dataset: { magnetic: '10' },
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(exportSuggestionsAsJson());
          toast(t('view.suggestions-panel.toastCopied'), 'success', 1600);
        } catch {
          toast(t('view.suggestions-panel.toastClipboardUnavailable'), 'info', 1600);
        }
      }
    }, t('view.suggestions-panel.copyClipboard')),
    el('button', {
      class: 'btn btn-ghost danger-btn',
      onClick: async () => {
        const ok = await confirmModal({
          title: t('view.suggestions-panel.deleteAllTitle'),
          message: t('view.suggestions-panel.deleteAllMessage', { n }),
          confirmLabel: t('view.suggestions-panel.deleteAllConfirm'),
          danger: true
        });
        if (!ok) return;
        list.forEach(s => removeSuggestion(s.suggId));
        toast(t('view.suggestions-panel.toastAllDeleted'), 'success', 1400);
        rerender();
      }
    }, t('view.suggestions-panel.deleteAll'))
  );
  wrap.appendChild(actions);

  const ul = el('div', { style: { display: 'grid', gap: '10px' } });
  list.forEach(s => {
    const d = getDialekt(s.dialektId);
    const a = d?.ausdruecke?.find(x => x.id === s.id);
    const headerText = a
      ? `${d.flag} ${d.name} · „${a.ausdruck}"`
      : `${s.dialektId} · ${s.id}`;
    const fieldLabels = {
      ausdruck: t('view.suggestions-panel.fieldAusdruck'),
      hochdeutsch: t('view.suggestions-panel.fieldHochdeutsch'),
      beispiel: t('view.suggestions-panel.fieldBeispiel'),
      beispiel_hd: t('view.suggestions-panel.fieldBeispielHd'),
      bedeutung: t('view.suggestions-panel.fieldBedeutung')
    };

    const card = el('div', { class: 'card', style: { padding: '12px 16px' } },
      el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' } },
        el('div', { style: { flex: '1' } },
          el('div', { style: { fontWeight: '600', marginBottom: '4px' } }, headerText),
          el('div', { class: 'lede', style: { fontSize: '.78rem' } },
            `${t('view.suggestions-panel.fieldLabel')}: ${fieldLabels[s.field] || s.field} · ${new Date(s.createdAt).toLocaleString('de-DE')}`
          )
        ),
        el('button', {
          class: 'btn btn-ghost',
          style: { padding: '4px 10px', fontSize: '.85rem' },
          title: t('view.suggestions-panel.deleteOneTitle'),
          onClick: () => {
            removeSuggestion(s.suggId);
            toast(t('view.suggestions-panel.toastOneRemoved'), 'info', 1200);
            rerender();
          }
        }, '✕')
      ),
      el('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px', fontSize: '.85rem' } },
        el('div', {},
          el('div', { class: 'lede', style: { fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '2px' } }, t('view.suggestions-panel.current')),
          el('div', { style: { padding: '6px 8px', background: 'var(--bg-soft)', borderRadius: '6px', wordBreak: 'break-word' } }, s.currentValue || '—')
        ),
        el('div', {},
          el('div', { class: 'lede', style: { fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '2px', color: 'var(--brand)' } }, t('view.suggestions-panel.proposal')),
          el('div', { style: { padding: '6px 8px', background: 'color-mix(in oklab, var(--brand) 8%, var(--bg-elev))', borderRadius: '6px', wordBreak: 'break-word', borderLeft: '2px solid var(--brand)' } }, s.proposedValue || '—')
        )
      ),
      s.note ? el('div', { class: 'lede', style: { fontSize: '.8rem', marginTop: '6px', fontStyle: 'italic' } }, `📝 ${s.note}`) : null
    );
    ul.appendChild(card);
  });

  wrap.appendChild(ul);
  return wrap;
}
