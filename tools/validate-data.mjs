#!/usr/bin/env node
// Validates every dialect dataset against the project schema.
//
// Run:
//   node tools/validate-data.mjs
//
// Exits 0 if every dialect passes, 1 otherwise — wired into CI so a bad
// dataset can never reach main.
//
// What's checked, per dialect:
//   * Required top-level fields (id, name, region, bundesland, flag,
//     farbe, beschreibung, ausdruecke)
//   * `farbe` matches `#rrggbb`
//   * `ausdruecke` is a non-empty array
//   * Each Ausdruck has unique id (within the dialect), non-empty
//     `ausdruck` + `hochdeutsch` + `bedeutung`, a `kategorie` that
//     actually exists in KATEGORIEN
//   * Paired `beispiel` / `beispiel_hd` — if one is set, both must be
//
// What's checked across dialects:
//   * No duplicate `id` across dialects
//   * No duplicate `name` across dialects

import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');

const DIALEKTE_URL = pathToFileURL(resolve(ROOT, 'data/dialekte.js')).href;
const KATEGORIEN_URL = pathToFileURL(resolve(ROOT, 'data/kategorien.js')).href;

const { DIALEKTE } = await import(DIALEKTE_URL);
const { KATEGORIEN } = await import(KATEGORIEN_URL);

const REQUIRED_FIELDS = ['id', 'name', 'region', 'bundesland', 'flag', 'farbe', 'beschreibung', 'ausdruecke'];
const COLOR_RE = /^#[0-9a-fA-F]{6}$/;

const errors = [];
const seenDialektIds = new Map();   // id -> dialekt-name
const seenDialektNames = new Map(); // name -> id

for (const d of DIALEKTE) {
  const ctx = d?.name ?? d?.id ?? '<unknown>';

  for (const field of REQUIRED_FIELDS) {
    if (d[field] === undefined || d[field] === null || d[field] === '') {
      errors.push(`[${ctx}] missing required field: ${field}`);
    }
  }

  if (d.farbe && !COLOR_RE.test(d.farbe)) {
    errors.push(`[${ctx}] farbe "${d.farbe}" is not a valid #rrggbb hex color`);
  }

  if (seenDialektIds.has(d.id)) {
    errors.push(`[${ctx}] duplicate dialekt id "${d.id}" — also used by ${seenDialektIds.get(d.id)}`);
  } else {
    seenDialektIds.set(d.id, ctx);
  }

  if (seenDialektNames.has(d.name)) {
    errors.push(`[${ctx}] duplicate dialekt name "${d.name}" — also used by id ${seenDialektNames.get(d.name)}`);
  } else {
    seenDialektNames.set(d.name, d.id);
  }

  if (!Array.isArray(d.ausdruecke) || d.ausdruecke.length === 0) {
    errors.push(`[${ctx}] ausdruecke must be a non-empty array`);
    continue;
  }

  const seenAusdruckIds = new Set();
  for (const a of d.ausdruecke) {
    const aCtx = `${ctx}:${a?.id ?? '<no-id>'}`;

    if (!a.id) errors.push(`[${aCtx}] missing id`);
    else if (seenAusdruckIds.has(a.id)) errors.push(`[${aCtx}] duplicate id inside dialekt`);
    else seenAusdruckIds.add(a.id);

    if (!a.ausdruck) errors.push(`[${aCtx}] missing ausdruck`);
    if (!a.hochdeutsch) errors.push(`[${aCtx}] missing hochdeutsch`);
    if (!a.bedeutung) errors.push(`[${aCtx}] missing bedeutung`);

    if (!a.kategorie) {
      errors.push(`[${aCtx}] missing kategorie`);
    } else if (!KATEGORIEN[a.kategorie]) {
      errors.push(`[${aCtx}] kategorie "${a.kategorie}" not in KATEGORIEN`);
    }

    const hasBeispiel = Boolean(a.beispiel);
    const hasBeispielHd = Boolean(a.beispiel_hd);
    if (hasBeispiel !== hasBeispielHd) {
      errors.push(`[${aCtx}] beispiel/beispiel_hd must come as a pair (one is set, the other isn't)`);
    }
  }
}

if (errors.length > 0) {
  console.error(`\n❌ Found ${errors.length} validation error(s):\n`);
  for (const e of errors) console.error('  - ' + e);
  console.error('');
  process.exit(1);
}

const totalAusdruecke = DIALEKTE.reduce((sum, d) => sum + d.ausdruecke.length, 0);
console.log(`\n✓ Validated ${DIALEKTE.length} dialekte, ${totalAusdruecke} ausdruecke — all clean\n`);
