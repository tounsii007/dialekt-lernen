#!/usr/bin/env node
// i18n-Scan: findet (heuristisch) hartcodierte deutsche UI-Strings in den Views,
// die noch NICHT über t()/data-i18n lokalisiert sind. Grobe Kandidaten-Metrik
// für den Lokalisierungs-Fortschritt — bewusst heuristisch (false positives
// möglich, z.B. absichtliche DE-Rotationstexte). Dient der wiederholbaren
// „Was fehlt noch?"-Prüfung zwischen den Lokalisierungs-Iterationen.
//
// Aufruf:
//   node tools/i18n-scan.mjs               # Zusammenfassung pro View + Gesamt
//   node tools/i18n-scan.mjs --list        # zusätzlich die Kandidaten-Strings
//   node tools/i18n-scan.mjs --view=quiz   # nur Views, deren Pfad das enthält

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const VIEWS_DIR = join(ROOT, 'js', 'views');

const args = process.argv.slice(2);
const showList = args.includes('--list');
const onlyView = args.find((a) => a.startsWith('--view='))?.split('=')[1];

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const f = join(dir, n);
    if (statSync(f).isDirectory()) walk(f, out);
    else if (n.endsWith('.js')) out.push(f);
  }
  return out;
}

// Bekannte technische Einzelwörter, die wie UI aussehen, aber keine sind:
// Keyboard-Event-Keys (e.key === '…'), DOM-/Web-APIs, App-Eigenname.
const STOP = new Set([
  'Enter', 'Escape', 'Tab', 'Shift', 'Control', 'Alt', 'Meta', 'Backspace',
  'Delete', 'Insert', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
  'Home', 'End', 'PageUp', 'PageDown', 'CapsLock', 'Space', 'Spacebar', 'Clear',
  'IntersectionObserver', 'ResizeObserver', 'MutationObserver', 'AbortController',
  'Dialekto',
]);

// Sieht der String nach sichtbarem deutschem UI-Text aus (statt technischem Wert)?
function looksGermanUi(s) {
  const t = s.trim();
  if (t.length < 2 || t.length > 240) return false;
  if (STOP.has(t)) return false;                                 // Tasten/APIs/Eigenname
  if (!/[A-Za-zÄÖÜäöüß]/.test(t)) return false;                  // braucht Buchstaben
  if (t.startsWith('<')) return false;                            // HTML/SVG-Markup
  if (t.split(/\s+/).every((w) => /^[a-z][a-z0-9-]*$/.test(w))) return false; // CSS-Klassenliste
  if (/^[#./]|^--|^https?:|^mailto:|^data:|^[a-z]+:\/\//.test(t)) return false;
  if (/^(de|en|tr|fr|es)(-[A-Z]{2})?$/.test(t)) return false;    // Sprachcodes
  if (/^[a-z][a-zA-Z0-9]*$/.test(t)) return false;               // camelCase ident/event/key
  if (/^[a-z][a-z0-9-]*$/.test(t)) return false;                 // kebab class/id
  if (/^[\d\s.,:;%×/+\-–—()]+$/.test(t)) return false;           // nur Zahlen/Symbole
  if (/^[A-Z][A-Z0-9_]+$/.test(t)) return false;                 // CONST_NAME
  if (/(^|\s)(var\(--|px\b|rem\b|deg\b|%\b)/.test(t) && !/[äöüÄÖÜß]/.test(t)) return false; // CSS
  const hasUmlaut = /[äöüÄÖÜß]/.test(t);
  const multiWord = /[A-Za-zäöüÄÖÜ]{2,}\s+[A-Za-zäöüÄÖÜ]{2,}/.test(t);
  const capWord   = /^[A-ZÄÖÜ][a-zäöü]{2,}/.test(t);
  return hasUmlaut || multiWord || capWord;
}

function extractStrings(line) {
  const out = [];
  const re = /(['"])((?:\\.|(?!\1).)*)\1|`([^`$]*)`/g;
  let m;
  while ((m = re.exec(line))) out.push(m[2] ?? m[3] ?? '');
  return out;
}

let total = 0;
const perView = [];
for (const file of walk(VIEWS_DIR)) {
  const rel = relative(ROOT, file).replace(/\\/g, '/');
  if (onlyView && !rel.includes(onlyView)) continue;
  const lines = readFileSync(file, 'utf8').split('\n');
  const hits = [];
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) return;
    if (trimmed.startsWith('import ') || trimmed.startsWith('export ')) return;
    for (const s of extractStrings(line)) {
      if (!looksGermanUi(s)) continue;
      const esc = s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // schon via t('…') oder data-i18n="…" lokalisiert? → überspringen
      if (new RegExp(`t\\(\\s*['"]${esc}`).test(line)) continue;
      if (new RegExp(`i18n[^=]*=\\s*['"]${esc}`).test(line)) continue;
      hits.push({ line: i + 1, text: s });
    }
  });
  if (hits.length) { perView.push({ rel, hits }); total += hits.length; }
}

perView.sort((a, b) => b.hits.length - a.hits.length);
console.log('=== i18n-Scan: hartcodierte deutsche UI-Strings (Kandidaten) ===\n');
for (const v of perView) {
  console.log(`${String(v.hits.length).padStart(4)}  ${v.rel}`);
  if (showList) for (const h of v.hits) console.log(`        :${h.line}  "${h.text}"`);
}
console.log(`\nGesamt: ${total} Kandidaten in ${perView.length} Dateien.`);
