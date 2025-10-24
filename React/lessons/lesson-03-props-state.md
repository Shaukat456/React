# Lesson 03 — Deep dive: Props and State (beginner → expert)

Learning objectives

- Master props and state at both conceptual and implementation levels
- Understand what happens when state changes (rendering, reconciliation, and side effects)
- Learn advanced patterns: lifting, colocation, reducers, optimistic updates, server vs client state
- Learn practical trade-offs and common interview questions

Overview

Props and state are the core of React's data flow:

- Props: read-only inputs passed from parent to child (one-way downward data flow)
- State: local, mutable data owned by a component (useState/useReducer)

This lesson walks from basics to advanced scenarios and explains the runtime mechanics when state changes.

1. Props — the basics and responsibilities

- Props are values passed into components. Treat them as immutable inside the component. They are similar to function arguments.
- A child can receive callback props (functions) to notify parents of intent; the parent remains the single source of truth.

Example

```jsx
function Greeting({ name, onClick }) {
  return <div onClick={() => onClick(name)}>Hello, {name}</div>;
}
```

Real-world scenario

- Parent `UserList` provides user data to `UserCard` via props; `UserCard` calls `onFavorite` callback when the user clicks a favorite button.

Good practices

- Keep props shallow and clear. Prefer passing data and callbacks rather than complex object graphs unless documented.
- Use PropTypes or TypeScript to declare expected prop shapes.

Bad practices

- Mutating objects received via props.
- Passing down large prop chains through many intermediate components (use Context or composition instead).

Interview Q&A (props)

Q: Why are props considered immutable?
A: Treating props as immutable makes components predictable and easier to reason about. If a component needs modifiable state, it should copy props into its own state or request updates via callbacks.

Q: How can a child modify parent data?
A: Children invoke callback props provided by the parent (e.g., `onChange`, `onSubmit`). The parent then updates its state and re-renders with new props.

2. State — the basics

- State holds data that changes over time and affects the rendered output. In function components use `useState` or `useReducer`.

Basic example

```jsx
function Counter() {
  const [count, setCount] = React.useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}
```

What happens when setState is called (high level)

1. You call a setter (e.g., `setCount(2)` or `setCount(prev => prev + 1)`).
2. React schedules an update for the component. In React 18, updates may be batched and scheduled with priorities.
3. On the next render pass the component function runs with the new state value(s).
4. React builds a new virtual DOM tree for that component and its children.
5. React diffs the previous virtual DOM and the new one, computes minimal DOM mutations (reconciliation), and applies them.
6. After DOM updates, effects (`useEffect`) whose dependencies changed run.

Important implications

- setState doesn't synchronously update `count` immediately inside the same function (readers should use functional updates when depending on previous state).
- React may batch multiple state updates into a single re-render for performance.

Interview Q&A (state basics)

Q: Is setState synchronous?
A: No. In function components `useState` updates are scheduled and may be batched; use functional updates to read prior state correctly.

Q: What is functional update and why use it?
A: A functional update is `setState(prev => next)`; it avoids stale closure issues when the new state depends on previous state or when multiple updates are queued.

3. Lifting state, colocation, and single source of truth

- Lifting: move state to the closest common ancestor when multiple components need access.
- Colocate state with the component that owns the logic whenever possible; lift only when sharing is required.

Example (lifting)

```jsx
function Parent() {
  const [value, setValue] = React.useState("");
  return (
    <>
      <ChildA value={value} onChange={setValue} />
      <ChildB value={value} />
    </>
  );
}
```

Real-world scenarios

- Form wizard: keep form data in a parent (wizard) component and pass parts to step components.
- Shared filters on a dashboard: store filters at the container level and pass to list components.

Good practices

- Lift only when necessary to avoid prop drilling; use Context for truly global concerns (theme, auth).
- Keep the state shape minimal and normalized for easier updates.

Bad practices

- Lifting everything to the top-level app by default. This causes unnecessary re-renders and coupling.

Interview Q&A (lifting)

Q: When should you lift state vs use Context?
A: Lift state when a small set of sibling components need it. Use Context when many components across the tree need the same data; but avoid storing frequently-updating high-volume state in Context.

4. Derived state & memoization

- Derived state is data that can be computed from props/state. Do not duplicate it in state; compute it during render or memoize using `useMemo` if expensive.

Example

```jsx
const filtered = React.useMemo(() => items.filter((i) => i.active), [items]);
```

Good practices

- Keep derived data out of state. If you must store it in state (e.g., to preserve across unmounts), document why.

Interview Q&A (derived state)

Q: What's wrong with storing derived data in state?
A: It creates duplication of truth. You must keep both copies in sync, which is error-prone. Prefer computing derived values during render or memoize.

5. Reducers and complex state (useReducer)

- `useReducer` is useful for complex state transitions, predictable updates, and when many sub-values depend on actions.

