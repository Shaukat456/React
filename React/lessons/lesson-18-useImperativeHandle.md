````markdown
# Lesson 18 — useImperativeHandle

Estimated time: 1 hour (read + exercises)

Purpose: Learn how `useImperativeHandle` lets a function component expose imperative methods to parent components via refs, when to use it, and safer alternatives.

---

## Quick summary

- `useImperativeHandle(ref, createHandle, [deps])` customizes the instance value that is exposed to parent refs when using `forwardRef`.
- It's used to expose imperative APIs (e.g., focus, reset) while keeping component internals encapsulated.

---

## Basic example (focus/reset)

```js
import React, { useRef, forwardRef, useImperativeHandle } from "react";

const Input = forwardRef(function Input(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    reset: () => {
      inputRef.current.value = "";
    },
  }));
  return <input ref={inputRef} {...props} />;
});

function Parent() {
  const ref = useRef();
  return (
    <div>
      <Input ref={ref} />
      <button onClick={() => ref.current.focus()}>Focus</button>
      <button onClick={() => ref.current.reset()}>Reset</button>
    </div>
  );
}
```
````

Notes: The parent only sees the methods you expose; the component's internals remain private.

---

## When to use

- When integrating with third-party imperative libraries that expect a DOM node or imperative API.
- When you need to expose a small set of controlled imperative methods (focus, scrollIntoView, highlight).

Prefer alternatives when possible:

- Provide declarative props (e.g., `autoFocus`, `visible`) instead of imperative handles.

---

## Best practices

- Keep the exposed API small and well-documented.
- Avoid exposing internal state; expose only methods that are safe and stable.
- Use `useImperativeHandle` together with `forwardRef`.

---

## Exercises

1. Implement a `CustomInput` that exposes `focus` and `selectAll` via `useImperativeHandle` and test it by calling from a parent.
2. Refactor a component that uses parent DOM access to instead expose a focused API with `useImperativeHandle`.

---

## Interview Q&A

Q: What does `useImperativeHandle` do?

A: It customizes the object assigned to a ref by a function component using `forwardRef`, allowing the component to expose imperative methods.

Q: Should you use `useImperativeHandle` often?

A: No — prefer declarative APIs. Use it sparingly for interop or when imperative control is genuinely needed.

---

If you want, I can:

- Add a runnable `CustomInput` demo to the `vite-starter` app showing `focus`/`selectAll`, or
- Continue authoring the concurrent hooks lesson (`lesson-19-concurrent-hooks.md`).

Which would you like next?

```

```
