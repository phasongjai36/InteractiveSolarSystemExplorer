## 2025-05-18 - Canvas Offscreen Pre-rendering and Color Pre-computation in Animation Loops

**Learning:** Re-drawing 200 static background elements (stars) and running string parsing/color math (`parseInt`, hex string manipulations) on every `requestAnimationFrame` frame (~60 FPS) degrades performance and causes unnecessary CPU load and GC overhead. Pre-rendering static background elements into an offscreen canvas (`HTMLCanvasElement`) and precomputing static color derivatives reduces per-frame draw calls from >200 to 1 (`ctx.drawImage`).

**Action:** For HTML5 canvas animations, always isolate static visual layers (like star fields, grid backgrounds, static maps) onto offscreen canvases and pre-calculate invariant derived data outside the animation loop.
