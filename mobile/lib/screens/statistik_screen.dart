import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../data/goals_store.dart';
import '../data/repository.dart';
import '../data/srs_store.dart';
import '../data/streak_store.dart';
import '../data/xp_store.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/glass_card.dart';

/// Lernstatistik-Dashboard: Kennzahlen, XP/Level, SRS-Status, Aktivitäts-
/// Heatmap, Lernziel-Verlauf und Fortschritt je Dialekt. Port von
/// js/views/statistiken.js (auf die mobil verfügbaren Daten zugeschnitten).
class StatistikScreen extends StatelessWidget {
  const StatistikScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final repo = DialektRepository.instance;
    final srs = SrsStore.instance;
    final xp = XpStore.instance;
    final streak = StreakStore.instance;
    final goals = GoalsStore.instance;

    return AuroraBackground(
      child: SafeArea(
        child: ListenableBuilder(
          listenable: Listenable.merge([srs, xp, streak, goals]),
          builder: (context, _) {
            final keys = [
              for (final p in repo.alleMitDialekt)
                '${p.dialekt.id}.${p.ausdruck.id}',
            ];
            final stats = srs.stats(keys);
            return ListView(
              padding: const EdgeInsets.fromLTRB(
                AppSpacing.x5,
                AppSpacing.x4,
                AppSpacing.x5,
                AppSpacing.x7,
              ),
              children: [
                _Header(),
                const SizedBox(height: AppSpacing.x5),
                _Overview(
                  learned: srs.learnedCount,
                  streak: streak.count,
                  xp: xp.total,
                  activeDays: streak.activeDays,
                  dialects: repo.dialekte.length,
                  due: stats.due,
                ),
                const SizedBox(height: AppSpacing.x6),
                _SectionTitle('XP & Level'),
                const SizedBox(height: AppSpacing.x3),
                _XpLevelCard(xp: xp),
                const SizedBox(height: AppSpacing.x6),
                _SectionTitle('Spaced-Repetition-Status'),
                const SizedBox(height: AppSpacing.x3),
                _SrsPills(stats: stats),
                const SizedBox(height: AppSpacing.x6),
                _SectionTitle('Aktivität (16 Wochen)'),
                const SizedBox(height: AppSpacing.x3),
                _HeatmapCard(days: streak.heatmap()),
                const SizedBox(height: AppSpacing.x6),
                _SectionTitle('Tagesziel (${goals.target}/Tag · 14 Tage)'),
                const SizedBox(height: AppSpacing.x3),
                _GoalHistoryCard(history: goals.history(), target: goals.target),
                const SizedBox(height: AppSpacing.x6),
                _SectionTitle('Fortschritt je Dialekt'),
                const SizedBox(height: AppSpacing.x3),
                _DialectProgressCard(repo: repo, srs: srs),
              ],
            );
          },
        ),
      ),
    );
  }
}

class _Header extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        IconButton(
          onPressed: () => Navigator.of(context).maybePop(),
          icon: const Icon(Icons.arrow_back_rounded),
        ),
        Text(
          '📊 Statistiken',
          style:
              Theme.of(context).textTheme.headlineMedium?.copyWith(fontSize: 24),
        ),
      ],
    );
  }
}

class _SectionTitle extends StatelessWidget {
  const _SectionTitle(this.text);
  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: AppSpacing.x1),
      child: Text(text, style: Theme.of(context).textTheme.titleLarge),
    );
  }
}

class _Overview extends StatelessWidget {
  const _Overview({
    required this.learned,
    required this.streak,
    required this.xp,
    required this.activeDays,
    required this.dialects,
    required this.due,
  });

  final int learned;
  final int streak;
  final int xp;
  final int activeDays;
  final int dialects;
  final int due;

  @override
  Widget build(BuildContext context) {
    final cards = <Widget>[
      _StatCard(emoji: '🃏', value: '$learned', label: 'Gelernt', color: AppColors.brand),
      _StatCard(emoji: '🔥', value: '$streak', label: 'Streak', color: AppColors.pink),
      _StatCard(emoji: '⚡', value: '$xp', label: 'XP gesamt', color: AppColors.warm),
      _StatCard(emoji: '📅', value: '$activeDays', label: 'Aktive Tage', color: AppColors.accent),
      _StatCard(emoji: '🗺️', value: '$dialects', label: 'Dialekte', color: AppColors.brand3),
      _StatCard(emoji: '⏰', value: '$due', label: 'Heute fällig', color: AppColors.accent2),
    ];
    return Column(
      children: [
        Row(children: [
          for (var i = 0; i < 3; i++) ...[
            if (i > 0) const SizedBox(width: AppSpacing.x3),
            Expanded(child: cards[i]),
          ],
        ]),
        const SizedBox(height: AppSpacing.x3),
        Row(children: [
          for (var i = 3; i < 6; i++) ...[
            if (i > 3) const SizedBox(width: AppSpacing.x3),
            Expanded(child: cards[i]),
          ],
        ]),
      ],
    );
  }
}

