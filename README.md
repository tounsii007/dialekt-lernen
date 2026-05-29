# Dialekto · Deutsche Dialekte lernen

[![CI](https://github.com/tounsii007/dialekt-lernen/actions/workflows/ci.yml/badge.svg)](https://github.com/tounsii007/dialekt-lernen/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-377%20passing-success.svg)](tests/)
[![PWA](https://img.shields.io/badge/PWA-ready-purple.svg)](manifest.webmanifest)

Eine moderne, erweiterbare Web-App (PWA) zum Lernen deutscher Dialekte aus
verschiedenen Bundesländern und Regionen. Komplett auf Hochdeutsch erklärt,
ohne Backend — alle Daten bleiben lokal im Browser.

**Stand: 13 Dialekte · 3.509 Ausdrücke · 10 Lernmodi · 377 Tests**

## Features

### Lernen & Wiederholen (10 Modi!)
- **12 Dialekte** vorinstalliert: Hessisch, Berlinisch, Bayerisch, Sächsisch,
  Schwäbisch, Kölsch, Plattdeutsch, Schwizerdütsch, Wienerisch, Fränkisch,
  Ruhrdeutsch, Alemannisch
- **10 Karteikarten-Modi**:
  Klassisch · Umgekehrt · Multiple Choice · Tippen (mit Levenshtein-Toleranz) ·
  Lückentext · Audio · Aussprache (Speech Recognition) · Diktat ·
  Hörverständnis · Voice-Quiz
- **SM-2 Spaced-Repetition** — fällige Karten werden priorisiert,
  Easiness-Factor passt sich an (Anki-Style)
- **Quiz** in drei Modi: Dialekt → Hochdeutsch, Hochdeutsch → Dialekt,
  Region erraten — mit Timer-Modus
- **Themen-Lektionen** nach Kategorie quer durch alle Dialekte mit Progress-Bar
- **Custom-Decks** — eigene Lern-Listen mit Farbe und Bulk-Add
- **IPA-Lautschrift** zu jedem Ausdruck (mit Dialekt-Overrides)

### Discovery
- **Vergleich** — gleicher Ausdruck quer durch alle Dialekte
- **Karte** — geografische Übersicht
- **Idiom-Explorer** — 290 Redensarten in semantischen Clustern
- **Mini-Lektionen** — 10 kurze Artikel über Dialekt-Geschichte
- **Etymologie-Tab** — Wortherkunft pro Ausdruck (479 Einträge)
- **Sammlung / Pokédex** — freischaltbare Karten-Übersicht
- **Suche / Command-Palette** mit Fuzzy-Match (Tippfehler-tolerant)
- **Cross-Linking** „Siehe auch" — verwandte Ausdrücke in dialektDetail

### Spiele
- **Memory** (4×4 oder 6×6) mit XP-Reward
- **Hangman-Logik** (in `util/hangman.js`, UI optional)

### Engagement
- **XP & Level-System** — Erfahrungspunkte für jede Lernaktion, 10 Level-Titel
- **Achievements** — Meilensteine wie „Erste Karte", „7 Tage Streak"
- **Avatare** — 15 freischaltbare Insignien an Level + Dialekt-Bedingungen
- **Tagesziele** — 5 / 10 / 20 / 50 Karten pro Tag, Heatmap der Aktivität
- **Wöchentliche Challenges** — 3 rotierende Challenges (deterministisch pro Woche) mit XP-Reward
- **Langzeit-Ziele** — eigene Deadlines („200 Hessisch bis Weihnachten")
- **Pomodoro-Timer** — 15/25/45/90 min Sessions mit Pause-Notifications
- **Streak** — Anzahl aufeinanderfolgender Lerntage
- **Daily Expression** — täglich wechselnder „Ausdruck des Tages"
- **Saison-Modi** — Karneval / Wiesn / Advent mit Home-Banner und kuratierten Inhalten

### Analytics & Insights
- **Statistiken-Dashboard** — XP, Level, Streak, Quiz-Trend, Lern-Heatmap, SRS-Status
- **Wochenrückblick** — KPI-Cards, Tages-Sparkline, Top-Dialekte, Empfehlungen
- **Vergessenskurve** (Ebbinghaus) — Retention pro Karte + Cards-at-Risk
- **Tageszeit-Heatmap** 7×24 — „wann lernst du am besten"
- **Adaptive Empfehlungen** auf der Startseite (Schwächen + selten besucht)
- **PDF-Export** der Statistiken via `window.print()`

### Audio & UX
- **Sprach-spezifische TTS** — Schwizerdütsch nutzt `de-CH`-Stimme,
  Wienerisch `de-AT`, Plattdeutsch `nds` (Fallback auf `de-DE`)
- **Eigene Notizen** pro Ausdruck (max. 280 Zeichen)
- **Favoriten** zum Sammeln wichtiger Ausdrücke
- **Hell- / Dunkel-Modus** (manuell oder automatisch nach Systemvorgabe)
- **Farb-Paletten** zum Anpassen des Designs
- **Sound-Effekte** + Haptik bei Interaktion
- **Onboarding-Tour** für neue User
- **Tastatur-Shortcuts** für schnelle Navigation
- **Responsive Design** für Mobile, Tablet und Desktop

### Datenschutz & Offline
- **Lokal persistent** — alles im Browser (localStorage + IndexedDB für Notizen), kein Backend
- **PWA** — installierbar, voll offline-fähig (Service Worker)
- **Manifest-Shortcuts** — 4 PWA-Shortcuts (Daily, Lernen, Quiz, Vergleich)
- **Export / Import** — JSON-Backup, CSV/Anki-Export, PDF-Statistik-Druck
- **Karte als Bild teilen** — 4 Formate (Quadrat, Portrait, Story, Landscape)
- **Quiz-Sharing** — Ergebnis als kompaktes Token in der URL teilen
- **„Korrektur melden"** — falsche Übersetzungen direkt aus der App
  an das GitHub-Repo melden
- **In-App-Editor** — eigene Korrektur-Vorschläge lokal speichern + JSON-Export
- **Push-Notifications** — optionale tägliche Lern-Erinnerung

### Tech-Highlights
- **Frameworkfrei** — Vanilla JS + ES Modules
- **Zero Production-Dependencies** (nur `http-server` für Dev)
- **107 Unit-Tests** (node --test, zero deps)
- **Service Worker** mit Strategy-Mix + Auto-Update-Detection
- **Web-Worker für SRS** (non-blocking SM-2, Sync-Fallback)
- **WebGPU Voice-Visualization** mit Canvas2D-Fallback
- **CSP-Header** (`script-src 'self'`) + Referrer-Policy

## Tastatur-Shortcuts

| Taste        | Aktion                              |
|--------------|-------------------------------------|
| `S` / `/`    | Suche / Command-Palette öffnen      |
| `T`          | Theme umschalten (hell / dunkel)    |
| `M`          | Sounds ein/aus                      |
| `Esc`        | Suche schließen                     |
| `Leertaste`  | Karteikarte umdrehen                |
| `1` / `2` / `3` | Karte bewerten / Quiz-Antwort    |
| `←` / `→`    | In Karteikarten navigieren          |
| `Ctrl+Shift+V` | Daten-Validator-Report im Browser |

## Starten (Entwicklung)

```bash
# Mit npm script (startet http-server auf Port 5173):
npm run dev

# Oder mit beliebigem statischen Webserver:
npx http-server . -p 5173
python -m http.server 5173
```

Anschließend `http://localhost:5173` im Browser öffnen.

> Wichtig: Die App nutzt ES Modules — daher muss sie über einen Webserver
> geladen werden, nicht direkt per `file://`.

## NPM-Scripts

```bash
npm run dev           # Lokaler Dev-Server (http-server, Port 5173)
npm run validate      # Validiert alle Dialekt-Daten (Schema, IDs, Punktuation, …)
npm run dedupe        # Entfernt Duplikate aus Dialekt-Daten
npm run sync-version  # Spiegelt js/version.js → sw.js (Precache + Cache-Key)
npm test              # Führt alle Unit-Tests aus (node --test)
npm run ci            # validate + test (für CI-Pipelines)
```

## Release-Workflow

1. App-Version in [`js/version.js`](js/version.js) bumpen (`APP_VERSION`).
2. `npm run sync-version` ausführen — aktualisiert
   [`sw.js`](sw.js) (Cache-Key, Precache-Liste).
3. `npm run ci` — Validierung + Tests.
4. Commit + Push.

## Neuen Dialekt hinzufügen

Die App ist bewusst erweiterbar:

1. Lege eine neue Datei in [`data/dialekte/`](data/dialekte) an,
   z. B. `meindialekt.js`.
2. Füge die Daten im gleichen Schema wie die bestehenden Dialekte ein:

```js
// data/dialekte/meindialekt.js
export default {
  id: 'meindialekt',
  name: 'Mein Dialekt',
  region: 'Region X',
  bundesland: 'Bundesland Y',
  flag: '🦊',
  farbe: '#8b5cf6',
  beschreibung: 'Mein Dialekt wird in … gesprochen. Charakteristisch sind …',
  sprecher: 'ca. X Mio.',
  lang: 'de-DE', // BCP-47 für TTS (de-DE, de-CH, de-AT, nds, …)
  ausdruecke: [
    {
      id: 'md-001',
      ausdruck: 'Servus',
      hochdeutsch: 'Hallo',
      bedeutung: 'Universelle Begrüßung — mindestens 80 Zeichen Erklärung.',
      beispiel: 'Servus, wie geht\'s?',
      beispiel_hd: 'Hallo, wie geht es dir?',
      kategorie: 'begruessung',
    },
    // weitere Ausdrücke …
  ],
};
```

3. Importiere die Datei in [`data/dialekte.js`](data/dialekte.js)
   und füge sie ins `DIALEKTE`-Array ein:

```js
import meindialekt from './dialekte/meindialekt.js';
export const DIALEKTE = [/* … */, meindialekt];
```

4. `npm run validate` ausführen — prüft Schema, IDs, Kategorien, Punktuation.
5. `npm run sync-version` — fügt die neue Datei zum Service-Worker-Precache hinzu.

Die App rendert den neuen Dialekt automatisch in allen Views
(Übersicht, Suche, Karteikarten, Quiz, …).

### Kategorien

Verfügbare Kategorien (`a.kategorie`): siehe
[`data/kategorien.js`](data/kategorien.js).
Neue Kategorien können dort einfach ergänzt werden.

## Projektstruktur

```
dialekt-lernen/
├── index.html               # Einstiegspunkt + CSP + noscript-Fallback
├── styles.css               # Design-System (CSS-Variablen, Theming)
├── manifest.webmanifest     # PWA-Manifest
├── sw.js                    # Service Worker (auto-generierter Precache)
├── package.json             # NPM-Scripts (zero deps in production)
│
├── data/
│   ├── kategorien.js        # Globale Kategorien
│   ├── dialekte.js          # Zentrales Register aller Dialekte
│   └── dialekte/            # Einzelne Dialekt-Datendateien
│       ├── alemannisch.js
│       ├── bayerisch.js
│       └── …
│
├── js/
│   ├── app.js               # Einstiegspunkt: Init-Reihenfolge
│   ├── version.js           # Single-Source-of-Truth für die App-Version
│   ├── router.js            # Hash-Router, lazy-loadet schwere Views
│   ├── search.js            # Command-Palette
│   ├── nav.js               # Navigation + Mobile-Nav
│   ├── theme.js             # Theme + Paletten
│   ├── shortcuts.js         # Globale Tastatur-Shortcuts
│   ├── store.js             # Barrel-Export aller Store-Module
│   ├── util.js              # Barrel-Export der Util-Module
│   ├── store/               # Persistenter Zustand
│   │   ├── state.js         # localStorage-Wrapper + Defaults
│   │   ├── srs.js           # SM-2 Spaced-Repetition
│   │   ├── xp.js            # XP & Level
│   │   ├── goals.js         # Tagesziele
│   │   ├── achievements.js  # Achievements
│   │   ├── streak.js        # Streak-Tracking
│   │   ├── transfer.js      # Export / Import / CSV / Quiz-Share
│   │   └── …
│   ├── util/                # Hilfs-Module
│   │   ├── speech.js        # TTS mit Voice-Picker (lang-aware)
│   │   ├── feedback.js      # „Korrektur melden"
│   │   ├── fuzzy.js         # Fuzzy-Search-Index
│   │   ├── pwa.js           # PWA-Setup + Update-Detection
│   │   └── …
│   └── views/               # Renderer pro Route
│       ├── home.js
│       ├── entdecken.js
│       ├── dialektDetail.js
│       ├── lernen.js → lernen/
│       ├── quiz.js → quiz/
│       ├── favoriten.js     # + Daten-Tools (Backup, CSV-Export)
│       ├── statistiken.js
│       ├── karte.js
│       ├── vergleich.js
│       └── partials.js      # Wiederverwendbare Komponenten
│
├── tests/                   # Unit-Tests (node --test)
│   ├── transfer.test.js     # Export/Import/Reset/CSV/Quiz-Share
│   ├── srs.test.js          # SM-2-Algorithmus
│   ├── fuzzy.test.js        # Suche
│   ├── feedback.test.js     # Issue-URL-Builder
│   ├── speech.test.js       # Voice-Picker
│   └── daily.test.js
│
└── tools/                   # Build- und Wartungs-Skripte
    ├── validate.mjs         # Konsolidierter Daten-Validator
    ├── validate-data.mjs    # Compat-Shim → validate.mjs
    ├── dedupe.mjs           # Duplikat-Entferner
    ├── sync-version.mjs     # Spiegelt version.js → sw.js + Precache
    └── test.mjs             # Portabler Test-Runner
```

## Architektur

- **Frameworkfrei** — reines HTML/CSS/JavaScript mit ES Modules
- **Datengetrieben** — Dialekte und Kategorien sind reine Daten,
  die UI ergibt sich automatisch
- **Lokale Persistenz** — `localStorage` für Theme, Favoriten, SRS,
  XP, Goals, Achievements, Notizen, Quiz-Verlauf
- **PWA** — Service Worker mit Strategy-Mix:
  - Navigation: network-first → cache fallback
  - Statische Assets: stale-while-revalidate
  - Bilder: cache-first mit LRU-Limit
  - Fonts: stale-while-revalidate
- **Sicherheit** — strikte CSP-Header (`script-src 'self'`, Fonts whitelisted),
  Referrer-Policy `strict-origin-when-cross-origin`
- **Web Standards** — `prefers-color-scheme`, Web Speech API mit
  Voice-Picker, History/Hash-Router, View Transitions

## Beitragen

Inhaltliche Korrekturen (falsche Übersetzungen, Tippfehler, fehlende Beispiele)
können direkt aus der App heraus gemeldet werden — der Flaggen-Button auf jeder
Ausdrucks-Karte öffnet ein vor-ausgefülltes
[GitHub-Issue](https://github.com/tounsii007/dialekt-lernen/issues/new).

Code-Beiträge: Fork → Branch → PR. Bitte vorher `npm run ci` durchlaufen lassen.

Details: [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Lizenz

Siehe [`LICENSE`](LICENSE).
