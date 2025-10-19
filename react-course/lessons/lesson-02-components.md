# Lesson 02 — Components and composition (designing UI as functions)

Learning objectives

- Understand function components and when class components may appear in legacy code
- Learn composition patterns and how to pass data via props and children
- Recognize component boundaries and responsibilities in real apps

Overview

Components are the building blocks of a React app. Prefer small, focused, pure components that accept props and return UI. Composition (putting components together) is favored over inheritance.

Function components

Function components are simple JavaScript functions that receive props and return React elements.

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

Class components (legacy)

Class components were common before Hooks. You might need to read or maintain them, but prefer function components and hooks for new code.

Composition and children

Components compose naturally. Use `children` for flexible slot-like content.

```jsx
function Page({ header, children, footer }) {
  return (
    <div>
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  );
}
```

Real-world scenarios

- Designing a UI: break the page into sections (Header, Sidebar, Content, Footer). Each section becomes a component.
- Reuse: extract a small input or button into a shared component when multiple pages use the same behavior and styling.
- Testing: small components are easier to unit-test as you can render them with minimal props.

Good practices

- Single responsibility: components should do one job — rendering or orchestrating children.
- Keep components small and prefer composition over large monolithic components.
- Declare prop shapes clearly (use PropTypes or TypeScript when possible).

Bad practices

- Overloading components with unrelated responsibilities (rendering + heavy business logic + data fetching). Split responsibilities.
- Deeply nested component trees without clear ownership — prefer flattening or using composition patterns.

Exercises

1. Build an `App` with `Header`, `Main`, and `Footer` components, and compose them inside `App`.
2. Create a `Card` component that accepts `title`, `children`, and a `footer` prop; use it in two different places.

Interview questions & model answers

Q: What is component composition and why is it preferred to inheritance?
A: Composition is combining small components to build larger UI. It's preferred because it's simpler, more flexible, and leads to clearer separation of concerns than class inheritance.

Q: When should you use a class component today?
A: Mostly when working with legacy code. New code should favor function components with hooks.

Q: How do you pass data from a parent to a child component?
A: Using props. Parents pass values as attributes on the child's JSX element, and the child receives them as function arguments (props).

Q: How would you structure components for a dashboard page?
A: Identify visual sections (Header, Sidebar, Toolbar, Content widgets). Each widget is a component; state can be local to widgets or lifted to a common ancestor for shared concerns.
