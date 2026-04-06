# 🚀 JavaScript Mastery Course

### _From Scratch to Advanced — Prerequisites for React_

> **Course Philosophy:** Learn JavaScript the way professionals do — through real-world scenarios, progressive complexity, and interview-ready depth.

---

## 📋 Course Roadmap

| #   | Lesson                                                      | Level           |
| --- | ----------------------------------------------------------- | --------------- |
| 01  | JavaScript Foundations & Environment Setup                  | 🟢 Beginner     |
| 02  | Variables, Data Types & Type Coercion                       | 🟢 Beginner     |
| 03  | Operators, Expressions & Control Flow                       | 🟢 Beginner     |
| 04  | Functions — Declarations, Expressions & Arrow Functions     | 🟢 Beginner     |
| 05  | Scope, Hoisting & the Temporal Dead Zone                    | 🟡 Intermediate |
| 06  | Closures — The Heart of JavaScript                          | 🟡 Intermediate |
| 07  | Arrays & Array Methods (Deep Dive)                          | 🟡 Intermediate |
| 08  | Objects, Prototypes & `this` Keyword                        | 🟡 Intermediate |
| 09  | Destructuring, Spread & Rest                                | 🟡 Intermediate |
| 10  | ES6+ Modern JavaScript Features                             | 🟡 Intermediate |
| 11  | Asynchronous JavaScript — Callbacks, Promises & Async/Await | 🔴 Advanced     |
| 12  | The Event Loop, Microtasks & Macrotasks                     | 🔴 Advanced     |
| 13  | Error Handling & Debugging                                  | 🟡 Intermediate |
| 14  | DOM Manipulation & Events                                   | 🟡 Intermediate |
| 15  | Modules — ES Modules & CommonJS                             | 🟡 Intermediate |
| 16  | JavaScript Classes & OOP                                    | 🟡 Intermediate |
| 17  | Functional Programming in JavaScript                        | 🔴 Advanced     |
| 18  | Performance, Memory & Best Practices                        | 🔴 Advanced     |
| 19  | JavaScript for React — The Bridge                           | 🔴 Advanced     |

---

---

# Lesson 01 — JavaScript Foundations & Environment Setup

## 🎯 Learning Objectives

- Understand what JavaScript is and where it runs
- Set up a professional development environment
- Write and execute your first JavaScript program
- Understand the role of the JS engine

---

## 📖 What is JavaScript?

JavaScript is a **high-level, interpreted, single-threaded, dynamically typed** programming language. Originally created to make web pages interactive, it now powers:

- **Frontend** — React, Vue, Angular (browser)
- **Backend** — Node.js (server)
- **Mobile** — React Native
- **Desktop** — Electron (VS Code is built with it!)
- **Serverless** — Cloudflare Workers, AWS Lambda

> **Real-World Scenario:** When you scroll Twitter/X and new tweets load without refreshing the page — that's JavaScript making an API call and updating the DOM dynamically.

---

## 🔧 Environment Setup

### Option A — Browser Console (Quickstart)

Open any browser → Press `F12` → Click **Console** tab → Type JavaScript directly.

```js
console.log("Hello, JavaScript!");
// Output: Hello, JavaScript!
```

### Option B — VS Code + Node.js (Professional Setup)

```bash
# 1. Install Node.js from nodejs.org
# 2. Verify installation
node --version   # v20.x.x
npm --version    # 10.x.x

# 3. Create a project
mkdir js-mastery && cd js-mastery

# 4. Create your first file
touch lesson01.js

# 5. Run it
node lesson01.js
```

### Essential VS Code Extensions

- **ESLint** — catches errors as you type
- **Prettier** — auto-formats code
- **Quokka.js** — live code evaluation in editor

---

## ⚙️ How JavaScript Engines Work

```
Your Code (.js)
      ↓
   Parsing (AST — Abstract Syntax Tree)
      ↓
   Compilation (JIT — Just-In-Time)
      ↓
   Execution
      ↓
   Output
```

**V8** (Chrome, Node.js) | **SpiderMonkey** (Firefox) | **JavaScriptCore** (Safari)

> **Real-World Analogy:** The JS engine is like a chef. You give it a recipe (your code), it reads it (parsing), preps everything (compilation), then cooks (execution) and serves the result.

---

## 💻 Your First Real Programs

```js
// Program 1: Calculator
function calculate(a, operator, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : "Cannot divide by zero";
    default:
      return "Unknown operator";
  }
}

console.log(calculate(10, "+", 5)); // 15
console.log(calculate(10, "/", 0)); // Cannot divide by zero
```

```js
// Program 2: Temperature Converter
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

console.log(celsiusToFahrenheit(100)); // 212
console.log(fahrenheitToCelsius(98.6)); // 37
```

---

## 🎤 Interview Questions — Lesson 01

**Q1: What is JavaScript and how does it differ from Java?**

> **Answer:** JavaScript is a dynamic, interpreted scripting language primarily for web development. Java is a statically-typed, compiled, object-oriented language. They share similar C-style syntax but are fundamentally different in design, use-case, typing, and runtime environment. The name similarity was a marketing decision in 1995.

**Q2: Is JavaScript single-threaded? How does it handle concurrency then?**

