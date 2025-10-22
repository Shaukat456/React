````markdown
# Lesson 14 — useRef deep-dive

Estimated time: 1–2 hours (read + hands-on exercises)

Purpose: Learn how to use `useRef` for DOM access, storing mutable values across renders without causing re-renders, and common patterns where refs shine.

---

## What is `useRef`?

- `useRef` returns a mutable object with a `.current` property that persists for the lifetime of the component.
- It does not cause re-renders when `.current` changes.

```js
const ref = useRef(initialValue);
ref.current = 42; // mutation
```
````

Two primary uses:

- DOM refs: attach to DOM nodes via `ref` prop to read or call methods on the DOM element.
- Mutable containers: store values (like previous props, timers, or mutable flags) that survive across renders but shouldn't trigger updates.

---

## DOM refs example

```js
import { useRef } from "react";

function FocusInput() {
  const inputRef = useRef();
  return (
    <div>
      <input ref={inputRef} placeholder="Type..." />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </div>
  );
}
```

Notes: Always prefer declarative ways when possible; use refs for imperative tasks like focusing or measuring.

---

## Mutable container example (storing previous value)

```js
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Example({ count }) {
  const prev = usePrevious(count);
  return (
    <div>
      Now: {count}, before: {prev}
    </div>
  );
}
```

Why this works: the ref survives renders but updating `ref.current` doesn't re-render the component.

---

## Timers and refs (avoid stale closures)

```js
function Timer() {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
```

This pattern avoids re-creating the interval when `callback` changes but keeps the latest callback via the ref.

---

## Avoid overusing refs

- Don't use refs to store state you want to render — if a change should update the UI, use state (`useState`).
- Prefer controlled components and declarative updates where possible; refs are for escaping to imperative APIs.

---

## Edge cases and gotchas

- Accessing `.current` before mount (e.g., on first render) will be `undefined` for DOM refs.
- When passing refs down, use `forwardRef` for function components that accept refs.

Example: forwarding a ref

```js
const FancyInput = forwardRef((props, ref) => (
  <input ref={ref} className="fancy" {...props} />
));

// Parent
const ref = useRef();
<FancyInput ref={ref} />;
```

---

## Exercises

1. Build a `TextScroller` component that automatically focuses an input on mount and selects the text when the user clicks a button.
2. Implement `usePrevious` as shown and add tests to verify previous values are tracked correctly.
3. Create a `useInterval` hook that accepts a callback and delay, using the `savedCallback` ref pattern to avoid restarting the interval unnecessarily.

---

## Interview Q&A (short)

Q: When should you use `useRef` vs `useState`?

A: Use `useRef` for mutable values that don't affect rendering (timers, DOM nodes, previous values). Use `useState` for values that should cause a re-render when changed.

Q: How do you forward a ref to a function component?

A: Wrap the component in `forwardRef((props, ref) => ...)` and attach the `ref` to a child DOM node.

Q: Does updating `ref.current` trigger a render?

A: No. Mutating a ref's `.current` does not trigger a re-render.

---

If you'd like, I can:

- Add the `useRef` exercises as runnable components in the `vite-starter` app, or
- Proceed to `lesson-15-useMemo-useCallback.md` next.

Which would you like?

```

```
