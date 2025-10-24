These two hooks are _closely related_ and often confuse developers because they look similar — both **“memoize”** values to avoid unnecessary recomputation or re-renders — but they do it for **different things**.

Let’s go step-by-step with examples, mental models, analogies, and common pitfalls 👇

---

# ⚙️ React Performance Hooks: `useMemo` & `useCallback`

---

## 🧠 Why Do We Need Them?

React **re-renders** a component every time its **state or props** change.
On each render:

- All functions and objects inside the component are _recreated_.
- Any dependent child components _may re-render_ unnecessarily.

This can cause:

- Slow performance for large components
- Re-render loops
- Wasted computation

➡️ **`useMemo`** and **`useCallback`** help _prevent unnecessary work._

---

## ⚡ 1. `useMemo`

### 🧩 Purpose:

> Caches (memoizes) the **result of a computation**
> so React doesn’t re-calculate it on every render unless dependencies change.

---

### 🔹 Syntax

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- React will **only recompute** the value if `a` or `b` change.
- Otherwise, it will **reuse the previous value**.

---

### 🔍 Example — Expensive Computation

```jsx
function App({ number }) {
  const expensiveResult = useMemo(() => {
    console.log("Calculating...");
    return heavyCalculation(number); // assume it's CPU heavy
  }, [number]);

  return <div>Result: {expensiveResult}</div>;
}
```

Without `useMemo` → runs `heavyCalculation()` on _every render_ 😵‍💫
With `useMemo` → recalculates _only when `number` changes_ 🧠✅

---

### 📘 Real-Life Analogy

> Imagine you’re a chef making a complex dish 🍛.
> You don’t re-cook it from scratch every time a customer asks —
> you _store it in the fridge (memoize)_ and only cook again if ingredients change.

---

### ⚠️ Common Mistakes with `useMemo`

| Mistake                               | Result                    | Fix                                     |
| ------------------------------------- | ------------------------- | --------------------------------------- |
| Using it everywhere                   | Unnecessary complexity    | Only use for **expensive calculations** |
| Missing dependencies                  | Stale or wrong data       | Always include all used values          |
| Returning a function instead of value | Use `useCallback` instead | Keep `useMemo` for values only          |

---

## 🧩 2. `useCallback`

### 🧩 Purpose:

> Caches (memoizes) a **function definition**,
> so React doesn’t recreate the function on every render.

---

### 🔹 Syntax

```jsx
const memoizedFunction = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

- Returns the _same function reference_ unless dependencies change.

---

### 🔍 Example — Passing Functions to Child Components

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // This function is recreated on every render without useCallback
  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return <Child onClick={handleClick} />;
}

function Child({ onClick }) {
  console.log("Child rendered!");
  return <button onClick={onClick}>+</button>;
}
```

Without `useCallback`:

- `handleClick` is recreated every render →
- `Child` sees it as a new prop →
- `Child` re-renders unnecessarily ❌

With `useCallback`:

- `handleClick` reference is the _same_ between renders →
- `Child` skips re-render ✅

---

### 📘 Real-Life Analogy

> Think of `useCallback` as **saving a phone number in your contacts**.
> Instead of writing it down every time, you reuse the same reference when needed.

---

## 🧮 3. `useMemo` vs `useCallback`

| Feature         | `useMemo`                        | `useCallback`                                |
| --------------- | -------------------------------- | -------------------------------------------- |
| Caches a...     | **Value / Computation Result**   | **Function**                                 |
| Returns         | Result of function               | Function itself                              |
| Common Use Case | Expensive calculations           | Passing stable callbacks to child components |
| Example         | `useMemo(() => sum(a,b), [a,b])` | `useCallback(() => setCount(c=>c+1), [])`    |

---

### 💡 Quick Rule:

> 🔹 Need to memoize **a value** → `useMemo`
> 🔹 Need to memoize **a function** → `useCallback`

---

## 🔍 4. Combined Example

```jsx
function Dashboard({ items }) {
  const [filter, setFilter] = useState("");

  // Filtered items (expensive computation)
  const filtered = useMemo(() => {
    console.log("Filtering...");
    return items.filter((item) => item.includes(filter));
  }, [items, filter]);

  // Callback passed to child
  const handleInputChange = useCallback((e) => {
    setFilter(e.target.value);
  }, []);

  return (
    <>
      <SearchBar onChange={handleInputChange} />
      <ItemList items={filtered} />
    </>
  );
}
```

✅ Here:

- `useMemo` prevents re-filtering unless input changes.
- `useCallback` prevents `SearchBar` from re-rendering unless necessary.

---

## 🧠 5. Mental Model

| Concept       | Think Of                                         |
| ------------- | ------------------------------------------------ |
| `useMemo`     | Saved _result_ of a calculation (memoized value) |
| `useCallback` | Saved _function_ (memoized action)               |

**Together:** They both help React _remember things_ between renders to save effort.

---

## ⚡ 6. Common Pitfalls

| Pitfall                          | Why It Happens                               | Fix                                           |
| -------------------------------- | -------------------------------------------- | --------------------------------------------- |
| Wrapping everything in `useMemo` | Causes more overhead                         | Use only for costly logic                     |
| Missing dependencies             | Leads to wrong results                       | Include all vars used inside                  |
| Using unstable functions inside  | Makes memo useless                           | Wrap inner functions in `useCallback`         |
| Circular dependency              | `useCallback` using state setter incorrectly | Use functional updates (`setCount(c => c+1)`) |

---

## 🧩 7. When To Use (Decision Table)

| Scenario                         | Use Hook         | Reason                        |
| -------------------------------- | ---------------- | ----------------------------- |
| Heavy computation based on state | `useMemo`        | Avoid expensive recalculation |
| Passing a function as prop       | `useCallback`    | Avoid child re-render         |
| Static values/functions          | None             | No need to memoize            |
| Performance optimization         | Both selectively | Keep app snappy               |

---

## 🧠 8. Mini Interview Questions

| Question                                                                | Answer                                                          |
| ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| What does `useMemo` do?                                                 | Memoizes a value to avoid recalculating                         |
| What does `useCallback` do?                                             | Memoizes a function reference                                   |
| Are they the same?                                                      | No, `useMemo` returns a value, `useCallback` returns a function |
| Does `useMemo` always improve performance?                              | No, only if the computation is expensive                        |
| What is memoization?                                                    | Technique of caching function results for reuse                 |
| Can `useCallback(fn, deps)` be replaced with `useMemo(() => fn, deps)`? | Yes — they behave similarly under the hood                      |

---

## ⚙️ 9. Visualization

```
Render #1 → Compute + Store (memoized)
Render #2 → Check dependencies
    ↳ If same → reuse cached value/function
    ↳ If changed → recompute
```

📘 Analogy:

> Like a **calculator with memory** — you store previous results and recall them instead of redoing the whole math every time.

---

## ✅ 10. Key Takeaways

- `useMemo` → Caches **value**
- `useCallback` → Caches **function**
- Use both **selectively**, not everywhere
- Always include **all dependencies**
- Helps prevent **unnecessary re-renders** in child components
- Combine with `React.memo()` for best optimization

---
