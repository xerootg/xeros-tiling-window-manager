# Top Half or Maximize

KWin script for vertical window tiling with Meta+Up/Down.

## Shortcuts

### Meta+Up
- Any window → top half
- Left/right half → top-left/top-right corner
- Top corner → top half (full width)
- Top half → maximize

### Meta+Down
- Any window → bottom half
- Left/right half → bottom-left/bottom-right corner
- Bottom corner → bottom half (full width)
- Bottom half → minimize

## Installation

1. Copy to `~/.local/share/kwin/scripts/top-half-or-maximize/`
2. Enable in **System Settings → Window Management → KWin Scripts**
3. Manually bind shortcuts (see below)

## Binding Shortcuts

The shortcuts must be manually assigned after enabling the script:

1. Open **System Settings → Shortcuts**
2. Search for "Top Half"
3. Click on "Top Half or Maximize" and press **Meta+Up**
4. Search for "Bottom Half"
5. Click on "Bottom Half or Minimize" and press **Meta+Down**
6. Click **Apply**

Alternatively, run these commands:

```bash
kwriteconfig6 --file kglobalshortcutsrc --group kwin --key "TopHalfOrMaximize" "Meta+Up,Meta+Up,Top Half or Maximize"
kwriteconfig6 --file kglobalshortcutsrc --group kwin --key "BottomHalfOrMinimize" "Meta+Down,Meta+Down,Bottom Half or Minimize"
qdbus6 org.kde.KWin /KWin org.kde.KWin.reconfigure
```

## License

GPLv3
