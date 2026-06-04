#!/usr/bin/env node
// Portabler Test-Runner — funktioniert in PowerShell, Bash und CI.
// Findet alle `tests/**/*.test.js` und übergibt sie an `node --test`.
//
// CLI-Flags:
//   --coverage  echte Code-Coverage via node --experimental-test-coverage
//               (line/branch/function-% pro Datei + Gesamtreport)
//   --filter X  führt nur Tests aus, deren Pfad X enthält
//   --reporter  Reporter-Modus (spec, tap, dot) — durchgereicht an node --test

import { spawnSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

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

const allTests = findTests(testRoot);
const files = filter ? allTests.filter((f) => f.includes(filter)) : allTests;

if (!files.length) {
  console.log(filter ? `Keine Tests mit Filter "${filter}".` : 'Keine Tests gefunden.');
  process.exit(0);
}

console.log(`→ ${files.length} Test-Dateien${filter ? ` (Filter: ${filter})` : ''}\n`);

const nodeArgs = ['--test'];
if (reporter) nodeArgs.push(`--test-reporter=${reporter}`);
if (wantCoverage) {
  // Echte Coverage durch den nativen Node-Test-Runner (line/branch/funcs %).
  // Der Report wird am Ende des Laufs auf stdout ausgegeben (inherited).
  // Auf js/ + data/ eingegrenzt, damit Tests/Tools selbst nicht mitzählen;
  // ältere Node-Versionen ohne diese Flags ignorieren sie nicht, daher nur
  // hinzufügen, wenn der Runner sie kennt (Node >= 20.x / 22.x).
  nodeArgs.push('--experimental-test-coverage');
  if (coverageFiltersSupported()) {
    nodeArgs.push('--test-coverage-include=js/**', '--test-coverage-include=data/**');
    nodeArgs.push('--test-coverage-exclude=tests/**', '--test-coverage-exclude=tools/**');
  }
}
nodeArgs.push(...files);

if (wantCoverage) console.log('=== COVERAGE aktiviert (node --experimental-test-coverage) ===\n');

const result = spawnSync(process.execPath, nodeArgs, { stdio: 'inherit', cwd: ROOT });

process.exit(result.status ?? 1);

// Prüft, ob der laufende Node die Coverage-Include/Exclude-Filter unterstützt
// (eingeführt in Node 22.x). Bei älteren Versionen liefert die reine
// --experimental-test-coverage-Ausgabe weiterhin valide (ungefilterte) Werte.
function coverageFiltersSupported() {
  const major = Number(process.versions.node.split('.')[0]);
  return Number.isFinite(major) && major >= 22;
}