class _StatCard extends StatelessWidget {
  const _StatCard({
    required this.emoji,
    required this.value,
    required this.label,
    required this.color,
  });

  final String emoji;
  final String value;
  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return GlassCard(
      accent: color,
      padding: const EdgeInsets.symmetric(
          vertical: AppSpacing.x4, horizontal: AppSpacing.x2),
      child: Column(
        children: [
          Text(emoji, style: const TextStyle(fontSize: 22)),
          const SizedBox(height: 4),
          FittedBox(
            fit: BoxFit.scaleDown,
            child: Text(
              value,
              style: GoogleFonts.fraunces(
                fontSize: 22,
                fontWeight: FontWeight.w700,
                color: color,
              ),
            ),
          ),
          const SizedBox(height: 2),
          Text(
            label,
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 11.5, color: surfaces.textMuted),
          ),
        ],
      ),
    );
  }
}

class _XpLevelCard extends StatelessWidget {
  const _XpLevelCard({required this.xp});
  final XpStore xp;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final p = xp.progress;
    final log = xp.log(limit: 5);
    return GlassCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 56,
                height: 56,
                alignment: Alignment.center,
                decoration: const BoxDecoration(
                  gradient: AppColors.brandGradient,
                  shape: BoxShape.circle,
                ),
                child: Text(
                  '${xp.level}',
                  style: GoogleFonts.fraunces(
                    fontSize: 24,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
              ),
              const SizedBox(width: AppSpacing.x4),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(xp.title,
                        style: const TextStyle(
                            fontSize: 16, fontWeight: FontWeight.w700)),
                    const SizedBox(height: 2),
                    Text(
                      '${p.current} / ${p.needed} XP bis Level ${xp.level + 1}',
                      style:
                          TextStyle(fontSize: 12.5, color: surfaces.textMuted),
                    ),
                    const SizedBox(height: AppSpacing.x2),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(AppRadii.pill),
                      child: LinearProgressIndicator(
                        value: p.progress,
                        minHeight: 8,
                        backgroundColor: surfaces.border.withValues(alpha: 0.6),
                        valueColor: const AlwaysStoppedAnimation<Color>(
                            AppColors.brand),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          if (log.isNotEmpty) ...[
            const SizedBox(height: AppSpacing.x4),
            Divider(color: surfaces.border, height: 1),
            const SizedBox(height: AppSpacing.x3),
            for (final e in log)
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 3),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      e.reason.replaceAll('-', ' '),
                      style: TextStyle(fontSize: 13, color: surfaces.textMuted),
                    ),
                    Text(
                      '+${e.amount}',
                      style: const TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                        color: AppColors.warm,
                      ),
                    ),
                  ],
                ),
              ),
          ],
        ],
      ),
    );
  }
}

class _SrsPills extends StatelessWidget {
  const _SrsPills({required this.stats});
  final SrsStats stats;

  @override
  Widget build(BuildContext context) {
    final pills = <Widget>[
      _Pill(value: '${stats.due}', label: 'Heute fällig', color: AppColors.pink),
      _Pill(value: '${stats.learning}', label: 'Im Lernen', color: AppColors.warm),
      _Pill(value: '${stats.learned}', label: 'Gemeistert', color: AppColors.accent),
      _Pill(value: '${stats.fresh}', label: 'Noch neu', color: AppColors.brand3),
      if (stats.leeches > 0)
        _Pill(value: '${stats.leeches}', label: '⚠️ Problemkarten', color: AppColors.danger),
    ];
    return Wrap(
      spacing: AppSpacing.x3,
      runSpacing: AppSpacing.x3,
      children: pills,
    );
  }
}

class _Pill extends StatelessWidget {
  const _Pill({required this.value, required this.label, required this.color});
  final String value;
  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return Container(
      padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.x4, vertical: AppSpacing.x3),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(AppRadii.md),
        border: Border.all(color: color.withValues(alpha: 0.4)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(value,
              style: GoogleFonts.fraunces(
                  fontSize: 22, fontWeight: FontWeight.w700, color: color)),
          const SizedBox(height: 2),
          Text(label,
              style: TextStyle(fontSize: 12, color: surfaces.textMuted)),
        ],
      ),
    );
  }
}

class _HeatmapCard extends StatelessWidget {
  const _HeatmapCard({required this.days});
  final List<HeatDay> days;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final maxCount = days.fold<int>(1, (m, d) => d.count > m ? d.count : m);

    // Vorne auf Montag auffüllen, damit Spalten = Wochen sind.
    final lead = days.isEmpty ? 0 : (days.first.date.weekday + 6) % 7;
    final cells = <HeatDay?>[...List.filled(lead, null), ...days];
    final weeks = (cells.length / 7).ceil();