> **Answer:** Yes, JavaScript runs on a single thread. It handles concurrency through the **Event Loop** — an asynchronous, non-blocking model using callbacks, Promises, and async/await. The browser (or Node.js) handles I/O operations in the background and notifies the main thread when done. (We'll deep-dive in Lesson 12.)

**Q3: What is the difference between JavaScript runtime and JavaScript engine?**

> **Answer:** The **engine** (V8, SpiderMonkey) compiles and executes JS code. The **runtime** (browser or Node.js) provides the environment — including Web APIs (like `setTimeout`, `fetch`, DOM) that are NOT part of the JS language itself. The engine is the core; the runtime is the full ecosystem.

**Q4: What does "interpreted" mean? Is JS truly interpreted?**

> **Answer:** Modern JS engines use **JIT (Just-In-Time) compilation** — they compile hot code paths to machine code at runtime for performance. So JS is better described as "JIT-compiled." It's not purely interpreted like older implementations, nor pre-compiled like C.

---

---

# Lesson 02 — Variables, Data Types & Type Coercion

## 🎯 Learning Objectives

- Master `var`, `let`, and `const` — when and why
- Know all 8 JavaScript data types
- Understand dynamic typing
- Demystify type coercion (JavaScript's most misunderstood feature)

---

## 📦 Variables: var vs let vs const

```js
// var — Function scoped, hoisted, can be redeclared (AVOID in modern JS)
var name = "Alice";
var name = "Bob"; // No error — dangerous!

// let — Block scoped, not hoisted (TDZ), cannot be redeclared
let age = 25;
age = 26; // ✅ Can be reassigned
// let age = 30; // ❌ SyntaxError: already declared

// const — Block scoped, must be initialized, cannot be reassigned
const PI = 3.14159;
// PI = 3; // ❌ TypeError: Assignment to constant variable
```

> **Rule of Thumb:** Always use `const` by default. Use `let` when you know the value will change. Never use `var`.

### Real-World Scenario: Shopping Cart

```js
const TAX_RATE = 0.18; // Never changes — use const
let cartTotal = 0; // Changes as items added — use let
let itemCount = 0;

function addItem(price) {
  cartTotal += price;
  itemCount++;
  const totalWithTax = cartTotal * (1 + TAX_RATE); // Calculated per call
  console.log(`Items: ${itemCount}, Total: $${totalWithTax.toFixed(2)}`);
}

addItem(29.99); // Items: 1, Total: $35.39
addItem(14.99); // Items: 2, Total: $52.99
```

---

## 🔢 JavaScript's 8 Data Types

### Primitive Types (7)

```js
// 1. Number — integers and floats are the same type
let price = 9.99;
let quantity = 3;
let infinity = Infinity;
let notANumber = NaN;

// 2. String
let greeting = "Hello";
let name = "World";
let template = `${greeting}, ${name}!`; // Template literal

// 3. Boolean
let isLoggedIn = true;
let hasDiscount = false;

// 4. undefined — variable declared but not assigned
let user;
console.log(user); // undefined

// 5. null — intentional absence of value
let selectedProduct = null; // Nothing selected yet

// 6. Symbol — unique identifier (ES6)
const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2); // false — always unique

// 7. BigInt — integers beyond Number.MAX_SAFE_INTEGER
const bigNumber = 9007199254740991n;
const bigger = bigNumber + 1n;
```

### Reference Type (1)

```js
// 8. Object (includes Arrays, Functions, Dates, etc.)
const user = {
  name: "Alice",
  age: 30,
  isAdmin: false,
};

const scores = [95, 87, 92, 78]; // Array is an Object
const greet = function () {}; // Function is an Object
```

---

## 🔍 typeof Operator

```js
typeof 42; // "number"
typeof "hello"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object"  ← Famous bug in JS (never fixed for legacy reasons)
typeof Symbol(); // "symbol"
typeof 42n; // "bigint"
typeof {}; // "object"
typeof []; // "object"  ← Arrays are objects!
typeof function () {}; // "function"

// How to check for null properly:
const value = null;
value === null; // true ✅

// How to check for array:
Array.isArray([]); // true ✅
```

---

## 🔄 Type Coercion — JavaScript's Wild Side

JavaScript automatically converts types in certain situations. This is called **implicit coercion**.

### String Coercion

```js
// + with a string converts everything to string
"5" + 3; // "53"  (not 8!)
"5" + true; // "5true"
"5" + null; // "5null"
"" + false; // "false"

// Real-world bug this can cause:
function getTotal(price, quantity) {
  return price * quantity; // ✅ * forces numeric conversion
}

// From a form input (everything is a string!):
const priceInput = "29.99"; // from <input>
const qty = "3";
console.log(priceInput + qty); // "29.993" ❌ Bug!
console.log(Number(priceInput) * Number(qty)); // 89.97 ✅
```

### Numeric Coercion

```js
// Arithmetic operators (except +) convert to numbers
"6" - 2; // 4
"6" * "2"; // 12
"6" / "2"; // 3
true + 1; // 2  (true = 1)
false + 1; // 1  (false = 0)
null + 1; // 1  (null = 0)
undefined + 1; // NaN

// Number() explicit conversion
Number("42"); // 42
Number(""); // 0
Number("hello"); // NaN
Number(true); // 1
Number(false); // 0
Number(null); // 0
Number(undefined); // NaN
```

### Truthiness & Falsiness

```js
// Falsy values (there are exactly 6):
false, 0, "", null, undefined, NaN

// Everything else is truthy, including:
"0"        // truthy string!
[]         // truthy empty array!
{}         // truthy empty object!
-1         // truthy negative!

// Real-world usage:
function greetUser(name) {
  if (name) { // Checks if name is truthy (not empty string, null, undefined)
    return `Hello, ${name}!`;
  }
  return "Hello, Guest!";
}

greetUser("Alice");  // "Hello, Alice!"
greetUser("");       // "Hello, Guest!"
greetUser(null);     // "Hello, Guest!"
```

### Loose (==) vs Strict (===) Equality

```js
// == performs type coercion before comparison
0 == false; // true  ⚠️
"" == false; // true  ⚠️
null == undefined; // true ⚠️
"5" == 5; // true  ⚠️

// === checks value AND type — always use this!
0 === false; // false ✅
"5" === 5; // false ✅
null === undefined; // false ✅

// Rule: ALWAYS use === unless you have a specific reason for ==
```

---

## 🎤 Interview Questions — Lesson 02

**Q1: What is the difference between `null` and `undefined`?**

> **Answer:** `undefined` means a variable has been declared but no value has been assigned — it's the JS engine's way of saying "this has no value yet." `null` is an intentional assignment — a developer explicitly set it to represent "no value." Use `null` to reset a variable; let `undefined` occur naturally.

**Q2: Why does `typeof null` return `"object"`?**

> **Answer:** This is a historical bug from JavaScript's first implementation in 1995. Values were stored with a type tag, and null was represented as a null pointer (0x00). The object type tag was also 0, so `typeof null` incorrectly returned `"object"`. It was never fixed to avoid breaking existing code.

**Q3: What is the difference between `==` and `===`?**

> **Answer:** `==` (loose equality) performs type coercion before comparison. `===` (strict equality) compares both value and type without coercion. Always prefer `===` to avoid unexpected behavior like `0 == false` being `true`.

**Q4: Why is `"0"` truthy but `0` is falsy?**

> **Answer:** In JavaScript, only 6 values are falsy: `false`, `0`, `""` (empty string), `null`, `undefined`, and `NaN`. `"0"` is a non-empty string, and all non-empty strings are truthy — regardless of their content. This is a common gotcha when parsing form inputs.

**Q5: What is `NaN` and how do you check for it?**

> **Answer:** `NaN` (Not a Number) is the result of an invalid numeric operation like `parseInt("hello")` or `0/0`. Paradoxically, `NaN !== NaN` (NaN is not equal to itself), making `NaN === NaN` false. Use `Number.isNaN(value)` to check for NaN (not the global `isNaN()` which coerces the argument first).

```js
Number.isNaN(NaN); // true ✅
Number.isNaN("hello"); // false ✅ (string, not NaN)
isNaN("hello"); // true ⚠️ (coerces to Number first: NaN)
```

---

---

# Lesson 03 — Operators, Expressions & Control Flow

## 🎯 Learning Objectives

- Master all JavaScript operators including lesser-known ones
- Write conditional logic with `if/else`, `switch`, and ternary
- Control loops with `for`, `while`, `for...of`, `for...in`
- Use `break`, `continue`, and labeled statements

---

## ➕ Operators Deep Dive

### Arithmetic Operators

```js
let x = 10;
console.log(x + 3); // 13
console.log(x - 3); // 7
console.log(x * 3); // 30
console.log(x / 3); // 3.333...
console.log(x % 3); // 1 — modulo (remainder)
console.log(x ** 3); // 1000 — exponentiation (ES2016)
console.log(++x); // 11 — pre-increment
console.log(x++); // 11 — post-increment (returns, then increments)
console.log(x); // 12
```

### Logical Operators & Short-Circuit Evaluation

```js
// && — returns first falsy or last value
true && "hello"; // "hello"
false && "hello"; // false
null && "hello"; // null
"user" && "admin"; // "admin"

// || — returns first truthy or last value
false || "default"; // "default"
"Alice" || "Guest"; // "Alice"
null || undefined; // undefined (both falsy, returns last)

// ?? — Nullish Coalescing (ES2020) — only null/undefined triggers fallback
null ?? "default"; // "default"
undefined ?? "default"; // "default"
0 ?? "default"; // 0 ← Does NOT treat 0 as falsy!
"" ?? "default"; // "" ← Does NOT treat "" as falsy!

// Real-World: User settings with defaults
const userSettings = {
  theme: "", // empty string — intentional
  fontSize: 0, // zero — intentional
  language: null, // not set
};

// Bad (loses intentional 0 and ""):
const theme = userSettings.theme || "dark"; // "dark" ❌ (overwrote "")
const size = userSettings.fontSize || 16; // 16 ❌ (overwrote 0)

// Good:
const theme2 = userSettings.theme ?? "dark"; // "" ✅
const size2 = userSettings.fontSize ?? 16; // 0 ✅
const lang = userSettings.language ?? "en"; // "en" ✅
```

### Optional Chaining `?.`

```js
// Without optional chaining — crashes if user is null
const city = user.address.city; // TypeError if user or address is null

// With optional chaining — returns undefined instead of crashing
const city = user?.address?.city;
const method = user?.getProfile?.();

// Real-world: API response handling
function displayUserCity(apiResponse) {
  const city = apiResponse?.data?.user?.address?.city ?? "City not available";
  console.log(city);
}

displayUserCity(null); // "City not available"
displayUserCity({ data: { user: {} } }); // "City not available"
displayUserCity({ data: { user: { address: { city: "Karachi" } } } }); // "Karachi"
```

---

## 🔀 Control Flow

### if / else if / else

```js
// Real-World: E-commerce discount logic
function getDiscountMessage(cartTotal, isMember) {
  if (cartTotal >= 5000 && isMember) {
    return "20% discount applied! (Premium Member)";
  } else if (cartTotal >= 5000) {
    return "15% discount applied!";
  } else if (cartTotal >= 2000) {
    return "10% discount applied!";
  } else if (isMember) {
    return "5% member discount applied!";
  } else {
    return "No discount. Add more items or become a member!";
  }
}

console.log(getDiscountMessage(6000, true)); // 20% discount
console.log(getDiscountMessage(6000, false)); // 15% discount
console.log(getDiscountMessage(500, true)); // 5% member discount
```

### switch Statement

```js
// Real-World: Order status tracker
function getOrderStatus(statusCode) {
  switch (statusCode) {
    case "PENDING":
      return "⏳ Order placed, awaiting confirmation";
    case "CONFIRMED":
      return "✅ Order confirmed";
    case "SHIPPING":
      return "🚚 Order is on its way";
    case "DELIVERED":
      return "📦 Order delivered";
    case "CANCELLED":
      return "❌ Order cancelled";
    default:
      return "❓ Unknown status";
  }
}

// Fall-through (intentional):
function getWorkDayType(day) {
  switch (day) {
    case "Monday":
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
    case "Friday":
      return "Weekday";
    case "Saturday":
    case "Sunday":
      return "Weekend";
    default:
      return "Invalid day";
  }
}
```

### Ternary Operator

```js
// Syntax: condition ? valueIfTrue : valueIfFalse
const age = 20;
const access = age >= 18 ? "Allowed" : "Denied";

// Real-world: React-style conditional rendering
const isLoggedIn = true;
const headerText = isLoggedIn ? "Welcome back, Alice!" : "Please sign in";
const buttonLabel = isLoggedIn ? "Logout" : "Login";

// Nested ternary (use sparingly — hurts readability)
const score = 75;
const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
```

---

## 🔁 Loops

### for Loop

```js
// Classic for loop
for (let i = 0; i < 5; i++) {
  console.log(`Iteration ${i}`);
}

// Real-world: Generate invoice line items
const items = [
  { name: "Laptop", price: 75000 },
  { name: "Mouse", price: 1500 },
  { name: "Keyboard", price: 3500 },
];

let total = 0;
for (let i = 0; i < items.length; i++) {
  total += items[i].price;
  console.log(`${i + 1}. ${items[i].name} — Rs. ${items[i].price}`);
}
console.log(`Total: Rs. ${total}`);
```

### while & do...while

```js
// while — check before executing
let attempts = 0;
while (attempts < 3) {
  console.log(`Attempt ${attempts + 1}`);
  attempts++;
}

// do...while — execute at least once, then check
let input;
do {
  input = prompt("Enter a number greater than 0:"); // hypothetical input
} while (Number(input) <= 0);
```

### for...of (Modern — for iterables)

```js
const fruits = ["apple", "banana", "cherry"];

for (const fruit of fruits) {
  console.log(fruit); // apple, banana, cherry
}

// With index using entries():
for (const [index, fruit] of fruits.entries()) {
  console.log(`${index}: ${fruit}`);
}

// Works on strings too:
for (const char of "Hello") {
  console.log(char); // H, e, l, l, o
}
```

### for...in (for object keys)

```js
const user = { name: "Alice", age: 30, city: "Karachi" };

for (const key in user) {
  console.log(`${key}: ${user[key]}`);
  // name: Alice
  // age: 30
  // city: Karachi
}

// ⚠️ Warning: for...in also iterates inherited properties
// Use hasOwnProperty check for safety:
for (const key in user) {
  if (user.hasOwnProperty(key)) {
    console.log(key, user[key]);
  }
}
```

### break & continue

```js
// break — exit loop completely
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i); // 0, 1, 2, 3, 4
}

// continue — skip current iteration
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) continue; // skip even numbers
  console.log(i); // 1, 3, 5, 7, 9
}

// Real-world: Find first out-of-stock product
const products = [
  { name: "Laptop", inStock: true },
  { name: "Phone", inStock: true },
  { name: "Tablet", inStock: false },
  { name: "Watch", inStock: true },
];

let firstOutOfStock = null;
for (const product of products) {
  if (!product.inStock) {
    firstOutOfStock = product.name;
    break; // No need to check rest
  }
}
console.log(firstOutOfStock); // "Tablet"
```

---

## 🎤 Interview Questions — Lesson 03

**Q1: What is short-circuit evaluation and how is it used in practice?**

> **Answer:** Short-circuit evaluation means JS stops evaluating a logical expression as soon as the result is determined. `&&` stops at the first falsy value; `||` stops at the first truthy value. This is widely used for default values (`config || {}`) and conditional execution (`isAdmin && deleteUser()`).

**Q2: What's the difference between `||` and `??`?**

> **Answer:** `||` returns the right-hand side if the left is **falsy** (includes `0`, `""`, `false`). `??` returns the right-hand side only if the left is **null or undefined** — it respects intentional falsy values like `0` and `""`. Use `??` when `0` or empty string are valid values.

**Q3: When would you use `for...of` vs `for...in`?**

> **Answer:** Use `for...of` to iterate over **values** of iterables (arrays, strings, Maps, Sets). Use `for...in` to iterate over **keys** of objects. Never use `for...in` on arrays as it can include inherited prototype properties and the order isn't guaranteed in older engines.

**Q4: What is the difference between `break` and `continue`?**

> **Answer:** `break` immediately terminates the entire loop. `continue` skips the rest of the current iteration and moves to the next one. Both work in `for`, `while`, and `do...while` loops.

---

---

# Lesson 04 — Functions Deep Dive

## 🎯 Learning Objectives

- Understand all 4 ways to define functions
- Master parameters, default values, and rest params
- Understand first-class functions and higher-order functions
- Learn IIFE pattern and pure vs impure functions

---

## 📝 Function Declaration vs Expression vs Arrow

```js
// 1. Function Declaration — hoisted, can be called before definition
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("Alice")); // Works even if called before declaration

// 2. Function Expression — not hoisted
const greet = function (name) {
  return `Hello, ${name}!`;
};

// 3. Named Function Expression — useful for recursion and stack traces
const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1); // Can reference itself by name
};

// 4. Arrow Function (ES6) — concise, no own `this`
const greet = (name) => `Hello, ${name}!`;
const square = (n) => n * n; // Single param: no parens needed
const double = (n) => n * 2;
const getUser = () => ({ name: "Alice" }); // Returning object: wrap in ()
```

### Arrow vs Regular — The `this` Difference

```js
const timer = {
  seconds: 0,

  // Regular function — `this` is the calling object
  startRegular: function () {
    setInterval(function () {
      this.seconds++; // ❌ `this` is undefined/window here!
      console.log(this.seconds);
    }, 1000);
  },

  // Arrow function — inherits `this` from surrounding context
  startArrow: function () {
    setInterval(() => {
      this.seconds++; // ✅ `this` correctly refers to timer
      console.log(this.seconds);
    }, 1000);
  },
};
```

---

## 🔧 Parameters & Arguments

```js
// Default Parameters (ES6)
function createProfile(name, role = "user", theme = "light") {
  return { name, role, theme };
}

createProfile("Alice"); // { name: "Alice", role: "user", theme: "light" }
createProfile("Bob", "admin"); // { name: "Bob", role: "admin", theme: "light" }
createProfile("Carol", "admin", "dark"); // { name: "Carol", role: "admin", theme: "dark" }

// Rest Parameters — collect remaining args into array
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
sum(1, 2, 3, 4, 5); // 15
sum(10, 20); // 30

// Real-World: Flexible logging function
function log(level, ...messages) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level.toUpperCase()}]`, ...messages);
}

