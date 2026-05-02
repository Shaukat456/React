# ⚛️ React Hooks — Complete Mastery Guide

### Learn Every Important Hook by Building Real Things

> **Philosophy:** You don't learn hooks by reading definitions.
> You learn them by _feeling the problem they solve_, then watching
> the hook make that problem disappear.
>
> Every hook in this guide:
>
> 1. Starts with **the problem** it was born to solve
> 2. Has a **focused mini-project** that uses only that hook
> 3. Ends with a **"Why this hook?" callout** so the lesson sticks
>
> **Final Project:** A **Personal Productivity Dashboard** that combines
> every single hook you've learned.
>
> **Prerequisites:** React basics (components, props, JSX). That's it.

---

## What Are Hooks?

Before React 16.8 (2019), you could only use state and lifecycle features
inside **class components**. Function components were just "dumb" display boxes.

Hooks changed everything. They let **function components** do everything
class components could — and more cleanly.

```jsx
// The old way — Class component (still works, rarely used today)
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }; // state setup in constructor
  }

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {this.state.count} {/* must use `this` everywhere */}
      </button>
    );
  }
}

// The new way — Function component with a Hook
function Counter() {
  const [count, setCount] = useState(0); // one clean line
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

> **Rules of Hooks (NEVER break these):**
>
> 1. Only call hooks **at the top level** of a component — never inside loops, conditions, or nested functions.
> 2. Only call hooks from **React function components** or **custom hooks** — never from regular JS functions.
>    React enforces these rules. Breaking them causes bugs that are hard to trace.

---

## Hook Map — What You'll Learn

| Hook              | One-Line Purpose                                               | Mini-Project                |
| ----------------- | -------------------------------------------------------------- | --------------------------- |
| `useState`        | Store and update values in a component                         | Like/Dislike Counter        |
| `useEffect`       | Run code when something happens (mount, update, unmount)       | Live GitHub Profile Fetcher |
| `useRef`          | Access DOM elements or persist values without re-rendering     | Stopwatch                   |
| `useContext`      | Share data across components without prop drilling             | Theme Switcher              |
| `useReducer`      | Manage complex state with actions                              | Shopping Cart               |
| `useMemo`         | Cache expensive calculations                                   | Product Filter with Search  |
| `useCallback`     | Cache functions so child components don't re-render needlessly | Optimised Todo List         |
| **Custom Hook**   | Extract and reuse hook logic                                   | `useLocalStorage` hook      |
| **Final Project** | All hooks combined                                             | Productivity Dashboard      |

---

---

# HOOK 1 — `useState`

## The Problem

A component needs to **remember something** between renders.
Without state, every time React re-renders a component, all local
variables reset to their initial values. You can't track clicks,
form input, toggles — anything dynamic.

## Anatomy of `useState`

```jsx
import { useState } from "react";

const [value, setValue] = useState(initialValue);
//     │       │                   │
//     │       │                   └── Starting value (runs only once)
//     │       └── The setter function — call this to update
//     └── The current value — read this in your JSX
```

> **`useState` returns an array of exactly two things.**
> We use array destructuring (`const [x, setX]`) to name them.
> The naming convention is `thing` and `setThing` — always follow this.

## How Re-rendering Works

```jsx
// When you call setValue(newValue), React does THREE things:
// 1. Saves the new value internally
// 2. Schedules a re-render of this component
// 3. On re-render, `value` returns the NEW value

// IMPORTANT: setState is ASYNCHRONOUS
// This is a common beginner mistake:
const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  console.log(count); // ⚠️ Still logs OLD value — state hasn't updated yet
}

// CORRECT way to read updated value: use a functional update
setCount((prevCount) => prevCount + 1); // guaranteed to use latest value
```

---

## 🔨 Mini-Project 1 — Like/Dislike Counter

**What it does:** A post card with like and dislike buttons.
Tracks counts, prevents double-liking, and shows a reaction summary.

```jsx
// LikeCounter.jsx
import { useState } from "react";

function LikeCounter() {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userVote, setUserVote] = useState(null); // null | "like" | "dislike"

  function handleLike() {
    if (userVote === "like") {
      // User is un-liking
      setLikes((prev) => prev - 1);
      setUserVote(null);
    } else {
      // If previously disliked, remove the dislike first
      if (userVote === "dislike") setDislikes((prev) => prev - 1);
      setLikes((prev) => prev + 1);
      setUserVote("like");
    }
  }

  function handleDislike() {
    if (userVote === "dislike") {
      setDislikes((prev) => prev - 1);
      setUserVote(null);
    } else {
      if (userVote === "like") setLikes((prev) => prev - 1);
      setDislikes((prev) => prev + 1);
      setUserVote("dislike");
    }
  }

  // Derived state — calculated from existing state, no extra useState needed
  const score = likes - dislikes;
  const reaction =
    score > 5 ? "🔥 Trending" : score < 0 ? "👎 Unpopular" : "😐 Neutral";

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Post Content */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Why React Hooks Changed Everything
        </h2>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          Before hooks, sharing stateful logic between components required
          complex patterns like higher-order components and render props...
        </p>
      </div>

      {/* Reaction Bar */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              userVote === "like"
                ? "bg-blue-100 text-blue-700"
                : "bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
            }`}
          >
            👍 {likes}
          </button>

          {/* Dislike Button */}
          <button
            onClick={handleDislike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              userVote === "dislike"
                ? "bg-red-100 text-red-700"
                : "bg-white text-gray-500 hover:bg-red-50 hover:text-red-600 border border-gray-200"
            }`}
          >
            👎 {dislikes}
          </button>
        </div>

        {/* Reaction summary — derived state */}
        <span className="text-xs text-gray-400 font-medium">{reaction}</span>
      </div>
    </div>
  );
}

export default LikeCounter;
```

> **Key lessons from this mini-project:**
>
> **Multiple `useState` calls are fine.** Each one manages one piece of data.
> Don't try to cram everything into one state object unless they always change together.
>
> **Derived state** (`score`, `reaction`) is calculated from existing state —
> you don't need `useState` for every value your component displays. If a value
> can be _computed_ from state, compute it. Don't store it.
>
> **Functional updates** (`prev => prev + 1`) are the safe way to update
> state that depends on its previous value. Always use this pattern for counters.

---

---

# HOOK 2 — `useEffect`

## The Problem

Some code shouldn't run during rendering — it should run **after** the component
appears on screen, or **when** specific data changes, or **when** the component disappears.

Examples of "side effects":

- Fetching data from an API
- Setting up a timer or interval
- Subscribing to events
- Updating the document title
- Connecting to a WebSocket

`useEffect` is the hook that handles all of these.

## Anatomy of `useEffect`

```jsx
import { useEffect } from "react";

