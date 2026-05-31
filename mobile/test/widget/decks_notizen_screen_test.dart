// Widget-Smoke-Tests für Decks- und Notizen-Screen (leere Zustände + Anlegen).

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/decks_store.dart';
import 'package:dialekto/data/notes_store.dart';
import 'package:dialekto/screens/decks_screen.dart';
import 'package:dialekto/screens/notizen_screen.dart';

import '../test_utils.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() async {
    useTestFonts();
    SharedPreferences.setMockInitialValues(<String, Object>{});
    DecksStore.instance.debugReset();
    NotesStore.instance.debugReset();
    await DecksStore.instance.load();
    await NotesStore.instance.load();
  });

  testWidgets('DecksScreen: leerer Zustand + FAB', (tester) async {
    await tester.pumpWidget(
      MaterialApp(theme: testTheme(), home: const DecksScreen()),
    );
    await tester.pump();
    expect(find.text('📚 Meine Decks'), findsOneWidget);
    expect(find.text('Noch keine Decks'), findsOneWidget);
    expect(find.text('Neues Deck'), findsOneWidget);
  });

  testWidgets('DecksScreen: zeigt angelegte Decks', (tester) async {
    await DecksStore.instance.createDeck(name: 'Reise-Wörter');
    await tester.pumpWidget(
      MaterialApp(theme: testTheme(), home: const DecksScreen()),
    );
    await tester.pump();
    expect(find.text('Reise-Wörter'), findsOneWidget);
  });

  testWidgets('NotizenScreen: leerer Zustand', (tester) async {
    await tester.pumpWidget(
      MaterialApp(theme: testTheme(), home: const NotizenScreen()),
    );
    await tester.pump();
    expect(find.text('📝 Notizen'), findsOneWidget);
    expect(find.text('Noch keine Notizen'), findsOneWidget);
  });
}
