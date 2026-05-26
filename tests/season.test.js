// Saison-Detection Tests

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getCurrentSeason, getSeasonInfo } from '../js/util/season.js';

describe('getCurrentSeason', () => {
  it('Mitte Februar 2026 → karneval', () => {
    assert.equal(getCurrentSeason(new Date('2026-02-15')), 'karneval');
  });

  it('25. September 2026 → wiesn', () => {
    assert.equal(getCurrentSeason(new Date('2026-09-25')), 'wiesn');
  });

  it('15. Dezember 2026 → advent', () => {
    assert.equal(getCurrentSeason(new Date('2026-12-15')), 'advent');
  });

  it('Juli (keine Saison)', () => {
    assert.equal(getCurrentSeason(new Date('2026-07-15')), null);
  });

  it('Aschermittwoch-Grenze: 18.02.2026 ist Karneval, 19.02. nicht', () => {
    // Easter 2026 = 5. April → Aschermittwoch = 18. Februar
    // Vor + am Aschermittwoch noch Karneval, danach nicht mehr.
    assert.equal(getCurrentSeason(new Date('2026-02-18')), 'karneval');
    assert.notEqual(getCurrentSeason(new Date('2026-02-19')), 'karneval');
  });
});

describe('getSeasonInfo', () => {
  it('returns info object für aktive Saison', () => {
    const info = getSeasonInfo('karneval');
    assert.ok(info);
    assert.equal(typeof info.label, 'string');
    assert.equal(typeof info.emoji, 'string');
  });

  it('returns null für ungültige Saison', () => {
    assert.equal(getSeasonInfo('nope'), null);
  });
});
