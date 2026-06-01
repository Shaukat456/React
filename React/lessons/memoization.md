# The Complete Guide to Memoization — JavaScript & React

> From first principles to production patterns. Every concept builds on the last.

---

## Part 1 — The Problem: Why Does Speed Matter?

Before writing a single line of memoization code, let's understand _why_ it exists.

Imagine you run a restaurant. Every time a customer orders "Pasta Carbonara," you don't re-read the recipe from scratch — you've memorized it. That's memoization: **cache the result of expensive work so you don't repeat it.**

In software, "expensive work" means:

- Heavy computations (sorting, filtering, calculating)
- Network calls
- DOM operations
- Re-rendering components

---

## Part 2 — Memoization in Plain JavaScript

### 2.1 The Core Idea

```js
// Without memoization — recomputes every time
function slowSquare(n) {
  // Imagine this takes 500ms
  return n * n;
}

slowSquare(5); // computes → 25
slowSquare(5); // computes AGAIN → 25 (wasted!)
```

```js
// With memoization — returns cached result
function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      console.log("Cache hit!");
      return cache[key];
    }

    console.log("Computing...");
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const fastSquare = memoize((n) => n * n);

fastSquare(5); // "Computing..." → 25
fastSquare(5); // "Cache hit!" → 25 (instant!)
fastSquare(9); // "Computing..." → 81
```

The `cache` is just a plain object. The key is a of the arguments. The value is the result. That's it. Everything else is an extension of this idea.

## Serialized Version Definition: Translating an in-memory data structure (object) into a portable format (e.g., JSON, XML, or binary)

### 2.2 Real World Example: Fibonacci

The classic showcase. Without memoization, `fib(40)` makes **hundreds of millions** of redundant calls.

```js
// Naive — exponential time O(2^n)
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

fib(10); // 177 function calls
fib(40); // 331,160,281 function calls 😱
```

```js
// Memoized — linear time O(n)
const fib = memoize(function fib(n) {
  if (n <= 1) return n;
  // Problem: memoize wraps the outer function,
  // but recursive calls still go to the original!
  return fib(n - 1) + fib(n - 2);
});

// Better: embed cache inside the function
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;

  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

fibMemo(40); // ~40 function calls ✅
fibMemo(100); // instant ✅
```

---

### 2.3 Real World Example: Search Filter

You have an e-commerce site. The user types in a search box. For every keystroke, you filter 10,000 products.

```js
const products = [
  { id: 1, name: "Nike Air Max", category: "shoes", price: 120 },
  { id: 2, name: "Adidas Ultraboost", category: "shoes", price: 180 },
  // ... 9,998 more
];

// Without memoization — filters entire list every keystroke
function filterProducts(products, query) {
  console.time("filter");
  const result = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );
  console.timeEnd("filter");
  return result;
}

// User types "n", "ni", "nik", "nike" — 4 filter passes
```

```js
// With memoization — caches results per query string
const memoizedFilter = memoize(filterProducts);

// User types "n" → computes, caches
// User types "ni" → computes, caches
// User deletes → types "n" again → cache hit! ✅
memoizedFilter(products, "n"); // computed
memoizedFilter(products, "ni"); // computed
memoizedFilter(products, "n"); // cache hit!
```

---

### 2.4 The Cache Key Problem

The naive `JSON.stringify(args)` approach breaks for:

- Functions as arguments
- Circular objects
- Very large objects (slow to serialize)

```js
// This breaks
const cache = memoize((user) => user.name.toUpperCase());
cache({ name: "Alice" }); // computes
cache({ name: "Alice" }); // computes AGAIN — different object reference!

// Because: JSON.stringify({name:"Alice"}) === JSON.stringify({name:"Alice"})
// Actually this WORKS for plain objects. But consider:
cache(() => "hello"); // key = "undefined" — broken!
```

For functions as arguments (like in React), you need **reference equality** — and that's where `useCallback` comes in. We'll get there.

---

### 2.5 Memoization with WeakMap (for objects)

```js
function memoizeByRef(fn) {
  const cache = new WeakMap();

  return function (obj) {
    if (cache.has(obj)) {
      return cache.get(obj);
    }
    const result = fn(obj);
    cache.set(obj, result);
    return result;
  };
}

const getFullName = memoizeByRef((user) => `${user.first} ${user.last}`);

const alice = { first: "Alice", last: "Smith" };
getFullName(alice); // computed
getFullName(alice); // cache hit — same reference ✅

// WeakMap bonus: when `alice` is garbage collected, cache entry is too
// No memory leaks!
```

