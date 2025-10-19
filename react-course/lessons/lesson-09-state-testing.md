# Lesson 09 — State-management strategies & testing fundamentals

Learning objectives

- Understand local state, Context, and external state libraries (Redux, Zustand)
- Learn testing basics with React Testing Library and Jest

State management overview

- Local state: `useState` and `useReducer` for component-scoped state.
- Derived state: compute from props/state instead of duplicating.
- Global state: Context for simple global needs; external libraries for more complex scenarios.

When to introduce an external state library

- When your app has complex cross-cutting state, many components rely on the same data, or you need advanced devtools/time-travel/debugging.
- Consider lightweight options (Zustand, Jotai) before heavy solutions.

Testing basics (React Testing Library)

- Prefer testing component behavior over implementation details. Render components and assert on UI and interactions.

Example test (Jest + React Testing Library):

```js
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../Counter";

test("increments", () => {
  render(<Counter />);
  const btn = screen.getByRole("button", { name: /count:/i });
  fireEvent.click(btn);
  expect(btn).toHaveTextContent(/count: 1/i);
});
```

Real-world scenarios

- Use `useReducer` for complex local state transitions (e.g., forms with many step actions) and combine with context to provide dispatch globally.
- Use integration tests to verify flows (login -> view dashboard -> logout).

Good practices

- Test user-facing behavior: accessibility, text, DOM changes.
- Keep unit tests fast and mock network calls as needed.

Bad practices

- Testing implementation details (internal state shape, private helper functions).
- Heavy reliance on snapshot tests for large components without targeted assertions.

Exercises

1. Write unit tests for a `TodoList` component covering add/remove and persistence (mock localStorage).
2. Implement `useReducer` for a form workflow and add tests for reducer transitions.

Interview Q&A

Q: When should you use useReducer vs useState?
A: Use `useReducer` when state transitions are complex or when the next state depends on previous state with many possible actions — it centralizes update logic.

Q: How do you test asynchronous components that fetch data?
A: Mock network requests (msw or jest.mock fetch) and use async testing utilities like `findBy...` to await DOM updates. Clean up after tests.
