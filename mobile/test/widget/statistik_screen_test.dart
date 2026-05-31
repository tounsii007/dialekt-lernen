// Widget-Smoke-Test für den Statistik-Screen.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/goals_store.dart';
import 'package:dialekto/data/repository.dart';
import 'package:dialekto/data/srs_store.dart';
import 'package:dialekto/data/streak_store.dart';
import 'package:dialekto/data/xp_store.dart';
import 'package:dialekto/screens/statistik_screen.dart';

import '../test_utils.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() async {
    useTestFonts();
    SharedPreferences.setMockInitialValues(<String, Object>{});
    await DialektRepository.instance.load();
    await SrsStore.instance.load();
    await XpStore.instance.load();
    await StreakStore.instance.load();
    await GoalsStore.instance.load();
  });

  testWidgets('rendert Kopf, Übersicht und Kernsektionen', (tester) async {
    await tester.binding.setSurfaceSize(const Size(900, 2600));
    addTearDown(() => tester.binding.setSurfaceSize(null));
    await tester.pumpWidget(
      MaterialApp(theme: testTheme(), home: const StatistikScreen()),
    );
    await tester.pump();

    expect(find.text('📊 Statistiken'), findsOneWidget);
    expect(find.text('Gelernt'), findsOneWidget);
    expect(find.text('XP & Level'), findsOneWidget);
    expect(find.text('Spaced-Repetition-Status'), findsOneWidget);
    expect(find.textContaining('Aktivität'), findsOneWidget);
  });
}
