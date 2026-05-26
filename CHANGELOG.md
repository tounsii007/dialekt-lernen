# Changelog

Alle wesentlichen Änderungen an **Dialekto · Deutsche Dialekte lernen** werden hier dokumentiert.

Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
und das Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

## [Unreleased]

### Hinzugefügt — Wave 2-4 Features

**Audio-Lernmodi (5 neue Modi, gesamt 10):**
- Aussprache-Check via Web Speech Recognition (`pron`) mit Levenshtein-toleranter Bewertung
- Diktat-Modus (`diktat`) — TTS spielt Satz, User tippt mit
- Hörverständnis (`hoeren`) — nur Audio + 4 MC-Optionen
- Voice-Quiz (`voice-quiz`) — Hochdeutsch hören → Dialekt wählen
- Existierende: Klassisch, Reverse, MC, Type, Cloze, Audio

**Content & Discovery:**
- **IPA-Lautschrift** (`js/util/ipa.js`) mit Dialekt-Overrides (Schweizer χ, Kölner j-statt-g)
- **Idiom-Explorer** (`#/idiome`) — 290 Redensarten in 10 semantischen Clustern
- **Mini-Lektionen** (`#/lektionen`) — 10 kurze Artikel über Dialekt-Geschichte
- **Etymologie-Tab** in dialektDetail — Wortherkunft aus bedeutung extrahiert (479 Einträge)
- **Cross-Linking „Siehe auch"** in dialektDetail über `related-expressions.js`

**Mini-Spiele & Sammlung:**
- **Memory-Spiel** (`#/spiele`) — 4×4 / 6×6 mit XP-Reward
- **Sammlung / Pokédex** (`#/sammlung`) — freigeschaltete vs. silhouettierte Karten
- **Hangman-Logik** (`util/hangman.js`) bereit für UI-Integration

**Motivation & Rhythmus:**
- **Wochenrückblick** in Statistiken (KPI-Cards, Sparkline, Top-Dialekte, Empfehlungen)
- **Wöchentliche Challenges** (10 vorgefertigte, deterministische Wochen-Rotation)
- **Pomodoro-Timer** (15/25/45/90 min) mit Notifications + Pomodoro-Indikator
- **Langzeit-Lernziele** mit Deadlines + Progress-Tracking
- **Avatar-System** (15 freischaltbar, Bedingungen an Level + Dialekt-Besuche)
- **Saison-Modi** (Karneval/Wiesn/Advent) mit Home-Banner

**Power-User:**
- **Custom-Decks** (`#/decks`) — eigene Lern-Listen mit Farbe + Bulk-Add
- **Bulk-Aktionen** in Favoriten (Multi-Select, Remove, Add-to-Deck)
- **In-App-Editor** für Korrektur-Vorschläge → JSON-Export für GitHub-PR
- **PDF-Export** der Statistiken via `window.print()` + print-only-stylesheet
- **Share-Card 4 Formate**: square (1080×1080), portrait (1080×1350), story (1080×1920), landscape (1200×630)

**Analytics & Insights:**
- **Vergessenskurve** (Ebbinghaus-Modell) — Retention pro Karte + Cards-at-Risk
- **Tageszeit-Heatmap** 7×24 — „wann lernst du am besten"
- **Adaptive Empfehlungen** auf Home — KI-Vorschläge aus Schwächen + selten besuchten Dialekten

**a11y & i18n:**
- **DE/EN-Umschalter** (`🌐`-Toggle, ~50 UI-Strings)
- **High-Contrast-Theme** (signal-gelb auf schwarz, AAA-Focus-Ring)
- **Dyslexie-Modus** (OpenDyslexic-Schrift, erhöhtes Letter-/Word-Spacing)

**Tech:**
- **Web-Worker für SRS** (non-blocking SM-2 mit Sync-Fallback)
- **IndexedDB-Migration** für Notizen (write-through mit localStorage-Fallback)
- **WebGPU Voice-Visualization** (adapter+shader+RAF, Canvas2D-Fallback)
- **Push-Notifications** (`util/push.js` + `store/notifications.js`)
- **Manifest-Shortcuts** (4 PWA-Shortcuts: Daily, Lernen, Quiz, Vergleich)
- **Daily-Widget-Focus** via `?daily=1` URL-Param

**Polishing:**
- Enter-Taste prüft im Cloze + Type-Modus
- Themen-Lektionen mit Progress-Bar pro Kategorie
- Router schluckt InvalidStateError/AbortError aus View-Transitions

**Tests-Coverage:**
- 63 → **107 Tests** (+44): cloze, hangman, ipa, pronunciation, season, share-card, related-expressions, etymology

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