Example

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "reset":
      return { count: 0 };
  }
}
const [state, dispatch] = React.useReducer(reducer, { count: 0 });
```

Real-world scenarios

- Complex forms, multi-step workflows, and local state machines.

Good practices

- Use `useReducer` to keep state transitions explicit and testable. Combine with Context to provide dispatch globally.

Interview Q&A (reducers)

Q: When should you use useReducer instead of multiple useState calls?
A: When state updates are related, numerous, or when you want to centralize update logic and make it testable.

6. Server state vs client state

- Server state: data fetched from servers (remote). Needs caching, background revalidation, and error handling.
- Client state: UI state kept locally in components.

Patterns & tools

- For server state prefer libraries like React Query, SWR, or TanStack Query to handle caching, deduping, retries, and background refetching.

Real-world scenarios

- Use React Query for lists of data (users, posts) that need caching and background updates; use local state for UI controls.

Interview Q&A (server vs client)

Q: Why not put server data into Context or Redux by default?
A: Server data has specific concerns (caching, revalidation, retries). Libraries built for server state simplify these concerns and avoid reinventing complex logic.

7. Optimistic updates and error recovery

- Optimistic updates update UI immediately (assume success) then reconcile when the server responds. Requires rollback logic on failure.

Pattern

- Update local state to show success immediately, send network request, and revert on error (or reconcile with server response).

Interview Q&A (optimistic)

Q: What is an optimistic update and when to use it?
A: Optimistic update updates the UI before server confirmation to make app feel faster. Use for high-UX-value actions (likes, toggles), but implement rollback on failure.

8. What happens when state changes — detailed lifecycle

Sequence (simplified)

1. setState called -> schedule update
2. React re-renders component (may batch multiple updates)
3. Child components are re-evaluated (function bodies run)
4. React diffs virtual DOM and applies minimal DOM patches
5. After DOM updates, `useLayoutEffect` runs (synchronously after DOM mutations), then `useEffect` runs (asynchronously)

Notes

- `useLayoutEffect` runs before the browser paints; use when you need to measure DOM and synchronously apply changes.
- `useEffect` runs after paint; preferred for side effects that don't block painting.

Interview Q&A (what happens)

Q: When do effects run relative to rendering?
A: `useLayoutEffect` runs after DOM mutations but before browser paint; `useEffect` runs after paint.

9. Stale closures and how to avoid them

- Functions inside a component capture variables from the render where they were created; in async callbacks this can cause stale reads.

Solutions

- Use functional updates for state setters
- Add dependencies to effects or use refs to hold latest values

Example

```jsx
const latestRef = React.useRef(count);
React.useEffect(() => {
  latestRef.current = count;
}, [count]);
// in callback: const cur = latestRef.current;
```

Interview Q&A (stale closures)

Q: What is a stale closure and why is it a problem?
A: A stale closure captures old values from a previous render and can lead to incorrect behavior in async callbacks (timers, fetches). Use refs or functional updates to avoid it.

10. Performance and re-renders

- Re-rendering is cheap, but unnecessary renders and expensive child renders can hurt performance.
- Techniques: granular state, `React.memo`, `useMemo`, `useCallback`, virtualization for long lists.

Good practices

- Measure before optimizing. Use React Profiler to find hotspots.

Bad practices

- Premature micro-optimizations: overusing memoization adds complexity.

11. Concurrency (React 18) and transitions

- React 18 introduces concurrent features and `startTransition` for non-urgent updates.

Example

```jsx
const [query, setQuery] = React.useState("");
const [list, setList] = React.useState([]);

function onChange(q) {
  setQuery(q);
  React.startTransition(() => {
    fetchAndSetList(q);
  });
}
```

Interview Q&A (concurrency)

Q: What is startTransition used for?
A: `startTransition` marks updates as non-urgent so React can keep the UI responsive while rendering expensive updates in the background.

12. Testing stateful components

- Test behavior: render the component, simulate interactions, assert on UI changes.
- Mock network requests and use `findBy` queries to await asynchronous updates.

Exercises (progressive)

1. Beginner: Implement `Counter` with `useState` and tests for increment/decrement.
2. Intermediate: Create two counters in a parent, lift state to compute combined total, and add tests.
3. Advanced: Implement optimistic update for a todo item (toggle complete) with rollback on simulated network failure; use `useReducer` to manage complex transitions.

Interview Q&A (general)

Q: How do you avoid unnecessary re-renders when passing callbacks to children?
A: Use `useCallback` to keep a stable function identity when necessary, or move the callback inside the child if it doesn't depend on parent state. Prefer simpler designs and measure before optimizing.

Q: Why is immutability recommended for state updates?
A: Immutability makes detecting changes (shallow comparisons) easy, avoids accidental mutation bugs, and cooperates with React rendering and memoization strategies.

Q: What is the difference between local UI state and derived/global state?
A: Local UI state controls ephemeral UI (open/closed toggles), derived state is computed from existing values, and global state is shared across many parts of the app (auth, theme).

Wrap-up

This lesson covered props and state from basic usage to advanced patterns and runtime mechanics. Use the exercises to practice and feel free to ask for runnable examples for any pattern (e.g., optimistic updates, useReducer patterns, or concurrent transitions).

Q: How do you avoid stale state inside closures (e.g., setInterval)?
A: Use functional updates (setState(prev => ...)) or refs to hold latest values. In effects, include the correct dependencies or use cleanup to avoid stale closures.
