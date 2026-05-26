# Beitragen zu Dialekto

Dialekto ist bewusst klein, datengetrieben und frameworkfrei. Der häufigste Beitrag ist das **Hinzufügen eines neuen Dialekts** oder neuer Ausdrücke — und das ist mit Absicht extrem einfach.

## Erste Schritte

1. Repo forken und klonen
2. Dev-Server starten:
   ```bash
   npm run dev
   # oder direkt:
   npx http-server . -p 5173
   ```
3. Im Browser `http://localhost:5173` öffnen — Live-Reload geht über Browser-Reload.

Es gibt absichtlich **keinen Bundler/Transpile-Step** in Production — die App
läuft als ES-Module-Web-App direkt aus dem Repo. NPM-Scripts sind nur für
Tests, Validator und Service-Worker-Sync nötig (Zero-Dep, Node ≥ 18).

## NPM-Scripts

```bash
npm run dev           # Lokaler Dev-Server (Port 5173, no-cache)
npm run validate      # Validiert alle Dialekt-Daten (Schema, Duplikate, Punktuation)
npm test              # Führt alle Unit-Tests aus (node --test)
npm run ci            # validate + test (für CI-Pipelines / Pre-Push)
npm run dedupe        # Entfernt Duplikate aus Dialekt-Daten
npm run sync-version  # Spiegelt js/version.js → sw.js (Cache-Key + Precache)
```

Vor einem PR bitte immer `npm run ci` durchlaufen lassen.

## Branch-Naming

- `feat/<kurz>` — neuer Dialekt, neue Funktion
- `fix/<kurz>` — Bug-Fix
- `data/<dialekt>` — Ausdrücke hinzufügen/korrigieren
- `docs/<kurz>` — nur Doku

## Commit-Messages

Wir folgen [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <kurze Zusammenfassung>
```

Beispiele:
- `feat(data): add Fränkisch dialect with 40 expressions`
- `fix(quiz): handle empty expression set for region mode`
- `data(bayerisch): add 12 more food-related expressions`

## Neuen Dialekt hinzufügen

Vollständiges Beispiel im [README](README.md#neuen-dialekt-hinzufügen). Kurz:

1. Datei in `data/dialekte/<dialekt>.js` anlegen, dem Dialekt-Schema entsprechend
2. In `data/dialekte.js` importieren und ans `DIALEKTE`-Array anhängen
3. Im Browser testen — die App rendert den neuen Dialekt automatisch in allen Views

### Datenqualitäts-Standards

- Jeder Ausdruck braucht eindeutige `id` (Convention: `<dialekt-prefix>-<nr>`, z. B. `fr-001`)
- `kategorie` muss in `data/kategorien.js` existieren — sonst dort vorher ergänzen
- `beispiel` und `beispiel_hd` als Pärchen — wenn eins, dann beide
- Lateinische Schreibweise für nicht-deutsche Lautungen, mit IPA optional
- Keine politisch belasteten / vulgären Ausdrücke ohne klare Kategorisierung (`schimpf`)

### Neue Kategorie

In `data/kategorien.js` ergänzen — Icon (Emoji), Label, ID. Die App rendert automatisch.

## Code-Standards

- **Reines JavaScript** — keine Build-Tools, keine Transpilation, keine Frameworks
- **ES Modules** (`import` / `export`) — kein CommonJS
- **CSS-Variablen** für Theming — neue Farben in `styles.css` als `--var-name`
- **DOM-Helper** aus `js/util.js` verwenden (kein direktes `document.querySelector`-Repeat)
- **Keine Dependencies** — wenn du eine Lib brauchst, frag erst per Issue

## Tests

Es gibt **63 Unit-Tests** in `tests/` (node --test, keine Dependencies):

```bash
npm test
```

Tests decken ab: `transfer.js` (Backup/Restore/CSV), `srs.js` (SM-2-Algorithmus),
`fuzzy.js` (Suche), `daily.js` (Tages-Seed), `feedback.js` (Issue-URL),
`speech.js` (Voice-Picker), `cloze.js` (Lückentext), `share-card.js` (PNG-Export).

Bei UI-Änderungen zusätzlich manuell prüfen:

- [ ] Neuer Dialekt erscheint in der Übersicht
- [ ] Karteikarten-Modi (normal/reverse/mc/type/cloze/audio) funktionieren
- [ ] Quiz funktioniert in allen drei Modi
- [ ] Suche findet die neuen Ausdrücke
- [ ] Favorit-Speicherung funktioniert
- [ ] Hell- und Dunkelmodus sehen beide gut aus
- [ ] Mobile-Layout (320, 375, 768, 1024, 1920 px) ist sauber
- [ ] Touch-Targets mindestens 44×44 auf coarse pointer

## Pull-Request-Checkliste

- [ ] Branch ist von `main` abgeleitet
- [ ] Commit-Messages folgen Conventional Commits
- [ ] `npm run ci` läuft grün (Validator + Tests)
- [ ] Manuelle Tests durchlaufen (s. o.)
- [ ] `CHANGELOG.md` unter `## [Unreleased]` aktualisiert
- [ ] Bei neuen Dialekten: mindestens 30 Ausdrücke quer durch ≥ 5 Kategorien,
      `lang`-Feld gesetzt (BCP-47), nach `data/dialekte.js` importiert
- [ ] Bei neuen Assets: `npm run sync-version` ausgeführt (aktualisiert SW-Precache)
- [ ] Keine `console.log()` im Produktiv-Code

## Sicherheit

Sicherheitsprobleme bitte **nicht** öffentlich melden — siehe [SECURITY.md](SECURITY.md).

## Lizenz

Beiträge werden unter der Projekt-Lizenz veröffentlicht — siehe [README](README.md#lizenz).
