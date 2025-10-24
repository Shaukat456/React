````markdown
# Lesson 24 — Preventing unnecessary re-renders (parent/child cases)

Estimated time: 2–3 hours (read + refactor exercises)

Purpose: Learn concrete patterns to stop avoidable re-renders at the parent and child levels. You’ll see when to use `React.memo`, how to stabilize props with `useMemo`/`useCallback`, how to colocate state, optimize context usage, and structure components for predictable rendering.

---

## Mental model: when do components re-render?

A component re-renders when:

- Its state changes (via `setState`/`useState`/`useReducer`).
- Its parent re-renders and passes different props by value (including new object/function identities).
- Its context value changes (nearest Provider’s value is referentially different or selector reports a change).

Focus: reduce the cases where renders happen without producing visible changes.

---

## Core tools

- `React.memo(Component)` — memoize functional components by shallow-comparing props.
- `useCallback(fn, deps)` — return a stable function reference across renders.
- `useMemo(calc, deps)` — memoize expensive values/objects to keep identity stable.
- State colocation — move state closer to where it’s used to avoid propagating re-renders.
- Context patterns — split providers, memoize provider values, or use selectors.

---

## Case 1: Parent re-renders, child gets a new handler each time

Problem:

```jsx
const Child = React.memo(({ onSelect }) => {
  // ...expensive render
  return <button onClick={() => onSelect(1)}>Pick</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const onSelect = (id) => console.log(id); // new function each render
  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>Inc {count}</button>
      <Child onSelect={onSelect} />
    </>
  );
}
```
````

Fix: stabilize the handler with `useCallback` so `React.memo` can skip child re-render.

```jsx
const onSelect = useCallback((id) => console.log(id), []);
```

Notes:

- Only memoize if the child is expensive or re-render churn (frequency at which code changes occurs ) is measurable.
- Don’t overuse `useCallback`; each hook has overhead.

---

## Case 2: Inline objects/arrays break memoization

Problem:

```jsx
const Row = React.memo(({ style }) => <div style={style}>Row</div>);
// ...
<Row style={{ padding: 8 }} />; // new object each render
```

Fix: memoize the object or lift it to a constant.

```jsx
const rowStyle = useMemo(() => ({ padding: 8 }), []);
<Row style={rowStyle} />;
```

---

## Case 3: Context provider value recreates every render

Problem:

```jsx
<AuthContext.Provider value={{ user, login, logout }}>
  {children}
</AuthContext.Provider>
```

Fix: memoize provider value; consider splitting frequently-changing parts.

```jsx
const authValue = useMemo(
  () => ({ user, login, logout }),
  [user, login, logout]
);
<AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
```

Advanced: use context selectors (or split contexts) so consumers only re-render for the slice they use.

---

## Case 4: Lifting state too high

Problem: Parent owns state used by a single deep child → every parent update re-renders intermediate nodes and siblings.

Fix: colocate state in the nearest component that needs it. Lift up only when multiple siblings depend on the same state.

Example (naive — state lifted too high):

```jsx
function SiblingA() {
  console.log("SiblingA render");
  return <div>A</div>;
}

function DeepChild({ text, setText }) {
  console.log("DeepChild render");
  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}

export default function Parent() {
  const [counter, setCounter] = React.useState(0);
  // Text is only used by DeepChild, but it's stored in Parent
  const [text, setText] = React.useState("");
  return (
    <div>
      <button onClick={() => setCounter((c) => c + 1)}>Inc: {counter}</button>
      <SiblingA />
      <DeepChild text={text} setText={setText} />
    </div>
  );
}
```

Every keystroke in DeepChild re-renders Parent and SiblingA unnecessarily.

Example (fix — colocate state):

```jsx
const SiblingA = React.memo(function SiblingA() {
  console.log("SiblingA render");
  return <div>A</div>;
});

function DeepChild() {
  console.log("DeepChild render");
  const [text, setText] = React.useState("");
  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}

export default function Parent() {
  const [counter, setCounter] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCounter((c) => c + 1)}>Inc: {counter}</button>
      <SiblingA />
      <DeepChild />
    </div>
  );
}
```

Now typing in DeepChild doesn't re-render SiblingA; clicking Inc doesn't re-render DeepChild.

---

## Case 5: Derived state stored in state

Problem: You keep both raw data and a derived value in state; updating one triggers extra renders and sync bugs.

Fix: compute derived values via `useMemo` during render rather than storing them.

```jsx
const filtered = useMemo(() => items.filter(...), [items, query]);
```

---

## Case 6: Large lists re-render on small changes

