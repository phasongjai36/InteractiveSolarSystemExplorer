# Bolt's Journal

## 2025-05-18 - Canvas Static Layer Offscreen Pre-rendering
**Learning:** Re-drawing 200 static background star elements with `arc()` and `fill()` inside a 60 FPS `requestAnimationFrame` render loop creates unnecessary canvas API calls (12,000 operations/sec). Pre-rendering static background elements onto an offscreen canvas and drawing them with `drawImage()` in each frame significantly reduces CPU work per frame.
**Action:** Always offload static background elements or complex fixed paths in HTML5 Canvas animations to an offscreen canvas.
