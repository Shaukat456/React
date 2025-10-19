# Lesson 07 — Routing, code-splitting, and lazy loading

Learning objectives

- Set up client-side routing using `react-router`
- Implement lazy-loaded routes with `React.lazy` and `Suspense`
- Understand code-splitting importance for performance

Routing basics (react-router v6+)

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Code-splitting and lazy loading

- Large bundles slow initial load. Code-splitting splits code into chunks loaded on demand.
- `React.lazy` + `Suspense` allows declarative dynamic imports for components.

```jsx
const About = React.lazy(() => import("./About"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
```

Real-world scenarios

- Multi-page apps benefit from route-level code-splitting so users download only what's necessary.
- Use preload strategies for critical routes (e.g., hover-based prefetching).

Good practices

- Keep routing configuration centralized for medium/large apps.
- Use nested routes for layouts and common UI wrappers.
- Add error boundaries around lazy components to catch load failures.

Bad practices

- Over-splitting into too many tiny chunks — adds network overhead.
- Not handling fallback UI for loading/error states, which creates janky experiences.

Exercises

1. Create a small app with Home, Users, and Settings routes. Lazy-load the Users route.
2. Implement a simple preload on hover for the Users route (prefetch the chunk).

Interview Q&A

Q: What is code-splitting and why is it useful?
A: Code-splitting breaks application code into bundles that can be loaded on demand. It reduces initial load time and improves perceived performance.

Q: How does React.lazy work?
A: `React.lazy` takes a function that returns a dynamic import promise and returns a component that will load that module when first rendered. Must be used inside `Suspense` to provide a fallback UI.