---

### 2.6 When NOT to Memoize in JS

Memoization has costs:

- **Memory**: cache grows unbounded unless you add eviction
- **Complexity**: harder to debug
- **Staleness**: cached result may be outdated

```js
// DON'T memoize simple operations
const double = memoize((n) => n * 2); // overhead > benefit

// DON'T memoize with side effects
const saveUser = memoize((user) => fetch("/api/users", { body: user }));
// Second call with same user skips the fetch — bug!

// DO memoize pure, expensive, frequently-called functions
const parseCSV = memoize((largeString) => /* heavy parsing */);
const sortProducts = memoize((products, field) => /* sort 10k items */);
```

**Rule of thumb**: Memoize when the function is **pure** (same input → same output, no side effects) and **called repeatedly with the same arguments**.

---

## Part 3 — Memoization in React

React re-renders components when state or props change. But sometimes it re-renders even when nothing meaningful changed. This is where React's memoization tools come in.

There are three tools:

1. `React.memo` — memoizes a **component**
2. `useMemo` — memoizes a **computed value**
3. `useCallback` — memoizes a **function**

They are all the same idea — skip recomputation when inputs haven't changed — applied to different things.

---

### 3.1 The Problem React Solves

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <button
        onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      >
        Toggle Theme
      </button>

      {/* ExpensiveChart only needs count — but re-renders on every theme change too! */}
      <ExpensiveChart data={count} />
    </div>
  );
}
```

Every time `theme` changes, `Parent` re-renders, and `ExpensiveChart` re-renders too — even though its `data` prop didn't change. Wasted work.

---

### 3.2 `React.memo` — Memoize a Component

`React.memo` wraps a component and prevents it from re-rendering if its **props haven't changed**.

```jsx
// Without React.memo
function ExpensiveChart({ data }) {
  // Imagine this takes 200ms to render
  const chartData = processData(data); // heavy computation
  return <canvas>{/* render chart */}</canvas>;
}

// With React.memo — only re-renders if `data` prop changes
const ExpensiveChart = React.memo(function ExpensiveChart({ data }) {
  const chartData = processData(data);
  return <canvas>{/* render chart */}</canvas>;
});
```

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <button
        onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      >
        Toggle Theme
      </button>

      {/* Now ExpensiveChart only re-renders when count changes ✅ */}
      <ExpensiveChart data={count} />
    </div>
  );
}
```

**How it compares props**: By default, `React.memo` uses **shallow equality** — same as `===` for each prop.

```jsx
// Shallow equality examples:
5 === 5          // true  → no re-render
"hello" === "hello" // true  → no re-render
{} === {}        // FALSE → re-render! (different object reference)
[] === []        // FALSE → re-render!
```

This is where the problem begins. Pass an object or function as a prop? `React.memo` won't help — the parent creates a new object/function on every render.

---

### 3.3 `useMemo` — Memoize a Computed Value

`useMemo` runs a computation only when its **dependencies change**. Between renders, it returns the cached result.

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
//                                                                   ^^^^
//                                          Only recompute when a or b changes
```

#### Real World Example: Filtering a Product List

```jsx
function ProductList({ products, searchQuery, sortField }) {
  // ❌ Without useMemo — recalculates on EVERY render
  // Even if only an unrelated state changed (like a modal toggle)
  const filteredProducts = products
    .filter((p) => p.name.includes(searchQuery))
    .sort((a, b) => (a[sortField] > b[sortField] ? 1 : -1));

  return filteredProducts.map((p) => <ProductCard key={p.id} product={p} />);
}
```

```jsx
function ProductList({ products, searchQuery, sortField }) {
  // ✅ With useMemo — only recalculates when products, searchQuery, or sortField change
  const filteredProducts = useMemo(() => {
    console.log("Filtering products..."); // See when this runs
    return products
      .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => (a[sortField] > b[sortField] ? 1 : -1));
  }, [products, searchQuery, sortField]);

  return filteredProducts.map((p) => <ProductCard key={p.id} product={p} />);
}
```

Now if a modal opens/closes (unrelated state), `filteredProducts` is served from cache.

---

#### Real World Example: Expensive Dashboard Stats

```jsx
function SalesDashboard({ orders }) {
  const [activeTab, setActiveTab] = useState("overview");

  // These calculations are heavy — O(n) each, and orders has 50k items
  const totalRevenue = useMemo(
    () => orders.reduce((sum, o) => sum + o.amount, 0),
    [orders],
  );

  const topProducts = useMemo(
    () =>
      orders.reduce((acc, o) => {
        acc[o.product] = (acc[o.product] || 0) + o.amount;
        return acc;
      }, {})
      |> Object.entries(%)
      |> %.sort(([, a], [, b]) => b - a)
      |> %.slice(0, 10),
    [orders],
  );

  const monthlyBreakdown = useMemo(() => groupByMonth(orders), [orders]);

  // Switching tabs doesn't re-run any of these ✅
  return (
    <div>
      <TabBar active={activeTab} onChange={setActiveTab} />
      {activeTab === "overview" && <Overview revenue={totalRevenue} />}
      {activeTab === "products" && <TopProducts data={topProducts} />}
      {activeTab === "trends" && <MonthlyChart data={monthlyBreakdown} />}
    </div>
  );
}
```

---

#### `useMemo` to Stabilize Object Props

This is one of the most common uses — preventing object recreation:

```jsx
function Parent() {
  const [name, setName] = useState("Alice");
  const [age, setAge] = useState(30);

  // ❌ New object every render — breaks React.memo on Child
  const user = { name, age };

  // ✅ Same object reference when name/age haven't changed
  const user = useMemo(() => ({ name, age }), [name, age]);

  return <Child user={user} />;
}

