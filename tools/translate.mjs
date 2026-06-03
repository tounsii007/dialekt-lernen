#!/usr/bin/env node
// Erklärungs-Übersetzungs-Pipeline.
//
// Übersetzt NICHT automatisch (Dialekto ist backend-los, keine Live-API).
// Stattdessen: zeigt die Abdeckung pro Sprache und exportiert die noch
// fehlenden Keys MIT deutscher Original-bedeutung als JSON — diese Datei kann
// extern (eigenes Übersetzungstool / Modell) befüllt und dann nach
// data/translations/<lang>.js übernommen werden.
//
// Aufruf:
//   node tools/translate.mjs                 # Abdeckung aller Sprachen
//   node tools/translate.mjs --lang=en       # nur Englisch
//   node tools/translate.mjs --write-missing # data/translations/<lang>.missing.json schreiben

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const LANGS = ['en', 'tr', 'fr', 'es'];

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith('--lang='))?.split('=')[1];
const writeMissing = args.includes('--write-missing');
const langs = only ? [only] : LANGS;

const { ALLE_AUSDRUECKE } = await import(pathToFileURL(join(ROOT, 'data', 'dialekte.js')).href);
const allKeys = ALLE_AUSDRUECKE.map((a) => `${a.dialektId}.${a.id}`);
const bedeutungByKey = Object.fromEntries(
  ALLE_AUSDRUECKE.map((a) => [`${a.dialektId}.${a.id}`, a.bedeutung]),
);

console.log(`Ausdrücke gesamt: ${allKeys.length}\n`);

for (const lang of langs) {
  let map = {};
  try {
    const url = pathToFileURL(join(ROOT, 'data', 'translations', `${lang}.js`)).href + `?t=${Date.now()}`;
    map = (await import(url)).default || {};
  } catch {
    console.log(`${lang}: (keine data/translations/${lang}.js)`);
  }
  const done = allKeys.filter((k) => map[k] && String(map[k]).trim()).length;
  const missing = allKeys.filter((k) => !map[k]);
  const pct = Math.round((done / allKeys.length) * 100);
  console.log(`${lang}: ${done}/${allKeys.length} (${pct}%) übersetzt · ${missing.length} fehlen`);

  const orphan = Object.keys(map).filter((k) => !bedeutungByKey[k]);
  if (orphan.length) {
    console.log(`  ⚠ ${orphan.length} Key(s) ohne zugehörigen Ausdruck: ${orphan.slice(0, 5).join(', ')}${orphan.length > 5 ? ' …' : ''}`);
  }

  if (writeMissing) {
    const out = {};
    for (const k of missing) out[k] = bedeutungByKey[k];
    const p = join(ROOT, 'data', 'translations', `${lang}.missing.json`);
    writeFileSync(p, JSON.stringify(out, null, 2), 'utf8');
    console.log(`  → ${missing.length} fehlende Keys (mit DE-bedeutung) geschrieben: data/translations/${lang}.missing.json`);
  }
}

console.log('\nFertig. Mit --write-missing eine Befüll-Vorlage je Sprache erzeugen.');
