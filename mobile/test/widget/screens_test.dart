// Widget-Tests für alle Screens. Lädt Repository + Stores (gemockte Prefs) und
// prüft, dass jeder Screen rendert und Kerninhalte/Interaktionen funktionieren.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/favorites_store.dart';
import 'package:dialekto/data/repository.dart';
import 'package:dialekto/data/srs_store.dart';
import 'package:dialekto/state/settings_controller.dart';
import 'package:dialekto/widgets/dialekt_card.dart';
import 'package:dialekto/screens/app_shell.dart';
import 'package:dialekto/screens/dialekt_detail_screen.dart';
import 'package:dialekto/screens/entdecken_screen.dart';
import 'package:dialekto/screens/favoriten_screen.dart';
import 'package:dialekto/screens/home_screen.dart';
import 'package:dialekto/screens/lernen_screen.dart';
import 'package:dialekto/screens/search_screen.dart';
import 'package:dialekto/screens/settings_screen.dart';

import '../test_utils.dart';

Future<void> _pump(WidgetTester tester, Widget screen) async {
  await tester.pumpWidget(MaterialApp(theme: testTheme(), home: screen));
  await tester.pump(); // ein Frame
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() async {
    useTestFonts();
    SharedPreferences.setMockInitialValues(<String, Object>{});
    await DialektRepository.instance.load();
    await FavoritesStore.instance.load();
    await SrsStore.instance.load();
    await SettingsController.instance.load();
  });

  testWidgets('HomeScreen rendert Hero, Stats und Dialekt-Vorschau',
      (tester) async {
    // Großes Viewport, damit die nun mit Fortschritts-HUD längere Seite alle
    // Sektionen gleichzeitig layoutet (ListView baut Off-Screen-Kinder sonst
    // nicht).
    await tester.binding.setSurfaceSize(const Size(1200, 2900));
    addTearDown(() => tester.binding.setSurfaceSize(null));
    await _pump(tester, HomeScreen(onOpenTab: (_) {}));
    expect(find.text('Beliebte Dialekte'), findsOneWidget);
    expect(find.text('Dialekte'), findsWidgets);
    expect(find.byType(DialektCard), findsWidgets);
  });

  testWidgets('EntdeckenScreen listet Dialekte', (tester) async {
    await _pump(tester, const EntdeckenScreen());
    expect(find.byType(DialektCard), findsWidgets);
  });

  testWidgets('DialektDetailScreen zeigt Namen und Ausdrücke', (tester) async {
    final d = DialektRepository.instance.dialekte.first;
    await _pump(tester, DialektDetailScreen(dialekt: d));
    expect(find.text(d.name), findsWidgets);
    expect(find.byType(ExpansionTile), findsWidgets);
  });

  testWidgets('LernenScreen startet eine Karteikarten-Session', (tester) async {
    await _pump(tester, const LernenScreen());
    expect(find.text('🃏 Lernen'), findsOneWidget);
    expect(find.text('Aufdecken'), findsOneWidget);
  });

  testWidgets('FavoritenScreen zeigt leeren Zustand ohne Favoriten',
      (tester) async {
    await _pump(tester, const FavoritenScreen());
    expect(find.textContaining('keine Favoriten'), findsOneWidget);
  });

  testWidgets('SettingsScreen zeigt Theme-Auswahl', (tester) async {
    await _pump(tester, const SettingsScreen());
    expect(find.text('Einstellungen'), findsOneWidget);
    expect(find.text('System'), findsOneWidget);
    expect(find.text('Hell'), findsOneWidget);
    expect(find.text('Dunkel'), findsOneWidget);
  });

  testWidgets('SearchScreen zeigt Hinweis und liefert Treffer', (tester) async {
    await _pump(tester, const SearchScreen());
    expect(find.textContaining('Tippe'), findsOneWidget);

    await tester.enterText(find.byType(TextField), 'hessisch');
    // Suche ist um 150ms entprellt — Timer vorrücken, dann rebuilden.
    await tester.pump(const Duration(milliseconds: 200));
    await tester.pump();
    expect(find.text('Dialekte'), findsOneWidget); // Sektionstitel
  });

  testWidgets('AppShell baut alle Tabs und wechselt zu Favoriten',
      (tester) async {
    await _pump(tester, const AppShell());
    // Bottom-Nav-Labels (manche Begriffe erscheinen zusätzlich im Home-Inhalt,
    // da IndexedStack alle Tabs baut → findsWidgets statt findsOneWidget).
    expect(find.text('Start'), findsWidgets);
    expect(find.text('Entdecken'), findsWidgets);
    expect(find.text('Lernen'), findsWidgets);
    expect(find.text('Quiz'), findsWidgets);
    expect(find.text('Favoriten'), findsWidgets);

    // Auf Favoriten wechseln
    await tester.tap(find.text('Favoriten').last);
    await tester.pump();
    expect(find.textContaining('keine Favoriten'), findsOneWidget);
  });
}
