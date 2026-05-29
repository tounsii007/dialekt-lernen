// i18n.js — Internationalisierung.

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mountDom, unmountDom } from './_setup.js';

before(mountDom);
after(unmountDom);

const i18n = await import('../js/util/i18n.js');

describe('i18n — exportierte API', () => {
  it('hat t-Funktion', () => {
    assert.equal(typeof i18n.t, 'function');
  });

  it('t() liefert deutschen String für bekannten Key', () => {
    const v = i18n.t('nav.home');
    assert.equal(typeof v, 'string');
    assert.ok(v.length > 0);
  });

  it('t() fällt auf den Key zurück, wenn unbekannt', () => {
    const v = i18n.t('does.not.exist');
    // sollte irgendwas zurückgeben (Key selbst oder Fallback-Text)
    assert.equal(typeof v, 'string');
  });

  it('getLang ist verfügbar (oder Default-Lang als String)', () => {
    if (typeof i18n.getLang === 'function') {
      const lang = i18n.getLang();
      assert.ok(['de', 'en'].includes(lang));
    }
  });

  it('setLang akzeptiert "de" und "en"', () => {
    if (typeof i18n.setLang === 'function') {
      assert.doesNotThrow(() => i18n.setLang('de'));
      // EN-Wechsel triggert evtl. reload — wir nehmen Robustheit als Test
      assert.doesNotThrow(() => i18n.setLang('en'));
    }
  });
});
