# Lesson 01 — React basics and rendering model

Learning objectives

- Understand what React is and when to use it
- Learn how JSX maps to React elements and how to render into the DOM
- Grasp the virtual DOM and reconciliation at a conceptual level

Overview

React is a library for building user interfaces by composing small, reusable components. It focuses on a declarative programming model: you describe what the UI should look like for a given application state, and React updates the DOM to match that description.

Key concepts

- JSX is a syntax extension that looks like HTML but compiles to JavaScript calls (React.createElement). It is optional but recommended for readability.
- React elements are plain objects describing what should appear on screen. They are cheap to create.
- The virtual DOM is React's in-memory representation of the UI tree. When state changes, React diffs the virtual DOM and applies minimal updates to the real DOM — this process is called reconciliation.

Minimal examples

JSX example (recommended for readability):

```jsx
const element = <h1>Hello, React!</h1>;
ReactDOM.createRoot(document.getElementById("root")).render(element);
```

Without JSX (what JSX compiles down to):

```js
const element = React.createElement("h1", null, "Hello, React!");
ReactDOM.createRoot(document.getElementById("root")).render(element);
```

Real-world scenarios and when this matters

- Initial page render: use React to mount your app root into a page element (for example when migrating a small widget into a legacy server-rendered page).
- Small interactive widgets: React is useful even without a full app if you need dynamic UI with state and events.
- Large SPAs: React scales well when combined with routing and state organization, because components encapsulate logic and UI.

Good practices

- Use JSX for clarity and developer ergonomics.
- Keep renders pure and avoid side effects inside render code — use event handlers and effects for side effects.
- Give root elements predictable IDs (e.g., `id="root"`) and mount only once per root node.

Bad practices (anti-patterns)

- Directly mutating the DOM created by React (e.g., manually changing element.innerHTML) — this fights React's model and leads to bugs.
- Performing expensive synchronous work during render (e.g., complex calculations) — move them out of render or memoize.

Exercises

1. Create a page that renders "Hello, {your name}!" using JSX. Open `examples/lesson-01-basic.html` to see a working sample.
2. Convert that to use `React.createElement` instead of JSX and observe the difference.
3. Mount two separate React roots on the same page and try updating them independently — observe isolated state.

Interview questions & model answers

Q: What is JSX and why use it?
A: JSX is a syntax extension that allows writing HTML-like code inside JavaScript. It compiles to `React.createElement` calls. Use it because it improves readability and makes component structure obvious.

Q: What is the virtual DOM and why is it useful?
A: The virtual DOM is an in-memory tree of React elements. React diffs the previous and next virtual DOM trees to compute minimal DOM updates. This reduces expensive DOM operations and simplifies reasoning about UI changes.

Q: Can you use React without JSX?
A: Yes. JSX is optional. You can call `React.createElement` directly or write plain JavaScript that produces React elements. JSX is just syntactic sugar.

Q: When would you not use React?
A: For purely static pages or extremely small scripts where the overhead of including React outweighs benefits. Also when a simpler approach (vanilla DOM APIs) or server-side rendering without hydration suffices.

Further reading

- Official docs: https://react.dev
- JSX guide: https://react.dev/learn/jsx
- Rendering and reconciliation: https://react.dev/learn/reconciliation
