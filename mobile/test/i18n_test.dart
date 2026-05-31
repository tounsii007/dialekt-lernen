// Tests für die UI-Internationalisierung (DE/EN) + Sprach-Einstellung.

import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/state/i18n.dart';
import 'package:dialekto/state/settings_controller.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  group('tr', () {
    test('liefert DE und EN', () {
      expect(tr(AppLang.de, 'nav.home'), 'Start');
      expect(tr(AppLang.en, 'nav.home'), 'Home');
      expect(tr(AppLang.de, 'settings.title'), 'Einstellungen');
      expect(tr(AppLang.en, 'settings.title'), 'Settings');
    });

    test('unbekannter Key → Key selbst (sichtbarer Fallback)', () {
      expect(tr(AppLang.de, 'does.not.exist'), 'does.not.exist');
    });

    test('parseLang / langCode', () {
      expect(parseLang('en'), AppLang.en);
      expect(parseLang('de'), AppLang.de);
      expect(parseLang(null), AppLang.de);
      expect(parseLang('xx'), AppLang.de);
      expect(langCode(AppLang.en), 'en');
      expect(langCode(AppLang.de), 'de');
    });
  });

  group('SettingsController.lang', () {
    final s = SettingsController.instance;
    setUp(() async {
      SharedPreferences.setMockInitialValues(<String, Object>{});
      s.debugReset();
      await s.load();
    });

    test('Default DE; setLang wirkt und persistiert', () async {
      expect(s.lang, AppLang.de);
      expect(s.t('nav.quiz'), 'Quiz');

      await s.setLang(AppLang.en);
      expect(s.lang, AppLang.en);
      expect(s.t('nav.home'), 'Home');

      s.debugReset();
      await s.load();
      expect(s.lang, AppLang.en); // über Reload erhalten
    });
  });
}
