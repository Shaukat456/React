# ⚛️ React Context API — The Complete Guide

> **Who is this for?** Beginners who know basic React (props, state) and want to level up.  
> **What you'll learn:** Everything about Context API — from zero to interview-ready.

---

## 📖 Table of Contents

1. [The Problem Context Solves](#1-the-problem-context-solves)
2. [What is Context API?](#2-what-is-context-api)
3. [Core Concepts You Must Know First](#3-core-concepts-you-must-know-first)
4. [How Context API Works — Step by Step](#4-how-context-api-works--step-by-step)
5. [Real Example 1 — Theme Switcher](#5-real-example-1--theme-switcher)
6. [Real Example 2 — Auth System](#6-real-example-2--auth-system)
7. [Real Example 3 — Shopping Cart](#7-real-example-3--shopping-cart)
8. [Real Example 4 — Multi-Language (i18n)](#8-real-example-4--multi-language-i18n)
9. [useContext Hook Deep Dive](#9-usecontext-hook-deep-dive)
10. [Context + useReducer (The Power Combo)](#10-context--usereducer-the-power-combo)
11. [Performance & Re-render Problems](#11-performance--re-render-problems)
12. [Drawbacks & Flaws](#12-drawbacks--flaws)
13. [When to Use vs When NOT to Use](#13-when-to-use-vs-when-not-to-use)
14. [Context API vs Redux vs Zustand](#14-context-api-vs-redux-vs-zustand)
15. [Best Practices](#15-best-practices)
16. [Interview Questions & Answers](#16-interview-questions--answers)
17. [Quick Reference Cheatsheet](#17-quick-reference-cheatsheet)

---

## 1. The Problem Context Solves

### 😩 What is Prop Drilling?

Imagine you have this component tree:

```
App
 └── Dashboard
      └── Sidebar
           └── UserProfile
                └── Avatar  ← needs user data
```

Without Context, you'd pass `user` as a prop through **every** component even if the middle ones don't use it:

```jsx
// ❌ BAD — Prop Drilling Hell
function App() {
  const user = { name: "Ahmed", avatar: "👨‍💻" };
  return <Dashboard user={user} />;
}

function Dashboard({ user }) {
  // Dashboard doesn't even USE user — just passing it down!
  return <Sidebar user={user} />;
}

function Sidebar({ user }) {
  // Sidebar doesn't USE it either — just forwarding!
  return <UserProfile user={user} />;
}

function UserProfile({ user }) {
  // UserProfile doesn't USE it — keeps passing!
  return <Avatar user={user} />;
}

function Avatar({ user }) {
  // Finally! This is the only one that needed it.
  return <img src={user.avatar} alt={user.name} />;
}
```

**Problems with prop drilling:**

- Middle components get polluted with props they don't use
- Refactoring is a nightmare (change prop name = change 5 files)
- Code becomes hard to read and maintain
- Violates the "don't repeat yourself" principle

### ✅ Context API is the Solution

Context lets `Avatar` directly access `user` without going through `Dashboard`, `Sidebar`, and `UserProfile`.

Think of it like **WiFi** — data is broadcast in the air and any component that has the right "password" (context consumer) can pick it up directly.

---

## 2. What is Context API?

**Context API** is a built-in React feature that allows you to share data across your component tree **without** passing props manually at every level.

It was introduced in React 16.3 and significantly improved in React 16.8 with hooks (`useContext`).

### The Three Players

| Player             | Role                       | Analogy                      |
| ------------------ | -------------------------- | ---------------------------- |
| `createContext()`  | Creates the context object | Creating a TV channel        |
| `Context.Provider` | Broadcasts the value       | The TV transmitter           |
| `useContext()`     | Subscribes to the value    | Your TV receiving the signal |

---

## 3. Core Concepts You Must Know First

### 3.1 — Component Tree

React apps are a tree of components. Context works by wrapping part of (or all of) this tree with a Provider.

```
<App>                    ← Wrap this with Provider
  <Header />             ← Can consume context
  <Main>                 ← Can consume context
    <Sidebar />          ← Can consume context
    <Content />          ← Can consume context
  </Main>
  <Footer />             ← Can consume context
</App>
```

### 3.2 — React Re-renders

⚠️ **Critical concept**: When context value changes, **every component** that consumes that context **will re-render**. This is the root of most Context API performance problems.

### 3.3 — Closures in JavaScript

Context uses JavaScript closures under the hood. The Provider "closes over" the value and shares it with consumers. You don't need to deep-dive here, but knowing this helps understand why stale values can be a bug.

### 3.4 — The Render Cycle

```
State changes → Component re-renders → New value passed to Provider → All consumers re-render
```

---

## 4. How Context API Works — Step by Step

### Step 1: Create a Context

```jsx
import { createContext } from "react";

// Creates a context object with a default value
const ThemeContext = createContext("light"); // 'light' is the default
```

> 💡 The default value is only used when a component consumes context but has **no Provider above it** in the tree. In practice, you almost always use a Provider.

### Step 2: Provide the Value

```jsx
function App() {
  const [theme, setTheme] = useState("light");

  return (
    // Wrap your component tree with the Provider
    // All children can now access { theme, setTheme }
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Main />
      <Footer />
    </ThemeContext.Provider>
  );
}
```

### Step 3: Consume the Value

```jsx
import { useContext } from "react";

function Header() {
  // Grab the value from the nearest Provider above
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <header style={{ background: theme === "dark" ? "#333" : "#fff" }}>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle Theme
      </button>
    </header>
  );
}
```

### The Complete Minimal Example

```jsx
import { createContext, useContext, useState } from "react";

// 1. Create
const CountContext = createContext(0);

// 2. Provide
function App() {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      <Display />
      <Controls />
    </CountContext.Provider>
  );
}

// 3. Consume
function Display() {
  const { count } = useContext(CountContext);
  return <h1>Count: {count}</h1>;
}

function Controls() {
  const { setCount } = useContext(CountContext);
  return <button onClick={() => setCount((c) => c + 1)}>Increment</button>;
}
```

---

## 5. Real Example 1 — Theme Switcher

This is the most classic and most asked example in interviews.

```jsx
// theme-context.js
import { createContext, useContext, useState } from "react";

// ✅ Best practice: export a custom hook instead of the raw context
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Memoize the value object to prevent unnecessary re-renders
  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Custom hook — much cleaner than calling useContext everywhere
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
```

```jsx
// App.jsx
import { ThemeProvider } from "./theme-context";
import Navbar from "./Navbar";
import HomePage from "./HomePage";

export default function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <HomePage />
    </ThemeProvider>
  );
}
```

```jsx
// Navbar.jsx
import { useTheme } from "./theme-context";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const styles = {
    background: theme === "dark" ? "#1a1a1a" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#000000",
    padding: "1rem",
  };

  return (
    <nav style={styles}>
      <span>My App</span>
      <button onClick={toggleTheme}>
        {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </nav>
  );
}
```

```jsx
// HomePage.jsx
import { useTheme } from "./theme-context";

export default function HomePage() {
  const { theme } = useTheme();

  return (
    <main
      style={{
        background: theme === "dark" ? "#2d2d2d" : "#f5f5f5",
        color: theme === "dark" ? "#fff" : "#000",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <h1>Welcome! Current theme: {theme}</h1>
    </main>
  );
}
```

> 🧠 **What to notice:**
>
> - We created a **custom hook** (`useTheme`) — this is the professional pattern
> - The hook throws an error if used outside the provider — great for debugging
> - The Provider is at the top level so all components can access it

---

## 6. Real Example 2 — Auth System

Authentication is one of the most common real-world uses of Context API.

```jsx
// auth-context.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking if user is already logged in (e.g., from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // In real app: call your API here
    const fakeUser = { id: 1, email, name: "Ahmed Khan", role: "admin" };
    setUser(fakeUser);
    localStorage.setItem("user", JSON.stringify(fakeUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = Boolean(user);
  const isAdmin = user?.role === "admin";

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
```

```jsx
// ProtectedRoute.jsx — A component that uses auth context
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth-context";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
```

```jsx
// LoginPage.jsx
import { useState } from "react";
import { useAuth } from "./auth-context";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

```jsx
// Navbar.jsx — Shows user info using auth context
import { useAuth } from "./auth-context";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <span>Welcome, {user.name}!</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
}
```

---

## 7. Real Example 3 — Shopping Cart

```jsx
// cart-context.js
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

// Using useReducer for complex state logic (more on this in section 10)
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (product) => dispatch({ type: "ADD_ITEM", payload: product });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
```

```jsx
// ProductCard.jsx
import { useCart } from "./cart-context";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addItem(product)}>Add to Cart</button>
    </div>
  );
}
```

```jsx
// CartIcon.jsx — Shows cart count in navbar
import { useCart } from "./cart-context";

export default function CartIcon() {
  const { totalItems, totalPrice } = useCart();

  return (
    <div>
      🛒 {totalItems} items — ${totalPrice.toFixed(2)}
    </div>
  );
}
```

---

## 8. Real Example 4 — Multi-Language (i18n)

```jsx
// language-context.js
import { createContext, useContext, useState } from "react";

const translations = {
  en: {
    greeting: "Hello",
    logout: "Logout",
    welcome: "Welcome to our app",
    cart: "Shopping Cart",
  },
  ur: {
    greeting: "السلام علیکم",
    logout: "باہر نکلیں",
    welcome: "ہماری ایپ میں خوش آمدید",
    cart: "شاپنگ کارٹ",
  },
  ar: {
    greeting: "مرحبا",
    logout: "تسجيل الخروج",
    welcome: "مرحبا بك في تطبيقنا",
    cart: "عربة التسوق",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
```

```jsx
// LanguageSwitcher.jsx
import { useLanguage } from "./language-context";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      <option value="en">English</option>
      <option value="ur">اردو</option>
      <option value="ar">العربية</option>
    </select>
  );
}
```

```jsx
// HomePage.jsx
import { useLanguage } from "./language-context";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div>
      <h1>{t("greeting")}!</h1>
      <p>{t("welcome")}</p>
    </div>
  );
}
```

---

## 9. useContext Hook Deep Dive

### Before useContext (Old Class Component Way)

```jsx
// ❌ Old way — verbose and ugly
class OldNavbar extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <nav style={{ background: theme === "dark" ? "#000" : "#fff" }}>
            <button onClick={toggleTheme}>Toggle</button>
          </nav>
        )}
      </ThemeContext.Consumer>
    );
  }
}
```

### useContext — The Modern Way

```jsx
// ✅ New way — clean and readable
function ModernNavbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav style={{ background: theme === "dark" ? "#000" : "#fff" }}>
      <button onClick={toggleTheme}>Toggle</button>
    </nav>
  );
}
```

### How useContext Triggers Re-renders

```jsx
// Understanding re-render behavior

const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState({ name: "Ahmed", score: 0 });

  return (
    <UserContext.Provider value={user}>
      <NameDisplay /> {/* Re-renders when ANY user field changes */}
      <ScoreDisplay /> {/* Re-renders when ANY user field changes */}
      <button
        onClick={() => setUser((prev) => ({ ...prev, score: prev.score + 1 }))}
      >
        +1 Score
      </button>
    </UserContext.Provider>
  );
}

function NameDisplay() {
  const user = useContext(UserContext);
  console.log("NameDisplay rendered"); // This logs even when only score changes!
  return <div>{user.name}</div>;
}
```

> ⚠️ This is the key performance problem — even `NameDisplay` re-renders when only `score` changes because the entire `user` object is the context value.

### Multiple Contexts — Composing Providers

```jsx
// You can have multiple contexts! Compose them like this:
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <CartProvider>
            <Router>
              <AppRoutes />
            </Router>
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
```

> 💡 **Tip:** Create a single `AppProviders` component to avoid the "pyramid of doom":

```jsx
// providers.jsx
function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <CartProvider>{children}</CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

// App.jsx — much cleaner!
function App() {
  return (
    <AppProviders>
      <Router>
        <AppRoutes />
      </Router>
    </AppProviders>
  );
}
```

---

## 10. Context + useReducer (The Power Combo)

For complex state with multiple actions, combine Context with `useReducer`. This is essentially a lightweight version of Redux.

```jsx
// store.jsx — Complete mini-Redux using Context + useReducer
import { createContext, useContext, useReducer } from "react";

// --- State shape ---
const initialState = {
  user: null,
  notifications: [],
  settings: {
    theme: "light",
    language: "en",
    notifications: true,
  },
};

// --- Actions (constants to avoid typos) ---
export const ACTIONS = {
  SET_USER: "SET_USER",
  LOGOUT: "LOGOUT",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  DISMISS_NOTIFICATION: "DISMISS_NOTIFICATION",
  UPDATE_SETTINGS: "UPDATE_SETTINGS",
};

// --- Reducer (pure function — no side effects!) ---
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };

    case ACTIONS.LOGOUT:
      return { ...state, user: null };

    case ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { id: Date.now(), ...action.payload },
        ],
      };

    case ACTIONS.DISMISS_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload,
        ),
      };

    case ACTIONS.UPDATE_SETTINGS:
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