log("info", "Server started on port 3000");
log("error", "Database connection failed", "Retrying...");
```

---

## 🏗️ First-Class & Higher-Order Functions

In JavaScript, functions are **first-class citizens** — they can be:

- Stored in variables
- Passed as arguments
- Returned from other functions

```js
// Storing function in variable
const add = (a, b) => a + b;

// Passing function as argument (callback)
function applyOperation(a, b, operation) {
  return operation(a, b);
}

applyOperation(5, 3, add); // 8
applyOperation(5, 3, (a, b) => a * b); // 15
applyOperation(5, 3, Math.max); // 5

// Returning function from function (creates a closure)
function multiplier(factor) {
  return (number) => number * factor;
}

const double = multiplier(2);
const triple = multiplier(3);

double(5); // 10
triple(5); // 15
```

### Real-World: Event System

```js
// Higher-order function pattern used everywhere in JS
function createLogger(prefix) {
  return function (message) {
    console.log(`[${prefix}] ${message}`);
  };
}

const apiLogger = createLogger("API");
const authLogger = createLogger("AUTH");
const dbLogger = createLogger("DB");

apiLogger("GET /users"); // [API] GET /users
authLogger("User logged in"); // [AUTH] User logged in
dbLogger("Query executed"); // [DB] Query executed
```

---

## ⚡ IIFE — Immediately Invoked Function Expression

```js
// Syntax
(function () {
  // This runs immediately!
  console.log("IIFE executed!");
})();

// With arrow function
(() => {
  const secret = "This stays private";
  console.log(secret);
})();

// console.log(secret); // ReferenceError — not accessible outside

// Real-World: Module pattern (before ES modules)
const ShoppingCart = (function () {
  let items = []; // Private state

  return {
    addItem(item) {
      items.push(item);
    },
    getItems() {
      return [...items];
    }, // Return copy
    getTotal() {
      return items.reduce((sum, item) => sum + item.price, 0);
    },
  };
})();

ShoppingCart.addItem({ name: "Book", price: 500 });
ShoppingCart.addItem({ name: "Pen", price: 50 });
console.log(ShoppingCart.getTotal()); // 550
// items array is private — can't access directly
```

---

## ✨ Pure vs Impure Functions

```js
// Pure Function — same input, always same output; no side effects
function add(a, b) {
  return a + b;
}

function formatPrice(price, currency = "Rs.") {
  return `${currency} ${price.toFixed(2)}`;
}

// Impure Function — depends on or modifies external state
let total = 0;
function addToTotal(amount) {
  // Side effect: modifies external variable
  total += amount;
}

// Better: pure version
function calculateTotal(currentTotal, amount) {
  return currentTotal + amount;
}

// Real-World: React uses pure components for predictability
// Pure component = same props → same output, no side effects
```

---

## 🎤 Interview Questions — Lesson 04

**Q1: What is the difference between function declarations and function expressions?**

> **Answer:** Function declarations are hoisted entirely — you can call them before their definition in code. Function expressions are not hoisted; the variable is hoisted (as `undefined`), but not the function. Also, function declarations create a function in the current scope; expressions are often anonymous or assigned to variables.

**Q2: When should you use arrow functions vs regular functions?**

> **Answer:** Use arrow functions for: concise callbacks, array methods (`map`, `filter`), when you want to inherit `this` from the outer scope. Use regular functions for: methods on objects (need their own `this`), constructors (arrow functions can't be used with `new`), when you need `arguments` object.

**Q3: What is a higher-order function? Give examples.**

> **Answer:** A higher-order function either takes a function as an argument or returns a function. Examples: `Array.map()`, `Array.filter()`, `Array.reduce()`, `setTimeout()`, `addEventListener()`. They enable composition, reusability, and functional programming patterns.

**Q4: What is an IIFE and why would you use it?**

> **Answer:** An IIFE (Immediately Invoked Function Expression) is a function that runs as soon as it's defined. It creates a private scope, avoiding variable pollution of the global namespace. Used for the module pattern before ES6 modules, initialization code, and creating isolated execution contexts.

**Q5: What makes a function "pure"?**

> **Answer:** A pure function: (1) always returns the same output for the same input, (2) has no side effects (doesn't modify external state, no API calls, no console.log). Pure functions are predictable, testable, and are the foundation of functional programming. React encourages pure components and reducers.

---

---

# Lesson 05 — Scope, Hoisting & the Temporal Dead Zone

## 🎯 Learning Objectives

- Understand global, function, and block scope
- Know exactly how hoisting works for `var`, `let`, `const`, and functions
- Understand the Temporal Dead Zone (TDZ)
- Avoid common scope-related bugs

---

## 🔭 Types of Scope

```js
// Global Scope
const APP_NAME = "MyApp"; // Accessible everywhere

function processUser() {
  // Function Scope
  const userId = 123; // Only accessible inside processUser

  if (true) {
    // Block Scope (let/const only)
    let blockVar = "I'm block-scoped";
    var funcVar = "I'm function-scoped"; // Escapes the if block!

    console.log(blockVar); // ✅
    console.log(funcVar); // ✅
  }

  // console.log(blockVar); // ❌ ReferenceError
  console.log(funcVar); // ✅ var escapes block!
}

// Scope chain — inner scope can access outer scope
function outer() {
  const x = 10;

  function inner() {
    const y = 20;
    console.log(x + y); // ✅ Can access outer's x
  }

  // console.log(y); // ❌ Cannot access inner's y
  inner();
}
```

---

## 🏗️ Hoisting — The Full Truth

JavaScript "hoists" (moves to top) declarations before executing code.

```js
// var — declaration hoisted, NOT initialization
console.log(name); // undefined (not ReferenceError!)
var name = "Alice";
console.log(name); // "Alice"

// This is how JS sees it internally:
var name; // hoisted to top
console.log(name); // undefined
name = "Alice";

// Function Declaration — fully hoisted (declaration + body)
greet(); // ✅ Works! "Hello!"
function greet() {
  console.log("Hello!");
}

// Function Expression — only variable declaration is hoisted
greet(); // ❌ TypeError: greet is not a function
var greet = function () {
  console.log("Hello!");
};
// Internally: var greet = undefined; greet(); ← TypeError

// let/const — hoisted but NOT initialized (TDZ!)
console.log(age); // ❌ ReferenceError: Cannot access 'age' before initialization
let age = 25;
```

---

## ⚡ Temporal Dead Zone (TDZ)

The TDZ is the period between when a `let`/`const` variable enters scope (is hoisted) and when it's initialized with a value.

```js
{
  // TDZ starts for `user`
  console.log(typeof user); // ❌ ReferenceError (not "undefined" like var!)

  let user = "Alice"; // TDZ ends here
  console.log(user); // "Alice" ✅
}

// Why TDZ exists: To catch programmer errors
// Without TDZ, using let before declaration would silently give undefined
// With TDZ, you get an explicit error

// Real-World Bug with var (TDZ prevents this with let/const):
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3 ← Bug!
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2 ← Correct!
}
// Each iteration of let creates a new binding — no sharing
```

---

## 🎤 Interview Questions — Lesson 05

**Q1: What is hoisting? Does `let` get hoisted?**

> **Answer:** Hoisting is JavaScript's behavior of moving declarations to the top of their scope before code executes. `var` declarations and function declarations are hoisted and initialized (var with `undefined`, functions with their full definition). `let` and `const` ARE hoisted, but they enter the **Temporal Dead Zone** — they're not accessible until their declaration line is reached, throwing a ReferenceError if accessed early.

**Q2: What is the Temporal Dead Zone?**

> **Answer:** The TDZ is the period between when a `let`/`const` variable is hoisted (scope entered) and when its declaration is reached in code. During this period, accessing the variable throws a ReferenceError. This was intentionally designed to catch use-before-declaration bugs that were silently masked with `var`.

**Q3: Why does this `var` loop print `3, 3, 3` instead of `0, 1, 2`?**

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

> **Answer:** Because `var` is function-scoped, all 3 iterations share the same `i` variable. By the time the `setTimeout` callbacks run (100ms later), the loop has finished and `i` is 3. Fix: use `let` (creates new binding per iteration) or use `var` with an IIFE to capture the current value.

---

---

# Lesson 06 — Closures: The Heart of JavaScript

## 🎯 Learning Objectives

- Deeply understand what closures are and why they exist
- Use closures for data privacy, factories, and memoization
- Understand the closure-loop problem and solutions
- See closures as the foundation of React hooks

---

## 🔐 What is a Closure?

A closure is a function that **remembers and accesses variables from its outer (lexical) scope** even after that outer function has returned.

```js
function makeCounter() {
  let count = 0; // This variable is "closed over"

  return {
    increment() {
      count++;
    },
    decrement() {
      count--;
    },
    getCount() {
      return count;
    },
  };
}

const counter = makeCounter();
counter.increment(); // count = 1
counter.increment(); // count = 2
counter.increment(); // count = 3
counter.decrement(); // count = 2
console.log(counter.getCount()); // 2

// count is NOT accessible from outside — true privacy!
// console.log(count); // ❌ ReferenceError
```

> **Mental Model:** A closure is like a backpack. When a function is created, it packs its surrounding scope into a backpack and carries it wherever it goes.

---

## 🏭 Closure Use Cases

### 1. Data Privacy / Encapsulation

```js
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private state
  const transactions = []; // Private history

  return {
    deposit(amount) {
      if (amount <= 0) throw new Error("Amount must be positive");
      balance += amount;
      transactions.push({ type: "deposit", amount, balance });
      return balance;
    },

    withdraw(amount) {
      if (amount > balance) throw new Error("Insufficient funds");
      balance -= amount;
      transactions.push({ type: "withdrawal", amount, balance });
      return balance;
    },

    getBalance() {
      return balance;
    },
    getHistory() {
      return [...transactions];
    }, // Return copy
  };
}

const account = createBankAccount(1000);
account.deposit(500); // balance: 1500
account.withdraw(200); // balance: 1300
console.log(account.getBalance()); // 1300
// Cannot access balance directly — it's private!
```

### 2. Function Factories

```js
// Create specialized functions
function createTaxCalculator(taxRate) {
  return function (price) {
    return price * (1 + taxRate);
  };
}

const calculateGST = createTaxCalculator(0.18); // 18% GST
const calculateVAT = createTaxCalculator(0.2); // 20% VAT

calculateGST(1000); // 1180
calculateGST(500); // 590
calculateVAT(1000); // 1200

// Each function "remembers" its own taxRate
```

### 3. Memoization (Caching Expensive Computations)

```js
function memoize(fn) {
  const cache = {}; // Closed over — persists between calls

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache[key] !== undefined) {
      console.log("Cache hit!");
      return cache[key];
    }

    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Expensive Fibonacci
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoFib = memoize(fibonacci);
memoFib(40); // Slow first time
memoFib(40); // Cache hit! Instant
```

### 4. Partial Application

```js
function partial(fn, ...presetArgs) {
  return function (...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function sendEmail(from, to, subject, body) {
  console.log(`From: ${from} | To: ${to} | Subject: ${subject}`);
}

// Pre-fill the "from" argument
const sendFromAdmin = partial(sendEmail, "admin@myapp.com");
sendFromAdmin("user@example.com", "Welcome!", "Thanks for joining!");
```

---

## ⚠️ The Classic Closure-Loop Problem

```js
// Problem with var
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 3, 3, 3 — all share same i
  }, i * 1000);
}

