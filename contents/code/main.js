(function () {
    "use strict";

    function isNear(a, b, tolerance) {
        return Math.abs(a - b) <= tolerance;
    }

    function topHalfOrMaximize() {
        var w = workspace.activeWindow;
        if (!w) return;

        // Skip desktop, docks, and other special windows
        if (w.desktopWindow || w.dock || w.splash || w.utility || w.notification || w.popupWindow) return;
        if (!w.normalWindow && !w.dialog) return;

        var area = workspace.clientArea(KWin.MaximizeArea, w);
        var halfWidth = Math.floor(area.width / 2);
        var halfHeight = Math.floor(area.height / 2);
        var g = w.frameGeometry;
        var tol = 20;

        // Check if tiled to left half (full height)
        var isTiledLeft = isNear(g.x, area.x, tol) &&
            isNear(g.y, area.y, tol) &&
            isNear(g.width, halfWidth, tol) &&
            isNear(g.height, area.height, tol);

        // Check if tiled to right half (full height)
        var isTiledRight = isNear(g.x, area.x + halfWidth, tol) &&
            isNear(g.y, area.y, tol) &&
            isNear(g.width, halfWidth, tol) &&
            isNear(g.height, area.height, tol);

        // Check if tiled to top half (full width)
        var isTiledUp = isNear(g.x, area.x, tol) &&
            isNear(g.y, area.y, tol) &&
            isNear(g.width, area.width, tol) &&
            isNear(g.height, halfHeight, tol);

        // Check if tiled to top-left corner
        var isTiledTopLeft = isNear(g.x, area.x, tol) &&
            isNear(g.y, area.y, tol) &&
            isNear(g.width, halfWidth, tol) &&
            isNear(g.height, halfHeight, tol);

        // Check if tiled to top-right corner
        var isTiledTopRight = isNear(g.x, area.x + halfWidth, tol) &&
            isNear(g.y, area.y, tol) &&
            isNear(g.width, halfWidth, tol) &&
            isNear(g.height, halfHeight, tol);

        w.setMaximize(false, false);

        if (isTiledUp) {
            // Top half (full width) -> maximize
            w.setMaximize(true, true);
        } else if (isTiledTopLeft || isTiledTopRight) {
            // Corner -> expand to full top half
            w.frameGeometry = { x: area.x, y: area.y, width: area.width, height: halfHeight };
        } else if (isTiledLeft) {
            // Left half -> top-left corner
            w.frameGeometry = { x: area.x, y: area.y, width: halfWidth, height: halfHeight };
        } else if (isTiledRight) {
            // Right half -> top-right corner
            w.frameGeometry = { x: area.x + halfWidth, y: area.y, width: halfWidth, height: halfHeight };
        } else {
            // Otherwise -> tile to top half
            w.frameGeometry = { x: area.x, y: area.y, width: area.width, height: halfHeight };
        }
    }

    function bottomHalfOrMinimize() {
        var w = workspace.activeWindow;
        if (!w) return;

        // Skip desktop, docks, and other special windows
        if (w.desktopWindow || w.dock || w.splash || w.utility || w.notification || w.popupWindow) return;
        if (!w.normalWindow && !w.dialog) return;

        var area = workspace.clientArea(KWin.MaximizeArea, w);
        var halfWidth = Math.floor(area.width / 2);
        var halfHeight = Math.floor(area.height / 2);
        var bottomY = area.y + Math.ceil(area.height / 2);
        var g = w.frameGeometry;
        var tol = 20;

        // Check if tiled to left half (full height)
        var isTiledLeft = isNear(g.x, area.x, tol) &&
            isNear(g.y, area.y, tol) &&
            isNear(g.width, halfWidth, tol) &&
            isNear(g.height, area.height, tol);

        // Check if tiled to right half (full height)
        var isTiledRight = isNear(g.x, area.x + halfWidth, tol) &&
            isNear(g.y, area.y, tol) &&
            isNear(g.width, halfWidth, tol) &&
            isNear(g.height, area.height, tol);

        // Check if tiled to bottom half (full width)
        var isTiledDown = isNear(g.x, area.x, tol) &&
            isNear(g.y, bottomY, tol) &&
            isNear(g.width, area.width, tol) &&
            isNear(g.height, halfHeight, tol);

        // Check if tiled to bottom-left corner
        var isTiledBottomLeft = isNear(g.x, area.x, tol) &&
            isNear(g.y, bottomY, tol) &&
            isNear(g.width, halfWidth, tol) &&
            isNear(g.height, halfHeight, tol);

        // Check if tiled to bottom-right corner
        var isTiledBottomRight = isNear(g.x, area.x + halfWidth, tol) &&
            isNear(g.y, bottomY, tol) &&
            isNear(g.width, halfWidth, tol) &&
            isNear(g.height, halfHeight, tol);

        if (isTiledDown) {
            // Bottom half (full width) -> minimize
            w.minimized = true;
        } else if (isTiledBottomLeft || isTiledBottomRight) {
            // Corner -> expand to full bottom half
            w.setMaximize(false, false);
            w.frameGeometry = { x: area.x, y: bottomY, width: area.width, height: halfHeight };
        } else {
            w.setMaximize(false, false);

            if (isTiledLeft) {
                // Left half -> bottom-left corner
                w.frameGeometry = { x: area.x, y: bottomY, width: halfWidth, height: halfHeight };
            } else if (isTiledRight) {
                // Right half -> bottom-right corner
                w.frameGeometry = { x: area.x + halfWidth, y: bottomY, width: halfWidth, height: halfHeight };
            } else {
                // Otherwise -> tile to bottom half
                w.frameGeometry = { x: area.x, y: bottomY, width: area.width, height: halfHeight };
            }
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
