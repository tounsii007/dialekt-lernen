// bundle-analyze + minify-css Tool-Tests.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { existsSync, statSync, unlinkSync, readFileSync } from 'node:fs';

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

  it('erzeugt styles.min.css', () => {
    // Cleanup vorab
    if (existsSync(outPath)) unlinkSync(outPath);

    const result = spawnSync(process.execPath, [join(ROOT, 'tools', 'minify-css.mjs')], {
      stdio: 'pipe',
      encoding: 'utf8',
    });
    assert.equal(result.status, 0);
    assert.ok(existsSync(outPath));
  });

  it('Minified < Original (mindestens 20% Ersparnis)', () => {
    const orig = statSync(join(ROOT, 'styles.css')).size;
    const min = statSync(outPath).size;
    const ratio = min / orig;
    assert.ok(ratio < 0.8, `Minified ${min} vs Original ${orig} — Ratio ${ratio.toFixed(2)}`);
  });

  it('Minified enthält keine /* ... */-Kommentare', () => {
    const content = readFileSync(outPath, 'utf8');
    assert.doesNotMatch(content, /\/\*[\s\S]*?\*\//);
  });

  it('Cleanup: styles.min.css wird wieder entfernt (nicht in Repo)', () => {
    if (existsSync(outPath)) unlinkSync(outPath);
    assert.equal(existsSync(outPath), false);
  });
});
