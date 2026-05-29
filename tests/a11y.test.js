// A11y-Tests: prüft den a11y-audit-Tool und kritische Index-Eigenschaften.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const indexHtml = readFileSync(join(ROOT, 'index.html'), 'utf8');
const stylesCss = readFileSync(join(ROOT, 'styles.css'), 'utf8');

describe('index.html Accessibility', () => {
  it('html-Tag hat lang-Attribut', () => {
    assert.match(indexHtml, /<html[^>]+lang=/i);
  });

  it('lang ist "de" (deutsche Hauptsprache)', () => {
    assert.match(indexHtml, /<html[^>]+lang=["']de["']/i);
  });

  it('viewport-Meta vorhanden', () => {
    assert.match(indexHtml, /<meta[^>]+name=["']viewport["']/i);
  });

  it('viewport mit viewport-fit für Notch-Geräte', () => {
    assert.match(indexHtml, /viewport-fit=cover/i);
  });

  it('semantisches <main>', () => {
    assert.match(indexHtml, /<main[\s>]/i);
  });

  it('semantisches <nav>', () => {
    assert.match(indexHtml, /<nav[\s>]/i);
  });

  it('semantischer <header>', () => {
    assert.match(indexHtml, /<header[\s>]/i);
  });

  it('semantischer <footer>', () => {
    assert.match(indexHtml, /<footer[\s>]/i);
  });

  it('skip-link für Tastatur-Navigation', () => {
    assert.match(indexHtml, /skip-link/i);
  });

  it('CSP-Header vorhanden (security)', () => {
    assert.match(indexHtml, /Content-Security-Policy/i);
  });

  it('noscript-Fallback für JS-loses Browsen', () => {
    assert.match(indexHtml, /<noscript[\s>]/i);
  });

  it('aria-live-Region für Toast/Announcement', () => {
    assert.match(indexHtml, /aria-live=["'](polite|assertive)["']/i);
  });

  it('Mobile-Nav hat aria-label', () => {
    assert.match(indexHtml, /<nav[^>]+aria-label=["'][^"']+["']/i);
  });
});

describe('styles.css Accessibility', () => {
  it(':focus-visible-Styles definiert', () => {
    assert.match(stylesCss, /focus-visible/i);
  });

  it('prefers-reduced-motion respektiert', () => {
    assert.match(stylesCss, /prefers-reduced-motion/i);
  });

  it('prefers-color-scheme respektiert (Dark Mode)', () => {
    assert.match(stylesCss, /prefers-color-scheme/i);
  });

  it('sr-only-Helper für Screenreader-Texte', () => {
    assert.match(stylesCss, /\.sr-only/i);
  });

  it('Touch-Target-Variable oder explizite 44px-Regel', () => {
    assert.ok(/--touch-target/.test(stylesCss) || /min-(height|width)\s*:\s*44px/.test(stylesCss));
  });

  it('skip-link CSS-Klasse definiert', () => {
    assert.match(stylesCss, /\.skip-link/i);
  });

  it('outline für focus-visible (kein outline: none ohne Ersatz)', () => {
    assert.match(stylesCss, /:focus-visible[\s\S]{1,200}outline/i);
  });
});

describe('a11y-audit Tool', () => {
  it('läuft erfolgreich (kein Error-Exit)', () => {
    const result = spawnSync(process.execPath, [join(ROOT, 'tools', 'a11y-audit.mjs')], {
      stdio: 'pipe',
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, `a11y-audit hat Errors gemeldet:\n${result.stdout}`);
  });

  it('berichtet 0 Errors für aktuellen Codebase', () => {
    const result = spawnSync(process.execPath, [join(ROOT, 'tools', 'a11y-audit.mjs')], {
      stdio: 'pipe',
      encoding: 'utf8',
    });
    assert.match(result.stdout, /Fehler:\s+0/);
  });
});
