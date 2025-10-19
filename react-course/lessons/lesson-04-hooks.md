# Lesson 04 — Hooks: useState, useEffect and the rules of hooks

Learning objectives

- Understand core hooks (`useState`, `useEffect`) and the Rules of Hooks
- Learn patterns for effects, cleanup, and avoiding stale closures
- Recognize when to use refs and memoization helpers

useState deep dive

`useState` creates a piece of state local to the component. The setter can accept a value or a function that receives the previous state (functional update) — this is useful when the new state depends on the previous.

```jsx
const [count, setCount] = React.useState(0);
setCount((c) => c + 1); // functional update safer for async updates
```

useEffect and side effects

`useEffect` runs after the render is painted. It is used for side effects: subscriptions, timers, data fetching, manually interacting with DOM APIs, etc.

```jsx
React.useEffect(() => {
  const id = setInterval(() => setSeconds((s) => s + 1), 1000);
  return () => clearInterval(id); // cleanup on unmount or deps change
}, []); // empty deps -> run once on mount
```

Rules of Hooks (short)

- Only call hooks at the top level of React function components or custom hooks.
- Only call hooks from React function components or custom hooks (not in loops, conditions, or nested functions).

Avoiding stale closures

- When using `setInterval` or async callbacks, use functional updates or refs to read latest values.
- Include the correct dependencies array for effects. If you intentionally omit dependencies, document why and consider using refs.

useRef for mutable values that don't trigger renders

Use `useRef` to hold mutable values (like DOM nodes or an external value) without causing a re-render when they change.

Performance helpers

- `React.useMemo` memoizes expensive computations.
- `React.useCallback` memoizes callbacks for stable identity (use sparingly and only when it matters).

Real-world scenarios

- Data fetching: useEffect to load data on mount; handle loading/error state; cancel inflight requests on cleanup.
- Subscriptions: start in effect, cleanup on return (or dependency change).

Good practices

- Keep effects focused: one effect per concern (e.g., one for subscriptions, one for fetching).
- Use functional updates for state derived from previous state.
- Clean up side effects to avoid leaks (timers, subscriptions).

Bad practices

- Putting heavy synchronous work in render instead of memoizing or moving to effects.
- Forgetting to include dependencies in `useEffect`, leading to stale data or missed updates.

Exercises

1. Build a `Timer` component that increments every second and stops on unmount (see `examples/lesson-04-hooks-timer.html`).
2. Build a `FetchUsers` component that fetches from an API and handles loading/error states (see `examples/lesson-04-hooks-fetch.html`).

Interview questions & model answers

Q: What are the Rules of Hooks?
A: Hooks must be called at the top level of React function components or custom hooks, and not inside loops, conditions, or nested functions. This allows React to preserve hook call order between renders.

Q: How do you avoid stale state inside an effect that uses setInterval?
A: Use functional updates (setState(prev => ...)) so the updater reads the latest state, or store the most recent value in a ref and read it inside the interval callback.

Q: When should you use useMemo or useCallback?
A: Use them to avoid expensive recomputations or to provide stable function identities to child components that rely on referential equality. Don't overuse; measure first.

Q: What is a custom hook?
A: A custom hook is a function whose name starts with "use" and that can call other hooks. It's a way to extract and reuse hook-based logic (e.g., `useFetch`, `useAuth`).
