#!/usr/bin/env node
// CSS-Minifier — sicherer, dependency-freier Build-Schritt.
//
// Die eigentliche Logik liegt in tools/lib/minify-css.mjs (testbar). Dieser
// Wrapper liest styles.css, schreibt styles.min.css und meldet die Ersparnis.
// index.html wird mit styles.min.css ausgeliefert.

import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { minifyCss } from './lib/minify-css.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const inPath = join(ROOT, 'styles.css');
const outPath = join(ROOT, 'styles.min.css');

const src = readFileSync(inPath, 'utf8');
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
