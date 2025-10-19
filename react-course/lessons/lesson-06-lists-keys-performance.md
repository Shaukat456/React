# Lesson 06 — Lists, keys, conditional rendering & performance

Learning objectives

- Render lists efficiently with keys
- Understand conditional rendering patterns
- Learn basic performance tuning strategies (memo, keys, avoiding re-renders)

Rendering lists and keys

- When rendering arrays, provide a `key` prop so React can track items between renders.
- Use stable, unique keys (IDs). Avoid indexes as keys when list can reorder.

```jsx
{
  items.map((item) => <li key={item.id}>{item.title}</li>);
}
```

Why keys matter (brief)

- Keys help React decide which elements to reuse, move, or remove. Incorrect keys lead to incorrect element reuse and UI bugs (e.g., input values moving between items).

Conditional rendering patterns

- Ternary and logical AND are commonly used:

```jsx
{
  isLoading ? <Spinner /> : <List />;
}
{
  items.length > 0 && <List />;
}
```

- Prefer keeping conditional logic out of JSX where it becomes complex (move to variables or small helper components).

Performance basics

- React re-renders a component when its props or state change. Minimize re-renders by keeping state granular.
- `React.memo` wraps a component to avoid re-render when props are shallowly equal.
- `useMemo` and `useCallback` can memoize values and functions to avoid recomputation or prop identity churn. Use them when you have evidence of performance problems.

Common pitfalls

- Overusing `useMemo`/`useCallback` without measuring; they add complexity and sometimes overhead.
- Using array indices for keys when items can be reordered or removed.

Real-world scenarios

- Chat apps: stable keys (message IDs) prevent user input in message composer from jumping around as new messages arrive.
- Large lists: prefer virtualization (react-window/react-virtualized) to avoid rendering thousands of DOM nodes.

Exercises

1. Render a list of todo items, allow adding/removing, and ensure keys are stable.
2. Implement a filtered list and measure how memoizing the filtered result with `useMemo` affects re-renders.

Interview Q&A

Q: Why should you avoid using array index as a key?
A: Index keys cause problems when the array is re-ordered or items are inserted/removed; React may reuse DOM nodes incorrectly causing mismatched state.

Q: When should you use React.memo?
A: When a component renders often with the same props and the render is non-trivial. Measure before applying.

Q: How would you render very long lists efficiently?
A: Use windowing/virtualization libraries like `react-window` or `react-virtualized` to render only visible rows.
