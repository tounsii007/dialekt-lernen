#!/usr/bin/env node
// Validate all dialect entries: schema, duplicates, formatting, semantic plausibility.

import { readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dialekteDir = join(__dirname, '..', 'data', 'dialekte');
const kategorienMod = await import(pathToFileURL(join(__dirname, '..', 'data', 'kategorien.js')).href);
const validKategorien = new Set(Object.keys(kategorienMod.KATEGORIEN));

const REQUIRED_FIELDS = ['id', 'ausdruck', 'hochdeutsch', 'bedeutung', 'beispiel', 'beispiel_hd', 'kategorie'];

// CLI flags
const args = new Set(process.argv.slice(2));
const SHOW_INFO = args.has('--info');     // also show informational gaps/cross-dialect
const SHOW_STYLE = args.has('--style');   // also show stylistic issues (apostrophe consistency)

const files = readdirSync(dialekteDir).filter(f => f.endsWith('.js'));

const allIssues = [];
let totalEntries = 0;
let totalIssues = 0;
const crossDialect = new Map();

// Normalize text for substring matching: lowercase, strip diacritics.
function norm(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
}

const STOPWORDS = new Set([
  'der', 'die', 'das', 'ein', 'eine', 'einen', 'eines', 'einer', 'einem',
  'und', 'oder', 'aber', 'wenn', 'auch', 'noch', 'mehr', 'sehr',
  'mit', 'von', 'fuer', 'aus', 'auf', 'bei', 'nach', 'ueber', 'unter', 'durch',
  'ist', 'sind', 'war', 'sein', 'hat', 'haben', 'wird', 'werden',
  'sich', 'mich', 'dich', 'uns', 'ihn', 'ihm', 'ihr', 'ihre', 'sie',
  // dialect-common short words
  'des', 'mer', 'mir', 'wir', 'ick', 'dat', 'wat', 'isch', 'mei', 'sein',
]);

function ausdruckCoreWords(ausdruck) {
  return ausdruck
    .split(/[\s\-!?.,;:/]+/)
    .map(w => norm(w))
    .filter(w => w.length >= 4 && !STOPWORDS.has(w));
}

function ausdruckMentioned(ausdruck, text) {
  if (!ausdruck || !text) return true;
  const nText = norm(text);
  if (nText.includes(norm(ausdruck))) return true;
  const words = ausdruckCoreWords(ausdruck);
  if (words.length === 0) {
    const prefix = norm(ausdruck).replace(/[^a-z]/g, '').slice(0, 3);
    if (prefix.length >= 3 && nText.includes(prefix)) return true;
    return true;
  }
  // For each core word, check the word itself OR any 3+-char prefix of it
  // (catches clipped forms like Hexe → Hex, Luege → Lueg, kieken → kiek)
  return words.some(w => {
    if (nText.includes(w)) return true;
    // Try progressively shorter prefixes down to 3 chars
    for (let len = w.length - 1; len >= 3; len--) {
      if (nText.includes(w.slice(0, len))) return true;
    }
    return false;
  });
}

for (const file of files) {
  const filePath = join(dialekteDir, file);
  const url = pathToFileURL(filePath).href + `?t=${Date.now()}`;
  const mod = await import(url);
  const data = mod.default;

  const dialektId = data.id;
  const dialektPrefix = data.ausdruecke[0]?.id?.split('-')[0];
  totalEntries += data.ausdruecke.length;

  const seenIds = new Map();
  const seenAusdrucks = new Map();
  const idNums = [];
  const issues = [];

  data.ausdruecke.forEach((entry, idx) => {
    const ref = `${entry.id || '?'} / ${entry.ausdruck || '?'}`;

    for (const field of REQUIRED_FIELDS) {
      if (entry[field] === undefined || entry[field] === null) {
        issues.push({ type: 'MISSING_FIELD', ref, detail: field });
      } else if (typeof entry[field] === 'string' && entry[field].trim() === '') {
        issues.push({ type: 'EMPTY_FIELD', ref, detail: field });
      }
    }

    if (entry.kategorie && !validKategorien.has(entry.kategorie)) {
      issues.push({ type: 'INVALID_KATEGORIE', ref, detail: entry.kategorie });
    }

    if (entry.id) {
      if (seenIds.has(entry.id)) {
        issues.push({ type: 'DUPLICATE_ID', ref, detail: `also at index ${seenIds.get(entry.id)}` });
      } else {
        seenIds.set(entry.id, idx);
      }
      const prefix = entry.id.split('-')[0];
      if (prefix !== dialektPrefix) {
        issues.push({ type: 'ID_PREFIX_MISMATCH', ref, detail: `expected '${dialektPrefix}-', got '${prefix}-'` });
      }
      if (!/^[a-z]+-\d{3,}$/.test(entry.id)) {
        issues.push({ type: 'ID_FORMAT', ref, detail: 'expected PREFIX-NNN+' });
      }
      const numStr = entry.id.split('-')[1];
      if (/^\d+$/.test(numStr)) idNums.push(parseInt(numStr, 10));
    }

    if (entry.ausdruck) {
      const key = entry.ausdruck.trim().toLowerCase();
      if (seenAusdrucks.has(key)) {
        issues.push({ type: 'DUPLICATE_AUSDRUCK', ref, detail: `also at ${seenAusdrucks.get(key).id}` });
      } else {
        seenAusdrucks.set(key, entry);
      }
      if (!crossDialect.has(key)) crossDialect.set(key, []);
      crossDialect.get(key).push({ dialektId, id: entry.id });
    }

    if (entry.bedeutung && entry.bedeutung.length < 80) {
      issues.push({ type: 'BEDEUTUNG_TOO_SHORT', ref, detail: `${entry.bedeutung.length} chars` });
    }

    if (entry.ausdruck && entry.bedeutung &&
        !ausdruckMentioned(entry.ausdruck, entry.bedeutung) &&
        !ausdruckMentioned(entry.hochdeutsch || '', entry.bedeutung)) {
      issues.push({ type: 'BEDEUTUNG_NO_AUSDRUCK', ref });
    }

    // Beispiel should contain the dialect form (the ausdruck), not just the HD form
    if (entry.ausdruck && entry.beispiel && !ausdruckMentioned(entry.ausdruck, entry.beispiel)) {
      issues.push({ type: 'BEISPIEL_NO_AUSDRUCK', ref });
    }

    if (entry.ausdruck && entry.hochdeutsch && entry.ausdruck.trim().toLowerCase() === entry.hochdeutsch.trim().toLowerCase()) {
      const ausdr = entry.ausdruck.trim();
      const isProper = /^[A-ZÄÖÜ]/.test(ausdr);
      if (!isProper) {
        issues.push({ type: 'HD_EQ_AUSDRUCK', ref });
      }
    }

    for (const field of ['beispiel', 'beispiel_hd']) {
      const v = entry[field];
      if (v && typeof v === 'string' && v.trim().length > 0) {
        const trimmed = v.trim();
        const stripped = trimmed.replace(/[")'»›]+$/, '');
        const last = stripped.slice(-1);
        if (!/[.!?…]/.test(last) && !stripped.endsWith('…') && !stripped.endsWith('...')) {
          issues.push({ type: 'NO_END_PUNCT', ref, detail: `${field}: '${last}'` });
        }
      }
    }

    if (entry.bedeutung && typeof entry.bedeutung === 'string') {
      const tr = entry.bedeutung.trim();
      const stripped = tr.replace(/[")'»›]+$/, '');
      if (!/[.!?…]$/.test(stripped) && !stripped.endsWith('...')) {
        issues.push({ type: 'BEDEUTUNG_NO_END_PUNCT', ref });
      }
    }

    if (entry.beispiel && entry.beispiel_hd && entry.beispiel === entry.beispiel_hd) {
      const ausdr = (entry.ausdruck || '').trim();
      const isDialectSpecific = /^[a-z]/.test(ausdr) || /['ʼ]/.test(ausdr);
      if (isDialectSpecific) {
        issues.push({ type: 'BEISPIEL_EQ_HD', ref });
      }
    }

    for (const field of ['ausdruck', 'hochdeutsch', 'bedeutung', 'beispiel', 'beispiel_hd']) {
      const v = entry[field];
      if (typeof v === 'string') {
        if (v !== v.trim()) {
          issues.push({ type: 'TRIM_WHITESPACE', ref, detail: field });
        }
        if (/ {2,}/.test(v)) {
          issues.push({ type: 'DOUBLE_SPACE', ref, detail: field });
        }
        if (v.includes('\t')) {
          issues.push({ type: 'TAB_CHAR', ref, detail: field });
        }
      }
    }

    // Stylistic — only show with --style
    if (SHOW_STYLE) {
      for (const field of ['ausdruck', 'hochdeutsch', 'bedeutung', 'beispiel', 'beispiel_hd']) {
        const v = entry[field];
        if (typeof v === 'string' && /['ʼ]/.test(v)) {
          issues.push({ type: 'TYPOGRAPHIC_APOSTROPHE', ref, detail: field, style: true });
        }
      }
    }

    if (entry.bedeutung) {
      const openQ = (entry.bedeutung.match(/„/g) || []).length;
      const closeQ = (entry.bedeutung.match(/"/g) || []).length;
      if (openQ > 0 && Math.abs(openQ - closeQ) > 1) {
        issues.push({ type: 'QUOTE_IMBALANCE', ref, detail: `„:${openQ} ":${closeQ}` });
      }
    }

    if (entry.bedeutung && entry.bedeutung.length > 1200) {
      issues.push({ type: 'BEDEUTUNG_TOO_LONG', ref, detail: `${entry.bedeutung.length} chars` });
    }

    if (entry.ausdruck && entry.ausdruck.length > 80) {
      issues.push({ type: 'AUSDRUCK_TOO_LONG', ref, detail: `${entry.ausdruck.length} chars` });
    }
  });

  // ID gap detection — only with --info
  if (SHOW_INFO) {
    idNums.sort((a, b) => a - b);
    for (let i = 1; i < idNums.length; i++) {
      if (idNums[i] !== idNums[i - 1] + 1) {
        const gap = idNums[i] - idNums[i - 1] - 1;
        if (gap > 0) {
          issues.push({
            type: 'ID_GAP',
            ref: `${dialektPrefix}-${String(idNums[i - 1]).padStart(3, '0')} → ${dialektPrefix}-${String(idNums[i]).padStart(3, '0')}`,
            detail: `${gap} missing`,
            info: true,
          });
        }
      }
    }
  }

  if (issues.length > 0) {
    allIssues.push({ file, dialektId, issues });
    totalIssues += issues.length;
  }
}

const crossDialectMatches = [];
for (const [key, occurrences] of crossDialect) {
  if (occurrences.length >= 3) crossDialectMatches.push({ key, occurrences });
}

console.log('=== VALIDATION REPORT ===');
console.log(`Total entries: ${totalEntries}`);
console.log(`Total issues: ${totalIssues}`);
console.log(`Cross-dialect ausdrucks (≥3 dialects): ${crossDialectMatches.length}`);
console.log(`(use --info for ID gaps, --style for apostrophe consistency)\n`);

if (totalIssues === 0) {
  console.log('✓ All per-entry checks clean.');
} else {
  for (const { file, issues } of allIssues) {
    const byType = {};
    for (const i of issues) {
      byType[i.type] = byType[i.type] || [];
      byType[i.type].push(i);
    }
    console.log(`\n${file}:`);
    for (const [type, list] of Object.entries(byType)) {
      console.log(`  ${type}: ${list.length}`);
      for (const i of list.slice(0, 5)) {
        console.log(`    - ${i.ref}${i.detail ? ' (' + i.detail + ')' : ''}`);
      }
      if (list.length > 5) console.log(`    ... +${list.length - 5} more`);
    }
  }
}

if (SHOW_INFO && crossDialectMatches.length > 0) {
  console.log('\n=== Cross-dialect Ausdrucks (≥3 occurrences) ===');
  for (const { key, occurrences } of crossDialectMatches.slice(0, 30)) {
    console.log(`  '${key}' (${occurrences.length}): ${occurrences.map(o => `${o.dialektId}/${o.id}`).join(', ')}`);
  }
  if (crossDialectMatches.length > 30) console.log(`  ... +${crossDialectMatches.length - 30} more`);
}
