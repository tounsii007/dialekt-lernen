// Favoriten · Korrektur-Vorschläge — Übersicht aller eigenen Vorschläge + JSON-Export.

import { el, toast } from '../../util.js';
import { getDialekt } from '../../../data/dialekte.js';
import { getSuggestions, removeSuggestion, exportSuggestionsAsJson } from '../../store/suggestions.js';
import { confirmModal } from '../../util/modal.js';

export function renderSuggestionsPanel(rerender) {
  const list = getSuggestions();
  const n = list.length;

  const wrap = el('section', { class: 'section', dataset: { reveal: '' }, style: { marginTop: '24px' } });
  wrap.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, '✎ Deine Korrektur-Vorschläge'),
      el('div', { class: 'lede' }, n === 0
        ? 'Du hast noch keine Vorschläge gespeichert. Klicke an einer Karte auf das ✎-Symbol, um eine Korrektur vorzuschlagen.'
        : `${n} lokal gespeicherte${n === 1 ? 'r Vorschlag' : ' Vorschläge'} — bereit zum Exportieren.`)
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
          toast('JSON heruntergeladen ✓', 'success', 1600);
        } catch {
          toast('Download fehlgeschlagen', 'info', 1800);
        }
      }
    }, '📥 Als JSON exportieren'),
    el('button', {
      class: 'btn btn-secondary', dataset: { magnetic: '10' },
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(exportSuggestionsAsJson());
          toast('In Zwischenablage kopiert 📋', 'success', 1600);
        } catch {
          toast('Zwischenablage nicht verfügbar', 'info', 1600);
        }
      }
    }, '📋 In Zwischenablage'),
    el('button', {
      class: 'btn btn-ghost danger-btn',
      onClick: async () => {
        const ok = await confirmModal({
          title: 'Alle Vorschläge löschen?',
          message: `${n} lokale Vorschläge wirklich entfernen?`,
          confirmLabel: 'Alle löschen',
          danger: true
        });
        if (!ok) return;
        list.forEach(s => removeSuggestion(s.suggId));
        toast('Alle Vorschläge gelöscht', 'success', 1400);
        rerender();
      }
    }, '🗑️ Alle löschen')
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
      ausdruck: 'Ausdruck',
      hochdeutsch: 'Hochdeutsch',
      beispiel: 'Beispiel',
      beispiel_hd: 'Beispiel (Hochdeutsch)',
      bedeutung: 'Bedeutung'
    };

    const card = el('div', { class: 'card', style: { padding: '12px 16px' } },
      el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' } },
        el('div', { style: { flex: '1' } },
          el('div', { style: { fontWeight: '600', marginBottom: '4px' } }, headerText),
          el('div', { class: 'lede', style: { fontSize: '.78rem' } },
            `Feld: ${fieldLabels[s.field] || s.field} · ${new Date(s.createdAt).toLocaleString('de-DE')}`
          )
        ),
        el('button', {
          class: 'btn btn-ghost',
          style: { padding: '4px 10px', fontSize: '.85rem' },
          title: 'Vorschlag löschen',
          onClick: () => {
            removeSuggestion(s.suggId);
            toast('Vorschlag entfernt', 'info', 1200);
            rerender();
          }
        }, '✕')
      ),
      el('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px', fontSize: '.85rem' } },
        el('div', {},
          el('div', { class: 'lede', style: { fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '2px' } }, 'Aktuell'),
          el('div', { style: { padding: '6px 8px', background: 'var(--bg-soft)', borderRadius: '6px', wordBreak: 'break-word' } }, s.currentValue || '—')
        ),
        el('div', {},
          el('div', { class: 'lede', style: { fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '2px', color: 'var(--brand)' } }, 'Vorschlag'),
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
