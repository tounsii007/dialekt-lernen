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
    'theme.contrast':              'Hoher Kontrast',

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
    'theme.contrast':              'High contrast',

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
    'nav.home': 'Ana Sayfa', 'nav.entdecken': 'Keşfet', 'nav.lernen': 'Öğren',
    'nav.quiz': 'Test', 'nav.vergleich': 'Karşılaştır', 'nav.karte': 'Harita', 'nav.favoriten': 'Favoriler',
    'brand.name': 'Dialekto', 'brand.sub': 'Almanca lehçelerini öğren',
    'home.title': 'Dialekto', 'home.hero.eyebrow': 'Alman dil çeşitliliğini keşfedin',
    'home.hero.cta.discover': 'Lehçeleri keşfet', 'home.hero.cta.learn': 'Kartlarla öğren', 'home.hero.cta.quiz': 'Teste başla',
    'home.hero.headline': 'Yerliler gibi konuş.', 'home.hero.lede': '24 bölgeden 6700\'den fazla ifade: kartlarla öğren, telaffuzu dinle ve testte kendini sına — anlaşılır standart Almancayla açıklanır.',
    'home.dashboard.lede': 'Öğrenme durumuna göre kişiselleştirilmiş öneriler.', 'home.dailyGoal.title': 'Günün hedefi', 'home.dailyGoal.lede': 'Günlük öğrenme hedefini ayarla — ritmini koru!',
    'view.entdecken.title': 'Lehçeleri keşfet', 'view.entdecken.lede': '{n} bölge · Dil bölgesine göre filtrele veya doğrudan ara.', 'view.entdecken.search': 'Lehçe veya bölge ara…', 'view.entdecken.emptyTitle': 'Lehçe bulunamadı', 'view.entdecken.emptyMeta': 'Başka bir kelime ya da dil bölgesi dene veya arama kutusunu temizle.', 'country.all': 'Tümü', 'country.de': 'Almanya', 'country.at': 'Avusturya', 'country.ch': 'İsviçre', 'count.treffer': '{n} sonuç', 'count.dialekt': '{n} lehçe', 'count.dialekte': '{n} lehçe',
    'stats.dialekte': 'Lehçeler', 'stats.ausdruecke': 'İfadeler', 'stats.gelernt': 'öğrenildi', 'stats.streak': 'gün serisi',
    'btn.start': 'Öğrenmeye başla', 'btn.share': 'Kartı paylaş', 'btn.close': 'Kapat', 'btn.cancel': 'İptal',
    'btn.save': 'Kaydet', 'btn.copy': 'Kopyala', 'btn.download': 'İndir', 'btn.continue': 'Devam', 'btn.back': 'Geri',
    'topbar.search': 'Ara veya geç…', 'topbar.theme': 'Açık/koyu değiştir', 'topbar.palette': 'Renk paleti',
    'topbar.sound': 'Sesi aç/kapat', 'topbar.lang': 'Dili değiştir', 'topbar.dyslexic': 'Disleksi dostu yazı',
    'theme.light': 'Açık', 'theme.dark': 'Koyu', 'theme.auto': 'Otomatik', 'theme.contrast': 'Yüksek kontrast',
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
    'nav.home': 'Accueil', 'nav.entdecken': 'Découvrir', 'nav.lernen': 'Apprendre',
    'nav.quiz': 'Quiz', 'nav.vergleich': 'Comparer', 'nav.karte': 'Carte', 'nav.favoriten': 'Favoris',
    'brand.name': 'Dialekto', 'brand.sub': 'Apprendre les dialectes allemands',
    'home.title': 'Dialekto', 'home.hero.eyebrow': 'Découvrez la diversité linguistique allemande',
    'home.hero.cta.discover': 'Découvrir les dialectes', 'home.hero.cta.learn': 'Réviser les cartes', 'home.hero.cta.quiz': 'Lancer le quiz',
    'home.hero.headline': 'Parle comme les gens du coin.', 'home.hero.lede': 'Plus de 6700 expressions de 24 régions : apprends avec des cartes, écoute la prononciation et teste-toi au quiz — expliqué en allemand standard clair.',
    'home.dashboard.lede': 'Recommandations personnalisées selon ta progression.', 'home.dailyGoal.title': 'Objectif du jour', 'home.dailyGoal.lede': 'Ajuste ton objectif quotidien — garde le rythme !',
    'view.entdecken.title': 'Découvrir les dialectes', 'view.entdecken.lede': '{n} régions · Filtre par aire linguistique ou recherche directement.', 'view.entdecken.search': 'Rechercher un dialecte ou une région…', 'view.entdecken.emptyTitle': 'Aucun dialecte trouvé', 'view.entdecken.emptyMeta': 'Essaie un autre mot, une autre aire linguistique ou vide le champ de recherche.', 'country.all': 'Tous', 'country.de': 'Allemagne', 'country.at': 'Autriche', 'country.ch': 'Suisse', 'count.treffer': '{n} résultats', 'count.dialekt': '{n} dialecte', 'count.dialekte': '{n} dialectes',
    'stats.dialekte': 'Dialectes', 'stats.ausdruecke': 'Expressions', 'stats.gelernt': 'appris', 'stats.streak': 'jours de suite',
    'btn.start': 'Commencer', 'btn.share': 'Partager la carte', 'btn.close': 'Fermer', 'btn.cancel': 'Annuler',
    'btn.save': 'Enregistrer', 'btn.copy': 'Copier', 'btn.download': 'Télécharger', 'btn.continue': 'Continuer', 'btn.back': 'Retour',
    'topbar.search': 'Rechercher ou aller à…', 'topbar.theme': 'Basculer clair/sombre', 'topbar.palette': 'Palette de couleurs',
    'topbar.sound': 'Activer/couper le son', 'topbar.lang': 'Changer de langue', 'topbar.dyslexic': 'Police adaptée à la dyslexie',
    'theme.light': 'Clair', 'theme.dark': 'Sombre', 'theme.auto': 'Auto', 'theme.contrast': 'Contraste élevé',
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
    'nav.home': 'Inicio', 'nav.entdecken': 'Descubrir', 'nav.lernen': 'Aprender',
    'nav.quiz': 'Quiz', 'nav.vergleich': 'Comparar', 'nav.karte': 'Mapa', 'nav.favoriten': 'Favoritos',
    'brand.name': 'Dialekto', 'brand.sub': 'Aprende dialectos alemanes',
    'home.title': 'Dialekto', 'home.hero.eyebrow': 'Descubre la diversidad lingüística alemana',
    'home.hero.cta.discover': 'Descubrir dialectos', 'home.hero.cta.learn': 'Estudiar tarjetas', 'home.hero.cta.quiz': 'Empezar quiz',
    'home.hero.headline': 'Habla como los locales.', 'home.hero.lede': 'Más de 6700 expresiones de 24 regiones: aprende con tarjetas, escucha la pronunciación y ponte a prueba en el quiz — explicado en alemán estándar claro.',
    'home.dashboard.lede': 'Recomendaciones personalizadas según tu progreso.', 'home.dailyGoal.title': 'Objetivo de hoy', 'home.dailyGoal.lede': 'Ajusta tu meta diaria de aprendizaje — ¡mantén el ritmo!',
    'view.entdecken.title': 'Descubrir dialectos', 'view.entdecken.lede': '{n} regiones · Filtra por área lingüística o busca directamente.', 'view.entdecken.search': 'Buscar dialecto o región…', 'view.entdecken.emptyTitle': 'No se encontraron dialectos', 'view.entdecken.emptyMeta': 'Prueba otra palabra, otra área lingüística o vacía el campo de búsqueda.', 'country.all': 'Todos', 'country.de': 'Alemania', 'country.at': 'Austria', 'country.ch': 'Suiza', 'count.treffer': '{n} resultados', 'count.dialekt': '{n} dialecto', 'count.dialekte': '{n} dialectos',
    'stats.dialekte': 'Dialectos', 'stats.ausdruecke': 'Expresiones', 'stats.gelernt': 'aprendidas', 'stats.streak': 'días seguidos',
    'btn.start': 'Empezar a aprender', 'btn.share': 'Compartir tarjeta', 'btn.close': 'Cerrar', 'btn.cancel': 'Cancelar',
    'btn.save': 'Guardar', 'btn.copy': 'Copiar', 'btn.download': 'Descargar', 'btn.continue': 'Continuar', 'btn.back': 'Atrás',
    'topbar.search': 'Buscar o saltar…', 'topbar.theme': 'Cambiar claro/oscuro', 'topbar.palette': 'Paleta de colores',
    'topbar.sound': 'Activar/desactivar sonido', 'topbar.lang': 'Cambiar idioma', 'topbar.dyslexic': 'Fuente para dislexia',
    'theme.light': 'Claro', 'theme.dark': 'Oscuro', 'theme.auto': 'Auto', 'theme.contrast': 'Alto contraste',
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
