// Widget-Tests für Basis-Bausteine (BrandLogo, GradientButton).
// Modell-/Daten-Tests liegen in models_test.dart, data_integrity_test.dart etc.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:dialekto/widgets/brand_logo.dart';
import 'package:dialekto/widgets/gradient_button.dart';

import 'test_utils.dart';

void main() {
  setUp(useTestFonts);

  testWidgets('BrandLogo rendert in der gewünschten Größe', (tester) async {
    await pumpThemed(tester, const BrandLogo(size: 80));
    expect(find.byType(BrandLogo), findsOneWidget);
    final size = tester.getSize(find.byType(BrandLogo));
    expect(size.width, 80);
    expect(size.height, 80);
  });

  testWidgets('GradientButton ruft onPressed beim Tippen', (tester) async {
    var taps = 0;
    await pumpThemed(
      tester,
      GradientButton(label: 'Los', onPressed: () => taps++),
    );
    expect(find.text('Los'), findsOneWidget);
    await tester.tap(find.text('Los'));
    await tester.pumpAndSettle();
    expect(taps, 1);
  });

  testWidgets('GradientButton mit Icon zeigt Icon + Label', (tester) async {
    await pumpThemed(
      tester,
      GradientButton(
        label: 'Weiter',
        icon: Icons.arrow_forward_rounded,
        onPressed: () {},
      ),
    );
    expect(find.text('Weiter'), findsOneWidget);
    expect(find.byIcon(Icons.arrow_forward_rounded), findsOneWidget);
  });
}
