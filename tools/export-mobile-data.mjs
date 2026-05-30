#!/usr/bin/env node
// Exportiert die Web-Dialektdaten als JSON-Asset für die Flutter-App.
// Single Source of Truth: dieselben Daten wie die Web-App, kein Hand-Copy.
//
// Aufruf:  node tools/export-mobile-data.mjs
// Ausgabe: mobile/assets/data/dialekte.json
//          mobile/assets/data/kategorien.json

import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { DIALEKTE } from '../data/dialekte.js';
import { KATEGORIEN } from '../data/kategorien.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'mobile', 'assets', 'data');

mkdirSync(OUT_DIR, { recursive: true });

// Schlanke, stabile Struktur für die App (nur was die Mobile-UI braucht).
const dialekte = DIALEKTE.map((d) => ({
  id: d.id,
  name: d.name,
  region: d.region,
  bundesland: d.bundesland ?? d.region,
  flag: d.flag,
  farbe: d.farbe,
  beschreibung: d.beschreibung ?? '',
  sprecher: d.sprecher ?? '',
  lang: d.lang ?? 'de-DE',
  ausdruecke: (d.ausdruecke ?? []).map((a) => ({
    id: a.id,
    ausdruck: a.ausdruck,
    hochdeutsch: a.hochdeutsch,
    bedeutung: a.bedeutung ?? '',
    beispiel: a.beispiel ?? '',
    beispiel_hd: a.beispiel_hd ?? '',
    kategorie: a.kategorie ?? '',
  })),
}));

const kategorien = Array.isArray(KATEGORIEN)
  ? KATEGORIEN
  : Object.entries(KATEGORIEN ?? {}).map(([id, v]) => ({ id, ...v }));

const totalAusdruecke = dialekte.reduce((n, d) => n + d.ausdruecke.length, 0);

writeFileSync(
  join(OUT_DIR, 'dialekte.json'),
  JSON.stringify({ version: 1, dialekte }, null, 0),
  'utf8',
);
writeFileSync(
  join(OUT_DIR, 'kategorien.json'),
  JSON.stringify({ version: 1, kategorien }, null, 0),
  'utf8',
);

console.log(`✓ ${dialekte.length} Dialekte · ${totalAusdruecke} Ausdrücke → mobile/assets/data/`);
