// Favoriten · Daten & Backup — Export/Import/Reset, CSV-Export (Anki).

import { el, toast } from '../../util.js';
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
      toast('Datei konnte nicht gelesen werden.', 'info', 3000);
      return;
    }
    const res = importState(text, { strategy: 'merge' });
    if (res.ok) {
      toast('Daten importiert & gemerged ✓ — Seite wird neu geladen', 'success', 2200);
      setTimeout(() => window.location.reload(), 1100);
    } else {
      toast('Import fehlgeschlagen: ' + res.error, 'info', 3000);
    }
  });

  return el('section', { class: 'section data-tools-section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, 'Daten & Backup'),
        el('div', { class: 'lede' }, 'Sichere deinen Fortschritt oder übertrage ihn auf ein anderes Gerät.')
      )
    ),
    el('div', { class: 'data-tools-row' },
      el('button', {
        class: 'btn btn-primary', dataset: { magnetic: '10' },
        onClick: () => { downloadStateFile(); sfx.click(); toast('Backup-Datei heruntergeladen 💾', 'success', 1600); }
      }, '📥 Exportieren'),
      el('button', {
        class: 'btn btn-secondary', dataset: { magnetic: '10' },
        onClick: () => { sfx.click(); fileInput.click(); }
      }, '📤 Importieren'),
      el('button', {
        class: 'btn btn-secondary', dataset: { magnetic: '10' },
        onClick: () => {
          try {
            navigator.clipboard.writeText(exportStateAsString());
            toast('Backup in die Zwischenablage kopiert 📋', 'success', 1600);
            sfx.click();
          } catch {
            toast('Zwischenablage nicht verfügbar', 'info', 1600);
          }
        }
      }, '📋 In Zwischenablage'),
      el('button', {
        class: 'btn btn-secondary', dataset: { magnetic: '10' },
        onClick: () => {
          const favs = getFavoriten();
          if (favs.length === 0) {
            toast('Noch keine Favoriten — markiere zuerst Ausdrücke mit ♡', 'info', 2200);
            return;
          }
          sfx.click();
          const csv = exportToCsv(false, ALLE_AUSDRUECKE, getDialekt);
          downloadCsvFile(csv, `dialekto-favoriten-${new Date().toISOString().slice(0, 10)}.csv`);
          toast(`${favs.length} Favoriten als CSV exportiert 📊`, 'success', 1800);
        }
      }, '📊 Favoriten als CSV'),
      el('button', {
        class: 'btn btn-ghost', dataset: { magnetic: '10' },
        onClick: () => {
          sfx.click();
          const csv = exportToCsv(true, ALLE_AUSDRUECKE, getDialekt);
          downloadCsvFile(csv, `dialekto-alle-${new Date().toISOString().slice(0, 10)}.csv`);
          toast(`${ALLE_AUSDRUECKE.length} Ausdrücke als CSV exportiert 📚`, 'success', 1800);
        }
      }, '📚 Alle als CSV (Anki)'),
      inlineConfirm({
        label: '🗑️ Zurücksetzen',
        triggerClass: 'btn btn-ghost danger-btn',
        message: 'Alle Daten wirklich zurücksetzen? (Theme bleibt erhalten.)',
        confirmLabel: 'Ja, zurücksetzen',
        onConfirm: () => {
          resetAllData({ keepTheme: true });
          toast('Daten zurückgesetzt — Seite wird neu geladen', 'info', 1600);
          setTimeout(() => window.location.reload(), 900);
        }
      }),
      fileInput
    )
  );
}
