// Session-Combo / XP-Multiplikator. Aufeinanderfolgende korrekte Reviews bauen
// eine Combo auf, die den XP-Gewinn multipliziert — wie Duolingos „Combo-Bonus",
// aber an eine Karteikarten-Session angepasst. Ein Fehler (Grade „Again"/„Schwer")
// bricht die Combo. Eine lange Pause (Session „kühlt ab") startet sie neu.
//
// Bewusst NICHT persistiert: Combos sind ein Flow-Mechanismus *innerhalb* einer
// Übungssitzung und sollen einen Reload nicht überleben.

// Combo zerfällt nach 3 Minuten Inaktivität → neue Combo beginnt bei 1.
export const COMBO_TIMEOUT_MS = 3 * 60 * 1000;

// Schwellen (count ≥ at → mult). Absteigend, damit die erste Übereinstimmung greift.
export const COMBO_TIERS = Object.freeze([
  { at: 12, mult: 2.0 },
  { at: 8,  mult: 1.75 },
  { at: 5,  mult: 1.5 },
  { at: 3,  mult: 1.25 },
  { at: 0,  mult: 1.0 },
]);

export function comboMultiplier(count) {
  const n = Math.max(0, Math.floor(Number(count) || 0));
  for (const t of COMBO_TIERS) if (n >= t.at) return t.mult;
  return 1;
}

// XP × Multiplikator, ganzzahlig und robust gegen Müll-Eingaben.
export function applyComboToXp(baseXp, multiplier) {
  const b = Math.max(0, Math.round(Number(baseXp) || 0));
  const m = Number(multiplier);
  return Math.round(b * (Number.isFinite(m) && m > 0 ? m : 1));
}

// ── Session-Zustand (modul-lokal, nicht persistiert) ────────────────────────
let _count = 0;
let _best = 0;
let _lastAt = 0;

function emit(detail) {
  try {
    document.dispatchEvent(new CustomEvent('dialekto:combo', { detail }));
  } catch {}
}

// Registriert ein Review-Ergebnis. `correct=false` bricht die Combo. Liefert
// den neuen Combo-Stand inkl. Multiplikator und ob ein Tier erreicht wurde.
export function registerComboHit(correct, now = Date.now()) {
  if (!correct) {
    const wasActive = _count > 0;
    _count = 0;
    _lastAt = now;
    const detail = { count: 0, multiplier: 1, broken: wasActive, tierUp: false, best: _best };
    emit(detail);
    return detail;
  }

  const prevMult = comboMultiplier(_count);
  if (_lastAt && (now - _lastAt) > COMBO_TIMEOUT_MS) {
    _count = 1; // Session abgekühlt → frische Combo
  } else {
    _count += 1;
  }
  _lastAt = now;
  if (_count > _best) _best = _count;

  const multiplier = comboMultiplier(_count);
  const detail = { count: _count, multiplier, broken: false, tierUp: multiplier > prevMult, best: _best };
  emit(detail);
  return detail;
}

export function getCombo() {
  return { count: _count, best: _best, multiplier: comboMultiplier(_count) };
}

// Setzt die Combo zurück (neue Session / Tests).
export function resetCombo() {
  _count = 0;
  _best = 0;
  _lastAt = 0;
}
