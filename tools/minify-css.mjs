#!/usr/bin/env node
// CSS-Minifier — sehr einfacher Regex-basierter Minifier ohne Deps.
//
// Strategie:
//   * Kommentare entfernen
//   * Whitespace komprimieren
//   * Trailing-Semikolons in `{...}` entfernen
//   * Leerzeichen um {, }, :, ; entfernen
//   * Doppelte Semikolons reduzieren
//
// Output: styles.min.css neben styles.css.
//
// HINWEIS: Standard-Output ist unminified styles.css — die App wird damit
// ausgeliefert. Dieser Tool ist optional für Produktions-Deployments,
// wo man ggf. Caching/Bandbreite zusätzlich optimieren möchte.

import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const inPath = join(ROOT, 'styles.css');
const outPath = join(ROOT, 'styles.min.css');

const src = readFileSync(inPath, 'utf8');

function minifyCss(css) {
  return css
    // Block-Kommentare entfernen (außer License-Markern /*! ... */)
    .replace(/\/\*(?!!)[\s\S]*?\*\//g, '')
    // Mehrfach-Whitespace zu Single-Space
    .replace(/\s+/g, ' ')
    // Whitespace um Strukturzeichen entfernen
    .replace(/\s*([\{\}:;,>+~])\s*/g, '$1')
    // Trailing-Semikolon vor } entfernen
    .replace(/;}/g, '}')
    // Mehrfach-Semikolons reduzieren
    .replace(/;+/g, ';')
    // Führendes & abschließendes Whitespace
    .trim();
}

const minified = minifyCss(src);

writeFileSync(outPath, minified, 'utf8');

const inSize = statSync(inPath).size;
const outSize = statSync(outPath).size;
const reduction = Math.round((1 - outSize / inSize) * 100);

function fmt(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

console.log('=== CSS MINIFY ===');
console.log(`  Input:  ${fmt(inSize).padStart(10)}  ${inPath}`);
console.log(`  Output: ${fmt(outSize).padStart(10)}  ${outPath}`);
console.log(`  Saved:  ${fmt(inSize - outSize).padStart(10)}  (${reduction}% Reduktion)`);
