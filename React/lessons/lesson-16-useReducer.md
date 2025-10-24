# 🧠 `useReducer` Hook — In-Depth Guide

---

## 🧩 1. Why `useReducer` Exists

### 🧭 The Problem

When state becomes _complex_ — like managing multiple related values or transitions — `useState` gets messy.

Example:

```jsx
const [count, setCount] = useState(0);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

Now you’re juggling multiple states that change together depending on **user actions**.

👉 This is like trying to coordinate a robot’s movements by manually toggling every joint!

---

### 🧩 The Solution

`useReducer` lets you **centralize** all related state logic in a single, predictable function — a **reducer**.

You define:

1. **State** — the data you track
2. **Action** — what happened
3. **Reducer function** — how state changes based on the action

---

## ⚙️ 2. Syntax

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

Where:

- `state` → current state value
- `dispatch(action)` → function to trigger state changes
- `reducer(state, action)` → pure function returning new state
- `initialState` → starting value

---

## 🔄 3. Example 1 — Counter (Basic)

```jsx
import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <h2>Count: {state.count}</h2>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
    </>
  );
}

export default Counter;
```

---

## 🧠 Analogy

Think of `useReducer` like a **company**:

- 🧾 `state` = current company status (budget, employees)
- 📢 `action` = a memo sent by the boss (“Hire developer”, “Cut costs”)
- 🧑‍💼 `reducer` = HR department — decides how the state changes based on the memo
- 📮 `dispatch` = how you send memos to HR

This makes the company organized — no random employees (components) changing data directly.

---

## ⚙️ 4. Example 2 — Complex State (Form Handling)

```jsx
function formReducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return { name: "", email: "" };
    default:
      return state;
  }
}

function SignupForm() {
  const [formState, dispatch] = useReducer(formReducer, {
    name: "",
    email: "",
  });

  return (
    <form>
      <input
        value={formState.name}
        onChange={(e) =>
          dispatch({
            type: "CHANGE_INPUT",
            field: "name",
            value: e.target.value,
          })
        }
      />
      <input
        value={formState.email}
        onChange={(e) =>
          dispatch({
            type: "CHANGE_INPUT",
            field: "email",
            value: e.target.value,
          })
        }
      />
      <button type="button" onClick={() => dispatch({ type: "RESET" })}>
        Reset
      </button>
    </form>
  );
}
```

### 🧩 Why this is great:

- All logic in one place
- Each update described with an action
- Easier to debug and test

---

## ⚔️ 5. Comparison: `useState` vs `useReducer`

| Scenario                              | useState          | useReducer                   |
| ------------------------------------- | ----------------- | ---------------------------- |
| Simple values                         | ✅ Best           | 🚫 Overkill                  |
| Multiple independent states           | ✅                | 🚫                           |
| Complex, interdependent state updates | ⚠️ Hard to manage | ✅ Best                      |
| State transitions are event-driven    | ⚠️ Clunky         | ✅ Elegant                   |
| Debugging & logging state changes     | ❌ Hard           | ✅ Easy (actions tell story) |

---

## 💻 6. Example 3 — Async Operations (Data Fetching)

```jsx
function fetchReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "SUCCESS":
      return { loading: false, data: action.payload, error: null };
    case "ERROR":
      return { loading: false, data: null, error: action.error };
    default:
      return state;
  }
}

function FetchData() {
  const [state, dispatch] = useReducer(fetchReducer, {
    loading: false,
    data: null,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: "LOADING" });
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "SUCCESS", payload: data }))
      .catch((err) => dispatch({ type: "ERROR", error: err.message }));
  }, []);

  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p>Error: {state.error}</p>;
  return <pre>{JSON.stringify(state.data, null, 2)}</pre>;
}
```

### 🧠 Analogy:

Imagine a _restaurant order system_:

- Action: “Order Pizza”
- Reducer: Kitchen logic — how to handle pizza orders
- State: Kitchen’s current orders
- Dispatch: Waiter placing an order

---

## ⚡ 7. Lazy Initialization

You can initialize complex state lazily to improve performance.

```jsx
function init(initialCount) {
  return { count: initialCount };
}

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, 0, init);
```

---

## 🚨 8. Common Pitfalls

| Mistake                                      | Explanation                                                |
| -------------------------------------------- | ---------------------------------------------------------- |
| Forgetting to return state in `default` case | Causes reducer to return `undefined`                       |
| Making reducer functions non-pure            | Reducers must be pure — no side effects                    |
| Dispatching wrong action types               | Typo = silent bugs                                         |
| Overusing useReducer                         | For very small state logic, it adds unnecessary complexity |

---

## 🧩 9. Combining with `useContext` — Global State

`useReducer` shines when combined with Context for global state management:

```jsx
const GlobalContext = React.createContext();

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
```

Now you have a mini **Redux-like** setup!

---

## 🧠 10. Real-World Use Cases

| Use Case        | Example                               |
| --------------- | ------------------------------------- |
| Form logic      | Multi-step registration form          |
| Complex UI      | Tabs, Modals, Menus with dependencies |
| Game state      | Tracking score, moves, lives          |
| Data fetching   | Handling loading/error/data           |
| Undo/Redo logic | Editing applications                  |

---

## 🎯 11. Interview Insights

**Q:** When should you prefer `useReducer` over `useState`?
**A:** When you have complex state transitions or multiple interdependent pieces of state.

**Q:** Why must a reducer be pure?
**A:** Because React depends on predictable state transitions for efficient rendering.

**Q:** Can you dispatch async actions directly?
**A:** No — reducers must be pure; async logic must live outside (e.g., in `useEffect`).

---

## 🧩 12. Analogy Summary

| Concept       | Analogy                                     |
| ------------- | ------------------------------------------- |
| Reducer       | HR Department (decides what to do)          |
| Dispatch      | Sending a memo to HR                        |
| State         | Company’s records                           |
| Action        | Memo describing change                      |
| Pure Function | HR must not randomly hire/fire without memo |

---
