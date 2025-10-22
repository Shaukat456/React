# Lesson 11 — React lifecycle methods (detailed)

Learning objectives

- Understand the classical class-component lifecycle (mount, update, unmount)
- Map class lifecycle methods to modern Hooks equivalents
- Learn practical patterns for subscriptions, timers, data fetching, and cleanup
- Identify common pitfalls and memory-leak sources and how to avoid them
- Review interview-style questions and model answers

Why lifecycle matters

Lifecycle methods let components perform work at well-defined moments: when they appear, when they update, and before they're removed. This controls side effects (DOM reads/writes, subscriptions, timers, network calls) and ensures resources are cleaned up.

1. Class component lifecycle overview

Mounting phase

- constructor(props)
  - Set up initial state and bind instance methods. Minimal work only — avoid side effects (no network calls).
- static getDerivedStateFromProps(props, state)
  - Rarely needed: used to update state derived from props before render. It's static (no `this`) and must be pure.
- render()
  - Return the React element tree. Must be pure (no side effects).
- componentDidMount()
  - Runs once after the component is inserted into the DOM. Safe to start timers, fetch data, or set up subscriptions.

Updating phase

- static getDerivedStateFromProps(props, state)
  - Called on update as well; used to derive state from props.
- shouldComponentUpdate(nextProps, nextState)
  - Return false to skip rendering and subsequent lifecycle methods for this update. Useful for performance optimizations in class components.
- render()
  - Re-render UI based on new props/state.
- getSnapshotBeforeUpdate(prevProps, prevState)
  - Runs after render but before DOM updates are committed. Return a snapshot value (e.g., scroll position) to be used in componentDidUpdate.
- componentDidUpdate(prevProps, prevState, snapshot)
  - Runs after DOM updates. Good for DOM measurements, non-blocking side-effects, or network calls triggered by prop/state changes.

Unmounting phase

- componentWillUnmount()
  - Use to clean up timers, cancel network requests, remove event listeners, and cancel subscriptions.

* Note: legacy lifecycle methods like componentWillMount, componentWillReceiveProps, and componentWillUpdate are UNSAFE in modern React and should not be used.

2. Hooks equivalents and modern patterns

With function components and Hooks, lifecycle concerns are expressed with `useEffect`, `useLayoutEffect`, `useRef`, and other hooks.

Mount — `componentDidMount` equivalent

- `useEffect(() => { /* mount work */ }, []);` runs after the first render and after the DOM is painted.
- For work that must happen synchronously after DOM mutations (e.g., measure DOM and synchronously mutate), use `useLayoutEffect(() => { ... }, [])` — it runs after DOM changes but before paint.

Update — `componentDidUpdate` equivalent

- `useEffect` with dependencies: `useEffect(() => { /* runs on mount and when deps change */ }, [dep1, dep2]);`
- If you need previous props/state, store them in refs or use effect cleanup patterns.

Unmount — `componentWillUnmount` equivalent

- Return a cleanup function from `useEffect`: `useEffect(() => { const id = setInterval(...); return () => clearInterval(id); }, []);`

getSnapshotBeforeUpdate — measuring before paint

- `useLayoutEffect` can usually replace `getSnapshotBeforeUpdate` by measuring the DOM just after render but before the browser paints; store measurements in refs and read them in subsequent effects if needed.

3. Practical examples (class + hooks)

Example: subscription (WebSocket or event emitter)

Class version:

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

Hook version:

```jsx
function Clock() {
  const [time, setTime] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return <div>Time: {new Date(time).toLocaleTimeString()}</div>;
}
```

Example: measuring scroll position (getSnapshotBeforeUpdate / useLayoutEffect)

- Use `useLayoutEffect` to read layout immediately after DOM updates and before paint.

