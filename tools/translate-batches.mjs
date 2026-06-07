#!/usr/bin/env node
// Erklärungs-Übersetzung — Batch-Vorbereitung (Aufgabe B).
//
// Schreibt data/translations/_missing.json: die noch NICHT übersetzten Ausdrücke
// als geordnete Liste [{ key, de }]. Reihenfolge = Round-Robin über die Dialekte
// (erst der 1. fehlende Ausdruck jedes Dialekts, dann der 2. …), sodass die
// ersten Batches die wichtigsten/bekanntesten Ausdrücke ALLER Dialekte abdecken
// statt erst einen Dialekt komplett. Die Workflow-Agenten lesen daraus per
// Index-Range. Befüllte Ergebnisse → tools/translate-apply.mjs.
//
// Aufruf: node tools/translate-batches.mjs [--lang=en]   (Coverage-Basis: en)

import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const LANGS = ['en', 'tr', 'fr', 'es'];
const BATCH_SIZE = Number(process.argv.find((a) => a.startsWith('--size='))?.split('=')[1]) || 40;

const { ALLE_AUSDRUECKE } = await import(pathToFileURL(join(ROOT, 'data', 'dialekte.js')).href);

// Bereits vorhandene Keys je Sprache laden
const have = {};
for (const lang of LANGS) {
  try {
    const url = pathToFileURL(join(ROOT, 'data', 'translations', `${lang}.js`)).href + `?t=${Date.now()}`;
    have[lang] = (await import(url)).default || {};
  } catch { have[lang] = {}; }
}

// Ein Ausdruck gilt als "fehlend", wenn er in IRGENDEINER Sprache fehlt.
const missingByDialect = new Map();
for (const a of ALLE_AUSDRUECKE) {
  const key = `${a.dialektId}.${a.id}`;
  const missing = LANGS.some((l) => !have[l][key]);
  if (!missing) continue;
  if (!a.bedeutung || !a.bedeutung.trim()) continue; // nichts zu übersetzen
  if (!missingByDialect.has(a.dialektId)) missingByDialect.set(a.dialektId, []);
  missingByDialect.get(a.dialektId).push({ key, de: a.bedeutung });
}

// Round-Robin zusammenfügen
const buckets = [...missingByDialect.values()];
const ordered = [];
let added = true, idx = 0;
while (added) {
  added = false;
  for (const b of buckets) {
    if (idx < b.length) { ordered.push(b[idx]); added = true; }
  }
  idx++;
}

// In kleine Batch-Dateien aufteilen, damit jeder Agent nur SEINEN Batch liest
// (statt einer riesigen Gesamtdatei → Context-Überlauf).
const dir = join(ROOT, 'data', 'translations', '_batches');
try { rmSync(dir, { recursive: true, force: true }); } catch { /* noop */ }
mkdirSync(dir, { recursive: true });

const numBatches = Math.ceil(ordered.length / BATCH_SIZE);
const pad = String(numBatches).length;
for (let i = 0; i < numBatches; i++) {
  const slice = ordered.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
  const name = `b${String(i).padStart(pad, '0')}.json`;
  writeFileSync(join(dir, name), JSON.stringify(slice, null, 1), 'utf8');
}
console.log(`${ordered.length} fehlende Ausdrücke → ${numBatches} Batches à ${BATCH_SIZE} in ${dir}`);
console.log(`Dialekte mit Lücken: ${buckets.length}`);
console.log(`Batch-Dateien: b${'0'.padStart(pad, '0')}.json … b${String(numBatches - 1).padStart(pad, '0')}.json`);
