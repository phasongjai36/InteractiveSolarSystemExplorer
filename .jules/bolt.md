## 2025-05-20 - Pre-render static canvas elements with offscreen canvas
**Learning:** Drawing 200 individual stars (`arc` + `fill`) and calculating string/color conversions every frame at 60 FPS in 2D canvas animation loops blocks main thread execution unnecessarily.
**Action:** Pre-render static backgrounds (such as starfields) into an offscreen canvas on container resize and draw it using `ctx.drawImage()`, and pre-compute static color transformations.
