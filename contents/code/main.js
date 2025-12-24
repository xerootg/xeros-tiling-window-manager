(function () {
"use strict";

function topHalfOrMaximize() {
    var w = workspace.activeWindow;
    if (!w) return;
    
    // Skip desktop, docks, and other special windows
    if (w.desktopWindow || w.dock || w.splash || w.utility || w.notification || w.popupWindow) return;
    if (!w.normalWindow && !w.dialog) return;
    
    var area = workspace.clientArea(KWin.MaximizeArea, w);
    var topHeight = Math.floor(area.height / 2);
    var g = w.frameGeometry;
    
    // Check if window is tiled to top half
    var isTiledUp = (Math.abs(g.x - area.x) <= 20 &&
                     Math.abs(g.y - area.y) <= 20 &&
                     Math.abs(g.width - area.width) <= 20 &&
                     Math.abs(g.height - topHeight) <= 20);
    
    if (isTiledUp) {
        // Is tiled up -> maximize
        w.setMaximize(true, true);
    } else {
        // Not tiled up -> tile up
        w.setMaximize(false, false);
        w.frameGeometry = {
            x: area.x,
            y: area.y,
            width: area.width,
            height: topHeight
        };
    }
}

function bottomHalfOrMinimize() {
    var w = workspace.activeWindow;
    if (!w) return;
    
    // Skip desktop, docks, and other special windows
    if (w.desktopWindow || w.dock || w.splash || w.utility || w.notification || w.popupWindow) return;
    if (!w.normalWindow && !w.dialog) return;
    
    var area = workspace.clientArea(KWin.MaximizeArea, w);
    var bottomHeight = Math.floor(area.height / 2);
    var bottomY = area.y + Math.ceil(area.height / 2);
    var g = w.frameGeometry;
    
    // Check if window is tiled to bottom half
    var isTiledDown = (Math.abs(g.x - area.x) <= 20 &&
                       Math.abs(g.y - bottomY) <= 20 &&
                       Math.abs(g.width - area.width) <= 20 &&
                       Math.abs(g.height - bottomHeight) <= 20);
    
    if (isTiledDown) {
        // Is tiled down -> minimize
        w.minimized = true;
    } else {
        // Not tiled down -> tile down
        w.setMaximize(false, false);
        w.frameGeometry = {
            x: area.x,
            y: bottomY,
            width: area.width,
            height: bottomHeight
        };
    }
}

registerShortcut(
    "TopHalfOrMaximize",
    "Top Half or Maximize",
    "Meta+Up",
    topHalfOrMaximize
);

registerShortcut(
    "BottomHalfOrMinimize",
    "Bottom Half or Minimize",
    "Meta+Down",
    bottomHalfOrMinimize
);

})();