// Solution 1: let (creates new binding per iteration)
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 0, 1, 2 ✅
  }, i * 1000);
}

// Solution 2: IIFE (captures i by value)
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j); // 0, 1, 2 ✅
    }, j * 1000);
  })(i);
}
```

---

## 🎤 Interview Questions — Lesson 06

**Q1: What is a closure? Can you give a practical example?**

> **Answer:** A closure is a function that retains access to variables in its outer lexical scope even after the outer function has returned. Practical examples: counter functions with private state, `setTimeout` callbacks, React's `useState` hook (each component instance closes over its own state), event handlers that need access to their surrounding variables.

**Q2: How do closures enable data privacy in JavaScript?**

> **Answer:** By wrapping private data in a function scope and only returning functions that can manipulate that data, closures prevent direct external access. The private variables live on in memory because the returned functions hold references to them, but no external code can touch them directly. This is the module pattern.

**Q3: How are closures related to React hooks?**

> **Answer:** React hooks rely heavily on closures. When you call `useState`, the state variable and setter are closed over by your component function. Event handlers and `useEffect` callbacks close over the state values they reference at the time of creation. This is why stale closures (referencing old state) are a common React bug.

**Q4: What is a stale closure?**

> **Answer:** A stale closure occurs when a function captures a variable that later changes, but the function still references the old value. Common in `setInterval` or `useEffect` with dependencies. Solution: ensure the closure captures the latest value, use `useRef` in React, or include correct dependencies in `useEffect`.

---

---

# Lesson 07 — Arrays & Array Methods (Deep Dive)

## 🎯 Learning Objectives

- Master all essential array methods
- Understand method chaining
- Know when to use which method
- Build real data pipelines

---

## 📋 Array Fundamentals

```js
// Creating arrays
const empty = [];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "hello", true, null, { name: "Alice" }];
const from = Array.from("Hello"); // ["H", "e", "l", "l", "o"]
const filled = Array(5).fill(0); // [0, 0, 0, 0, 0]

// Access & modify
numbers[0]; // 1
numbers[numbers.length - 1]; // 5 (last element)
numbers.at(-1); // 5 (modern way — negative index)
```

---

## 🔧 Mutating Methods (modify original array)

```js
const arr = [1, 2, 3];

// push/pop — end of array
arr.push(4, 5); // [1,2,3,4,5] returns new length
arr.pop(); // [1,2,3,4] returns removed element (5)

// unshift/shift — beginning of array
arr.unshift(0); // [0,1,2,3,4] returns new length
arr.shift(); // [1,2,3,4] returns removed element (0)

// splice — insert/remove anywhere
arr.splice(1, 0, 1.5); // Insert 1.5 at index 1: [1,1.5,2,3,4]
arr.splice(1, 2); // Remove 2 elements at index 1: [1,3,4]
arr.splice(1, 1, 99, 100); // Replace 1 element with 99,100: [1,99,100,4]

// sort — sorts in place (default: alphabetical string sort!)
[3, 1, 4, 1, 5].sort(); // [1,1,3,4,5] (works for single digits)
[10, 9, 2, 21, 3].sort(); // [10, 2, 21, 3, 9] ❌ String sort!
[10, 9, 2, 21, 3].sort((a, b) => a - b); // [2, 3, 9, 10, 21] ✅ Numeric sort
[10, 9, 2, 21, 3].sort((a, b) => b - a); // [21, 10, 9, 3, 2] Descending

// reverse
[1, 2, 3].reverse(); // [3, 2, 1]
```

---

## ✨ Non-Mutating Methods (return new array)

### map — Transform each element

```js
// Syntax: array.map(element => newElement)
const prices = [100, 200, 300, 400];
const withGST = prices.map((price) => price * 1.18);
// [118, 236, 354, 472]

// Real-World: Transform API data for UI
const apiUsers = [
  { first_name: "Alice", last_name: "Smith", age: 30 },
  { first_name: "Bob", last_name: "Jones", age: 25 },
];

const displayUsers = apiUsers.map((user) => ({
  fullName: `${user.first_name} ${user.last_name}`,
  age: user.age,
  isAdult: user.age >= 18,
}));

// [{ fullName: "Alice Smith", age: 30, isAdult: true }, ...]
```

### filter — Select elements matching condition

```js
const products = [
  { name: "Laptop", price: 75000, inStock: true },
  { name: "Phone", price: 25000, inStock: false },
  { name: "Tablet", price: 35000, inStock: true },
  { name: "Watch", price: 15000, inStock: false },
];

// Filter in-stock products under 50k
const availableUnder50k = products.filter((p) => p.inStock && p.price < 50000);

// [{ name: "Tablet", price: 35000, inStock: true }]
```

### reduce — Accumulate to single value

```js
// Syntax: array.reduce((accumulator, currentValue) => newAccumulator, initialValue)

const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, num) => acc + num, 0); // 15

// Real-World: Shopping cart total
const cart = [
  { name: "Book", price: 500, qty: 2 },
  { name: "Pen", price: 50, qty: 5 },
  { name: "Notebook", price: 150, qty: 3 },
];

const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
// 500*2 + 50*5 + 150*3 = 1000 + 250 + 450 = 1700

// Grouping with reduce:
const students = [
  { name: "Alice", grade: "A" },
  { name: "Bob", grade: "B" },
  { name: "Carol", grade: "A" },
  { name: "Dave", grade: "C" },
  { name: "Eve", grade: "B" },
];

const groupedByGrade = students.reduce((groups, student) => {
  const grade = student.grade;
  if (!groups[grade]) groups[grade] = [];
  groups[grade].push(student.name);
  return groups;
}, {});

// { A: ["Alice", "Carol"], B: ["Bob", "Eve"], C: ["Dave"] }
```

### find & findIndex

```js
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Carol" },
];

const user = users.find((u) => u.id === 2); // { id: 2, name: "Bob" }
const idx = users.findIndex((u) => u.id === 2); // 1
const noUser = users.find((u) => u.id === 99); // undefined (not -1)
```

### some & every

```js
const scores = [85, 92, 78, 96, 71];

scores.some((s) => s >= 90); // true  — at least one >= 90
scores.every((s) => s >= 70); // true  — all >= 70
scores.every((s) => s >= 80); // false — not all >= 80

// Real-World: Form validation
const fields = [
  { name: "email", valid: true },
  { name: "password", valid: false },
  { name: "username", valid: true },
];

const isFormValid = fields.every((f) => f.valid); // false
const hasAnyError = fields.some((f) => !f.valid); // true
```

### flat & flatMap

```js
// flat — flatten nested arrays
const nested = [1, [2, 3], [4, [5, 6]]];
nested.flat(); // [1, 2, 3, 4, [5, 6]] — 1 level deep
nested.flat(2); // [1, 2, 3, 4, 5, 6]  — 2 levels deep
nested.flat(Infinity); // Fully flatten

// flatMap — map then flatten 1 level
const sentences = ["Hello World", "Foo Bar"];
const words = sentences.flatMap((s) => s.split(" "));
// ["Hello", "World", "Foo", "Bar"]
```

---

## 🔗 Method Chaining — Data Pipelines

```js
// Real-World: E-commerce data processing
const orders = [
  { id: 1, status: "delivered", amount: 1500, userId: 101 },
  { id: 2, status: "pending", amount: 800, userId: 102 },
  { id: 3, status: "delivered", amount: 2200, userId: 101 },
  { id: 4, status: "cancelled", amount: 500, userId: 103 },
  { id: 5, status: "delivered", amount: 700, userId: 102 },
];

// "Calculate total revenue from delivered orders, sorted by amount"
const result = orders
  .filter((o) => o.status === "delivered") // Keep only delivered
  .sort((a, b) => b.amount - a.amount) // Sort descending
  .map((o) => ({ id: o.id, amount: o.amount })); // Pick relevant fields

// Revenue:
const revenue = orders
  .filter((o) => o.status === "delivered")
  .reduce((sum, o) => sum + o.amount, 0); // 4400
```

---

## 🎤 Interview Questions — Lesson 07

**Q1: What is the difference between `map`, `filter`, and `reduce`?**

> **Answer:** `map` transforms each element, returning a new array of the same length. `filter` selects elements matching a condition, returning a potentially shorter array. `reduce` accumulates all elements into a single value (sum, object, etc.). All three are non-mutating and take a callback function.

**Q2: Why should we prefer `map/filter/reduce` over `for` loops?**

> **Answer:** Functional array methods are declarative (you say _what_ you want, not _how_), are non-mutating (safer), are easily chainable, and produce more readable code. They also align with React's patterns for rendering lists. However, for very performance-critical code, `for` loops can be faster.

**Q3: What does `reduce` return if the array is empty and no initial value is provided?**

> **Answer:** It throws a `TypeError: Reduce of empty array with no initial value`. Always provide an initial value to `reduce` — it makes the function predictable and handles edge cases gracefully.

**Q4: How would you remove duplicates from an array?**

```js
// Using Set:
const arr = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(arr)]; // [1, 2, 3, 4]

// Using filter + indexOf:
const unique2 = arr.filter((val, idx) => arr.indexOf(val) === idx);
```

**Q5: What is the difference between `find` and `filter`?**

> **Answer:** `find` returns the **first** matching element (or `undefined`). `filter` returns an **array** of all matching elements (or empty array). Use `find` when you want a single item by ID; use `filter` when you need multiple matches.

---

---

# Lesson 08 — Objects, Prototypes & `this`

## 🎯 Learning Objectives

- Create and work with objects in all ways
- Understand prototype chain and inheritance
- Master `this` in all contexts
- Use `call`, `apply`, `bind`

---

## 📦 Object Creation Patterns

```js
// 1. Object Literal (most common)
const user = {
  name: "Alice",
  age: 30,
  greet() {
    return `Hi, I'm ${this.name}`;
  },
};

// 2. Constructor Function
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.greet = function () {
  return `Hi, I'm ${this.name}`;
};
const alice = new Person("Alice", 30);

// 3. Object.create()
const personProto = {
  greet() {
    return `Hi, I'm ${this.name}`;
  },
};
const alice = Object.create(personProto);
alice.name = "Alice";

// 4. Class (syntactic sugar over prototype — Lesson 16)
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    return `Hi, I'm ${this.name}`;
  }
}
```

---

## 🔗 Prototype Chain

```js
// Every object has a prototype (except Object.create(null))
const arr = [1, 2, 3];
// arr.__proto__ === Array.prototype
// Array.prototype.__proto__ === Object.prototype
// Object.prototype.__proto__ === null

// This is why arrays have .map, .filter, etc.
// They're defined on Array.prototype

// Checking prototype chain:
arr instanceof Array; // true
arr instanceof Object; // true (arrays are objects)

// hasOwnProperty — checks only own properties, not inherited
const user = { name: "Alice" };
user.hasOwnProperty("name"); // true (own property)
user.hasOwnProperty("toString"); // false (inherited from Object.prototype)
```

---

## 🎯 The `this` Keyword

`this` refers to the object that is **calling** the function (not where the function is defined, except for arrow functions).

```js
// 1. Method call — this = the object
const user = {
  name: "Alice",
  greet() {
    console.log(this.name); // "Alice"
  },
};
user.greet();

// 2. Regular function call — this = undefined (strict) or global
function show() {
  console.log(this); // undefined in strict mode, window in browser
}
show();

// 3. Arrow function — no own this, inherits from enclosing scope
const obj = {
  name: "Alice",
  regularFn: function () {
    const arrow = () => console.log(this.name); // "Alice" — inherits obj's this
    arrow();
  },
  arrowFn: () => {
    console.log(this.name); // undefined — this is outer (global) scope
  },
};

