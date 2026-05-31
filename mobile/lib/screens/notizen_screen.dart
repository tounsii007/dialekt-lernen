import 'package:flutter/material.dart';

import '../data/notes_store.dart';
import '../data/repository.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/deck_note_actions.dart';
import '../widgets/glass_card.dart';

/// Übersicht aller persönlichen Notizen (Port von js/store/notes.js).
class NotizenScreen extends StatelessWidget {
  const NotizenScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final store = NotesStore.instance;
    final repo = DialektRepository.instance;

    return AuroraBackground(
      child: SafeArea(
        child: ListenableBuilder(
          listenable: store,
          builder: (context, _) {
            final surfaces = AppSurfaces.of(context);
            final entries = store.all().entries.toList();
            return ListView(
              padding: const EdgeInsets.fromLTRB(
                  AppSpacing.x5, AppSpacing.x4, AppSpacing.x5, AppSpacing.x7),
              children: [
                Row(
                  children: [
                    IconButton(
                      onPressed: () => Navigator.of(context).maybePop(),
                      icon: const Icon(Icons.arrow_back_rounded),
                    ),
                    Text('📝 Notizen',
                        style: Theme.of(context)
                            .textTheme
                            .headlineMedium
                            ?.copyWith(fontSize: 23)),
                  ],
                ),
                const SizedBox(height: AppSpacing.x2),
                Padding(
                  padding: const EdgeInsets.only(left: AppSpacing.x2),
                  child: Text('${entries.length} Notizen',
                      style:
                          TextStyle(color: surfaces.textMuted, fontSize: 13.5)),
                ),
                const SizedBox(height: AppSpacing.x4),
                if (entries.isEmpty)
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: AppSpacing.x6),
                    child: Column(
                      children: [
                        const Text('📝', style: TextStyle(fontSize: 48)),
                        const SizedBox(height: AppSpacing.x3),
                        Text('Noch keine Notizen',
                            style: Theme.of(context).textTheme.titleLarge),
                        const SizedBox(height: AppSpacing.x2),
                        Text(
                          'Tippe bei einem Ausdruck auf das Notiz-Symbol, '
                          'um eine Merkhilfe festzuhalten.',
                          textAlign: TextAlign.center,
                          style: TextStyle(color: surfaces.textMuted),
                        ),
                      ],
                    ),
                  )
                else
                  for (final e in entries) ...[
                    _NoteCard(noteKey: e.key, text: e.value, repo: repo),
                    const SizedBox(height: AppSpacing.x3),
                  ],
              ],
            );
          },
        ),
      ),
    );
  }
}

class _NoteCard extends StatelessWidget {
  const _NoteCard(
      {required this.noteKey, required this.text, required this.repo});

  final String noteKey;
  final String text;
  final DialektRepository repo;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    // Key = "dialektId.ausdruckId" — am ersten Punkt trennen.
    final dot = noteKey.indexOf('.');
    final dialektId = dot < 0 ? noteKey : noteKey.substring(0, dot);
    final ausdruckId = dot < 0 ? '' : noteKey.substring(dot + 1);
    final resolved = repo.resolve(dialektId, ausdruckId);

    final title = resolved?.ausdruck.ausdruck ?? ausdruckId;
    final color = resolved?.dialekt.color ?? AppColors.brand;

    return GlassCard(
      accent: color,
      onTap: resolved == null
          ? null
          : () => showNoteEditor(
                context,
                dialektId: dialektId,
                ausdruckId: ausdruckId,
                title: title,
              ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              if (resolved != null) ...[
                Text(resolved.dialekt.flag,
                    style: const TextStyle(fontSize: 16)),
                const SizedBox(width: AppSpacing.x2),
              ],
              Expanded(
                child: Text(title,
                    style: const TextStyle(
                        fontSize: 15, fontWeight: FontWeight.w700)),
              ),
              Icon(Icons.edit_note_rounded, color: surfaces.textMuted, size: 20),
            ],
          ),
          const SizedBox(height: AppSpacing.x2),
          Text(text, style: TextStyle(fontSize: 13.5, height: 1.45)),
        ],
      ),
    );
  }
}
