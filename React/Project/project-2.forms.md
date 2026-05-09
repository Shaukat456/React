# React Todo App Masterclass

## Controlled vs Uncontrolled Components + Best & Bad Practices

---

# What You Will Learn

By the end of this guide, you will understand:

- How to build a Todo App step by step
- What forms are in React
- Controlled components
- Uncontrolled components
- Refs in React
- State management basics
- Props
- Component structure
- Form submission
- Mapping lists
- Good practices
- Bad practices (with commented examples)
- Real-world thinking used by professional React developers

---

# Prerequisites

You should know:

- Basic HTML
- Basic JavaScript
- Functions
- Arrays
- Objects
- ES6 syntax

---

# Big Picture First

A Todo App sounds simple.

But inside it, almost every important React concept exists:

| Feature           | React Concept                  |
| ----------------- | ------------------------------ |
| Typing in input   | State                          |
| Submitting form   | Events                         |
| Showing todos     | Mapping                        |
| Reusing UI        | Components                     |
| Checkbox complete | State updates                  |
| Delete button     | Props + Functions              |
| Forms             | Controlled/Uncontrolled Inputs |

That is why Todo Apps are famous in React learning.

---

# Mental Model of React Forms

Before coding, understand this deeply.

## In Normal HTML

The browser itself controls the form.

Example:

```html
<input type="text" />
```

The browser stores the input value internally.

---

# In React

React likes to control the UI.

Meaning:

- React stores the value
- React updates the value
- React decides what appears on screen

This creates:

# Controlled Components

---

# Controlled Components

A controlled component means:

> React state controls the input.

Example idea:

```jsx
const [text, setText] = useState("");
```

Now React owns the value.

Input becomes:

```jsx
<input value={text} onChange={(e) => setText(e.target.value)} />
```

---

# Flow of Controlled Components

```text
User types
   ↓
onChange runs
   ↓
State updates
   ↓
React re-renders
   ↓
Input shows updated value
```

React is the single source of truth.

---

# Why Controlled Components Are Powerful

You can:

- Validate instantly
- Disable submit button
- Show live preview
- Limit characters
- Format text
- Sync UI easily
- Perform dynamic validation

Professional React apps mostly use controlled components.

---

# Uncontrolled Components

In uncontrolled components:

> The DOM itself controls the input.

React does NOT store the value in state.

Instead, we access input values using refs.

Example:

```jsx
const inputRef = useRef();
```

```jsx
<input ref={inputRef} />
```

Then:

```jsx
console.log(inputRef.current.value);
```

---

# Controlled vs Uncontrolled

| Controlled             | Uncontrolled                |
| ---------------------- | --------------------------- |
| React controls input   | DOM controls input          |
| Uses state             | Uses refs                   |
| Easier validation      | Less code                   |
| More React style       | More traditional HTML style |
| More re-renders        | Fewer re-renders            |
| Best for dynamic forms | Useful for simple forms     |

---

# Project Structure

We will build:

```text
src/
 ├── components/
 │    ├── TodoForm.jsx
 │    ├── TodoList.jsx
 │    ├── TodoItem.jsx
 │    └── UncontrolledForm.jsx
 │
 ├── App.jsx
 └── main.jsx
```

---

# Step 1 — Create React App

Using Vite:

```bash
npm create vite@latest
```

Choose:

```text
React
JavaScript
```

Install dependencies:

```bash
npm install
```

Run app:

```bash
npm run dev
```

---

# Step 2 — Clean Starter Code

Delete everything inside App.jsx.

---

# Final App Features

We will create:

- Add todo
- Delete todo
- Toggle complete
- Controlled form
- Uncontrolled form
- Validation
- Component architecture

---

# Step 3 — Build Basic App State

## App.jsx

```jsx
import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState([]);

  function addTodo(todoText) {
    const newTodo = {
      id: crypto.randomUUID(),
      text: todoText,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  return (
    <div>
      <h1>Todo App</h1>

      <TodoForm onAddTodo={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
}
```

---

# Deep Explanation