// 4. new keyword — this = newly created object
function Car(make) {
  this.make = make; // this = new empty object
}
const car = new Car("Toyota"); // car.make === "Toyota"
```

### `call`, `apply`, `bind`

```js
function introduce(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

const alice = { name: "Alice" };
const bob = { name: "Bob" };

// call — invoke immediately, pass args comma-separated
introduce.call(alice, "Hello", "!"); // "Hello, I'm Alice!"
introduce.call(bob, "Hey", "."); // "Hey, I'm Bob."

// apply — invoke immediately, pass args as array
introduce.apply(alice, ["Hello", "!"]); // "Hello, I'm Alice!"

// bind — returns NEW function with this bound (doesn't invoke)
const aliceIntro = introduce.bind(alice);
aliceIntro("Hi", "~"); // "Hi, I'm Alice~"

// Real-World: Fixing this in callbacks
const timer = {
  count: 0,
  start() {
    setInterval(this.tick.bind(this), 1000); // Bind to timer object
  },
  tick() {
    this.count++;
    console.log(this.count); // Works correctly!
  },
};
```

---

## 🔑 Object Methods

```js
const user = { name: "Alice", age: 30, city: "Karachi" };

// Keys, values, entries
Object.keys(user); // ["name", "age", "city"]
Object.values(user); // ["Alice", 30, "Karachi"]
Object.entries(user); // [["name","Alice"], ["age",30], ["city","Karachi"]]

// Merging objects
const defaults = { theme: "light", language: "en", fontSize: 14 };
const userPrefs = { theme: "dark", fontSize: 16 };
const settings = { ...defaults, ...userPrefs }; // Spread (right side wins)
// { theme: "dark", language: "en", fontSize: 16 }

// Also: Object.assign (mutates first argument)
const merged = Object.assign({}, defaults, userPrefs);

// Freezing (deep immutability requires libraries)
const config = Object.freeze({ API_URL: "https://api.example.com" });
// config.API_URL = "other"; // Silently fails (throws in strict mode)

// Check if property exists
"name" in user; // true (includes inherited)
user.hasOwnProperty("name"); // true (own only)
```

---

## 🎤 Interview Questions — Lesson 08

**Q1: What is the prototype chain?**

> **Answer:** Every object in JavaScript has an internal link to another object called its prototype. When you access a property, JS first looks on the object itself, then on its prototype, then the prototype's prototype, up the chain until it reaches `null`. This is how arrays have `.map()` — it's defined on `Array.prototype`, which every array's prototype points to.

**Q2: How does `this` work in JavaScript?**

> **Answer:** `this` is determined by _how_ a function is called, not where it's defined. In a method call, `this` is the object before the dot. In a regular function call, `this` is `undefined` (strict mode) or global. In an arrow function, `this` is inherited from the enclosing lexical scope. With `new`, `this` is the newly created object. `call/apply/bind` allow explicit `this` binding.

**Q3: What is the difference between `call`, `apply`, and `bind`?**

> **Answer:** All three set `this` explicitly. `call` invokes the function immediately with comma-separated arguments. `apply` invokes immediately with arguments as an array. `bind` returns a new function with `this` permanently bound but does NOT invoke it immediately. Use `bind` when you need to pass the function as a callback.

**Q4: How do you check if a property belongs to an object itself vs its prototype?**

> **Answer:** Use `hasOwnProperty()` — it returns `true` only for properties directly on the object, not inherited ones. The `in` operator returns `true` for both own and inherited properties.

---

---

# Lesson 09 — Destructuring, Spread & Rest

## 🎯 Learning Objectives

- Master array and object destructuring
- Use default values in destructuring
- Combine spread and rest in real patterns
- Apply these in React prop patterns

---

## 📦 Object Destructuring

```js
const user = {
  name: "Alice",
  age: 30,
  address: {
    city: "Karachi",
    country: "Pakistan",
  },
};

// Basic
const { name, age } = user;

// Renaming
const { name: userName, age: userAge } = user;

// Default values
const { name, role = "user" } = user; // role = "user" since it doesn't exist

// Nested destructuring
const {
  address: { city, country },
} = user;
console.log(city); // "Karachi"

// Rest in destructuring
const { name, ...rest } = user;
console.log(rest); // { age: 30, address: {...} }

// Function parameters (most common in React!)
function displayUser({ name, age, role = "member" }) {
  console.log(`${name} (${age}) - ${role}`);
}
displayUser(user); // Alice (30) - member
```

---

## 📋 Array Destructuring

```js
const colors = ["red", "green", "blue"];

// Basic
const [first, second, third] = colors;

// Skip elements
const [, , third] = colors; // "blue"

// Default values
const [a, b, c, d = "yellow"] = colors; // d = "yellow"

// Swap variables (classic!)
let x = 1,
  y = 2;
[x, y] = [y, x]; // x = 2, y = 1 — No temp variable needed!

// Rest
const [head, ...tail] = [1, 2, 3, 4, 5];
// head = 1, tail = [2, 3, 4, 5]

// Real-World: React useState
const [count, setCount] = useState(0);
const [user, setUser] = useState(null);
const [isLoading, setIsLoading] = useState(false);

// Multiple return values from function
function getMinMax(arr) {
  return [Math.min(...arr), Math.max(...arr)];
}
const [min, max] = getMinMax([3, 1, 4, 1, 5, 9, 2]);
// min = 1, max = 9
```

---

## 🌊 Spread Operator `...`

```js
// Spread array
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1,2,3,4,5,6]
const copy = [...arr1]; // Shallow copy

// Spread object
const base = { theme: "light", lang: "en" };
const extended = { ...base, lang: "ar", fontSize: 14 };
// { theme: "light", lang: "ar", fontSize: 14 } — lang overridden

// Spread in function calls
function add(a, b, c) {
  return a + b + c;
}
const nums = [1, 2, 3];
add(...nums); // Same as add(1, 2, 3)

Math.max(...[5, 3, 8, 1]); // 8

// Real-World: Immutable state updates (React pattern)
const state = { user: "Alice", count: 0, theme: "dark" };

// Update count immutably:
const newState = { ...state, count: state.count + 1 };

// Update nested object immutably:
const state2 = {
  user: { name: "Alice", age: 30 },
  settings: { theme: "dark" },
};

const updatedState = {
  ...state2,
  user: { ...state2.user, age: 31 }, // Only update age
};
```

---

## 🎤 Interview Questions — Lesson 09

**Q1: What is the difference between spread and rest?**

> **Answer:** They use the same `...` syntax but in opposite contexts. **Rest** collects multiple values into an array/object (in function parameters or destructuring patterns). **Spread** expands an iterable into individual values (in function calls or array/object literals). Rest gathers; spread expands.

**Q2: How do you deep clone an object using spread?**

> **Answer:** You can't — spread only creates a **shallow copy**. Nested objects still share references. For deep cloning: use `JSON.parse(JSON.stringify(obj))` (limited — loses functions, dates, etc.), `structuredClone(obj)` (modern API), or a library like Lodash's `_.cloneDeep()`.

**Q3: How does destructuring help with React props?**

> **Answer:** Component functions receive a single `props` object. Destructuring in the parameter list lets you directly name the values you need: `function Button({ label, onClick, disabled = false })`. This is cleaner than `props.label`, enables default values, and makes the component's interface explicit.

---

---

# Lesson 10 — ES6+ Modern JavaScript Features

## 🎯 Learning Objectives

- Template literals (tagged templates)
- Symbols, Iterators, Generators
- WeakMap, WeakSet, Map, Set
- Optional chaining and nullish coalescing (revisited in depth)
- `Promise.all`, `Promise.race`, `Promise.allSettled`

---

## 🏷️ Template Literals

```js
const name = "Alice";
const age = 30;

// Multi-line strings
const html = `
  <div class="user">
    <h1>${name}</h1>
    <p>Age: ${age}</p>
    <p>Adult: ${age >= 18 ? "Yes" : "No"}</p>
  </div>
`;

// Tagged Template Literals — advanced usage
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    return result + `<mark>${value}</mark>` + str;
  });
}

const product = "Laptop";
const price = 75000;
console.log(highlight`The ${product} costs Rs. ${price}`);
// "The <mark>Laptop</mark> costs Rs. <mark>75000</mark>"

// Real-World: SQL-safe query builder, styled-components in React
```

---

## 🗂️ Map & Set

```js
// Map — key-value pairs, any type as key (vs Object: only strings/symbols)
const userRoles = new Map();
userRoles.set("alice@email.com", "admin");
userRoles.set("bob@email.com", "user");
userRoles.set(123, "special"); // Number as key — not possible in plain object

userRoles.get("alice@email.com"); // "admin"
userRoles.has("alice@email.com"); // true
userRoles.size; // 3

// Iteration
for (const [email, role] of userRoles) {
  console.log(`${email}: ${role}`);
}

// Set — unique values only
const tags = new Set(["js", "react", "js", "node", "react"]);
// Set { "js", "react", "node" } — duplicates removed

tags.add("typescript");
tags.has("react"); // true
tags.delete("node");
tags.size; // 3

// Classic: Remove duplicates from array
const withDupes = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(withDupes)]; // [1, 2, 3, 4]

// Find intersection of two arrays
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const intersection = arr1.filter((x) => new Set(arr2).has(x)); // [3, 4]
```

---

## ♻️ Generators

```js
// Generator function — yields values one at a time
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const getId = idGenerator();
getId.next().value; // 1
getId.next().value; // 2
getId.next().value; // 3

// Real-World: Paginated data fetching
function* paginate(data, pageSize) {
  for (let i = 0; i < data.length; i += pageSize) {
    yield data.slice(i, i + pageSize);
  }
}

const allUsers = Array.from({ length: 100 }, (_, i) => `User ${i + 1}`);
const pages = paginate(allUsers, 10);

pages.next().value; // ["User 1", "User 2", ..., "User 10"]
pages.next().value; // ["User 11", ..., "User 20"]
```

---

## 🎤 Interview Questions — Lesson 10

**Q1: What is the difference between `Map` and a plain Object?**

> **Answer:** Maps allow any type as a key (objects, numbers, functions); plain objects only allow strings and symbols. Maps maintain insertion order. Maps have a `.size` property. Maps are iterable directly. Maps perform better for frequent additions/deletions. Use Maps when you need non-string keys or when order and size matter. Use plain objects for structured data (JSON-like).

**Q2: When would you use `Set` over an array?**

> **Answer:** Use `Set` when you need to store unique values and perform frequent membership checks (`.has()` is O(1) vs array `.includes()` which is O(n)). Also use Set for set operations (union, intersection, difference). Convert back to array with `[...set]` when you need array methods.

**Q3: What are Generators and what are they used for?**

> **Answer:** Generators are functions that can pause execution (`yield`) and resume later. They produce values lazily on demand. Use cases: infinite sequences (unique ID generator), lazy evaluation of large datasets, implementing custom iterators, coordinating async operations (before async/await). In Redux, `redux-saga` uses generators extensively.

---

---

# Lesson 11 — Asynchronous JavaScript

## 🎯 Learning Objectives

- Understand synchronous vs asynchronous execution
- Master callbacks and callback hell
- Use Promises with chaining
- Write clean code with async/await
- Handle errors in all async patterns

---

## ⚡ Synchronous vs Asynchronous

```js
// Synchronous — blocks execution
console.log("1");
console.log("2"); // Must wait for line above
console.log("3");
// Output: 1, 2, 3

