// Widget-Test: QuizScreen rendert 4 Optionen und gibt Feedback beim Antworten.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:dialekto/data/repository.dart';
import 'package:dialekto/screens/quiz_screen.dart';

import '../test_utils.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() async {
    useTestFonts();
    await DialektRepository.instance.load();
  });

  testWidgets('zeigt eine Frage mit genau vier Optionen', (tester) async {
    await tester.pumpWidget(
      MaterialApp(theme: testTheme(), home: const QuizScreen()),
    );
    await tester.pumpAndSettle();

    expect(find.text('Was bedeutet …'), findsOneWidget);
    // Jede Antwort-Option ist ein AnimatedContainer.
    expect(find.byType(AnimatedContainer), findsNWidgets(4));
  });

  testWidgets('Antworten zeigt genau ein Korrekt-Häkchen', (tester) async {
    await tester.pumpWidget(
      MaterialApp(theme: testTheme(), home: const QuizScreen()),
    );
    await tester.pumpAndSettle();

    // Vor dem Antworten: kein Feedback-Icon.
    expect(find.byIcon(Icons.check_circle_rounded), findsNothing);

    await tester.tap(find.byType(AnimatedContainer).first);
    await tester.pumpAndSettle();

    // Genau eine korrekte Option wird markiert.
    expect(find.byIcon(Icons.check_circle_rounded), findsOneWidget);
    // Ein "Weiter"-Button erscheint nach dem Antworten.
    expect(find.text('Weiter'), findsOneWidget);
  });
}
