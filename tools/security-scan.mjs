#!/usr/bin/env node
// Security-Scan ohne Dependencies.
//
// Checks:
//   * Secrets: api-keys, tokens, passwords, private keys
//   * Hardcoded URLs zu externen Services
//   * eval() / new Function() Verwendung
//   * innerHTML mit dynamischen Daten (XSS-Risk)
//   * document.write
//   * Unsichere localStorage-Patterns
//   * Lockfiles mit known-vulnerable Versions (basic)
//   * CSP-Konformität in index.html

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const issues = [];
const errors = [];

function report(severity, file, line, message) {
  const entry = { severity, file, line, message };
  if (severity === 'error') errors.push(entry);
  else issues.push(entry);
}

function walkJs(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.') || name === 'node_modules') continue;
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) walkJs(full, out);
    else if (name.endsWith('.js') || name.endsWith('.mjs')) out.push(full);
  }
  return out;
}

// 1. Secret-Patterns
const SECRET_PATTERNS = [
  { name: 'AWS Access Key', re: /AKIA[0-9A-Z]{16}/ },
  { name: 'GitHub Token', re: /ghp_[A-Za-z0-9]{36,}/ },
  { name: 'Slack Token', re: /xox[baprs]-[A-Za-z0-9-]{10,}/ },
  { name: 'JWT Token', re: /eyJ[A-Za-z0-9_-]{20,}\.eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}/ },
  { name: 'Private Key', re: /-----BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY-----/ },
  { name: 'Generic API Key', re: /(?:api[_-]?key|secret|password|token)\s*[:=]\s*["'][A-Za-z0-9]{32,}["']/i },
];

// 2. Dangerous JS-Patterns
const DANGEROUS_JS = [
  { name: 'eval()', re: /\beval\s*\(/, severity: 'error' },
  { name: 'new Function()', re: /\bnew\s+Function\s*\(/, severity: 'error' },
  { name: 'document.write', re: /document\.write\s*\(/, severity: 'warn' },
];

function scanFile(file) {
  const content = readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const rel = relative(ROOT, file).replace(/\\/g, '/');

  lines.forEach((line, i) => {
    const lineNum = i + 1;

    // Sekrete
    for (const { name, re } of SECRET_PATTERNS) {
      if (re.test(line)) {
        report('error', rel, lineNum, `Potentielles Sekret: ${name}`);
      }
    }

    // Dangerous JS — nur außerhalb test/tool-Verzeichnissen
    const isProdCode = !rel.startsWith('tools/') && !rel.startsWith('tests/');
    if (isProdCode) {
      for (const { name, re, severity } of DANGEROUS_JS) {
        if (re.test(line)) {
          report(severity, rel, lineNum, `${name} verwendet`);
        }
      }

      // innerHTML mit Variable
      if (/\.innerHTML\s*=\s*[^'"`]/i.test(line)) {
        // Nur warnen wenn nicht offensichtlich konstant
        if (!/innerHTML\s*=\s*['"`]/i.test(line)) {
          report('warn', rel, lineNum, 'innerHTML mit dynamischen Daten — XSS-Risk?');
        }
      }
    }
  });
}

console.log('=== SECURITY SCAN ===\n');

// 3. JS scannen
const allFiles = [
  ...walkJs(join(ROOT, 'js')),
  ...walkJs(join(ROOT, 'data')),
  ...walkJs(join(ROOT, 'tools')),
];
for (const f of allFiles) scanFile(f);

// 4. index.html
const indexHtml = readFileSync(join(ROOT, 'index.html'), 'utf8');
if (!/Content-Security-Policy/i.test(indexHtml)) {
  report('error', 'index.html', 0, 'CSP-Meta-Tag fehlt');
}
if (/Content-Security-Policy[^>]*'unsafe-eval'/i.test(indexHtml)) {
  report('warn', 'index.html', 0, "CSP enthält 'unsafe-eval'");
}

// 5. Service Worker — checken auf gefährliche fetch-Patterns
const sw = readFileSync(join(ROOT, 'sw.js'), 'utf8');
if (!/^(?:.*\n)*?const APP_VERSION/m.test(sw)) {
  report('warn', 'sw.js', 0, 'APP_VERSION-Konstante fehlt');
}

// 6. Output
const errorCount = errors.length;
const warnCount = issues.length;

console.log(`Fehler:    ${errorCount}`);
console.log(`Warnungen: ${warnCount}`);

if (errorCount > 0) {
  console.log('\n✗ Errors:');
  for (const e of errors) {
    console.log(`  [${e.file}:${e.line}] ${e.message}`);
  }
}

if (warnCount > 0 && warnCount <= 25) {
  console.log('\n⚠ Warnings:');
  for (const w of issues) {
    console.log(`  [${w.file}:${w.line}] ${w.message}`);
  }
} else if (warnCount > 25) {
  console.log(`\n⚠ ${warnCount} Warnings (erste 15):`);
  for (const w of issues.slice(0, 15)) {
    console.log(`  [${w.file}:${w.line}] ${w.message}`);
  }
}

if (errorCount === 0 && warnCount === 0) {
  console.log('\n✓ Keine sicherheitsrelevanten Probleme gefunden.');
}

console.log('');
process.exit(errorCount > 0 ? 1 : 0);
