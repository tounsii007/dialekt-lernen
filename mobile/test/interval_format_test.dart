// Tests für die kompakten Intervall-Labels (FSRS-Buttons).

import 'package:flutter_test/flutter_test.dart';

import 'package:dialekto/util/interval_format.dart';

void main() {
  test('formatInterval liefert deutsche Kurzlabels', () {
    expect(formatInterval(0), '<1 T');
    expect(formatInterval(1), '1 T');
    expect(formatInterval(5), '5 T');
    expect(formatInterval(6), '6 T');
    expect(formatInterval(7), '1 Wo');
    expect(formatInterval(14), '2 Wo');
    expect(formatInterval(30), '1 Mt');
    expect(formatInterval(90), '3 Mt');
    expect(formatInterval(365), '1.0 J');
    expect(formatInterval(730), '2.0 J');
  });

  test('formatInterval ist robust gegen Unsinn', () {
    expect(formatInterval(-5), '<1 T');
    expect(formatInterval(double.nan), '<1 T');
    expect(formatInterval(double.infinity), '<1 T');
  });
}
