// Widget-Test für den Tagesziel-Screen: Ring, Zielauswahl, Verlauf.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/goals_store.dart';
import 'package:dialekto/screens/goals_screen.dart';

import '../test_utils.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final goals = GoalsStore.instance;

  setUp(() async {
    useTestFonts();
    SharedPreferences.setMockInitialValues(<String, Object>{});
    goals.debugReset();
    await goals.load();
  });

  Future<void> pumpScreen(WidgetTester tester) async {
    await tester.binding.setSurfaceSize(const Size(800, 1200));
    addTearDown(() => tester.binding.setSurfaceSize(null));
    await tester.pumpWidget(
      MaterialApp(theme: testTheme(), home: const GoalsScreen()),
    );
    await tester.pump();
  }

  testWidgets('zeigt Standardziel 10 und Nullfortschritt', (tester) async {
    await pumpScreen(tester);
    expect(find.text('🎯 Tagesziel'), findsOneWidget);
    expect(find.text('von 10'), findsOneWidget);
    expect(find.text('Noch 10 Karten'), findsOneWidget);
    // Zielauswahl-Chips für alle Optionen (per Key, da Zahlen auch in der
    // Verlaufsachse vorkommen).
    for (final opt in goalOptions) {
      expect(find.byKey(ValueKey('goal-target-$opt')), findsOneWidget);
    }
  });

  testWidgets('spiegelt Fortschritt nach increment', (tester) async {
    await goals.increment(3);
    await pumpScreen(tester);
    expect(find.text('Noch 7 Karten'), findsOneWidget);
  });

  testWidgets('zeigt Erreicht-Zustand', (tester) async {
    await goals.setTarget(5);
    await goals.increment(5);
    await pumpScreen(tester);
    expect(find.text('🎉 Tagesziel erreicht!'), findsOneWidget);
  });

  testWidgets('Tippen auf Ziel-Chip ändert das Ziel', (tester) async {
    await pumpScreen(tester);
    await tester.tap(find.byKey(const ValueKey('goal-target-20')));
    await tester.pump();
    expect(goals.target, 20);
    expect(find.text('von 20'), findsOneWidget);
  });
}