const Child = React.memo(function Child({ user }) {
  return (
    <div>
      {user.name} is {user.age}
    </div>
  );
});
```

---

### 3.4 `useCallback` — Memoize a Function

`useCallback` is `useMemo` for functions. Without it, every render creates a new function reference — even if the function's behavior hasn't changed.

```jsx
// These are NOT equal between renders
const handleClick = () => console.log("clicked"); // render 1
const handleClick = () => console.log("clicked"); // render 2 — different reference!
```

```jsx
const memoizedFn = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
// Same function reference as long as a and b don't change
```

In fact, `useCallback(fn, deps)` is exactly equivalent to `useMemo(() => fn, deps)`.

---

#### Real World Example: Preventing Child Re-Renders

```jsx
// ❌ Without useCallback
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  // New function reference every render!
  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // TodoItem is React.memo'd — but it still re-renders because
  // handleDelete is a new reference every time filter changes
  return todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
  ));
}
```

```jsx
// ✅ With useCallback
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  // Stable reference — only recreated when todos changes
  const handleDelete = useCallback(
    (id) => {
      setTodos(todos.filter((t) => t.id !== id));
    },
    [todos],
  );

  // Now TodoItem truly skips re-renders when filter changes ✅
  return todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
  ));
}

const TodoItem = React.memo(function TodoItem({ todo, onDelete }) {
  console.log(`Rendering: ${todo.text}`); // You'll see this less often
  return (
    <div>
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
});
```

---

#### Real World Example: `useCallback` with `useEffect`

Passing a callback to `useEffect`'s dependency array without `useCallback` causes infinite loops:

```jsx
// ❌ Infinite loop!
function UserProfile({ userId }) {
  const fetchUser = async () => {
    // new function every render
    const data = await api.getUser(userId);
    setUser(data);
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // fetchUser is new every render → effect runs every render → re-render → repeat
}
```

```jsx
// ✅ Stable with useCallback
function UserProfile({ userId }) {
  const fetchUser = useCallback(async () => {
    const data = await api.getUser(userId);
    setUser(data);
  }, [userId]); // Only recreated when userId changes

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // Now stable ✅
}
```

---

#### Real World Example: Search with Debounce

```jsx
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  // Memoize the debounced function so it doesn't reset on every render
  const debouncedSearch = useCallback(
    debounce((q) => onSearch(q), 300),
    [onSearch], // only recreate if onSearch changes
  );

  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <input value={query} onChange={handleChange} placeholder="Search..." />
  );
}
```

---

### 3.5 How the Three Tools Work Together

They're a team. Real apps use all three:

```jsx
// A complete example: Data table with sorting, filtering, and row actions
function DataTable({ rawData }) {
  const [sortField, setSortField] = useState("name");
  const [filterText, setFilterText] = useState("");
  const [selectedRows, setSelectedRows] = useState(new Set());

  // 1. useMemo: expensive derived data
  const processedData = useMemo(() => {
    return rawData
      .filter((row) =>
        row.name.toLowerCase().includes(filterText.toLowerCase()),
      )
      .sort((a, b) => a[sortField].localeCompare(b[sortField]));
  }, [rawData, filterText, sortField]);

  // 2. useCallback: stable event handlers passed to child rows
  const handleRowSelect = useCallback((id) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []); // no dependencies — uses functional updater

  const handleRowDelete = useCallback((id) => {
    // parent handles deletion
  }, []);

  return (
    <div>
      <input
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Filter..."
      />
      {processedData.map((row) => (
        // 3. React.memo: row only re-renders when its own data or handlers change
        <TableRow
          key={row.id}
          row={row}
          isSelected={selectedRows.has(row.id)}
          onSelect={handleRowSelect}
          onDelete={handleRowDelete}
        />
      ))}
    </div>
  );
}

