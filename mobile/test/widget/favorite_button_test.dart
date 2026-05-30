// Widget-Test: FavoriteButton toggelt Status und Icon reaktiv.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/favorites_store.dart';
import 'package:dialekto/widgets/favorite_button.dart';

import '../test_utils.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final store = FavoritesStore.instance;

  setUp(() async {
    useTestFonts();
    SharedPreferences.setMockInitialValues(<String, Object>{});
    store.debugReset();
    await store.load();
  });

  testWidgets('zeigt leeres Herz und füllt es beim Tippen', (tester) async {
    await pumpThemed(
      tester,
      const FavoriteButton(dialektId: 'hessisch', ausdruckId: 'h-001'),
    );

    expect(find.byIcon(Icons.favorite_border_rounded), findsOneWidget);
    expect(find.byIcon(Icons.favorite_rounded), findsNothing);

    await tester.tap(find.byType(FavoriteButton));
    await tester.pumpAndSettle();

    expect(find.byIcon(Icons.favorite_rounded), findsOneWidget);
    expect(store.isFavorite('hessisch', 'h-001'), isTrue);
  });

  testWidgets('zweites Tippen entfernt den Favoriten wieder', (tester) async {
    await pumpThemed(
      tester,
      const FavoriteButton(dialektId: 'bayerisch', ausdruckId: 'b-001'),
    );

    await tester.tap(find.byType(FavoriteButton));
    await tester.pumpAndSettle();
    expect(store.isFavorite('bayerisch', 'b-001'), isTrue);

    await tester.tap(find.byType(FavoriteButton));
    await tester.pumpAndSettle();
    expect(store.isFavorite('bayerisch', 'b-001'), isFalse);
    expect(find.byIcon(Icons.favorite_border_rounded), findsOneWidget);
  });

  testWidgets('zwei Buttons mit gleichem Schlüssel bleiben synchron',
      (tester) async {
    await pumpThemed(
      tester,
      const Column(
        children: [
          FavoriteButton(dialektId: 'koelsch', ausdruckId: 'k-001'),
          FavoriteButton(dialektId: 'koelsch', ausdruckId: 'k-001'),
        ],
      ),
    );

    await tester.tap(find.byType(FavoriteButton).first);
    await tester.pumpAndSettle();

    // Beide Buttons hören auf denselben Store → beide gefüllt.
    expect(find.byIcon(Icons.favorite_rounded), findsNWidgets(2));
  });
}
