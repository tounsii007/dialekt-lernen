// Test-Helfer (keine *_test.dart-Datei → wird nicht als Test ausgeführt).
//
// Liefert ein Theme mit der AppSurfaces-Extension OHNE google_fonts, damit
// Widget-Tests deterministisch und ohne Netzwerk laufen.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:dialekto/theme/app_theme.dart';

// No-op: Fonts werden inzwischen als Assets gebündelt (kein google_fonts mehr),
// es gibt also kein Laufzeit-Fetching, das in Tests deaktiviert werden müsste.
// Funktion bleibt erhalten, damit bestehende Test-Setups sie weiter aufrufen können.
void useTestFonts() {}

ThemeData testTheme() {
  final base = ThemeData(brightness: Brightness.dark, useMaterial3: true);
  return base.copyWith(
    scaffoldBackgroundColor: AppColors.dBg,
    colorScheme: base.colorScheme.copyWith(
      primary: AppColors.brand,
      surface: AppColors.dBgElev,
      onSurface: AppColors.dText,
    ),
    extensions: const <ThemeExtension<dynamic>>[
      AppSurfaces(
        surface: AppColors.dBgElev,
        border: AppColors.dBorder,
        textMuted: AppColors.dTextMuted,
        displayFont: 'Roboto',
        bodyFont: 'Roboto',
      ),
    ],
  );
}

Future<void> pumpThemed(WidgetTester tester, Widget child) {
  return tester.pumpWidget(
    MaterialApp(
      theme: testTheme(),
      home: Scaffold(body: child),
    ),
  );
}
