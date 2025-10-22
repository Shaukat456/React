````markdown
# Lesson 16 — useReducer deep-dive

Estimated time: 1.5–3 hours (read + hands-on)

Purpose: Learn when to prefer `useReducer` over `useState`, how to structure reducers, common patterns (reducer composition, undo/redo), and testing strategies.

---

## What is `useReducer`?

- `useReducer` is a React hook that manages state via a reducer function `(state, action) => newState` and returns `[state, dispatch]`.
- It mirrors the Redux reducer pattern but scoped locally to a component (or shared via Context).

```js
const [state, dispatch] = useReducer(reducer, initialState);
```
````

Use when:

- State logic is complex and involves multiple sub-values.
- Next state depends on previous state or when actions are a clearer mental model.
- You want to centralize update logic and make it easier to test.

---

## Basic example

```js
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </div>
  );
}
```

---

## Patterns

1. Reducer with payloads

```js
case 'add':
  return {...state, items: [...state.items, action.payload]};
```

2. Initializer function for expensive initial state

```js
const [state, dispatch] = useReducer(reducer, initialArg, initFn);
```

3. Reducer composition (split large reducer into smaller ones)

```js
function rootReducer(state, action) {
  return {
    partA: reducerA(state.partA, action),
    partB: reducerB(state.partB, action),
  };
}
```

4. Undo/Redo pattern

Keep a state shape like `{past: [], present, future: []}` and implement `UNDO`/`REDO` actions that shift arrays accordingly.

---

## useReducer vs useState

- `useState` is simpler for primitive/local values and when updates are straightforward.
- `useReducer` scales better for complex state transitions. It centralizes update logic and makes transitions explicit.

---

## Async actions and side-effects

- Reducers must be pure (no side effects). Handle side effects in `useEffect` or external functions. For complex flows, `useReducer` + `useEffect` or middleware-style helpers may be used.

Example: dispatch an action, then effect listens for a specific action type via state change or external event to run the side effect.

---

## Testing reducers

- Reducer functions are pure and easy to unit-test: call `reducer(initialState, action)` and assert the returned state.

```js
expect(reducer({ count: 0 }, { type: "increment" })).toEqual({ count: 1 });
```

---

## Example: Form reducer (complex form state)

```js
function formReducer(state, action) {
  switch (action.type) {
    case "change":
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
      };
    case "validate":
      return { ...state, errors: validate(action.values) };
    case "reset":
      return action.initial;
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(formReducer, { values: {}, errors: {} });
```

---

## Performance considerations

- `useReducer` avoids multiple state setters when many values change together—dispatching a single action can update multiple fields in one render.
- Avoid creating new objects in reducer unnecessarily; keep updates minimal and immutable.

---

## Exercises

1. Convert a multi-field form from multiple `useState` calls to a single `useReducer` with `change` and `reset` actions.
2. Implement an `undo/redo` feature for a simple drawing app state using reducer patterns.
3. Write unit tests for the reducer functions used above.

---

## Interview Q&A

Q: When would you use `useReducer` instead of `useState`?

A: Use it when state transitions are complex, involve multiple related values, or when you want to centralize state transition logic and make it easier to test.

Q: Should reducers have side-effects?

A: No. Reducers should be pure. Side-effects belong in `useEffect` or external async functions.

Q: How do you implement undo/redo with reducers?

A: Keep `past` and `future` arrays in state and shift values between them on `UNDO`/`REDO` actions.

---

If you want, I can:

- Add the form + undo/redo examples into the `vite-starter` app as runnable components,
- Create unit tests for the reducer examples with Jest, or
- Continue with `lesson-17-useLayoutEffect.md` next.

Which would you like me to do next?

```

```