// Asynchronous — non-blocking
console.log("1");
setTimeout(() => console.log("2"), 1000);
console.log("3");
// Output: 1, 3, 2 (2 comes after 1 second)

// Real-World: Why we need async
// Fetching data from an API takes time
// If it were synchronous, the browser would freeze until the data arrives!
```

---

## 😤 Callback Hell

```js
// The Problem: Nested callbacks become unreadable
function getUser(userId, callback) {
  setTimeout(() => callback({ id: userId, name: "Alice" }), 500);
}

function getOrders(user, callback) {
  setTimeout(() => callback([{ id: 1, total: 1500 }]), 500);
}

function getOrderDetails(orderId, callback) {
  setTimeout(() => callback({ id: orderId, items: ["Laptop"] }), 500);
}

// CALLBACK HELL 🔥
getUser(1, function (user) {
  getOrders(user, function (orders) {
    getOrderDetails(orders[0].id, function (details) {
      // Deeply nested — hard to read, maintain, and error-handle
      console.log(details);
    });
  });
});
```

---

## 🤝 Promises

```js
// Creating a Promise
const fetchUser = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: "Alice" }); // Success
      } else {
        reject(new Error("Invalid user ID")); // Failure
      }
    }, 500);
  });
};

// Using a Promise
fetchUser(1)
  .then((user) => {
    console.log(user); // { id: 1, name: "Alice" }
    return user.id; // Return value passed to next .then
  })
  .then((id) => console.log(`User ID: ${id}`))
  .catch((error) => console.error(error.message)) // Handles any rejection
  .finally(() => console.log("Done!")); // Runs regardless

// Promise Chaining — solving callback hell
fetchUser(1)
  .then((user) => getOrders(user))
  .then((orders) => getOrderDetails(orders[0].id))
  .then((details) => console.log(details))
  .catch((err) => console.error(err));
```

### Promise Combinators

```js
const p1 = fetch("/api/user");
const p2 = fetch("/api/posts");
const p3 = fetch("/api/comments");

// Promise.all — wait for ALL, fails if ANY fails
Promise.all([p1, p2, p3])
  .then(([user, posts, comments]) => {
    // All resolved
  })
  .catch((err) => {
    // One or more rejected — which one? Hard to tell
  });

// Promise.allSettled — wait for ALL, never fails (ES2020)
Promise.allSettled([p1, p2, p3]).then((results) => {
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log("Success:", result.value);
    } else {
      console.log("Failed:", result.reason);
    }
  });
});

// Promise.race — resolves/rejects as soon as FIRST settles
Promise.race([p1, timeoutPromise(5000)])
  .then((result) => console.log("First to finish:", result))
  .catch((err) => console.log("Timed out or failed"));

// Promise.any — resolves as soon as FIRST fulfills (ES2021)
Promise.any([p1, p2, p3])
  .then((firstSuccess) => console.log(firstSuccess))
  .catch((err) => console.log("All failed"));
```

---

## ✨ Async/Await — Clean Async Code

```js
// async function always returns a Promise
async function getUserData(userId) {
  try {
    const user = await fetchUser(userId); // Pauses here
    const orders = await getOrders(user); // Pauses here
    const details = await getOrderDetails(orders[0].id); // Pauses here
    return details;
  } catch (error) {
    console.error("Failed to get user data:", error.message);
    throw error; // Re-throw for caller to handle
  }
}

// Real-World: Complete data fetching with error handling
async function loadDashboard(userId) {
  try {
    // Parallel fetching (better performance!)
    const [user, analytics, notifications] = await Promise.all([
      fetchUser(userId),
      fetchAnalytics(userId),
      fetchNotifications(userId),
    ]);

    return { user, analytics, notifications };
  } catch (error) {
    if (error.status === 401) {
      redirectToLogin();
    } else {
      showErrorMessage("Failed to load dashboard");
    }
  }
}

// Async/Await with fetch API (real HTTP requests)
async function getGitHubUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch GitHub user:", error);
    throw error;
  }
}
```

---

## 🎤 Interview Questions — Lesson 11

**Q1: What is the difference between callbacks, Promises, and async/await?**

> **Answer:** Callbacks are functions passed to be called when async work completes — simple but leads to "callback hell" with nested operations. Promises represent a future value, enable chaining with `.then/.catch`, and are more readable. Async/await is syntactic sugar over Promises — it makes async code look synchronous, dramatically improving readability and error handling with try/catch.

**Q2: What are the states of a Promise?**

> **Answer:** A Promise has three states: **pending** (initial state, not resolved or rejected), **fulfilled** (completed successfully, `resolve` was called), **rejected** (failed, `reject` was called). Once settled (fulfilled or rejected), a Promise's state cannot change.

**Q3: What is the difference between `Promise.all` and `Promise.allSettled`?**

> **Answer:** `Promise.all` fails fast — if any Promise rejects, it immediately rejects. Use when you need ALL results and any failure should abort. `Promise.allSettled` waits for all Promises regardless, returning an array of result objects with `status: "fulfilled"` or `status: "rejected"`. Use when you want results from all, even if some fail.

**Q4: What happens if you forget `await` inside an async function?**

> **Answer:** Without `await`, the code proceeds immediately with the Promise object instead of its resolved value. You'll likely get `[object Promise]` or unexpected behavior. Always `await` Promises inside async functions, or use `.then()` explicitly.

**Q5: Can you use `await` outside of an async function?**

> **Answer:** Yes, in modern JavaScript (ES2022+) there's **Top-Level Await** — you can use `await` at the top level of ES modules without wrapping in an async function. This is used in modern tooling and Node.js with ES modules.

---

---

# Lesson 12 — The Event Loop, Microtasks & Macrotasks

## 🎯 Learning Objectives

- Visualize how the Event Loop works
- Understand the Call Stack and Web APIs
- Know the difference between microtasks and macrotasks
- Predict async code execution order

---

## 🔄 How the Event Loop Works

```
┌─────────────────────────────────────────────────────┐
│                   JavaScript Runtime                 │
│                                                      │
│   ┌──────────────┐     ┌───────────────────────┐    │
│   │  Call Stack  │     │      Web APIs          │    │
│   │              │     │  (setTimeout, fetch,   │    │
│   │   main()     │     │   DOM events, etc.)    │    │
│   │   func2()    │     └───────────┬───────────┘    │
│   │   func1()    │                 │                  │
│   └──────┬───────┘                 │                  │
│          │              ┌──────────▼──────────┐       │
│          │              │    Callback Queue    │       │
│          │              │  (Macrotask Queue)  │       │
│          │              │  [cb1, cb2, ...]    │       │
│          │              └──────────┬──────────┘       │
│          │                         │                   │
│          │              ┌──────────▼──────────┐       │
│          └──────────────│    Event Loop        │       │
│                         │ (checks if stack     │       │
│                         │  is empty, then      │       │
│                         │  moves callbacks in) │       │
│                         └─────────────────────┘       │
│                                                       │
│   ┌──────────────────────────────────────────────┐   │
│   │           Microtask Queue                     │   │
│   │   (Promises, queueMicrotask, MutationObserver)│   │
│   └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### Execution Order Rule:

1. Execute all synchronous code (Call Stack)
2. Process all **Microtasks** (Promise callbacks, queueMicrotask)
3. Render (if in browser)
4. Process one **Macrotask** (setTimeout, setInterval, I/O callbacks)
5. Go to step 2

---

## 📊 Predicting Output

```js
console.log("1 - Sync");

setTimeout(() => console.log("2 - setTimeout (macrotask)"), 0);

Promise.resolve().then(() => console.log("3 - Promise (microtask)"));

queueMicrotask(() => console.log("4 - queueMicrotask"));

console.log("5 - Sync");

// Output:
// 1 - Sync
// 5 - Sync
// 3 - Promise (microtask)  ← Microtasks before macrotasks!
// 4 - queueMicrotask       ← All microtasks drain before macrotask
// 2 - setTimeout (macrotask)
```

### Complex Example

```js
console.log("start");

setTimeout(() => {
  console.log("timeout 1");
  Promise.resolve().then(() => console.log("promise in timeout"));
}, 0);

Promise.resolve()
  .then(() => {
    console.log("promise 1");
    return Promise.resolve("chained");
  })
  .then((val) => console.log("promise 2:", val));

setTimeout(() => console.log("timeout 2"), 0);

console.log("end");

// Output:
// start
// end
// promise 1
// promise 2: chained
// timeout 1
// promise in timeout  ← New microtask created inside macrotask, runs before next macrotask
// timeout 2
```

---

## 🎤 Interview Questions — Lesson 12

**Q1: What is the Event Loop?**

> **Answer:** The Event Loop is JavaScript's concurrency mechanism that monitors the Call Stack and Callback Queue. When the Call Stack is empty, it picks up callbacks from the queue and pushes them onto the stack. This enables non-blocking I/O operations despite JavaScript being single-threaded.

**Q2: What is the difference between microtasks and macrotasks?**

> **Answer:** Microtasks (Promise callbacks, `queueMicrotask`, MutationObserver) have higher priority — the entire microtask queue is drained after each macrotask and before the next macrotask runs. Macrotasks (setTimeout, setInterval, I/O, UI events) are processed one at a time. This is why Promise callbacks always run before setTimeout callbacks even with a 0ms delay.

**Q3: Why does `setTimeout(fn, 0)` not run immediately?**

> **Answer:** Even with 0ms delay, `setTimeout` is a Web API that runs outside the JS engine. Its callback enters the macrotask queue and can only run after: all synchronous code finishes AND all microtasks (Promises) are processed. In practice, `setTimeout(fn, 0)` means "run as soon as the call stack is empty and microtasks are done."

---

---

# Lesson 13 — Error Handling & Debugging

## 🎯 Learning Objectives

- Use try/catch/finally effectively
- Create and work with custom errors
- Debug using browser DevTools and Node.js debugger
- Handle errors in async code

---

## 🔴 Error Types

```js
// ReferenceError — accessing undefined variable
undeclaredVar; // ReferenceError: undeclaredVar is not defined

// TypeError — wrong type or null access
null.property; // TypeError: Cannot read properties of null
undefined(); // TypeError: undefined is not a function

// SyntaxError — invalid JS syntax
// eval("let = 5"); // SyntaxError

// RangeError — out of valid range
new Array(-1); // RangeError: Invalid array length

// URIError — malformed URI
decodeURIComponent("%"); // URIError
```

### Custom Errors

```js
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthError";
  }
}

// Usage
function validateEmail(email) {
  if (!email.includes("@")) {
    throw new ValidationError("Invalid email format", "email");
  }
  return true;
}

try {
  validateEmail("invalid-email");
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`Validation failed on field: ${error.field}`);
    console.log(`Message: ${error.message}`);
  } else {
    throw error; // Re-throw unexpected errors
  }
}
```

---

## 🛡️ Error Handling Patterns

```js
// Async error handling
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new NetworkError(`Request failed`, response.status);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof NetworkError) {
      if (error.statusCode === 401) throw new AuthError("Please login again");
      if (error.statusCode === 404) return null; // Resource not found — OK
      throw error; // Other network errors — re-throw
    }

    if (error instanceof SyntaxError) {
      throw new Error("Invalid JSON response from server");
    }

    throw error; // Unknown errors — re-throw
  }
}

// Error boundary pattern (used heavily in React)
async function withErrorBoundary(fn, fallback) {
  try {
    return await fn();
  } catch (error) {
    console.error("Error caught:", error);
    return fallback;
  }
}

const data = await withErrorBoundary(
  () => fetchData("https://api.example.com/users"),
  [], // Default fallback
);
```

---

## 🎤 Interview Questions — Lesson 13

**Q1: What is the purpose of `finally` in try/catch?**

