#!/usr/bin/env node
// Spiegelt js/version.js → sw.js und aktualisiert die Precache-Liste.
//
// Was passiert:
//   1) APP_VERSION aus js/version.js lesen.
//   2) sw.js: BEGIN/END VERSION-Block ersetzen → const APP_VERSION = '<v>';
//   3) sw.js: BEGIN/END PRECACHE-Block ersetzen → vollständige Asset-Liste,
//      gescannt aus dem Projekt-Verzeichnis.
//   4) js/version.js: DIALEKT_COUNT und AUSDRUCK_COUNT aktualisieren.
//
// Aufruf:
//   node tools/sync-version.mjs

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, relative, sep } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// --- 1) APP_VERSION lesen ---
const versionPath = join(ROOT, 'js', 'version.js');
const versionSrc = readFileSync(versionPath, 'utf8');
const versionMatch = versionSrc.match(/export const APP_VERSION = '([^']+)'/);
if (!versionMatch) {
  console.error('FEHLER: APP_VERSION in js/version.js nicht gefunden.');
  process.exit(1);
}
const APP_VERSION = versionMatch[1];
console.log(`→ APP_VERSION: ${APP_VERSION}`);

// --- 2) Asset-Tree scannen ---
function walk(dir, exts) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.') || name === 'node_modules' || name === 'tools' || name === 'tests') continue;
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      out.push(...walk(full, exts));
    } else if (exts.some((e) => name.endsWith(e))) {
      out.push(full);
    }
  }
  return out;
}

// Ausgeliefert wird das minifizierte CSS (styles.min.css, ~250 KB) — NICHT die
// unminifizierte Quelle styles.css (~315 KB). Nur die ausgelieferte Datei darf
// in den kritischen Precache, sonst cachen wir umsonst und der offline genutzte
// Stylesheet fehlt im App-Shell.
const rootFiles = ['index.html', 'styles.min.css', 'manifest.webmanifest', 'sw.js']
  .map((f) => join(ROOT, f))
  .filter((f) => {
    try { statSync(f); return true; } catch { return false; }
  });

const jsFiles = walk(join(ROOT, 'js'), ['.js']);
const dataFiles = walk(join(ROOT, 'data'), ['.js']);

// Große Dialekt-Daten (data/dialekte/*.js, zusammen ~4,4 MB) NICHT in den
// kritischen Install-Precache aufnehmen: das würde jeden Erst-Install und jeden
// Versions-Bump um Megabytes verlangsamen. Sie werden ohnehin beim ersten Laden
// über den App-Modul-Graphen (data/dialekte.js importiert sie statisch) geholt
// und dabei vom Runtime-Cache (stale-while-revalidate) erfasst — damit bleiben
// sie offline verfügbar, ohne den Install zu blockieren.
// Das zentrale Register (data/dialekte.js), Kategorien und Übersetzungen sind
// klein und bleiben im Precache, damit die App-Shell offline sofort startet.
const isHeavyDialectData = (f) => {
  const rel = relative(ROOT, f).split(sep).join('/');
  return rel.startsWith('data/dialekte/');
};
const precacheDataFiles = dataFiles.filter((f) => !isHeavyDialectData(f));

const allFiles = [...rootFiles, ...jsFiles, ...precacheDataFiles];

// Pfad relativ zur Root, mit forward-slashes für SW (URL-Norm).
const precacheUrls = allFiles.map((f) => {
  const rel = relative(ROOT, f).split(sep).join('/');
  return './' + rel;
}).sort((a, b) => {
  // Root-Dateien zuerst, dann nach Tiefe und Name sortiert.
  const depthA = (a.match(/\//g) || []).length;
  const depthB = (b.match(/\//g) || []).length;
  if (depthA !== depthB) return depthA - depthB;
  return a.localeCompare(b);
});

// './' (Site-Root) ganz vorne — kritisch für Navigation-Fallback.
precacheUrls.unshift('./');

// --- 3) sw.js Marker-Blöcke ersetzen ---
const swPath = join(ROOT, 'sw.js');
let swSrc = readFileSync(swPath, 'utf8');

const versionBlock = `// === BEGIN VERSION (managed by tools/sync-version.mjs) ===
const APP_VERSION = '${APP_VERSION}';
// === END VERSION ===`;

const precacheBlock = `// === BEGIN PRECACHE (managed by tools/sync-version.mjs) ===
const PRECACHE_URLS = [
${precacheUrls.map((u) => `  '${u}',`).join('\n')}
];
// === END PRECACHE ===`;

const versionRe = /\/\/ === BEGIN VERSION[\s\S]*?\/\/ === END VERSION ===/;
const precacheRe = /\/\/ === BEGIN PRECACHE[\s\S]*?\/\/ === END PRECACHE ===/;

if (!versionRe.test(swSrc)) {
  console.error('FEHLER: VERSION-Block in sw.js nicht gefunden.');
  process.exit(1);
}
if (!precacheRe.test(swSrc)) {
  console.error('FEHLER: PRECACHE-Block in sw.js nicht gefunden.');
  process.exit(1);
}

swSrc = swSrc.replace(versionRe, versionBlock);
swSrc = swSrc.replace(precacheRe, precacheBlock);

writeFileSync(swPath, swSrc, 'utf8');
const heavyExcluded = dataFiles.length - precacheDataFiles.length;
console.log(`✓ sw.js aktualisiert (${precacheUrls.length} Assets im Precache, ${heavyExcluded} große Dialekt-Dateien laufen über den Runtime-Cache).`);

// --- 4) DIALEKT_COUNT / AUSDRUCK_COUNT in version.js ---
const dialekteUrl = pathToFileURL(join(ROOT, 'data', 'dialekte.js')).href + `?t=${Date.now()}`;
const { DIALEKTE, ALLE_AUSDRUECKE } = await import(dialekteUrl);

let newVersionSrc = versionSrc;
newVersionSrc = newVersionSrc.replace(
  /export const DIALEKT_COUNT = \d+;/,
  `export const DIALEKT_COUNT = ${DIALEKTE.length};`,
);
newVersionSrc = newVersionSrc.replace(
  /export const AUSDRUCK_COUNT = \d+;/,
  `export const AUSDRUCK_COUNT = ${ALLE_AUSDRUECKE.length};`,
);

if (newVersionSrc !== versionSrc) {
  writeFileSync(versionPath, newVersionSrc, 'utf8');
  console.log(`✓ js/version.js aktualisiert: ${DIALEKTE.length} Dialekte · ${ALLE_AUSDRUECKE.length} Ausdrücke.`);
} else {
  console.log(`→ js/version.js unverändert (${DIALEKTE.length} Dialekte · ${ALLE_AUSDRUECKE.length} Ausdrücke).`);
}

console.log('\nFertig.');
