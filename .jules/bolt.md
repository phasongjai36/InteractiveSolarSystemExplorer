# Bolt Performance Journal

## 2025-05-18 - Canvas 60fps draw loop pre-computation
**Learning:** Performing modulo arithmetic, pseudo-random seed calculations, and hex string manipulation inside `requestAnimationFrame` canvas render loops causes unnecessary CPU cycles and object allocation (~12,000 star ops/sec + ~480 color string calculations/sec). Pre-computing static star properties and planet lightened/glow color strings once outside the animation loop significantly reduces per-frame execution overhead.
**Action:** Always extract per-frame color parsing, string building, and static mathematical layout calculations out of `requestAnimationFrame` draw functions into pre-computed data structures or refs.

## 2025-05-19 - React canvas hover state and animation loop stability
**Learning:** Storing canvas hover state in React `useState` when the hovered state is only used in a 60fps canvas draw loop causes unnecessary full React component tree re-renders on every `mousemove`. Furthermore, putting callbacks or state directly in the animation `useEffect` dependency array cancels and restarts `requestAnimationFrame` on every state change. Storing hover state in `useRef` and decoupling state in `requestAnimationFrame` via `useRef` prevents React re-renders on hover and keeps the animation frame loop running without teardown overhead.
**Action:** Use `useRef` for hover states and state variables read within continuous 60fps `requestAnimationFrame` canvas loops when the values are not directly required in React JSX markup.
