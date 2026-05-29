# Dialekto · Dimensionen-Audit

Bewertung der 10 Qualitäts-Dimensionen mit Ziel **mindestens 4.0 / 5.0** pro Dimension.

**Stand:** v2.0.0 · 13 Dialekte · 3.539 Ausdrücke · 519/519 Tests grün

---

## Übersicht

| # | Dimension | Stand | Ziel | Note |
|---|---|---|---|---|
| 1 | Test-Coverage | 57% Module, 519 Tests | ≥ 4.0 | **4.5** |
| 2 | CI/CD | 6 GitHub-Action-Jobs | ≥ 4.0 | **5.0** |
| 3 | Code-Qualität | Vanilla JS, zero deps, validiert | ≥ 4.0 | **4.5** |
| 4 | A11y | 0 Errors / 0 Warnings | ≥ 4.0 | **5.0** |
| 5 | Performance | Lazy-Load, 3.1 MB Total | ≥ 4.0 | **4.0** |
| 6 | PWA | Echte Icons, Update-Detection | ≥ 4.0 | **4.5** |
| 7 | Security | 0 Errors / 7 Warnings (innerHTML) | ≥ 4.0 | **4.5** |
| 8 | Doku | ARCHITECTURE.md, README, CONTRIBUTING | ≥ 4.0 | **4.5** |
| 9 | i18n | DE + EN komplett (50 Strings) | ≥ 4.0 | **4.0** |
| 10 | Daten | 13 Dialekte, 3.539 Ausdrücke | ≥ 4.0 | **4.5** |
| | **Gesamt** | | | **4.5 / 5.0** |

---

## 1. Test-Coverage — **4.5 / 5.0**

| Metrik | Wert |
|---|---|
| Tests | **519** |
| Pass | **519 (100%)** |
| Module-Coverage | **57%** (58/102) |
| Test-Kategorien | Unit · Integration · Frontend · A11y · Security · Bundle |

**Stärken:**
- Alle Kern-Module (state, srs, xp, goals, streak, achievements, favorites, learning, notes, transfer) sind in Tests
- Integration-Tests verifizieren verkettete Subsysteme (reviewCard → XP + Goals + Streak)
- Frontend-Tests mit FakeDOM (zero deps)
- A11y- und Security-Tests laufen in CI

**Lücken:**
- ~44 UI-Module ohne Tests (motion, modal, sounds, ripple, network, pwa etc.)
- Keine echten E2E-Tests mit Playwright/Cypress

**Skripte:** `npm test · npm run test:coverage · npm run test:integration · npm run test:frontend`

---

## 2. CI/CD — **5.0 / 5.0**

`.github/workflows/ci.yml` läuft auf jedem Push und PR mit **6 parallelen Jobs:**

| Job | Aufgabe |
|---|---|
| syntax-check | node --check für alle JS, JSON-Validation, html-validate |
| validate-data | Dialekt-Daten Schema-Check (validate.mjs) |
| a11y-audit | A11y-Audit (a11y-audit.mjs) |
| security-audit | Security-Scan (security-scan.mjs) |
| unit-tests | 519 Tests inkl. Coverage + Integration + Frontend separat |
| smoke-test | http-server + curl checks für Index/Daten/SW/Manifest |

**CI-Badge im README, Branch-Protection-fähig.**

---

## 3. Code-Qualität — **4.5 / 5.0**

**Architektur** (siehe ARCHITECTURE.md):
- Saubere Schichtung: views → store → util → data
- Single-Source-of-Truth für Version, Datenstand
- Reine Daten-Module (keine Side-Effects)
- Frameworkfrei, lesbar, debug-freundlich

**Standards:**
- ES Modules durchgängig
- JSDoc-Kommentare für Public APIs in kritischen Modulen (srs, xp, transfer, achievements)
- Konsistente Naming-Convention (camelCase, kebab-Datei-Namen)
- Keine `eval()`, `new Function()`, `document.write()` in Production-Code (Security-Scan-verifiziert)

**Lücken:**
- Kein Linter (eslint würde extra deps brauchen)
- 528 KB unminified Code

---

## 4. Accessibility — **5.0 / 5.0**

**A11y-Audit-Tool: 0 Errors, 0 Warnings.**

