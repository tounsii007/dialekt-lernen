#!/usr/bin/env node
// Portabler Test-Runner — funktioniert in PowerShell, Bash und CI.
// Findet alle `tests/**/*.test.js` und übergibt sie an `node --test`.

import { spawnSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const testRoot = join(__dirname, '..', 'tests');

function findTests(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) out.push(...findTests(full));
    else if (name.endsWith('.test.js')) out.push(full);
  }
  return out;
}

const files = findTests(testRoot);
if (!files.length) {
  console.log('Keine Tests gefunden.');
  process.exit(0);
}

console.log(`→ Führe ${files.length} Test-Dateien aus…\n`);
const result = spawnSync(process.execPath, ['--test', ...files], { stdio: 'inherit' });
process.exit(result.status ?? 1);
