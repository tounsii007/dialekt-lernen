// feedback.js — Issue-URL-Builder.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { buildCorrectionUrl } from '../js/util/feedback.js';

describe('buildCorrectionUrl', () => {
  const dialekt = { id: 'hessisch', name: 'Hessisch' };
  const ausdruck = {
    id: 'h-001',
    ausdruck: 'Ei guude',
    hochdeutsch: 'Hallo',
    kategorie: 'begruessung',
  };

  it('baut eine GitHub-Issues-URL', () => {
    const url = buildCorrectionUrl(dialekt, ausdruck);
    assert.match(url, /^https:\/\/github\.com\/.+\/issues\/new\?/);
  });

  it('enthält Title und Body als Query-Parameter', () => {
    const url = buildCorrectionUrl(dialekt, ausdruck);
    const parsed = new URL(url);
    assert.ok(parsed.searchParams.get('title').includes('Hessisch'));
    assert.ok(parsed.searchParams.get('title').includes('h-001'));
    assert.ok(parsed.searchParams.get('body').includes('Ei guude'));
    assert.ok(parsed.searchParams.get('body').includes('Hallo'));
  });

  it('setzt Labels für Triage', () => {
    const url = buildCorrectionUrl(dialekt, ausdruck);
    const parsed = new URL(url);
    assert.match(parsed.searchParams.get('labels'), /data/);
  });
});
