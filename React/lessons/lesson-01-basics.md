Excellent — understanding **key theoretical terms** like _Single Source of Truth_, _Virtual DOM_, _One-way Data Flow_, etc., gives you the _core intuition_ behind how React actually works.

Let’s go over all the **fundamental React concepts** that form the _theoretical backbone_ of the library 👇

---

## 🧭 **Key Theoretical Concepts in React.js**

---

### 🧩 **1. Component-Based Architecture**

React builds your UI using **components**, which are small, reusable, self-contained pieces of code (like LEGO blocks).

**Think of it like this:**

> A webpage = a tree of components
> Example:
> `App` → `Navbar`, `Sidebar`, `Main`, `Footer`

Each component:

- Has its **own logic** and **UI**
- Can be **reused** multiple times
- Helps you **separate concerns** (code is more organized)

---

### ⚙️ **2. Declarative Programming**

React is **declarative**, not **imperative**.

**Imperative (Vanilla JS)**:

> Tell the browser _how_ to do something (manually manipulate the DOM).

**Declarative (React)**:

> Just tell React _what you want the UI to look like_, and it updates the DOM automatically.

Example:

```jsx
// Declarative (React)
{
  isLoggedIn ? <Dashboard /> : <Login />;
}
```

React takes care of rendering the right component when `isLoggedIn` changes.

---

### 🧠 **3. Virtual DOM**

The **Virtual DOM** is React’s secret weapon for speed and efficiency.

- It’s a **lightweight copy** of the actual DOM in memory.
- When something changes (like state), React updates the Virtual DOM first.
- Then it compares it to the previous version using a **diffing algorithm**.
- Only the **changed parts** are updated in the real DOM — not the whole page!

**Analogy:**
Think of the Virtual DOM as a _“blueprint”_ — React edits the blueprint first and then changes only what’s necessary in the real building.

---

### 🔁 **4. One-Way Data Flow (Unidirectional Data Flow)**

React’s data always flows **from parent to child**, never the other way directly.

Example:

```jsx
<App> → <UserProfile> → <Avatar>
```

If data changes in `App`, it flows down as **props** to child components.
Children can’t directly change the parent’s data — they can only **call functions** the parent passes down.

✅ This makes your app predictable and easier to debug.

---

### 💾 **5. State**

**State** is data that _belongs to a component_ and _can change over time_.

When state changes → React automatically re-renders the component to reflect the new data.

Example:

```jsx
const [count, setCount] = useState(0);
```

Every time `setCount` updates the value, React re-renders the component with the new `count`.

---

### 📦 **6. Props (Properties)**

**Props** are like **arguments to a function** — they are _data passed into a component_ from its parent.

They make components **dynamic** and **reusable**.

Example:

```jsx
<Card title="React Basics" content="Learn the fundamentals!" />
```

Inside `Card`:

```jsx
function Card({ title, content }) {
  return (
    <h2>
      {title}: {content}
    </h2>
  );
}
```

---

### 🧩 **7. Single Source of Truth**

This is one of React’s **core philosophies** — there should be **only one place where the “truth” (the current state of your app’s data)** is stored.

For example:

- If your `App` component holds a list of tasks in its state:

  ```jsx
  const [tasks, setTasks] = useState([]);
  ```

  — that’s your _single source of truth_.

- Child components (like `TaskList` or `TaskItem`) should **not duplicate** or **mutate** that data directly.
- They should _receive it as props_ and _use callbacks_ to request changes.

✅ **Why it matters:**
It avoids data inconsistency — everything derives from one reliable source.

---

### 🧭 **8. Immutability**

In React, you **never mutate state directly** — you _create a new copy_ instead.

❌ Wrong:

```jsx
state.items.push(newItem);
```

✅ Correct:

```jsx
setItems([...items, newItem]);
```

React depends on this immutability to detect changes efficiently (so it knows when to re-render).

---

### ⚡ **9. Side Effects**

A **side effect** is anything that happens _outside React’s rendering process_ — like fetching data, manually manipulating the DOM, or using timers.

React handles side effects using the **`useEffect()` hook**.

Example:

```jsx
useEffect(() => {
  fetchData();
}, []);
```

---

### 🧠 **10. Hooks**

Hooks are special React functions that let you _“hook into”_ React’s features inside functional components.

Some important hooks:

- `useState()` → state management
- `useEffect()` → handle side effects
- `useContext()` → global state
- `useRef()` → access DOM elements
- `useMemo()` / `useCallback()` → optimization

---

### 🌐 **11. Reconciliation**

This is React’s internal process of updating the DOM efficiently.

Steps:

1. React creates a Virtual DOM tree of your components.
2. When state/props change, React builds a **new Virtual DOM**.
3. React **compares** the new and old trees (diffing).
4. It updates **only what’s changed** in the real DOM.

That’s why React is **fast**.

---

### 🔄 **12. Controlled vs Uncontrolled Components**

- **Controlled components:** React fully manages their value (e.g., forms with `useState`).
- **Uncontrolled components:** The DOM manages the value (using `ref`).

Example:

**Controlled:**

```jsx
<input value={name} onChange={(e) => setName(e.target.value)} />
```

**Uncontrolled:**

```jsx
<input ref={inputRef} />
```

---

### 🌍 **13. Lifting State Up**

If two or more components need to share the same data, you “lift” the state up to their **closest common parent**.

Example:
Both `SearchBar` and `SearchResults` need the search term → store it in their parent component (`App`) and pass it down as props.

---

### 🧰 **14. Context API (Global State)**

When passing props becomes too deep (prop drilling), React’s **Context API** provides a way to share data globally.

```jsx
const ThemeContext = createContext();
```

Then you can access it anywhere using:

```jsx
const theme = useContext(ThemeContext);
```

---

### ⚙️ **15. Keys**

When rendering lists, React uses **keys** to uniquely identify each element.
This helps React detect which items changed or got removed.

Example:

```jsx
{
  users.map((user) => <UserCard key={user.id} name={user.name} />);
}
```

---

### ⚛️ **16. React Fiber**

This is the **core engine** (under the hood) that React uses for rendering and scheduling updates efficiently.
It allows React to:

- Pause rendering
- Prioritize updates
- Reuse work
  → making React **smooth** even in large apps.

(You don’t need to code with Fiber directly, just understand it’s React’s rendering engine.)

---