Strategies:

- Split list into memoized `Item` components; pass stable props.
- Use `React.memo(Item)` plus stable handlers/values.
- Virtualize with `react-window`/`react-virtualized` for very large lists.

Example (naive):

```jsx
function Item({ item, onSelect }) {
  console.log("Item render", item.id);
  return <li onClick={() => onSelect(item.id)}>{item.label}</li>;
}

export default function List({ items }) {
  const [selected, setSelected] = React.useState(null);
  // Inline handler identity changes every render; all items re-render
  return (
    <ul>
      {items.map((it) => (
        <Item key={it.id} item={it} onSelect={(id) => setSelected(id)} />
      ))}
    </ul>
  );
}
```

Example (fixed with memo + stable handler/props):

```jsx
const Item = React.memo(function Item({ item, onSelect }) {
  console.log("Item render", item.id);
  return <li onClick={() => onSelect(item.id)}>{item.label}</li>;
});

export default function List({ items }) {
  const [selected, setSelected] = React.useState(null);
  const onSelect = React.useCallback((id) => setSelected(id), []);
  return (
    <ul>
      {items.map((it) => (
        <Item key={it.id} item={it} onSelect={onSelect} />
      ))}
    </ul>
  );
}
```

For 1000+ items, add virtualization (see Lesson 22): render only visible rows using `react-window` to cut render/paint costs.

---

## Case 7: Expensive computation in render

Fix:

- Move heavy work to `useMemo`, web workers, or precompute on server.
- Avoid synchronous blocking loops in render.

---

## Case 8: Over-broad effect updates

Problem: An effect unnecessarily calls `setState` on every render due to missing/over-broad deps.

Fix: tighten dependency arrays; compute values inline or memoize dependencies to prevent effect churn.

Example (effect runs every render due to inline object dep):

```jsx
export default function Search({ api }) {
  const [results, setResults] = React.useState([]);
  const options = { throttle: 200 }; // new object each render

  React.useEffect(() => {
    const unsub = api.subscribe(options, setResults);
    return () => unsub();
  }, [api, options]); // options identity changes → resubscribe every render

  return /* ... */;
}
```

Fix (memoize the options object):

```jsx
export default function Search({ api }) {
  const [results, setResults] = React.useState([]);
  const options = React.useMemo(() => ({ throttle: 200 }), []);

  React.useEffect(() => {
    const unsub = api.subscribe(options, setResults);
    return () => unsub();
  }, [api, options]);
}
```

Another common anti-pattern (deriving state in an effect):

```jsx
// Bad: derived state in effect → extra render
const [fullName, setFullName] = React.useState("");
React.useEffect(() => {
  setFullName(`${first} ${last}`);
}, [first, last]);
```

Prefer deriving during render with `useMemo`:

```jsx
const fullName = React.useMemo(() => `${first} ${last}`, [first, last]);
```

---

## Quick checklist

1. Wrap expensive leaf components with `React.memo`.
2. Stabilize props passed to memoized children (`useCallback`/`useMemo`).
3. Colocate state; avoid lifting it higher than needed.
4. Memoize context provider values; split contexts by concern.
5. Prefer derived values via `useMemo` over storing them in state.
6. Virtualize large lists; memoize item rows.
7. Profile first; optimize the hot path, not everything.

---

## Hands-on exercises

1. Memoize child handlers

- Start with a parent passing inline handlers to 3 memoized children. Profile re-renders, then add `useCallback` and compare.

2. Stable style/props objects

- Pass a style object to a memoized child. Observe re-renders; then memoize the object.

3. Context split

- Create a single `AppContext` with `{ theme, user }` and a child that only uses `theme`. Measure re-renders when `user` changes. Split into `ThemeContext` and `UserContext` and compare.

4. List optimization

- Convert a large list to `ItemRow` + `React.memo`; then integrate `react-window` and verify reduced renders.

---

## Interview Q&A

Q: When does `React.memo` not help?
A: When props change by identity each render (e.g., new objects/functions) or the child has internal state/effects that fire on every parent change regardless. Also, if the component is cheap to render, the memo overhead may negate benefits.

Q: `useCallback` everywhere?
A: No. Use it to stabilize function props passed to memoized children or when identity stability is necessary (e.g., effect deps). Otherwise it can add noise and overhead without benefit.

Q: How to prevent context-induced re-renders?
A: Memoize provider values, split contexts, or use selector-based consumption so components only re-render for the slice they read.

---

If you’d like, I can add a small demo to the Vite starter that shows a parent with memoized vs non-memoized children and a profiler walkthrough.

```

```
