# Bolt's Journal - Critical Learnings

## 2025-05-20 - Canvas 60 FPS Animation Loop Optimization
**Learning:** Performing string parsing (`parseInt`), hex conversions, and iterative PRNG/modulo math for 200 stars inside every `requestAnimationFrame` frame creates garbage collection churn and unnecessary CPU overhead. Pre-calculating static star properties and caching lightened planet colors reduces per-frame math and allocations.
**Action:** Always pre-calculate static visual assets/colors outside or memoize them in `useMemo` when rendering interactive Canvas HTML5 animations.
