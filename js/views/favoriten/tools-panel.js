// Favoriten · Daten & Backup — Export/Import/Reset, CSV-Export (Anki).

import { el, toast } from '../../util.js';
import { t } from '../../util/i18n.js';
import { inlineConfirm } from '../../util/inline-confirm.js';
import { getFavoriten } from '../../store.js';
import { getDialekt, ALLE_AUSDRUECKE } from '../../../data/dialekte.js';
import { sfx } from '../../util/sounds.js';
import { downloadStateFile, importState, resetAllData, exportStateAsString, exportToCsv, downloadCsvFile } from '../../store/transfer.js';

export function renderDataTools() {
  const fileInput = el('input', { type: 'file', accept: 'application/json', style: { display: 'none' } });
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    let text;
    try {
      text = await file.text();
    } catch {
      // Datei nach Auswahl gelöscht / nicht lesbar — Reset, damit dieselbe
      // Datei erneut ausgewählt werden kann (change feuert sonst nicht wieder).
      e.target.value = '';
      toast(t('view.tools-panel.toastReadError'), 'info', 3000);
      return;
    }
    const res = importState(text, { strategy: 'merge' });
    if (res.ok) {
      toast(t('view.tools-panel.toastImported'), 'success', 2200);
      setTimeout(() => window.location.reload(), 1100);
    } else {
      toast(t('view.tools-panel.toastImportFailed', { error: res.error }), 'info', 3000);
    }
  });

  return el('section', { class: 'section data-tools-section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, t('view.tools-panel.title')),
        el('div', { class: 'lede' }, t('view.tools-panel.lede'))
      )
    ),
    el('div', { class: 'data-tools-row' },
      el('button', {
        class: 'btn btn-primary', dataset: { magnetic: '10' },
        onClick: () => { downloadStateFile(); sfx.click(); toast(t('view.tools-panel.toastDownloaded'), 'success', 1600); }
      }, t('view.tools-panel.btnExport')),
      el('button', {
        class: 'btn btn-secondary', dataset: { magnetic: '10' },
        onClick: () => { sfx.click(); fileInput.click(); }
      }, t('view.tools-panel.btnImport')),
      el('button', {
        class: 'btn btn-secondary', dataset: { magnetic: '10' },
        onClick: () => {
          try {
            navigator.clipboard.writeText(exportStateAsString());
            toast(t('view.tools-panel.toastCopied'), 'success', 1600);
            sfx.click();
          } catch {
            toast(t('view.tools-panel.toastClipboardUnavailable'), 'info', 1600);
          }
        }
      }, t('view.tools-panel.btnClipboard')),
      el('button', {
        class: 'btn btn-secondary', dataset: { magnetic: '10' },
        onClick: () => {
          const favs = getFavoriten();
          if (favs.length === 0) {
            toast(t('view.tools-panel.toastNoFavorites'), 'info', 2200);
            return;
          }
          sfx.click();
          const csv = exportToCsv(false, ALLE_AUSDRUECKE, getDialekt);
          downloadCsvFile(csv, `dialekto-favoriten-${new Date().toISOString().slice(0, 10)}.csv`);
          toast(t('view.tools-panel.toastFavoritesCsv', { n: favs.length }), 'success', 1800);
        }
      }, t('view.tools-panel.btnFavoritesCsv')),
      el('button', {
        class: 'btn btn-ghost', dataset: { magnetic: '10' },
        onClick: () => {
          sfx.click();
          const csv = exportToCsv(true, ALLE_AUSDRUECKE, getDialekt);
          downloadCsvFile(csv, `dialekto-alle-${new Date().toISOString().slice(0, 10)}.csv`);
          toast(t('view.tools-panel.toastAllCsv', { n: ALLE_AUSDRUECKE.length }), 'success', 1800);
        }
      }, t('view.tools-panel.btnAllCsv')),
      inlineConfirm({
        label: t('view.tools-panel.btnReset'),
        triggerClass: 'btn btn-ghost danger-btn',
        message: t('view.tools-panel.resetMessage'),
        confirmLabel: t('view.tools-panel.resetConfirm'),
        onConfirm: () => {
          resetAllData({ keepTheme: true });
          toast(t('view.tools-panel.toastReset'), 'info', 1600);
          setTimeout(() => window.location.reload(), 900);
        }
      }),
      fileInput
    )
  );
}
