#!/usr/bin/env node
// i18n-Verify: die *harte* Lokalisierungs-Prüfung (Gegenstück zum heuristischen
// i18n-scan). Sammelt alle im Code per t('…')/data-i18n="…" GENUTZTEN Keys und
// vergleicht sie mit den in js/util/i18n.js DEFINIERTEN Keys der 5 Sprachen.
//
// Meldet:
//   • MISSING  — Key wird genutzt, fehlt aber in der de-Basistabelle
//                → die UI zeigt den rohen Key-String statt Text (echter Bug).
//   • UNTRANSLATED — Key ist in de, fehlt aber in en/tr/fr/es
//                → Fallback auf Deutsch (kein Bug, aber nicht lokalisiert).
//
// Exit-Code 1, wenn MISSING-Keys existieren (CI-tauglich).
//
// Aufruf:
//   node tools/i18n-verify.mjs            # Zusammenfassung
//   node tools/i18n-verify.mjs --list     # zusätzlich jeden Key + Fundstelle

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const JS_DIR = join(ROOT, 'js');
const I18N = join(ROOT, 'js', 'util', 'i18n.js');
const LANGS = ['de', 'en', 'tr', 'fr', 'es'];
const showList = process.argv.includes('--list');

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const f = join(dir, n);
    if (statSync(f).isDirectory()) walk(f, out);
    else if (n.endsWith('.js')) out.push(f);
  }
  return out;
}

// --- 1) Definierte Keys je Sprache aus i18n.js extrahieren -------------------
// Struktur:  const STRINGS = { de: { 'key': "…", … }, en: { … }, … };
// Wir isolieren je Sprachblock und ziehen die Keys per Regex.
const i18nSrc = readFileSync(I18N, 'utf8');
const defined = {};
for (const lang of LANGS) {
  // Block ab "\n  <lang>: {" bis zum schließenden "\n  }," auf gleicher Ebene.
  const start = i18nSrc.search(new RegExp(`\\n  ${lang}: \\{\\n`));
  if (start === -1) { console.error(`Sprachblock ${lang} nicht gefunden.`); process.exit(2); }
  // ab start die Klammer-Tiefe verfolgen — STRING-AWARE, damit {n}/{date}
  // in den Werten die Tiefe nicht verfaelschen (sonst endet der Block zu frueh).
  let i = i18nSrc.indexOf('{', start);
  let depth = 0, end = i;
  for (; i < i18nSrc.length; i++) {
    const c = i18nSrc[i];
    if (c === '"' || c === "'") {
      const q = c; i++;
      while (i < i18nSrc.length && i18nSrc[i] !== q) { if (i18nSrc[i] === '\\') i++; i++; }
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  const block = i18nSrc.slice(start, end);
  const keys = new Set();
  // Keys sind 'key': bzw. "key": — auch mehrere pro Zeile (kompakte Alt-Keys).
  // Werte matchen nicht, da nach einem Wert-String ',' / '}' folgt, kein ':'.
  const re = /(['"])((?:\\.|(?!\1).)*)\1\s*:/g;
  let m;
  while ((m = re.exec(block))) keys.add(m[2]);
  defined[lang] = keys;
}

// --- 2) Genutzte Keys aus dem Code sammeln -----------------------------------
// t('key') / t("key") / t(`key`)  sowie  data-i18n[-aria|-title|-ph]="key"
const used = new Map(); // key -> [ "rel:line", … ]
const reUse = [
  /\bt\(\s*(['"`])((?:\\.|(?!\1).)*)\1/g,
  /data-i18n(?:-aria|-title|-ph)?\s*=\s*(['"])((?:\\.|(?!\1).)*)\1/g,
  /['"]data-i18n(?:-aria|-title|-ph)?['"]\s*:\s*(['"])((?:\\.|(?!\1).)*)\1/g,
];
for (const file of walk(JS_DIR)) {
  if (file === I18N) continue;
  const rel = relative(ROOT, file).replace(/\\/g, '/');
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const re of reUse) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(line))) {
        const key = m[2];
        // nur statische Keys (keine Interpolation/Variablen)
        if (!key || key.includes('${') || /[`]/.test(key)) continue;
        if (key.endsWith('.')) continue;              // dynamisch: t('country.' + id)
        if (!/^[a-zA-Z][\w.-]*$/.test(key)) continue; // sieht nach Key aus
        if (!used.has(key)) used.set(key, []);
        used.get(key).push(`${rel}:${i + 1}`);
      }
    }
  });
}

// --- 3) Vergleich ------------------------------------------------------------
const missing = [];      // genutzt, nicht in de
const untranslated = {}; // lang -> [keys in de, fehlen in lang]
for (const l of LANGS) if (l !== 'de') untranslated[l] = [];

for (const [key, where] of used) {
  if (!defined.de.has(key)) { missing.push({ key, where }); continue; }
  for (const l of LANGS) {
    if (l === 'de') continue;
    if (!defined[l].has(key)) untranslated[l].push(key);
  }
}
missing.sort((a, b) => a.key.localeCompare(b.key));

// --- 4) Ausgabe --------------------------------------------------------------
console.log('=== i18n-Verify: genutzte vs. definierte Keys ===\n');
console.log(`Genutzte Keys: ${used.size}`);
for (const l of LANGS) console.log(`  definiert ${l}: ${defined[l].size}`);
console.log('');

console.log(`MISSING (genutzt, fehlt in de) — ${missing.length}:`);
for (const { key, where } of missing) {
  console.log(`  ✗ ${key}`);
  if (showList) console.log(`        ${where.slice(0, 4).join(', ')}${where.length > 4 ? ' …' : ''}`);
}

console.log('');
let untransTotal = 0;
for (const l of LANGS) {
  if (l === 'de') continue;
  const n = untranslated[l].length;
  untransTotal += n;
  console.log(`UNTRANSLATED ${l} (in de, fehlt in ${l}): ${n}`);
  if (showList && n) for (const k of untranslated[l].slice(0, 50)) console.log(`        ${k}`);
}

console.log(`\nGesamt: ${missing.length} fehlende Keys, ${untransTotal} fehlende Übersetzungen.`);
process.exit(missing.length ? 1 : 0);
