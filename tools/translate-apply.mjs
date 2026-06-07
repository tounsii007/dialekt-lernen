#!/usr/bin/env node
// Erklärungs-Übersetzung — übernimmt Workflow-Outputs in die 4 Sprachdateien.
//
// Erwartet die Workflow-Output-JSON: { result: [{ translations: [{ key, en, tr,
// fr, es }] }] } (oder das Array direkt). Pflegt jeden Key in
// data/translations/<lang>.js ein (vor dem schließenden `};`), dedupliziert und
// überspringt bereits vorhandene Keys. Werte werden via JSON.stringify sicher
// kodiert (Umlaute/Quotes/Zeilenumbrüche).
//
// Aufruf: node tools/translate-apply.mjs <workflow-output.json>

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const LANGS = ['en', 'tr', 'fr', 'es'];

const outPath = process.argv[2];
if (!outPath) { console.error('Pfad zur Workflow-Output-JSON fehlt.'); process.exit(1); }

const data = JSON.parse(readFileSync(outPath, 'utf8'));
const batches = Array.isArray(data) ? data : (data.result || []);

// Alle Übersetzungen einsammeln (dedupe nach key)
const seen = new Set();
const rows = [];
for (const b of batches) {
  for (const t of (b && b.translations) || []) {
    if (!t || !t.key || seen.has(t.key)) continue;
    if (!LANGS.every((l) => typeof t[l] === 'string' && t[l].trim())) continue;
    seen.add(t.key);
    rows.push(t);
  }
}
if (!rows.length) { console.log('Keine Übersetzungen einzufügen.'); process.exit(0); }

let totalInserted = 0;
for (const lang of LANGS) {
  const file = join(ROOT, 'data', 'translations', `${lang}.js`);
  let content = readFileSync(file, 'utf8');
  const fresh = rows.filter((r) => !content.includes(`'${r.key}'`) && !content.includes(`"${r.key}"`));
  if (!fresh.length) continue;
  const block = fresh.map((r) => `  ${JSON.stringify(r.key)}: ${JSON.stringify(r[lang])},`).join('\n');
  // vor dem schließenden };  einfügen
  const re = /\n\};\s*$/;
  if (!re.test(content)) { console.error(`Abschluss }; in ${lang}.js nicht gefunden!`); process.exit(1); }
  content = content.replace(re, `\n${block}\n};\n`);
  writeFileSync(file, content, 'utf8');
  totalInserted += fresh.length;
  console.log(`${lang}: +${fresh.length} Übersetzungen`);
}
console.log(`Gesamt eingefügt: ${totalInserted} (über ${LANGS.length} Sprachen, ${rows.length} Keys).`);