// --- Context ---
const StoreContext = createContext(null);

// --- Provider ---
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators — cleaner than raw dispatch
  const actions = {
    setUser: (user) => dispatch({ type: ACTIONS.SET_USER, payload: user }),
    logout: () => dispatch({ type: ACTIONS.LOGOUT }),
    addNotification: (notification) =>
      dispatch({ type: ACTIONS.ADD_NOTIFICATION, payload: notification }),
    dismissNotification: (id) =>
      dispatch({ type: ACTIONS.DISMISS_NOTIFICATION, payload: id }),
    updateSettings: (settings) =>
      dispatch({ type: ACTIONS.UPDATE_SETTINGS, payload: settings }),
  };

  return (
    <StoreContext.Provider value={{ state, ...actions }}>
      {children}
    </StoreContext.Provider>
  );
}

// --- Custom hook ---
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
```

```jsx
// Usage in any component
function ProfilePage() {
  const { state, logout, addNotification } = useStore();

  const handleLogout = () => {
    logout();
    addNotification({ type: "success", message: "Logged out successfully!" });
  };

  return (
    <div>
      <h1>Hello, {state.user?.name}</h1>
      <p>Theme: {state.settings.theme}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

### Context vs Redux Comparison

```
Context + useReducer            Redux Toolkit
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Built into React             ✅ Battle-tested at scale
✅ No extra dependencies        ✅ DevTools for time-travel debugging
✅ Simple setup                 ✅ Middleware (thunks, sagas)
❌ No DevTools                  ✅ Better performance with selectors
❌ Re-render issues             ✅ Memoized selectors (reselect)
❌ No middleware                ❌ More boilerplate (setup)
❌ Not ideal for large apps     ❌ Extra dependency
```

---

## 11. Performance & Re-render Problems

### The Problem

```jsx
// ⚠️ PERFORMANCE PROBLEM
function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Ahmed");

  // ❌ New object created on EVERY render!
  const value = { count, name, setCount, setName };

  return (
    <MyContext.Provider value={value}>
      <ComponentA />
      <ComponentB />
    </MyContext.Provider>
  );
}
// ComponentA and ComponentB BOTH re-render when count changes,
// even if ComponentA only uses 'name'!
```

### Fix 1: Split Contexts

```jsx
// ✅ Separate contexts for unrelated state
const CountContext = createContext(null);
const UserContext = createContext(null);

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Ahmed");

  return (
    <UserContext.Provider value={{ name, setName }}>
      <CountContext.Provider value={{ count, setCount }}>
        <ComponentA /> {/* Only re-renders when UserContext changes */}
        <ComponentB /> {/* Only re-renders when CountContext changes */}
      </CountContext.Provider>
    </UserContext.Provider>
  );
}

function ComponentA() {
  const { name } = useContext(UserContext); // Only subscribed to UserContext
  return <div>{name}</div>;
}

function ComponentB() {
  const { count } = useContext(CountContext); // Only subscribed to CountContext
  return <div>{count}</div>;
}
```

### Fix 2: useMemo for the Value Object

```jsx
// ✅ Memoize the value to prevent unnecessary re-renders
function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Ahmed");

  const value = useMemo(
    () => ({ count, name, setCount, setName }),
    [count, name], // Only creates new object when count or name changes
  );

  return (
    <MyContext.Provider value={value}>
      <Children />
    </MyContext.Provider>
  );
}
```

### Fix 3: Separate State from Actions

```jsx
// ✅ Best pattern: separate data from setters
// Setters (dispatch functions) never change, so components that
// only use setters won't re-render when data changes!

const CountValueContext = createContext(null); // Changes often
const CountActionsContext = createContext(null); // Never changes

function CountProvider({ children }) {
  const [count, setCount] = useState(0);

  // Actions object is stable — created once
  const actions = useMemo(
    () => ({
      increment: () => setCount((c) => c + 1),
      decrement: () => setCount((c) => c - 1),
      reset: () => setCount(0),
    }),
    [],
  ); // Empty deps = created once!

  return (
    <CountActionsContext.Provider value={actions}>
      <CountValueContext.Provider value={count}>
        {children}
      </CountValueContext.Provider>
    </CountActionsContext.Provider>
  );
}

// This component re-renders when count changes ✅
function CountDisplay() {
  const count = useContext(CountValueContext);
  return <h1>{count}</h1>;
}

// This component NEVER re-renders due to count changes ✅
function CountButtons() {
  const { increment, decrement, reset } = useContext(CountActionsContext);
  return (
    <>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>+</button>
    </>
  );
}
```

### Fix 4: React.memo to Prevent Child Re-renders

```jsx
// ✅ Memoize components that don't use context
const ExpensiveComponent = React.memo(function ExpensiveComponent({ name }) {
  // This won't re-render just because context changed
  console.log("ExpensiveComponent rendered");
  return <div>{name}</div>;
});
```

---

## 12. Drawbacks & Flaws

Understanding the cons is just as important as knowing the pros — especially for interviews!

### ❌ 1. No Built-in Selector/Subscription System

```jsx
// In Redux, you can select ONLY what you need:
const name = useSelector((state) => state.user.name); // Only re-renders if name changes

// In Context, you get everything:
const { user } = useContext(UserContext); // Re-renders if ANYTHING in user changes
const name = user.name; // Still re-renders even if only user.score changed
```

**Impact:** Large contexts can cause many unnecessary re-renders across your app.

### ❌ 2. No DevTools / Debugging Support

Redux has amazing DevTools that let you:

- See every action that was dispatched
- Time-travel through state changes
- Replay actions

Context has **none of this**. Debugging context-related bugs is much harder.

### ❌ 3. Provider Pyramid (Callback Hell for Context)

```jsx
// Gets ugly fast with many contexts:
<AuthProvider>
  <ThemeProvider>
    <LanguageProvider>
      <CartProvider>
        <NotificationProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </NotificationProvider>
      </CartProvider>
    </LanguageProvider>
  </ThemeProvider>
</AuthProvider>
```

### ❌ 4. Not Designed for High-Frequency Updates

```jsx
// DON'T use Context for this — use useState/useRef locally instead
function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // ❌ BAD: Putting this in Context would re-render your entire app
  // hundreds of times per second as the mouse moves!
  useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div>
      Mouse: {position.x}, {position.y}
    </div>
  );
}
```

### ❌ 5. No Middleware Support

Redux supports middleware like:

- `redux-thunk` (async actions)
- `redux-saga` (complex async flows)
- `redux-logger` (log every action)

Context has none of this built-in. You'd have to implement it yourself.

### ❌ 6. Context is Not Reactive to External State

If your context value comes from an external source (WebSocket, real-time DB), you need to wire up the updates yourself. Redux libraries like RTK Query handle this elegantly.

### ❌ 7. Testing Can Be Tricky

```jsx
// You must wrap components in the Provider during testing:
test("shows user name", () => {
  render(
    <AuthProvider>
      {" "}
      {/* Must add this wrapper */}
      <UserProfile />
    </AuthProvider>,
  );
  expect(screen.getByText("Ahmed")).toBeInTheDocument();
});
```

---

## 13. When to Use vs When NOT to Use

### ✅ USE Context API for:

| Use Case                | Example                    |
| ----------------------- | -------------------------- |
| **Theme/Dark Mode**     | Global style preference    |
| **Authentication**      | Current user, login/logout |
| **Language/i18n**       | App language preference    |
| **Feature Flags**       | Enable/disable features    |
| **User Preferences**    | Settings, accessibility    |
| **Notification System** | Toast messages             |
| **Modal/Dialog State**  | Open/close modals          |
| **Small-Medium Apps**   | < 10,000 LOC               |

### ❌ DON'T USE Context API for:

| Situation                  | Why Not                        | Use Instead                   |
| -------------------------- | ------------------------------ | ----------------------------- |
| **High-frequency updates** | Too many re-renders            | `useState`, `useRef`, Zustand |
| **Large complex state**    | Hard to manage                 | Redux Toolkit                 |
| **Derived/computed state** | No selectors                   | Reselect, Zustand             |
| **Server state**           | Context can't cache            | React Query, SWR              |
| **Real-time data**         | Constant re-renders            | Zustand, Jotai                |
| **Large teams**            | Hard to debug without DevTools | Redux Toolkit                 |

### The Decision Tree

```
Do you need to share state across components?
├── No → Use local useState
└── Yes → Is it shared across many levels?
    ├── No → Prop drilling (it's OK for 2-3 levels!)
    └── Yes → Is the data updated frequently?
        ├── Rarely (theme, auth) → Context API ✅
        ├── Often → Is the app small/medium?
        │   ├── Yes → Context + useMemo ✅
        │   └── No → Zustand or Redux Toolkit
        └── Very often (mouse, scroll) → useRef or external library
```

---

## 14. Context API vs Redux vs Zustand

```jsx
// --- CONTEXT API ---
// Setup: ~10 lines
// Learning curve: Low
// Bundle size: 0kb (built-in)

const ThemeContext = createContext(null);
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
// Usage:
const { theme } = useContext(ThemeContext);
```

```jsx
// --- ZUSTAND ---
// Setup: ~5 lines
// Learning curve: Very Low
// Bundle size: ~3kb

import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));

// Usage (no Provider needed!):
const { theme, toggleTheme } = useThemeStore();
// Only re-renders if 'theme' changes — automatic optimization!
```

```jsx
// --- REDUX TOOLKIT ---
// Setup: ~30 lines
// Learning curve: Medium-High
// Bundle size: ~15kb

import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

const themeSlice = createSlice({
  name: "theme",
  initialState: { value: "light" },
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
    },
  },
});

// Usage:
const theme = useSelector((state) => state.theme.value); // Granular subscription!
const dispatch = useDispatch();
dispatch(themeSlice.actions.toggleTheme());
```

### Summary Comparison Table

| Feature         | Context API       | Zustand     | Redux Toolkit     |
| --------------- | ----------------- | ----------- | ----------------- |
| Bundle size     | 0kb               | ~3kb        | ~15kb             |
| Learning curve  | Low               | Very Low    | Medium            |
| DevTools        | ❌                | ✅          | ✅ (best)         |
| Performance     | Manual            | Auto        | Auto (selectors)  |
| Async actions   | Manual            | Built-in    | Built-in (thunks) |
| Best for        | Small-medium apps | Medium apps | Large/enterprise  |
| Provider needed | ✅                | ❌          | ✅                |
| Middleware      | ❌                | ✅          | ✅                |

---

## 15. Best Practices

### ✅ 1. Always Create a Custom Hook

```jsx
// ❌ BAD — consumers need to import both context and useContext
import { useContext } from "react";
import { ThemeContext } from "./theme-context";
const { theme } = useContext(ThemeContext);

// ✅ GOOD — single import, better DX
import { useTheme } from "./theme-context";
const { theme } = useTheme();
```

### ✅ 2. Validate Context in Your Custom Hook

```jsx
export function useTheme() {
  const context = useContext(ThemeContext);
  // This gives a clear error instead of a confusing "cannot read property of undefined"
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
```

### ✅ 3. Keep Contexts Focused (Single Responsibility)

```jsx
// ❌ BAD — one god context that does everything
const AppContext = createContext({
  user,
  theme,
  cart,
  language,
  notifications,
});

// ✅ GOOD — separate concerns
const AuthContext = createContext(null); // Auth only
const ThemeContext = createContext(null); // Theme only
const CartContext = createContext(null); // Cart only
```

### ✅ 4. Co-locate Context with Its Consumers

```
src/
├── features/
│   ├── auth/
│   │   ├── AuthContext.jsx     ← Context lives WITH the feature
│   │   ├── LoginPage.jsx
│   │   └── ProtectedRoute.jsx
│   ├── theme/
│   │   ├── ThemeContext.jsx
│   │   └── ThemeToggle.jsx
│   └── cart/
│       ├── CartContext.jsx
│       └── CartPage.jsx
```

### ✅ 5. Initialize with null, Not Empty Object

```jsx
// ❌ BAD — empty object causes silent failures
const ThemeContext = createContext({});

// ✅ GOOD — null forces you to always have a Provider
const ThemeContext = createContext(null);
// Your custom hook will catch the error properly
```

### ✅ 6. Use TypeScript for Better DX

```tsx
// theme-context.tsx
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context; // TypeScript knows this is ThemeContextType now
}
```

---

## 16. Interview Questions & Answers

### 🟢 Beginner Level

---

**Q1: What is the Context API in React?**

**A:** Context API is a built-in React feature for sharing data across components without manually passing props through every level of the component tree. It's useful for "global" data like themes, authenticated users, or language preferences.

---

**Q2: What problem does Context API solve?**

**A:** It solves **prop drilling** — the pattern where you pass props through multiple intermediate components that don't actually need the data, just to get it to a deeply nested component that does.

---

**Q3: What are the three main parts of Context API?**

**A:**

1. `createContext()` — Creates the context object
2. `Context.Provider` — Wraps the component tree and provides the value
3. `useContext(Context)` — Consumes the value in any child component

---

**Q4: What is the default value in createContext(defaultValue)?**

**A:** The default value is used only when a component calls `useContext` but there's no matching `Provider` above it in the tree. In most real applications, you always have a Provider, so the default value is rarely used. It's mainly useful for testing components in isolation.

---

**Q5: What happens when context value changes?**

**A:** All components that consume that context (via `useContext`) will **re-render**, regardless of whether the specific piece of data they use changed. This is a key performance consideration.

---

### 🟡 Intermediate Level

---

**Q6: What is the difference between useContext and the old Context.Consumer pattern?**

**A:**

```jsx
// Old way (Class components era) — verbose render prop pattern
<ThemeContext.Consumer>
  {(theme) => <div style={{ color: theme.primary }}>Hello</div>}
</ThemeContext.Consumer>;

// New way — clean and readable
const theme = useContext(ThemeContext);
```

`useContext` is simpler, more readable, and works only in functional components. It subscribes the component to context changes automatically.

---

**Q7: How would you prevent unnecessary re-renders with Context API?**

**A:** Several strategies:

1. **Split contexts** — Separate frequently-changing state from rarely-changing state
2. **useMemo on the value** — Prevent new object references from triggering re-renders
3. **Separate state from actions** — Actions (dispatch functions) never change, so consumers of only actions won't re-render
4. **React.memo** — Memoize components that receive context data as props

---

**Q8: How do you combine useContext with useReducer?**

**A:** This pattern is often called "poor man's Redux." You use `useReducer` to manage complex state and dispatch function, and `Context.Provider` to share them across the tree. The reducer handles all state transitions through typed actions, making the logic predictable and testable.

---

**Q9: Can you have multiple contexts in a React app?**

**A:** Yes, absolutely. It's actually a best practice to have multiple focused contexts (one for auth, one for theme, etc.) rather than a single large "God context." Multiple providers are nested in the component tree.

---

**Q10: What is a custom hook for Context, and why should you use it?**

**A:** A custom hook wraps `useContext` with the specific context and adds a null check:

```jsx
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
```

Benefits: better error messages, single import for consumers, easier to refactor, and you can add logic/transformations inside the hook.

---

### 🔴 Advanced Level

---

**Q11: What are the main drawbacks of Context API compared to Redux?**

**A:**

- **No selectors**: Context has no way to subscribe to only part of the state, so any change triggers all consumers to re-render
- **No DevTools**: Redux has time-travel debugging, action logging; Context has nothing
- **No middleware**: Can't intercept actions for logging, async handling, etc.
- **No memoized derived state**: Redux has Reselect for computing derived state efficiently
- **Manual performance optimization**: You must manually split contexts and memoize values

---

**Q12: When would you choose Context API over Zustand or Redux?**

**A:** Context API is the right choice when:

- Your app is small to medium-sized
- The data changes infrequently (theme, user auth, language)
- You want zero dependencies
- You don't need DevTools or middleware
- The team is already familiar with React but not Redux

For anything with complex state interactions, frequent updates, or large teams, Zustand or Redux Toolkit are better choices.

---

**Q13: Can Context API cause memory leaks? How?**

**A:** Yes, indirectly. If a Provider holds subscriptions (WebSocket connections, event listeners) in its value or state, and those are not cleaned up in `useEffect` cleanup functions, it can cause memory leaks. Also, if context causes unnecessary re-renders that create closures holding large objects, garbage collection can be delayed.

---

**Q14: How does React determine when to re-render context consumers?**

**A:** React uses **Object.is()** comparison on the context value. If `Object.is(oldValue, newValue)` returns `false`, all consumers re-render. This is why passing a new object literal `value={{ theme, setTheme }}` on every render always triggers re-renders — because `{} !== {}` in JavaScript. Use `useMemo` to preserve the reference.

---

**Q15: Is Context API suitable for server-side rendering (SSR)?**

**A:** Yes, Context works with SSR frameworks like Next.js. However, you need to be careful:

- The Provider must wrap the component tree on both server and client
- You may need to serialize and hydrate context state carefully
- Auth context often needs special handling to avoid hydration mismatches between server-rendered HTML (unauthenticated) and client-rehydrated state (authenticated)

---

## 17. Quick Reference Cheatsheet

```jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPLETE CONTEXT API PATTERN IN ONE FILE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { createContext, useContext, useState, useMemo } from "react";

// 1. CREATE — always initialize with null
const MyContext = createContext(null);

// 2. PROVIDER — manages state and provides value
export function MyProvider({ children }) {
  const [value, setValue] = useState(initialValue);

  // 3. MEMOIZE — prevents unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      value,
      setValue,
      // Add computed values, action creators, etc.
    }),
    [value],
  );

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
}

// 4. CUSTOM HOOK — always do this instead of exposing raw context
export function useMyContext() {
  const context = useContext(MyContext);
  // 5. GUARD — throws clear error if used outside Provider
  if (context === null) {
    throw new Error("useMyContext must be used within MyProvider");
  }
  return context;
}

// 6. USAGE — clean one-liner import
function MyComponent() {
  const { value, setValue } = useMyContext();
  return <div onClick={() => setValue("new")}>{value}</div>;
}
```

---

### Key Rules to Remember

```
📌 createContext(null)           — Always default to null
📌 useMemo on value object       — Prevent reference changes
📌 Custom hook always            — Never expose raw context
📌 Null check in hook            — Clear error messages
📌 Split contexts                — One concern per context
📌 Provider at top level         — Wrap in index.js/App.jsx
📌 Not for high-frequency data   — Use useState locally
📌 Not a Redux replacement       — Different tools, different jobs
```

---

### When You See These, Think Context API

| Scenario                                    | Context Solution      |
| ------------------------------------------- | --------------------- |
| "Dark mode toggle across whole app"         | `ThemeContext`        |
| "User is logged in/out"                     | `AuthContext`         |
| "Change app language"                       | `LanguageContext`     |
| "Add to cart from product page, see in nav" | `CartContext`         |
| "Show toast notification from anywhere"     | `NotificationContext` |
| "Feature flag for new UI"                   | `FeatureFlagContext`  |

---

> **Final Thought 💡**
>
> Context API is not a state management library — it's a **data distribution mechanism**. It's excellent at sharing data. For complex state _management_ (actions, derived state, time-travel debugging), pair it with `useReducer`, or graduate to Zustand/Redux when your app demands it.
>
> The best engineers know not just _how_ to use a tool, but _when_ and _when not_ to use it.

---

_Made with ❤️ for React students everywhere._
_React version: 18+ | Hooks: useContext, useReducer, useMemo, useState_
