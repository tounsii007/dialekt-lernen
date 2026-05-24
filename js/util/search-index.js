// Cached fuzzy-Index für Dialekte und Ausdrücke.
// Wird beim ersten Search-Open einmalig gebaut.

import { ALLE_AUSDRUECKE, DIALEKTE } from '../../data/dialekte.js';
import { buildIndex, searchIndex } from './fuzzy.js';

let dialectIdx = null;
let ausdruckIdx = null;

function ensureDialect() {
  if (!dialectIdx) {
    dialectIdx = buildIndex(DIALEKTE, [
      { key: 'name',       weight: 3.0 },
      { key: 'region',     weight: 1.5 },
      { key: 'bundesland', weight: 1.2 }
    ]);
  }
  return dialectIdx;
}

function ensureAusdruck() {
  if (!ausdruckIdx) {
    ausdruckIdx = buildIndex(ALLE_AUSDRUECKE, [
      { key: 'ausdruck',    weight: 3.0 },
      { key: 'hochdeutsch', weight: 2.0 },
      { key: 'bedeutung',   weight: 1.0 },
      { key: 'dialektName', weight: 1.0 }
    ]);
  }
  return ausdruckIdx;
}

export function fuzzyDialekte(query, opts) {
  return searchIndex(ensureDialect(), query, opts).map((r) => r.rec);
}

export function fuzzyAusdruecke(query, opts) {
  return searchIndex(ensureAusdruck(), query, opts).map((r) => r.rec);
}

// Bereits-bewertet zurückgeben, falls die Sortierung Höhepunkte braucht.
export function fuzzyDialekteScored(query, opts) {
  return searchIndex(ensureDialect(), query, opts);
}
export function fuzzyAusdrueckeScored(query, opts) {
  return searchIndex(ensureAusdruck(), query, opts);
}
