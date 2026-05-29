#!/usr/bin/env node
// Portabler Test-Runner — funktioniert in PowerShell, Bash und CI.
// Findet alle `tests/**/*.test.js` und übergibt sie an `node --test`.
//
// CLI-Flags:
//   --coverage  zeigt nach dem Run welche js/-Module getestet werden
//   --filter X  führt nur Tests aus, deren Pfad X enthält
//   --reporter  Reporter-Modus (spec, tap, dot) — durchgereicht an node --test

import { spawnSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename, relative } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const testRoot = join(ROOT, 'tests');

const args = process.argv.slice(2);
const wantCoverage = args.includes('--coverage');
const reporter = args.find((a) => a.startsWith('--reporter='))?.split('=')[1];
const filterArg = args.find((a) => a.startsWith('--filter='));
const filter = filterArg?.split('=')[1];

function findTests(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (name.startsWith('_') || name.startsWith('.')) continue;
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) out.push(...findTests(full));
    else if (name.endsWith('.test.js')) out.push(full);
  }
  return out;
}

function findSourceModules() {
  const out = [];
  function walk(dir) {
    for (const name of readdirSync(dir)) {
      if (name.startsWith('.')) continue;
      const full = join(dir, name);
      const stat = statSync(full);
      if (stat.isDirectory()) walk(full);
      else if (name.endsWith('.js')) out.push(full);
    }
  }
  walk(join(ROOT, 'js'));
  return out;
}

const allTests = findTests(testRoot);
const files = filter ? allTests.filter((f) => f.includes(filter)) : allTests;

if (!files.length) {
  console.log(filter ? `Keine Tests mit Filter "${filter}".` : 'Keine Tests gefunden.');
  process.exit(0);
}

console.log(`→ ${files.length} Test-Dateien${filter ? ` (Filter: ${filter})` : ''}\n`);

const nodeArgs = ['--test'];
if (reporter) nodeArgs.push(`--test-reporter=${reporter}`);
nodeArgs.push(...files);
const result = spawnSync(process.execPath, nodeArgs, { stdio: 'inherit' });

if (wantCoverage) {
  console.log('\n=== COVERAGE-REPORT ===');
  // Heuristik: ein Modul gilt als "getestet", wenn sein Pfad ohne .js
  // als String in einem Test-File vorkommt (z.B. js/store/srs.js → 'srs.js').
  const { readFileSync } = await import('node:fs');
  const testContent = files.map((f) => readFileSync(f, 'utf8')).join('\n');
  const sources = findSourceModules();

  const tested = [];
  const untested = [];
  for (const src of sources) {
    const rel = relative(ROOT, src).replace(/\\/g, '/');
    const stem = basename(src, '.js');
    // Match auf "store/<stem>.js" oder "util/<stem>.js" o.ä.
    const partial = rel.replace(/^js\//, '');
    if (testContent.includes(partial) || testContent.includes(`'${stem}'`) || testContent.includes(`/${stem}.js`)) {
      tested.push(rel);
    } else {
      untested.push(rel);
    }
  }

  const pct = Math.round((tested.length / sources.length) * 100);
  console.log(`Module getestet:  ${tested.length} / ${sources.length}  (${pct}%)`);
  console.log(`Module untested:  ${untested.length}`);
  if (untested.length > 0 && untested.length <= 30) {
    console.log('\nUntested:');
    for (const u of untested.slice(0, 30)) console.log(`  · ${u}`);
    if (untested.length > 30) console.log(`  … +${untested.length - 30} mehr`);
  }
}

process.exit(result.status ?? 1);
