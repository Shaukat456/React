---
# 🧩 Lesson — Custom Hooks in React (In Depth)
---

## 🎯 Learning Objectives

- Understand **what** custom hooks are and **why** they exist
- Learn **how** to create and use them
- Explore **real-world examples** and **best practices**
- Identify **common mistakes** and how to avoid them
- Learn **advanced patterns** (composition, context integration, etc.)

---

## ⚙️ 1. What Are Custom Hooks?

> A **custom hook** is a **JavaScript function** whose name starts with `use` and that **uses one or more React hooks** inside it (`useState`, `useEffect`, `useRef`, etc.) to share logic across components.

They allow you to **extract reusable logic** from components — keeping code DRY (Don’t Repeat Yourself) and easier to maintain.

---

## 🧠 2. Why Custom Hooks Exist

Without custom hooks, components often repeat logic.

### ❌ Example — Repeated Logic

Imagine two components that both need to track window width:

```jsx
function Navbar() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div>Navbar width: {width}</div>;
}

function Sidebar() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div>Sidebar width: {width}</div>;
}
```

That’s a **lot of duplicated logic**.

---

### ✅ With a Custom Hook

```jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

function Navbar() {
  const width = useWindowWidth();
  return <div>Navbar width: {width}</div>;
}

function Sidebar() {
  const width = useWindowWidth();
  return <div>Sidebar width: {width}</div>;
}
```

🎉 Now both components share logic through the **custom hook**.

---

## 🪄 3. Analogy — “Cooking Recipe”

Imagine every chef in a restaurant writing their own way to make pasta 🍝.
They’ll waste time, make mistakes, and produce inconsistent dishes.

Instead, you create **a single recipe** (`useMakePasta`) that everyone follows.
Custom hooks are **recipes for logic** — reusable and consistent.

---

## ⚡ 4. Key Rule

> **Hooks can only be called:**
>
> 1. Inside React function components
> 2. Inside other custom hooks

They cannot be called conditionally or inside loops.

✅ **Correct:**

```jsx
function useTimer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return count;
}
```

❌ **Incorrect:**

```jsx
if (condition) {
  useEffect(() => {}); // ❌ can't call hooks conditionally
}
```

---

## 🧩 5. Real-World Examples

### 🕒 Example 1: `useLocalStorage`

Store and persist state in local storage.

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

Usage:

```jsx
const [theme, setTheme] = useLocalStorage("theme", "light");
```

---

### 🧭 Example 2: `useFetch`

A reusable data-fetching hook.

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((data) => isMounted && setData(data))
      .catch((err) => isMounted && setError(err))
      .finally(() => isMounted && setLoading(false));

    return () => (isMounted = false);
  }, [url]);

  return { data, loading, error };
}
```

Usage:

```jsx
function UserList() {
  const { data, loading, error } = useFetch("/api/users");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <ul>
      {data.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

---

### 🕰️ Example 3: `usePrevious`

Store the previous value of a variable.

```jsx
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
```

Usage:

```jsx
const prevCount = usePrevious(count);
```

---

## 🧠 6. Composition — Hooks Using Other Hooks

Custom hooks can **combine multiple hooks** to build more complex logic.

```jsx
function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ name: "Ali" });
  }, []);

  const login = (userData) => setUser(userData);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return { user, login, logout };
}
```

---

## ⚙️ 7. Advanced Example — Combine with Context

```jsx
const AuthContext = createContext();

function AuthProvider({ children }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  return useContext(AuthContext);
}
```

Now you can use:

```jsx
const { user, login } = useAuthContext();
```

✅ Clean, reusable, and testable.

---

## 🧱 8. Real-World Use Cases

| Scenario                 | Custom Hook Example |
| ------------------------ | ------------------- |
| Tracking window size     | `useWindowSize()`   |
| Handling form inputs     | `useForm()`         |
| Managing authentication  | `useAuth()`         |
| API fetching             | `useFetch()`        |
| Detecting online/offline | `useOnlineStatus()` |
| Persisting data          | `useLocalStorage()` |
| Intersection Observer    | `useOnScreen(ref)`  |
| Timer or countdown       | `useTimer()`        |

---

## ⚠️ 9. Common Pitfalls

| Mistake                 | Description                    | Fix                               |
| ----------------------- | ------------------------------ | --------------------------------- |
| ❌ Naming without `use` | React won’t track it as a hook | Always prefix with `use`          |
| ❌ Conditional calls    | Violates hook rules            | Always call hooks unconditionally |
| ❌ Complex logic        | Hard to debug                  | Split into smaller hooks          |
| ❌ Returning too much   | Reduces clarity                | Return minimal necessary data     |
| ❌ Mutating refs/state  | Causes unpredictable bugs      | Treat state as immutable          |

---

## 🧠 10. Analogy — “Electric Circuits”

Think of your React app as an electronic system.
Each hook (like `useState`, `useEffect`) is a **component** — you wire them up to build a **device (custom hook)** that performs a specific behavior.

Once you’ve built one (say a voltage regulator), others can **reuse** it without needing to know its internal wiring — just plug and play.

---

## 🧩 11. Testing Custom Hooks

You can test hooks directly using libraries like:

- **React Testing Library**
- **@testing-library/react-hooks**

Example:

```jsx
import { renderHook, act } from "@testing-library/react-hooks";
import useCounter from "./useCounter";

test("should increment counter", () => {
  const { result } = renderHook(() => useCounter());
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
```

---

## 🧩 12. Best Practices

✅ Always start hook names with `use`
✅ Keep them **pure** — input/output based, avoid side effects unless necessary
✅ Return consistent data structures
✅ Separate logic (hooks) from UI (components)
✅ Combine with Context or Reducer for scalability
✅ Document their purpose clearly

---

## 🧠 13. Interview Insights

**Q:** What are custom hooks?
**A:** Reusable functions that encapsulate stateful logic using other hooks.

**Q:** Why use them?
**A:** To avoid duplication and improve maintainability.

**Q:** Can custom hooks share state between components?
**A:** No, each call has its own isolated state — they share **logic**, not **state**.

**Q:** What’s the naming rule for custom hooks?
**A:** Must start with `use` — this tells React to validate hook usage.

**Q:** Difference between HOC and custom hooks?
**A:** HOCs wrap components to share logic; custom hooks use functions to share logic — simpler and cleaner.

---

## 🔚 14. Summary Table

| Concept         | Description                                         |
| --------------- | --------------------------------------------------- |
| Purpose         | Reuse logic between components                      |
| Syntax          | Function starting with `use`                        |
| Shares          | Logic, not state                                    |
| Can use         | Any built-in or custom hooks                        |
| Common Pairings | `useEffect`, `useState`, `useContext`, `useReducer` |
| Analogy         | “Recipe” for reusable logic                         |

---
