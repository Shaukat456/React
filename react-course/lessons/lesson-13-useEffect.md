````markdown
# Lesson 13 — useEffect deep-dive

Estimated time: 2–4 hours (read + hands-on exercises)

Purpose: Understand when and how to use `useEffect`, how to control timing via dependency arrays, how to clean up side effects, and common pitfalls to avoid.

---

## Quick summary

- `useEffect` runs after render and is used for side effects: data fetching, subscriptions, timers, manually changing the DOM, and integrating with non-React libraries.
- Its cleanup function runs before the next effect (or on unmount) and is where you cancel timers/subscriptions.
- The dependency array controls when the effect runs; empty array `[]` means "run once on mount"; omitting the array runs the effect after every render.

---

## The basics — signature and timing

```js
useEffect(() => {
  // effect: run after render
  return () => {
    // cleanup: run before next effect or on unmount
  };
}, [deps]);
```
````

- Effects run after the browser paints by default (so they don't block the paint). This is why `useLayoutEffect` exists for layout-measurement needs.

---

## Common patterns with examples

1. Data fetching (with abort)

```js
import { useState, useEffect } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch("/api/users", { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        if (err.name === "AbortError") return; // fetch was cancelled
        console.error(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []); // run on mount

  if (loading) return <div>Loading...</div>;
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

2. Subscriptions / Event listeners

```js
useEffect(() => {
  function onResize() {
    /* measure and set state */
  }
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);
```

3. Timers

```js
useEffect(() => {
  const id = setInterval(() => setTime((t) => t + 1), 1000);
  return () => clearInterval(id);
}, []);
```

4. Running effect when a prop changes

```js
useEffect(() => {
  // respond to prop change
  doSomething(maybeProp);
}, [maybeProp]);
```

---

## Dependency array: rules & common traps

- Rule of thumb: include every value you reference from the effect scope that can change (props, state, functions) in the dependency array.
- ESLint plugin `eslint-plugin-react-hooks` (recommended) enforces correct dependencies and suggests fixes.
- Common traps:
  - Omitting dependencies makes the effect stale (closing over old values) or causes bugs.
  - Including non-stable references (object literals, arrays, functions created inline) will re-run the effect every render.

Workarounds:

- Memoize functions with `useCallback` or values with `useMemo` when you intentionally want to keep stable references.
- Use refs (`useRef`) for mutable containers that shouldn't trigger re-renders.
- When you only want to run an effect once on mount but rely on a function defined outside, either declare the function inside the effect or wrap it in `useCallback` and include it in dependencies.

Bad pattern (re-runs every render):

```js
useEffect(() => {
  doSomething({ a: 1 });
}, [{ a: 1 }]); // array literal creates a fresh object each render
```

Good pattern:

```js
const value = useMemo(() => ({ a: 1 }), []);
useEffect(() => doSomething(value), [value]);
```

---

## Cancellation and cleanup

- Always clean up subscriptions/timers to avoid memory leaks and setting state on unmounted components.
- For fetch cancellation use `AbortController` (shown earlier) or ignore results with a `let mounted = true` flag.

Example (ignore pattern):

```js
useEffect(() => {
  let mounted = true;
  fetch("/api/data")
    .then((r) => r.json())
    .then((data) => {
      if (mounted) setData(data);
    });
  return () => {
    mounted = false;
  };
}, []);
```

---

## Performance & testing notes

- Minimize expensive operations inside effects; compute derived state outside or memoize inputs.
- Use profiling tools to see which effects are frequent.
- For testing, prefer to mock fetch/ timers (Jest fake timers) and assert behavior from component outputs rather than internal effect calls.

---

## Advanced patterns

- Debouncing inside effects (for search inputs) — use a timer and clear it on cleanup.
- Synchronizing state with external stores — use effects to subscribe and update local state.
- Effect composition — split multiple concerns into multiple `useEffect` calls rather than one large effect.

Example (split concerns):

```js
useEffect(() => {
  /* data fetch */
}, [query]);
useEffect(() => {
  /* tracking */
}, [page]);
```

Benefits: easier testing, clearer dependency lists, smaller and focused cleanup.

---

## Exercises

1. Implement a `Search` component that fetches suggestions as the user types, with a 300ms debounce and cancellation for previous requests.
2. Create a `WindowSize` hook that returns width/height and cleans up the resize listener on unmount.
3. Convert a class-based `componentDidMount/componentWillUnmount` subscription into a function component using `useEffect`.

---

## Interview Q&A (short)

Q: When does `useEffect` run?

A: After render and after the browser paints. The cleanup runs before the next effect or on unmount.

Q: What goes in the dependency array?

A: Every value referenced inside the effect that can change (props, state, functions). Use ESLint rules to keep it correct.

Q: How do you cancel an async fetch in `useEffect`?

A: Use `AbortController` to cancel fetch, or ignore results by tracking a mounted flag and avoiding state updates after unmount.

Q: Why split effects into multiple `useEffect` calls?

A: To separate concerns, reduce scope, simplify dependency lists, and make testing easier.

---

```

```
