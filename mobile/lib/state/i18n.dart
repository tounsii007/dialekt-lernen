/// Leichte UI-Internationalisierung (DE/EN) — Port von js/util/i18n.js.
///
/// Ansatz: prominente Chrome-Strings (Navigation, Überschriften, Buttons,
/// Einstellungen) als Key/Value. INHALTE (Dialekt-Erklärungen, Ausdrücke)
/// bleiben deutsch — Dialekto ist eine Lern-App FÜR deutsche Dialekte, eine
/// vollständige EN-Übersetzung der Inhalte wäre nicht sinnvoll. Der Switch ist
/// Komfort für nicht-deutschsprachige Lernende.
///
/// Fallback: fehlt ein Key in EN, kommt die DE-Version; fehlt der Key ganz,
/// wird der Key selbst zurückgegeben (sichtbar im Test/Debug).
library;

enum AppLang { de, en }

const Map<String, ({String de, String en})> kStrings = {
  // Navigation
  'nav.home': (de: 'Start', en: 'Home'),
  'nav.entdecken': (de: 'Entdecken', en: 'Explore'),
  'nav.lernen': (de: 'Lernen', en: 'Learn'),
  'nav.quiz': (de: 'Quiz', en: 'Quiz'),
  'nav.favoriten': (de: 'Favoriten', en: 'Favorites'),

  // Branding
  'brand.sub': (de: 'Deutsche Dialekte lernen', en: 'Learn German dialects'),

  // Einstellungen
  'settings.title': (de: 'Einstellungen', en: 'Settings'),
  'settings.appearance': (de: 'Darstellung', en: 'Appearance'),
  'settings.design': (de: 'Design', en: 'Theme'),
  'theme.system': (de: 'System', en: 'System'),
  'theme.light': (de: 'Hell', en: 'Light'),
  'theme.dark': (de: 'Dunkel', en: 'Dark'),
  'settings.language': (de: 'Sprache', en: 'Language'),
  'settings.language.note': (
    de: 'Die App-Oberfläche wird übersetzt; Inhalte bleiben Deutsch.',
    en: 'The app interface is translated; content stays in German.',
  ),
  'settings.scheduler': (de: 'Lernalgorithmus', en: 'Learning algorithm'),
  'settings.scheduler.label': (de: 'Scheduler', en: 'Scheduler'),
  'settings.retention': (de: 'Wunsch-Retention', en: 'Desired retention'),
  'settings.fuzz': (de: 'Intervalle streuen', en: 'Fuzz intervals'),
  'settings.about': (de: 'Über', en: 'About'),
  'settings.content': (de: 'Inhalte', en: 'Content'),
  'settings.app': (de: 'App', en: 'App'),
  'settings.about.text': (
    de: 'Deutsche Dialekte lernen — Karteikarten, Quiz & mehr. Lokal, ohne Konto.',
    en: 'Learn German dialects — flashcards, quiz & more. Local, no account.',
  ),

  // Häufige Aktionen
  'btn.cancel': (de: 'Abbrechen', en: 'Cancel'),
  'btn.save': (de: 'Speichern', en: 'Save'),
  'btn.delete': (de: 'Löschen', en: 'Delete'),
};

String tr(AppLang lang, String key) {
  final entry = kStrings[key];
  if (entry == null) return key;
  return switch (lang) {
    AppLang.en => entry.en,
    AppLang.de => entry.de,
  };
}

AppLang parseLang(String? code) => code == 'en' ? AppLang.en : AppLang.de;

String langCode(AppLang lang) => lang == AppLang.en ? 'en' : 'de';
