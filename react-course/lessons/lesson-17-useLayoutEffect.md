````markdown
# Lesson 17 — useLayoutEffect deep-dive

Estimated time: 1–2 hours (read + hands-on)

Purpose: Understand `useLayoutEffect`, when to prefer it over `useEffect`, how it affects rendering and layout measurement, and common use-cases and pitfalls.

---

## Quick summary

- `useLayoutEffect` runs synchronously after all DOM mutations but before the browser paints. This means it blocks the paint until the effect completes.
- Use it when you need to measure layout (DOM sizes/positions) and synchronously apply changes to avoid flicker.
- For most side effects (data fetching, subscriptions, logging) prefer `useEffect` which runs after the browser paints.

---

## Timing comparison

- Render -> DOM updated -> useLayoutEffect runs -> browser paints -> useEffect runs.

- Because `useLayoutEffect` runs before paint, heavy operations here can hurt perceived performance.

---

## Typical use-cases

1. Measuring DOM and synchronously applying a style/scroll position

```js
function FitToContent({ children }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width > 500) {
      el.style.background = "lightyellow";
    }
  }, [children]);
  return <div ref={ref}>{children}</div>;
}
```
````

2. Preventing flicker when measuring and adjusting before paint (e.g., scroll to anchored element then apply class)

3. Integrations with non-React libraries that expect DOM to be in its final state before being invoked.

---

## Best practices

- Keep `useLayoutEffect` work minimal and fast — only measure or synchronously apply small changes.
- Prefer `useEffect` when you don't need to block the paint.
- When safe, measure in `useLayoutEffect` and schedule non-urgent tasks in `useEffect` to avoid blocking.

---

## Example: synchronously measuring and centering an element

```js
function Centered({ children }) {
  const ref = useRef();
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { height } = el.getBoundingClientRect();
    el.style.marginTop = `calc(50vh - ${height / 2}px)`; // applied before paint
  }, [children]);
  return <div ref={ref}>{children}</div>;
}
```

---

## Pitfalls

- Overusing `useLayoutEffect` causes jank — it blocks rendering.
- Avoid expensive DOM reads and writes inside `useLayoutEffect` — prefer batching or using ResizeObserver for continuous measurements.
- Server-side rendering: `useLayoutEffect` warns on the server (no DOM). Use `useEffect` for code that should run only on the client, or guard with a check for `typeof window !== 'undefined'`.

---

## Exercises

1. Implement a `Measure` component that returns width/height using `useLayoutEffect` and displays them.
2. Convert a flickering tooltip to use `useLayoutEffect` so the position is measured and set before the tooltip is painted.

---

## Interview Q&A

Q: When should you prefer `useLayoutEffect` over `useEffect`?

A: When you need to read layout from the DOM and synchronously make changes before the browser paints to prevent flicker or layout mismatch.

Q: Will `useLayoutEffect` run on the server?

A: No — it runs after DOM mutations. On the server, `useLayoutEffect` emits a warning; prefer `useEffect` or guard client-only code.

Q: What are some alternatives to measuring in `useLayoutEffect`?

A: Use CSS for layout when possible, `ResizeObserver` for continuous measurements, or `requestAnimationFrame` for throttled reads.

---

If you want, I can:

- Add a runnable `Measure` component to the `vite-starter` showing width/height measurements (recommended), or
- Continue to `lesson-18-useImperativeHandle.md`.

Which should I do next?

```

```
