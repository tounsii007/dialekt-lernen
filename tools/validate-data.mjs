#!/usr/bin/env node
// Compat-Shim — delegiert an den konsolidierten Validator.
// Existierende CI-Befehle wie `node tools/validate-data.mjs` funktionieren weiter.

import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const target = join(__dirname, 'validate.mjs');

const child = spawn(process.execPath, [target, ...process.argv.slice(2)], { stdio: 'inherit' });
child.on('exit', (code) => process.exit(code ?? 1));
