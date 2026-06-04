// Dialekto · Version — Single Source of Truth.
//
// Bei jeder Release-Änderung HIER bumpen, dann
//   `node tools/sync-version.mjs`
// ausführen. Das aktualisiert sw.js automatisch (Cache-Key).

export const APP_VERSION = '2.1.53';

// Anzeige-String für Footer & Über-Dialoge.
export const APP_VERSION_LABEL = `v${APP_VERSION}`;

// Datenstand: wird durch tools/sync-version.mjs gepflegt.
export const DIALEKT_COUNT = 24;
export const AUSDRUCK_COUNT = 6700;

// Repository — wird für „Korrektur melden"-Links genutzt.
export const REPO_URL = 'https://github.com/tounsii007/dialekt-lernen';
export const ISSUES_URL = `${REPO_URL}/issues/new`;
