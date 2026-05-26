#!/usr/bin/env node
// Deduplicate dialect entries: load each dialect file, find duplicates by ausdruck,
// keep the entry with the longer/richer bedeutung, remove the rest.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dialekteDir = join(__dirname, '..', 'data', 'dialekte');

const files = readdirSync(dialekteDir).filter(f => f.endsWith('.js'));

let totalRemoved = 0;
const summary = [];

for (const file of files) {
  const filePath = join(dialekteDir, file);
  const url = pathToFileURL(filePath).href + `?t=${Date.now()}`;
  const mod = await import(url);
  const data = mod.default;

  const original = data.ausdruecke;
  const seen = new Map(); // ausdruck -> bestIdx
  const dupIndices = new Set();

  original.forEach((entry, idx) => {
    const key = entry.ausdruck.trim().toLowerCase();
    if (!seen.has(key)) {
      seen.set(key, idx);
    } else {
      const prevIdx = seen.get(key);
      const prev = original[prevIdx];
      // Keep whichever has longer bedeutung
      if ((entry.bedeutung || '').length > (prev.bedeutung || '').length) {
        dupIndices.add(prevIdx);
        seen.set(key, idx);
      } else {
        dupIndices.add(idx);
      }
    }
  });

  if (dupIndices.size === 0) continue;

  // Rebuild file by removing duplicate entry blocks (matched by id)
  const removedIds = [...dupIndices].map(i => original[i].id);
  let raw = readFileSync(filePath, 'utf8');

  // Per id, remove the matching `    { ... id: 'X-NNN', ... }` block (followed by optional comma).
  // Each block starts with `    {` and ends with the matching `    }` (with optional `,`).
  for (const id of removedIds) {
    // Build regex: match the entry block containing this id
    // The block is: 4-space-indented `{` ... `id: '<id>',` ... `4-space-indented }`
    // We need to be careful: match from `    {` through the closing `    },?` for this entry.
    const idEsc = id.replace(/[-]/g, '\\-');
    const blockPattern = new RegExp(
      `    \\{[^{}]*?id: '${idEsc}',[\\s\\S]*?\\n    \\},?\\n`,
      'g'
    );
    const before = raw.length;
    raw = raw.replace(blockPattern, '');
    if (raw.length === before) {
      console.error(`  WARN: could not remove block for id ${id} in ${file}`);
    }
  }

  // Cleanup: if the very last entry now ends with `},` before `]`, fix to `}`.
  // Pattern: `},\n  ]\n};` -> `}\n  ]\n};`
  raw = raw.replace(/\},(\s*)\n  \]\n\};/, '}$1\n  ]\n};');

  writeFileSync(filePath, raw, 'utf8');
  summary.push({ file, removed: dupIndices.size, removedIds });
  totalRemoved += dupIndices.size;
}

console.log('=== DEDUPE SUMMARY ===');
for (const s of summary) {
  console.log(`${s.file}: removed ${s.removed} duplicates`);
  console.log(`  IDs: ${s.removedIds.join(', ')}`);
}
console.log(`\nTotal removed: ${totalRemoved}`);
