// Schema-Validator für Dialekt-Daten. Läuft komplett im Browser (kein Build-Step).
// Liefert eine Liste von Issues mit Schweregrad (error / warn / info).

import { DIALEKTE, ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { KATEGORIEN } from '../../data/kategorien.js';

const REQUIRED_DIALECT_FIELDS = ['id', 'name', 'region', 'bundesland', 'flag', 'farbe', 'beschreibung', 'ausdruecke'];
const REQUIRED_EXPR_FIELDS    = ['id', 'ausdruck', 'hochdeutsch', 'bedeutung', 'kategorie'];

function issue(level, area, message, ctx = {}) {
  return { level, area, message, ...ctx };
}

export function validateAll() {
  const issues = [];
  const seenDialectIds = new Set();
  const validCats = new Set(Object.keys(KATEGORIEN));

  for (const d of DIALEKTE) {
    // 1. Dialect required fields
    for (const f of REQUIRED_DIALECT_FIELDS) {
      if (!(f in d) || d[f] == null || d[f] === '') {
        issues.push(issue('error', 'dialect', `Dialekt „${d.id || '?'}" fehlt Feld „${f}".`, { dialektId: d.id }));
      }
    }
    if (seenDialectIds.has(d.id)) {
      issues.push(issue('error', 'dialect', `Doppelte Dialekt-ID: ${d.id}`, { dialektId: d.id }));
    }
    seenDialectIds.add(d.id);

    // 2. Farbe als Hex
    if (d.farbe && !/^#[0-9a-fA-F]{3,8}$/.test(d.farbe)) {
      issues.push(issue('warn', 'dialect', `Farbe „${d.farbe}" sieht nicht wie Hex aus.`, { dialektId: d.id }));
    }

    // 3. Sprecher fehlt? (nur warn)
    if (!d.sprecher) {
      issues.push(issue('info', 'dialect', `Dialekt „${d.name}" hat keine Sprecher-Anzahl.`, { dialektId: d.id }));
    }

    // 4. Ausdrücke
    if (!Array.isArray(d.ausdruecke)) {
      issues.push(issue('error', 'dialect', `Dialekt „${d.id}" hat keine Ausdrücke-Liste.`, { dialektId: d.id }));
      continue;
    }
    if (d.ausdruecke.length < 3) {
      issues.push(issue('warn', 'dialect', `Dialekt „${d.name}" hat weniger als 3 Ausdrücke.`, { dialektId: d.id }));
    }

    const seenExprIds = new Set();
    for (const a of d.ausdruecke) {
      for (const f of REQUIRED_EXPR_FIELDS) {
        if (!(f in a) || a[f] == null || a[f] === '') {
          issues.push(issue('error', 'expr', `Ausdruck „${a.id || '?'}" in ${d.id} fehlt Feld „${f}".`,
            { dialektId: d.id, ausdruckId: a.id }));
        }
      }
      if (seenExprIds.has(a.id)) {
        issues.push(issue('error', 'expr', `Doppelte Ausdruck-ID „${a.id}" in ${d.id}.`,
          { dialektId: d.id, ausdruckId: a.id }));
      }
      seenExprIds.add(a.id);

      if (a.kategorie && !validCats.has(a.kategorie)) {
        issues.push(issue('warn', 'expr', `Unbekannte Kategorie „${a.kategorie}" in ${d.id}/${a.id}.`,
          { dialektId: d.id, ausdruckId: a.id }));
      }
      if (a.beispiel && !a.beispiel_hd) {
        issues.push(issue('info', 'expr', `Beispiel ohne Hochdeutsch-Übersetzung in ${d.id}/${a.id}.`,
          { dialektId: d.id, ausdruckId: a.id }));
      }
      // Tippfehler-Indikatoren
      if (a.ausdruck && /\s{2,}/.test(a.ausdruck)) {
        issues.push(issue('warn', 'expr', `Doppelte Leerzeichen in „${a.ausdruck}".`, { dialektId: d.id, ausdruckId: a.id }));
      }
      if (a.bedeutung && a.bedeutung.length < 15) {
        issues.push(issue('info', 'expr', `Sehr kurze Bedeutung in ${d.id}/${a.id}.`, { dialektId: d.id, ausdruckId: a.id }));
      }
    }
  }

  return issues;
}

export function summary(issues) {
  return {
    errors: issues.filter(i => i.level === 'error').length,
    warnings: issues.filter(i => i.level === 'warn').length,
    info: issues.filter(i => i.level === 'info').length,
    total: issues.length
  };
}

// Convenience: log everything zur Konsole.
export function logValidationReport() {
  const issues = validateAll();
  const sum = summary(issues);
  console.groupCollapsed(`[Dialekto] Validation: ${sum.errors} errors · ${sum.warnings} warnings · ${sum.info} info`);
  for (const it of issues) {
    const fn = it.level === 'error' ? console.error : it.level === 'warn' ? console.warn : console.info;
    fn(`[${it.area}] ${it.message}`, it);
  }
  console.groupEnd();
  return { issues, summary: sum };
}
