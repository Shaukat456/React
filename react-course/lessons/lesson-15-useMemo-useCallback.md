````markdown
# Lesson 15 — useMemo & useCallback (memoization in React)

Estimated time: 1–2 hours (read + hands-on)

Purpose: Understand what `useMemo` and `useCallback` do, when they help, when they don't, and how to avoid common anti-patterns that hurt performance.

---

## Quick summary

- `useMemo` memoizes a computed value and only recomputes when its dependencies change.
- `useCallback` memoizes a function reference so it remains stable across renders unless dependencies change.
- Both are performance optimization tools — they add complexity and overhead; measure before using.

```js
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(x), [x]);
```
````

---

## Why memoize?

- React compares props shallowly to decide whether child components should re-render. If you pass a new function or object each render, children using `React.memo` or `PureComponent` may re-render unnecessarily.
- Memoization stabilizes references and avoids wasted recalculations.

---

## `useMemo` examples

1. Expensive calculation

```js
const expensive = useMemo(() => {
  // heavy CPU work
  return items.reduce((acc, i) => acc + expensiveOp(i), 0);
}, [items]);
```

2. Avoid recreating arrays/objects passed to children

```js
const options = useMemo(() => ({ size: "large", color: theme }), [theme]);
<Child options={options} />;
```

---

## `useCallback` examples

```js
const handleClick = useCallback(() => {
  setCount((c) => c + 1);
}, []);

<Button onClick={handleClick} />;
```

Use case: when a child uses `React.memo` and expects stable function props.

---

## Common pitfalls and anti-patterns

- Overuse: wrapping every function in `useCallback` or value in `useMemo` adds memory and CPU overhead for memo bookkeeping.
- Premature optimization: small components rarely need memoization.
- Wrong dependencies: forgetting dependencies causes stale closures; including unstable values (new object/array every render) defeats memoization.
- Measuring: use React Profiler or benchmark before/after applying memoization.

Bad example (pointless useMemo):

```js
const value = useMemo(() => 1 + 2, []); // unnecessary, trivial computation
```

Good heuristic:

- Memoize expensive computations or to stabilize references passed to memoized children.

---

## Patterns: combining with React.memo

- Wrap child components with `React.memo` to skip re-renders when props are shallowly equal.

```js
const Child = React.memo(function Child({ onClick, options }) {
  /* ... */
});

// Parent
const options = useMemo(() => ({ size: "lg" }), []);
const onClick = useCallback(() => setOpen(true), []);
<Child onClick={onClick} options={options} />;
```

-- This pattern reduces unnecessary re-renders of `Child`.

---

## Measuring and testing

- Use the React Profiler to check commit times and number of renders.
- Add simple console logs to lifecycle or render to observe re-renders during development.

---

## Exercises

1. Create a `BigList` that renders 1,000 items and a parent counter. Measure re-renders and apply `React.memo` + `useCallback` to reduce re-renders.
2. Identify a trivial computation in an app and decide whether to memoize; measure before and after.

---

## Interview Q&A

Q: When should you use `useMemo`?

A: For expensive computations or to stabilize references (objects/arrays) passed to memoized children. Don’t use it for trivial calculations.

Q: What is the difference between `useMemo` and `useCallback`?

A: `useMemo` memoizes the result of a function. `useCallback` memoizes the function reference itself (equivalent to `useMemo(() => fn, [deps])`).

Q: Does `useCallback` prevent a function from changing?

A: It returns a stable reference until dependencies change; it doesn’t make the function immutable.

---

If you want, I can:

- Add the `BigList` example to the `vite-starter` to demonstrate render counts and profiling, or
- Continue to `lesson-16-useReducer.md` next.

Which would you like me to do next?

```

```