```jsx
function ScrollList({ items }) {
  const listRef = React.useRef();
  const prevHeightRef = React.useRef(0);

  React.useLayoutEffect(() => {
    // measure before paint or to avoid flicker
    const el = listRef.current;
    const height = el.scrollHeight;
    // do something with the measured height or restore scroll position
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

4. Significance & common patterns

- Subscriptions: start in mount and clean in unmount to avoid memory leaks.
- Data fetching: start in mount (or in update when dependencies change); cancel inflight requests on cleanup.
- DOM reads/writes: use `useLayoutEffect` when you need to avoid visual glitches caused by measuring after paint.
- Performance: `shouldComponentUpdate` (class) or `React.memo` + stable props (function) to avoid unnecessary renders.

5. Flaws and caveats

- componentDidMount and componentDidUpdate timing: effects run after paint; don't block the render with heavy synchronous work inside these methods.
- Memory leaks: forgetting `componentWillUnmount` / effect cleanup causes timers, subscriptions, or promises to keep references alive.
- setState in unmounted components: if you attempt to setState after unmount, avoid it by canceling async operations in cleanup or checking mounted refs.
- getDerivedStateFromProps complexity: using it often indicates an anti-pattern; prefer controlled/uncontrolled patterns or computed render values.

6. Advanced topics to include

- Error boundaries (componentDidCatch, static getDerivedStateFromError): class-only API — functions cannot be error boundaries yet. Use class components around trees that need error boundaries.
- Portals: mounting UI outside parent DOM tree (useful for modals). Lifecycle still applies inside portal children.
- Suspense for data fetching: not a lifecycle method per se, but interacts with component rendering lifecycle and fallback UI.
- StrictMode and double-invocation of certain methods in dev mode (note on effects double-run in dev to detect side-effects). This affects mount/unmount patterns and resource management.

7. Interview Q&A (lifecycle)

Q: What's the difference between componentDidMount and useEffect(..., [])?
A: They are conceptually similar: both run after the component mounts. In function components `useEffect(..., [])` is the equivalent. However, `useLayoutEffect` runs earlier (after DOM mutations but before paint) and can replace use cases where synchronous DOM reads/writes are required.

Q: Why use getSnapshotBeforeUpdate and where does its value go?
A: `getSnapshotBeforeUpdate` runs after render but before the DOM is updated; you return a snapshot value (e.g., scroll position) which is passed as the third argument to `componentDidUpdate` so you can reconcile with the newly-painted DOM.

Q: Why shouldn't we do data fetching in constructor or render?
A: Constructor and render must be pure and synchronous. Data fetching is a side effect and belongs in `componentDidMount` or `useEffect`, not in render or constructor.

Q: How to avoid memory leaks with timers and subscriptions?
A: Always clean up in `componentWillUnmount` (class) or return a cleanup function from `useEffect` (hooks). Cancel network requests when possible.

Q: What are error boundaries and how do you implement them?
A: Error boundaries catch render-time errors in the tree below them. Implement in a class component by defining `componentDidCatch(error, info)` and optionally `static getDerivedStateFromError` to show a fallback UI.

8. Exercises

1) Convert a small class component with timers and subscriptions into a function component using hooks and ensure cleanup works.
2) Implement a component that keeps scroll position when new items are prepended to a list (use getSnapshotBeforeUpdate or useLayoutEffect to manage this).
3) Create an error boundary as a class component and demonstrate catching an exception from a child component.

9. Notes on StrictMode (dev-only behavior)

- React StrictMode intentionally mounts, unmounts, and remounts components in development for some checks (not production). This can cause effects to run twice — design effects to be idempotent and rely on cleanup to avoid resource leaks.

10. Wrap-up

Lifecycle knowledge helps you place side effects correctly, write robust cleanup logic, and reason about when to use `useEffect` vs `useLayoutEffect`, when to prefer class lifecycle methods, and how to structure resource management for production-safe apps.

Interview Q&A (summary)

- When should you use useLayoutEffect vs useEffect? — useLayoutEffect for measurements/ DOM mutations that must occur before paint to avoid flicker; useEffect for non-blocking side effects.
- What is an error boundary? — a class component that implements `componentDidCatch` and optionally `getDerivedStateFromError` to show fallback UI and prevent the whole app from crashing.
- What are common sources of memory leaks? — forgotten cleanup for intervals, event listeners, subscriptions, and unresolved promises that call setState after unmount.

If you'd like, I can:

- Add runnable example HTML files (CDN + Babel) for:
  - Timer + cleanup
  - Scroll preservation using getSnapshotBeforeUpdate / useLayoutEffect
  - Error boundary demo
- Convert one of these into a small Vite project with tests.

