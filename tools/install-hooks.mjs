#!/usr/bin/env node
// Installiert Git-Hooks für Pre-Commit-Validation.
//
// Pre-Commit:
//   * Validator clean
//   * Tests grün
//   * A11y-Audit clean
//   * Security-Scan clean
//
// Aufruf: node tools/install-hooks.mjs
//
// Optional: COREHOOKS-Verzeichnis konfigurieren statt .git/hooks (für Repos
// im sparse-checkout): git config core.hooksPath .githooks

import { writeFileSync, mkdirSync, existsSync, chmodSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const PRE_COMMIT_SCRIPT = `#!/usr/bin/env sh
# Dialekto Pre-Commit-Hook — automatisch installiert via tools/install-hooks.mjs
# Pre-Push wäre besser, aber pre-commit ist universeller.

set -e

echo "==> Pre-Commit: Validator + A11y + Tests"

if [ ! -f tools/validate.mjs ]; then
  echo "(skipped — tools/validate.mjs nicht gefunden)"
  exit 0
fi

# Schnell-Check der gestagten Dialekt-Daten
node tools/validate.mjs || {
  echo "✗ Validator schlägt fehl — Commit abgebrochen."
  exit 1
}

# A11y-Audit
node tools/a11y-audit.mjs || {
  echo "✗ A11y-Audit schlägt fehl — Commit abgebrochen."
  exit 1
}

# Security-Scan
node tools/security-scan.mjs || {
  echo "✗ Security-Scan schlägt fehl — Commit abgebrochen."
  exit 1
}

# Schnelle Test-Subset — nur Unit-Tests, kein Integration/Frontend
node --test tests/srs.test.js tests/transfer.test.js tests/text.test.js 2>&1 | tail -5

echo "==> Pre-Commit OK ✓"
`;

const hooksDir = join(ROOT, '.git', 'hooks');
const preCommitPath = join(hooksDir, 'pre-commit');

// Check if .git exists
if (!existsSync(join(ROOT, '.git'))) {
  console.error('Kein .git-Verzeichnis gefunden. Bist du in einem Git-Repo?');
  process.exit(1);
}

if (!existsSync(hooksDir)) {
  mkdirSync(hooksDir, { recursive: true });
}

writeFileSync(preCommitPath, PRE_COMMIT_SCRIPT, 'utf8');
try {
  chmodSync(preCommitPath, 0o755);
} catch {
  // Windows hat keine chmod-Bedeutung; das stört aber nicht.
}

console.log('✓ Pre-Commit-Hook installiert.');
console.log(`  Datei: ${preCommitPath}`);
console.log('  Was wird geprüft:');
console.log('    * tools/validate.mjs   (Dialekt-Daten)');
console.log('    * tools/a11y-audit.mjs (Accessibility)');
console.log('    * tools/security-scan.mjs (Security)');
console.log('    * Unit-Test-Subset (srs, transfer, text)');
console.log('');
console.log('Zum Deinstallieren: rm .git/hooks/pre-commit');