useEffect(() => {
  // --- EFFECT BODY ---
  // Runs after render when dependencies change

  // Optional: return a CLEANUP function
  return () => {
    // Runs before the component unmounts,
    // or before the effect runs again
  };
}, [dependency1, dependency2]);
//  ↑ DEPENDENCY ARRAY — controls WHEN the effect runs
```

## The Dependency Array — The Most Important Part

```jsx
// 1. No dependency array → runs after EVERY render (usually a mistake)
useEffect(() => {
  console.log("Runs after every single render");
});

// 2. Empty array [] → runs ONCE after first render (like componentDidMount)
useEffect(() => {
  console.log("Runs once when component appears");
}, []);

// 3. With dependencies → runs when those values change
useEffect(() => {
  console.log("Runs when userId changes");
}, [userId]);
```

> **The most common `useEffect` bug:**
> Forgetting to add a dependency that the effect uses.
> If your effect reads `userId` but `userId` isn't in the array,
> the effect will run with a stale, outdated `userId`.
> React's ESLint plugin (`eslint-plugin-react-hooks`) catches this automatically.

---

## 🔨 Mini-Project 2 — Live GitHub Profile Fetcher

**What it does:** Type a GitHub username, fetch their real profile from the
GitHub API, show loading and error states. Re-fetches whenever the username changes.

```jsx
// GitHubFetcher.jsx
import { useState, useEffect } from "react";

function GitHubFetcher() {
  const [username, setUsername] = useState("torvalds");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // This effect runs whenever `username` changes
  useEffect(() => {
    // Don't fetch if username is empty
    if (!username.trim()) return;

    // --- Debounce: wait 500ms after the user stops typing ---
    // This prevents a fetch on every single keystroke
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      setProfile(null);

      try {
        const res = await fetch(`https://api.github.com/users/${username}`);

        if (!res.ok) {
          throw new Error(
            res.status === 404
              ? `User "${username}" not found`
              : "Something went wrong",
          );
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 500);

    // CLEANUP: if `username` changes before 500ms, cancel the previous timer
    // This is the cleanup function — runs before the effect runs again
    return () => clearTimeout(timer);
  }, [username]); // Re-run whenever username changes

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-xl font-bold text-gray-800 mb-4">
        GitHub Profile Lookup
      </h1>

      {/* Input */}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username..."
        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* States */}
      <div className="mt-5">
        {loading && (
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            Fetching profile...
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            ⚠️ {error}
          </div>
        )}

        {profile && !loading && (
          <div className="flex items-start gap-4">
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="w-16 h-16 rounded-full ring-2 ring-blue-100"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">
                {profile.name || profile.login}
              </p>
              <p className="text-xs text-gray-400">@{profile.login}</p>
              {profile.bio && (
                <p className="text-sm text-gray-600 mt-1">{profile.bio}</p>
              )}
              <div className="flex gap-4 mt-2">
                <span className="text-xs text-gray-500">
                  <strong className="text-gray-700">
                    {profile.public_repos}
                  </strong>{" "}
                  repos
                </span>
                <span className="text-xs text-gray-500">
                  <strong className="text-gray-700">{profile.followers}</strong>{" "}
                  followers
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GitHubFetcher;
```

> **Key lessons from this mini-project:**
>
> **The cleanup function is essential for async effects.**
> The `clearTimeout` cleanup prevents a "race condition" — if the user
> types "react" quickly, you don't want 5 overlapping fetches all trying
> to set state. The cleanup cancels the previous timer before starting a new one.
>
> **Loading, error, and data are three separate states.**
> This pattern — `loading / error / data` — appears in virtually every
> real-world React component that fetches data. Memorise it.
>
> **`useEffect` for data fetching is the beginner pattern.**
> In production, teams use libraries like React Query or SWR that handle
> caching, deduplication, and background refetching — but they're all built
> on the same `useEffect` principles you just learned.

---

---

# HOOK 3 — `useRef`

## The Problem

Sometimes you need to:

1. **Touch a real DOM element directly** (focus an input, read its dimensions)
2. **Remember a value across renders** without causing a re-render when it changes

Neither `useState` (triggers re-render) nor local variables (reset on re-render)
solve these. `useRef` does both.

## Anatomy of `useRef`

```jsx
import { useRef } from "react";

const myRef = useRef(initialValue);
// myRef is an object: { current: initialValue }
// myRef.current is where the value lives
// Changing myRef.current does NOT trigger a re-render
```

```jsx
// USE CASE 1: Accessing a DOM element
function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // directly call DOM method
  }, []);

  return <input ref={inputRef} />;
  //            ↑ React puts the DOM element here
}

// USE CASE 2: Storing a value that shouldn't trigger re-renders
function Timer() {
  const intervalId = useRef(null); // stores the interval ID

  function start() {
    intervalId.current = setInterval(() => console.log("tick"), 1000);
  }

  function stop() {
    clearInterval(intervalId.current); // read it back
  }
}
```

---

## 🔨 Mini-Project 3 — Stopwatch

**What it does:** A precise stopwatch with Start, Stop, and Reset.
Uses `useRef` to store the interval ID (so it can be cleared)
and `useState` to store the elapsed time (so it displays on screen).

```jsx
// Stopwatch.jsx
import { useState, useRef } from "react";

function Stopwatch() {
  const [time, setTime] = useState(0); // milliseconds elapsed
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null); // stores the interval ID
  const startTimeRef = useRef(null); // stores when we started

  function start() {
    if (running) return;

    // Record what time it was when we started
    // We subtract current `time` so resuming works correctly
    startTimeRef.current = Date.now() - time;

    intervalRef.current = setInterval(() => {
      // Calculate elapsed time precisely using Date.now()
      // Much more accurate than incrementing by 10ms each tick
      setTime(Date.now() - startTimeRef.current);
    }, 10); // update every 10ms

    setRunning(true);
  }

  function stop() {
    clearInterval(intervalRef.current); // USE the stored interval ID
    intervalRef.current = null;
    setRunning(false);
  }

  function reset() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    startTimeRef.current = null;
    setTime(0);
    setRunning(false);
  }

  // Format milliseconds → MM:SS.ms
  function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950">
      <div className="bg-gray-900 rounded-3xl p-10 shadow-2xl flex flex-col items-center gap-8">
        {/* Time Display */}
        <div className="font-mono text-6xl font-bold text-white tracking-wider">
          {formatTime(time)}
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <button
            onClick={start}
            disabled={running}
            className="px-6 py-3 bg-green-500 hover:bg-green-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
          >
            ▶ Start
          </button>
          <button
            onClick={stop}
            disabled={!running}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
          >
            ⏸ Stop
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-xl transition-colors"
          >
            ↺ Reset
          </button>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div
            className={`w-2 h-2 rounded-full ${running ? "bg-green-400 animate-pulse" : "bg-gray-600"}`}
          />
          {running ? "Running" : time > 0 ? "Paused" : "Ready"}
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
```

> **Key lessons from this mini-project:**
>
> **`useRef` for the interval ID, `useState` for the display.**
> `intervalRef.current` changes every time we start/stop but we don't
> want the component to re-render when that happens — we just need to read
> it later to clear it. That's exactly what `useRef` is for.
>
> **The critical `useRef` insight:**
> `useState` — "I need this value to show on screen → causes re-render"
> `useRef` — "I need to remember this value → never causes re-render"
> When you're unsure which to use, ask: "Do I need the UI to update when this changes?"

---

---

# HOOK 4 — `useContext`

## The Problem

Imagine you have user preferences (like dark/light theme) that 10 different
components need. Without context, you'd pass it as a prop through every
component in between — even ones that don't use it.

This is called **prop drilling** and it's painful.

```jsx
// Prop drilling — passing theme through every layer
<App theme={theme}>
  <Layout theme={theme}>
    <Sidebar theme={theme}>
      <NavItem theme={theme} /> {/* finally uses it here */}
    </Sidebar>
  </Layout>
