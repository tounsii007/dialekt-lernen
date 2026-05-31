import 'package:flutter/material.dart';

import '../data/decks_store.dart';
import '../data/models.dart';
import '../data/notes_store.dart';
import '../theme/app_theme.dart';

/// Geteilte Dialoge/Sheets für Notizen & Decks — genutzt vom Dialekt-Detail,
/// den Decks- und Notizen-Screens.

/// Editiert die Notiz zu einem Ausdruck (max. 280 Zeichen).
Future<void> showNoteEditor(
  BuildContext context, {
  required String dialektId,
  required String ausdruckId,
  required String title,
}) async {
  final store = NotesStore.instance;
  final controller =
      TextEditingController(text: store.getNote(dialektId, ausdruckId));
  await showDialog<void>(
    context: context,
    builder: (context) {
      return AlertDialog(
        title: Text('Notiz · $title',
            maxLines: 1, overflow: TextOverflow.ellipsis),
        content: TextField(
          controller: controller,
          maxLength: NotesStore.maxLen,
          maxLines: 4,
          autofocus: true,
          decoration: const InputDecoration(
            hintText: 'Eigene Eselsbrücke, Kontext, Merkhilfe …',
          ),
        ),
        actions: [
          if (store.hasNote(dialektId, ausdruckId))
            TextButton(
              onPressed: () async {
                await store.setNote(dialektId, ausdruckId, '');
                if (context.mounted) Navigator.of(context).pop();
              },
              child: const Text('Löschen',
                  style: TextStyle(color: AppColors.danger)),
            ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Abbrechen'),
          ),
          FilledButton(
            onPressed: () async {
              await store.setNote(dialektId, ausdruckId, controller.text);
              if (context.mounted) Navigator.of(context).pop();
            },
            child: const Text('Speichern'),
          ),
        ],
      );
    },
  );
  controller.dispose();
}

/// Bottom-Sheet zum Hinzufügen/Entfernen eines Ausdrucks in Decks.
Future<void> showAddToDeckSheet(BuildContext context, AusdruckRef ref) async {
  final store = DecksStore.instance;
  await showModalBottomSheet<void>(
    context: context,
    showDragHandle: true,
    builder: (context) {
      return SafeArea(
        child: ListenableBuilder(
          listenable: store,
          builder: (context, _) {
            final surfaces = AppSurfaces.of(context);
            final decks = store.decks;
            return Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(
                      horizontal: AppSpacing.x5, vertical: AppSpacing.x2),
                  child: Row(
                    children: [
                      Text('Zu Deck hinzufügen',
                          style: Theme.of(context).textTheme.titleLarge),
                      const Spacer(),
                      TextButton.icon(
                        onPressed: () async {
                          final id = await showCreateDeckDialog(context);
                          if (id != null) await store.addToDeck(id, ref);
                        },
                        icon: const Icon(Icons.add_rounded),
                        label: const Text('Neu'),
                      ),
                    ],
                  ),
                ),
                if (decks.isEmpty)
                  Padding(
                    padding: const EdgeInsets.all(AppSpacing.x5),
                    child: Text('Noch keine Decks — leg eines an.',
                        style: TextStyle(color: surfaces.textMuted)),
                  )
                else
                  Flexible(
                    child: ListView(
                      shrinkWrap: true,
                      children: [
                        for (final d in decks)
                          CheckboxListTile(
                            value: store.contains(d.id, ref),
                            onChanged: (on) async {
                              if (on == true) {
                                await store.addToDeck(d.id, ref);
                              } else {
                                await store.removeFromDeck(d.id, ref);
                              }
                            },
                            title: Text(d.name),
                            subtitle: Text('${d.size} Ausdrücke'),
                            secondary: CircleAvatar(
                              radius: 9,
                              backgroundColor: hexColor(d.color),
                            ),
                          ),
                      ],
                    ),
                  ),
                const SizedBox(height: AppSpacing.x3),
              ],
            );
          },
        ),
      );
    },
  );
}

/// Dialog zum Anlegen eines neuen Decks. Liefert die neue Deck-ID (oder null).
Future<String?> showCreateDeckDialog(BuildContext context) async {
  final controller = TextEditingController();
  final id = await showDialog<String>(
    context: context,
    builder: (context) {
      return AlertDialog(
        title: const Text('Neues Deck'),
        content: TextField(
          controller: controller,
          autofocus: true,
          textCapitalization: TextCapitalization.sentences,
          decoration: const InputDecoration(hintText: 'Deck-Name'),
          onSubmitted: (_) async {
            final newId =
                await DecksStore.instance.createDeck(name: controller.text);
            if (context.mounted) Navigator.of(context).pop(newId);
          },
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Abbrechen'),
          ),
          FilledButton(
            onPressed: () async {
              final newId =
                  await DecksStore.instance.createDeck(name: controller.text);
              if (context.mounted) Navigator.of(context).pop(newId);
            },
            child: const Text('Anlegen'),
          ),
        ],
      );
    },
  );
  controller.dispose();
  return id;
}
