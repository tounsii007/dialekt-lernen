#!/usr/bin/env node
// Bundle-Analyse: zeigt Modul-Größen und identifiziert Optimierungs-Kandidaten.
//
// Output:
//   * Top-N größte Module (potential lazy-load Kandidaten)
//   * Gesamt-Bytes pro Verzeichnis
//   * Asset-Größen (CSS, HTML, Manifest, SW)
//   * Dialect-Daten-Größen
//   * Lazy-Load-Audit: welche Views sind dynamic-imported?
//
// Exit-Code: 0 (nur informativ)

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, basename } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

function walk(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.') || name === 'node_modules' || name === 'tests' || name === 'tools') continue;
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, exts, out);
    else if (exts.some((e) => name.endsWith(e))) out.push({ path: full, size: stat.size });
  }
  return out;
}

function humanSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

console.log('=== BUNDLE ANALYSE ===\n');

// 1. Top Assets
const rootAssets = ['index.html', 'styles.css', 'manifest.webmanifest', 'sw.js']
  .map((f) => ({ path: join(ROOT, f), size: statSync(join(ROOT, f)).size }));

console.log('Asset-Größen (Root):');
for (const a of rootAssets) {
  console.log(`  ${basename(a.path).padEnd(25)} ${humanSize(a.size).padStart(12)}`);
}
console.log(`  TOTAL Root: ${humanSize(rootAssets.reduce((s, a) => s + a.size, 0))}\n`);

// 2. JS-Module nach Kategorie
const jsFiles = walk(join(ROOT, 'js'), ['.js']);
const byCategory = {};
for (const f of jsFiles) {
  const rel = relative(ROOT, f.path).replace(/\\/g, '/');
  const parts = rel.split('/');
  const cat = parts.length > 2 ? `${parts[0]}/${parts[1]}` : parts[0];
  byCategory[cat] = byCategory[cat] || { count: 0, size: 0 };
  byCategory[cat].count++;
  byCategory[cat].size += f.size;
}

console.log('JS-Bytes nach Kategorie:');
const catSorted = Object.entries(byCategory).sort((a, b) => b[1].size - a[1].size);
for (const [cat, info] of catSorted) {
  console.log(`  ${cat.padEnd(20)} ${humanSize(info.size).padStart(12)}  (${info.count} Module)`);
}
console.log(`  TOTAL JS:           ${humanSize(jsFiles.reduce((s, f) => s + f.size, 0))}\n`);

// 3. Top 15 größte JS-Module
console.log('Top 15 größte JS-Module:');
const topModules = jsFiles.slice().sort((a, b) => b.size - a.size).slice(0, 15);
for (const m of topModules) {
  const rel = relative(ROOT, m.path).replace(/\\/g, '/');
  console.log(`  ${humanSize(m.size).padStart(10)}  ${rel}`);
}

// 4. Dialekt-Daten
const dataFiles = walk(join(ROOT, 'data'), ['.js']);
const dataSize = dataFiles.reduce((s, f) => s + f.size, 0);
console.log(`\nDialekt-Daten: ${humanSize(dataSize)} in ${dataFiles.length} Dateien`);

// 5. Lazy-Load-Audit: welche Views sind dynamic-imported?
const routerCode = readFileSync(join(ROOT, 'js', 'router.js'), 'utf8');
const lazyMatches = [...routerCode.matchAll(/import\(['"]([^'"]+)['"]\)/g)].map((m) => m[1]);
console.log(`\nLazy-loaded Views (dynamic import): ${lazyMatches.length}`);
for (const m of lazyMatches) console.log(`  · ${m}`);

// 6. Gesamtgröße der App (allein durch reine JS-/CSS-/HTML-Dateien)
const totalSize =
  rootAssets.reduce((s, a) => s + a.size, 0) +
  jsFiles.reduce((s, f) => s + f.size, 0) +
  dataSize;
console.log(`\n=== TOTAL APP SIZE ===`);
console.log(`  ${humanSize(totalSize)} (unminified, kein Bundling)`);
console.log(`  Davon Code:  ${humanSize(jsFiles.reduce((s, f) => s + f.size, 0))}`);
console.log(`  Davon Daten: ${humanSize(dataSize)}`);
console.log(`  Davon HTML/CSS/Manifest/SW: ${humanSize(rootAssets.reduce((s, a) => s + a.size, 0))}`);

// 7. Empfehlungen
console.log('\n=== EMPFEHLUNGEN ===');
const recs = [];

const styles = rootAssets.find((a) => basename(a.path) === 'styles.css');
if (styles && styles.size > 200 * 1024) {
  recs.push(`styles.css ist ${humanSize(styles.size)} — Minifizieren würde ~30% sparen`);
}

const ungroupedViews = topModules.filter((m) =>
  /views\//.test(relative(ROOT, m.path)) && m.size > 20 * 1024
);
if (ungroupedViews.length > 0) {
  recs.push(`${ungroupedViews.length} große Views (>20KB) — Code-Split-Kandidaten`);
}

const largestData = dataFiles.sort((a, b) => b.size - a.size).slice(0, 3);
console.log(`  Top-3 Dialekt-Dateien:`);
for (const d of largestData) {
  console.log(`    ${humanSize(d.size).padStart(10)}  ${basename(d.path)}`);
}

if (lazyMatches.length === 0) {
  console.log('  Alle Views werden eager geladen — kein Lazy-Loading (bewusst) ✓');
} else {
  console.log(`  Lazy-Loading ist aktiv für ${lazyMatches.length} Views`);
}

if (recs.length > 0) {
  console.log(`\n  Verbesserungs-Vorschläge:`);
  for (const r of recs) console.log(`    · ${r}`);
} else {
  console.log(`\n  Keine konkreten Verbesserungs-Vorschläge — App ist gut strukturiert.`);
}

process.exit(0);
