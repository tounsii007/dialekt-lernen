// bundle-analyze + minify-css Tool-Tests.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { existsSync, statSync, readFileSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

describe('bundle-analyze Tool', () => {
  it('läuft erfolgreich ohne Errors', () => {
    const result = spawnSync(process.execPath, [join(ROOT, 'tools', 'bundle-analyze.mjs')], {
      stdio: 'pipe',
      encoding: 'utf8',
    });
    assert.equal(result.status, 0);
    assert.match(result.stdout, /BUNDLE ANALYSE/);
  });

  it('liefert TOTAL APP SIZE', () => {
    const result = spawnSync(process.execPath, [join(ROOT, 'tools', 'bundle-analyze.mjs')], {
      stdio: 'pipe',
      encoding: 'utf8',
    });
    assert.match(result.stdout, /TOTAL APP SIZE/);
  });

  it('berichtet aktivierten Lazy-Load-Status', () => {
    const result = spawnSync(process.execPath, [join(ROOT, 'tools', 'bundle-analyze.mjs')], {
      stdio: 'pipe',
      encoding: 'utf8',
    });
    // Erwartet: mindestens 1 Lazy-Load-Match
    assert.match(result.stdout, /Lazy-loaded Views/);
    const m = result.stdout.match(/Lazy-loaded Views[^:]+:\s+(\d+)/);
    assert.ok(m);
    const n = parseInt(m[1], 10);
    assert.ok(n >= 5, `Mindestens 5 Lazy-loaded Views erwartet, gefunden ${n}`);
  });
});

describe('minify-css Tool', () => {
  const outPath = join(ROOT, 'styles.min.css');

  // styles.min.css ist jetzt ein ausgeliefertes (committetes) Artefakt —
  // index.html und der Service-Worker laden es. Der Tool-Lauf regeneriert es
  // deterministisch (gleicher Inhalt) und löscht es NICHT mehr.
  it('erzeugt styles.min.css', () => {
    const result = spawnSync(process.execPath, [join(ROOT, 'tools', 'minify-css.mjs')], {
      stdio: 'pipe',
      encoding: 'utf8',
    });
    assert.equal(result.status, 0);
    assert.ok(existsSync(outPath));
  });

  it('Minified < Original', () => {
    const orig = statSync(join(ROOT, 'styles.css')).size;
    const min = statSync(outPath).size;
    assert.ok(min < orig, `Minified ${min} vs Original ${orig}`);
  });

  it('enthält nur noch License-Kommentare (/*! … */)', () => {
    const content = readFileSync(outPath, 'utf8');
    const comments = content.match(/\/\*/g) || [];
    const license = content.match(/\/\*!/g) || [];
    assert.equal(comments.length, license.length);
  });
});
