// Widget-Test für den Quests-Screen: Kopf, drei Quests, Fortschritt & Häkchen.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/quests_store.dart';
import 'package:dialekto/data/xp_store.dart';
import 'package:dialekto/screens/quests_screen.dart';

import '../test_utils.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final quests = QuestsStore.instance;
  final xp = XpStore.instance;

  setUp(() async {
    useTestFonts();
    SharedPreferences.setMockInitialValues(<String, Object>{});
    xp.debugReset();
    quests.debugReset();
    await xp.load();
    await quests.load();
  });

  Future<void> pumpScreen(WidgetTester tester) async {
    await tester.binding.setSurfaceSize(const Size(800, 1400));
    addTearDown(() => tester.binding.setSurfaceSize(null));
    await tester.pumpWidget(
      MaterialApp(theme: testTheme(), home: const QuestsScreen()),
    );
    await tester.pump();
  }

  testWidgets('zeigt Kopf, drei Quests und Startfortschritt', (tester) async {
    await pumpScreen(tester);
    expect(find.text('🎯 Tagesquests'), findsOneWidget);
    expect(find.textContaining('0 / 3 erledigt'), findsOneWidget);
    // Drei Quest-Karten → drei Fortschrittsbalken.
    expect(find.byType(LinearProgressIndicator), findsNWidgets(3));
  });

  testWidgets('markiert eine erledigte Quest mit Häkchen', (tester) async {
    final first = quests.dailyQuests().first;
    await quests.trackMetric(first.metric, first.target);
    await pumpScreen(tester);
    expect(find.byIcon(Icons.check_circle_rounded), findsOneWidget);
  });
}
