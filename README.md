# Xerootg's Tiling Window Manager

KWin script for window tiling with Meta+Arrow keys.

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
- Bottom half → minimize (if enabled in settings)

### Meta+Left
- Any window → left half
- Top/bottom half → top-left/bottom-left corner
- Left corner → left half (full height)

### Meta+Right
- Any window → right half
- Top/bottom half → top-right/bottom-right corner
- Right corner → right half (full height)

## Configuration

Access settings via **System Settings → Window Management → KWin Scripts → Top Half or Maximize → Configure**

- **Enable minimize on double Meta+Down**: When enabled (default), pressing Meta+Down on a bottom-half window will minimize it. Disable to prevent accidental minimization.

## Installation

1. Copy to `~/.local/share/kwin/scripts/xeros-tiling-window-manager/`
2. Enable in **System Settings → Window Management → KWin Scripts**
3. Manually bind shortcuts (see below)

## Binding Shortcuts

The shortcuts must be manually assigned after enabling the script:

1. Open **System Settings → Shortcuts**
2. Search for "Top Half" and bind **Meta+Up**
3. Search for "Bottom Half" and bind **Meta+Down**
4. Search for "Left Half" and bind **Meta+Left**
5. Search for "Right Half" and bind **Meta+Right**
6. Click **Apply**

Alternatively, run these commands:

```bash
kwriteconfig6 --file kglobalshortcutsrc --group kwin --key "TopHalfOrMaximize" "Meta+Up,Meta+Up,Top Half or Maximize"
kwriteconfig6 --file kglobalshortcutsrc --group kwin --key "BottomHalfOrMinimize" "Meta+Down,Meta+Down,Bottom Half or Minimize"
kwriteconfig6 --file kglobalshortcutsrc --group kwin --key "LeftHalfOrCorner" "Meta+Left,Meta+Left,Left Half or Corner"
kwriteconfig6 --file kglobalshortcutsrc --group kwin --key "RightHalfOrCorner" "Meta+Right,Meta+Right,Right Half or Corner"
qdbus6 org.kde.KWin /KWin org.kde.KWin.reconfigure
```

## License

GPLv3
