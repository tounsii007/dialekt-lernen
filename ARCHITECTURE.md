# Dialekto · Architektur

Ein Überblick über die Struktur, die Datenflüsse und die Design-Entscheidungen
der Dialekto-App.

## Übersicht

Dialekto ist eine **frameworkfreie Single-Page-PWA** in vanilla JavaScript
(ES Modules), die ohne Build-Step direkt aus dem Repository läuft.

```
┌────────────────────────────────────────────────────────────┐
│  Browser                                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  index.html                                           │  │
│  │  ├── <header> Topbar (nav, search, theme)            │  │
│  │  ├── <main> #app  (von Router gefüllt)               │  │
│  │  ├── <footer>                                         │  │
│  │  └── <nav> Mobile-Bottom-Nav                         │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  js/app.js — Init-Sequence                          │  │
│  │  └→ initTheme, initRouter, initSearch, initShortcuts │  │
│  │     initPwa, initNetwork, initXpHud, mountXpBar      │  │
│  └──────────────────────────────────────────────────────┘  │
│                            │                                │
│                            ▼                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Service Worker (sw.js)                              │  │
│  │  Network-First (Nav), SWR (Assets), Cache-First (Img)│  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
                            │
                            ▼ localStorage / IndexedDB
                       (alle User-Daten lokal)
```

## Verzeichnis-Layout

```
dialekt-lernen/
├── data/                       # Reine Daten (kein Code)
│   ├── dialekte.js             # DIALEKTE-Array + ALLE_AUSDRUECKE
│   ├── kategorien.js           # Kategorie-Definitionen
│   └── dialekte/
│       ├── hessisch.js
│       ├── bayerisch.js
│       └── …                   # 13 Dateien
├── js/
│   ├── app.js                  # Einstiegspunkt
│   ├── router.js               # Hash-Router + Lazy-Loading
│   ├── nav.js                  # Topbar-Nav-Sync
│   ├── search.js               # Command-Palette
│   ├── shortcuts.js            # Tastatur-Shortcuts
│   ├── store.js                # Store-Barrel (Re-Exports)
│   ├── theme.js                # Hell/Dunkel-Theme
│   ├── util.js                 # Util-Barrel
│   ├── version.js              # APP_VERSION SoT
│   ├── store/                  # Persistente Modell-Schicht
│   │   ├── state.js            # localStorage-Wrapper
│   │   ├── srs.js              # SM-2 Spaced Repetition
│   │   ├── xp.js               # XP- und Level-System
│   │   ├── goals.js            # Tagesziele
│   │   ├── streak.js           # Streak-Tracking
│   │   ├── achievements.js     # Achievement-Vergabe
│   │   ├── favorites.js        # Favoriten-Liste
│   │   ├── notes.js            # Persönliche Notizen
│   │   ├── transfer.js         # Export/Import/CSV
│   │   └── …
│   ├── util/                   # Hilfs-Funktionen
│   │   ├── dom.js              # el(), $, $$, escapeHtml
│   │   ├── fuzzy.js            # Fuzzy-Search-Engine
│   │   ├── text.js             # normalize() (Umlaut-tolerant)
│   │   ├── random.js           # shuffle, seededRandom
│   │   ├── route.js            # parseHash, go
│   │   ├── speech.js           # TTS mit Voice-Picker
│   │   ├── i18n.js             # DE/EN-Strings
│   │   ├── motion.js           # Animationen + Effekte
│   │   ├── modal.js            # Modal-System
│   │   ├── toast.js            # Toast-Notifications
│   │   ├── sounds.js           # SFX + Vibration
│   │   ├── feedback.js         # GitHub-Issue-Link
│   │   ├── share-card.js       # PNG-Export-Karten
│   │   ├── pomodoro.js         # Lern-Timer
│   │   ├── forgetting-curve.js # Ebbinghaus-Retention
│   │   ├── adaptive-plan.js    # Smart-Lernpläne
│   │   ├── time-heatmap.js     # Lernzeit-Analyse
│   │   ├── week-review.js      # Wochenrückblick
│   │   └── …
│   └── views/                  # Render-Funktionen je Route
│       ├── home.js
│       ├── entdecken.js
│       ├── dialektDetail.js
│       ├── lernen.js           # + lernen/{flashcard,setup,state,summary}.js
│       ├── quiz.js             # + quiz/{constants,question-builder,question,result,setup,state}.js
│       ├── favoriten.js
│       ├── karte.js
│       ├── vergleich.js
│       ├── statistiken.js
│       └── …
├── icons/                      # PWA-Icons
├── tools/                      # Dev-Tools (zero deps)
│   ├── validate.mjs            # Dialekt-Daten-Validator
│   ├── test.mjs                # Test-Runner mit Coverage
│   ├── sync-version.mjs        # Version-SoT-Sync
│   ├── a11y-audit.mjs          # Static A11y Check
│   ├── security-scan.mjs       # Secrets + Dangerous JS
│   ├── bundle-analyze.mjs      # Asset-Größen + Lazy-Load-Audit
│   ├── minify-css.mjs          # Optionaler CSS-Minifier
│   ├── install-hooks.mjs       # Git Pre-Commit Hook
│   └── dedupe.mjs              # Duplikat-Entferner für Dialekt-Daten
├── tests/                      # node --test, zero deps
│   ├── _setup.js               # Zentraler resetState + FakeDOM
│   ├── integration/            # Verkettete Subsystem-Tests
│   ├── frontend/               # DOM-Helper- und View-Smoke-Tests
│   └── *.test.js               # Unit-Tests pro Modul
├── .github/workflows/ci.yml    # 6 parallele CI-Jobs
├── index.html                  # Single-Page-Einstieg
├── styles.css                  # Design-System (~6.4k Zeilen)
├── sw.js                       # Service Worker
├── manifest.webmanifest        # PWA-Manifest
├── package.json                # NPM-Scripts (npm test, ci, validate, …)
└── README.md
```

