# 🧠 Lesson 11 — React Lifecycle (Class Components + Hooks)

> “A React component is like a living organism — it is _born (mounted)_, it _grows and changes (updates)_, and it _dies (unmounts)_.  
> Lifecycle methods let us manage what happens during these stages.”

---

## 🎯 Learning Objectives

By the end of this lesson, you’ll be able to:

- Understand how React components live and die (mount → update → unmount)
- Use **lifecycle methods** in class components
- Map those to **Hooks equivalents**
- Manage side effects, cleanup, and resource management properly
- Avoid common pitfalls like memory leaks
- Answer lifecycle-related **interview questions**

---

## ⚙️ Why Lifecycle Matters

React re-renders components to reflect state/prop changes. But often, you need to do more than rendering:

- Fetch data from APIs
- Set up event listeners
- Start or stop timers
- Manage animations

Lifecycle methods (or Hooks) give you the right _moments_ to do these safely — without breaking React’s rendering model.

Think of it like:  
🍼 **Mounting** = Birth (setup resources, fetch initial data)  
⚙️ **Updating** = Growth (respond to changes, sync things)  
🪦 **Unmounting** = Death (cleanup timers, subscriptions, etc.)

---

## 🧩 Class Component Lifecycle Overview

### 📘 Mounting Phase (Birth)

| Method                                          | Purpose                        | Important Notes                       |
| ----------------------------------------------- | ------------------------------ | ------------------------------------- |
| `constructor(props)`                            | Initialize state, bind methods | Avoid side effects (no API calls!)    |
| `static getDerivedStateFromProps(props, state)` | Sync state from props (rare)   | Pure function; no access to `this`    |
| `render()`                                      | Describe UI                    | Must be pure — no side effects        |
| `componentDidMount()`                           | Work after DOM is ready        | Safe for data fetching, subscriptions |

🔹 **Analogy:**  
When a baby is born, you _set up the nursery_ (state), and after they’re home (mounted), you start their _routine_ (API calls, event listeners).

---

### 🔄 Updating Phase (Growth)

| Method                                               | Purpose                     | Notes                                  |
| ---------------------------------------------------- | --------------------------- | -------------------------------------- |
| `getDerivedStateFromProps`                           | Update derived state        | Rarely used                            |
| `shouldComponentUpdate(nextProps, nextState)`        | Decide whether to re-render | Return `false` to skip                 |
| `render()`                                           | Re-render UI                | Pure function                          |
| `getSnapshotBeforeUpdate(prevProps, prevState)`      | Measure DOM before changes  | Return snapshot value                  |
| `componentDidUpdate(prevProps, prevState, snapshot)` | React to update             | Do DOM updates, fetch if props changed |

🧠 **Analogy:**  
As a person grows, they learn new things (props/state change). You _decide_ whether to react (`shouldComponentUpdate`), _measure_ effects (`getSnapshotBeforeUpdate`), and _act_ (`componentDidUpdate`).

---

### 🧹 Unmounting Phase (Death)

| Method                   | Purpose                                                  |
| ------------------------ | -------------------------------------------------------- |
| `componentWillUnmount()` | Cleanup (stop timers, remove listeners, cancel requests) |

🧠 **Analogy:**  
When someone leaves a house, they _turn off the lights and lock the door_. Forgetting cleanup = leaving lights on (memory leaks).

---

### ⚠️ Legacy Methods (Avoid)

| Old Method                  | Replacement                          |
| --------------------------- | ------------------------------------ |
| `componentWillMount`        | Use constructor or componentDidMount |
| `componentWillReceiveProps` | Use getDerivedStateFromProps         |
| `componentWillUpdate`       | Use getSnapshotBeforeUpdate          |

---

## 🪄 Lifecycle Diagram (Class Components)

```
        ┌────────────────────────┐
        │      MOUNTING          │
        │ constructor()          │
        │ getDerivedStateFromProps() │
        │ render()               │
        │ componentDidMount()    │
        └─────────┬──────────────┘
                  │
        ┌─────────▼──────────────┐
        │      UPDATING          │
        │ getDerivedStateFromProps() │
        │ shouldComponentUpdate() │
        │ render()               │
        │ getSnapshotBeforeUpdate() │
        │ componentDidUpdate()   │
        └─────────┬──────────────┘
                  │
        ┌─────────▼──────────────┐
        │     UNMOUNTING         │
        │ componentWillUnmount() │
        └────────────────────────┘
```

---

## 🧠 Hooks Lifecycle Equivalents (Functional Components)

Modern React (Hooks) expresses lifecycle logic via **`useEffect`**, **`useLayoutEffect`**, and **cleanup functions**.

| Class Method              | Hook Equivalent                  | When It Runs                    |
| ------------------------- | -------------------------------- | ------------------------------- |
| `componentDidMount`       | `useEffect(() => {...}, [])`     | After first render              |
| `componentDidUpdate`      | `useEffect(() => {...}, [deps])` | After deps change               |
| `componentWillUnmount`    | Cleanup function in `useEffect`  | On unmount                      |
| `getSnapshotBeforeUpdate` | `useLayoutEffect`                | After DOM updates, before paint |

