// Lern-Memo: kleiner Cache-Helfer für teure, von state.gelernt abgeleitete
// Berechnungen (Empfehlungen, Kategorie-Statistiken). Diese laufen über ALLE
// ~6700 Ausdrücke und wurden bisher bei jedem Render neu — teils mehrfach —
// berechnet. Hier wird das Ergebnis gecacht und nur dann neu berechnet, wenn
// sich der Lernstand geändert haben *kann*.
//
// KORREKTHEIT vor Performance — der Cache darf NIE veraltete Daten liefern.
// Dafür zwei sich ergänzende, store-unabhängige Invalidierungs-Mechanismen
// (die Store-Dateien werden bewusst NICHT angefasst):
//
//   1. Event-getrieben (`bump()`): Jede Karten-Bewertung läuft über awardXp()
//      und feuert zuverlässig `dialekto:xp`. `dialekto:route` deckt zusätzlich
//      den Backend-Merge (syncLernstandFromBackend → dialekto:route) und jeden
//      View-Wechsel ab; `dialekto:streak` ist defensiv. Lieber über- als
//      unter-invalidieren.
//
//   2. Pro-Tick-Verfall (Backstop): Selbst wenn eine Mutation gar kein Event
//      feuert (z. B. das In-Place-Zurücksetzen eines Lernstands in
//      views/partials.js, oder ein direkter state.gelernt-Schreibzugriff),
//      lebt ein Cache-Eintrag nur bis zum Ende des aktuellen synchronen
//      Render-Ticks. Eine Bewertung/ein Reset wird stets aus einem DOM-
//      Event-Handler ausgelöst, der in einem *eigenen* Task läuft — danach ist
//      der Cache längst verfallen, der nächste Render rechnet frisch. Innerhalb
//      EINES Renders (z. B. mehrere getRecommendations-Aufrufe der Home-View)
//      greift dagegen der Cache und spart die O(6700)-Wiederholung.
//
// Netto: Wiederholte Aufrufe im selben Tick sind O(1); über Nutzeraktionen
// hinweg ist das Ergebnis garantiert frisch.

// Monoton steigende Epoche. Jeder Bump entwertet alle Memos.
let epoch = 0;

// Ob für den aktuellen Tick bereits ein Auto-Verfall geplant ist.
let tickScheduled = false;

/** Aktuelle Cache-Epoche (für Memos und Tests). */
export function getEpoch() {
  return epoch;
}

/** Entwertet sofort alle Memos (manuell oder via Event). */
export function bump() {
  epoch++;
}

// Plant genau einen Bump für das Ende des aktuellen Ticks. Microtask zuerst
// (greift auch ohne Makro-Task-Quelle, z. B. in Tests), Timer als Fallback für
// Umgebungen ohne queueMicrotask. Mehrfach-Planung im selben Tick wird via
// `tickScheduled` zusammengefasst.
function scheduleTickExpiry() {
  if (tickScheduled) return;
  tickScheduled = true;
  const fire = () => { tickScheduled = false; bump(); };
  let queued = false;
  try {
    if (typeof queueMicrotask === 'function') { queueMicrotask(fire); queued = true; }
  } catch { /* ignore */ }
  if (!queued) {
    try {
      if (typeof setTimeout === 'function') { setTimeout(fire, 0); queued = true; }
    } catch { /* ignore */ }
  }
  // Konnte gar nichts geplant werden, gilt der Eintrag nur für den unmittelbar
  // folgenden Aufruf nicht weiter — wir entwerten konservativ sofort wieder.
  if (!queued) { tickScheduled = false; epoch++; }
}

/**
 * Hängt einen Funktionsaufruf an die aktuelle Epoche. Solange sich die Epoche
 * nicht ändert, wird das gemerkte Ergebnis zurückgegeben; sonst neu berechnet.
 * Der Cache verfällt zusätzlich automatisch am Tick-Ende (siehe Modul-Doku).
 *
 * @template T
 * @param {() => T} compute — reine, von state.gelernt abhängige Berechnung.
 * @returns {() => T} memoisierte Variante mit identischer Signatur (arg-los).
 */
export function memoizePerEpoch(compute) {
  let cachedEpoch = -1;
  let cachedValue;
  return function memoized() {
    if (cachedEpoch !== epoch) {
      cachedValue = compute();
      cachedEpoch = epoch;
      scheduleTickExpiry();
    }
    return cachedValue;
  };
}

// Event-Anbindung: bei jeder Lernstand-/Fortschritts-Änderung die Epoche bumpen.
// Wichtig: die Ziele unterscheiden sich!
//   · `dialekto:xp`     → document  (awardXp; feuert bei JEDER Bewertung)
//   · `dialekto:streak` → document  (defensiv: Streak-Reparatur etc.)
//   · `dialekto:route`  → window    (go()-Navigation + Backend-Merge in app.js)
// `document`/`window` fehlen in manchen Test-/SSR-Kontexten → defensiv prüfen.
function listen(target, type) {
  try {
    if (target && typeof target.addEventListener === 'function') {
      target.addEventListener(type, bump);
    }
  } catch { /* ignore */ }
}
if (typeof document !== 'undefined') {
  listen(document, 'dialekto:xp');
  listen(document, 'dialekto:streak');
}
if (typeof window !== 'undefined') {
  listen(window, 'dialekto:route');
}
