import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';

import 'screens/splash_screen.dart';
import 'services/backend_sync.dart';
import 'state/settings_controller.dart';
import 'theme/app_theme.dart';

void main() {
  final widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
  // Nativen Splash halten, bis der SplashScreen ihn nach dem ersten Frame entfernt.
  FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);
  runApp(const DialektoApp());
  // Nicht-blockierend: mit dem Backend verbinden + Nutzer-State synchronisieren
  // (Favoriten). Offline bleibt alles lokal.
  unawaited(BackendSync.init());
}

class DialektoApp extends StatelessWidget {
  const DialektoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: SettingsController.instance,
      builder: (context, _) {
        return MaterialApp(
          title: 'Dialekto',
          debugShowCheckedModeBanner: false,
          theme: AppTheme.light(),
          darkTheme: AppTheme.dark(),
          themeMode: SettingsController.instance.themeMode,
          home: const SplashScreen(),
        );
      },
    );
  }
}
