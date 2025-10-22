# Lesson 12 — Hook deep-dive: useState

Learning objectives

- Understand `useState` semantics and memory model
- Learn functional updates, batching, and how `useState` interacts with renders
- Recognize stale closures and how to avoid them
- Analyze performance implications and best/worst practices
- See real-world use cases and interview Q&A

Overview

`useState` is the simplest React hook for adding state to function components. It returns a pair: the current state and a setter function. Calling the setter schedules a state update which causes React to re-render the component (possibly batched).

Basic example

```jsx
function Counter() {
  const [count, setCount] = React.useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}
```

Functional updates

- When a new state depends on the previous value, pass a function to the setter: `setCount(prev => prev + 1)`.
- Functional updates avoid stale closures when multiple updates are queued or when the setter is used inside async callbacks.

Batching behavior

- React may batch multiple state updates in a single render to improve performance. In React 18, updates in event handlers and effects are batched by default.
- Don't rely on immediate state after calling the setter; read the state in the next render or use functional updates when depending on previous state.

Stale closures

- Functions created during render capture the variables of that render. If an async callback references a value from render A, but the component re-rendered to render B, the callback still has the old reference.

Solutions

- Use functional updates: `setValue(v => computeFrom(v))`
- Use refs to keep latest values for use in callbacks: `const latestRef = useRef(value); useEffect(() => { latestRef.current = value; }, [value]);`

Performance considerations

- Local state updates cause the component to re-render. If the component has expensive subtrees, consider splitting state across smaller components or use `React.memo` to avoid unnecessary children updates.
- Avoid storing large derived data in state; compute or memoize instead.

Real-world scenarios

- Simple UI state: toggles, counters, form inputs' local values.
- Local caching: small caches for UI convenience (e.g., last search query in a component).
- When many independent pieces of state exist, use multiple `useState` calls rather than a single object state unless updates must be grouped.

Good practices

- Use small, focused pieces of state.
- Prefer functional updates when new state depends on previous state.
- Keep state close to where it is used (colocation).

Bad practices

- Storing derived data in state instead of computing it.
- Using a single object state for many unrelated values, leading to complex merging logic.

Exercises

1. Implement a counter with increment and decrement using `useState` and tests for correctness.
2. Create a component with an input and a debounced state update that only sets the debounced value after 500ms.

Interview Q&A

Q: Why use functional updates with useState?
A: Functional updates prevent stale state when the new value depends on previous state and when multiple updates are batched.

Q: Does calling setState immediately update the state variable?
A: No. It schedules an update; the updated state will be available on the next render.

Q: How can you avoid stale closures in async callbacks?
A: Use functional updates for state setters or keep the latest value in a ref that callbacks read.

Q: When should you use multiple useState calls vs. one object state?
A: Use multiple `useState` calls for unrelated pieces of state; use single-object state when updates must be transactional or grouped.

If you'd like, I will now create the `lesson-13-useEffect.md` file with the same depth and examples.
