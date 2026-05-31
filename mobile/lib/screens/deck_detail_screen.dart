import 'package:flutter/material.dart';

import '../data/decks_store.dart';
import '../data/models.dart';
import '../data/repository.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/glass_card.dart';
import '../widgets/speak_button.dart';
import 'dialekt_detail_screen.dart';

/// Detailansicht eines eigenen Decks: enthaltene Ausdrücke ansehen/entfernen,
/// Deck umbenennen oder löschen.
class DeckDetailScreen extends StatelessWidget {
  const DeckDetailScreen({super.key, required this.deckId});

  final String deckId;

  @override
  Widget build(BuildContext context) {
    final store = DecksStore.instance;
    final repo = DialektRepository.instance;

    return AuroraBackground(
      child: SafeArea(
        child: ListenableBuilder(
          listenable: store,
          builder: (context, _) {
            final deck = store.getDeck(deckId);
            if (deck == null) {
              return const Center(child: Text('Deck nicht gefunden.'));
            }
            final color = hexColor(deck.color);
            final resolved = [
              for (final ref in deck.expressionIds)
                ?repo.resolve(ref.dialektId, ref.id),
            ];

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
                    CircleAvatar(radius: 9, backgroundColor: color),
                    const SizedBox(width: AppSpacing.x3),
                    Expanded(
                      child: Text(
                        deck.name,
                        style: Theme.of(context)
                            .textTheme
                            .headlineMedium
                            ?.copyWith(fontSize: 22),
                      ),
                    ),
                    IconButton(
                      tooltip: 'Umbenennen',
                      onPressed: () => _rename(context, store, deck),
                      icon: const Icon(Icons.edit_rounded),
                    ),
                    IconButton(
                      tooltip: 'Deck löschen',
                      onPressed: () => _confirmDelete(context, store, deck),
                      icon: const Icon(Icons.delete_outline_rounded,
                          color: AppColors.danger),
                    ),
                  ],
                ),
                const SizedBox(height: AppSpacing.x2),
                Padding(
                  padding: const EdgeInsets.only(left: AppSpacing.x2),
                  child: Text('${deck.size} Ausdrücke',
                      style: TextStyle(
                          color: AppSurfaces.of(context).textMuted,
                          fontSize: 13.5)),
                ),
                const SizedBox(height: AppSpacing.x4),
                if (resolved.isEmpty)
                  Padding(
                    padding: const EdgeInsets.all(AppSpacing.x5),
                    child: Text(
                      'Noch keine Ausdrücke. Füge welche über das Deck-Symbol '
                      'bei einem Ausdruck hinzu.',
                      style: TextStyle(
                          color: AppSurfaces.of(context).textMuted, height: 1.5),
                    ),
                  )
                else
                  for (final r in resolved) ...[
                    _DeckCell(
                      dialekt: r.dialekt,
                      ausdruck: r.ausdruck,
                      onRemove: () => store.removeFromDeck(
                          deckId, (dialektId: r.dialekt.id, id: r.ausdruck.id)),
                    ),
                    const SizedBox(height: AppSpacing.x2),
                  ],
              ],
            );
          },
        ),
      ),
    );
  }

  Future<void> _rename(
      BuildContext context, DecksStore store, Deck deck) async {
    final controller = TextEditingController(text: deck.name);
    await showDialog<void>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Deck umbenennen'),
        content: TextField(controller: controller, autofocus: true),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Abbrechen'),
          ),
          FilledButton(
            onPressed: () async {
              await store.updateDeck(deck.id, name: controller.text);
              if (context.mounted) Navigator.of(context).pop();
            },
            child: const Text('Speichern'),
          ),
        ],
      ),
    );
    controller.dispose();
  }

  Future<void> _confirmDelete(
      BuildContext context, DecksStore store, Deck deck) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('„${deck.name}" löschen?'),
        content: const Text('Das Deck wird entfernt. Die Ausdrücke bleiben '
            'in den Dialekten erhalten.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Abbrechen'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(backgroundColor: AppColors.danger),
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Löschen'),
          ),
        ],
      ),
    );
    if (ok == true) {
      await store.deleteDeck(deck.id);
      if (context.mounted) Navigator.of(context).maybePop();
    }
  }
}

class _DeckCell extends StatelessWidget {
  const _DeckCell({
    required this.dialekt,
    required this.ausdruck,
    required this.onRemove,
  });

  final Dialekt dialekt;
  final Ausdruck ausdruck;
  final VoidCallback onRemove;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return GlassCard(
      accent: dialekt.color,
      padding: const EdgeInsets.fromLTRB(
          AppSpacing.x4, AppSpacing.x2, AppSpacing.x2, AppSpacing.x2),
      onTap: () => Navigator.of(context).push(
        MaterialPageRoute(builder: (_) => DialektDetailScreen(dialekt: dialekt)),
      ),
      child: Row(
        children: [
          Text(dialekt.flag, style: const TextStyle(fontSize: 20)),
          const SizedBox(width: AppSpacing.x3),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(ausdruck.ausdruck,
                    style: const TextStyle(
                        fontSize: 15, fontWeight: FontWeight.w600)),
                Text(ausdruck.hochdeutsch,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(fontSize: 12.5, color: surfaces.textMuted)),
              ],
            ),
          ),
          SpeakButton(text: ausdruck.ausdruck, lang: dialekt.lang, size: 20),
          IconButton(
            tooltip: 'Entfernen',
            visualDensity: VisualDensity.compact,
            onPressed: onRemove,
            icon: Icon(Icons.remove_circle_outline_rounded,
                color: surfaces.textMuted, size: 20),
          ),
        ],
      ),
    );
  }
}
