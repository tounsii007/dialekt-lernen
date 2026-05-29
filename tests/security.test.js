// Security-Tests: kein eval/Function/inline-XSS in Produktiv-Code.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

function walkJs(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.') || name === 'node_modules') continue;
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) walkJs(full, out);
    else if (name.endsWith('.js')) out.push(full);
  }
  return out;
}

describe('Production-Code Sicherheit', () => {
  const jsFiles = walkJs(join(ROOT, 'js'));

  it('keine eval() in Produktiv-Code', () => {
    for (const f of jsFiles) {
      const rel = relative(ROOT, f).replace(/\\/g, '/');
      const content = readFileSync(f, 'utf8');
      assert.doesNotMatch(content, /\beval\s*\(/,
        `eval() gefunden in ${rel}`);
    }
  });

  it('keine new Function() in Produktiv-Code', () => {
    for (const f of jsFiles) {
      const rel = relative(ROOT, f).replace(/\\/g, '/');
      const content = readFileSync(f, 'utf8');
      assert.doesNotMatch(content, /\bnew\s+Function\s*\(/,
        `new Function() gefunden in ${rel}`);
    }
  });

  it('keine document.write() in Produktiv-Code', () => {
    for (const f of jsFiles) {
      const rel = relative(ROOT, f).replace(/\\/g, '/');
      const content = readFileSync(f, 'utf8');
      assert.doesNotMatch(content, /document\.write\s*\(/,
        `document.write() gefunden in ${rel}`);
    }
  });

  it('escapeHtml-Helper ist verfügbar', () => {
    const dom = readFileSync(join(ROOT, 'js', 'util', 'dom.js'), 'utf8');
    assert.match(dom, /export function escapeHtml/);
  });
});

describe('CSP Header', () => {
  const indexHtml = readFileSync(join(ROOT, 'index.html'), 'utf8');

  it('Content-Security-Policy ist gesetzt', () => {
    assert.match(indexHtml, /Content-Security-Policy/i);
  });

  it("script-src 'self' (kein unsafe-eval)", () => {
    // Match: <meta http-equiv="Content-Security-Policy" content="...">
    const cspMatch = indexHtml.match(/Content-Security-Policy["']\s+content=["']([^"']+)["']/i);
    assert.ok(cspMatch, 'CSP-Content sollte extrahierbar sein');
    assert.doesNotMatch(cspMatch[1], /unsafe-eval/);
  });

  it('object-src none (prevent Flash/Plugin-Injection)', () => {
    assert.match(indexHtml, /object-src\s+["']?none["']?/i);
  });

  it('frame-ancestors none (Clickjacking-Schutz)', () => {
    assert.match(indexHtml, /frame-ancestors\s+["']?none["']?/i);
  });

  it('base-uri self (Base-Tag-Injection-Schutz)', () => {
    assert.match(indexHtml, /base-uri\s+["']?self["']?/i);
  });
});

describe('Repo-Sicherheit', () => {
  it('keine Secrets in committed Code', () => {
    // Wird durch tools/security-scan.mjs gecheckt — wir laufen es hier nochmal.
    const result = spawnSync(process.execPath, [join(ROOT, 'tools', 'security-scan.mjs')], {
      stdio: 'pipe',
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, `security-scan hat Errors:\n${result.stdout}`);
  });

  it('.gitignore deckt sensible Pfade ab', () => {
    const gi = readFileSync(join(ROOT, '.gitignore'), 'utf8');
    assert.match(gi, /\.env/i);
    assert.match(gi, /node_modules/i);
  });

  it('LICENSE-Datei ist vorhanden', () => {
    assert.doesNotThrow(() => statSync(join(ROOT, 'LICENSE')));
  });

  it('SECURITY.md ist vorhanden', () => {
    assert.doesNotThrow(() => statSync(join(ROOT, 'SECURITY.md')));
  });
});
