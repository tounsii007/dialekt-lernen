/// Kompakte deutsche Intervall-Labels für die FSRS-Bewertungs-Buttons —
/// Port von fmtInterval (js/views/lernen/flashcard.js).
/// Beispiele: <1 T · 1 T · 5 T · 2 Wo · 3 Mt · 1.4 J.
String formatInterval(num days) {
  final n = days.toDouble();
  final d = n.isFinite ? n.round() : 0;
  if (d <= 0) return '<1 T';
  if (d == 1) return '1 T';
  if (d < 7) return '$d T';
  if (d < 30) return '${(d / 7).round()} Wo';
  if (d < 365) return '${(d / 30).round()} Mt';
  final y = d / 365;
  return '${y < 10 ? y.toStringAsFixed(1) : y.round()} J';
}