## Datenflüsse

### 1. User lernt eine Karte

```
User klickt "Leicht" in Lernen-View
    ↓
flashcard.js: onRate(3) → lernen.js: rate(3)
    ↓
store/learning.js: setLernstand(d, a, 3)
    ↓
store/srs.js: reviewCard(d, a, RATING_EASY)
    │
    ├─→ persist()         (state.gelernt aktualisiert)
    ├─→ registerStreak()  (Tages-Streak +1)
    ├─→ awardXp(10, ...)  (XP-Vergabe, Event 'dialekto:xp')
    └─→ incrementGoalProgress(1)  (Goal-Tracking)
        │
        └─→ dispatchEvent('dialekto:goalmet')  (UI-Toast)
```

### 2. Backup-Lifecycle

```
exportState()                  resetAllData()              importState(snap)
   │                              │                              │
   ▼                              ▼                              ▼
state → JSON-Snapshot          state → Defaults              JSON → state
   │                                                            ▲
   ▼                                                            │
downloadStateFile()                                        Deep Validation:
   │                                                       isValidShape()
   ▼                                                       Pro Feld-Typ-Check
.json-Datei                                                    │
                                                                ▼
                                                       replace | merge
                                                       (XP-Max, Streak-Tagesmax,
                                                        Favoriten-Union, …)
```

### 3. Quiz-Lifecycle

```
QuizSetup → startQuiz({source, direction})
    ↓
question-builder.js: buildQuestion(item, pool, direction)
    ↓
state: setQuiz({questions, idx, score})
    ↓
renderQuizQuestion()  ─→  User klickt Option
    ↓                            ↓
correct/wrong markiert      onAnswer(value)
    ↓                            ↓
quiz.idx++                  saveQuizResult(score, total)
    ↓                            ↓
end of questions?           streak + xp + achievement-eval
    ↓
renderQuizResult()
```

## Design-Entscheidungen

### Kein Build-Step

Die App läuft als ES-Module-Web-App direkt aus dem Repository. Vorteile:

- **Niedrige Einstiegshürde** für Contributors
- **Keine Build-Konfiguration** zu warten
- **Lesbarer Code** im Browser-DevTools — keine Sourcemap-Tricks
- **Zero Dependencies** — kein npm install nötig, kein Lockfile-Drift

Nachteile (akzeptiert):
- 528 KB Code unminifiziert
- Kein Tree-Shaking, kein Dead-Code-Elimination
- Mehr HTTP-Requests (durch SW + HTTP/2 abgemildert)

### Zero NPM-Dependencies

Alle Tools nutzen nur das Node.js-Standard-Lib:
- Test-Runner: `node --test`
- HTTP-Server für Dev: `npx http-server@14` (transient)
- Validator/A11y/Security: eigene Implementierungen in `tools/`

