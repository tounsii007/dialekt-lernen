// Widget-Smoke-Test für den Spiele-Hub.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:dialekto/screens/spiele_screen.dart';

import '../test_utils.dart';

void main() {
  testWidgets('Spiele-Hub zeigt beide Spiele', (tester) async {
    useTestFonts();
    await tester.pumpWidget(
      MaterialApp(theme: testTheme(), home: const SpieleScreen()),
    );
    await tester.pump();

    expect(find.text('🎮 Mini-Spiele'), findsOneWidget);
    expect(find.text('Memory'), findsOneWidget);
    expect(find.text('Blitz'), findsOneWidget);
  });
}
