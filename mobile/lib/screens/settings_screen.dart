import 'package:flutter/material.dart';

import '../data/repository.dart';
import '../state/settings_controller.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/glass_card.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final settings = SettingsController.instance;
    final repo = DialektRepository.instance;
    final surfaces = AppSurfaces.of(context);

    return Scaffold(
      body: AuroraBackground(
        child: SafeArea(
          child: ListView(
            padding: const EdgeInsets.all(AppSpacing.x5),
            children: [
              Row(
                children: [
                  IconButton(
                    onPressed: () => Navigator.of(context).pop(),
                    icon: const Icon(Icons.arrow_back_rounded),
                  ),
                  const SizedBox(width: AppSpacing.x2),
                  Text('Einstellungen',
                      style: Theme.of(context).textTheme.headlineMedium
                          ?.copyWith(fontSize: 24)),
                ],
              ),
              const SizedBox(height: AppSpacing.x5),

              Text('Darstellung',
                  style: Theme.of(context).textTheme.titleLarge),
              const SizedBox(height: AppSpacing.x3),
              GlassCard(
                padding: const EdgeInsets.all(AppSpacing.x4),
                child: ListenableBuilder(
                  listenable: settings,
                  builder: (context, _) {
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Icon(Icons.palette_rounded,
                                size: 20, color: AppColors.brand),
                            const SizedBox(width: AppSpacing.x3),
                            const Text('Design'),
                          ],
                        ),
                        const SizedBox(height: AppSpacing.x3),
                        SizedBox(
                          width: double.infinity,
                          child: SegmentedButton<ThemeMode>(
                            segments: const [
                              ButtonSegment(
                                value: ThemeMode.system,
                                label: Text('System'),
                                icon: Icon(Icons.brightness_auto_rounded),
                              ),
                              ButtonSegment(
                                value: ThemeMode.light,
                                label: Text('Hell'),
                                icon: Icon(Icons.light_mode_rounded),
                              ),
                              ButtonSegment(
                                value: ThemeMode.dark,
                                label: Text('Dunkel'),
                                icon: Icon(Icons.dark_mode_rounded),
                              ),
                            ],
                            selected: {settings.themeMode},
                            showSelectedIcon: false,
                            onSelectionChanged: (sel) {
                              if (sel.isNotEmpty) {
                                settings.setThemeMode(sel.first);
                              }
                            },
                          ),
                        ),
                      ],
                    );
                  },
                ),
              ),
              const SizedBox(height: AppSpacing.x6),

              Text('Über', style: Theme.of(context).textTheme.titleLarge),
              const SizedBox(height: AppSpacing.x3),
              GlassCard(
                padding: const EdgeInsets.all(AppSpacing.x4),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _InfoRow(
                      label: 'Inhalte',
                      value:
                          '${repo.dialekte.length} Dialekte · ${repo.totalAusdruecke} Ausdrücke',
                    ),
                    const SizedBox(height: AppSpacing.x3),
                    _InfoRow(label: 'App', value: 'Dialekto · v1.0.0'),
                    const SizedBox(height: AppSpacing.x3),
                    Text(
                      'Deutsche Dialekte lernen — Karteikarten, Quiz & mehr. '
                      'Lokal, ohne Konto.',
                      style: TextStyle(color: surfaces.textMuted, height: 1.5),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  const _InfoRow({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: TextStyle(color: surfaces.textMuted)),
        Flexible(
          child: Text(
            value,
            textAlign: TextAlign.end,
            style: const TextStyle(fontWeight: FontWeight.w600),
          ),
        ),
      ],
    );
  }
}
