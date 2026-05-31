import 'package:flutter/material.dart';

import '../data/repository.dart';
import '../data/srs_store.dart';
import '../state/i18n.dart';
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
                  Text(settings.t('settings.title'),
                      style: Theme.of(context).textTheme.headlineMedium
                          ?.copyWith(fontSize: 24)),
                ],
              ),
              const SizedBox(height: AppSpacing.x5),

              Text(settings.t('settings.appearance'),
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
                            Text(settings.t('settings.design')),
                          ],
                        ),
                        const SizedBox(height: AppSpacing.x3),
                        SizedBox(
                          width: double.infinity,
                          child: SegmentedButton<ThemeMode>(
                            segments: [
                              ButtonSegment(
                                value: ThemeMode.system,
                                label: Text(settings.t('theme.system')),
                                icon: const Icon(Icons.brightness_auto_rounded),
                              ),
                              ButtonSegment(
                                value: ThemeMode.light,
                                label: Text(settings.t('theme.light')),
                                icon: const Icon(Icons.light_mode_rounded),
                              ),
                              ButtonSegment(
                                value: ThemeMode.dark,
                                label: Text(settings.t('theme.dark')),
                                icon: const Icon(Icons.dark_mode_rounded),
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

              Text(settings.t('settings.language'),
                  style: Theme.of(context).textTheme.titleLarge),
              const SizedBox(height: AppSpacing.x3),
              GlassCard(
                padding: const EdgeInsets.all(AppSpacing.x4),
                child: ListenableBuilder(
                  listenable: settings,
                  builder: (context, _) => Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(Icons.translate_rounded,
                              size: 20, color: AppColors.brand),
                          const SizedBox(width: AppSpacing.x3),
                          Text(settings.t('settings.language')),
                        ],
                      ),
                      const SizedBox(height: AppSpacing.x3),
                      SizedBox(
                        width: double.infinity,
                        child: SegmentedButton<AppLang>(
                          segments: const [
                            ButtonSegment(
                              value: AppLang.de,
                              label: Text('Deutsch'),
                            ),
                            ButtonSegment(
                              value: AppLang.en,
                              label: Text('English'),
                            ),
                          ],
                          selected: {settings.lang},
                          showSelectedIcon: false,
                          onSelectionChanged: (sel) {
                            if (sel.isNotEmpty) settings.setLang(sel.first);
                          },
                        ),
                      ),
                      const SizedBox(height: AppSpacing.x2),
                      Text(
                        settings.t('settings.language.note'),
                        style: TextStyle(
                            color: surfaces.textMuted,
                            fontSize: 12.5,
                            height: 1.4),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: AppSpacing.x6),

              Text(settings.t('settings.scheduler'),
                  style: Theme.of(context).textTheme.titleLarge),
              const SizedBox(height: AppSpacing.x3),
              const _LearningAlgoCard(),
              const SizedBox(height: AppSpacing.x6),

              Text(settings.t('settings.about'),
                  style: Theme.of(context).textTheme.titleLarge),
              const SizedBox(height: AppSpacing.x3),
              GlassCard(
                padding: const EdgeInsets.all(AppSpacing.x4),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _InfoRow(
                      label: settings.t('settings.content'),
                      value:
                          '${repo.dialekte.length} Dialekte · ${repo.totalAusdruecke} Ausdrücke',
                    ),
                    const SizedBox(height: AppSpacing.x3),
                    _InfoRow(label: settings.t('settings.app'), value: 'Dialekto · v1.0.0'),
                    const SizedBox(height: AppSpacing.x3),
                    Text(
                      settings.t('settings.about.text'),
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

class _LearningAlgoCard extends StatelessWidget {
  const _LearningAlgoCard();

  static const List<double> _retentionOptions = [0.8, 0.85, 0.9, 0.95];

  @override
  Widget build(BuildContext context) {
    final srs = SrsStore.instance;
    final surfaces = AppSurfaces.of(context);
    return GlassCard(
      padding: const EdgeInsets.all(AppSpacing.x4),
      child: ListenableBuilder(
        listenable: srs,
        builder: (context, _) {
          final isFsrs = srs.scheduler == 'fsrs';
          final currentRet = _retentionOptions.reduce((a, b) =>
              (a - srs.retention).abs() <= (b - srs.retention).abs() ? a : b);
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(Icons.psychology_rounded,
                      size: 20, color: AppColors.brand),
                  const SizedBox(width: AppSpacing.x3),
                  const Expanded(child: Text('Scheduler')),
                ],
              ),
              const SizedBox(height: AppSpacing.x3),
              SizedBox(
                width: double.infinity,
                child: SegmentedButton<String>(
                  segments: const [
                    ButtonSegment(
                      value: 'fsrs',
                      label: Text('FSRS'),
                      icon: Icon(Icons.auto_awesome_rounded),
                    ),
                    ButtonSegment(
                      value: 'sm2',
                      label: Text('SM-2'),
                      icon: Icon(Icons.timeline_rounded),
                    ),
                  ],
                  selected: {srs.scheduler},
                  showSelectedIcon: false,
                  onSelectionChanged: (sel) {
                    if (sel.isNotEmpty) srs.setConfig(scheduler: sel.first);
                  },
                ),
              ),
              const SizedBox(height: AppSpacing.x2),
              Text(
                isFsrs
                    ? 'FSRS-5 plant Reviews nach einem Gedächtnismodell — '
                        'präziser als SM-2.'
                    : 'SM-2 (klassisch, Anki-Stil). Dein Lernstand bleibt erhalten.',
                style: TextStyle(
                    color: surfaces.textMuted, fontSize: 12.5, height: 1.4),
              ),
              if (isFsrs) ...[
                const SizedBox(height: AppSpacing.x4),
                const Text('Wunsch-Retention'),
                const SizedBox(height: AppSpacing.x2),
                SizedBox(
                  width: double.infinity,
                  child: SegmentedButton<double>(
                    segments: const [
                      ButtonSegment(value: 0.8, label: Text('80 %')),
                      ButtonSegment(value: 0.85, label: Text('85 %')),
                      ButtonSegment(value: 0.9, label: Text('90 %')),
                      ButtonSegment(value: 0.95, label: Text('95 %')),
                    ],
                    selected: {currentRet},
                    showSelectedIcon: false,
                    onSelectionChanged: (sel) {
                      if (sel.isNotEmpty) srs.setConfig(retention: sel.first);
                    },
                  ),
                ),
                const SizedBox(height: AppSpacing.x2),
                Text(
                  'Höher = häufigere Wiederholungen, bessere Erinnerung.',
                  style: TextStyle(
                      color: surfaces.textMuted, fontSize: 12.5, height: 1.4),
                ),
                const SizedBox(height: AppSpacing.x2),
                SwitchListTile(
                  contentPadding: EdgeInsets.zero,
                  value: srs.fuzzEnabled,
                  onChanged: (v) => srs.setConfig(fuzz: v),
                  title: const Text('Intervalle streuen',
                      style: TextStyle(fontSize: 14)),
                  subtitle: Text(
                    'Verteilt die tägliche Last gleichmäßiger (Load-Balancing).',
                    style:
                        TextStyle(color: surfaces.textMuted, fontSize: 12),
                  ),
                ),
              ],
            ],
          );
        },
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
