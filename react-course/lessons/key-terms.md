```markdown
# React key terms — glossary, analogies, and examples

This quick glossary lists common React terms you will see when learning or working with React. For each term you'll find a concise definition, a simple analogy, and a tiny real-world example to make the idea stick.

---

## Component

- Definition: A reusable, self-contained piece of UI (a function or class) that returns elements to render.
- Analogy: A LEGO brick — build small bricks (components) and snap them together to build larger structures (pages).
- Example: A `Button` component that accepts `label` and `onClick` props and renders a styled button.

## JSX

- Definition: A syntax extension that looks like HTML but compiles to JavaScript function calls (React.createElement).
- Analogy: A recipe card that mixes HTML-like layout with JavaScript ingredients — easier to read than raw instructions.
- Example: `<div className="card">Hello {name}</div>` compiles to a React element tree.

## Props

- Definition: Read-only inputs passed into components (like function arguments) used to customize rendering.
- Analogy: Parameters you pass into a vending machine — they determine what comes out but the machine doesn't change them.
- Example: `<Avatar src="/me.png" size={48} />` — `src` and `size` are props.

## State

- Definition: Mutable data that lives inside a component and can change over time, triggering re-renders.
- Analogy: The temperature dial on a thermostat — turning it changes the behavior of the thermostat (component).
- Example: `const [count, setCount] = useState(0)` keeps a counter that increments on user clicks.

## Virtual DOM

- Definition: An in-memory representation of the UI; React diffs this with the previous tree to decide minimal DOM updates.
- Analogy: A blueprint sketch used to plan changes before touching the real building — reduces unnecessary work.
- Example: React computes a diff between old and new virtual DOM and only updates changed DOM nodes.

## Reconciliation

- Definition: The process React uses to compare virtual DOM trees and update the real DOM efficiently.
- Analogy: Spot-the-difference game — find only the changes and apply them.
- Example: Changing a list item’s text causes React to update only that node, not the entire list (with correct keys).

## Render

- Definition: The act of returning React elements (JSX) from a component so React can build the virtual DOM for it.
- Analogy: A printer that converts a digital document (component) into a physical page (DOM elements).
- Example: A component’s function body returns JSX — that is its render output.

## Mount / Update / Unmount (Lifecycle)

- Definition: Mount = first time a component is inserted into the DOM; Update = when props/state change; Unmount = removed.
- Analogy: Renting a room — move in (mount), change furniture (update), move out (unmount).
- Example: `useEffect(() => { /* on mount */ return () => { /* on unmount */ } }, [])`.

## Hook

- Definition: A special function (prefixed with `use`) that lets you “hook into” React features from function components.
- Analogy: Power outlets that let components plug into React’s capabilities (state, effects, refs).
- Example: `useState`, `useEffect`, and `useRef` are hooks.

## useState

- Definition: Hook to add local state to a function component.
- Analogy: A sticky note you keep near a task that you update as the task progresses.
- Example: `const [open, setOpen] = useState(false)` toggles a modal.

## useEffect

- Definition: Hook for side effects (data fetching, subscriptions, timers); supports cleanup functions.
- Analogy: Setting an alarm — you schedule it (effect) and clear it when done (cleanup).
- Example: Fetch data on mount and cancel or ignore the result on unmount.

## useRef

- Definition: Hook that returns a mutable object which persists across renders; used for DOM refs or mutable containers.
- Analogy: A mailbox on the wall — everyone can read/write the latest mail without triggering a repaint of the house.
- Example: `const inputRef = useRef()` and `<input ref={inputRef} />` to focus the input programmatically.

## useMemo / useCallback

- Definition: Hooks for memoizing values (`useMemo`) or function references (`useCallback`) to avoid unnecessary recalculations or re-renders.
- Analogy: Caching the result of an expensive recipe so you don’t cook it from scratch every time.
- Example: `const expensive = useMemo(() => compute(data), [data])`.

## useReducer

- Definition: Hook that manages state with a reducer function (useful for complex state logic or many related updates).
- Analogy: Following a checklist (reducer) where each action modifies the checklist state predictably.
- Example: `const [state, dispatch] = useReducer(reducer, initialState)` for a form with many fields.

## Context

- Definition: A way to pass data through the component tree without prop drilling — Provider/Consumer pattern.
- Analogy: A central public bulletin board where everyone can read the same notices instead of passing messages person-to-person.
- Example: Theme or Auth context so deep children can read `theme` without intermediate props.

## Key (list keys)

- Definition: A special prop used when rendering lists to help React identify which items changed, added, or removed.
- Analogy: Name tags at an event so organizers know which guest is which as the guest list changes.
- Example: `items.map(item => <li key={item.id}>{item.name}</li>)`.

## Controlled vs Uncontrolled Components

- Definition: Controlled = form inputs where React state is the single source of truth; Uncontrolled = browser DOM holds the value and you read it via refs.
- Analogy: Controlled = thermostat set by a central system; Uncontrolled = a manual dial you glance at occasionally.
- Example: `<input value={value} onChange={e => setValue(e.target.value)} />` (controlled).

## Synthetic Event

- Definition: React’s cross-browser wrapper around native browser events that normalizes differences.
- Analogy: A universal remote that translates your button press into the right signal for any TV brand.
- Example: `onClick={handleClick}` receives a SyntheticEvent with normalized properties.

## Error Boundary

- Definition: React class component that catches JS errors in its child component tree and renders a fallback UI.
- Analogy: A safety helmet — it won’t stop the fall, but it protects the app from crashing completely.
- Example: Wrap unstable components in `<ErrorBoundary>` to show a friendly error message instead of a broken UI.

## Server-Side Rendering (SSR) & Hydration

- Definition: SSR renders HTML on the server so the browser gets a fully-formed page; hydration attaches React to that HTML to make it interactive.
- Analogy: Pre-baking a cake (server renders) and adding the frosting and decoration later at the table (hydration) so guests can eat it sooner.
- Example: Next.js pages that are server-rendered and hydrated on the client.

## Code-splitting & Suspense

- Definition: Splitting code into chunks loaded on demand. `Suspense` lets you show a fallback while lazy-loaded components or data arrive.
- Analogy: Ordering a multi-course meal where the main course may arrive later; you see an appetizer (fallback) while you wait.
- Example: `const Widget = React.lazy(() => import('./Widget'))` with `<Suspense fallback={<Spinner/>}><Widget/></Suspense>`.

## Concurrent features (startTransition, useDeferredValue)

- Definition: APIs that let React prioritize urgent updates (like typing) over less-urgent ones (like large list renders), improving perceived responsiveness.
- Analogy: A traffic controller letting ambulances pass (urgent) and making commuters wait a moment (non-urgent).
- Example: `startTransition(() => setBigState(value))` marks the update as low priority.

## Prop drilling

- Definition: Passing props through many layers of components only for deeply nested children to use; often a code smell that can be solved with Context.
- Analogy: Whispering a message down a long line of people instead of putting it on a shared notice board.
- Example: Passing `user` prop through `App -> Page -> Sidebar -> Avatar` instead of using a UserContext.

## Immutable state

- Definition: Treating state as immutable — always create new objects/arrays when changing state instead of mutating in place.
- Analogy: Versioned documents — each change produces a new revision rather than overwriting the old one.
- Example: `setItems(prev => [...prev, newItem])` instead of `prev.push(newItem)`.

## Side effect

- Definition: Any code that affects something outside the component’s render (network requests, timers, logging, subscriptions).
- Analogy: Sending an email — it’s an action that affects the outside world, not just your draft.
- Example: Fetching data from an API is a side effect and belongs in `useEffect`.

---
```
