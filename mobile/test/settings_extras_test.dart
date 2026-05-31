// Tests für Haptik-/Erinnerungs-Einstellungen + shouldRemind-Logik.

import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/state/settings_controller.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final s = SettingsController.instance;

  setUp(() async {
    SharedPreferences.setMockInitialValues(<String, Object>{});
    s.debugReset();
    await s.load();
  });

  test('Haptik default an; toggeln persistiert', () async {
    expect(s.hapticsEnabled, isTrue);
    await s.setHaptics(false);
    expect(s.hapticsEnabled, isFalse);
    s.debugReset();
    await s.load();
    expect(s.hapticsEnabled, isFalse);
  });

  test('Erinnerung default aus; Einstellungen persistieren', () async {
    expect(s.reminderEnabled, isFalse);
    expect(s.reminderHour, 19);
    await s.setReminder(enabled: true, hour: 8);
    expect(s.reminderEnabled, isTrue);
    expect(s.reminderHour, 8);
    s.debugReset();
    await s.load();
    expect(s.reminderEnabled, isTrue);
    expect(s.reminderHour, 8);
  });

  test('shouldRemind: aktiviert, Stunde erreicht, heute noch nicht aktiv', () async {
    final abends = DateTime(2026, 5, 31, 20);
    expect(s.shouldRemind(abends, null), isFalse); // noch deaktiviert

    await s.setReminder(enabled: true, hour: 19);
    expect(s.shouldRemind(abends, null), isTrue); // 20 ≥ 19, keine Aktivität
    expect(s.shouldRemind(abends, '2026-5-31'), isFalse); // heute schon aktiv

    final morgens = DateTime(2026, 5, 31, 8);
    expect(s.shouldRemind(morgens, null), isFalse); // 8 < 19
  });
}