---

## 🧩 Example 1 — Timer Component (Class → Hooks)

### Class Version

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: Date.now() };
  }

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ time: Date.now() }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div>Time: {new Date(this.state.time).toLocaleTimeString()}</div>;
  }
}
```

### Hooks Version

```jsx
function Clock() {
  const [time, setTime] = React.useState(Date.now());

  React.useEffect(() => {
    const id = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(id); // cleanup
  }, []);

  return <div>Time: {new Date(time).toLocaleTimeString()}</div>;
}
```

⏰ **Analogy:**  
Like setting an alarm clock — you start it on mount, stop it when you leave the room.

---

## 🧩 Example 2 — Measuring DOM Before Paint (useLayoutEffect)

```jsx
function ScrollList({ items }) {
  const listRef = React.useRef();
  const prevHeightRef = React.useRef(0);

  React.useLayoutEffect(() => {
    const el = listRef.current;
    const height = el.scrollHeight;
    prevHeightRef.current = height;
  }, [items]);

  return (
    <ul ref={listRef}>
      {items.map((i) => (
        <li key={i.id}>{i.text}</li>
      ))}
    </ul>
  );
}
```

🪄 **Analogy:**  
`useLayoutEffect` is like measuring your clothes _before leaving the tailor shop_ — it runs _before the browser paints_ so you can make instant adjustments.

---

## 💡 Practical Patterns

| Task                 | When to Do It               | Hook Example                                     |
| -------------------- | --------------------------- | ------------------------------------------------ |
| Fetch data           | After mount                 | `useEffect(() => { fetch... }, []);`             |
| Manage subscriptions | On mount → clean on unmount | `useEffect(() => { sub(); return unsub; }, []);` |
| Measure DOM          | Before paint                | `useLayoutEffect`                                |
| Prevent re-renders   | Use memoization             | `React.memo`, `useMemo`, `useCallback`           |

---

## 💣 Common Pitfalls

| Problem                     | Why It Happens                                        | How to Fix                                       |
| --------------------------- | ----------------------------------------------------- | ------------------------------------------------ |
| Memory leaks                | Not cleaning timers/subscriptions                     | Cleanup in `useEffect` or `componentWillUnmount` |
| Infinite loops              | Updating state inside effect without dependency array | Use correct `[deps]`                             |
| setState after unmount      | Async code still running                              | Cancel promises or check if mounted              |
| Wrong useLayoutEffect usage | Blocking paint unnecessarily                          | Use only when measuring DOM                      |

---

## 🔬 Real-World Analogies

- **Mount** = Moving into a new house → you unpack and decorate.
- **Update** = Changing furniture when your needs change.
- **Unmount** = Moving out → you pack up and clean.
- **Memory leak** = Forgetting to turn off the stove before leaving!
- **useEffect cleanup** = Turning off the stove and lights properly.

---

## 🧭 Advanced Topics

### 🧱 Error Boundaries

Only class components can catch errors using:

```jsx
componentDidCatch(error, info)
static getDerivedStateFromError(error)
```

Use them around risky UI (like 3rd-party widgets).

### 🌀 Suspense & Async Boundaries

Suspense doesn’t replace lifecycle methods — it _pauses rendering_ until data or lazy components are ready.

### 🚨 Strict Mode

In development, React runs effects _twice_ to detect unsafe side effects.  
Make your effects **idempotent** (running twice shouldn’t cause issues).

---

## 🧠 Interview Q&A

**Q1:** What’s the difference between `useEffect` and `useLayoutEffect`?  
**A:** `useLayoutEffect` runs _before_ the browser paints (for DOM reads/writes), while `useEffect` runs _after_ paint (for async or non-blocking work).

**Q2:** Why not fetch data in the constructor or render?  
**A:** Those must be pure and synchronous — fetching is a side effect; use `componentDidMount` or `useEffect`.

**Q3:** How do you prevent memory leaks?  
**A:** Always clean up in `componentWillUnmount` or via cleanup functions in effects.

**Q4:** What are Error Boundaries?  
**A:** Class components that catch runtime errors in their children to show fallback UIs.

**Q5:** Why does React re-run effects in Strict Mode?  
**A:** To help developers find side effects that aren’t properly cleaned up.

---

## 🧩 Exercises

1. Convert a class-based subscription component to Hooks.
2. Implement a list that keeps scroll position when adding items (use `useLayoutEffect`).
3. Create an Error Boundary class component that catches rendering errors.

---

## 🏁 Summary

Lifecycle management is **how React stays predictable**.  
It tells you **when** to perform actions (setup, update, teardown) and ensures React’s rendering stays pure.

Think of React components as living beings:

- Mount → setup environment
- Update → adapt to changes
- Unmount → clean up and free memory

Understanding lifecycle is the foundation for building **clean, performant, and leak-free React apps**.

---

✨ **Next Steps:**

- Practice converting class lifecycle code to Hooks.
- Experiment with `useEffect`, `useLayoutEffect`, and `React.memo`.
- Add visual logs (`console.log`) to watch the lifecycle sequence in action.

```

```
