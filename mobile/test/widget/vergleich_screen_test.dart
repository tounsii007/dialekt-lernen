// Widget-Smoke-Test für den Dialekt-Vergleichs-Screen.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/repository.dart';
import 'package:dialekto/screens/vergleich_screen.dart';
import 'package:dialekto/widgets/speak_button.dart';

import '../test_utils.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() async {
    useTestFonts();
    SharedPreferences.setMockInitialValues(<String, Object>{});
    await DialektRepository.instance.load();
  });

  testWidgets('rendert Kopf, Kategorie-Chip und Gruppen', (tester) async {
    await tester.binding.setSurfaceSize(const Size(900, 2200));
    addTearDown(() => tester.binding.setSurfaceSize(null));

    await tester.pumpWidget(
      MaterialApp(theme: testTheme(), home: const VergleichScreen()),
    );
    await tester.pump(); // erster Frame → plant Berechnung
    await tester.pump(); // postFrame → setState mit Gruppen

    expect(find.text('🌍 Dialekt-Vergleich'), findsOneWidget);
    expect(find.text('🌍 Alle'), findsOneWidget);
    // Reale Daten erzeugen Vergleichsgruppen → mindestens eine Gruppen-Karte.
    expect(find.byType(SpeakButton), findsWidgets);
  });
}
