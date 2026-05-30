// Statisch: styles.css — semantische State-Farb-Tokens + Toast-Varianten.
//
// Verifiziert die in Iteration 1 eingeführten Design-Tokens und schützt
// gegen Rückfall auf hartkodierte Danger-Rots (Regression-Guard).

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(__dirname, '..', 'styles.css'), 'utf8');

describe('Semantische State-Farb-Tokens', () => {
  for (const t of ['--success', '--danger', '--warning', '--info']) {
    it(`${t} ist definiert`, () => {
      assert.ok(css.includes(`${t}:`), `${t} fehlt in styles.css`);
    });
  }

  for (const t of ['--success-soft', '--danger-soft', '--warning-soft', '--info-soft']) {
    it(`${t} (-soft-Variante) ist definiert`, () => {
      assert.ok(css.includes(`${t}:`), `${t} fehlt in styles.css`);
    });
  }

  it('--danger ist hell UND dunkel definiert (>= 2 Vorkommen)', () => {
    const count = (css.match(/--danger:/g) || []).length;
    assert.ok(count >= 2, `erwartet >=2 --danger-Definitionen (hell+dunkel), gefunden ${count}`);
  });

  it('--success ist hell UND dunkel definiert (>= 2 Vorkommen)', () => {
    const count = (css.match(/--success:/g) || []).length;
    assert.ok(count >= 2, `erwartet >=2 --success-Definitionen, gefunden ${count}`);
  });
});

describe('Toast-Varianten nutzen Tokens', () => {
  it('.toast.error ist gestylt (war vorher ungestylt)', () => {
    assert.match(css, /\.toast\.error\s*\{/);
  });

  it('.toast.warning ist gestylt', () => {
    assert.match(css, /\.toast\.warning\s*\{/);
  });

  it('.toast.success referenziert var(--success)', () => {
    assert.match(css, /\.toast\.success\s*\{[^}]*var\(--success\)/);
  });

  it('.toast.error referenziert var(--danger)', () => {
    assert.match(css, /\.toast\.error\s*\{[^}]*var\(--danger\)/);
  });
});

describe('Regression: keine hartkodierten Danger-Rots', () => {
  it('kein hsl(0 80% 60%) mehr (→ var(--danger))', () => {
    assert.ok(!css.includes('hsl(0 80% 60%)'),
      'hartkodiertes Danger-Rot hsl(0 80% 60%) wieder eingeführt');
  });

  it('kein hsl(0 80% 55%) mehr (→ var(--danger))', () => {
    assert.ok(!css.includes('hsl(0 80% 55%)'),
      'hartkodiertes Danger-Rot hsl(0 80% 55%) wieder eingeführt');
  });

  it('kein #ef4444 mehr (→ var(--danger))', () => {
    assert.ok(!css.includes('#ef4444'), '#ef4444 sollte var(--danger) sein');
  });

  it('kein #f87171 mehr (→ var(--danger))', () => {
    assert.ok(!css.includes('#f87171'), '#f87171 sollte var(--danger) sein');
  });
});
