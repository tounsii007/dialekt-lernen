// Widget-Test für den Erfolge-Screen: Punktestand-Header + Achievement-Raster.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/achievements_store.dart';
import 'package:dialekto/screens/achievements_screen.dart';

import '../test_utils.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final ach = AchievementsStore.instance;

  setUp(() async {
    useTestFonts();
    SharedPreferences.setMockInitialValues(<String, Object>{});
    ach.debugReset();
    await ach.load();
  });

  Future<void> pumpScreen(WidgetTester tester) async {
    await tester.pumpWidget(
      MaterialApp(theme: testTheme(), home: const AchievementsScreen()),
    );
    await tester.pump(); // Post-Frame-Auswertung laufen lassen.
  }

  testWidgets('zeigt Header, Punktestand 0 und Achievement-Titel',
      (tester) async {
    await pumpScreen(tester);
    expect(find.text('🏆 Erfolge'), findsOneWidget);
    expect(find.text('0'), findsOneWidget); // Punktestand
    expect(find.text('Erste Karte'), findsOneWidget); // erstes Tile
    // Eine Rarität-Aufschlüsselung pro Stufe.
    for (final r in Rarities.all) {
      expect(find.textContaining(r.label), findsOneWidget);
    }
  });

  testWidgets('spiegelt freigeschaltete Erfolge nach Auswertung',
      (tester) async {
    await ach.evaluate(const AchievementStats(gelerntCount: 10));
    await pumpScreen(tester);
    // firstCard (10) + tenCards (10) = 20 Punkte.
    expect(ach.score().score, 20);
    expect(find.text('20'), findsOneWidget); // Punktestand-Zahl
    expect(find.text('Erste Karte'), findsOneWidget);
  });
}
