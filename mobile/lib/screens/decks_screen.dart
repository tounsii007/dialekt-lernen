import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../data/decks_store.dart';
import '../data/models.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/deck_note_actions.dart';
import '../widgets/glass_card.dart';
import 'deck_detail_screen.dart';

/// Übersicht der eigenen Decks (Port von js/store+views decks).
class DecksScreen extends StatelessWidget {
  const DecksScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final store = DecksStore.instance;
    final surfaces = AppSurfaces.of(context);

    return AuroraBackground(
      child: SafeArea(
        child: ListenableBuilder(
          listenable: store,
          builder: (context, _) {
            final decks = store.decks;
            return Stack(
              children: [
                ListView(
                  padding: const EdgeInsets.fromLTRB(AppSpacing.x5,
                      AppSpacing.x4, AppSpacing.x5, AppSpacing.x8),
                  children: [
                    Row(
                      children: [
                        IconButton(
                          onPressed: () => Navigator.of(context).maybePop(),
                          icon: const Icon(Icons.arrow_back_rounded),
                        ),
                        Text('📚 Meine Decks',
                            style: Theme.of(context)
                                .textTheme
                                .headlineMedium
                                ?.copyWith(fontSize: 23)),
                      ],
                    ),
                    const SizedBox(height: AppSpacing.x2),
                    Padding(
                      padding: const EdgeInsets.only(left: AppSpacing.x2),
                      child: Text(
                        'Eigene Listen aus Ausdrücken — quer durch alle Dialekte.',
                        style: TextStyle(
                            color: surfaces.textMuted, fontSize: 13.5),
                      ),
                    ),
                    const SizedBox(height: AppSpacing.x4),
                    if (decks.isEmpty)
                      Padding(
                        padding: const EdgeInsets.symmetric(
                            vertical: AppSpacing.x6),
                        child: Column(
                          children: [
                            const Text('📚', style: TextStyle(fontSize: 48)),
                            const SizedBox(height: AppSpacing.x3),
                            Text('Noch keine Decks',
                                style: Theme.of(context).textTheme.titleLarge),
                            const SizedBox(height: AppSpacing.x2),
                            Text(
                              'Leg ein Deck an und sammle deine Lieblings-Ausdrücke.',
                              textAlign: TextAlign.center,
                              style: TextStyle(color: surfaces.textMuted),
                            ),
                          ],
                        ),
                      )
                    else
                      for (final d in decks) ...[
                        _DeckCard(deck: d),
                        const SizedBox(height: AppSpacing.x3),
                      ],
                  ],
                ),
                Positioned(
                  right: AppSpacing.x5,
                  bottom: AppSpacing.x5,
                  child: FloatingActionButton.extended(
                    onPressed: () => showCreateDeckDialog(context),
                    icon: const Icon(Icons.add_rounded),
                    label: const Text('Neues Deck'),
                  ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}

class _DeckCard extends StatelessWidget {
  const _DeckCard({required this.deck});
  final Deck deck;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final color = hexColor(deck.color);
    return GlassCard(
      accent: color,
      onTap: () => Navigator.of(context).push(
        MaterialPageRoute(builder: (_) => DeckDetailScreen(deckId: deck.id)),
      ),
      child: Row(
        children: [
          Container(
            width: 44,
            height: 44,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.18),
              borderRadius: BorderRadius.circular(AppRadii.md),
            ),
            child: Icon(Icons.style_rounded, color: color),
          ),
          const SizedBox(width: AppSpacing.x4),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(deck.name,
                    style: GoogleFonts.fraunces(
                        fontSize: 17, fontWeight: FontWeight.w700)),
                const SizedBox(height: 2),
                Text('${deck.size} Ausdrücke',
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
