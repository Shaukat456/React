# Lesson 08 — Context, refs, and performance tuning

Learning objectives

- Use React Context for shared data (theme, auth)
- Use refs for DOM access and mutable values
- Apply memoization and profiling to optimize performance

Context basics

```jsx
const ThemeContext = React.createContext("light");

function Toolbar() {
  const theme = React.useContext(ThemeContext);
  return <div className={theme}>Toolbar</div>;
}
```

When to use Context

- Use for data that many components need (theme, locale, auth). Avoid using for frequently changing high-volume state (e.g., every keystroke) because it triggers re-renders of consumers.

Refs (useRef)

- `useRef` holds mutable values that survive across renders and can reference DOM nodes.

```jsx
function FocusInput() {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current.focus();
  }, []);
  return <input ref={ref} />;
}
```

Performance tuning

- Profile with React DevTools Profiler to find costly renders.
- Use `React.memo` and stable props to avoid unnecessary child renders.
- Use `useMemo` for expensive calculations and `useCallback` for stable callbacks.

Common pitfalls

- Putting frequently-updated values in Context causing many re-renders — prefer local state or selector patterns.
- Overusing refs to store stateful data — refs won't trigger re-renders.

Real-world scenarios

- Theme provider: context is ideal as consumers only re-render when theme changes.
- Auth token: use context to provide user info; wrap with a provider that fetches and refreshes tokens.

Exercises

1. Build a ThemeProvider using Context and allow consumers to toggle theme.
2. Use Profiler and optimize a component tree with `React.memo` and `useCallback`.

Interview Q&A

Q: When should you use Context vs props?
A: Use Context when many nested components need the same data and passing props through every level becomes cumbersome. Use props for local parent-to-child communication.

Q: What is a ref and when do you use it?
A: A ref is a mutable container that persists across renders. Use refs to access DOM nodes or store mutable values that don't affect rendering.