> **Answer:** `finally` runs regardless of whether an exception was thrown or caught. It's used for cleanup: closing database connections, hiding loading spinners, releasing resources. Even if `try` returns or `catch` re-throws, `finally` always executes.

**Q2: When should you re-throw an error vs handle it?**

> **Answer:** Handle errors when you can meaningfully recover (e.g., return a fallback, show user feedback). Re-throw when the error is unexpected, when it belongs to a higher-level handler, or when you've only done partial handling (logging) and the caller still needs to know. Never silently swallow errors you can't handle.

**Q3: How do you handle errors with async/await vs Promises?**

> **Answer:** With async/await, use try/catch blocks (synchronous-looking syntax). With Promises, use `.catch()` chains. Both are equivalent — async/await is syntactic sugar. A common pattern: catch at the lowest level for specific handling, and have a global error handler for unhandled cases (`window.onerror`, `process.on('unhandledRejection')`).

---

---

# Lesson 14 — DOM Manipulation & Events

## 🎯 Learning Objectives

- Select and manipulate DOM elements
- Create and modify DOM dynamically
- Master event handling patterns
- Understand event bubbling, capturing, and delegation

---

## 🎯 Selecting Elements

```js
// Modern selectors (use these)
document.querySelector(".btn"); // First match (like CSS)
document.querySelector("#user-form"); // By ID
document.querySelectorAll(".list-item"); // All matches → NodeList

// Convert NodeList to Array for array methods:
const items = [...document.querySelectorAll(".item")];
items.forEach((item) => item.classList.add("active"));

// Legacy (still used):
document.getElementById("app");
document.getElementsByClassName("btn"); // Live HTMLCollection
document.getElementsByTagName("div");
```

### Modifying Elements

```js
const div = document.querySelector(".card");

// Content
div.textContent = "Hello World"; // Safe — no HTML parsing
div.innerHTML = "<strong>Hello</strong>"; // Parses HTML (⚠️ XSS risk with user input!)

// Attributes
div.setAttribute("data-id", "123");
div.getAttribute("data-id"); // "123"
div.removeAttribute("data-id");
div.dataset.id; // Access data- attributes via dataset

// Classes
div.classList.add("active", "highlighted");
div.classList.remove("hidden");
div.classList.toggle("expanded"); // Add if missing, remove if present
div.classList.contains("active"); // true/false
div.classList.replace("old-class", "new-class");

// Styles
div.style.backgroundColor = "red";
div.style.fontSize = "16px";
// Better: modify classes, not inline styles
```

### Creating & Inserting Elements

```js
// Create element
const card = document.createElement("div");
card.className = "product-card";
card.innerHTML = `
  <img src="${product.image}" alt="${product.name}">
  <h3>${product.name}</h3>
  <p>Rs. ${product.price}</p>
  <button data-id="${product.id}">Add to Cart</button>
`;

// Insert methods
parent.appendChild(card); // End of parent
parent.insertBefore(card, referenceEl); // Before specific child
parent.insertAdjacentHTML("beforeend", html); // HTML string insertion
parent.prepend(card); // Beginning of parent
parent.append(card); // End (modern, multiple nodes)

// Remove
element.remove(); // Remove itself
parent.removeChild(element); // Traditional way
```

---

## 🎪 Events

```js
// addEventListener
button.addEventListener("click", function (event) {
  console.log("Clicked!", event.target);
});

// Arrow function (no `this`)
button.addEventListener("click", (e) => {
  e.preventDefault(); // Stop default behavior (form submit, link follow)
  e.stopPropagation(); // Stop event from bubbling up
  console.log(e.target.textContent);
});

// Remove event listener (must use named function!)
function handleClick(e) {
  console.log("clicked");
}
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);

// Event object properties
button.addEventListener("click", (e) => {
  e.target; // Element that was clicked
  e.currentTarget; // Element the listener is attached to
  e.type; // "click"
  e.clientX; // Mouse X position
  e.key; // For keyboard events
  e.preventDefault();
  e.stopPropagation();
});
```

### Event Delegation (Performance Pattern)

```js
// ❌ Bad: Attach listeners to each item
const items = document.querySelectorAll(".list-item");
items.forEach((item) => {
  item.addEventListener("click", handleClick); // 1000 listeners!
});

// ✅ Good: Event delegation — one listener on parent
const list = document.querySelector(".product-list");

list.addEventListener("click", function (e) {
  // Check what was clicked
  if (e.target.matches(".add-to-cart")) {
    const productId = e.target.dataset.id;
    addToCart(productId);
  }

  if (e.target.matches(".remove")) {
    e.target.closest(".product-card").remove();
  }
});

// This works even for dynamically added items!
```

### Event Bubbling & Capturing

```js
// Bubbling: event travels UP from target to root
// Capturing: event travels DOWN from root to target

document.addEventListener("click", () => console.log("Document"), true); // Capture
body.addEventListener("click", () => console.log("Body"), true); // Capture
div.addEventListener("click", () => console.log("Div")); // Bubble
button.addEventListener("click", () => console.log("Button")); // Bubble

// Click on button:
// Document (capture)
// Body (capture)
// Button (target — both capture and bubble)
// Div (bubble)
// Body (bubble)
// Document (bubble)
```

---

## 🎤 Interview Questions — Lesson 14

**Q1: What is event delegation and why is it useful?**

> **Answer:** Event delegation is attaching a single event listener to a parent element instead of individual listeners on each child. It leverages event bubbling — events on children bubble up to the parent. Benefits: better performance (one listener vs hundreds), works for dynamically added elements, less memory usage.

**Q2: What is the difference between `e.target` and `e.currentTarget`?**

> **Answer:** `e.target` is the element that actually triggered the event (what was clicked). `e.currentTarget` is the element the event listener is attached to. In delegation, if you click a button inside a list, `e.target` is the button but `e.currentTarget` is the list.

**Q3: What does `preventDefault` do vs `stopPropagation`?**

> **Answer:** `preventDefault()` stops the browser's default behavior (following a link, submitting a form, right-click context menu). `stopPropagation()` stops the event from traveling up (or down) the DOM tree. They are independent — you can call one, both, or neither.

---

---

# Lesson 15 — JavaScript Modules

## 🎯 Learning Objectives

- Understand ES Modules vs CommonJS
- Export and import correctly
- Use dynamic imports for code splitting
- Understand module bundlers (Vite, Webpack)

---

## 📦 ES Modules (ESM)

```js
// math.js — Named exports
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export function multiply(a, b) {
  return a * b;
}

// Default export (one per file)
export default function subtract(a, b) {
  return a - b;
}

// main.js — Importing
import subtract, { PI, add, multiply } from "./math.js";
import { add as sum } from "./math.js"; // Rename
import * as MathUtils from "./math.js"; // Import all as namespace

MathUtils.add(1, 2); // 3
MathUtils.PI; // 3.14159
```

### Real-World Module Structure

```
src/
├── utils/
│   ├── formatters.js
│   ├── validators.js
│   └── index.js      ← Re-exports for clean imports
├── services/
│   ├── api.js
│   └── auth.js
├── components/
│   ├── Button.js
│   └── Card.js
└── main.js
```

```js
// utils/index.js — barrel export pattern
export { formatPrice, formatDate } from "./formatters.js";
export { validateEmail, validatePhone } from "./validators.js";

// main.js — clean import
import { formatPrice, validateEmail } from "./utils";
// Instead of: import { formatPrice } from "./utils/formatters.js"
```

---

## 🔄 Dynamic Imports

```js
// Static import — loaded upfront
import HeavyComponent from "./HeavyComponent.js";

// Dynamic import — loaded on demand (returns Promise)
async function loadMap() {
  const { default: MapLibrary } = await import("./MapLibrary.js");
  MapLibrary.init();
}

// Real-World: React lazy loading (uses dynamic import internally)
const AdminPanel = React.lazy(() => import("./AdminPanel"));

// Code splitting by route
button.addEventListener("click", async () => {
  const { renderChart } = await import("./chart.js");
  renderChart(data); // Only loaded when needed
});
```

---

## 🎤 Interview Questions — Lesson 15

**Q1: What is the difference between ES Modules and CommonJS?**

> **Answer:** CommonJS (Node.js original system) uses `require()` / `module.exports` and is synchronous — evaluated at runtime. ES Modules use `import`/`export`, are statically analyzed at parse time (enabling tree-shaking), support async loading, and are the standard for browsers and modern Node.js. React projects use ESM; Node.js traditionally used CJS but now supports both.

**Q2: What is tree-shaking?**

> **Answer:** Tree-shaking is the elimination of unused exports from a bundle. Because ES Modules are statically analyzable, bundlers like Webpack and Vite can determine which exports are never imported and exclude them. This reduces bundle size. CommonJS `require()` cannot be tree-shaken because it's dynamic (you can require inside conditionals).

**Q3: What is the barrel export pattern?**

> **Answer:** A barrel file (usually `index.js`) re-exports from multiple modules, creating a single entry point. Instead of `import from "./utils/formatters"`, you write `import from "./utils"`. This simplifies imports and allows refactoring internal structure without changing import paths across the codebase.

---

---

# Lesson 16 — JavaScript Classes & OOP

## 🎯 Learning Objectives

- Write classes with proper encapsulation
- Use inheritance and method overriding
- Understand static methods and properties
- Work with private fields (#)

---

## 🏗️ Classes in Depth

```js
class Animal {
  // Private field (ES2022)
  #name;
  #sound;

  // Static property
  static count = 0;

  constructor(name, sound) {
    this.#name = name;
    this.#sound = sound;
    Animal.count++;
  }

  // Instance method
  speak() {
    return `${this.#name} says ${this.#sound}!`;
  }

  // Getter
  get name() {
    return this.#name;
  }

  // Setter with validation
  set name(value) {
    if (typeof value !== "string" || value.length === 0) {
      throw new Error("Name must be a non-empty string");
    }
    this.#name = value;
  }

  // Static method
  static getCount() {
    return `${Animal.count} animals created`;
  }

  // toString override
  toString() {
    return `Animal(${this.#name})`;
  }
}

class Dog extends Animal {
  #breed;

  constructor(name, breed) {
    super(name, "Woof"); // Must call super() first
    this.#breed = breed;
  }

  // Method overriding
  speak() {
    return `${super.speak()} (${this.#breed} breed)`;
  }

  fetch(item) {
    return `${this.name} fetches the ${item}!`;
  }
}

const dog = new Dog("Rex", "Labrador");
console.log(dog.speak()); // "Rex says Woof! (Labrador breed)"
console.log(dog.fetch("ball")); // "Rex fetches the ball!"
console.log(Animal.getCount()); // "1 animals created"
// console.log(dog.#breed); // ❌ SyntaxError — truly private
```

---

## 🎤 Interview Questions — Lesson 16

**Q1: What is the difference between a class and a constructor function?**

> **Answer:** Classes are syntactic sugar over constructor functions and prototype chains. They look cleaner but work the same under the hood. Key differences: classes have private fields (`#`), `super()` call, more intuitive inheritance syntax. Classes are always in strict mode. You cannot call them without `new` (unlike constructor functions which silently pollute global if called without `new`).

**Q2: What is the `super` keyword used for?**

> **Answer:** In a constructor, `super()` calls the parent class's constructor — required before using `this` in a subclass. In methods, `super.methodName()` calls the parent class's version of that method, enabling method extension (calling parent behavior and adding to it).

**Q3: What are private class fields and how do they work?**

> **Answer:** Private fields use the `#` prefix (ES2022). They are truly private — not accessible outside the class, not even in subclasses. Unlike closures for privacy, they work with classes natively and appear in browser DevTools with a clear label. You cannot access `instance.#field` from outside the class — it's a syntax error.

