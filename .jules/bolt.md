# Bolt Performance Journal

## 2025-05-18 - Canvas 60fps draw loop pre-computation
**Learning:** Performing modulo arithmetic, pseudo-random seed calculations, and hex string manipulation inside `requestAnimationFrame` canvas render loops causes unnecessary CPU cycles and object allocation (~12,000 star ops/sec + ~480 color string calculations/sec). Pre-computing static star properties and planet lightened/glow color strings once outside the animation loop significantly reduces per-frame execution overhead.
**Action:** Always extract per-frame color parsing, string building, and static mathematical layout calculations out of `requestAnimationFrame` draw functions into pre-computed data structures or refs.

## 2025-05-19 - React state vs Refs in 60fps Canvas event handlers
**Learning:** Storing canvas interaction state (like `hoveredPlanet`) in React `useState` triggers full React component re-renders on mouse movement over canvas elements. Moving transient hover state to a `useRef` and synchronizing animation controls (`isPlaying`, `speed`) via refs prevents component re-renders during mouse move and eliminates `requestAnimationFrame` teardown/restart overhead.
**Action:** Use `useRef` instead of `useState` for high-frequency canvas interaction state (hover/cursor) and render parameters inside active RAF loops.
