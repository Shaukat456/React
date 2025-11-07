## Goals

- Understand ES6+ syntax used in React code (arrow functions, const/let, destructuring, spread/rest, template strings)
- Know how modules, imports, and exports work (ES Modules)
- Grasp functions, closures, and `this` basics
- Know Promises, async/await, and basic error handling
- Understand the DOM, events, and the event loop (microtasks vs macrotasks)
- Be comfortable with arrays and objects helpers (map, filter, reduce)

---

## 1) Modern syntax essentials (ES6+)

- `const` / `let` vs `var` — prefer `const` for values that don't change and `let` for reassignable variables; avoid `var`.
- Arrow functions — concise syntax and lexical `this` (important when writing handlers):

```js
const add = (a, b) => a + b;
```

````

- Destructuring — extract properties from objects or arrays:

```js
const { name, age } = user;
const [first, second] = items;
```

- Spread / Rest — copy/merge objects/arrays and collect arguments:

```js
const a = [...arr, 4];
const obj2 = { ...obj, extra: true };
function f(...args) {}
```

- Template literals — string interpolation: `` `Hello ${name}` ``

Why: React code uses this syntax heavily in components, props, and state updates.

---

## 2) Functions, closures, and `this`

- Functions are first-class: you pass them as props and call them later (callbacks).
- Closures: functions remember the variables from their creation scope — useful for hooks and event handlers.

Example:

```js
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const inc = makeCounter();
console.log(inc()); // 1
console.log(inc()); // 2
```

- `this` in arrow functions is lexical (takes from outer scope); in regular functions `this` depends on how the function is called. In React function components you rarely use `this` — but understanding it helps when reading class components or third-party code.

---

## 3) Modules (ES Modules)

- `export` / `import` are used in modern React apps. Example:

```js
// utils.js
export function sum(a, b) {
  return a + b;
}

// App.js
import { sum } from "./utils";
```

- Default exports vs named exports — know the difference and prefer named exports for clarity.

Why: React apps are built from many small modules (components, utils, hooks).

---

## 4) Promises & async/await

- Promises represent asynchronous results; `async`/`await` is syntactic sugar over Promises.

```js
async function fetchUsers() {
  try {
    const res = await fetch("/api/users");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
```

- Cancellation: there's no built-in cancel for `fetch`; patterns include AbortController or ignoring results when a component unmounts.

Why: Data fetching in React uses these patterns (often inside `useEffect`).

---

## 5) Arrays and object utilities

- `map`, `filter`, `reduce`, `find`, `some`, `every` — used extensively to render lists and transform data.

```js
const names = users.map((u) => u.name);
const active = users.filter((u) => u.active);
```

- Immutable updates: use spread to create new arrays/objects instead of mutating.

---

## 6) DOM basics & events

- Selecting and manipulating the DOM (`document.querySelector`, `addEventListener`) — React abstracts many of these but knowledge helps debugging.
- Event propagation (bubbling) and preventing default behavior (e.preventDefault()).

Why: React synthesizes events and you still need to understand underlying browser behavior.

---

## 7) Event loop, microtasks, macrotasks

- Understand that `Promise.then` callbacks run as microtasks after the current stack, while `setTimeout` runs macrotasks.

Example:

```js
console.log("start");
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("end");
// Output: start, end, promise, timeout
```

Why: Timing matters when coordinating side effects and renders.

---

## 8) Basic debugging & tooling

- DevTools (browser), console methods, source maps.
- Node/npm basics: running `npm install`, `npm run dev`, and tinker with simple dev servers.

---

## Tiny hands-on exercises (10–60 minutes each)

1. Write a small module that exports a function `greet(name)` and import it from another file — log a template literal.
2. Use `fetch` to request JSON (can use https://jsonplaceholder.typicode.com/users) inside an async function; log names.
3. Create an array of objects and render a string list using `map` (console output is fine).
4. Create a closure (counter factory) and demonstrate that each counter keeps its own state.

---

## When to move on to React

- You’re ready if you can comfortably: read ES6+ syntax, write small modules, fetch data with `async/await`, and use array helpers.
- If any topic is shaky, spend 1–2 focused days practicing those items — it pays off heavily when learning React.

---

```

```
````
