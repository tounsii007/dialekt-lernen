// Widget-Tests für die wiederverwendbaren UI-Komponenten.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:dialekto/data/models.dart';
import 'package:dialekto/widgets/aurora_background.dart';
import 'package:dialekto/widgets/dialekt_card.dart';
import 'package:dialekto/widgets/glass_card.dart';
import 'package:dialekto/widgets/placeholder_view.dart';
import 'package:dialekto/widgets/speak_button.dart';

import '../test_utils.dart';

Dialekt _sampleDialekt() => Dialekt.fromJson({
      'id': 'hessisch',
      'name': 'Hessisch',
      'region': 'Hessen',
      'flag': '🦁',
      'farbe': '#e63946',
      'ausdruecke': [
        {'id': 'h-001', 'ausdruck': 'Ei guude', 'hochdeutsch': 'Hallo'},
        {'id': 'h-002', 'ausdruck': 'Bembel', 'hochdeutsch': 'Apfelweinkrug'},
      ],
    });

void main() {
  setUp(useTestFonts);

  group('GlassCard', () {
    testWidgets('zeigt sein Kind', (tester) async {
      await pumpThemed(tester, const GlassCard(child: Text('Inhalt')));
      expect(find.text('Inhalt'), findsOneWidget);
    });

    testWidgets('onTap wird ausgelöst', (tester) async {
      var taps = 0;
      await pumpThemed(
        tester,
        GlassCard(onTap: () => taps++, child: const Text('Tipp mich')),
      );
      await tester.tap(find.text('Tipp mich'));
      await tester.pumpAndSettle();
      expect(taps, 1);
    });
  });

  group('AuroraBackground', () {
    testWidgets('rendert das Kind im Vordergrund', (tester) async {
      await pumpThemed(
        tester,
        const AuroraBackground(child: Text('Vordergrund')),
      );
      expect(find.text('Vordergrund'), findsOneWidget);
    });
  });

  group('PlaceholderView', () {
    testWidgets('zeigt Emoji, Titel und Nachricht', (tester) async {
      await pumpThemed(
        tester,
        const PlaceholderView(
          emoji: '🎯',
          title: 'Quiz',
          message: 'Kommt bald.',
          accent: Color(0xFF8B5CF6),
        ),
      );
      expect(find.text('🎯'), findsOneWidget);
      expect(find.text('Quiz'), findsOneWidget);
      expect(find.text('Kommt bald.'), findsOneWidget);
    });
  });

  group('DialektCard', () {
    testWidgets('zeigt Name, Region und Ausdruckszahl', (tester) async {
      final d = _sampleDialekt();
      await pumpThemed(tester, DialektCard(dialekt: d, onTap: () {}));
      expect(find.text('Hessisch'), findsOneWidget);
      expect(find.text('Hessen'), findsOneWidget);
      expect(find.text('2'), findsOneWidget); // 2 Ausdrücke
      expect(find.text('🦁'), findsOneWidget);
    });

    testWidgets('onTap wird ausgelöst', (tester) async {
      var opened = false;
      await pumpThemed(
        tester,
        DialektCard(dialekt: _sampleDialekt(), onTap: () => opened = true),
      );
      await tester.tap(find.text('Hessisch'));
      await tester.pumpAndSettle();
      expect(opened, isTrue);
    });
  });

  group('SpeakButton', () {
    testWidgets('rendert das Lautsprecher-Icon', (tester) async {
      await pumpThemed(
        tester,
        const SpeakButton(text: 'Ei guude', lang: 'de-DE'),
      );
      expect(find.byIcon(Icons.volume_up_rounded), findsOneWidget);
      expect(find.byType(IconButton), findsOneWidget);
    });
  });
}
