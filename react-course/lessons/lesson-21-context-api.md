````markdown
# Lesson 21 — Context API: when, how and patterns

Estimated time: 2 hours (read + hands-on)

Purpose: Teach React's Context API: `createContext`, `Provider`, `useContext` and advanced patterns for composition and performance.

---

## Why Context?

- Props drilling gets painful when many nested components need the same data (theme, auth, locale). Context provides a way to pass data through the component tree without manually threading props.
- Context is not a replacement for state managers — it's ideal for global-ish concerns: theming, current user, localization, feature flags.

---

## Basic API

```js
import React, { createContext, useContext } from "react";

const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>I am themed</button>;
}
```
````

Notes:

- `createContext(default)` creates a Context object.
- `Provider` wraps parts of tree and supplies `value`.
- `useContext(Context)` reads the nearest provider value.

---

## Common uses & examples

1. Theme (light/dark)
2. Auth (currentUser, permissions)
3. Locale / i18n
4. Feature flags and A/B testing

Example: Auth context with login API

```js
// auth-context.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (creds) => {
    const u = await api.login(creds);
    setUser(u);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

Usage:

```js
function Profile() {
  const { user, logout } = useAuth();
  if (!user) return <div>Please log in</div>;
  return (
    <div>
      Hello, {user.name} <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## Advanced patterns & performance

- Provider value identity: passing objects inline can cause re-renders because the object identity changes each render. Memoize provider values with `useMemo` or split concerns into separate contexts.

```js
const value = useMemo(() => ({ user, login, logout }), [user]);
<AuthContext.Provider value={value}>...</AuthContext.Provider>;
```

- Context selectors: avoid re-renders by reading only the bits you need; either create multiple small contexts or expose selector helpers inside the provider.

- Split contexts: theme/context vs user/context — separate frequently-changing state from static config.

- Read-only vs read-write: prefer exposing methods (login/logout) rather than letting all components write arbitrary state.

---

## Testing components using context

- Wrap components with the provider in tests; provide test-specific values.

Example using Testing Library:

```js
render(
  <AuthContext.Provider value={{ user: { name: "Test" }, logout: jest.fn() }}>
    <Profile />
  </AuthContext.Provider>
);
```

Or use the `AuthProvider` with a mock API and render the tree.

---

## Pitfalls & when not to use Context

- Avoid using context for high-frequency updates (e.g., animation frame values) — it can cause expensive re-renders.
- Don't overuse: if you find yourself creating many contexts for similar purposes, consider a small state manager or an optimized pattern.
- Beware SSR: ensure provider values are serializable if you read them on the server.

---

## Exercises

1. Implement a `ThemeContext` and a `ThemeToggle` component; persist choice in `localStorage`.
2. Create `AuthContext` from the example and write tests for `Profile` rendering when user is present/absent.
3. Refactor a component tree that passes `theme` and `user` via props into using two contexts and measure re-renders.

---

## Interview Q&A

Q: How can you avoid unnecessary re-renders with Context?

A: Keep provider values stable (useMemo), split contexts by concern, and avoid passing new object/array literals inline.

Q: Can you use context for global state instead of Redux?

A: Yes for small to medium apps and limited global concerns. For complex state (time-travel, complex reducers, developer tooling), a dedicated state manager may be appropriate.

---

Would you like me to:

- Add a `ThemeContext` demo component to the `vite-starter` app, or
- Move on to `lesson-22-performance.md` next?

```

```
