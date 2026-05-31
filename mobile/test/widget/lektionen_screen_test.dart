// Widget-Test für Lektionen-Liste + Detail (lädt echtes lektionen.json-Asset).

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/repository.dart';
import 'package:dialekto/screens/lektionen_screen.dart';

import '../test_utils.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() async {
    useTestFonts();
    SharedPreferences.setMockInitialValues(<String, Object>{});
    await DialektRepository.instance.load();
  });

  testWidgets('lädt Lektionen und öffnet eine Lektion', (tester) async {
    expect(DialektRepository.instance.lektionen, isNotEmpty);

    await tester.binding.setSurfaceSize(const Size(900, 2400));
    addTearDown(() => tester.binding.setSurfaceSize(null));
    await tester.pumpWidget(
      MaterialApp(theme: testTheme(), home: const LektionenScreen()),
    );
    await tester.pump();

    expect(find.text('📖 Mini-Lektionen'), findsOneWidget);
    expect(find.text('📚 Alle'), findsOneWidget);

    // Eine bekannte Lektion (Kölsch „jot") öffnen.
    final jot = find.textContaining('jot');
    expect(jot, findsWidgets);
    await tester.tap(jot.first);
    await tester.pumpAndSettle();
    expect(find.textContaining('Benrather'), findsWidgets);
  });
}
