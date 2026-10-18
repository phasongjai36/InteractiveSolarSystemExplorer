## 2025-05-20 - Offscreen canvas pre-rendering for canvas animations
**Learning:** Pre-rendering static background elements (like starfields) on an offscreen canvas and blitting with `ctx.drawImage` avoids hundreds of vector paths (`arc`, `fill`) per animation frame at 60 FPS. Pre-computing gradient colors outside the render loop further minimizes JS frame overhead.
**Action:** When working with HTML5 Canvas animation loops, look for static background paths or color manipulation functions to pre-render or pre-compute offscreen or at component initialization.
