import 'package:flutter/material.dart';

import '../data/models.dart';
import '../data/repository.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/glass_card.dart';
import 'dialekt_detail_screen.dart';

/// Detailansicht einer Mini-Lektion mit Markdown-leichtem Rendering
/// (## Überschriften, Absätze, - Aufzählung, **fett**).
class LektionDetailScreen extends StatelessWidget {
  const LektionDetailScreen({super.key, required this.lektion});

  final Lektion lektion;

  @override
  Widget build(BuildContext context) {
    final repo = DialektRepository.instance;
    final surfaces = AppSurfaces.of(context);
    final related = _resolveRelated(repo);

    return AuroraBackground(
      child: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(
              AppSpacing.x5, AppSpacing.x4, AppSpacing.x5, AppSpacing.x7),
          children: [
            Row(
              children: [
                IconButton(
                  onPressed: () => Navigator.of(context).maybePop(),
                  icon: const Icon(Icons.arrow_back_rounded),
                ),
                Text(lektion.emoji, style: const TextStyle(fontSize: 26)),
              ],
            ),
            const SizedBox(height: AppSpacing.x3),
            Text(
              lektion.title,
              style: TextStyle(fontFamily: 'Fraunces', 
                  fontSize: 26, height: 1.2, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: AppSpacing.x2),
            Text(lektion.summary,
                style: TextStyle(
                    fontSize: 14.5, height: 1.5, color: surfaces.textMuted)),
            const SizedBox(height: AppSpacing.x5),
            ..._renderContent(context, lektion.content),
            if (related.isNotEmpty) ...[
              const SizedBox(height: AppSpacing.x5),
              Text('Passende Ausdrücke',
                  style: Theme.of(context).textTheme.titleLarge),
              const SizedBox(height: AppSpacing.x3),
              for (final r in related) ...[
                _RelatedCell(dialekt: r.dialekt, ausdruck: r.ausdruck),
                const SizedBox(height: AppSpacing.x2),
              ],
            ],
          ],
        ),
      ),
    );
  }

  List<({Dialekt dialekt, Ausdruck ausdruck})> _resolveRelated(
      DialektRepository repo) {
    final out = <({Dialekt dialekt, Ausdruck ausdruck})>[];
    for (final ref in lektion.relatedExpressions) {
      final d = repo.byId(ref.dialektId);
      if (d == null) continue;
      for (final a in d.ausdruecke) {
        if (a.id == ref.id) {
          out.add((dialekt: d, ausdruck: a));
          break;
        }
      }
    }
    return out;
  }

  // ── Markdown-leicht ───────────────────────────────────────────────────────

  List<Widget> _renderContent(BuildContext context, String content) {
    final widgets = <Widget>[];
    final buffer = <String>[];

    final bodyStyle =
        (Theme.of(context).textTheme.bodyMedium ?? const TextStyle())
            .copyWith(fontSize: 14.5, height: 1.6);

    void flush() {
      if (buffer.isEmpty) return;
      final text = buffer.join(' ');
      buffer.clear();
      widgets.add(Padding(
        padding: const EdgeInsets.only(bottom: AppSpacing.x3),
        child: RichText(text: TextSpan(children: _inline(text, bodyStyle))),
      ));
    }

    for (final raw in content.split('\n')) {
      final line = raw.trimRight();
      if (line.startsWith('## ')) {
        flush();
        widgets.add(Padding(
          padding: const EdgeInsets.only(top: AppSpacing.x2, bottom: AppSpacing.x2),
          child: Text(line.substring(3).trim(),
              style: TextStyle(fontFamily: 'Fraunces', 
                  fontSize: 18, fontWeight: FontWeight.w700)),
        ));
      } else if (line.trimLeft().startsWith('- ')) {
        flush();
        widgets.add(Padding(
          padding: const EdgeInsets.only(bottom: 6, left: AppSpacing.x2),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('•  ', style: bodyStyle),
              Expanded(
                child: RichText(
                  text: TextSpan(
                      children:
                          _inline(line.trimLeft().substring(2), bodyStyle)),
                ),
              ),
            ],
          ),
        ));
      } else if (line.trim().isEmpty) {
        flush();
      } else {
        buffer.add(line.trim());
      }
    }
    flush();
    return widgets;
  }

  List<TextSpan> _inline(String text, TextStyle base) {
    final spans = <TextSpan>[];
    final re = RegExp(r'\*\*(.+?)\*\*');
    var last = 0;
    for (final m in re.allMatches(text)) {
      if (m.start > last) {
        spans.add(TextSpan(text: text.substring(last, m.start), style: base));
      }
      spans.add(TextSpan(
          text: m.group(1),
          style: base.copyWith(fontWeight: FontWeight.w700)));
      last = m.end;
    }
    if (last < text.length) {
      spans.add(TextSpan(text: text.substring(last), style: base));
    }
    return spans;
  }
}

class _RelatedCell extends StatelessWidget {
  const _RelatedCell({required this.dialekt, required this.ausdruck});
  final Dialekt dialekt;
  final Ausdruck ausdruck;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return GlassCard(
      accent: dialekt.color,
      padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.x4, vertical: AppSpacing.x3),
      onTap: () => Navigator.of(context).push(
        MaterialPageRoute(builder: (_) => DialektDetailScreen(dialekt: dialekt)),
      ),
      child: Row(
        children: [
          Text(dialekt.flag, style: const TextStyle(fontSize: 16)),
          const SizedBox(width: AppSpacing.x3),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(ausdruck.ausdruck,
                    style: const TextStyle(
                        fontSize: 15, fontWeight: FontWeight.w600)),
                Text(ausdruck.hochdeutsch,
                    style: TextStyle(fontSize: 12.5, color: surfaces.textMuted)),
              ],
            ),
          ),
          Icon(Icons.chevron_right_rounded, color: surfaces.textMuted),
        ],
      ),
    );
  }
}
