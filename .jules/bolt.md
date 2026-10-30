# Bolt Performance Journal

## 2025-05-18 - Canvas 60fps draw loop pre-computation
**Learning:** Performing modulo arithmetic, pseudo-random seed calculations, and hex string manipulation inside `requestAnimationFrame` canvas render loops causes unnecessary CPU cycles and object allocation (~12,000 star ops/sec + ~480 color string calculations/sec). Pre-computing static star properties and planet lightened/glow color strings once outside the animation loop significantly reduces per-frame execution overhead.
**Action:** Always extract per-frame color parsing, string building, and static mathematical layout calculations out of `requestAnimationFrame` draw functions into pre-computed data structures or refs.

## 2025-05-19 - Offscreen canvas blitting & animation loop stabilization
**Learning:** Even with pre-computed star coordinates, iterating through 200 elements to execute `beginPath()`, `arc()`, and `fill()` on every frame invokes ~800 Canvas API state machine calls per frame (~48,000 call ops/sec at 60fps). Pre-rendering static background elements (like starfields) onto an offscreen canvas allows replacing the loop with a single fast `drawImage()` bit-block transfer (`blit`). Additionally, relying on React state in `useEffect` animation loop dependencies cancels and restarts `requestAnimationFrame` loops on state changes, causing frame drops; using `useRef` for animation state keeps the loop stable and uninterrupted.
**Action:** Pre-render static sub-scenes to an offscreen canvas and blit via `drawImage()`. Use refs to access active state inside `requestAnimationFrame` callbacks to prevent effect re-subscriptions.