## useState([])

```jsx
const [todos, setTodos] = useState([]);
```

This creates state.

| Variable | Meaning                 |
| -------- | ----------------------- |
| todos    | Current data            |
| setTodos | Function to update data |

Initially:

```js
[];
```

An empty array.

---

# Why State?

React re-renders when state changes.

Meaning:

```jsx
setTodos(...)
```

causes UI update.

Without state:

- UI would not update
- React would not know data changed

---

# Why Functional Updates?

```jsx
setTodos((prevTodos) => [...prevTodos, newTodo]);
```

This is BEST PRACTICE.

Because state updates can be asynchronous.

---

# BAD PRACTICE

```jsx
// BAD PRACTICE
// Directly using current state can cause stale state bugs

setTodos([...todos, newTodo]);
```

Why bad?

If multiple updates happen quickly, React batching may use old values.

---

# Step 4 — Build Controlled Form

## components/TodoForm.jsx

```jsx
import { useState } from "react";

export default function TodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      return;
    }

    onAddTodo(trimmedValue);

    setInputValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter todo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button type="submit">Add Todo</button>
    </form>
  );
}
```

---

# This Is a Controlled Component

Why?

Because:

```jsx
value = { inputValue };
```

React controls the value.

And:

```jsx
onChange={(e) => setInputValue(e.target.value)}
```

updates React state.

---

# Understanding e.target.value

When user types:

```text
h
```

Browser creates event object.

```js
e.target.value;
```

means:

```text
Current input value
```

---

# Why preventDefault()?

Forms naturally reload the page.

```jsx
e.preventDefault();
```

stops reload.

Without it:

- page refreshes
- state resets
- SPA behavior breaks

---

# Real-World Validation

```jsx
const trimmedValue = inputValue.trim();
```

This removes spaces.

Example:

```text
"      hello     "
```

becomes:

```text
"hello"
```

---

# BAD PRACTICE

```jsx
// BAD PRACTICE
// No validation

onAddTodo(inputValue);
```

This allows:

- empty todos
- spaces-only todos
- dirty data

---

# Step 5 — Build TodoList

## components/TodoList.jsx

```jsx
import TodoItem from "./TodoItem";

export default function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
```

---

# Understanding map()

This is SUPER IMPORTANT.

```jsx
todos.map(...)
```

Transforms array into JSX.

Example:

```js
[1, 2, 3];
```

becomes:

```jsx
<li>1</li>
<li>2</li>
<li>3</li>
```

---

# Why key is Important

```jsx
key={todo.id}
```

React uses keys to:

- track list items
- optimize rendering
- detect changes efficiently

---

# BAD PRACTICE

```jsx
// BAD PRACTICE
// Never use array index as key when list changes dynamically

{
  todos.map((todo, index) => <TodoItem key={index} todo={todo} />);
}
```

Why dangerous?

If items are deleted/reordered:

- wrong items may update
- UI bugs happen
- performance issues occur

---

# Step 6 — Build TodoItem

## components/TodoItem.jsx

```jsx
export default function TodoItem({ todo }) {
  return (
    <li>
      <span>{todo.text}</span>
    </li>
  );
}
```

---

# Understanding Props

```jsx
function TodoItem({ todo })
```

Props are data passed from parent.

Flow:

```text
App
 ↓
TodoList
 ↓
TodoItem
```

React uses one-way data flow.

Parent sends data downward.

---

# Step 7 — Add Delete Functionality

## Update App.jsx

```jsx
function deleteTodo(id) {
  setTodos((prevTodos) => {
    return prevTodos.filter((todo) => todo.id !== id);
  });
}
```

Pass function:

```jsx
<TodoList todos={todos} onDeleteTodo={deleteTodo} />
```

---

# Update TodoList.jsx

```jsx
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onDeleteTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDeleteTodo={onDeleteTodo} />
      ))}
    </ul>
  );
}
```

---

# Update TodoItem.jsx

```jsx
export default function TodoItem({ todo, onDeleteTodo }) {
  return (
    <li>
      <span>{todo.text}</span>

      <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
    </li>
  );
}
```

