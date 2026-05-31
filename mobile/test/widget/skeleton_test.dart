// Widget-Test für die Skeleton-Loader.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:dialekto/widgets/skeleton.dart';

import '../test_utils.dart';

void main() {
  testWidgets('SkeletonCardList rendert mehrere SkeletonBox', (tester) async {
    useTestFonts();
    await tester.pumpWidget(
      MaterialApp(
        theme: testTheme(),
        home: const Scaffold(body: SkeletonCardList(count: 3)),
      ),
    );
    await tester.pump(const Duration(milliseconds: 50));
    // Mehrere Platzhalter-Boxen (ListView baut sichtbare Kinder).
    expect(find.byType(SkeletonBox), findsWidgets);
  });

  testWidgets('SkeletonBox animiert ohne Fehler', (tester) async {
    useTestFonts();
    await tester.pumpWidget(
      MaterialApp(
        theme: testTheme(),
        home: const Scaffold(
          body: Center(child: SkeletonBox(width: 100, height: 20)),
        ),
      ),
    );
    await tester.pump(const Duration(milliseconds: 100));
    await tester.pump(const Duration(milliseconds: 600));
    expect(find.byType(SkeletonBox), findsOneWidget);
  });
}
