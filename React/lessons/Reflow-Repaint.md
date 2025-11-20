# Reflow and Repaint — Detailed

This document explains the difference between reflow (layout) and repaint (paint), what causes them, how to measure them, and practical strategies to reduce their performance cost in web apps.

## Definitions

- Reflow (layout): the browser computes the geometry of elements — sizes and positions. This happens when the structure or dimensions that affect layout change.
- Repaint (paint): the browser fills pixels for elements (colors, background, text) without changing layout.
- Composite: the browser merges painted layers into the final screen output (often accelerated by GPU).

Reflow is usually more expensive than repaint because it can affect an entire subtree of the DOM or even the whole page.

## What triggers reflow

Common triggers:

- DOM changes that affect geometry: adding/removing elements, changing element dimensions, fonts, or display properties.
- Changing CSS properties that affect layout: width, height, margin, padding, border, display, position, font-size, etc.
- Reading layout-dependent properties (these force the browser to flush pending changes and compute layout): offsetWidth, offsetHeight, clientWidth, clientHeight, getComputedStyle(), scrollTop, etc.
- Resizing the window, changing device orientation, or switching CSS media queries.
- Changing the DOM in a way that impacts ancestors or siblings.

## What triggers repaint (but not reflow)

CSS properties that don't affect layout but change painting:

- color, background-color, visibility (when not affecting layout), outline, box-shadow (often paints only the layer), opacity (can be composited), transform (typically composited if isolated).

Note: some properties like transform and opacity can be promoted to their own layer and be GPU-accelerated, avoiding reflow/repaint of other content.

## How browsers optimize

Modern browsers:

- Batch style and layout work.
- Use dirty-checking and partial invalidation to avoid full-page reflow.
- Separate work into style, layout, paint, and composite phases.
- Promote layers to avoid repainting large regions (e.g., for animated transforms).

However, forcing layout reads or making many synchronous DOM writes can disable these optimizations and cause layout thrashing.

## Common anti-patterns (layout thrashing)

Bad pattern:

```js
// Repeated read/write loop causing reflows per iteration
for (let i = 0; i < items.length; i++) {
  const height = items[i].offsetHeight; // forces layout
  items[i].style.top = height + 10 + "px"; // triggers layout write
}
```

Better: separate reads from writes:

```js
const heights = Array.from(items, (el) => el.offsetHeight); // batch reads
for (let i = 0; i < items.length; i++) {
  items[i].style.top = heights[i] + 10 + "px"; // batch writes
}
```

## Practical strategies to reduce reflow/repaint

- Minimize DOM mutations: batch changes, use DocumentFragment or innerHTML to insert many nodes at once.
- Separate reads and writes: read all layout values first, then perform writes.
- Use transform and opacity for animations (GPU compositing) instead of top/left/width/height.
- Use requestAnimationFrame for visual updates and to align writes with the browser's render tick.
- Avoid forced synchronous layout reads (offsetWidth, getComputedStyle) inside loops or animation callbacks.
- Use CSS containment (contain: layout; contain: paint) to limit the layout scope when supported.
- Use will-change sparingly to hint at upcoming animations, but avoid overuse (it can force layer creation and memory use).
- Virtualize long lists (windowing) to keep the DOM small.
- Cache computed values where possible (e.g., store heights if they are stable).
- Use visibility: hidden or display: none appropriately — note display: none removes from layout (reflow) while visibility: hidden keeps layout but hides paint.

## Measuring and profiling

- Chrome DevTools Performance tab: record a profile, then inspect the flame chart and Summary/Bottom-Up views. Look for long Layout or Recalculate Style tasks.
- Rendering paint flashing and paint profiler: DevTools can show paint rectangles and layer borders.
- Use the FPS meter and Timeline to see dropped frames (16ms budget for 60fps).
- In DevTools: Performance → "Show Rendering" → enable "Paint flashing" to visualize which areas are being repainted.

## Examples

React animation: avoid layout reads in render and prefer transforms:

```jsx
import { useRef, useEffect } from "react";

function Slide({ x }) {
  const el = useRef();

  useEffect(() => {
    // Use transform to move element without reflow
    el.current.style.transform = `translateX(${x}px)`;
  }, [x]);

  return (
    <div ref={el} style={{ willChange: "transform" }}>
      Slide me
    </div>
  );
}
```

Batching DOM updates in vanilla JS:

```js
const frag = document.createDocumentFragment();
items.forEach((item) => {
  const div = document.createElement("div");
  div.textContent = item.text;
  frag.appendChild(div);
});
container.appendChild(frag); // single reflow for insertion
```

Use requestAnimationFrame for synchronous visual updates:

```js
function updatePosition(el, x) {
  requestAnimationFrame(() => {
    el.style.transform = `translateX(${x}px)`;
  });
}
```

## Quick checklist

- Read layout values only when necessary.
- Batch reads and writes.
- Use transforms/opacity for animations.
- Avoid forcing synchronous layouts.
- Profile in DevTools and target the largest Layout/Style recalculations.

## Summary

Reflow (layout) and repaint (paint) are distinct phases: reflow computes geometry and is more costly; repaint redraws pixels. Keep DOM small, batch updates, use composited properties for animations, and profile to find hotspots.

export const meta = {
topic: "reflow-repaint",
created: new Date().toISOString()
};
