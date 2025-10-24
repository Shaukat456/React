````markdown
# Lesson 20 — Custom hooks: design, reuse, testing

Estimated time: 2–3 hours (read + exercises)

Purpose: Teach how to extract reusable logic into custom hooks, design their API surface, handle side-effects and lifecycle, and test them reliably.

---

## What is a custom hook?

- A custom hook is a JavaScript function whose name starts with `use` and that may call other hooks. It extracts reusable stateful logic from components.

Example (simple useLocalStorage hook):

```js
import { useState, useEffect } from "react";

function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      // ignore write errors
    }
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorage;
```
````

---

## Design principles

- Composition: small focused hooks are easier to test and reuse.
- API simplicity: prefer returning a minimal, stable API (value + setter or object with methods).
- Avoid coupling to UI: hooks should not render UI directly.
- Keep side-effects controlled and predictable (only in useEffect/useLayoutEffect).

---

## Common patterns

- useFetch(url) — fetch + cache + loading/error state
- useToggle(initial) — boolean toggle utility
- useDebouncedValue(value, delay) — debounce values for inputs
- usePrevious(value) — capture previous prop/state value

Example: useDebouncedValue

```js
import { useState, useEffect } from "react";

function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default useDebouncedValue;
```

---

## Testing custom hooks

- Use `@testing-library/react` with `renderHook` from `@testing-library/react-hooks` (or React Testing Library's recommended helpers). Test both happy path and edge cases (errors, cleanup).

Example test (pseudo):

```js
import { renderHook, act } from "@testing-library/react-hooks";
import useDebouncedValue from "./useDebouncedValue";

jest.useFakeTimers();

test("debounces value changes", () => {
  const { result, rerender } = renderHook(
    ({ value, delay }) => useDebouncedValue(value, delay),
    {
      initialProps: { value: "a", delay: 200 },
    }
  );

  expect(result.current).toBe("a");
  rerender({ value: "ab", delay: 200 });
  // not updated immediately
  expect(result.current).toBe("a");
  act(() => {
    jest.advanceTimersByTime(200);
  });
  expect(result.current).toBe("ab");
});
```

---

## Performance & memoization

- If your hook returns objects or functions, memoize them (useCallback/useMemo) to avoid breaking downstream memoization in consumers.

Example: return stable handlers

```js
import { useCallback } from "react";

function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const inc = useCallback(() => setCount((c) => c + 1), []);
  const dec = useCallback(() => setCount((c) => c - 1), []);
  return { count, inc, dec };
}
```

---

## API design checklist

1. Start name with `use`.
2. Keep return value minimal and stable.
3. Avoid side-effects during render.
4. Document lifecycle and expected behavior.

---

## Exercises

1. Create `useFetch(url)` hook used by a component to display loading, data, and errors. Handle cancellation with AbortController.
2. Implement `useUndo(initial)` hook that exposes `{ state, set, undo, redo, canUndo, canRedo }` and use it in a small form.
3. Write tests for `useDebouncedValue` and `useUndo`.

---

## Interview Q&A

Q: How do you make a hook's returned API stable to avoid unnecessary re-renders?

A: Memoize functions/objects with `useCallback`/`useMemo` and avoid returning new object/array literals each render.

Q: Can hooks be conditional?

A: No — hooks must be called unconditionally and in the same order each render. Use early returns inside hooks, not conditional calls to hooks.

---

If you want, I can now:

- Add the `useFetch` and `useUndo` hook files into `vite-starter/src/hooks/` and wire demo components, or
- Move to `lesson-21-useDebugValue.md` next.

Which would you like?

```

```
