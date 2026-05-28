#!/usr/bin/env node
// Custom zero-dep Linter für Dialekto.
// Prüft Code-Hygiene-Regeln, die uns wichtig sind, ohne ESLint-Dep:
//
//   - keine `console.log` (außer in tools/, sw.js)
//   - keine `debugger`-Statements
//   - keine `TODO/FIXME/XXX/HACK` ohne Issue-Reference
//   - keine `var` (let/const bevorzugen)
//   - keine vergessenen `.only()` in Tests
//   - keine Tabs (Spaces-only)
//   - keine trailing-whitespace
//   - kein `eval(`
//   - File endet mit Newline
//
// Bei `--fix`: trailing whitespace + missing trailing newline werden korrigiert.
//
// Usage:
//   node tools/lint.mjs           # check, exit 1 bei issues
//   node tools/lint.mjs --fix     # auto-fix wo möglich

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const fix = process.argv.includes('--fix');

const IGNORE = new Set(['node_modules', '.git', 'dist', 'build', 'coverage', '.claude']);
const SCAN_EXTS = ['.js', '.mjs'];
// In diesen Pfaden ist console.log OK (Tools, ServiceWorker, Dev-Helper)
const CONSOLE_OK = ['tools/', 'sw.js', 'js/version.js'];

const issues = [];

function shouldScan(path) {
  const base = path.split(sep).pop();
  if (IGNORE.has(base)) return false;
  if (path.includes(sep + 'node_modules' + sep)) return false;
  return true;
}

function walk(dir, cb) {
  for (const entry of readdirSync(dir)) {
    if (IGNORE.has(entry)) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, cb);
    else cb(full);
  }
}

function isConsoleOkPath(relPath) {
  return CONSOLE_OK.some((ok) => relPath.replace(/\\/g, '/').startsWith(ok));
}