### Datenzentriert

Dialekt-Daten sind reine JavaScript-Objekte mit klarem Schema. Die App
ist dadurch trivial **erweiterbar**: ein neuer Dialekt erfordert nur
eine neue Datei und einen Import in `data/dialekte.js`.

### Lokale Persistenz

- **localStorage**: Theme, Favoriten, SRS-Stand, XP, Goals, Streak
- **IndexedDB**: Notes (mit Migration aus localStorage)
- Keine Server, keine Konten, keine Datenschutz-Probleme

### PWA-First

- Service Worker mit kompletter Modul-Graphik im Precache (122 Assets)
- Update-Detection mit User-Toast bei neuer Version
- Manifest mit echten SVG-Icons (any + maskable + favicon)
- Offline funktioniert vollständig nach erstem Besuch

## Module-Ebenen

```
                  ┌────────────┐
                  │  index.html│
                  └─────┬──────┘
                        │
                        ▼
                  ┌────────────┐
                  │  app.js    │ ← Einstieg
                  └─────┬──────┘
                        │
            ┌───────────┼───────────┐
            ▼           ▼           ▼
        ┌──────┐   ┌──────┐    ┌──────┐
        │router│   │theme │    │search│
        └──┬───┘   └──────┘    └──────┘
           │
           ▼
        ┌──────────────────────┐
        │     views/*.js       │ ← Render-Schicht
        └──────────┬───────────┘
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
     ┌──────┐  ┌──────┐   ┌──────┐
     │store │  │ util │   │ data │
     └──┬───┘  └──────┘   └──────┘
        │
        ▼
   ┌─────────┐
   │ state.js│ ← localStorage
   └─────────┘
```

## Test-Architektur

```
tests/
├── _setup.js                # FakeDOM + resetState
├── *.test.js                # Unit-Tests (1 Modul pro File)
├── integration/             # Verkettete Subsystem-Tests
│   ├── srs-xp-goals.test.js     # reviewCard koppelt 4 Module
│   ├── backup-roundtrip.test.js # Export → Reset → Import
│   ├── achievement-flow.test.js # Lern-Aktionen triggern Achievements
│   └── quiz-flow.test.js        # buildQuestion + state-Management
└── frontend/                # FakeDOM-basierte UI-Tests
    ├── dom.test.js              # el(), $, $$, escapeHtml
    ├── partials.test.js         # renderExpressionCard
    └── view-smoke.test.js       # Render-Smoke-Tests
```

Coverage-Strategie:
- Pure-Logik-Module → 100% Coverage-Ziel
- UI-Module → Smoke-Tests + Importability-Check
- Browser-API-Module (PWA, Push, IDB) → Stub-Tests, akzeptierte Gaps

## Performance-Profil

| Metrik | Wert |
|--------|------|
| Code (JS) | 528 KB unminified |
| Daten (Dialekte) | 2.33 MB (lazy-loaded via Import) |
| HTML/CSS/SW/Manifest | 250 KB |
| **Total App Size** | **~3.1 MB** |
| Lazy-loaded Views | 9 (alle großen Views) |
| Test-Suite | 485 Tests, ~60s |

## CI-Pipeline (6 parallele Jobs)

```
push/PR auf main
    ↓
┌───────────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ syntax    │ validate  │ a11y     │ security │ unit     │ smoke    │
│ check     │ data      │ audit    │ audit    │ tests    │ test     │
└───────────┴───────────┴──────────┴──────────┴──────────┴──────────┘
    ↓           ↓           ↓          ↓          ↓          ↓
  node --check  Dialekt    HTML+CSS   Secrets+   485 Tests  http-server
  + html-val    Schema     +Buttons   Eval+CSP   +Coverage  +curl checks
```

## Wartungs-Workflows

```bash
# Neuer Dialekt
1. data/dialekte/<name>.js anlegen (siehe CONTRIBUTING.md)
2. In data/dialekte.js importieren
3. npm run validate
4. npm run sync-version
5. npm test

# Bug-Fix
1. tests/<modul>.test.js: failing test schreiben
2. Fix implementieren
3. npm run ci
4. Commit

# Release
1. js/version.js: APP_VERSION bumpen
2. CHANGELOG.md: Eintrag
3. npm run sync-version
4. git tag v<X.Y.Z>
5. git push --tags
```