---

# Understanding Callback Functions

This:

```jsx
onDeleteTodo(todo.id);
```

would execute immediately.

So we wrap it:

```jsx
() => onDeleteTodo(todo.id);
```

Now function executes only on click.

---

# BAD PRACTICE

```jsx
// BAD PRACTICE
// This runs immediately during render

<button onClick={onDeleteTodo(todo.id)}>
```

This causes:

- instant deletion
- infinite render problems
- broken UI

---

# Step 8 — Add Complete Toggle

## Update App.jsx

```jsx
function toggleTodo(id) {
  setTodos((prevTodos) => {
    return prevTodos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });
  });
}
```

Pass prop:

```jsx
<TodoList todos={todos} onDeleteTodo={deleteTodo} onToggleTodo={toggleTodo} />
```

---

# Update TodoList.jsx

```jsx
<TodoItem
  key={todo.id}
  todo={todo}
  onDeleteTodo={onDeleteTodo}
  onToggleTodo={onToggleTodo}
/>
```

---

# Update TodoItem.jsx

```jsx
export default function TodoItem({ todo, onDeleteTodo, onToggleTodo }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleTodo(todo.id)}
      />

      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>

      <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
    </li>
  );
}
```

---

# Why Immutability Matters

React state should NOT be mutated directly.

---

# BAD PRACTICE

```jsx
// BAD PRACTICE
// Direct mutation

todo.completed = true;
```

Why bad?

React depends on new object references.

Mutation causes:

- unpredictable bugs
- rendering issues
- state corruption

---

# GOOD PRACTICE

```jsx
return {
  ...todo,
  completed: !todo.completed,
};
```

This creates a NEW object.

Immutable update.

---

# Step 9 — Build Uncontrolled Form

Now we learn uncontrolled components.

---

# components/UncontrolledForm.jsx

```jsx
import { useRef } from "react";

export default function UncontrolledForm({ onAddTodo }) {
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    const value = inputRef.current.value.trim();

    if (!value) {
      return;
    }

    onAddTodo(value);

    inputRef.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} placeholder="Uncontrolled input" />

      <button type="submit">Add Todo</button>
    </form>
  );
}
```

---

# Understanding useRef()

```jsx
const inputRef = useRef(null);
```

Ref means:

> Direct access to DOM element.

React stores:

```jsx
inputRef.current;
```

which points to actual HTML input.

---

# Mental Model

Controlled:

```text
Input → React State → UI
```

Uncontrolled:

```text
Input → DOM stores value
```

---

# When To Use Uncontrolled Components

Useful for:

- simple forms
- file inputs
- integrating third-party libraries
- performance-sensitive cases
- quick prototypes

---

# When To Prefer Controlled Components

Prefer controlled for:

- validation
- dynamic forms
- real-time UI updates
- enterprise applications
- scalable forms

---

# Professional Recommendation

Most modern React apps use:

- controlled components
- form libraries

Examples:

- React Hook Form
- Formik

Interesting fact:

React Hook Form internally uses uncontrolled techniques for performance.

---

# BAD PRACTICE — Massive Components

```jsx
// BAD PRACTICE
// Everything inside App.jsx
```

Why bad?

Huge components become:

- unreadable
- unmaintainable
- hard to debug
- hard to scale

---

# GOOD PRACTICE — Component Separation

```text
TodoForm
TodoList
TodoItem
```

Each component has:

- one responsibility
- cleaner logic
- easier testing
- easier reuse

---

# BAD PRACTICE — Deep Prop Drilling Everywhere

Example:

```text
App → A → B → C → D
```

passing props through every level.

For larger apps use:

- Context API
- Zustand
- Redux

---

# BAD PRACTICE — Anonymous Complex Logic Inside JSX

```jsx
// BAD PRACTICE

<button
  onClick={() => {
    const updatedTodos = todos.filter(...)
    setTodos(updatedTodos)
    console.log(updatedTodos)
    doSomethingElse()
  }}
>
```