</App>
```

`useContext` gives any component direct access to shared data
without threading props through every layer.

## How Context Works (3 Steps)

```jsx
// Step 1: CREATE the context (in a separate file)
import { createContext } from "react";
export const ThemeContext = createContext(null);

// Step 2: PROVIDE the context (wrap components that need access)
import { ThemeContext } from "./ThemeContext";
function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Layout /> {/* every child can now access context */}
    </ThemeContext.Provider>
  );
}

// Step 3: CONSUME the context (in any nested component)
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
function NavItem() {
  const { theme } = useContext(ThemeContext); // no prop needed!
  return (
    <div className={theme === "dark" ? "bg-gray-900" : "bg-white"}>...</div>
  );
}
```

---

## 🔨 Mini-Project 4 — Theme Switcher

**What it does:** A global theme system. Toggle between light and dark mode
from anywhere. Any component reads the current theme without props.

```jsx
// ThemeContext.jsx — Create and export the context
import { createContext, useContext, useState } from "react";

// 1. Create context with a meaningful default
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

// 2. Create a Provider component that manages the state
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create a custom hook for consuming the context
// This is the best practice — wrap useContext in a named hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return context;
}
```

```jsx
// App.jsx — Wrap everything in the provider
import { ThemeProvider } from "./ThemeContext";
import Dashboard from "./Dashboard";

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
```

```jsx
// Dashboard.jsx — Uses theme without receiving it as a prop
import { useTheme } from "./ThemeContext";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

function Dashboard() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Sidebar />
      <MainContent />
    </div>
  );
}
```

```jsx
// Sidebar.jsx — Reads theme AND can toggle it
import { useTheme } from "./ThemeContext";

function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  const bg =
    theme === "dark"
      ? "bg-gray-900 border-gray-800"
      : "bg-white border-gray-200";

  return (
    <aside className={`w-64 border-r flex flex-col p-5 gap-6 ${bg}`}>
      <div>
        <h1 className="text-lg font-bold">MyApp</h1>
        <p
          className={`text-xs mt-0.5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
        >
          Dashboard
        </p>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-1">
        {["Overview", "Analytics", "Projects", "Settings"].map((item) => (
          <button
            key={item}
            className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              theme === "dark"
                ? "hover:bg-gray-800 text-gray-300"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Theme Toggle at bottom */}
      <div className="mt-auto">
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
            theme === "dark"
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <span>{theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}</span>
          <span
            className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors ${
              theme === "dark"
                ? "bg-blue-500 justify-end"
                : "bg-gray-300 justify-start"
            }`}
          >
            <span className="w-3 h-3 bg-white rounded-full shadow" />
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
```

> **Key lessons from this mini-project:**
>
> **Wrap `useContext` in a custom hook** (`useTheme`).
> This is the industry standard. It gives you a meaningful error message
> if someone uses it outside the Provider, and hides the implementation detail
> of _which_ context is being used.
>
> **Context is not a replacement for all props.**
> Use context for truly global data: authentication, theme, language, user preferences.
> For data that belongs to one section of your app, props are still cleaner.

---

---

# HOOK 5 — `useReducer`

## The Problem

When state gets complex — multiple related values, many ways to update them —
multiple `useState` calls become hard to manage. You can easily end up with
inconsistent state (like a cart where the count doesn't match the items array).

`useReducer` centralises all state logic into a **single, predictable function**.

## Anatomy of `useReducer`

```jsx
import { useReducer } from "react";

// The REDUCER — a pure function that takes current state + action, returns new state
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

// In your component:
const [state, dispatch] = useReducer(reducer, { count: 0 });
//     │       │                     │          │
//     │       │                     │          └── Initial state
//     │       │                     └── Your reducer function
//     │       └── dispatch — call this to send an action
//     └── current state

// Trigger a state change:
dispatch({ type: "INCREMENT" });
dispatch({ type: "DECREMENT" });
```

> **Think of `dispatch` like a remote control.**
> You press a button (dispatch an action) and the reducer decides what happens.
> The component never directly mutates state — it just sends messages.

---

## 🔨 Mini-Project 5 — Shopping Cart with `useReducer`

**What it does:** Add items to a cart, increase/decrease quantity,
remove items, clear the cart. All state managed by a single reducer.

```jsx
// ShoppingCart.jsx
import { useReducer } from "react";

// --- Products (our fake store catalogue) ---
const PRODUCTS = [
  { id: 1, name: "Mechanical Keyboard", price: 8500, emoji: "⌨️" },
  { id: 2, name: "Wireless Mouse", price: 3200, emoji: "🖱️" },
  { id: 3, name: "USB-C Hub", price: 2800, emoji: "🔌" },
  { id: 4, name: "Monitor Light Bar", price: 4500, emoji: "💡" },
];

// --- Initial Cart State ---
const initialState = {
  items: [], // Array of { product, quantity }
  total: 0,
};

// --- REDUCER — all state logic lives here, nowhere else ---
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id,
      );

      const updatedItems = existing
        ? // Item exists — increase quantity
          state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          )
        : // New item — add to cart
          [...state.items, { product: action.product, quantity: 1 }];

      return {
        ...state,
        items: updatedItems,
        total: state.total + action.product.price,
      };
    }

    case "REMOVE_ITEM": {
      const item = state.items.find((i) => i.product.id === action.productId);
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.productId),
        total: state.total - item.product.price * item.quantity,
      };
    }

    case "INCREASE_QTY": {
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        ),
        total:
          state.total +
          state.items.find((i) => i.product.id === action.productId).product
            .price,
      };
    }

    case "DECREASE_QTY": {
      const item = state.items.find((i) => i.product.id === action.productId);
      if (item.quantity === 1) {
        // Remove item if quantity would go to 0
        return cartReducer(state, {
          type: "REMOVE_ITEM",
          productId: action.productId,
        });
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: i.quantity - 1 }
            : i,
        ),
        total: state.total - item.product.price,
      };
    }

    case "CLEAR_CART":
      return initialState;

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

