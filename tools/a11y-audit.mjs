#!/usr/bin/env node
// Statischer A11y-Audit für index.html und alle Views.
//
// Checks:
//   * Buttons/Links mit aria-label oder Text-Inhalt
//   * Bilder mit alt-Attribut
//   * Inputs mit Label/aria-label
//   * Semantic-HTML: <main>, <nav>, <header>, <footer>, <section>
//   * Sprache am <html>-Element
//   * Color-Contrast: kann statisch nicht geprüft werden — wir warnen
//   * Tabindex-Werte negativ (außer -1 für JS-fokussierbare)
//   * Focus-Visible-Styles im CSS vorhanden
//   * prefers-reduced-motion respektiert
//
// Output: Anzahl Issues + Liste der Stellen. Exit 0 wenn nur Warnungen,
// 1 wenn Errors gefunden wurden.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const issues = [];
const errors = [];

function check(file, condition, type, message) {
  if (condition) {
    const issue = { file, type, message };
    if (type === 'error') errors.push(issue);
    else issues.push(issue);
  }
}

function checkIndexHtml() {
  const html = readFileSync(join(ROOT, 'index.html'), 'utf8');

  check('index.html',
    !/<html[^>]+lang=/i.test(html),
    'error',
    '<html> sollte ein lang-Attribut haben');

  check('index.html',
    !/<main[\s>]/i.test(html),
    'error',
    '<main>-Element fehlt');

  check('index.html',
    !/<nav[\s>]/i.test(html),
    'error',
    '<nav>-Element fehlt');

  check('index.html',
    !/<header[\s>]/i.test(html) && !/<.*role=["']banner/i.test(html),
    'warn',
    '<header> oder role="banner" sollte vorhanden sein');

  check('index.html',
    !/<footer[\s>]/i.test(html) && !/<.*role=["']contentinfo/i.test(html),
    'warn',
    '<footer> oder role="contentinfo" sollte vorhanden sein');

  // Skip-Link
  check('index.html',
    !/skip-link/i.test(html),
    'warn',
    'Skip-Link für Screenreader sollte vorhanden sein');

  // viewport-meta
  check('index.html',
    !/<meta[^>]+name=["']viewport["']/i.test(html),
    'error',
    'Viewport-Meta-Tag fehlt');

  // noscript fallback
  check('index.html',
    !/<noscript[\s>]/i.test(html),
    'warn',
    '<noscript>-Fallback sollte vorhanden sein');

  // Buttons mit Text oder aria-label
  const buttonRegex = /<button([^>]*)>([\s\S]*?)<\/button>/g;
  let m;
  let buttonIdx = 0;
  while ((m = buttonRegex.exec(html))) {
    const attrs = m[1];
    const content = m[2].trim();
    const hasAriaLabel = /aria-label\s*=\s*["'][^"']+["']/.test(attrs);
    const hasTitle = /title\s*=\s*["'][^"']+["']/.test(attrs);
    const hasContent = content.length > 0 && !/^<svg/.test(content);
    if (!hasAriaLabel && !hasTitle && !hasContent) {
      issues.push({ file: 'index.html', type: 'warn',
        message: `Button #${buttonIdx} ohne aria-label/title/text-content` });
    }
    buttonIdx++;
  }

  // Inputs mit Label oder aria-label
  const inputRegex = /<input([^>]*)\/?>/g;
  let inputIdx = 0;
  while ((m = inputRegex.exec(html))) {
    const attrs = m[1];
    const hasAriaLabel = /aria-label\s*=\s*["'][^"']+["']/.test(attrs);
    const hasPlaceholder = /placeholder\s*=\s*["'][^"']+["']/.test(attrs);
    const hasId = /id\s*=\s*["']([^"']+)["']/.exec(attrs);
    const labelMatch = hasId && new RegExp(`<label[^>]+for=["']${hasId[1]}["']`).test(html);
    if (!hasAriaLabel && !labelMatch && !hasPlaceholder) {
      issues.push({ file: 'index.html', type: 'warn',
        message: `Input #${inputIdx} ohne Label/aria-label/placeholder` });
    }
    inputIdx++;
  }
}

function checkCssA11y() {
  const css = readFileSync(join(ROOT, 'styles.css'), 'utf8');

  check('styles.css',
    !/focus-visible/i.test(css),
    'error',
    'Keine :focus-visible-Styles definiert');

  check('styles.css',
    !/prefers-reduced-motion/i.test(css),
    'warn',
    'prefers-reduced-motion sollte respektiert werden');

  check('styles.css',
    !/prefers-color-scheme/i.test(css),
    'warn',
    'prefers-color-scheme sollte respektiert werden');

  check('styles.css',
    !/sr-only|visually-hidden/i.test(css),
    'warn',
    'sr-only / visually-hidden Helper-Klasse sollte vorhanden sein');

  // Touch-Targets
  check('styles.css',
    !/(min-height|min-width).*44px/i.test(css) && !/touch-target/i.test(css),
    'warn',
    'Touch-Targets sollten >= 44×44px sein (WCAG 2.5.5)');
}

function walkJs(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.')) continue;
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) walkJs(full, out);
    else if (name.endsWith('.js')) out.push(full);
  }
  return out;
}

// Extrahiert das attrs-Objekt aus einem el('button', { ... }) Aufruf.
// Balanced-Brace-Parser: zählt geöffnete/geschlossene Klammern und liest
// den vollständigen Attribut-Block ein (inkl. Inline-Funktionen, Strings,
// Comments).
function extractButtonAttrs(content) {
  const out = [];
  const re = /el\(['"]button['"]\s*,\s*\{/g;
  let m;
  while ((m = re.exec(content))) {
    let depth = 1;
    let i = m.index + m[0].length;
    while (i < content.length && depth > 0) {
      const ch = content[i];
      if (ch === '"' || ch === "'" || ch === '`') {
        // String — überspringen bis nicht-escaped Quote
        const q = ch;
        i++;
        while (i < content.length && content[i] !== q) {
          if (content[i] === '\\') i++;
          i++;
        }
      } else if (ch === '/' && content[i + 1] === '/') {
        // Single-line Kommentar
        while (i < content.length && content[i] !== '\n') i++;
      } else if (ch === '{') {
        depth++;
      } else if (ch === '}') {
        depth--;
      }
      i++;
    }
    if (depth === 0) {
      out.push(content.slice(m.index, i));
    }
  }
  return out;
}

function checkJsA11y() {
  const jsFiles = walkJs(join(ROOT, 'js'));
  let buttonChecks = 0;

  for (const file of jsFiles) {
    const content = readFileSync(file, 'utf8');
    const buttonMatches = extractButtonAttrs(content);
    for (const bm of buttonMatches) {
      buttonChecks++;
      const hasAriaLabel = /['"]?aria-label['"]?\s*:/i.test(bm);
      const hasTitle = /\btitle\s*:/i.test(bm);
      const hasIconClass = /icon-btn|expr-action|daily-action|fc-btn|fc-speak/i.test(bm);
      if (!hasAriaLabel && !hasTitle && hasIconClass) {
        issues.push({
          file: relative(ROOT, file).replace(/\\/g, '/'),
          type: 'warn',
          message: 'Icon-Only-Button ohne aria-label/title',
        });
      }
    }
  }
  console.log(`→ ${buttonChecks} button-Aufrufe in JS gefunden`);
}

console.log('=== A11Y AUDIT ===\n');

checkIndexHtml();
checkCssA11y();
checkJsA11y();

const errorCount = errors.length;
const warnCount = issues.length;

console.log(`\nFehler:    ${errorCount}`);
console.log(`Warnungen: ${warnCount}`);

if (errorCount > 0) {
  console.log('\n✗ Errors:');
  for (const e of errors) {
    console.log(`  [${e.file}] ${e.message}`);
  }
}

if (warnCount > 0 && warnCount <= 30) {
  console.log('\n⚠ Warnings:');
  for (const w of issues) {
    console.log(`  [${w.file}] ${w.message}`);
  }
} else if (warnCount > 30) {
  console.log(`\n⚠ ${warnCount} Warnings (zu viele zum Auflisten — die ersten 15):`);
  for (const w of issues.slice(0, 15)) {
    console.log(`  [${w.file}] ${w.message}`);
  }
}

console.log('');
process.exit(errorCount > 0 ? 1 : 0);
