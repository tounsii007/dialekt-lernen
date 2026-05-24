// Aggregiert äquivalente Ausdrücke quer über alle Dialekte.
// Strategie: gruppiere nach normalisierter Hochdeutsch-Übersetzung
// (mit Token-Overlap als Fallback für leichte Varianten).

import { ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { normalize } from './text.js';

function tokenSet(s) {
  return new Set(normalize(s).split(/\s+/).filter((w) => w.length >= 3));
}

function similarity(a, b) {
  if (a === b) return 1;
  const A = tokenSet(a);
  const B = tokenSet(b);
  if (!A.size || !B.size) return 0;
  let hits = 0;
  for (const t of A) if (B.has(t)) hits++;
  return hits / Math.max(A.size, B.size);
}

// Gruppiert Ausdrücke nach ähnlicher Hochdeutsch-Übersetzung.
// minSize: nur Gruppen mit mindestens N Dialekten zurückgeben (default 2).
export function buildComparison({ minSize = 2 } = {}) {
  const groups = [];

  for (const a of ALLE_AUSDRUECKE) {
    const head = a.hochdeutsch.split(/[\/,–\-]+/)[0].trim();
    if (!head) continue;

    // Suche bestehende Gruppe via Token-Overlap
    let target = null;
    for (const g of groups) {
      if (similarity(head, g.headRaw) >= 0.6) { target = g; break; }
    }
    if (!target) {
      target = {
        headRaw: head,
        head,
        kategorie: a.kategorie,
        items: []
      };
      groups.push(target);
    }
    // Nur ein Ausdruck pro Dialekt pro Gruppe
    if (!target.items.some((x) => x.dialektId === a.dialektId)) {
      target.items.push(a);
    }
  }

  // Filtere + sortiere: mehr Dialekte = wichtiger
  return groups
    .filter((g) => g.items.length >= minSize)
    .sort((a, b) => b.items.length - a.items.length);
}

// Filter nach Kategorie.
export function filterByKategorie(groups, kategorie) {
  if (!kategorie || kategorie === 'all') return groups;
  return groups.filter((g) => g.kategorie === kategorie);
}
