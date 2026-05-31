import 'package:flutter/material.dart';

import '../state/settings_controller.dart';
import '../theme/app_theme.dart';
import 'entdecken_screen.dart';
import 'favoriten_screen.dart';
import 'home_screen.dart';
import 'lernen_screen.dart';
import 'quiz_screen.dart';

/// App-Gerüst mit Bottom-Navigation (Start · Entdecken · Lernen · Quiz · Favoriten).
/// Entspricht der .mobile-nav der Web-App mit erhöhtem Center-Button.
class AppShell extends StatefulWidget {
  const AppShell({super.key});

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int _index = 0;

  void _open(int i) => setState(() => _index = i);

  @override
  Widget build(BuildContext context) {
    final pages = [
      HomeScreen(onOpenTab: _open),
      const EntdeckenScreen(),
      const LernenScreen(),
      const QuizScreen(),
      const FavoritenScreen(),
    ];

    return Scaffold(
      extendBody: true,
      body: IndexedStack(index: _index, children: pages),
      bottomNavigationBar: _BottomBar(index: _index, onTap: _open),
    );
  }
}

class _NavItem {
  const _NavItem(this.icon, this.labelKey);
  final IconData icon;
  final String labelKey;
}

const _items = <_NavItem>[
  _NavItem(Icons.home_rounded, 'nav.home'),
  _NavItem(Icons.explore_rounded, 'nav.entdecken'),
  _NavItem(Icons.style_rounded, 'nav.lernen'),
  _NavItem(Icons.quiz_rounded, 'nav.quiz'),
  _NavItem(Icons.favorite_rounded, 'nav.favoriten'),
];

class _BottomBar extends StatelessWidget {
  const _BottomBar({required this.index, required this.onTap});

  final int index;
  final ValueChanged<int> onTap;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return Container(
      decoration: BoxDecoration(
        color: surfaces.surface.withValues(alpha: 0.92),
        border: Border(top: BorderSide(color: surfaces.border)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.2),
            blurRadius: 24,
            offset: const Offset(0, -4),
          ),
        ],
      ),
      child: SafeArea(
        top: false,
        child: SizedBox(
          height: 64,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              for (var i = 0; i < _items.length; i++)
                Expanded(
                  child: _BarButton(
                    item: _items[i],
                    active: i == index,
                    center: i == 2,
                    onTap: () => onTap(i),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

class _BarButton extends StatelessWidget {
  const _BarButton({
    required this.item,
    required this.active,
    required this.center,
    required this.onTap,
  });

  final _NavItem item;
  final bool active;
  final bool center;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final color = active ? AppColors.brand : surfaces.textMuted;

    if (center) {
      return InkResponse(
        onTap: onTap,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 46,
              height: 46,
              decoration: BoxDecoration(
                gradient: AppColors.brandGradient,
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: AppColors.brand.withValues(alpha: 0.45),
                    blurRadius: 16,
                    offset: const Offset(0, 6),
                  ),
                ],
              ),
              child: Icon(item.icon, color: Colors.white, size: 24),
            ),
            const SizedBox(height: 2),
            Text(SettingsController.instance.t(item.labelKey),
                style: TextStyle(fontSize: 10, color: color)),
          ],
        ),
      );
    }

    return InkResponse(
      onTap: onTap,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(item.icon, color: color, size: 24),
          const SizedBox(height: 4),
          Text(
            SettingsController.instance.t(item.labelKey),
            style: TextStyle(
              fontSize: 10,
              color: color,
              fontWeight: active ? FontWeight.w600 : FontWeight.w400,
            ),
          ),
        ],
      ),
    );
  }
}
