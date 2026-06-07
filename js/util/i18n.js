// Einfache UI-Internationalisierung (DE/EN).
//
// Ansatz: prominente UI-Strings (Navigation, Hauptüberschriften, Buttons,
// Toast-Messages) werden als Key/Value abgelegt. Inhaltliche Texte (Dialekt-
// Erklärungen, Datenbeschreibungen) bleiben deutsch — Dialekto ist eine
// deutsche Dialekt-Lern-App, eine vollständige EN-Übersetzung wäre nicht
// sinnvoll. Der Switch dient als Komfort für nicht-deutsche Lerner, die
// die App-UI auf Englisch bedienen möchten.
//
// API: `t('home.title')` → übersetzt
// Persistenz: `localStorage` als `dialekto:lang`
// Sprache wechseln: `setLang('en')` → erzwingt page reload
// Fallback: wenn Key in der gewählten Sprache fehlt, gibt deutsche Version.

const STORAGE_KEY = 'dialekto:lang';
const DEFAULT_LANG = 'de';
export const SUPPORTED = ['de', 'en', 'tr', 'fr', 'es'];
export const LANGUAGE_NAMES = {
  de: 'Deutsch', en: 'English', tr: 'Türkçe', fr: 'Français', es: 'Español'
};

const STRINGS = {
  de: {
    // — View-Keys (i18n-Workflow) —
    "view.liga.zonePromotion": "Aufstiegsplatz",
    "view.liga.zoneDemotion": "Abstiegsgefahr",
    "view.liga.zoneHold": "Gehalten",
    "view.liga.heroEyebrow": "Deine Liga",
    "view.liga.tierLiga": "{name}-Liga",
    "view.liga.rankOf": "Rang {rank} von {total}",
    "view.liga.xpThisWeek": "XP diese Woche",
    "view.liga.week": "Woche",
    "view.liga.hintTopTier": "Du bist in der höchsten Liga — halte die Spitze!",
    "view.liga.hintInPromo": "Stark! Halte einen Platz unter den Top {n}, um aufzusteigen.",
    "view.liga.hintToPromo": "Komme unter die Top {n}",
    "view.liga.hintToPromoXp": " — noch {xp} XP bis zur Aufstiegslinie",
    "view.liga.privacyNote": "Alle Mitstreiter sind lokal erzeugte Übungs-Geister. Keine Konten, kein Tracking, keine Daten verlassen dein Gerät.",
    "view.liga.backHome": "Zur Startseite",
    "view.liga.promotedTitle": "Aufgestiegen in die {name}-Liga!",
    "view.liga.demotedTitle": "Abgestiegen in die {name}-Liga",
    "view.liga.promotedSub": "Platz {rank} in der {name}-Liga — weiter so!",
    "view.liga.demotedSub": "Platz {rank} in der {name}-Liga. Nächste Woche zurückholen!",
    "view.liga.tiersTitle": "Liga-Stufen",
    "view.liga.bestTier": "Höchste erreichte Stufe: {tier}",
    "view.liga.boardTitle": "Rangliste der Woche",
    "view.liga.boardLede": "Sammle XP durch Lernen — die Plätze aktualisieren sich über die Woche.",
    "view.liga.dividerPromote": "Aufstieg — Top {n}",
    "view.liga.dividerDemote": "Abstiegszone",
    "view.liga.you": "Du",
    "view.lernpfad.title": "Lernpfad",
    "view.lernpfad.lede": "Deine geführte Reise durch die Mundarten — meistere einen Dialekt, um den nächsten freizuschalten.",
    "view.lernpfad.allComplete": "Alle Dialekte gemeistert!",
    "view.lernpfad.progress": "{n} von {total} Dialekten gemeistert",
    "view.lernpfad.currentHint": "Aktuell: {flag} {name} — noch {n} Ausdrücke bis zur Meisterung.",
    "view.lernpfad.legendMastered": "gemeistert",
    "view.lernpfad.legendActive": "aktiv",
    "view.lernpfad.legendLocked": "gesperrt",
    "view.lernpfad.legendGoal": "Ziel: {n} Ausdrücke pro Dialekt",
    "view.lernpfad.lockedToast": "{name} ist noch gesperrt — meistere zuerst den vorherigen Dialekt.",
    "view.lernpfad.nodeAriaOpen": "{name} lernen — {n} von {goal} gelernt",
    "view.lernpfad.nodeAriaLocked": "{name} gesperrt — meistere zuerst den vorherigen Dialekt",
    "view.lernpfad.nodeTitleLocked": "{name} (gesperrt)",
    "view.lernpfad.subMastered": "Gemeistert",
    "view.lernpfad.subLocked": "Gesperrt",
    "view.lernpfad.start": "Start",
    "view.setup.title": "🎯 Quiz",
    "view.setup.lede": "{n} Multiple-Choice-Fragen. Genauigkeit gesamt: {acc}%",
    "view.setup.timerLabel": "⏱️ 20-Sekunden-Timer {state}",
    "view.setup.on": "ein",
    "view.setup.off": "aus",
    "view.setup.mode.mixed.name": "Bunt gemischt",
    "view.setup.mode.mixed.desc": "Was bedeutet der Dialekt-Ausdruck auf Hochdeutsch?",
    "view.setup.mode.reverse.name": "Umgekehrt",
    "view.setup.mode.reverse.region": "Hochdeutsch → Dialekt",
    "view.setup.mode.reverse.desc": "Welcher Dialekt-Ausdruck passt zur Hochdeutsch-Bedeutung?",
    "view.setup.mode.region.name": "Wo wird das gesprochen?",
    "view.setup.mode.region.region": "Region erraten",
    "view.setup.mode.region.desc": "Aus welcher Region stammt dieser Ausdruck?",
    "view.setup.mode.dialekt.desc": "Teste dein {name}-Wissen.",
    "view.setup.cardCount": "{n} Fragen",
    "view.result.headlineExcellent": "Hervorragend!",
    "view.result.headlineGreat": "Sehr gut!",
    "view.result.headlineSolid": "Solide Leistung",
    "view.result.headlinePractice": "Übung macht den Meister",
    "view.result.ringAria": "Quiz-Ergebnis: {n} Prozent richtig",
    "view.result.scoreLine": "{score} von {total} Fragen richtig.",
    "view.result.retry": "Nochmal",
    "view.result.another": "Anderes Quiz",
    "view.result.share": "🔗 Teilen",
    "view.result.shareLinkError": "Share-Link konnte nicht erstellt werden.",
    "view.result.shareTitle": "Mein Dialekto-Quiz-Resultat",
    "view.result.shareText": "Ich habe {score}/{total} im Dialekto-Quiz!",
    "view.result.linkCopied": "Link kopiert 📋",
    "view.result.linkFallback": "Link: {url}",
    "view.question.points": "{n} Punkte",
    "view.question.label": "Was bedeutet",
    "view.question.listen": "Anhören",
    "view.question.listenAria": "„{term}\" anhören",
    "view.question.optionsAria": "Antwortmöglichkeiten",
    "view.adaptive.title": "📈 Heute empfohlen",
    "view.adaptive.lede": "Personalisiert — Karten, die jetzt den meisten Lerneffekt bringen.",
    "view.adaptive.cta": "Diese {n} jetzt lernen →",
    "view.adaptive.ctaTitle": "Diese Empfehlungen direkt in einer Karteikarten-Session lernen",
    "view.adaptive.prio.urgent": "🔥 Dringend",
    "view.adaptive.prio.weak": "⚠️ Schwach",
    "view.adaptive.prio.new": "🆕 Neu",
    "view.adaptive.prio.refresh": "✨ Auffrischung",
    "view.challenges.title": "Diese Woche",
    "view.challenges.lede": "Drei Mini-Challenges — neu jeden Montag.",
    "view.challenges.pomodoroStart": "Pomodoro-Lern-Session starten",
    "view.challenges.pomodoroStop": "⏸ Pomodoro stoppen",
    "view.challenges.pomodoroToggle": "⏱ Pomodoro starten",
    "view.challenges.done": "✓ erledigt",
    "view.daily.eyebrowFocus": "🌟 Heutiger Ausdruck",
    "view.daily.eyebrow": "☀️ Ausdruck des Tages",
    "view.daily.listen": "Anhören",
    "view.daily.toDialect": "Zum Dialekt",
    "view.daily.startFlashcards": "Karteikarten starten →",
    "view.daily.openDialect": "{flag} {name} öffnen",
    "view.fakt.aria": "Dialekt-Wissen",
    "view.fakt.eyebrow": "Wusstest du?",
    "view.features.sectionAria": "App-Features-Übersicht",
    "view.features.title": "Was kannst du hier tun?",
    "view.features.f1Title": "Ausdrücke entdecken — ",
    "view.features.f1Desc": "Browse durch hunderte Wörter und Redewendungen aus allen Regionen.",
    "view.features.f2Title": "Karteikarten — ",
    "view.features.f2Desc": "Lerne wie mit Anki: vorne der Dialekt, hinten die Bedeutung auf Hochdeutsch.",
    "view.features.f3Title": "Quiz — ",
    "view.features.f3Desc": "Teste dein Wissen mit Multiple-Choice-Fragen.",
    "view.features.f4Title": "Aussprache — ",
    "view.features.f4Desc": "Höre dir Ausdrücke per Sprachsynthese vor.",
    "view.features.f5Title": "Favoriten — ",
    "view.features.f5Desc": "Speichere deine Lieblingsausdrücke für später.",
    "view.features.shortcutsTitle": "Tastatur-Shortcuts",
    "view.features.scSearch": "— Suche öffnen",
    "view.features.scTheme": "— Hell/Dunkel umschalten",
    "view.features.scNav": "— In Karteikarten navigieren",
    "view.features.keySpace": "Leertaste ",
    "view.features.scFlip": "— Karteikarte umdrehen",
    "view.features.scQuiz": "— Im Quiz auswählen",
    // Navigation
    'nav.home':       'Start',
    'nav.entdecken':  'Entdecken',
    'nav.lernen':     'Lernen',
    'nav.quiz':       'Quiz',
    'nav.vergleich':  'Vergleich',
    'nav.karte':      'Karte',
    'nav.favoriten':  'Favoriten',

    // Branding
    'brand.name':     'Dialekto',
    'brand.sub':      'Deutsche Dialekte lernen',

    // Hero
    'home.title':                  'Dialekto',
    'home.hero.eyebrow':           'Deutsche Sprachvielfalt entdecken',
    'home.hero.cta.discover':      'Dialekte entdecken',
    'home.hero.cta.learn':         'Karteikarten lernen',
    'home.hero.cta.quiz':          'Quiz starten',
    'home.hero.headline':          'Sprich wie die Einheimischen.',
    'home.hero.lede':              'Über 6700 Ausdrücke aus 24 Regionen: lerne mit Karteikarten, höre die Aussprache und teste dich im Quiz — verständlich auf Hochdeutsch erklärt.',
    'home.dashboard.lede':         'Personalisierte Empfehlungen basierend auf deinem Lernstand.',
    'home.dailyGoal.title':        'Heutiges Ziel',
    'home.dailyGoal.lede':         'Passe dein tägliches Lernpensum an — bleib im Rhythmus!',
    // Views: Entdecken + generische Zähler/Länder (wiederverwendbar)
    'view.entdecken.title': 'Dialekte entdecken',
    'view.entdecken.lede': '{n} Regionen · Filtere nach Sprachraum oder suche direkt.',
    'view.entdecken.search': 'Dialekt oder Region suchen…',
    'view.entdecken.emptyTitle': 'Keine Dialekte gefunden',
    'view.entdecken.emptyMeta': 'Probier ein anderes Wort, einen anderen Sprachraum oder leere das Suchfeld.',
    'country.all': 'Alle', 'country.de': 'Deutschland', 'country.at': 'Österreich', 'country.ch': 'Schweiz',
    'count.treffer': '{n} Treffer', 'count.dialekt': '{n} Dialekt', 'count.dialekte': '{n} Dialekte',
    'common.all': 'Alle',
    'view.vergleich.title': 'Dialekt-Vergleich',
    'view.vergleich.lede': 'Wie sagt man dasselbe in verschiedenen Regionen? Hier sind Ausdrücke gruppiert nach Bedeutung.',
    'view.vergleich.emptyTitle': 'Keine Gruppen in dieser Kategorie',
    'view.vergleich.emptyMeta': 'Wechsle auf „Alle" — die meisten Gruppen entstehen quer über Kategorien hinweg.',

    // Stats
    'stats.dialekte':              'Dialekte',
    'stats.ausdruecke':            'Ausdrücke',
    'stats.gelernt':               'gelernt',
    'stats.streak':                'Tage Streak',

    // Buttons / Aktionen
    'btn.start':                   'Lernen starten',
    'btn.share':                   'Karte teilen',
    'btn.close':                   'Schließen',
    'btn.cancel':                  'Abbrechen',
    'btn.save':                    'Speichern',
    'btn.copy':                    'Kopieren',
    'btn.download':                'Herunterladen',
    'btn.continue':                'Weiter',
    'btn.back':                    'Zurück',

    // Topbar / Toggles
    'topbar.search':               'Suchen oder springen…',
    'topbar.theme':                'Hell/Dunkel umschalten',
    'topbar.palette':              'Farbpalette',
    'topbar.sound':                'Sounds ein/aus',
    'topbar.lang':                 'Sprache wechseln',
    'topbar.dyslexic':             'Dyslexie-freundliche Schrift',

    // Themes / Modi
    'theme.light':                 'Hell',
    'theme.dark':                  'Dunkel',
    'theme.auto':                  'Automatisch',

    // Toasts
    'toast.sound.on':              'Sounds an',
    'toast.sound.off':             'Sounds aus',
    'toast.lang.changed':          'Sprache geändert',
    'toast.dyslexic.on':           'Dyslexie-Schrift an',
    'toast.dyslexic.off':          'Dyslexie-Schrift aus',
    'toast.copied':                'In die Zwischenablage kopiert',
    'toast.saved':                 'Gespeichert',
    'toast.error':                 'Ein Fehler ist aufgetreten',

    // Sections
    'section.alleDialekte':        'Alle Dialekte',
    'section.dashboard':           'Dein Dashboard',
    'section.heuteFaellig':        'Heute fällig',
    'section.dailyExpr':           'Ausdruck des Tages',

    // Erweiterte Navigation + Topbar
    'nav.mehr': 'Mehr', 'nav.lernpfad': 'Lernpfad', 'nav.shadowing': 'Shadowing',
    'nav.klangpaare': 'Klangpaare', 'nav.spiele': 'Spiele', 'nav.idiome': 'Idiome',
    'nav.lektionen': 'Lektionen', 'nav.decks': 'Decks',
    'topbar.settings': 'Einstellungen', 'topbar.menu': 'Menü', 'a11y.skip': 'Zum Inhalt springen',
  },

  en: {
    // — View-Keys (i18n-Workflow) —
    "view.liga.zonePromotion": "Promotion spot",
    "view.liga.zoneDemotion": "Relegation risk",
    "view.liga.zoneHold": "Holding",
    "view.liga.heroEyebrow": "Your league",
    "view.liga.tierLiga": "{name} League",
    "view.liga.rankOf": "Rank {rank} of {total}",
    "view.liga.xpThisWeek": "XP this week",
    "view.liga.week": "Week",
    "view.liga.hintTopTier": "You're in the top league — hold on to the top!",
    "view.liga.hintInPromo": "Great! Stay in the top {n} to get promoted.",
    "view.liga.hintToPromo": "Get into the top {n}",
    "view.liga.hintToPromoXp": " — {xp} XP to go until the promotion line",
    "view.liga.privacyNote": "All competitors are locally generated practice ghosts. No accounts, no tracking, no data leaves your device.",
    "view.liga.backHome": "Back to home",
    "view.liga.promotedTitle": "Promoted to the {name} League!",
    "view.liga.demotedTitle": "Relegated to the {name} League",
    "view.liga.promotedSub": "Rank {rank} in the {name} League — keep it up!",
    "view.liga.demotedSub": "Rank {rank} in the {name} League. Win it back next week!",
    "view.liga.tiersTitle": "League tiers",
    "view.liga.bestTier": "Highest tier reached: {tier}",
    "view.liga.boardTitle": "Weekly leaderboard",
    "view.liga.boardLede": "Earn XP by learning — the rankings update over the week.",
    "view.liga.dividerPromote": "Promotion — Top {n}",
    "view.liga.dividerDemote": "Relegation zone",
    "view.liga.you": "You",
    "view.lernpfad.title": "Learning path",
    "view.lernpfad.lede": "Your guided journey through the dialects — master one dialect to unlock the next.",
    "view.lernpfad.allComplete": "All dialects mastered!",
    "view.lernpfad.progress": "{n} of {total} dialects mastered",
    "view.lernpfad.currentHint": "Current: {flag} {name} — {n} expressions left until mastery.",
    "view.lernpfad.legendMastered": "mastered",
    "view.lernpfad.legendActive": "active",
    "view.lernpfad.legendLocked": "locked",
    "view.lernpfad.legendGoal": "Goal: {n} expressions per dialect",
    "view.lernpfad.lockedToast": "{name} is still locked — master the previous dialect first.",
    "view.lernpfad.nodeAriaOpen": "Learn {name} — {n} of {goal} learned",
    "view.lernpfad.nodeAriaLocked": "{name} locked — master the previous dialect first",
    "view.lernpfad.nodeTitleLocked": "{name} (locked)",
    "view.lernpfad.subMastered": "Mastered",
    "view.lernpfad.subLocked": "Locked",
    "view.lernpfad.start": "Start",
    "view.setup.title": "🎯 Quiz",
    "view.setup.lede": "{n} multiple-choice questions. Overall accuracy: {acc}%",
    "view.setup.timerLabel": "⏱️ 20-second timer {state}",
    "view.setup.on": "on",
    "view.setup.off": "off",
    "view.setup.mode.mixed.name": "Mixed bag",
    "view.setup.mode.mixed.desc": "What does the dialect expression mean in standard German?",
    "view.setup.mode.reverse.name": "Reverse",
    "view.setup.mode.reverse.region": "Standard German → dialect",
    "view.setup.mode.reverse.desc": "Which dialect expression matches the standard German meaning?",
    "view.setup.mode.region.name": "Where is this spoken?",
    "view.setup.mode.region.region": "Guess the region",
    "view.setup.mode.region.desc": "Which region does this expression come from?",
    "view.setup.mode.dialekt.desc": "Test your {name} knowledge.",
    "view.setup.cardCount": "{n} questions",
    "view.result.headlineExcellent": "Excellent!",
    "view.result.headlineGreat": "Very good!",
    "view.result.headlineSolid": "Solid effort",
    "view.result.headlinePractice": "Practice makes perfect",
    "view.result.ringAria": "Quiz result: {n} percent correct",
    "view.result.scoreLine": "{score} of {total} questions correct.",
    "view.result.retry": "Retry",
    "view.result.another": "Another quiz",
    "view.result.share": "🔗 Share",
    "view.result.shareLinkError": "Share link could not be created.",
    "view.result.shareTitle": "My Dialekto quiz result",
    "view.result.shareText": "I scored {score}/{total} in the Dialekto quiz!",
    "view.result.linkCopied": "Link copied 📋",
    "view.result.linkFallback": "Link: {url}",
    "view.question.points": "{n} points",
    "view.question.label": "What does this mean",
    "view.question.listen": "Listen",
    "view.question.listenAria": "Listen to “{term}”",
    "view.question.optionsAria": "Answer options",
    "view.adaptive.title": "📈 Recommended today",
    "view.adaptive.lede": "Personalised — cards that give you the most learning benefit right now.",
    "view.adaptive.cta": "Learn these {n} now →",
    "view.adaptive.ctaTitle": "Learn these recommendations directly in a flashcard session",
    "view.adaptive.prio.urgent": "🔥 Urgent",
    "view.adaptive.prio.weak": "⚠️ Weak",
    "view.adaptive.prio.new": "🆕 New",
    "view.adaptive.prio.refresh": "✨ Refresher",
    "view.challenges.title": "This week",
    "view.challenges.lede": "Three mini challenges — new every Monday.",
    "view.challenges.pomodoroStart": "Start a Pomodoro study session",
    "view.challenges.pomodoroStop": "⏸ Stop Pomodoro",
    "view.challenges.pomodoroToggle": "⏱ Start Pomodoro",
    "view.challenges.done": "✓ done",
    "view.daily.eyebrowFocus": "🌟 Today's expression",
    "view.daily.eyebrow": "☀️ Expression of the day",
    "view.daily.listen": "Listen",
    "view.daily.toDialect": "To the dialect",
    "view.daily.startFlashcards": "Start flashcards →",
    "view.daily.openDialect": "Open {flag} {name}",
    "view.fakt.aria": "Dialect knowledge",
    "view.fakt.eyebrow": "Did you know?",
    "view.features.sectionAria": "App features overview",
    "view.features.title": "What can you do here?",
    "view.features.f1Title": "Discover expressions — ",
    "view.features.f1Desc": "Browse through hundreds of words and phrases from all regions.",
    "view.features.f2Title": "Flashcards — ",
    "view.features.f2Desc": "Learn like with Anki: the dialect on the front, the meaning in standard German on the back.",
    "view.features.f3Title": "Quiz — ",
    "view.features.f3Desc": "Test your knowledge with multiple-choice questions.",
    "view.features.f4Title": "Pronunciation — ",
    "view.features.f4Desc": "Listen to expressions via speech synthesis.",
    "view.features.f5Title": "Favorites — ",
    "view.features.f5Desc": "Save your favorite expressions for later.",
    "view.features.shortcutsTitle": "Keyboard shortcuts",
    "view.features.scSearch": "— Open search",
    "view.features.scTheme": "— Toggle light/dark",
    "view.features.scNav": "— Navigate flashcards",
    "view.features.keySpace": "Space ",
    "view.features.scFlip": "— Flip flashcard",
    "view.features.scQuiz": "— Select in quiz",
    // Navigation
    'nav.home':       'Home',
    'nav.entdecken':  'Discover',
    'nav.lernen':     'Learn',
    'nav.quiz':       'Quiz',
    'nav.vergleich':  'Compare',
    'nav.karte':      'Map',
    'nav.favoriten':  'Favorites',

    // Branding
    'brand.name':     'Dialekto',
    'brand.sub':      'Learn German dialects',

    // Hero
    'home.title':                  'Dialekto',
    'home.hero.eyebrow':           'Discover German linguistic diversity',
    'home.hero.cta.discover':      'Discover dialects',
    'home.hero.cta.learn':         'Study flashcards',
    'home.hero.cta.quiz':          'Start quiz',
    'home.hero.headline':          'Speak like the locals.',
    'home.hero.lede':              'Over 6,700 expressions from 24 regions: learn with flashcards, hear the pronunciation and test yourself in the quiz — explained in clear standard German.',
    'home.dashboard.lede':         'Personalised recommendations based on your progress.',
    'home.dailyGoal.title':        "Today's goal",
    'home.dailyGoal.lede':         'Adjust your daily learning target — keep your rhythm!',
    'view.entdecken.title': 'Discover dialects',
    'view.entdecken.lede': '{n} regions · Filter by language area or search directly.',
    'view.entdecken.search': 'Search dialect or region…',
    'view.entdecken.emptyTitle': 'No dialects found',
    'view.entdecken.emptyMeta': 'Try another word, a different language area, or clear the search box.',
    'country.all': 'All', 'country.de': 'Germany', 'country.at': 'Austria', 'country.ch': 'Switzerland',
    'count.treffer': '{n} matches', 'count.dialekt': '{n} dialect', 'count.dialekte': '{n} dialects',
    'common.all': 'All',
    'view.vergleich.title': 'Dialect comparison',
    'view.vergleich.lede': 'How do you say the same thing in different regions? Here are expressions grouped by meaning.',
    'view.vergleich.emptyTitle': 'No groups in this category',
    'view.vergleich.emptyMeta': 'Switch to "All" — most groups span across categories.',

    // Stats
    'stats.dialekte':              'Dialects',
    'stats.ausdruecke':            'Expressions',
    'stats.gelernt':               'learned',
    'stats.streak':                'day streak',

    // Buttons / Aktionen
    'btn.start':                   'Start learning',
    'btn.share':                   'Share card',
    'btn.close':                   'Close',
    'btn.cancel':                  'Cancel',
    'btn.save':                    'Save',
    'btn.copy':                    'Copy',
    'btn.download':                'Download',
    'btn.continue':                'Continue',
    'btn.back':                    'Back',

    // Topbar / Toggles
    'topbar.search':               'Search or jump…',
    'topbar.theme':                'Toggle light/dark',
    'topbar.palette':              'Color palette',
    'topbar.sound':                'Toggle sounds',
    'topbar.lang':                 'Change language',
    'topbar.dyslexic':             'Dyslexia-friendly font',

    // Themes / Modi
    'theme.light':                 'Light',
    'theme.dark':                  'Dark',
    'theme.auto':                  'Auto',

    // Toasts
    'toast.sound.on':              'Sounds on',
    'toast.sound.off':             'Sounds off',
    'toast.lang.changed':          'Language changed',
    'toast.dyslexic.on':           'Dyslexic font on',
    'toast.dyslexic.off':          'Dyslexic font off',
    'toast.copied':                'Copied to clipboard',
    'toast.saved':                 'Saved',
    'toast.error':                 'An error occurred',

    // Sections
    'section.alleDialekte':        'All dialects',
    'section.dashboard':           'Your dashboard',
    'section.heuteFaellig':        'Due today',
    'section.dailyExpr':           'Expression of the day',

    // Erweiterte Navigation + Topbar
    'nav.mehr': 'More', 'nav.lernpfad': 'Path', 'nav.shadowing': 'Shadowing',
    'nav.klangpaare': 'Sound pairs', 'nav.spiele': 'Games', 'nav.idiome': 'Idioms',
    'nav.lektionen': 'Lessons', 'nav.decks': 'Decks',
    'topbar.settings': 'Settings', 'topbar.menu': 'Menu', 'a11y.skip': 'Skip to content',
  },

  tr: {
    // — View-Keys (i18n-Workflow) —
    "view.liga.zonePromotion": "Yükselme yeri",
    "view.liga.zoneDemotion": "Düşme tehlikesi",
    "view.liga.zoneHold": "Korunuyor",
    "view.liga.heroEyebrow": "Senin ligin",
    "view.liga.tierLiga": "{name} Ligi",
    "view.liga.rankOf": "{total} arasından {rank}. sıra",
    "view.liga.xpThisWeek": "Bu hafta XP",
    "view.liga.week": "Hafta",
    "view.liga.hintTopTier": "En üst ligdesin — zirveyi koru!",
    "view.liga.hintInPromo": "Harika! Yükselmek için ilk {n} içinde kal.",
    "view.liga.hintToPromo": "İlk {n} arasına gir",
    "view.liga.hintToPromoXp": " — yükselme çizgisine {xp} XP kaldı",
    "view.liga.privacyNote": "Tüm rakipler yerel olarak oluşturulmuş alıştırma hayaletleridir. Hesap yok, takip yok, hiçbir veri cihazından çıkmaz.",
    "view.liga.backHome": "Ana sayfaya dön",
    "view.liga.promotedTitle": "{name} Ligine yükseldin!",
    "view.liga.demotedTitle": "{name} Ligine düştün",
    "view.liga.promotedSub": "{name} Liginde {rank}. sıra — böyle devam!",
    "view.liga.demotedSub": "{name} Liginde {rank}. sıra. Gelecek hafta geri al!",
    "view.liga.tiersTitle": "Lig kademeleri",
    "view.liga.bestTier": "Ulaşılan en yüksek kademe: {tier}",
    "view.liga.boardTitle": "Haftanın sıralaması",
    "view.liga.boardLede": "Öğrenerek XP kazan — sıralamalar hafta boyunca güncellenir.",
    "view.liga.dividerPromote": "Yükselme — İlk {n}",
    "view.liga.dividerDemote": "Düşme bölgesi",
    "view.liga.you": "Sen",
    "view.lernpfad.title": "Öğrenme yolu",
    "view.lernpfad.lede": "Lehçeler arasında rehberli yolculuğun — bir sonrakini açmak için bir lehçede ustalaş.",
    "view.lernpfad.allComplete": "Tüm lehçeler tamamlandı!",
    "view.lernpfad.progress": "{total} lehçeden {n} tanesi tamamlandı",
    "view.lernpfad.currentHint": "Şu an: {flag} {name} — ustalığa {n} ifade kaldı.",
    "view.lernpfad.legendMastered": "tamamlandı",
    "view.lernpfad.legendActive": "etkin",
    "view.lernpfad.legendLocked": "kilitli",
    "view.lernpfad.legendGoal": "Hedef: lehçe başına {n} ifade",
    "view.lernpfad.lockedToast": "{name} hâlâ kilitli — önce önceki lehçede ustalaş.",
    "view.lernpfad.nodeAriaOpen": "{name} öğren — {goal} ifadeden {n} tanesi öğrenildi",
    "view.lernpfad.nodeAriaLocked": "{name} kilitli — önce önceki lehçede ustalaş",
    "view.lernpfad.nodeTitleLocked": "{name} (kilitli)",
    "view.lernpfad.subMastered": "Tamamlandı",
    "view.lernpfad.subLocked": "Kilitli",
    "view.lernpfad.start": "Başla",
    "view.setup.title": "🎯 Test",
    "view.setup.lede": "{n} çoktan seçmeli soru. Toplam doğruluk: %{acc}",
    "view.setup.timerLabel": "⏱️ 20 saniyelik zamanlayıcı {state}",
    "view.setup.on": "açık",
    "view.setup.off": "kapalı",
    "view.setup.mode.mixed.name": "Karışık",
    "view.setup.mode.mixed.desc": "Lehçe ifadesinin standart Almancada anlamı nedir?",
    "view.setup.mode.reverse.name": "Tersine",
    "view.setup.mode.reverse.region": "Standart Almanca → lehçe",
    "view.setup.mode.reverse.desc": "Hangi lehçe ifadesi standart Almanca anlamına uyar?",
    "view.setup.mode.region.name": "Bu nerede konuşulur?",
    "view.setup.mode.region.region": "Bölgeyi tahmin et",
    "view.setup.mode.region.desc": "Bu ifade hangi bölgeden geliyor?",
    "view.setup.mode.dialekt.desc": "{name} bilgini sına.",
    "view.setup.cardCount": "{n} soru",
    "view.result.headlineExcellent": "Mükemmel!",
    "view.result.headlineGreat": "Çok iyi!",
    "view.result.headlineSolid": "Sağlam bir performans",
    "view.result.headlinePractice": "Pratik mükemmelleştirir",
    "view.result.ringAria": "Test sonucu: yüzde {n} doğru",
    "view.result.scoreLine": "{total} sorudan {score} doğru.",
    "view.result.retry": "Tekrar",
    "view.result.another": "Başka test",
    "view.result.share": "🔗 Paylaş",
    "view.result.shareLinkError": "Paylaşım bağlantısı oluşturulamadı.",
    "view.result.shareTitle": "Dialekto test sonucum",
    "view.result.shareText": "Dialekto testinde {score}/{total} yaptım!",
    "view.result.linkCopied": "Bağlantı kopyalandı 📋",
    "view.result.linkFallback": "Bağlantı: {url}",
    "view.question.points": "{n} puan",
    "view.question.label": "Ne anlama geliyor",
    "view.question.listen": "Dinle",
    "view.question.listenAria": "“{term}” dinle",
    "view.question.optionsAria": "Yanıt seçenekleri",
    "view.adaptive.title": "📈 Bugün önerilenler",
    "view.adaptive.lede": "Kişiselleştirilmiş — şu anda en çok öğrenme etkisi sağlayan kartlar.",
    "view.adaptive.cta": "Bu {n} kartı şimdi öğren →",
    "view.adaptive.ctaTitle": "Bu önerileri doğrudan bir kart oturumunda öğren",
    "view.adaptive.prio.urgent": "🔥 Acil",
    "view.adaptive.prio.weak": "⚠️ Zayıf",
    "view.adaptive.prio.new": "🆕 Yeni",
    "view.adaptive.prio.refresh": "✨ Tekrar",
    "view.challenges.title": "Bu hafta",
    "view.challenges.lede": "Üç mini görev — her pazartesi yenilenir.",
    "view.challenges.pomodoroStart": "Pomodoro çalışma oturumu başlat",
    "view.challenges.pomodoroStop": "⏸ Pomodoro'yu durdur",
    "view.challenges.pomodoroToggle": "⏱ Pomodoro başlat",
    "view.challenges.done": "✓ tamamlandı",
    "view.daily.eyebrowFocus": "🌟 Günün ifadesi",
    "view.daily.eyebrow": "☀️ Günün ifadesi",
    "view.daily.listen": "Dinle",
    "view.daily.toDialect": "Lehçeye git",
    "view.daily.startFlashcards": "Kartlarla başla →",
    "view.daily.openDialect": "{flag} {name} aç",
    "view.fakt.aria": "Lehçe bilgisi",
    "view.fakt.eyebrow": "Biliyor muydun?",
    "view.features.sectionAria": "Uygulama özellikleri genel bakış",
    "view.features.title": "Burada neler yapabilirsin?",
    "view.features.f1Title": "İfadeleri keşfet — ",
    "view.features.f1Desc": "Tüm bölgelerden yüzlerce kelime ve deyim arasında gez.",
    "view.features.f2Title": "Kartlar — ",
    "view.features.f2Desc": "Anki gibi öğren: önde lehçe, arkada standart Almanca anlamı.",
    "view.features.f3Title": "Test — ",
    "view.features.f3Desc": "Bilgini çoktan seçmeli sorularla sına.",
    "view.features.f4Title": "Telaffuz — ",
    "view.features.f4Desc": "İfadeleri konuşma sentezi ile dinle.",
    "view.features.f5Title": "Favoriler — ",
    "view.features.f5Desc": "En sevdiğin ifadeleri sonrası için kaydet.",
    "view.features.shortcutsTitle": "Klavye kısayolları",
    "view.features.scSearch": "— Aramayı aç",
    "view.features.scTheme": "— Açık/koyu değiştir",
    "view.features.scNav": "— Kartlarda gezin",
    "view.features.keySpace": "Boşluk ",
    "view.features.scFlip": "— Kartı çevir",
    "view.features.scQuiz": "— Testte seç",
    'nav.home': 'Ana Sayfa', 'nav.entdecken': 'Keşfet', 'nav.lernen': 'Öğren',
    'nav.quiz': 'Test', 'nav.vergleich': 'Karşılaştır', 'nav.karte': 'Harita', 'nav.favoriten': 'Favoriler',
    'brand.name': 'Dialekto', 'brand.sub': 'Almanca lehçelerini öğren',
    'home.title': 'Dialekto', 'home.hero.eyebrow': 'Alman dil çeşitliliğini keşfedin',
    'home.hero.cta.discover': 'Lehçeleri keşfet', 'home.hero.cta.learn': 'Kartlarla öğren', 'home.hero.cta.quiz': 'Teste başla',
    'home.hero.headline': 'Yerliler gibi konuş.', 'home.hero.lede': '24 bölgeden 6700\'den fazla ifade: kartlarla öğren, telaffuzu dinle ve testte kendini sına — anlaşılır standart Almancayla açıklanır.',
    'home.dashboard.lede': 'Öğrenme durumuna göre kişiselleştirilmiş öneriler.', 'home.dailyGoal.title': 'Günün hedefi', 'home.dailyGoal.lede': 'Günlük öğrenme hedefini ayarla — ritmini koru!',
    'view.entdecken.title': 'Lehçeleri keşfet', 'view.entdecken.lede': '{n} bölge · Dil bölgesine göre filtrele veya doğrudan ara.', 'view.entdecken.search': 'Lehçe veya bölge ara…', 'view.entdecken.emptyTitle': 'Lehçe bulunamadı', 'view.entdecken.emptyMeta': 'Başka bir kelime ya da dil bölgesi dene veya arama kutusunu temizle.', 'country.all': 'Tümü', 'country.de': 'Almanya', 'country.at': 'Avusturya', 'country.ch': 'İsviçre', 'count.treffer': '{n} sonuç', 'count.dialekt': '{n} lehçe', 'count.dialekte': '{n} lehçe',
    'common.all': 'Tümü', 'view.vergleich.title': 'Lehçe karşılaştırması', 'view.vergleich.lede': 'Aynı şeyi farklı bölgelerde nasıl söylersin? İfadeler anlamlarına göre gruplanmıştır.', 'view.vergleich.emptyTitle': 'Bu kategoride grup yok', 'view.vergleich.emptyMeta': '„Tümü"ne geç — çoğu grup kategoriler arası oluşur.',
    'stats.dialekte': 'Lehçeler', 'stats.ausdruecke': 'İfadeler', 'stats.gelernt': 'öğrenildi', 'stats.streak': 'gün serisi',
    'btn.start': 'Öğrenmeye başla', 'btn.share': 'Kartı paylaş', 'btn.close': 'Kapat', 'btn.cancel': 'İptal',
    'btn.save': 'Kaydet', 'btn.copy': 'Kopyala', 'btn.download': 'İndir', 'btn.continue': 'Devam', 'btn.back': 'Geri',
    'topbar.search': 'Ara veya geç…', 'topbar.theme': 'Açık/koyu değiştir', 'topbar.palette': 'Renk paleti',
    'topbar.sound': 'Sesi aç/kapat', 'topbar.lang': 'Dili değiştir', 'topbar.dyslexic': 'Disleksi dostu yazı',
    'theme.light': 'Açık', 'theme.dark': 'Koyu', 'theme.auto': 'Otomatik',
    'toast.sound.on': 'Sesler açık', 'toast.sound.off': 'Sesler kapalı', 'toast.lang.changed': 'Dil değiştirildi',
    'toast.dyslexic.on': 'Disleksi yazısı açık', 'toast.dyslexic.off': 'Disleksi yazısı kapalı',
    'toast.copied': 'Panoya kopyalandı', 'toast.saved': 'Kaydedildi', 'toast.error': 'Bir hata oluştu',
    'section.alleDialekte': 'Tüm lehçeler', 'section.dashboard': 'Panonuz', 'section.heuteFaellig': 'Bugün vadesi gelen', 'section.dailyExpr': 'Günün ifadesi',
    'nav.mehr': 'Daha fazla', 'nav.lernpfad': 'Öğrenme yolu', 'nav.shadowing': 'Shadowing',
    'nav.klangpaare': 'Ses çiftleri', 'nav.spiele': 'Oyunlar', 'nav.idiome': 'Deyimler',
    'nav.lektionen': 'Dersler', 'nav.decks': 'Desteler',
    'topbar.settings': 'Ayarlar', 'topbar.menu': 'Menü', 'a11y.skip': 'İçeriğe geç',
  },

  fr: {
    // — View-Keys (i18n-Workflow) —
    "view.liga.zonePromotion": "Place de promotion",
    "view.liga.zoneDemotion": "Risque de relégation",
    "view.liga.zoneHold": "Maintenu",
    "view.liga.heroEyebrow": "Ta ligue",
    "view.liga.tierLiga": "Ligue {name}",
    "view.liga.rankOf": "Rang {rank} sur {total}",
    "view.liga.xpThisWeek": "XP cette semaine",
    "view.liga.week": "Semaine",
    "view.liga.hintTopTier": "Tu es dans la ligue la plus haute — garde la tête !",
    "view.liga.hintInPromo": "Bravo ! Reste dans le top {n} pour monter.",
    "view.liga.hintToPromo": "Entre dans le top {n}",
    "view.liga.hintToPromoXp": " — encore {xp} XP avant la ligne de promotion",
    "view.liga.privacyNote": "Tous les concurrents sont des fantômes d'entraînement générés localement. Aucun compte, aucun suivi, aucune donnée ne quitte ton appareil.",
    "view.liga.backHome": "Retour à l'accueil",
    "view.liga.promotedTitle": "Promu en Ligue {name} !",
    "view.liga.demotedTitle": "Relégué en Ligue {name}",
    "view.liga.promotedSub": "Rang {rank} en Ligue {name} — continue comme ça !",
    "view.liga.demotedSub": "Rang {rank} en Ligue {name}. Reprends-le la semaine prochaine !",
    "view.liga.tiersTitle": "Niveaux de ligue",
    "view.liga.bestTier": "Niveau le plus élevé atteint : {tier}",
    "view.liga.boardTitle": "Classement de la semaine",
    "view.liga.boardLede": "Gagne des XP en apprenant — le classement évolue au fil de la semaine.",
    "view.liga.dividerPromote": "Promotion — Top {n}",
    "view.liga.dividerDemote": "Zone de relégation",
    "view.liga.you": "Toi",
    "view.lernpfad.title": "Parcours d'apprentissage",
    "view.lernpfad.lede": "Ton parcours guidé à travers les dialectes — maîtrise un dialecte pour débloquer le suivant.",
    "view.lernpfad.allComplete": "Tous les dialectes maîtrisés !",
    "view.lernpfad.progress": "{n} dialectes sur {total} maîtrisés",
    "view.lernpfad.currentHint": "Actuel : {flag} {name} — encore {n} expressions avant la maîtrise.",
    "view.lernpfad.legendMastered": "maîtrisé",
    "view.lernpfad.legendActive": "actif",
    "view.lernpfad.legendLocked": "verrouillé",
    "view.lernpfad.legendGoal": "Objectif : {n} expressions par dialecte",
    "view.lernpfad.lockedToast": "{name} est encore verrouillé — maîtrise d'abord le dialecte précédent.",
    "view.lernpfad.nodeAriaOpen": "Apprendre {name} — {n} sur {goal} appris",
    "view.lernpfad.nodeAriaLocked": "{name} verrouillé — maîtrise d'abord le dialecte précédent",
    "view.lernpfad.nodeTitleLocked": "{name} (verrouillé)",
    "view.lernpfad.subMastered": "Maîtrisé",
    "view.lernpfad.subLocked": "Verrouillé",
    "view.lernpfad.start": "Départ",
    "view.setup.title": "🎯 Quiz",
    "view.setup.lede": "{n} questions à choix multiple. Précision globale : {acc}%",
    "view.setup.timerLabel": "⏱️ Minuteur de 20 secondes {state}",
    "view.setup.on": "activé",
    "view.setup.off": "désactivé",
    "view.setup.mode.mixed.name": "Mélange varié",
    "view.setup.mode.mixed.desc": "Que signifie l'expression dialectale en allemand standard ?",
    "view.setup.mode.reverse.name": "Inversé",
    "view.setup.mode.reverse.region": "Allemand standard → dialecte",
    "view.setup.mode.reverse.desc": "Quelle expression dialectale correspond au sens en allemand standard ?",
    "view.setup.mode.region.name": "Où parle-t-on cela ?",
    "view.setup.mode.region.region": "Devine la région",
    "view.setup.mode.region.desc": "De quelle région vient cette expression ?",
    "view.setup.mode.dialekt.desc": "Teste tes connaissances en {name}.",
    "view.setup.cardCount": "{n} questions",
    "view.result.headlineExcellent": "Excellent !",
    "view.result.headlineGreat": "Très bien !",
    "view.result.headlineSolid": "Belle performance",
    "view.result.headlinePractice": "C'est en forgeant qu'on devient forgeron",
    "view.result.ringAria": "Résultat du quiz : {n} pour cent de bonnes réponses",
    "view.result.scoreLine": "{score} questions sur {total} correctes.",
    "view.result.retry": "Recommencer",
    "view.result.another": "Autre quiz",
    "view.result.share": "🔗 Partager",
    "view.result.shareLinkError": "Impossible de créer le lien de partage.",
    "view.result.shareTitle": "Mon résultat au quiz Dialekto",
    "view.result.shareText": "J'ai obtenu {score}/{total} au quiz Dialekto !",
    "view.result.linkCopied": "Lien copié 📋",
    "view.result.linkFallback": "Lien : {url}",
    "view.question.points": "{n} points",
    "view.question.label": "Que signifie",
    "view.question.listen": "Écouter",
    "view.question.listenAria": "Écouter « {term} »",
    "view.question.optionsAria": "Options de réponse",
    "view.adaptive.title": "📈 Recommandé aujourd’hui",
    "view.adaptive.lede": "Personnalisé — les cartes qui te font le plus progresser maintenant.",
    "view.adaptive.cta": "Apprendre ces {n} maintenant →",
    "view.adaptive.ctaTitle": "Apprendre ces recommandations directement dans une session de cartes",
    "view.adaptive.prio.urgent": "🔥 Urgent",
    "view.adaptive.prio.weak": "⚠️ Faible",
    "view.adaptive.prio.new": "🆕 Nouveau",
    "view.adaptive.prio.refresh": "✨ Révision",
    "view.challenges.title": "Cette semaine",
    "view.challenges.lede": "Trois mini-défis — renouvelés chaque lundi.",
    "view.challenges.pomodoroStart": "Démarrer une session d'étude Pomodoro",
    "view.challenges.pomodoroStop": "⏸ Arrêter le Pomodoro",
    "view.challenges.pomodoroToggle": "⏱ Démarrer le Pomodoro",
    "view.challenges.done": "✓ terminé",
    "view.daily.eyebrowFocus": "🌟 Expression du jour",
    "view.daily.eyebrow": "☀️ Expression du jour",
    "view.daily.listen": "Écouter",
    "view.daily.toDialect": "Vers le dialecte",
    "view.daily.startFlashcards": "Lancer les cartes →",
    "view.daily.openDialect": "Ouvrir {flag} {name}",
    "view.fakt.aria": "Savoir dialectal",
    "view.fakt.eyebrow": "Le savais-tu ?",
    "view.features.sectionAria": "Aperçu des fonctionnalités de l’app",
    "view.features.title": "Que peux-tu faire ici ?",
    "view.features.f1Title": "Découvrir des expressions — ",
    "view.features.f1Desc": "Parcours des centaines de mots et expressions de toutes les régions.",
    "view.features.f2Title": "Cartes mémo — ",
    "view.features.f2Desc": "Apprends comme avec Anki : le dialecte au recto, le sens en allemand standard au verso.",
    "view.features.f3Title": "Quiz — ",
    "view.features.f3Desc": "Teste tes connaissances avec des questions à choix multiples.",
    "view.features.f4Title": "Prononciation — ",
    "view.features.f4Desc": "Écoute les expressions grâce à la synthèse vocale.",
    "view.features.f5Title": "Favoris — ",
    "view.features.f5Desc": "Enregistre tes expressions préférées pour plus tard.",
    "view.features.shortcutsTitle": "Raccourcis clavier",
    "view.features.scSearch": "— Ouvrir la recherche",
    "view.features.scTheme": "— Basculer clair/sombre",
    "view.features.scNav": "— Naviguer dans les cartes",
    "view.features.keySpace": "Espace ",
    "view.features.scFlip": "— Retourner la carte",
    "view.features.scQuiz": "— Choisir dans le quiz",
    'nav.home': 'Accueil', 'nav.entdecken': 'Découvrir', 'nav.lernen': 'Apprendre',
    'nav.quiz': 'Quiz', 'nav.vergleich': 'Comparer', 'nav.karte': 'Carte', 'nav.favoriten': 'Favoris',
    'brand.name': 'Dialekto', 'brand.sub': 'Apprendre les dialectes allemands',
    'home.title': 'Dialekto', 'home.hero.eyebrow': 'Découvrez la diversité linguistique allemande',
    'home.hero.cta.discover': 'Découvrir les dialectes', 'home.hero.cta.learn': 'Réviser les cartes', 'home.hero.cta.quiz': 'Lancer le quiz',
    'home.hero.headline': 'Parle comme les gens du coin.', 'home.hero.lede': 'Plus de 6700 expressions de 24 régions : apprends avec des cartes, écoute la prononciation et teste-toi au quiz — expliqué en allemand standard clair.',
    'home.dashboard.lede': 'Recommandations personnalisées selon ta progression.', 'home.dailyGoal.title': 'Objectif du jour', 'home.dailyGoal.lede': 'Ajuste ton objectif quotidien — garde le rythme !',
    'view.entdecken.title': 'Découvrir les dialectes', 'view.entdecken.lede': '{n} régions · Filtre par aire linguistique ou recherche directement.', 'view.entdecken.search': 'Rechercher un dialecte ou une région…', 'view.entdecken.emptyTitle': 'Aucun dialecte trouvé', 'view.entdecken.emptyMeta': 'Essaie un autre mot, une autre aire linguistique ou vide le champ de recherche.', 'country.all': 'Tous', 'country.de': 'Allemagne', 'country.at': 'Autriche', 'country.ch': 'Suisse', 'count.treffer': '{n} résultats', 'count.dialekt': '{n} dialecte', 'count.dialekte': '{n} dialectes',
    'common.all': 'Tous', 'view.vergleich.title': 'Comparaison des dialectes', 'view.vergleich.lede': 'Comment dit-on la même chose selon les régions ? Voici des expressions regroupées par sens.', 'view.vergleich.emptyTitle': 'Aucun groupe dans cette catégorie', 'view.vergleich.emptyMeta': 'Passe à « Tous » — la plupart des groupes se forment entre catégories.',
    'stats.dialekte': 'Dialectes', 'stats.ausdruecke': 'Expressions', 'stats.gelernt': 'appris', 'stats.streak': 'jours de suite',
    'btn.start': 'Commencer', 'btn.share': 'Partager la carte', 'btn.close': 'Fermer', 'btn.cancel': 'Annuler',
    'btn.save': 'Enregistrer', 'btn.copy': 'Copier', 'btn.download': 'Télécharger', 'btn.continue': 'Continuer', 'btn.back': 'Retour',
    'topbar.search': 'Rechercher ou aller à…', 'topbar.theme': 'Basculer clair/sombre', 'topbar.palette': 'Palette de couleurs',
    'topbar.sound': 'Activer/couper le son', 'topbar.lang': 'Changer de langue', 'topbar.dyslexic': 'Police adaptée à la dyslexie',
    'theme.light': 'Clair', 'theme.dark': 'Sombre', 'theme.auto': 'Auto',
    'toast.sound.on': 'Sons activés', 'toast.sound.off': 'Sons coupés', 'toast.lang.changed': 'Langue modifiée',
    'toast.dyslexic.on': 'Police dyslexie activée', 'toast.dyslexic.off': 'Police dyslexie désactivée',
    'toast.copied': 'Copié dans le presse-papiers', 'toast.saved': 'Enregistré', 'toast.error': "Une erreur s'est produite",
    'section.alleDialekte': 'Tous les dialectes', 'section.dashboard': 'Votre tableau de bord', 'section.heuteFaellig': 'À réviser aujourd’hui', 'section.dailyExpr': 'Expression du jour',
    'nav.mehr': 'Plus', 'nav.lernpfad': 'Parcours', 'nav.shadowing': 'Shadowing',
    'nav.klangpaare': 'Paires sonores', 'nav.spiele': 'Jeux', 'nav.idiome': 'Idiomes',
    'nav.lektionen': 'Leçons', 'nav.decks': 'Decks',
    'topbar.settings': 'Paramètres', 'topbar.menu': 'Menu', 'a11y.skip': 'Aller au contenu',
  },

  es: {
    // — View-Keys (i18n-Workflow) —
    "view.liga.zonePromotion": "Puesto de ascenso",
    "view.liga.zoneDemotion": "Riesgo de descenso",
    "view.liga.zoneHold": "Mantenido",
    "view.liga.heroEyebrow": "Tu liga",
    "view.liga.tierLiga": "Liga {name}",
    "view.liga.rankOf": "Puesto {rank} de {total}",
    "view.liga.xpThisWeek": "XP esta semana",
    "view.liga.week": "Semana",
    "view.liga.hintTopTier": "Estás en la liga más alta — ¡mantente en la cima!",
    "view.liga.hintInPromo": "¡Genial! Mantente en el top {n} para ascender.",
    "view.liga.hintToPromo": "Entra en el top {n}",
    "view.liga.hintToPromoXp": " — faltan {xp} XP para la línea de ascenso",
    "view.liga.privacyNote": "Todos los competidores son fantasmas de práctica generados localmente. Sin cuentas, sin rastreo, ningún dato sale de tu dispositivo.",
    "view.liga.backHome": "Volver al inicio",
    "view.liga.promotedTitle": "¡Ascendido a la Liga {name}!",
    "view.liga.demotedTitle": "Descendido a la Liga {name}",
    "view.liga.promotedSub": "Puesto {rank} en la Liga {name} — ¡sigue así!",
    "view.liga.demotedSub": "Puesto {rank} en la Liga {name}. ¡Recupéralo la próxima semana!",
    "view.liga.tiersTitle": "Niveles de liga",
    "view.liga.bestTier": "Nivel más alto alcanzado: {tier}",
    "view.liga.boardTitle": "Clasificación de la semana",
    "view.liga.boardLede": "Gana XP aprendiendo — la clasificación se actualiza a lo largo de la semana.",
    "view.liga.dividerPromote": "Ascenso — Top {n}",
    "view.liga.dividerDemote": "Zona de descenso",
    "view.liga.you": "Tú",
    "view.lernpfad.title": "Ruta de aprendizaje",
    "view.lernpfad.lede": "Tu viaje guiado por los dialectos: domina un dialecto para desbloquear el siguiente.",
    "view.lernpfad.allComplete": "¡Todos los dialectos dominados!",
    "view.lernpfad.progress": "{n} de {total} dialectos dominados",
    "view.lernpfad.currentHint": "Actual: {flag} {name} — quedan {n} expresiones para dominarlo.",
    "view.lernpfad.legendMastered": "dominado",
    "view.lernpfad.legendActive": "activo",
    "view.lernpfad.legendLocked": "bloqueado",
    "view.lernpfad.legendGoal": "Objetivo: {n} expresiones por dialecto",
    "view.lernpfad.lockedToast": "{name} sigue bloqueado: domina primero el dialecto anterior.",
    "view.lernpfad.nodeAriaOpen": "Aprender {name} — {n} de {goal} aprendidas",
    "view.lernpfad.nodeAriaLocked": "{name} bloqueado — domina primero el dialecto anterior",
    "view.lernpfad.nodeTitleLocked": "{name} (bloqueado)",
    "view.lernpfad.subMastered": "Dominado",
    "view.lernpfad.subLocked": "Bloqueado",
    "view.lernpfad.start": "Inicio",
    "view.setup.title": "🎯 Quiz",
    "view.setup.lede": "{n} preguntas de opción múltiple. Precisión total: {acc}%",
    "view.setup.timerLabel": "⏱️ Temporizador de 20 segundos {state}",
    "view.setup.on": "activado",
    "view.setup.off": "desactivado",
    "view.setup.mode.mixed.name": "Mezcla variada",
    "view.setup.mode.mixed.desc": "¿Qué significa la expresión dialectal en alemán estándar?",
    "view.setup.mode.reverse.name": "Inverso",
    "view.setup.mode.reverse.region": "Alemán estándar → dialecto",
    "view.setup.mode.reverse.desc": "¿Qué expresión dialectal corresponde al significado en alemán estándar?",
    "view.setup.mode.region.name": "¿Dónde se habla esto?",
    "view.setup.mode.region.region": "Adivina la región",
    "view.setup.mode.region.desc": "¿De qué región proviene esta expresión?",
    "view.setup.mode.dialekt.desc": "Pon a prueba tus conocimientos de {name}.",
    "view.setup.cardCount": "{n} preguntas",
    "view.result.headlineExcellent": "¡Excelente!",
    "view.result.headlineGreat": "¡Muy bien!",
    "view.result.headlineSolid": "Buen resultado",
    "view.result.headlinePractice": "La práctica hace al maestro",
    "view.result.ringAria": "Resultado del quiz: {n} por ciento correcto",
    "view.result.scoreLine": "{score} de {total} preguntas correctas.",
    "view.result.retry": "Otra vez",
    "view.result.another": "Otro quiz",
    "view.result.share": "🔗 Compartir",
    "view.result.shareLinkError": "No se pudo crear el enlace para compartir.",
    "view.result.shareTitle": "Mi resultado del quiz de Dialekto",
    "view.result.shareText": "¡Conseguí {score}/{total} en el quiz de Dialekto!",
    "view.result.linkCopied": "Enlace copiado 📋",
    "view.result.linkFallback": "Enlace: {url}",
    "view.question.points": "{n} puntos",
    "view.question.label": "Qué significa",
    "view.question.listen": "Escuchar",
    "view.question.listenAria": "Escuchar «{term}»",
    "view.question.optionsAria": "Opciones de respuesta",
    "view.adaptive.title": "📈 Recomendado hoy",
    "view.adaptive.lede": "Personalizado: las tarjetas que más te ayudan a aprender ahora mismo.",
    "view.adaptive.cta": "Aprender estas {n} ahora →",
    "view.adaptive.ctaTitle": "Aprende estas recomendaciones directamente en una sesión de tarjetas",
    "view.adaptive.prio.urgent": "🔥 Urgente",
    "view.adaptive.prio.weak": "⚠️ Débil",
    "view.adaptive.prio.new": "🆕 Nuevo",
    "view.adaptive.prio.refresh": "✨ Repaso",
    "view.challenges.title": "Esta semana",
    "view.challenges.lede": "Tres minirretos — nuevos cada lunes.",
    "view.challenges.pomodoroStart": "Iniciar una sesión de estudio Pomodoro",
    "view.challenges.pomodoroStop": "⏸ Detener Pomodoro",
    "view.challenges.pomodoroToggle": "⏱ Iniciar Pomodoro",
    "view.challenges.done": "✓ hecho",
    "view.daily.eyebrowFocus": "🌟 Expresión de hoy",
    "view.daily.eyebrow": "☀️ Expresión del día",
    "view.daily.listen": "Escuchar",
    "view.daily.toDialect": "Ir al dialecto",
    "view.daily.startFlashcards": "Empezar tarjetas →",
    "view.daily.openDialect": "Abrir {flag} {name}",
    "view.fakt.aria": "Saber dialectal",
    "view.fakt.eyebrow": "¿Sabías que?",
    "view.features.sectionAria": "Resumen de funciones de la app",
    "view.features.title": "¿Qué puedes hacer aquí?",
    "view.features.f1Title": "Descubrir expresiones — ",
    "view.features.f1Desc": "Explora cientos de palabras y expresiones de todas las regiones.",
    "view.features.f2Title": "Tarjetas — ",
    "view.features.f2Desc": "Aprende como con Anki: el dialecto delante, el significado en alemán estándar detrás.",
    "view.features.f3Title": "Quiz — ",
    "view.features.f3Desc": "Pon a prueba tus conocimientos con preguntas de opción múltiple.",
    "view.features.f4Title": "Pronunciación — ",
    "view.features.f4Desc": "Escucha las expresiones mediante síntesis de voz.",
    "view.features.f5Title": "Favoritos — ",
    "view.features.f5Desc": "Guarda tus expresiones favoritas para más tarde.",
    "view.features.shortcutsTitle": "Atajos de teclado",
    "view.features.scSearch": "— Abrir búsqueda",
    "view.features.scTheme": "— Cambiar claro/oscuro",
    "view.features.scNav": "— Navegar por las tarjetas",
    "view.features.keySpace": "Espacio ",
    "view.features.scFlip": "— Girar la tarjeta",
    "view.features.scQuiz": "— Seleccionar en el quiz",
    'nav.home': 'Inicio', 'nav.entdecken': 'Descubrir', 'nav.lernen': 'Aprender',
    'nav.quiz': 'Quiz', 'nav.vergleich': 'Comparar', 'nav.karte': 'Mapa', 'nav.favoriten': 'Favoritos',
    'brand.name': 'Dialekto', 'brand.sub': 'Aprende dialectos alemanes',
    'home.title': 'Dialekto', 'home.hero.eyebrow': 'Descubre la diversidad lingüística alemana',
    'home.hero.cta.discover': 'Descubrir dialectos', 'home.hero.cta.learn': 'Estudiar tarjetas', 'home.hero.cta.quiz': 'Empezar quiz',
    'home.hero.headline': 'Habla como los locales.', 'home.hero.lede': 'Más de 6700 expresiones de 24 regiones: aprende con tarjetas, escucha la pronunciación y ponte a prueba en el quiz — explicado en alemán estándar claro.',
    'home.dashboard.lede': 'Recomendaciones personalizadas según tu progreso.', 'home.dailyGoal.title': 'Objetivo de hoy', 'home.dailyGoal.lede': 'Ajusta tu meta diaria de aprendizaje — ¡mantén el ritmo!',
    'view.entdecken.title': 'Descubrir dialectos', 'view.entdecken.lede': '{n} regiones · Filtra por área lingüística o busca directamente.', 'view.entdecken.search': 'Buscar dialecto o región…', 'view.entdecken.emptyTitle': 'No se encontraron dialectos', 'view.entdecken.emptyMeta': 'Prueba otra palabra, otra área lingüística o vacía el campo de búsqueda.', 'country.all': 'Todos', 'country.de': 'Alemania', 'country.at': 'Austria', 'country.ch': 'Suiza', 'count.treffer': '{n} resultados', 'count.dialekt': '{n} dialecto', 'count.dialekte': '{n} dialectos',
    'common.all': 'Todos', 'view.vergleich.title': 'Comparación de dialectos', 'view.vergleich.lede': '¿Cómo se dice lo mismo en distintas regiones? Aquí tienes expresiones agrupadas por significado.', 'view.vergleich.emptyTitle': 'No hay grupos en esta categoría', 'view.vergleich.emptyMeta': 'Cambia a «Todos» — la mayoría de los grupos abarcan varias categorías.',
    'stats.dialekte': 'Dialectos', 'stats.ausdruecke': 'Expresiones', 'stats.gelernt': 'aprendidas', 'stats.streak': 'días seguidos',
    'btn.start': 'Empezar a aprender', 'btn.share': 'Compartir tarjeta', 'btn.close': 'Cerrar', 'btn.cancel': 'Cancelar',
    'btn.save': 'Guardar', 'btn.copy': 'Copiar', 'btn.download': 'Descargar', 'btn.continue': 'Continuar', 'btn.back': 'Atrás',
    'topbar.search': 'Buscar o saltar…', 'topbar.theme': 'Cambiar claro/oscuro', 'topbar.palette': 'Paleta de colores',
    'topbar.sound': 'Activar/desactivar sonido', 'topbar.lang': 'Cambiar idioma', 'topbar.dyslexic': 'Fuente para dislexia',
    'theme.light': 'Claro', 'theme.dark': 'Oscuro', 'theme.auto': 'Auto',
    'toast.sound.on': 'Sonidos activados', 'toast.sound.off': 'Sonidos desactivados', 'toast.lang.changed': 'Idioma cambiado',
    'toast.dyslexic.on': 'Fuente dislexia activada', 'toast.dyslexic.off': 'Fuente dislexia desactivada',
    'toast.copied': 'Copiado al portapapeles', 'toast.saved': 'Guardado', 'toast.error': 'Ocurrió un error',
    'section.alleDialekte': 'Todos los dialectos', 'section.dashboard': 'Tu panel', 'section.heuteFaellig': 'Para hoy', 'section.dailyExpr': 'Expresión del día',
    'nav.mehr': 'Más', 'nav.lernpfad': 'Ruta', 'nav.shadowing': 'Shadowing',
    'nav.klangpaare': 'Pares sonoros', 'nav.spiele': 'Juegos', 'nav.idiome': 'Modismos',
    'nav.lektionen': 'Lecciones', 'nav.decks': 'Mazos',
    'topbar.settings': 'Ajustes', 'topbar.menu': 'Menú', 'a11y.skip': 'Ir al contenido',
  },
};