---

---

# Lesson 17 — Functional Programming

## 🎯 Learning Objectives

- Understand FP principles: immutability, pure functions, composition
- Master currying and partial application
- Use function composition
- Apply FP concepts common in React

---

## 🧮 Core FP Concepts

```js
// 1. Immutability — never modify; always create new
const user = { name: "Alice", score: 100 };

// Bad (mutates):
user.score += 50; // ❌

// Good (creates new):
const updatedUser = { ...user, score: user.score + 50 }; // ✅

// 2. Pure Functions
// Bad (impure — depends on external state):
let taxRate = 0.18;
const getTotal = (price) => price * (1 + taxRate); // Depends on external var

// Good (pure):
const getTotal = (price, taxRate) => price * (1 + taxRate);

// 3. Composition — build complex functions from simple ones
const double = (x) => x * 2;
const addOne = (x) => x + 1;
const square = (x) => x * x;

// Manual composition
const result = square(addOne(double(3))); // square(addOne(6)) = square(7) = 49

// compose utility (right to left)
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((v, f) => f(v), x);
const transform = compose(square, addOne, double);
transform(3); // 49

// pipe utility (left to right — more readable)
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);
const process = pipe(double, addOne, square);
process(3); // 49
```

### Currying

```js
// Currying — transform function with multiple args into chain of single-arg functions
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return function (...moreArgs) {
      return curried(...args, ...moreArgs);
    };
  };
}

const add = curry((a, b, c) => a + b + c);

add(1)(2)(3); // 6
add(1, 2)(3); // 6
add(1)(2, 3); // 6
add(1, 2, 3); // 6

// Real-World: Reusable filter functions
const filter = curry((predicate, array) => array.filter(predicate));
const map = curry((transform, array) => array.map(transform));

const isAdult = (user) => user.age >= 18;
const getName = (user) => user.name;

const getAdultNames = pipe(filter(isAdult), map(getName));

const users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 15 },
  { name: "Carol", age: 25 },
];

getAdultNames(users); // ["Alice", "Carol"]
```

---

## 🎤 Interview Questions — Lesson 17

**Q1: What is currying and why would you use it?**

> **Answer:** Currying transforms a function that takes multiple arguments into a series of functions each taking one argument. Benefits: partial application (pre-fill some arguments), function reuse, cleaner point-free style. Used extensively in functional libraries (Ramda), Redux middleware, and React patterns.

**Q2: What is function composition?**

> **Answer:** Combining multiple functions so the output of one becomes the input of the next. `compose(f, g, h)(x)` equals `f(g(h(x)))`. Enables building complex transformations from simple, testable pure functions. `pipe` is the same but left-to-right (more intuitive for reading).

---

---

# Lesson 18 — Performance, Memory & Best Practices

## 🎯 Learning Objectives

- Understand memory leaks and how to prevent them
- Use debounce and throttle
- Optimize loops and DOM operations
- Apply code quality practices

---

## 💾 Memory Leaks

```js
// Common memory leak 1: Unremoved event listeners
function setupSearch() {
  const input = document.querySelector("#search");

  // ❌ Leak: If component is "destroyed", listener remains
  input.addEventListener("input", handleSearch);

  // ✅ Fix: Remove when done
  return () => input.removeEventListener("input", handleSearch);
}

// Common leak 2: Timers not cleared
function startPolling() {
  const interval = setInterval(fetchData, 5000);

  // ✅ Store reference to clear it
  return () => clearInterval(interval);
}

// Common leak 3: Detached DOM nodes
let cachedElement = null;

function leak() {
  cachedElement = document.createElement("div");
  document.body.appendChild(cachedElement);
  document.body.removeChild(cachedElement); // Removed from DOM
  // cachedElement still holds reference — prevents garbage collection!
}

// Fix: Set to null when no longer needed
cachedElement = null;
```

---

## ⚡ Debounce & Throttle

```js
// Debounce — delay execution, reset timer on each call
// Use case: Search input, resize handler
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const searchInput = document.querySelector("#search");
const debouncedSearch = debounce(async (query) => {
  const results = await searchAPI(query);
  displayResults(results);
}, 300); // Only fires 300ms after user stops typing

searchInput.addEventListener("input", (e) => debouncedSearch(e.target.value));

// Throttle — limit execution to once per interval
// Use case: Scroll handler, mousemove
function throttle(fn, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      return fn.apply(this, args);
    }
  };
}

const throttledScroll = throttle(() => {
  updateScrollProgress();
}, 100); // Fires at most once per 100ms

window.addEventListener("scroll", throttledScroll);
```

---

## 🎤 Interview Questions — Lesson 18

**Q1: What is the difference between debounce and throttle?**

> **Answer:** Debounce delays execution until after a period of inactivity — the timer resets on every call. Use for search inputs (fire after user stops typing). Throttle limits execution to once per time interval regardless of how often called. Use for scroll/resize handlers where you want consistent intervals.

**Q2: What are common causes of memory leaks in JavaScript?**

> **Answer:** Forgotten event listeners, uncleared timers (setInterval), closures referencing large objects, detached DOM nodes still referenced in JS, global variables accumulating data. In React: missing cleanup in `useEffect`, event listeners on `window` not removed on unmount.

---

---

# Lesson 19 — JavaScript for React: The Bridge

## 🎯 Learning Objectives

- Map every JS concept to its React usage
- Understand JSX as JavaScript
- Immutable state patterns
- Patterns that directly power React hooks

---

## ⚛️ JS Concepts Directly Used in React

### Array Methods → Rendering Lists

```jsx
// map() renders lists — the most used method in React
const products = [
  { id: 1, name: "Laptop", price: 75000 },
  { id: 2, name: "Phone", price: 25000 },
];

function ProductList() {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} — Rs. {product.price}
        </li>
      ))}
    </ul>
  );
}

// filter() for conditional rendering
function InStockProducts({ products }) {
  const available = products.filter((p) => p.inStock);
  return (
    <div>
      {available.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  );
}
```

### Spread → Prop Passing

```jsx
const buttonProps = {
  onClick: handleSubmit,
  disabled: isLoading,
  className: "btn btn-primary",
};

// Spread all props onto Button
<Button {...buttonProps}>Submit</Button>;

// Immutable state updates with spread
const [user, setUser] = useState({ name: "Alice", age: 30 });

// Update only age — spread ensures immutability
setUser((prev) => ({ ...prev, age: prev.age + 1 }));
```

### Closures → useState & useEffect

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  // This handler "closes over" count and setCount
  const handleClick = () => {
    setCount(count + 1); // Stale closure risk with multiple rapid updates!

    // Better: use functional update (always has latest state)
    setCount((prev) => prev + 1); // ✅ No stale closure
  };

  // useEffect cleanup = closure over the effect's resources
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer); // Closure over timer reference
  }, []); // Empty array = run once on mount

  return <button onClick={handleClick}>{count}</button>;
}
```

### Destructuring → Props & State

```jsx
// Component props destructuring
function UserCard({ name, email, avatar, role = "member", onDelete }) {
  return (
    <div>
      <img src={avatar} alt={name} />
      <h3>
        {name} ({role})
      </h3>
      <p>{email}</p>
      <button onClick={() => onDelete(email)}>Delete</button>
    </div>
  );
}

// useState destructuring
const [isOpen, setIsOpen] = useState(false);
const [data, setData] = useState([]);
const [error, setError] = useState(null);
```

### Promises/Async → Data Fetching

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false; // Prevent state update on unmounted component

    async function loadUser() {
      try {
        setLoading(true);
        const data = await fetchUser(userId);
        if (!cancelled) setUser(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadUser();
    return () => {
      cancelled = true;
    }; // Cleanup
  }, [userId]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  return <div>{user.name}</div>;
}
```

### Reduce → Complex State Management (Redux Pattern)

```js
// React useReducer — exactly like Redux!
const initialState = { cart: [], total: 0, itemCount: 0 };

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const newCart = [...state.cart, action.payload];
      return {
        ...state,
        cart: newCart,
        total: newCart.reduce((sum, item) => sum + item.price * item.qty, 0),
        itemCount: newCart.length,
      };
    }
    case "REMOVE_ITEM": {
      const newCart = state.cart.filter((item) => item.id !== action.payload);
      return {
        ...state,
        cart: newCart,
        total: newCart.reduce((sum, item) => sum + item.price * item.qty, 0),
        itemCount: newCart.length,
      };
    }
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

// Usage in component
const [state, dispatch] = useReducer(cartReducer, initialState);
dispatch({
  type: "ADD_ITEM",
  payload: { id: 1, name: "Book", price: 500, qty: 1 },
});
```

---

## 🎤 Final Interview Questions — React Readiness

**Q1: What JavaScript concepts are most important for React?**

> **Answer:** Arrow functions (JSX callbacks), destructuring (props, state), spread operator (immutable updates), array methods (map/filter for rendering, reduce for state), closures (hooks, event handlers), Promises/async-await (data fetching), ES modules (imports), template literals (conditional classNames), optional chaining (safe prop access).

**Q2: Why must React state updates be immutable?**

> **Answer:** React determines whether to re-render by comparing old and new state references. If you mutate the existing object, the reference doesn't change, so React thinks nothing changed and skips re-rendering. Always create new objects/arrays with spread, `map`, `filter`, etc. This also makes state changes predictable and debuggable.

**Q3: What is a "stale closure" in React?**

> **Answer:** A stale closure occurs in hooks when a callback captures a state value at a certain point in time, but the state has since changed. The function still references the old value. Solution: use functional state updates (`setCount(prev => prev + 1)`), list state in `useEffect` dependencies, or use `useRef` to hold mutable values.

**Q4: How does `useEffect` relate to JavaScript concepts you've learned?**

> **Answer:** `useEffect` is built on closures (captures surrounding variables), Promises (for async operations inside), and the event system concept (setup + cleanup). The return function is a closure that cleans up side effects (like removing event listeners) — identical patterns to vanilla JS cleanup functions.

---

---

## 🏆 Course Completion Checklist

### Beginner Level ✅

- [ ] Variables (`var`/`let`/`const`) and when to use each
- [ ] All 8 data types and `typeof`
- [ ] Type coercion, truthiness, `==` vs `===`
- [ ] All control flow: if/switch/ternary/loops
- [ ] Function declarations, expressions, arrow functions

### Intermediate Level ✅

- [ ] Scope (global, function, block) and hoisting
- [ ] Temporal Dead Zone
- [ ] Closures (what, why, real-world uses)
- [ ] All array methods (map, filter, reduce, find, etc.)
- [ ] Objects, prototype chain, `this` keyword
- [ ] Destructuring (object + array), spread, rest
- [ ] ES6+ features (template literals, Map, Set, optional chaining, `??`)
- [ ] Error handling (try/catch, custom errors)
- [ ] DOM manipulation and event delegation
- [ ] ES Modules (import/export, dynamic imports)
- [ ] Classes and OOP

### Advanced Level ✅

- [ ] Async JS (callbacks → Promises → async/await)
- [ ] Promise combinators (all, allSettled, race, any)
- [ ] Event Loop, microtasks vs macrotasks
- [ ] Functional programming (pure functions, currying, composition)
- [ ] Performance (debounce, throttle, memory management)
- [ ] React-ready patterns (immutable updates, hooks patterns, useReducer)

---

## 📚 Recommended Next Steps

1. **Build Projects** — Todo App, Weather App, Shopping Cart (vanilla JS)
2. **Start React** — You now have all prerequisites
3. **Learn TypeScript** — Static typing adds safety to everything you learned
4. **Study Algorithms** — LeetCode with JavaScript
5. **Node.js** — Apply your JS knowledge on the backend

---
