# Bolt Performance Journal

## 2025-05-18 - Canvas 60fps draw loop pre-computation
**Learning:** Performing modulo arithmetic, pseudo-random seed calculations, and hex string manipulation inside `requestAnimationFrame` canvas render loops causes unnecessary CPU cycles and object allocation (~12,000 star ops/sec + ~480 color string calculations/sec). Pre-computing static star properties and planet lightened/glow color strings once outside the animation loop significantly reduces per-frame execution overhead.
**Action:** Always extract per-frame color parsing, string building, and static mathematical layout calculations out of `requestAnimationFrame` draw functions into pre-computed data structures or refs.

## 2025-05-19 - Decouple Canvas Animation Loops from React Component Re-renders
**Learning:** Storing high-frequency transient hover state (`hoveredPlanet`) or animation parameters in React state triggers full React component tree re-renders and re-executes `useCallback` / `useEffect` animation loop hooks. Replacing `hoveredPlanet` state with a `useRef` and reading dynamic values (`speed`, `isPlaying`, `selectedPlanet`) via refs within `requestAnimationFrame` allows the canvas to render smoothly without triggering React re-renders or tearing down / restarting the RAF loop.
**Action:** Keep transient interactive state and parameters used in RAF canvas loops in `useRef`s rather than `useState` whenever the UI outside the canvas does not depend directly on that transient state for React JSX rendering.
