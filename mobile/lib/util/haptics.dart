import 'package:flutter/services.dart';

import '../state/settings_controller.dart';

/// Zentrales haptisches Feedback — respektiert die Nutzer-Einstellung
/// (SettingsController.hapticsEnabled). Pendant zu vibrate() in util/sounds.js.
abstract final class Haptics {
  static bool get _on => SettingsController.instance.hapticsEnabled;

  static void light() {
    if (_on) HapticFeedback.lightImpact();
  }

  static void medium() {
    if (_on) HapticFeedback.mediumImpact();
  }

  static void selection() {
    if (_on) HapticFeedback.selectionClick();
  }

  static void success() {
    if (_on) HapticFeedback.mediumImpact();
  }

  static void error() {
    if (_on) HapticFeedback.heavyImpact();
  }
}
