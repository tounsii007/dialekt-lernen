// Widget-Test für das Fortschritts-HUD: spiegelt Level, XP und Streak live.

import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/streak_store.dart';
import 'package:dialekto/data/xp_store.dart';
import 'package:dialekto/widgets/progress_hud.dart';

import '../test_utils.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final xp = XpStore.instance;
  final streak = StreakStore.instance;

  setUp(() async {
    useTestFonts();
    SharedPreferences.setMockInitialValues(<String, Object>{});
    xp.debugReset();
    streak.debugReset();
    await xp.load();
    await streak.load();
  });

  testWidgets('zeigt Startzustand: Level 1, 0/100 XP', (tester) async {
    await pumpThemed(tester, const ProgressHud());
    expect(find.text('Lehrling'), findsOneWidget);
    expect(find.text('Level 1'), findsOneWidget);
    expect(find.text('0 / 100 XP'), findsOneWidget);
    expect(find.text('0 XP gesamt'), findsOneWidget);
  });

  testWidgets('aktualisiert sich nach XP-Vergabe und Streak-Eintrag',
      (tester) async {
    await pumpThemed(tester, const ProgressHud());

    await xp.award(120, 'test'); // → Level 2, 20/200
    await streak.register(DateTime(2026, 3, 10));
    await tester.pump();

    expect(find.text('Entdecker'), findsOneWidget);
    expect(find.text('Level 2'), findsOneWidget);
    expect(find.text('20 / 200 XP'), findsOneWidget);
    expect(find.text('120 XP gesamt'), findsOneWidget);
    expect(find.text('1'), findsOneWidget); // Streak-Zähler
  });
}
