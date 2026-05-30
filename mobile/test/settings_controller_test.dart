// Tests für die persistente Theme-Einstellung.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/state/settings_controller.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final c = SettingsController.instance;

  setUp(() async {
    SharedPreferences.setMockInitialValues(<String, Object>{});
    c.debugReset();
    await c.load();
  });

  test('Standard-Theme ist dunkel', () {
    expect(c.themeMode, ThemeMode.dark);
  });

  test('setThemeMode(light) persistiert über Reload', () async {
    await c.setThemeMode(ThemeMode.light);
    expect(c.themeMode, ThemeMode.light);

    c.debugReset();
    await c.load();
    expect(c.themeMode, ThemeMode.light);
  });

  test('system-Modus wird gespeichert', () async {
    await c.setThemeMode(ThemeMode.system);
    c.debugReset();
    await c.load();
    expect(c.themeMode, ThemeMode.system);
  });

  test('setzen des gleichen Modus ist no-op-sicher', () async {
    await c.setThemeMode(ThemeMode.dark);
    expect(c.themeMode, ThemeMode.dark);
  });
}