| Check | Status |
|---|---|
| `<html lang="de">` | ✓ |
| Semantic HTML (`<main>`, `<nav>`, `<header>`, `<footer>`) | ✓ |
| Skip-Link für Tastatur-Navigation | ✓ |
| `<noscript>`-Fallback | ✓ |
| viewport + viewport-fit für Notch | ✓ |
| aria-live für Toasts | ✓ |
| aria-label auf Mobile-Nav | ✓ |
| 129 Buttons in JS: alle mit aria-label/title oder Text | ✓ |
| `:focus-visible` Styles | ✓ |
| `prefers-reduced-motion` respektiert | ✓ |
| `prefers-color-scheme` respektiert | ✓ |
| Touch-Targets ≥ 44×44 (WCAG 2.5.5) | ✓ |
| `sr-only` Helper-Klasse | ✓ |

**13 dedizierte A11y-Tests** in tests/a11y.test.js · CI-integriert.

---

## 5. Performance — **4.0 / 5.0**

| Metrik | Wert |
|---|---|
| Total App Size | **3.09 MB** |
| Davon Code | 528 KB |
| Davon Daten | 2.33 MB (13 Dialekt-Files) |
| Davon HTML/CSS/SW/Manifest | 250 KB |
| Lazy-loaded Views | **9** (lernen, quiz, vergleich, decks, share, spiele, sammlung, idiome, lektionen) |

**Stärken:**
- Lazy-Loading für alle großen Views via dynamic import
- Service Worker mit Network-First + SWR-Strategien
- Bundle-Analyse-Tool zeigt Modul-Größen
- CSS-Minifier-Tool optional verfügbar (~30% Reduktion)

**Lücken:**
- Kein Tree-Shaking ohne Build-Step
- 225 KB ungeminifte CSS
- Dialekt-Daten 2.33 MB könnten lazy-geladen werden

**Skripte:** `npm run bundle-analyze · npm run minify-css`

---

## 6. PWA — **4.5 / 5.0**

| Feature | Status |
|---|---|
| Service Worker | ✓ (122 Assets im Precache) |
| Manifest | ✓ (alle Felder) |
| Echte SVG-Icons | ✓ (icons/icon.svg, icon-maskable.svg, favicon.svg) |
| Update-Detection | ✓ (Toast bei neuer SW-Version) |
| Offline-Funktion | ✓ (Network-First mit Fallback) |
| Install-Prompt | ✓ (beforeinstallprompt) |
| Theme-Color | ✓ |
| Shortcuts (4) | ✓ (Daily, Lernen, Quiz, Vergleich) |
| Maskable Icon | ✓ |

**Lücken:**
- Keine 192×192 PNG-Icons (SVG funktioniert in modernen Browsern)
- Push-Notifications-Skeleton vorhanden, aber nicht aktiv genutzt

---

## 7. Security — **4.5 / 5.0**

**Security-Scan: 0 Errors, 7 Warnings (alle dokumentiert).**

| Check | Status |
|---|---|
| Secrets-Scan | ✓ keine API-Keys/Tokens/Keys |
| Keine `eval()` | ✓ |
| Keine `new Function()` | ✓ |
| Keine `document.write()` | ✓ |
| CSP konfiguriert | ✓ (default-src 'self', no unsafe-eval) |
| object-src none | ✓ |
| frame-ancestors none | ✓ |
| base-uri self | ✓ |
| Pre-Commit-Hook | ✓ (install-hooks.mjs) |
| .gitignore | ✓ |

**Warnings:** 7 × `innerHTML mit dynamischen Daten` — alle in geprüften Code-Pfaden (escapeHtml-Helper verfügbar, Inhalte sind controlled).

**Dedizierte Security-Tests:** 11 Tests in tests/security.test.js.

---

## 8. Dokumentation — **4.5 / 5.0**

| Doku | Status |
|---|---|
| README.md | ✓ Badges, Stand 13 Dialekte / 3539 / 519 Tests |
| CHANGELOG.md | ✓ v2.0.0 vollständig dokumentiert |
| CONTRIBUTING.md | ✓ npm-Workflows, Datenqualitäts-Standards |
| ARCHITECTURE.md | ✓ Modul-Graph, Datenflüsse, Design-Entscheidungen |
| AUDIT.md | ✓ Dieses Dokument |
| SECURITY.md | ✓ |
| CODE_OF_CONDUCT.md | ✓ |
| LICENSE | ✓ Apache-2.0 |
| JSDoc-Kommentare | ✓ für Public APIs in srs/xp/transfer/achievements/forgetting-curve |
| In-Code-Kommentare | ✓ Header in jedem Modul mit Zweck + API |