const TableRow = React.memo(function TableRow({
  row,
  isSelected,
  onSelect,
  onDelete,
}) {
  return (
    <tr style={{ background: isSelected ? "#e0f0ff" : "white" }}>
      <td>
        <input
          type="checkbox"
          onChange={() => onSelect(row.id)}
          checked={isSelected}
        />
      </td>
      <td>{row.name}</td>
      <td>{row.value}</td>
      <td>
        <button onClick={() => onDelete(row.id)}>Delete</button>
      </td>
    </tr>
  );
});
```

---

### 3.6 The Dependency Array — The Heart of React Memoization

Every React memoization hook takes a dependency array `[dep1, dep2, ...]`.

**The rule**: Include everything the memoized code reads that could change between renders.

```jsx
function Component({ userId, role }) {
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    // Reads: userId, role — both must be in deps
    const result = await api.getData(userId, { role });
    setData(result);
  }, [userId, role]); // ✅ correct

  // ❌ Stale closure — fetchData reads old userId forever
  const fetchData = useCallback(async () => {
    const result = await api.getData(userId, { role });
    setData(result);
  }, []); // Bug: userId and role are stale!
```

**Common mistakes:**

```jsx
// ❌ Missing deps — stale values
useMemo(() => compute(x), []); // x is always the initial value

// ❌ Too many deps — defeats the purpose
useMemo(() => compute(x), [x, y, z, a, b, c]); // recomputes whenever any changes

// ❌ Non-stable dep — always triggers recompute
useMemo(() => compute(options), [options]);
// If options = {} is created in render, this runs every time!
// Fix: useMemo the options object too, or move it outside the component
```

---

### 3.7 Custom Hooks — Reusable Memoization

Compose these tools into custom hooks for clean, reusable patterns.

```jsx
// A hook that memoizes filtered + sorted data
function useFilteredData(data, filterFn, sortFn) {
  return useMemo(() => {
    const filtered = data.filter(filterFn);
    return sortFn ? filtered.sort(sortFn) : filtered;
  }, [data, filterFn, sortFn]);
}

// Usage
function ProductList({ products }) {
  const [query, setQuery] = useState("");

  // Memoize filterFn so useFilteredData doesn't recompute on every render
  const filterFn = useCallback(
    (p) => p.name.toLowerCase().includes(query.toLowerCase()),
    [query],
  );

  const filteredProducts = useFilteredData(products, filterFn);

  return filteredProducts.map((p) => <ProductCard key={p.id} product={p} />);
}
```

```jsx
// A hook that returns a stable API object
function useUserActions(userId) {
  const deleteUser = useCallback(async () => {
    await api.delete(`/users/${userId}`);
  }, [userId]);

  const updateUser = useCallback(
    async (data) => {
      await api.put(`/users/${userId}`, data);
    },
    [userId],
  );

  // Memoize the returned object so consumers don't re-render when parent does
  return useMemo(() => ({ deleteUser, updateUser }), [deleteUser, updateUser]);
}
```

---

### 3.8 When NOT to Memoize in React

This is just as important as knowing when to use it.

```jsx
// ❌ Don't memoize cheap computations
const doubled = useMemo(() => count * 2, [count]);
// Just write: const doubled = count * 2;

// ❌ Don't memoize components that always get new props
const Component = React.memo(function ({ timestamp }) {
  return <div>{timestamp}</div>;
});
// timestamp changes every render → memo never helps, just adds overhead

// ❌ Don't useCallback for inline handlers that only go to DOM elements
// React doesn't care about referential stability for DOM props
<button onClick={useCallback(() => doThing(), [])}>Click</button>;
// Just write: <button onClick={() => doThing()}>

