# Dialekto · Deutsche Dialekte lernen

Eine moderne, erweiterbare Web-App zum Lernen deutscher Dialekte aus verschiedenen Bundesländern und Regionen. Komplett auf Hochdeutsch erklärt.

## Features

- **9 Dialekte** vorinstalliert: Hessisch, Berlinisch, Bayerisch, Sächsisch, Schwäbisch, Kölsch, Plattdeutsch, Schweizerdeutsch, Wienerisch
- **Karteikarten-Modus** mit 3D-Flip-Animation und Bewertung (leicht/mittel/schwer)
- **Quiz** mit drei Modi: Dialekt → Hochdeutsch, Hochdeutsch → Dialekt, Region erraten
- **Suchfunktion** über alle Ausdrücke und Bedeutungen
- **Favoriten** zum Speichern wichtiger Ausdrücke
- **Fortschritt** mit Streak-Zähler, Lernstatistik und Quiz-Verlauf
- **Aussprache** über die Web Speech API (Browser-TTS)
- **Hell-/Dunkel-Modus** (manuell oder automatisch nach Systemvorgabe)
- **Tastatur-Shortcuts** für schnelle Navigation
- **Responsive Design** für Mobile, Tablet und Desktop
- **Lokal persistent**: Alles im Browser, kein Backend nötig

## Tastatur-Shortcuts

| Taste       | Aktion                              |
|-------------|-------------------------------------|
| `S` oder `/`| Suche öffnen                        |
| `T`         | Theme umschalten (hell/dunkel/auto) |
| `Esc`       | Suche schließen                     |
| `Leertaste` | Karteikarte umdrehen                |
| `1`/`2`/`3` | Karte bewerten / Quiz-Antwort       |
| `←`/`→`     | In Karteikarten navigieren          |

## Starten

```bash
# Mit beliebigem statischen Webserver, z. B.:
npx http-server . -p 5173
# oder
python -m http.server 5173
```

Anschließend `http://localhost:5173` im Browser öffnen.

> Wichtig: Die App nutzt ES Modules — daher muss sie über einen Webserver geladen werden, nicht direkt per `file://`.

## Neuen Dialekt hinzufügen

Die App ist bewusst erweiterbar:

1. Lege eine neue Datei in `data/dialekte/` an, z. B. `fraenkisch.js`.
2. Füge die Daten im gleichen Schema wie die bestehenden Dialekte ein:

```js
// data/dialekte/fraenkisch.js
export default {
  id: 'fraenkisch',
  name: 'Fränkisch',
  region: 'Franken (Nordbayern)',
  bundesland: 'Bayern',
  flag: '🍺',
  farbe: '#8b5cf6',
  beschreibung: 'Fränkisch wird im Norden Bayerns gesprochen…',
  sprecher: 'ca. 4 Mio.',
  ausdruecke: [
    {
      id: 'fr-001',
      ausdruck: 'Bassd scho',
      hochdeutsch: 'Passt schon',
      bedeutung: 'Universale fränkische Zustimmung, gelassen und freundlich.',
      beispiel: 'Bassd scho, gell?',
      beispiel_hd: 'Passt schon, oder?',
      kategorie: 'redensart'
    }
    // weitere Ausdrücke …
  ]
};
```

3. Importiere die Datei in `data/dialekte.js` und füge sie ins `DIALEKTE`-Array ein:

```js
import fraenkisch from './dialekte/fraenkisch.js';
export const DIALEKTE = [/* … */, fraenkisch];
```

Die App rendert den neuen Dialekt automatisch in allen Views (Übersicht, Suche, Karteikarten, Quiz, …).

### Kategorien

Verfügbare Kategorien (`a.kategorie`): siehe `data/kategorien.js`.
Neue Kategorien können dort einfach ergänzt werden.

## Projektstruktur

```
dialekt-lernen/
├── index.html                  # Einstiegspunkt
├── styles.css                  # Design-System (CSS-Variablen für Theming)
├── data/
│   ├── kategorien.js           # Globale Kategorien
│   ├── dialekte.js             # Zentrales Register aller Dialekte
│   └── dialekte/               # Einzelne Dialekt-Datendateien
│       ├── hessisch.js
│       ├── berlinisch.js
│       └── …
└── js/
    ├── app.js                  # Hauptmodul: Router, Theme, Suche, Shortcuts
    ├── store.js                # localStorage-Persistenz (Theme, Favoriten, Fortschritt)
    ├── util.js                 # Hilfsfunktionen, DOM-Helper, Web Speech
    └── views/
        ├── home.js             # Startseite mit Hero, Daily Expression
        ├── entdecken.js        # Dialekt-Übersicht
        ├── dialektDetail.js    # Einzelner Dialekt mit Filter
        ├── lernen.js           # Karteikarten-Modus
        ├── quiz.js             # Multiple-Choice-Quiz
        ├── favoriten.js        # Favoriten & Statistik
        └── partials.js         # Wiederverwendbare Komponenten
```

## Architektur

- **Frameworkfrei**: Reines HTML/CSS/JavaScript mit ES Modules.
- **Datengetrieben**: Dialekte und Kategorien sind reine Daten — die UI ergibt sich automatisch.
- **Lokale Persistenz**: localStorage für Theme, Favoriten, Lernfortschritt.
- **Web Standards**: `prefers-color-scheme`, Web Speech API, History/Hash-Router.

## Lizenz

Frei zur eigenen Nutzung und Erweiterung.