Why bad?

JSX becomes messy.

---

# GOOD PRACTICE

```jsx
function handleDelete() {
  onDeleteTodo(todo.id);
}
```

Cleaner.

More readable.

---

# BAD PRACTICE — Not Using Semantic HTML

```jsx
<div onClick={submitForm}>Submit</div>
```

Why bad?

- accessibility issues
- keyboard issues
- poor semantics

---

# GOOD PRACTICE

```jsx
<button type="submit">Submit</button>
```

---

# Complete Final App Structure

## App.jsx

```jsx
import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import UncontrolledForm from "./components/UncontrolledForm";

export default function App() {
  const [todos, setTodos] = useState([]);

  function addTodo(todoText) {
    const newTodo = {
      id: crypto.randomUUID(),
      text: todoText,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  function deleteTodo(id) {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  }

  function toggleTodo(id) {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });
    });
  }

  return (
    <div>
      <h1>React Todo App</h1>

      <h2>Controlled Form</h2>
      <TodoForm onAddTodo={addTodo} />

      <h2>Uncontrolled Form</h2>
      <UncontrolledForm onAddTodo={addTodo} />

      <TodoList
        todos={todos}
        onDeleteTodo={deleteTodo}
        onToggleTodo={toggleTodo}
      />
    </div>
  );
}
```

---

# Interview Questions

## Q1 — What is a controlled component?

A controlled component is an input whose value is controlled by React state.

---

## Q2 — What is an uncontrolled component?

An uncontrolled component stores form data inside the DOM instead of React state.

---

## Q3 — Why use controlled components?

Because they:

- simplify validation
- synchronize UI easily
- provide predictable state management

---

## Q4 — What does useRef do?

It stores mutable values and can directly reference DOM elements.

---

## Q5 — Why should keys be unique?

React uses keys for efficient reconciliation and rendering.

---

# Real-World Engineering Thinking

Professional developers think about:

| Concern        | Why It Matters                       |
| -------------- | ------------------------------------ |
| Readability    | Teams read code more than writing it |
| Scalability    | App grows over time                  |
| Reusability    | Components reused everywhere         |
| Predictability | Fewer bugs                           |
| Accessibility  | Better UX                            |
| Performance    | Faster apps                          |

---

# Beginner Mistakes

## Mistake 1

```jsx
setState inside loops carelessly
```

---

## Mistake 2

```jsx
Mutating arrays directly
```

Example:

```jsx
todos.push(newTodo);
```

BAD.

---

## Mistake 3

Forgetting:

```jsx
e.preventDefault();
```

---

## Mistake 4

Using index as key.

---

## Mistake 5

Putting too much logic in one component.

---

# Advanced Thinking

As apps grow:

You eventually learn:

- custom hooks
- reducers
- context
- form libraries
- server state
- optimistic UI
- validation schemas

This Todo App builds the foundation for all of them.

---

# Mini Exercises

Try adding:

1. Edit todo
2. Due dates
3. Todo categories
4. Search todos
5. Filter completed todos
6. Local storage persistence
7. Dark mode
8. Character limit validation
9. Remaining todos counter
10. Drag and drop sorting

---

# Most Important Concepts To Remember

## Controlled Components

```text
React controls the input
```

---

## Uncontrolled Components

```text
DOM controls the input
```

---

## State

```text
State changes trigger re-renders
```

---

## Props

```text
Props pass data from parent to child
```

---

## Immutability

```text
Never mutate React state directly
```

---

## Mapping

```text
map() transforms arrays into JSX
```

---

# Final Mental Model

Think of React like this:

```text
State = Brain
Components = Body Parts
Props = Communication
Events = Actions
Rendering = UI Update
```

Your Todo App teaches ALL of these.

---

# Congratulations

You now understand:

- Controlled forms
- Uncontrolled forms
- useState
- useRef
- Props
- Events
- Mapping
- Component architecture
- Good practices
- Bad practices
- Immutable updates
- Real-world React thinking

This is foundational React engineering knowledge.
