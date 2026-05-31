// Widget-Smoke-Test für den Idiom-Explorer (lädt echtes Dialekt-Asset).

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/repository.dart';
import 'package:dialekto/screens/idiome_screen.dart';

import '../test_utils.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() async {
    useTestFonts();
    SharedPreferences.setMockInitialValues(<String, Object>{});
    await DialektRepository.instance.load();
  });

  testWidgets('zeigt die Cluster-Übersicht', (tester) async {
    await tester.binding.setSurfaceSize(const Size(900, 2400));
    addTearDown(() => tester.binding.setSurfaceSize(null));
    await tester.pumpWidget(
      MaterialApp(theme: testTheme(), home: const IdiomeScreen()),
    );
    await tester.pump(); // erster Frame → plant Cluster-Berechnung
    await tester.pump(); // postFrame → setState mit Clustern

    expect(find.text('💬 Idiom-Explorer'), findsOneWidget);
    expect(find.textContaining('Redensarten'), findsWidgets);
  });
}