function safeStorage() {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage;
  } catch {
    return null;
  }
}

function readLang() {
  const store = safeStorage();
  if (!store) return DEFAULT_LANG;
  try {
    const raw = store.getItem(STORAGE_KEY);
    if (raw && SUPPORTED.includes(raw)) return raw;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

let currentLang = readLang();

/** Aktuelle Sprache (`'de'` oder `'en'`). */
export function getLang() {
  return currentLang;
}

/**
 * Übersetzt einen Key.
 * Fällt bei fehlendem Key auf die deutsche Variante zurück, dann auf den Key selbst.
 */
export function t(key, params) {
  const table = STRINGS[currentLang] || STRINGS[DEFAULT_LANG];
  let val;
  if (table && Object.prototype.hasOwnProperty.call(table, key)) val = table[key];
  else {
    const fallback = STRINGS[DEFAULT_LANG];
    val = (fallback && Object.prototype.hasOwnProperty.call(fallback, key)) ? fallback[key] : key;
  }
  // Optionale Platzhalter-Interpolation: t('count.treffer', { n: 3 }) → "3 Treffer".
  if (params && typeof val === 'string') {
    for (const k in params) val = val.replace(new RegExp('\\{' + k + '\\}', 'g'), params[k]);
  }
  return val;
}

/**
 * Setzt die UI-Sprache und reloaded die Seite, damit alle Views neu rendern.
 * Reload ist die einfachste Lösung — Dialekto rendert Views nur on-route-change,
 * eine selektive Neuzeichnung wäre invasiv.
 */
export function setLang(lang) {
  const next = SUPPORTED.includes(lang) ? lang : DEFAULT_LANG;
  const store = safeStorage();
  if (store) {
    try { store.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
  }
  currentLang = next;
  applyHtmlLangAttr();
  if (typeof location !== 'undefined' && typeof location.reload === 'function') {
    location.reload();
  }
}

/**
 * Zyklus DE → EN → DE.
 */
export function cycleLang() {
  const i = SUPPORTED.indexOf(currentLang);
  const next = SUPPORTED[(i + 1) % SUPPORTED.length] || DEFAULT_LANG;
  setLang(next);
  return next;
}

/** Setzt `<html lang>` passend zur aktiven Sprache. */
export function applyHtmlLangAttr() {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('lang', currentLang);
}

/**
 * Übersetzt alle deklarativ markierten Elemente innerhalb `root`:
 *   data-i18n="key"        → textContent
 *   data-i18n-aria="key"   → aria-label
 *   data-i18n-title="key"  → title
 *   data-i18n-ph="key"     → placeholder
 * Bei DE (Original) passiert nichts — die Markup-Texte sind bereits deutsch.
 * Idempotent; kann nach jedem (Re-)Render mit dem View-Root aufgerufen werden.
 */
export function applyI18nToDom(root) {
  if (typeof document === 'undefined') return;
  const scope = root || document;
  if (currentLang === DEFAULT_LANG) return;
  const set = (sel, apply) => {
    scope.querySelectorAll(sel).forEach((el) => {
      const key = el.getAttribute(sel.slice(1, -1));
      const val = t(key);
      if (val && val !== key) apply(el, val);
    });
  };
  set('[data-i18n]',       (el, v) => { el.textContent = v; });
  set('[data-i18n-aria]',  (el, v) => { el.setAttribute('aria-label', v); });
  set('[data-i18n-title]', (el, v) => { el.setAttribute('title', v); });
  set('[data-i18n-ph]',    (el, v) => { el.setAttribute('placeholder', v); });
}

/**
 * Bindet den Sprach-Toggle-Button (`#langToggle`) und setzt initiale Attribute.
 * Wird einmal beim App-Start aus `js/theme.js` aufgerufen.
 */
export function initI18n() {
  applyHtmlLangAttr();
  if (typeof document === 'undefined') return;
  applyI18nToDom(document);  // statische Shell (Nav, Brand, Topbar) übersetzen
  const btn = document.getElementById('langToggle');
  if (!btn) return;
  // Aktuellen Code als Label anzeigen (das zukünftige Ziel-Sprachkürzel ist intuitiver)
  syncLangButton(btn);
  btn.addEventListener('click', () => {
    cycleLang(); // löst reload aus
  });
}

function syncLangButton(btn) {
  // Zeigt den *aktuellen* Sprachcode (DE/EN) — Klick wechselt zur anderen
  const label = currentLang.toUpperCase();
  btn.textContent = label;
  btn.setAttribute('aria-label', t('topbar.lang'));
  btn.setAttribute('title', t('topbar.lang') + ` · ${label}`);
}
