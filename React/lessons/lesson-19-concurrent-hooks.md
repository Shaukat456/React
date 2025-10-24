````markdown
# Lesson 19 — Concurrent hooks: useTransition, useDeferredValue, useId

Estimated time: 2 hours (read + hands-on)

Purpose: Introduce React’s concurrent helpers that help manage prioritization of updates and avoid janky UIs: `startTransition`/`useTransition`, `useDeferredValue`, and `useId`.

---

## Background: why concurrency helpers?

- As apps grow, some updates are urgent (typing, clicking) and others are non-urgent (heavy list re-render). Concurrent helpers let React treat low-priority updates differently so the UI stays responsive.

---

## startTransition & useTransition

- `startTransition(fn)` marks updates inside as non-urgent. React can interrupt or delay these to keep the UI responsive.
- `useTransition()` returns `[isPending, startTransition]` where `isPending` is a boolean that indicates a transition is ongoing.

Example (search with transition):

```js
import { useState, useTransition } from "react";

function Search() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState([]);

  function onChange(e) {
    const q = e.target.value;
    setQuery(q); // urgent: keep input responsive
    startTransition(() => {
      // non-urgent: update heavy results
      const r = heavyFilter(bigList, q);
      setResults(r);
    });
  }

  return (
    <div>
      <input value={query} onChange={onChange} />
      {isPending ? <div>Loading...</div> : <Results list={results} />}
    </div>
  );
}
```
````

Notes: Use transitions for expensive state updates triggered by user interactions where keeping the UI responsive matters.

---

## useDeferredValue

- `useDeferredValue(value)` returns a deferred version of a fast-changing value. Useful when rendering expensive UI based on a rapidly-updating prop.

Example:

```js
const deferredQuery = useDeferredValue(query);
const results = useMemo(
  () => heavyFilter(bigList, deferredQuery),
  [deferredQuery]
);
```

Benefit: `query` updates immediately (fast input), but the expensive computation uses `deferredQuery` which may lag behind slightly to avoid blocking.

---

## useId

- `useId()` generates a stable, unique id for accessibility attributes and SSR-friendly ids.

Example:

```js
const id = useId();
return <label htmlFor={id}>Name</label><input id={id} />;
```

Notes: `useId` avoids collisions and integrates with SSR/hydration.

---

## Practical patterns & pitfalls

- Prefer transitions for large updates caused by user interactions. Avoid wrapping everything in `startTransition` — only non-urgent work.
- `useDeferredValue` is simpler when you want a lagging value without managing `isPending` state.
- `useId` must be called during render (like hooks) and is stable across server/client.

Pitfall: Overusing transitions and deferred values can create confusing UI if the lag is too big; always provide loading/fallback indicators where helpful.

---

## Exercises

1. Convert the `Search` example in the `vite-starter` to use `useTransition` and show `isPending` feedback.
2. Replace an expensive render with `useDeferredValue` and measure responsiveness when typing quickly.
3. Use `useId` in a small form component to wire labels to inputs and ensure SSR-friendly ids.

---

## Interview Q&A

Q: What’s the difference between `useDeferredValue` and `startTransition`?

A: `startTransition` wraps state updates as low priority and provides `isPending`. `useDeferredValue` returns a value that lags behind the source and is handy for throttling render inputs.

Q: When should you use `useId`?

A: For generating unique ids for form controls and accessibility attributes, especially when SSR/hydration is involved.

---

If you want, I can:

- Add a `Search` transition demo to the `vite-starter` app (recommended), or
- Continue to `lesson-20-custom-hooks.md` next.

Which would you like me to do next?

```

```
