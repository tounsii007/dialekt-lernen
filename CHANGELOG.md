# Changelog

Alle wesentlichen Änderungen an **Dialekto · Deutsche Dialekte lernen** werden hier dokumentiert.

Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
und das Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

## [Unreleased]

## [2.0.0] — 2026-05-26

Großes Release mit Schwachstellen-Audit + Behebung, neuen Features und
konsolidiertem Tooling. Daten wachsen auf **3.312 Ausdrücke** über **12 Dialekte**.

### Hinzugefügt
- **Drei neue Dialekte**: Fränkisch, Ruhrdeutsch, Alemannisch (insgesamt 9 → 12)
- **SRS / Spaced Repetition** (SM-2 Algorithmus, Anki-Style)
- **XP & Level-System** mit 10 Level-Titeln und Activity-Log
- **Tagesziele** (5/10/20/50 Karten) mit Aktivitäts-Heatmap
- **Karteikarten-Modi**: Multiple Choice, Tipp-Modus mit Toleranz, Audio-Only, Lückentext
- **Quiz-Sharing** als kompaktes URL-Token
- **CSV-Export** (Anki-kompatibel) für Favoriten oder alle Ausdrücke
- **Korrektur-Meldung** pro Ausdruck → vor-ausgefülltes GitHub-Issue
- **Dialekt-spezifische TTS**: `de-CH` für Schwizerdütsch, `de-AT` für Wienerisch,
  `nds` für Plattdeutsch; Voice-Picker mit Match-Prioritäten
- **Share-Card-Feature**: Expression-Card als PNG via Canvas + Web Share API
- **Statistiken-View** mit Quiz-Trend-Sparkline, Lern-Heatmap
- **Karte-View** mit geografischer Übersicht
- **Vergleichs-View**: gleicher Ausdruck quer durch alle Dialekte
- **Command-Palette / Fuzzy-Search** (typo-tolerant)
- **Sound-Effekte + Haptik-Feedback** mit Toggle
- **Farb-Paletten-Picker** (Original, Sunset, Ocean, Forest, Mono, Cherry)
- **Onboarding-Tour** für neue User
- **Eigene Notizen** pro Ausdruck (max. 280 Zeichen)
- **PWA-Updates**: vollständige Precache-Liste (87 Assets statt 5), Update-Detection
- **NPM-Scripts**: `dev`, `validate`, `test`, `sync-version`, `dedupe`, `ci`
- **63 Unit-Tests** (node --test, zero deps) — transfer, srs, fuzzy, daily, feedback, speech, cloze, share-card
- **CSP-Header** (`script-src 'self'`, Fonts whitelisted)
- **Noscript-Fallback-Banner**
- **`js/version.js`** als Single Source of Truth für App-Version + Datenstand
- **`tools/sync-version.mjs`** — spiegelt version.js → sw.js + auto-generiert Precache-Manifest

### Behoben
- **Backup-Datenverlust**: `exportState` / `importState` / `resetAllData` haben
  vorher `xp`, `goals`, `notes`, `preset` ignoriert
- **Service Worker** cachte vor v2.0 nur 5 Dateien — erster Offline-Besuch war broken
- **TTS** sprach alles als `de-DE` — jetzt korrekt nach Dialekt-Sprache
- **Mobile-Nav-CSS-Bug**: doppeltes `display: none` / `display: flex`
- **CSS-Inkonsistenz**: 10+ inkonsistente Breakpoints konsolidiert zu xs/sm/md/lg/xl/2xl/3xl
- **Horizontaler Scroll** durch Aurora-Background-Shapes
- **Touch-Targets** unter WCAG 2.5.5 (44×44) auf coarse pointer

### Geändert
- **Responsive Design** komplett überarbeitet — verifiziert auf 6 Viewports
  (320 / 375 / 430 / 768 / 1024 / 1920)
- **Snapshot-Format** auf v2 erhöht mit Deep-Validation
- **README** komplett neu — 12 Dialekte, alle Features, Release-Workflow
- **Validator-Konsolidierung**: `tools/validate.mjs` ist jetzt CI-tauglich,
  `validate-data.mjs` ist Compat-Shim
- **iOS Safe-Areas** in Topbar und Mobile-Nav berücksichtigt
- **Container-Cap** auf 1440px bei ≥1536px Viewports

## [1.0.0]

### Hinzugefügt
- 9 deutsche Dialekte vorinstalliert: Hessisch, Berlinisch, Bayerisch, Sächsisch,
  Schwäbisch, Kölsch, Plattdeutsch, Schweizerdeutsch, Wienerisch
- Karteikarten-Modus mit 3D-Flip-Animation und Schwierigkeits-Bewertung
- Quiz in drei Modi (Dialekt→Hochdeutsch, Hochdeutsch→Dialekt, Region erraten)
- Volltextsuche über alle Ausdrücke und Bedeutungen
- Favoriten mit localStorage-Persistenz
- Fortschritts-Tracking: Streak-Zähler, Lernstatistik, Quiz-Verlauf
- Sprach-Ausgabe via Web Speech API (Browser-TTS)
- Hell-/Dunkel-Theme (manuell + `prefers-color-scheme`)
- Tastatur-Shortcuts für schnelle Navigation
- Responsive Design (Mobile / Tablet / Desktop)
- Achievement-System mit Streak- und Count-Meilensteinen
- PWA via `manifest.webmanifest` und Service Worker (`sw.js`)
- Daily Expression auf der Startseite
- Frameworkfreie Implementierung in Vanilla JS / ES Modules