// --- Component ---
function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Product Catalogue */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">🛍️ Store</h2>
        <div className="flex flex-col gap-3">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{product.emoji}</span>
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    PKR {product.price.toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => dispatch({ type: "ADD_ITEM", product })}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                + Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            🛒 Cart ({itemCount})
          </h2>
          {cart.items.length > 0 && (
            <button
              onClick={() => dispatch({ type: "CLEAR_CART" })}
              className="text-xs text-red-500 hover:text-red-700 font-medium"
            >
              Clear all
            </button>
          )}
        </div>

        {cart.items.length === 0 ? (
          <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
            <p className="text-3xl mb-2">🛒</p>
            <p className="text-sm">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {cart.items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{product.emoji}</span>
                    <p className="text-sm font-medium text-gray-800">
                      {product.name}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_ITEM", productId: product.id })
                    }
                    className="text-gray-300 hover:text-red-500 transition-colors text-lg"
                  >
                    ×
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        dispatch({
                          type: "DECREASE_QTY",
                          productId: product.id,
                        })
                      }
                      className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-sm"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "INCREASE_QTY",
                          productId: product.id,
                        })
                      }
                      className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    PKR {(product.price * quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="flex items-center justify-between px-4 py-3 bg-blue-50 rounded-xl border border-blue-100">
              <span className="font-bold text-gray-800">Total</span>
              <span className="font-bold text-blue-700">
                PKR {cart.total.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
```

> **Key lessons from this mini-project:**
>
> **`useReducer` when state has many interconnected parts.**
> The cart's `items` and `total` always need to stay in sync.
> With `useReducer`, every update goes through the reducer — it's impossible
> for them to get out of sync because the logic is centralised.
>
> **Action types as strings are a contract.**
> `{ type: "ADD_ITEM", product }` is the message. The reducer is the handler.
> Throwing an error in the `default` case (`throw new Error(...)`)
> catches typos immediately — a pattern from Redux.
>
> **Use `useReducer` instead of `useState` when:**
>
> - State has 3+ related values
> - Multiple events cause the same state to change
> - The next state depends on multiple pieces of current state

---

---

# HOOK 6 — `useMemo`

## The Problem

Some calculations are expensive: filtering 10,000 items, sorting a huge list,
computing statistics. If these run on every re-render — even when their inputs
haven't changed — your app becomes slow and janky.

`useMemo` **caches the result** of a calculation and only recomputes it
when its dependencies change.

## Anatomy of `useMemo`

```jsx
import { useMemo } from "react";

const result = useMemo(() => {
  // Expensive calculation here
  return someExpensiveComputation(data);
}, [data]); // Only recompute when `data` changes
```

> **`useMemo` is an optimisation tool.**
> Don't use it on everything — only on calculations that are genuinely slow.
> Premature memoisation adds complexity without benefit.
> Profile first, optimise second.

---

## 🔨 Mini-Project 6 — Product Filter with Search

**What it does:** A searchable, filterable product list. Filtering + sorting
are memoised so they don't recalculate when unrelated state (like the
hover state of a button) changes.

```jsx
// ProductFilter.jsx
import { useState, useMemo } from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 4500,
    category: "Electronics",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Running Sneakers",
    price: 6200,
    category: "Footwear",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Leather Backpack",
    price: 8900,
    category: "Accessories",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 18000,
    category: "Electronics",
    rating: 4.4,
  },
  {
    id: 5,
    name: "Cotton T-Shirt",
    price: 850,
    category: "Clothing",
    rating: 3.9,
  },
  {
    id: 6,
    name: "Noise Cancelling Buds",
    price: 7500,
    category: "Electronics",
    rating: 4.6,
  },
  {
    id: 7,
    name: "Formal Oxford Shoes",
    price: 5400,
    category: "Footwear",
    rating: 4.1,
  },
  {
    id: 8,
    name: "Canvas Tote Bag",
    price: 1200,
    category: "Accessories",
    rating: 4.0,
  },
];

const CATEGORIES = [
  "All",
  "Electronics",
  "Footwear",
  "Accessories",
  "Clothing",
];

function ProductFilter() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [hoveredId, setHoveredId] = useState(null); // intentionally unrelated state

  // ✅ useMemo — this only recalculates when search, category, or sortBy changes
  // If only `hoveredId` changes, this expensive filter does NOT re-run
  const filteredProducts = useMemo(() => {
    console.log("🔄 Filtering... (useMemo running)"); // watch in console

    return PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || p.category === category;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return a.name.localeCompare(b.name); // default: name
    });
  }, [search, category, sortBy]); // ← dependencies

  // Another memoised value — stats derived from filtered results
  const stats = useMemo(
    () => ({
      count: filteredProducts.length,
      avgPrice: filteredProducts.length
        ? Math.round(
            filteredProducts.reduce((s, p) => s + p.price, 0) /
              filteredProducts.length,
          )
        : 0,
      bestRated: filteredProducts.length
        ? filteredProducts.reduce(
            (best, p) => (p.rating > best.rating ? p : best),
            filteredProducts[0],
          )
        : null,
    }),
    [filteredProducts],
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Product Catalogue
      </h1>

      {/* Controls */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col gap-3 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  category === cat
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none"
          >
            <option value="name">Sort: Name</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Stats Bar */}
      {stats.count > 0 && (
        <div className="flex gap-4 mb-4 text-sm text-gray-500">
          <span>
            <strong className="text-gray-700">{stats.count}</strong> products
          </span>
          <span>
            Avg:{" "}
            <strong className="text-gray-700">
              PKR {stats.avgPrice.toLocaleString()}
            </strong>
          </span>
          {stats.bestRated && (
            <span>
              Top rated:{" "}
              <strong className="text-gray-700">{stats.bestRated.name}</strong>
            </span>
          )}
        </div>
      )}

      {/* Product List */}
      <div className="flex flex-col gap-3">
        {filteredProducts.length === 0 ? (
          <p className="text-center py-10 text-gray-400">
            No products match your search.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredId(product.id)} // changes hoveredId state
              onMouseLeave={() => setHoveredId(null)} // but does NOT re-run useMemo
              className={`flex items-center justify-between bg-white border rounded-xl p-4 transition-all ${
                hoveredId === product.id
                  ? "border-blue-300 shadow-sm"
                  : "border-gray-200"
              }`}
            >
              <div>
                <p className="font-medium text-gray-800">{product.name}</p>
                <p className="text-xs text-gray-400">
                  {product.category} · ⭐ {product.rating}
                </p>
              </div>
              <p className="font-bold text-gray-700">
                PKR {product.price.toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductFilter;
```

> **Key lessons from this mini-project:**
>
> **`useMemo` prevents unnecessary recalculations.**
> Open the browser console and watch the log message.
> Hovering over products (which changes `hoveredId`) does NOT re-run the filter.
> Only changing search, category, or sort does.
>
> **Chain `useMemo` values.** `stats` depends on `filteredProducts`.
> Since `filteredProducts` is memoised, `stats` only recalculates when
> `filteredProducts` actually changes — a clean chain.

---

---

# HOOK 7 — `useCallback`

## The Problem

In React, functions defined inside a component are **recreated on every render**.
This is usually fine. But when you pass a function as a prop to a child component,
the child sees it as a "new" function every render — and if the child is wrapped
in `React.memo`, it will re-render unnecessarily.

`useCallback` **caches a function** so it's only recreated when its dependencies change.

## Anatomy of `useCallback`

```jsx
import { useCallback } from "react";

const handleClick = useCallback(() => {
  doSomething(id);
}, [id]); // Only recreate the function when `id` changes
```

> **`useCallback` is almost always paired with `React.memo`.**
> Without `React.memo` on the child, `useCallback` has no effect —
> the child re-renders regardless.
> They work as a team.

---

## 🔨 Mini-Project 7 — Optimised Todo List

**What it does:** A todo list where individual todo items are memoised.
`useCallback` prevents the parent's functions from causing unnecessary
child re-renders.

```jsx
// OptimisedTodoList.jsx
import { useState, useCallback, memo } from "react";

// TodoItem wrapped in React.memo — only re-renders if its props change
// Without memo here, useCallback in the parent has no effect
const TodoItem = memo(function TodoItem({ todo, onToggle, onDelete }) {
  console.log(`Rendering: ${todo.text}`); // watch this in console

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
        todo.done ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            todo.done
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 hover:border-green-400"
          }`}
        >
          {todo.done && "✓"}
        </button>
        <span
          className={`text-sm ${todo.done ? "line-through text-gray-400" : "text-gray-700"}`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-300 hover:text-red-500 transition-colors font-bold text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
});

// Parent component
function OptimisedTodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn useState", done: true },
    { id: 2, text: "Learn useEffect", done: true },
    { id: 3, text: "Learn useCallback", done: false },
    { id: 4, text: "Build final project", done: false },
  ]);
  const [input, setInput] = useState("");

  // ✅ useCallback — these functions are cached
  // Without useCallback, new function references would be created each render,
  // defeating the purpose of React.memo on TodoItem

  const handleToggle = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }, []); // No dependencies — setTodos is stable, never changes

  const handleDelete = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleAdd = useCallback(() => {
    if (!input.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: input.trim(), done: false },
    ]);
    setInput("");
  }, [input]); // Depends on input — recreated when input changes

  const completed = todos.filter((t) => t.done).length;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">My Tasks</h1>
        <span className="text-sm text-gray-400">
          {completed}/{todos.length} done
        </span>
      </div>

      {/* Add Input */}
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <div className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Progress</span>
          <span>{Math.round((completed / todos.length) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${(completed / todos.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default OptimisedTodoList;
```

> **Key lessons from this mini-project:**
>
> **`useCallback` + `React.memo` are a team.**
> Open the console and type in the input box. Watch the logs —
> no TodoItem re-renders while you type. Without `useCallback`,
> every keystroke would re-render all todos.
>
> **Use functional updates with `setTodos(prev => ...)`.**
> This means `handleToggle` and `handleDelete` don't need `todos`
> in their dependency arrays — they always get the freshest state
> via `prev`, keeping the dependency array empty and the function stable.

---

---

# HOOK 8 — Custom Hooks

## The Problem

You've built the same data-fetching logic in 4 different components.
Or the same local storage sync in 6 places. Copy-paste is the enemy.

**Custom Hooks** let you extract reusable stateful logic into a standalone function.
They're not a new React API — they're just regular functions that _use other hooks_.

## The Rules of Custom Hooks

```jsx
// Custom hook names MUST start with "use"
// This is how React identifies them and enforces the Rules of Hooks

function useLocalStorage(key, initialValue) {
  // ← This is a custom hook because it starts with "use"
  // ← It uses useState inside — that's what makes it a hook
}

function localStorageHelper(key, value) {
  // ← This is NOT a hook — it's a regular function
  // ← You cannot use useState, useEffect, etc. inside it
}
```

---

## 🔨 Custom Hook — `useLocalStorage`

**What it does:** Sync any state value to localStorage automatically.
Drop-in replacement for `useState` — same API, persistent storage.

```jsx
// hooks/useLocalStorage.js
import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  // Initialise from localStorage if a value exists, otherwise use initialValue
  const [value, setValue] = useState(() => {
    // Lazy initialiser — this function runs once, not on every render
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue; // Fallback if JSON.parse fails
    }
  });

  // Sync to localStorage whenever `value` or `key` changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.warn(`Could not save "${key}" to localStorage`);
    }
  }, [key, value]);

  return [value, setValue]; // Same API as useState — drop-in replacement
}

export default useLocalStorage;
```

```jsx
// Using the custom hook — identical to useState but persistent
import useLocalStorage from "./hooks/useLocalStorage";

function NoteApp() {
  // Replaces: const [notes, setNotes] = useState([]);
  const [notes, setNotes] = useLocalStorage("my-notes", []);
  const [text, setText] = useState("");

  function addNote() {
    if (!text.trim()) return;
    setNotes((prev) => [...prev, { id: Date.now(), text: text.trim() }]);
    setText("");
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-xl font-bold text-gray-800 mb-4">📝 Sticky Notes</h1>
      <p className="text-xs text-gray-400 mb-4">
        Notes persist after page refresh (localStorage)
      </p>

      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
          placeholder="Write a note..."
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={addNote}
          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-lg text-sm"
        >
          Add
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {notes.length === 0 && (
          <p className="text-center text-gray-300 py-6 text-sm">
            No notes yet. Add one above!
          </p>
        )}
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2"
          >
            <p className="text-sm text-gray-700">{note.text}</p>
            <button
              onClick={() => deleteNote(note.id)}
              className="text-yellow-300 hover:text-red-400 font-bold text-lg"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

> **Key lessons from this section:**
>
> **Custom hooks are just functions that start with `use`.**
> React doesn't treat them differently — but the `use` prefix tells React
> (and its linter) that this function follows hook rules.
>
> **The lazy initialiser in `useState(() => ...)`.**
> Passing a _function_ to `useState` instead of a value means the function
> runs only once on mount — not on every render. For reading from localStorage
> (which is slow), this matters.
>
> **Other useful custom hooks to build next:**
> `useFetch`, `useDebounce`, `useWindowSize`, `useOnClickOutside`, `useToggle`

---

---

# 🏆 FINAL PROJECT — Personal Productivity Dashboard

## What We're Building

A fully functional **Productivity Dashboard** that combines every hook
you've learned. It includes:

- A **habit tracker** with streak counts
- A **focus timer** (Pomodoro-style)
- A **quick notes** panel
- A **daily stats** summary
- **Dark/light mode** toggle
- **Persistent storage** — everything survives page refresh

---

## Hook Usage Map for the Final Project

| Hook            | Used For                                                  |
| --------------- | --------------------------------------------------------- |
| `useState`      | Active tab, timer running state, form inputs              |
| `useEffect`     | Timer countdown, document title updates                   |
| `useRef`        | Interval reference for the focus timer                    |
| `useContext`    | Global theme (dark/light) across all panels               |
| `useReducer`    | Habit tracker state (check off, add, remove habits)       |
| `useMemo`       | Calculating daily stats summary                           |
| `useCallback`   | Stable event handlers passed to memoised child components |
| **Custom Hook** | `useLocalStorage` for persisting all data                 |

---

## File Structure

```
src/
├── hooks/
│   └── useLocalStorage.js         ← Custom hook from Hook 8
│
├── context/
│   └── ThemeContext.jsx            ← Context from Hook 4
│
├── components/
│   ├── HabitTracker.jsx            ← useReducer + useLocalStorage
│   ├── FocusTimer.jsx              ← useState + useEffect + useRef
│   ├── QuickNotes.jsx              ← useLocalStorage + useCallback
│   └── StatsPanel.jsx              ← useMemo
│
└── Dashboard.jsx                   ← Assembles everything
```

---

## Part 1 — Theme Context

```jsx
// context/ThemeContext.jsx
import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Custom hook keeps theme persistent
  const [theme, setTheme] = useLocalStorage("dashboard-theme", "light");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
}
```

---

## Part 2 — Habit Tracker (`useReducer` + `useLocalStorage`)

```jsx
// components/HabitTracker.jsx
import { useReducer, useEffect, useCallback, memo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useTheme } from "../context/ThemeContext";

// --- Reducer ---
function habitReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_TODAY": {
      const today = new Date().toDateString();
      return state.map((habit) =>
        habit.id === action.id
          ? {
              ...habit,
              completedDates: habit.completedDates.includes(today)
                ? habit.completedDates.filter((d) => d !== today)
                : [...habit.completedDates, today],
            }
          : habit,
      );
    }
    case "ADD_HABIT":
      return [
        ...state,
        {
          id: Date.now(),
          name: action.name,
          completedDates: [],
          emoji: action.emoji,
        },
      ];
    case "REMOVE_HABIT":
      return state.filter((h) => h.id !== action.id);
    case "LOAD":
      return action.habits;
    default:
      return state;
  }
}