    Color cellColor(HeatDay? d) {
      if (d == null || d.count == 0) {
        return surfaces.border.withValues(alpha: 0.3);
      }
      final intensity = 0.3 + (d.count / maxCount) * 0.7;
      return AppColors.accent.withValues(alpha: intensity.clamp(0.3, 1.0));
    }

    const weekdayLabels = ['Mo', '', 'Mi', '', 'Fr', '', 'So'];

    return GlassCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Column(
                children: [
                  for (final l in weekdayLabels)
                    SizedBox(
                      height: 16,
                      child: Text(l,
                          style: TextStyle(
                              fontSize: 9, color: surfaces.textMuted)),
                    ),
                ],
              ),
              const SizedBox(width: 4),
              Expanded(
                child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  reverse: true,
                  child: Row(
                    children: [
                      for (var w = 0; w < weeks; w++)
                        Padding(
                          padding: const EdgeInsets.only(right: 3),
                          child: Column(
                            children: [
                              for (var r = 0; r < 7; r++)
                                () {
                                  final idx = w * 7 + r;
                                  final cell =
                                      idx < cells.length ? cells[idx] : null;
                                  return Container(
                                    width: 13,
                                    height: 13,
                                    margin: const EdgeInsets.only(bottom: 3),
                                    decoration: BoxDecoration(
                                      color: cellColor(cell),
                                      borderRadius: BorderRadius.circular(3),
                                    ),
                                  );
                                }(),
                            ],
                          ),
                        ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.x3),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              Text('weniger',
                  style: TextStyle(fontSize: 10, color: surfaces.textMuted)),
              const SizedBox(width: 4),
              for (final a in [0.3, 0.5, 0.7, 1.0])
                Container(
                  width: 11,
                  height: 11,
                  margin: const EdgeInsets.symmetric(horizontal: 1),
                  decoration: BoxDecoration(
                    color: a == 0.3
                        ? surfaces.border.withValues(alpha: 0.3)
                        : AppColors.accent.withValues(alpha: a),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              const SizedBox(width: 4),
              Text('mehr',
                  style: TextStyle(fontSize: 10, color: surfaces.textMuted)),
            ],
          ),
        ],
      ),
    );
  }
}

class _GoalHistoryCard extends StatelessWidget {
  const _GoalHistoryCard({required this.history, required this.target});
  final List<DayProgress> history;
  final int target;

  static const _wd = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return GlassCard(
      child: SizedBox(
        height: 120,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            for (final h in history) ...[
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Text(
                      h.count > 0 ? '${h.count}' : '',
                      style: TextStyle(fontSize: 9, color: surfaces.textMuted),
                    ),
                    const SizedBox(height: 2),
                    Container(
                      height: (80 *
                              (target > 0 ? (h.count / target) : 0.0)
                                  .clamp(0.0, 1.0))
                          .clamp(3.0, 80.0),
                      decoration: BoxDecoration(
                        color: h.met
                            ? AppColors.success
                            : (h.count > 0
                                ? AppColors.brand
                                : surfaces.border.withValues(alpha: 0.5)),
                        borderRadius: const BorderRadius.vertical(
                            top: Radius.circular(3)),
                      ),
                    ),
                    const SizedBox(height: 3),
                    Text(
                      _wd[(h.date.weekday + 6) % 7],
                      style: TextStyle(fontSize: 9, color: surfaces.textMuted),
                    ),
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class _DialectProgressCard extends StatelessWidget {
  const _DialectProgressCard({required this.repo, required this.srs});
  final DialektRepository repo;
  final SrsStore srs;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final rows = <Widget>[];
    for (final d in repo.dialekte) {
      final total = d.ausdruecke.length;
      if (total == 0) continue;
      var mastered = 0;
      for (final a in d.ausdruecke) {
        final c = srs.get('${d.id}.${a.id}');
        if (c != null && c.reps >= 2 && c.interval >= 6) mastered++;
      }
      final pct = total > 0 ? mastered / total : 0.0;
      rows.add(Padding(
        padding: const EdgeInsets.symmetric(vertical: 5),
        child: Row(
          children: [
            Text(d.flag, style: const TextStyle(fontSize: 15)),
            const SizedBox(width: AppSpacing.x2),
            SizedBox(
              width: 96,
              child: Text(
                d.name,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(fontSize: 12.5),
              ),
            ),
            const SizedBox(width: AppSpacing.x2),
            Expanded(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(AppRadii.pill),
                child: LinearProgressIndicator(
                  value: pct,
                  minHeight: 7,
                  backgroundColor: surfaces.border.withValues(alpha: 0.5),
                  valueColor: AlwaysStoppedAnimation<Color>(d.color),
                ),
              ),
            ),
            const SizedBox(width: AppSpacing.x2),
            SizedBox(
              width: 48,
              child: Text(
                '$mastered/$total',
                textAlign: TextAlign.end,
                style: TextStyle(fontSize: 11, color: surfaces.textMuted),
              ),
            ),
          ],
        ),
      ));
    }
    return GlassCard(child: Column(children: rows));
  }
}
