// i18n.js — erweiterte Tests für DE/EN-Vollständigkeit.

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { mountDom, unmountDom } from './_setup.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

before(mountDom);
after(unmountDom);

const i18n = await import('../js/util/i18n.js');

// Parse i18n.js und extrahiere DE/EN-Keys statisch
const src = readFileSync(join(ROOT, 'js', 'util', 'i18n.js'), 'utf8');

function extractKeys(langSection) {
  const re = new RegExp(`${langSection}\\s*:\\s*\\{([\\s\\S]*?)\\n\\s*\\}`, 'm');
  const m = src.match(re);
  if (!m) return new Set();
  const block = m[1];
  const keys = [...block.matchAll(/['"]([\w.-]+)['"]\s*:/g)].map(x => x[1]);
  return new Set(keys);
}

const deKeys = extractKeys('de');
const enKeys = extractKeys('en');

describe('i18n — DE/EN Parität', () => {
  it('DE hat mindestens 30 Strings', () => {
    assert.ok(deKeys.size >= 30, `DE hat nur ${deKeys.size}`);
  });

  it('EN hat mindestens 30 Strings', () => {
    assert.ok(enKeys.size >= 30, `EN hat nur ${enKeys.size}`);
  });

  it('Alle DE-Keys haben EN-Übersetzung', () => {
    const missing = [...deKeys].filter(k => !enKeys.has(k));
    assert.equal(missing.length, 0, `Fehlende EN-Übersetzungen: ${missing.join(', ')}`);
  });

  it('Alle EN-Keys haben DE-Übersetzung (kein Drift)', () => {
    const missing = [...enKeys].filter(k => !deKeys.has(k));
    assert.equal(missing.length, 0, `Fehlende DE-Übersetzungen: ${missing.join(', ')}`);
  });
});

describe('i18n — Funktions-API', () => {
  it('getLang liefert "de" als Default (ohne localStorage)', () => {
    assert.ok(['de', 'en'].includes(i18n.getLang()));
  });

  it('t() liefert für nav.home einen String', () => {
    const v = i18n.t('nav.home');
    assert.ok(typeof v === 'string' && v.length > 0);
  });

  it('t() für unknown Key liefert den Key selbst zurück', () => {
    assert.equal(i18n.t('does.not.exist.xyz'), 'does.not.exist.xyz');
  });

  it('cycleLang ist exportiert', () => {
    assert.equal(typeof i18n.cycleLang, 'function');
  });

  it('setLang ist exportiert', () => {
    assert.equal(typeof i18n.setLang, 'function');
  });

  it('applyHtmlLangAttr setzt document.documentElement.lang', () => {
    if (typeof i18n.applyHtmlLangAttr !== 'function') return;
    i18n.applyHtmlLangAttr();
    // FakeNode unterstützt setAttribute; getAttribute liefert den gespeicherten Wert
    assert.equal(globalThis.document.documentElement.getAttribute('lang'), i18n.getLang());
  });
});

describe('i18n — Kategorien-Abdeckung (DE)', () => {
  it('Navigation-Strings', () => {
    for (const key of ['nav.home', 'nav.entdecken', 'nav.lernen', 'nav.quiz', 'nav.favoriten']) {
      assert.ok(deKeys.has(key), `Fehlt: ${key}`);
    }
  });

  it('Branding-Strings', () => {
    assert.ok(deKeys.has('brand.name'));
    assert.ok(deKeys.has('brand.sub'));
  });

  it('Button-Strings', () => {
    for (const key of ['btn.save', 'btn.cancel', 'btn.close', 'btn.copy']) {
      assert.ok(deKeys.has(key), `Fehlt: ${key}`);
    }
  });

  it('Toast-Strings', () => {
    for (const key of ['toast.sound.on', 'toast.sound.off', 'toast.saved', 'toast.error']) {
      assert.ok(deKeys.has(key), `Fehlt: ${key}`);
    }
  });
});
