// Statistik-PDF-Export via window.print() — bewusst ohne externe Library,
// damit unsere CSP keine inline-scripts/eval erlaubt brauchen muss.
//
// Strategie:
//   1. Body bekommt eine temporäre Klasse `.print-stats-mode`, die im Print-CSS
//      alles ausblendet außer der `.stats-view`.
//   2. `window.print()` wird aufgerufen; nach dem Druckdialog (bzw. nach
//      afterprint) räumen wir die Klasse wieder auf.
//   3. Beim Drucken wirkt unser bestehendes `@media print` plus das neue
//      Stats-spezifische Stylesheet am Ende von styles.css.

const PRINT_BODY_CLASS = 'print-stats-mode';

/**
 * Triggert den Druck-/PDF-Dialog für die Statistiken-View.
 * Funktioniert in allen modernen Browsern; Nutzer wählt im Dialog
 * „Als PDF speichern" oder einen physischen Drucker.
 *
 * @param {object} [opts]
 * @param {() => void} [opts.onDone] — Callback nach Cleanup.
 */
export function printStatistiken(opts = {}) {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;
  const body = document.body;
  if (!body) return;

  // Klasse setzen, damit Print-CSS greift
  body.classList.add(PRINT_BODY_CLASS);

  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    body.classList.remove(PRINT_BODY_CLASS);
    window.removeEventListener('afterprint', cleanup);
    if (opts.onDone) {
      try { opts.onDone(); } catch {}
    }
  };

  window.addEventListener('afterprint', cleanup, { once: true });
  // Fallback: nach 60s aufräumen, falls afterprint nicht feuert (Safari quirks)
  setTimeout(cleanup, 60000);

  // Etwas verzögern, damit der Browser die neue Klasse layout-mäßig anwendet,
  // bevor er den Print-Snapshot erstellt.
  setTimeout(() => {
    try {
      window.print();
    } catch {
      cleanup();
    }
  }, 50);
}

/**
 * Erkennt, ob Drucken überhaupt verfügbar ist (in jsdom z.B. nicht).
 */
export function canPrint() {
  return typeof window !== 'undefined' && typeof window.print === 'function';
}
