# Dialekto · Native App (Flutter)

Native iOS- & Android-App für [Dialekto](../README.md). Übernimmt das Design der
Web-App (Brand-Lila, Glassmorphism, Fraunces/Inter) mit einer eigenen,
performanten Flutter-Oberfläche und nativem Splash Screen.

## Architektur

- **Single Source of Truth für Daten:** Die App lädt kein eigenes Datenset,
  sondern ein JSON-Asset, das aus den Web-Daten (`data/dialekte/*.js`)
  generiert wird:

  ```bash
  # vom Repo-Root:
  npm run export-mobile-data
  # → mobile/assets/data/dialekte.json  (13 Dialekte, ~3.500 Ausdrücke)
  ```

  Bei Änderungen an den Web-Dialektdaten einfach erneut ausführen.

- **Design-Tokens** (`lib/theme/app_theme.dart`) spiegeln `styles.css` (`:root`):
  Brand-/State-Farben, Gradienten, Radien, Abstände, Typografie.

- **Struktur**
  - `lib/theme/` — Design-System (Farben, Tokens, ThemeData hell/dunkel)
  - `lib/data/` — Modelle + Repository (lädt das JSON-Asset)
  - `lib/widgets/` — Aurora-Hintergrund, Glass-Card, Buttons, Logo, Dialekt-Karte
  - `lib/screens/` — Splash, App-Shell (Bottom-Nav), Home, Entdecken, Detail,
    Lernen (Flip-Karteikarten), Quiz/Favoriten (folgen)

## Splash Screen

Nativer Splash via [`flutter_native_splash`](https://pub.dev/packages/flutter_native_splash)
(Brand-Hintergrund `#1a1a2e`) → übergibt nahtlos an einen animierten In-App-Splash
(`lib/screens/splash_screen.dart`), der Logo + Wortmarke einblendet und dabei die
Daten lädt.

Neu generieren nach Config-Änderung (in `pubspec.yaml` unter `flutter_native_splash:`):

```bash
cd mobile
dart run flutter_native_splash:create
```

## Build & Run

Voraussetzung: Flutter SDK (>= 3.41), für iOS macOS/Xcode, für Android das Android SDK.

```bash
cd mobile
flutter pub get
flutter run                 # auf angeschlossenem Gerät/Emulator
flutter build apk           # Android
flutter build appbundle     # Android (Play Store)
flutter build ios           # iOS (nur unter macOS)
```

## Qualität

```bash
flutter analyze   # statische Analyse (lint-sauber)
flutter test      # Unit-Tests (Modelle, Hex-Farben)
```