const DEFAULT_HABITS = [
  { id: 1, name: "Morning workout", emoji: "💪", completedDates: [] },
  { id: 2, name: "Read 20 pages", emoji: "📚", completedDates: [] },
  { id: 3, name: "Drink 8 glasses", emoji: "💧", completedDates: [] },
  { id: 4, name: "No social media", emoji: "📵", completedDates: [] },
];

const EMOJIS = ["💪", "📚", "💧", "🏃", "🧘", "✍️", "🎯", "🌱"];

// Memoised single habit row
const HabitRow = memo(function HabitRow({
  habit,
  isComplete,
  onToggle,
  onRemove,
  theme,
}) {
  const dark = theme === "dark";
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
        isComplete
          ? dark
            ? "bg-green-900/30 border-green-700/50"
            : "bg-green-50 border-green-200"
          : dark
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{habit.emoji}</span>
        <div>
          <p
            className={`text-sm font-medium ${isComplete ? "line-through opacity-60" : ""} ${dark ? "text-gray-100" : "text-gray-800"}`}
          >
            {habit.name}
          </p>
          <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>
            🔥 {habit.completedDates.length} day streak
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggle(habit.id)}
          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
            isComplete
              ? "bg-green-500 border-green-500 text-white"
              : dark
                ? "border-gray-600 hover:border-green-400"
                : "border-gray-300 hover:border-green-400"
          }`}
        >
          {isComplete ? "✓" : ""}
        </button>
        <button
          onClick={() => onRemove(habit.id)}
          className="text-gray-300 hover:text-red-400 text-lg font-bold leading-none transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
});

function HabitTracker({ onCompletionChange }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [savedHabits, setSavedHabits] = useLocalStorage(
    "habits",
    DEFAULT_HABITS,
  );
  const [habits, dispatch] = useReducer(habitReducer, savedHabits);
  const [newHabitName, setNewHabitName] = useState_shim("");
  const [newHabitEmoji, setNewHabitEmoji] = useState_shim("🎯");

  // Sync reducer state → localStorage whenever habits change
  useEffect(() => {
    setSavedHabits(habits);
    const today = new Date().toDateString();
    const completed = habits.filter((h) =>
      h.completedDates.includes(today),
    ).length;
    onCompletionChange(completed, habits.length);
  }, [habits]);

  const today = new Date().toDateString();

  const handleToggle = useCallback((id) => {
    dispatch({ type: "TOGGLE_TODAY", id });
  }, []);

  const handleRemove = useCallback((id) => {
    dispatch({ type: "REMOVE_HABIT", id });
  }, []);

  function handleAdd() {
    if (!newHabitName.trim()) return;
    dispatch({
      type: "ADD_HABIT",
      name: newHabitName.trim(),
      emoji: newHabitEmoji,
    });
    setNewHabitName("");
  }

  const completedToday = habits.filter((h) =>
    h.completedDates.includes(today),
  ).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2
            className={`font-bold text-base ${dark ? "text-white" : "text-gray-800"}`}
          >
            Today's Habits
          </h2>
          <p
            className={`text-xs mt-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}
          >
            {completedToday}/{habits.length} completed
          </p>
        </div>
        {/* Mini progress bar */}
        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{
              width: habits.length
                ? `${(completedToday / habits.length) * 100}%`
                : "0%",
            }}
          />
        </div>
      </div>

      {/* Habit List */}
      <div className="flex flex-col gap-2">
        {habits.map((habit) => (
          <HabitRow
            key={habit.id}
            habit={habit}
            isComplete={habit.completedDates.includes(today)}
            onToggle={handleToggle}
            onRemove={handleRemove}
            theme={theme}
          />
        ))}
      </div>

      {/* Add Habit */}
      <div
        className={`flex gap-2 pt-2 border-t ${dark ? "border-gray-700" : "border-gray-100"}`}
      >
        <select
          value={newHabitEmoji}
          onChange={(e) => setNewHabitEmoji(e.target.value)}
          className={`px-2 py-2 border rounded-lg text-sm focus:outline-none ${dark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-200"}`}
        >
          {EMOJIS.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <input
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="New habit..."
          className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${dark ? "bg-gray-800 border-gray-600 text-white placeholder:text-gray-500" : "bg-white border-gray-200"}`}
        />
        <button
          onClick={handleAdd}
          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg"
        >
          +
        </button>
      </div>
    </div>
  );
}

// Note: useState_shim is just useState — renamed here to show it's the same hook
// In your actual file, import { useState } from "react" and use it normally
function useState_shim(initial) {
  const { useState } = require("react");
  return useState(initial);
}

export default HabitTracker;
```

---

## Part 3 — Focus Timer (`useState` + `useEffect` + `useRef`)

```jsx
// components/FocusTimer.jsx
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const MODES = {
  focus: { label: "Focus", duration: 25 * 60, color: "blue" },
  shortBreak: { label: "Short Break", duration: 5 * 60, color: "green" },
  longBreak: { label: "Long Break", duration: 15 * 60, color: "purple" },
};

function FocusTimer({ onSessionComplete }) {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(MODES["focus"].duration);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);

  // Update document title with timer — side effect → useEffect
  useEffect(() => {
    const { label } = MODES[mode];
    document.title = running
      ? `${formatTime(timeLeft)} — ${label}`
      : "Productivity Dashboard";
    return () => {
      document.title = "Productivity Dashboard";
    };
  }, [timeLeft, running, mode]);

  // The countdown — starts/stops based on `running`
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            setSessions((s) => s + 1);
            onSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  function switchMode(newMode) {
    clearInterval(intervalRef.current);
    setRunning(false);
    setMode(newMode);
    setTimeLeft(MODES[newMode].duration);
  }

  function reset() {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTimeLeft(MODES[mode].duration);
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  const progress = 1 - timeLeft / MODES[mode].duration;
  const { color } = MODES[mode];
  const colorMap = {
    blue: {
      ring: "stroke-blue-500",
      btn: "bg-blue-600 hover:bg-blue-700",
      tab: "bg-blue-600",
    },
    green: {
      ring: "stroke-green-500",
      btn: "bg-green-600 hover:bg-green-700",
      tab: "bg-green-600",
    },
    purple: {
      ring: "stroke-purple-500",
      btn: "bg-purple-600 hover:bg-purple-700",
      tab: "bg-purple-600",
    },
  };
  const c = colorMap[color];

  const circumference = 2 * Math.PI * 54; // r=54

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Mode Tabs */}
      <div
        className={`flex rounded-xl p-1 gap-1 ${dark ? "bg-gray-800" : "bg-gray-100"}`}
      >
        {Object.entries(MODES).map(([key, val]) => (
          <button
            key={key}
            onClick={() => switchMode(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === key
                ? `${c.tab} text-white`
                : dark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {val.label}
          </button>
        ))}
      </div>

      {/* Circular Progress */}
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          {/* Background ring */}
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            strokeWidth="8"
            className={dark ? "stroke-gray-700" : "stroke-gray-200"}
          />
          {/* Progress ring */}
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            className={c.ring}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`font-mono text-3xl font-bold ${dark ? "text-white" : "text-gray-800"}`}
          >
            {formatTime(timeLeft)}
          </span>
          <span
            className={`text-xs mt-1 ${dark ? "text-gray-400" : "text-gray-400"}`}
          >
            Session {sessions + 1}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={() => setRunning((r) => !r)}
          className={`px-6 py-2.5 ${c.btn} text-white font-semibold rounded-xl text-sm transition-colors`}
        >
          {running ? "⏸ Pause" : "▶ Start"}
        </button>
        <button
          onClick={reset}
          className={`px-4 py-2.5 border font-semibold rounded-xl text-sm transition-colors ${dark ? "border-gray-600 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
        >
          ↺
        </button>
      </div>

      {/* Sessions counter */}
      <div className="flex gap-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${
              i < sessions % 4
                ? color === "blue"
                  ? "bg-blue-500"
                  : color === "green"
                    ? "bg-green-500"
                    : "bg-purple-500"
                : dark
                  ? "bg-gray-700"
                  : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default FocusTimer;
```

---

## Part 4 — Quick Notes (`useLocalStorage` + `useCallback`)

```jsx
// components/QuickNotes.jsx
import { useState, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useTheme } from "../context/ThemeContext";

function QuickNotes() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [notes, setNotes] = useLocalStorage("dashboard-notes", []);
  const [input, setInput] = useState("");

  const addNote = useCallback(() => {
    if (!input.trim()) return;
    setNotes((prev) => [
      {
        id: Date.now(),
        text: input.trim(),
        createdAt: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
    setInput("");
  }, [input, setNotes]);

  const deleteNote = useCallback(
    (id) => {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    },
    [setNotes],
  );

  return (
    <div className="flex flex-col gap-3 h-full">
      <h2
        className={`font-bold text-base ${dark ? "text-white" : "text-gray-800"}`}
      >
        Quick Notes
      </h2>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
          placeholder="Capture a thought..."
          className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            dark
              ? "bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
              : "bg-white border-gray-200"
          }`}
        />
        <button
          onClick={addNote}
          className="px-3 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-lg text-sm"
        >
          +
        </button>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto max-h-48">
        {notes.length === 0 && (
          <p
            className={`text-center py-6 text-sm ${dark ? "text-gray-600" : "text-gray-300"}`}
          >
            No notes yet
          </p>
        )}
        {notes.map((note) => (
          <div
            key={note.id}
            className={`flex items-start justify-between px-3 py-2.5 rounded-lg border ${
              dark
                ? "bg-yellow-900/20 border-yellow-800/40"
                : "bg-yellow-50 border-yellow-200"
            }`}
          >
            <div>
              <p
                className={`text-sm ${dark ? "text-yellow-100" : "text-gray-700"}`}
              >
                {note.text}
              </p>
              <p
                className={`text-xs mt-0.5 ${dark ? "text-yellow-700" : "text-yellow-500"}`}
              >
                {note.createdAt}
              </p>
            </div>
            <button
              onClick={() => deleteNote(note.id)}
              className="text-yellow-300 hover:text-red-400 font-bold text-lg leading-none ml-2 flex-shrink-0 transition-colors"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickNotes;
```

---

## Part 5 — Stats Panel (`useMemo`)

```jsx
// components/StatsPanel.jsx
import { useMemo } from "react";
import { useTheme } from "../context/ThemeContext";

function StatsPanel({ habitsCompleted, habitsTotal, focusSessions }) {
  const { theme } = useTheme();
  const dark = theme === "dark";

  // useMemo — these stats only recalculate when inputs change
  const stats = useMemo(() => {
    const habitPercent =
      habitsTotal > 0 ? Math.round((habitsCompleted / habitsTotal) * 100) : 0;

    const focusMinutes = focusSessions * 25;

    const productivityScore = Math.min(
      100,
      Math.round(habitPercent * 0.6 + Math.min(focusSessions * 10, 40)),
    );

    const grade =
      productivityScore >= 80
        ? { label: "Excellent", emoji: "🏆" }
        : productivityScore >= 60
          ? { label: "Good", emoji: "⭐" }
          : productivityScore >= 40
            ? { label: "Fair", emoji: "📈" }
            : { label: "Keep going", emoji: "💪" };

    return { habitPercent, focusMinutes, productivityScore, grade };
  }, [habitsCompleted, habitsTotal, focusSessions]);

  const cards = [
    {
      label: "Habits Done",
      value: `${habitsCompleted}/${habitsTotal}`,
      sub: `${stats.habitPercent}% complete`,
      emoji: "✅",
    },
    {
      label: "Focus Sessions",
      value: focusSessions,
      sub: `${stats.focusMinutes} minutes focused`,
      emoji: "🎯",
    },
    {
      label: "Productivity Score",
      value: `${stats.productivityScore}%`,
      sub: stats.grade.label,
      emoji: stats.grade.emoji,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-xl border p-4 flex flex-col gap-1 ${
            dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <span className="text-xl">{card.emoji}</span>
          <p
            className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}
          >
            {card.value}
          </p>
          <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>
            {card.label}
          </p>
          <p
            className={`text-xs font-medium ${dark ? "text-gray-500" : "text-gray-400"}`}
          >
            {card.sub}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsPanel;
```

---

## Part 6 — The Dashboard (Final Assembly)

```jsx
// Dashboard.jsx — Assembles everything
import { useState } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import HabitTracker from "./components/HabitTracker";
import FocusTimer from "./components/FocusTimer";
import QuickNotes from "./components/QuickNotes";
import StatsPanel from "./components/StatsPanel";

function DashboardContent() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  const [habitsCompleted, setHabitsCompleted] = useState(0);
  const [habitsTotal, setHabitsTotal] = useState(0);
  const [focusSessions, setFocusSessions] = useState(0);

  function handleHabitChange(completed, total) {
    setHabitsCompleted(completed);
    setHabitsTotal(total);
  }

  function handleSessionComplete() {
    setFocusSessions((prev) => prev + 1);
  }

  const today = new Date().toLocaleDateString("en-PK", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${dark ? "bg-gray-950" : "bg-gray-50"}`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-10 px-6 py-4 border-b flex items-center justify-between ${
          dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
        }`}
      >
        <div>
          <h1
            className={`text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}
          >
            ⚡ Dashboard
          </h1>
          <p
            className={`text-xs mt-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}
          >
            {today}
          </p>
        </div>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
            dark
              ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      {/* Main Grid */}
      <main className="max-w-5xl mx-auto p-6 flex flex-col gap-6">
        {/* Stats Row — always visible at top */}
        <StatsPanel
          habitsCompleted={habitsCompleted}
          habitsTotal={habitsTotal}
          focusSessions={focusSessions}
        />

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Habit Tracker (2/3 width) */}
          <div
            className={`md:col-span-2 rounded-2xl border p-6 ${
              dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
            }`}
          >
            <HabitTracker onCompletionChange={handleHabitChange} />
          </div>

          {/* Right Column: Timer + Notes */}
          <div className="flex flex-col gap-6">
            {/* Focus Timer */}
            <div
              className={`rounded-2xl border p-6 ${
                dark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`font-bold text-base mb-4 ${dark ? "text-white" : "text-gray-800"}`}
              >
                Focus Timer
              </h2>
              <FocusTimer onSessionComplete={handleSessionComplete} />
            </div>

            {/* Quick Notes */}
            <div
              className={`rounded-2xl border p-6 flex-1 ${
                dark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <QuickNotes />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Wrap in ThemeProvider so every component can access theme
function Dashboard() {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
}

export default Dashboard;
```

---

## The Complete Hook Usage Summary

Here is exactly where and why each hook appears in the final project:

```
useState
  └── Dashboard.jsx       → habitsCompleted, habitsTotal, focusSessions state
  └── FocusTimer.jsx      → mode, timeLeft, running, sessions
  └── QuickNotes.jsx      → input text

useEffect
  └── FocusTimer.jsx      → countdown interval, document title update
  └── HabitTracker.jsx    → sync reducer state to localStorage

useRef
  └── FocusTimer.jsx      → intervalRef (stores setInterval ID without triggering re-render)

useContext
  └── HabitTracker.jsx    → reads theme via useTheme()
  └── FocusTimer.jsx      → reads theme via useTheme()
  └── QuickNotes.jsx      → reads theme via useTheme()
  └── StatsPanel.jsx      → reads theme via useTheme()

useReducer
  └── HabitTracker.jsx    → TOGGLE_TODAY, ADD_HABIT, REMOVE_HABIT actions

useMemo
  └── StatsPanel.jsx      → habitPercent, focusMinutes, productivityScore, grade

useCallback
  └── HabitTracker.jsx    → handleToggle, handleRemove (stable refs for memoised HabitRow)
  └── QuickNotes.jsx      → addNote, deleteNote

Custom Hook (useLocalStorage)
  └── context/ThemeContext.jsx → persist theme preference
  └── HabitTracker.jsx        → persist habits array
  └── QuickNotes.jsx          → persist notes array
```

---

## 🎓 Final Takeaways

**`useState`** — Every dynamic value on screen.

**`useEffect`** — Side effects: timers, fetching, subscriptions, DOM updates.
Always clean up. Always declare dependencies honestly.

**`useRef`** — Remember without re-rendering. Touch DOM elements directly.

**`useContext`** — Global data (theme, auth, language). Avoid prop drilling.

**`useReducer`** — Complex state with multiple actions. One function owns all the logic.

**`useMemo`** — Cache expensive calculations. Only recalculates when dependencies change.

**`useCallback`** — Cache functions. Pair with `React.memo` on children.

**Custom Hooks** — Extract repeated logic. Name with `use`. Compose freely.

---

## 🏋️ Exercises to Test Your Mastery

**Easy:** Add a `useEffect` to `FocusTimer` that plays a short beep sound when the session ends.

**Medium:** Extract the timer logic from `FocusTimer` into a custom hook called `useCountdown(duration)` that returns `{ timeLeft, running, start, pause, reset }`.

**Hard:** Add a "Streak" feature to `HabitTracker` using `useMemo` — calculate each habit's current streak (consecutive days completed) and display it.

**Challenge:** Create a `useHabits` custom hook that completely encapsulates `useReducer` + `useLocalStorage` + all dispatch helpers. The component should only call `const { habits, toggle, add, remove } = useHabits()`.

---

> 🎓 **Hooks are not a list to memorise — they're a vocabulary.**
> The more you build, the more naturally you'll reach for the right hook.
> Every time you think _"how do I make this component remember something?"_,
> that's `useState`. _"How do I run code when data changes?"_ — `useEffect`.
> _"How do I share this without passing props everywhere?"_ — `useContext`.
> The hooks speak to you once you know the language.
