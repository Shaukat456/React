````markdown
# Lesson 22 — Performance: profiling, optimizing, and best practices

Estimated time: 2–3 hours (read + hands-on profiling exercises)

Purpose: Help learners identify bottlenecks and apply targeted optimizations: profiling, memoization, virtualization, code-splitting, and Suspense.

---

## Measure before optimizing

- Use the React Profiler (DevTools) and browser performance tab to find real bottlenecks.
- Avoid premature optimization; optimize only the hot paths.

---

## React Profiler basics

- Open React DevTools → Profiler. Record interactions and inspect commit flame graphs, wasted renders, and timings.
- Look for components with long render times or excessive renders.

---

## Avoiding unnecessary re-renders

- Use `React.memo` for pure functional components to shallow-compare props.
- Use `useCallback`/`useMemo` to keep handlers/derived values stable when passed to memoized children.
- Prefer splitting components: smaller components are easier to memoize and profile.

Example:

```js
const Item = React.memo(function Item({ data, onClick }) {
  // expensive render
});

const onClick = useCallback((id) => {
  /* ... */
}, []);
```
````

---

## Virtualization for long lists

- For large lists use windowing libraries (react-window, react-virtualized) to render only visible items.
- Example usage with `react-window`:

```js
import { FixedSizeList as List } from "react-window";

function VirtualList({ items }) {
  return (
    <List height={500} itemCount={items.length} itemSize={35} width={300}>
      {({ index, style }) => <div style={style}>{items[index].name}</div>}
    </List>
  );
}
```

---

## Code-splitting & lazy loading

- Use `React.lazy` + `Suspense` to lazy-load large components or route-based chunks.

```js
const BigComponent = React.lazy(() => import("./BigComponent"));

function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <BigComponent />
    </Suspense>
  );
}
```

Notes: For SSR apps you’ll need a server-side strategy or frameworks (Next.js) that handle chunking and hydration.

---

## Avoid heavy work during render

- Move expensive calculations into `useMemo` or precompute on the server. Keep render cheap.
- Avoid expensive synchronous loops or JSON operations in the render path.

---

## Suspense for data fetching (experimental / adopted patterns)

- React Suspense can be used for data fetching with frameworks or libraries that integrate Suspense semantics (Relay, React Cache patterns).
- You can emulate the pattern with resource wrappers that throw promises and let Suspense catch them.

---

## Network & asset performance

- Use gzip/brotli compression, HTTP caching, and long-term caching with hashed filenames.
- Defer non-critical scripts and lazy-load images.

---

## Practical exercises

1. Use the React Profiler on the `vite-starter` app. Record an interaction that feels slow and identify the top 3 offenders.
2. Wrap a frequently-updating list item with `React.memo` and measure the difference.
3. Replace a long list with `react-window` and measure memory/paint improvements.

---

## Interview Q&A

Q: When should you use `useMemo`?

A: When a computation is expensive and its inputs rarely change. Use it after verifying the cost with a profiler — otherwise the memoization overhead may not be worth it.

Q: Why split code with `React.lazy`?

A: To reduce initial bundle size and speed up time-to-interactive by loading big chunks only when needed.

---

Would you like me to:

- Add a small `react-window` demo to the `vite-starter` app, or
- Add profiling notes and screenshots to the lesson (I can include example flame graphs)?

Which one shall I implement next?

```

```