function lintFile(absPath) {
  const relPath = relative(ROOT, absPath).replace(/\\/g, '/');
  if (!SCAN_EXTS.some((ext) => absPath.endsWith(ext))) return null;
  if (!shouldScan(absPath)) return null;

  const original = readFileSync(absPath, 'utf8');
  let content = original;
  const fileIssues = [];

  const lines = content.split('\n');

  // Track multi-line template literal state — Inhalt darin ist nicht JS-Code
  // (z.B. WGSL-Shader, HTML-Templates). `var` & Co dürfen dort vorkommen.
  let inTemplate = false;

  lines.forEach((line, i) => {
    const ln = i + 1;

    // Skip lint-relevant checks komplett, wenn wir in einem mehrzeiligen
    // Template-Literal sind (Shader, HTML, SQL etc.).
    const wasInTemplate = inTemplate;
    // Toggle: zähle ungerade Backticks (außerhalb von Strings)
    const codeForToggle = stripLineStrings(line);
    const backticks = (codeForToggle.match(/`/g) || []).length;
    if (backticks % 2 === 1) inTemplate = !inTemplate;

    if (wasInTemplate) {
      // Trailing-Whitespace + Tabs prüfen wir trotzdem
      if (line.includes('\t')) {
        fileIssues.push({ rule: 'no-tab', ln, col: line.indexOf('\t') + 1, msg: 'tab character (use spaces)' });
      }
      if (/[ \t]+$/.test(line)) {
        fileIssues.push({ rule: 'no-trailing-whitespace', ln, col: line.length, msg: 'trailing whitespace', fixable: true });
      }
      return; // skip JS-spezifische Regeln in Template-Literals
    }

    const code = stripStrings(line);

    if (/\bconsole\.log\b/.test(code) && !isConsoleOkPath(relPath)) {
      fileIssues.push({ rule: 'no-console-log', ln, col: line.indexOf('console.log') + 1, msg: 'console.log not allowed outside tools/' });
    }
    if (/\bdebugger\b/.test(code)) {
      fileIssues.push({ rule: 'no-debugger', ln, col: line.indexOf('debugger') + 1, msg: 'debugger statement' });
    }
    if (/\bvar\s+\w/.test(code)) {
      fileIssues.push({ rule: 'no-var', ln, col: line.indexOf('var') + 1, msg: 'use let/const instead of var' });
    }
    if (/\beval\s*\(/.test(code)) {
      fileIssues.push({ rule: 'no-eval', ln, col: line.indexOf('eval') + 1, msg: 'eval() is forbidden' });
    }
    if (/\.only\s*\(/.test(code) && absPath.includes('tests' + sep)) {
      fileIssues.push({ rule: 'no-test-only', ln, col: line.indexOf('.only') + 1, msg: 'forgotten .only() in test' });
    }
    if (/\b(TODO|FIXME|XXX|HACK)\b/.test(code)) {
      // Nur wenn keine Issue-Referenz (#123) dabei ist
      // Self-reference (z.B. die `TODO|FIXME`-Regex in diesem Linter selbst) auch erlauben.
      const hasRef = /#\d+/.test(line) || /\bgh-\d+/.test(line);
      const isLinterRule = /\\b\(TODO\|FIXME/.test(line);
      if (!hasRef && !isLinterRule) {
        fileIssues.push({ rule: 'todo-without-issue', ln, col: 1, msg: 'TODO/FIXME ohne Issue-Reference (#NN)' });
      }
    }
    if (line.includes('\t')) {
      fileIssues.push({ rule: 'no-tab', ln, col: line.indexOf('\t') + 1, msg: 'tab character (use spaces)' });
    }
    if (/[ \t]+$/.test(line)) {
      fileIssues.push({ rule: 'no-trailing-whitespace', ln, col: line.length, msg: 'trailing whitespace', fixable: true });
    }
  });

  // EOF-Newline
  if (!content.endsWith('\n')) {
    fileIssues.push({ rule: 'eol-last', ln: lines.length, col: 1, msg: 'file must end with newline', fixable: true });
  }

  if (fileIssues.length === 0) return null;

  // Auto-fix
  if (fix) {
    let newContent = content;
    if (fileIssues.some((i) => i.rule === 'no-trailing-whitespace')) {
      newContent = newContent.split('\n').map((l) => l.replace(/[ \t]+$/, '')).join('\n');
    }
    if (fileIssues.some((i) => i.rule === 'eol-last') && !newContent.endsWith('\n')) {
      newContent += '\n';
    }
    if (newContent !== original) {
      writeFileSync(absPath, newContent, 'utf8');
    }
  }

  return { path: relPath, issues: fileIssues };
}

// Wie stripStrings, aber lässt Backticks am Zeilenende stehen (für Toggle-Detection).
function stripLineStrings(line) {
  const commentIdx = findLineCommentStart(line);
  const code = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
  return code
    .replace(/'(?:\\'|[^'])*'/g, "''")
    .replace(/"(?:\\"|[^"])*"/g, '""');
}

// Strip JS string literals + line comments — so "console.log" inside a comment/string is ignored
function stripStrings(line) {
  // Remove line comment portion first
  const commentIdx = findLineCommentStart(line);
  const code = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
  // Remove strings (basic — not perfect for template literals with expressions)
  return code
    .replace(/'(?:\\'|[^'])*'/g, "''")
    .replace(/"(?:\\"|[^"])*"/g, '""')
    .replace(/`(?:\\`|[^`])*`/g, '``');
}

function findLineCommentStart(line) {
  let inStr = null;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inStr) {
      if (ch === '\\') { i++; continue; }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') { inStr = ch; continue; }
    if (ch === '/' && line[i + 1] === '/') return i;
  }
  return -1;
}

walk(ROOT, (file) => {
  const res = lintFile(file);
  if (res) issues.push(res);
});

const totalIssues = issues.reduce((s, f) => s + f.issues.length, 0);
const fixedIssues = fix
  ? issues.reduce((s, f) => s + f.issues.filter((i) => i.fixable).length, 0)
  : 0;
const remaining = totalIssues - fixedIssues;

if (totalIssues === 0) {
  console.log('✓ Lint clean — 0 issues.');
  process.exit(0);
}

console.log('=== Lint Report ===');
for (const file of issues) {
  console.log(`\n${file.path}:`);
  for (const i of file.issues) {
    const fixedNote = fix && i.fixable ? ' [fixed]' : '';
    console.log(`  ${i.ln}:${i.col}  ${i.rule.padEnd(28)} ${i.msg}${fixedNote}`);
  }
}
console.log(`\nTotal: ${totalIssues} issues${fix ? ` (${fixedIssues} auto-fixed)` : ''}`);
process.exit(remaining > 0 ? 1 : 0);