// ✅ DO memoize when:
// - The component is genuinely expensive to render
// - The computation is measurably slow (>1ms)
// - You're passing callbacks to React.memo'd components
// - A function is in a useEffect dependency array
```

**The golden rule**: Memoize when you have a **measured performance problem**, not preemptively. Profile first, optimize second.

---

## Part 4 — Advanced Patterns

### 4.1 `useMemo` for Referential Stability (Not Just Performance)

Sometimes you memoize not for speed, but to keep object identity stable:

```jsx
function Map({ center, zoom }) {
  // Without useMemo: new object every render → child always re-renders
  const viewState = useMemo(
    () => ({
      latitude: center.lat,
      longitude: center.lng,
      zoom,
    }),
    [center.lat, center.lng, zoom],
  );

  return <MapComponent viewState={viewState} />;
}
```

### 4.2 Memoization with Context

A common performance trap:

```jsx
// ❌ New context value every render — all consumers re-render
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {" "}
      {/* new object! */}
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Stable context value
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user]);
  // setUser from useState is already stable — no need in deps

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
```

### 4.3 The `useCallback` + `useRef` Pattern (Truly Stable Callbacks)

Sometimes you want a stable function reference that always sees the latest values without listing them as deps — useful for event handlers:

```jsx
function useStableCallback(fn) {
  const ref = useRef(fn);

  // Keep ref current
  useEffect(() => {
    ref.current = fn;
  });

  // Return a stable wrapper that always calls the latest fn
  return useCallback((...args) => ref.current(...args), []);
}

// Usage
function SearchResults({ onSelect }) {
  // Even if onSelect changes every render, our handler is stable
  const stableOnSelect = useStableCallback(onSelect);

  return results.map((r) => <Result key={r.id} onSelect={stableOnSelect} />);
}
```

---

## Part 5 — Mental Model Summary

Think of memoization as a three-layer system:

```
┌─────────────────────────────────────────────────────────────┐
│                    React Component Tree                      │
│                                                             │
│  React.memo    →  "Don't re-render this component          │
│                    if its props haven't changed"            │
│                                                             │
│  useMemo       →  "Don't recalculate this value            │
│                    if its inputs haven't changed"           │
│                                                             │
│  useCallback   →  "Don't recreate this function            │
│                    if its inputs haven't changed"           │
│                                                             │
│  All three use the same idea: cache by dependency equality  │
└─────────────────────────────────────────────────────────────┘
```

### Quick Decision Guide

| Situation                                               | Tool                                          |
| ------------------------------------------------------- | --------------------------------------------- |
| Expensive computation inside a component                | `useMemo`                                     |
| Child component re-renders too often                    | `React.memo` + `useCallback` for its handlers |
| Function is a `useEffect` dependency                    | `useCallback`                                 |
| Object/array passed as prop to `React.memo`'d component | `useMemo`                                     |
| Context value causing all consumers to re-render        | `useMemo`                                     |
| Heavy pure JS computation (no React)                    | Custom `memoize()`                            |
| Recursive computation with repeated subproblems         | Memoize with embedded cache                   |

---

## Part 6 — Profiling: Measure Before You Memoize

Use React DevTools Profiler to see what's actually slow before adding memoization.

```jsx
// Wrap suspicious subtrees with Profiler to measure
import { Profiler } from "react";

function App() {
  return (
    <Profiler
      id="ProductList"
      onRender={(id, phase, actualDuration) => {
        console.log(`${id} took ${actualDuration}ms to ${phase}`);
      }}
    >
      <ProductList products={products} />
    </Profiler>
  );
}
```

Only memoize what the profiler tells you is slow. Premature memoization adds cognitive overhead and can even slow things down (cache lookups and dependency comparisons aren't free).

---

## Cheat Sheet

```jsx
// Plain JS memoization
const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    return key in cache ? cache[key] : (cache[key] = fn(...args));
  };
};

// Memoize a component
const MyComponent = React.memo(function MyComponent(props) { ... });

// Memoize a computed value
const value = useMemo(() => expensiveCompute(a, b), [a, b]);

// Memoize a function reference
const handler = useCallback(() => doSomething(x), [x]);

// All three together
function Parent({ data }) {
  const processed = useMemo(() => transform(data), [data]);
  const onAction = useCallback((id) => handle(id), []);
  return <Child items={processed} onAction={onAction} />;
}
const Child = React.memo(({ items, onAction }) => { ... });
```
