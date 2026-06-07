// Einmal-Helfer: übernimmt die vom i18n-Workflow gelieferten Keys
// (JSON mit { result: [{ keys: [{key,de,en,tr,fr,es}] }] }) zentral in die
// 5 Sprachtabellen von js/util/i18n.js. Dedupliziert + überspringt vorhandene.
// Aufruf: node tools/_apply-i18n.mjs <pfad-zur-workflow-output.json>

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const I18N = join(ROOT, 'js', 'util', 'i18n.js');
const LANGS = ['de', 'en', 'tr', 'fr', 'es'];

const outPath = process.argv[2];
if (!outPath) { console.error('Pfad zur Workflow-Output-JSON fehlt.'); process.exit(1); }

const data = JSON.parse(readFileSync(outPath, 'utf8'));
const views = Array.isArray(data) ? data : (data.result || []);

let content = readFileSync(I18N, 'utf8');

// Keys sammeln (dedupe + nur solche, die noch NICHT in i18n.js stehen).
const seen = new Set();
const keys = [];
for (const v of views) {
  for (const k of (v.keys || [])) {
    if (!k || !k.key || seen.has(k.key)) continue;
    seen.add(k.key);
    if (content.includes(`'${k.key}'`) || content.includes(`"${k.key}"`)) continue; // schon vorhanden
    if (!LANGS.every((l) => typeof k[l] === 'string')) continue; // unvollständig
    keys.push(k);
  }
}

if (!keys.length) { console.log('Keine neuen Keys einzufügen.'); process.exit(0); }

for (const lang of LANGS) {
  const block = keys.map((k) => `    ${JSON.stringify(k.key)}: ${JSON.stringify(k[lang])},`).join('\n');
  const re = new RegExp(`(\\n  ${lang}: \\{\\n)`);
  if (!re.test(content)) { console.error(`Sprachtabelle ${lang} nicht gefunden!`); process.exit(1); }
  content = content.replace(re, `$1    // — View-Keys (i18n-Workflow) —\n${block}\n`);
}

writeFileSync(I18N, content, 'utf8');
console.log(`${keys.length} neue Keys × ${LANGS.length} Sprachen in i18n.js eingefügt.`);
