# Changelog

Alle wesentlichen Änderungen an **Dialekto · Deutsche Dialekte lernen** werden hier dokumentiert.

Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
und das Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

## [Unreleased]

### Hinzugefügt
- 1000-Ausdrücke-Achievement (`thousand` — "Dialekt-Legende")
- `CHANGELOG.md` (Keep-a-Changelog-Format)
- `CONTRIBUTING.md` mit Workflow für neue Dialekte
- `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1)

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
