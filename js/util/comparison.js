// Aggregiert äquivalente Ausdrücke quer über alle Dialekte.
// Strategie: gruppiere nach normalisierter Hochdeutsch-Übersetzung
// (mit Token-Overlap als Fallback für leichte Varianten).

import { ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { normalize } from './text.js';

function tokenSet(s) {
  return new Set(normalize(s).split(/\s+/).filter((w) => w.length >= 3));
}

// Jaccard-artige Ähnlichkeit über bereits berechnete Token-Sets.
function overlap(A, B) {
  if (!A.size || !B.size) return 0;
  // über das kleinere Set iterieren
  const [small, big] = A.size <= B.size ? [A, B] : [B, A];
  let hits = 0;
  for (const t of small) if (big.has(t)) hits++;
  return hits / Math.max(A.size, B.size);
}

// Gruppiert Ausdrücke nach ähnlicher Hochdeutsch-Übersetzung.
// minSize: nur Gruppen mit mindestens N Dialekten zurückgeben (default 2).
//
// Performance: statt jeden Kopf linear gegen ALLE Gruppen zu vergleichen
// (O(n²) + ständige Token-Set-Neuberechnung), nutzen wir
//   1. eine Exact-Map (normalisierter Kopf → Gruppe) für identische Köpfe,
//   2. einen invertierten Token-Index (Token → Gruppen), sodass nur Gruppen
//      verglichen werden, die mindestens ein Token teilen. Da ein Overlap
//      ≥ 0.6 zwingend ≥ 1 gemeinsames Token bedeutet, ist das verlustfrei.
//   3. pro Gruppe einmalig gecachte Token-Sets (headTokens).
export function buildComparison({ minSize = 2 } = {}) {
  const groups = [];
  const exact = new Map();      // normalisierter Kopf → Gruppe
  const tokenIndex = new Map(); // Token → Set<Gruppe>

  for (const a of ALLE_AUSDRUECKE) {
    const head = a.hochdeutsch.split(/[\/,–\-]+/)[0].trim();
    if (!head) continue;
    const norm = normalize(head);

    let target = exact.get(norm) || null;

    if (!target) {
      const tokens = tokenSet(head);
      // Kandidaten: nur Gruppen, die mindestens ein Token teilen.
      const candidates = new Set();
      for (const t of tokens) {
        const gs = tokenIndex.get(t);
        if (gs) for (const g of gs) candidates.add(g);
      }
      for (const g of candidates) {
        if (overlap(tokens, g.headTokens) >= 0.6) { target = g; break; }
      }
      if (!target) {
        target = { headRaw: head, head, kategorie: a.kategorie, items: [], headTokens: tokens };
        groups.push(target);
        exact.set(norm, target);
        for (const t of tokens) {
          let gs = tokenIndex.get(t);
          if (!gs) { gs = new Set(); tokenIndex.set(t, gs); }
          gs.add(target);
        }
      }
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