**Lücken:**
- Kein dediziertes API-Reference (würde Doc-Generator brauchen)

---

## 9. i18n — **4.0 / 5.0**

`js/util/i18n.js` mit DE + EN.

| Feature | Status |
|---|---|
| `getLang()` / `setLang()` / `cycleLang()` | ✓ |
| `t('key')` mit Fallback auf DE und Key | ✓ |
| `applyHtmlLangAttr()` setzt `<html lang>` | ✓ |
| localStorage-Persistenz | ✓ |
| Reload-Trigger bei Sprachwechsel | ✓ |
| DE-Strings (~50) | ✓ |
| EN-Strings (~50, alle Keys gespiegelt) | ✓ |
| **DE/EN-Paritäts-Tests** (extrahieren aus Source) | ✓ |
| `topbar.lang`-Button | ✓ |

**Lücken:**
- Nicht alle UI-Strings durchgängig durch `t()` (inhaltliche Texte wie Dialekt-Erklärungen bleiben deutsch — bewusst)

---

## 10. Daten — **4.5 / 5.0**

| Dialekt | Ausdrücke |
|---|---|
| 🦁 Hessisch | 363 |
| 🐻 Berlinisch | 363 |
| 🥨 Bayerisch | 363 |
| 🎭 Kölsch | 309 |
| 🏔️ Schwizerdütsch | 265 |
| 🎻 Wienerisch | 264 |
| 🦅 Fränkisch | 264 |
| ⚪ Sächsisch | 262 |
| 🌲 Alemannisch | 259 |
| ⚒️ Ruhrdeutsch | 258 |
| 🦌 Schwäbisch | 256 |
| ⚓ Plattdeutsch | 253 |
| 🍷 Pfälzisch | 60 |
| **TOTAL** | **3.539** |

**Qualitäts-Kontrolle:**
- Validator-Tool prüft Schema, Duplikate, Punktuation, Bedeutungs-Länge, Cross-Dialekt
- Kategorien-Konsistenz erzwungen (16 Kategorien)
- ID-Format einheitlich (`prefix-NNN`)
- Pro Eintrag: ausdruck + hochdeutsch + bedeutung (≥80 Zeichen) + beispiel + beispiel_hd + kategorie + lang (BCP-47)

**Lücken:**
- Pfälzisch noch bei 60 (Etappen 3-10 für Parität mit 363 fehlen)

---

## Tools-Übersicht

```
npm test                    519 Tests
npm run test:coverage       Coverage-Report (57%)
npm run test:integration    Nur Integration-Tests
npm run test:frontend       Nur Frontend-Tests
npm run validate            Dialekt-Daten-Validator
npm run a11y                A11y-Audit (0 Errors)
npm run security            Security-Scan (0 Errors)
npm run bundle-analyze      Asset-Größen + Lazy-Load-Audit
npm run minify-css          Optionaler CSS-Minifier
npm run sync-version        Version-SoT-Sync
npm run dedupe              Dialekt-Duplikat-Entferner
npm run install-hooks       Pre-Commit-Hook installieren
npm run ci                  validate + a11y + security + test
npm run dev                 Lokaler Dev-Server (Port 5173)
```

---

## Gesamt-Bewertung

**4.5 / 5.0** — alle 10 Dimensionen erreichen oder übertreffen das **4.0**-Mindestziel.

Stärkste Dimensionen (5.0):
- **A11y** — 0 Errors, 0 Warnings, 13 dedizierte Tests
- **CI/CD** — 6 parallele Jobs, vollständige Coverage

Empfohlene nächste Verbesserungen:
1. Pfälzisch auf 363 ausbauen (Parität mit Top-3)
2. CSS-Minifier in optionalen Build-Step integrieren
3. Tests-Coverage von 57% auf 70%+ (44 weitere Module)
4. E2E-Tests mit Playwright (optional, wenn deps OK)
