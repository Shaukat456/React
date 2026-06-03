# `.call()`, `.apply()`, and `.bind()` in JavaScript — From Scratch

> **What you'll learn:** What `this` really means, why it breaks, and how `.call()`, `.apply()`, and `.bind()` give you precise control over it — with real-world examples throughout.

---

## 1. The Root of Everything: `this`

Before `.call`, `.apply`, or `.bind` make sense, you need to understand **`this`**.

In JavaScript, `this` refers to the **object that is currently executing the function**. The problem? `this` is not fixed at definition time — it's determined at **call time**, based on _how_ the function is invoked.

```js
const user = {
  name: "Hamza",
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  },
};

user.greet(); // ✅ "Hello, I'm Hamza" — this = user
```

But the moment you detach that function from its object:

```js
const greet = user.greet;
greet(); // ❌ "Hello, I'm undefined" — this = global object (or undefined in strict mode)
```

The function lost its context. This is the core problem that `.call()`, `.apply()`, and `.bind()` solve.

---

## 2. How `this` Is Determined (The 4 Rules)

Understanding these rules makes the three methods obvious, not magic.

### Rule 1: Implicit Binding (Method Call)

When a function is called as a method of an object, `this` is that object.

```js
const car = {
  brand: "Toyota",
  describe() {
    console.log(this.brand); // this = car
  },
};

car.describe(); // "Toyota"
```

### Rule 2: Explicit Binding (`.call`, `.apply`, `.bind`)

You manually tell JavaScript what `this` should be. This is exactly what the three methods do.

### Rule 3: `new` Binding

When a function is called with `new`, `this` is the newly created object.

```js
function Person(name) {
  this.name = name; // this = the new object
}
const p = new Person("Hamza");
console.log(p.name); // "Hamza"
```

### Rule 4: Default Binding

When none of the above apply, `this` defaults to the global object (`window` in browsers, `global` in Node.js), or `undefined` in strict mode.

```js
function show() {
  console.log(this); // window / global / undefined
}
show();
```

---

## 3. `.call()` — Invoke with a Specific `this`

### Syntax

```js
functionName.call(thisArg, arg1, arg2, arg3, ...)
```

`.call()` **immediately invokes** the function, setting `this` to `thisArg`. Arguments are passed **one by one**.

### Basic Example

```js
function introduce(city, country) {
  console.log(`I'm ${this.name}, from ${city}, ${country}.`);
}

const person1 = { name: "Hamza" };
const person2 = { name: "Sara" };

introduce.call(person1, "Karachi", "Pakistan");
// "I'm Hamza, from Karachi, Pakistan."

introduce.call(person2, "London", "UK");
// "I'm Sara, from London, UK."
```

The same function runs twice with two different `this` contexts — no duplication needed.

### How `.call()` Works Step-by-Step

```js
const calculator = {
  value: 10,
  add(n) {
    return this.value + n;
  },
};

const anotherCalc = { value: 50 };

// Normally:
calculator.add(5); // 15 — this = calculator

// With .call():
calculator.add.call(anotherCalc, 5); // 55 — this = anotherCalc
```

Think of `.call()` as: _"Run this function, but pretend it belongs to this other object."_

---

## 4. `.apply()` — Same as `.call()`, but with an Array

### Syntax

```js
functionName.apply(thisArg, [arg1, arg2, arg3, ...])
```

`.apply()` **immediately invokes** the function just like `.call()`, but arguments are passed as an **array** (or array-like object).

### Basic Example

```js
function introduce(city, country) {
  console.log(`I'm ${this.name}, from ${city}, ${country}.`);
}

const person = { name: "Hamza" };
const args = ["Karachi", "Pakistan"];

introduce.apply(person, args);
// "I'm Hamza, from Karachi, Pakistan."
```

### `.call()` vs `.apply()` — The Only Difference

```js
// These two lines do EXACTLY the same thing:
introduce.call(person, "Karachi", "Pakistan"); // args spread out
introduce.apply(person, ["Karachi", "Pakistan"]); // args in an array
```

| Method     | Arguments style                          | Invokes immediately?      |
| ---------- | ---------------------------------------- | ------------------------- |
| `.call()`  | Comma-separated: `fn.call(ctx, a, b, c)` | Yes                       |
| `.apply()` | Array: `fn.apply(ctx, [a, b, c])`        | Yes                       |
| `.bind()`  | Comma-separated: `fn.bind(ctx, a, b, c)` | No — returns new function |

> **Memory trick:** **A**pply → **A**rray. Both start with A.

---

## 5. `.bind()` — Create a New Function with a Fixed `this`

### Syntax

```js
const newFn = functionName.bind(thisArg, arg1, arg2, ...)
```

`.bind()` does **not** invoke the function. It returns a **new function** with `this` permanently locked to `thisArg`. You call the returned function whenever you want.

### Basic Example

```js
function greet(greeting) {
  console.log(`${greeting}, I'm ${this.name}`);
}

const user = { name: "Hamza" };

const greetHamza = greet.bind(user); // returns a new function — NOT called yet
greetHamza("Hello"); // "Hello, I'm Hamza"
greetHamza("Hi"); // "Hi, I'm Hamza"
greetHamza("Hey"); // "Hey, I'm Hamza"
// this is always user, no matter how many times you call it
```

### `.bind()` is Permanent

Once bound, `this` cannot be changed — even with another `.call()` or `.apply()`:

```js
const user1 = { name: "Hamza" };
const user2 = { name: "Sara" };

const boundFn = greet.bind(user1);
boundFn.call(user2, "Hello"); // Still "Hello, I'm Hamza" — bind wins
```

---

## 6. Partial Application with `.bind()`

`.bind()` can also pre-fill arguments — this is called **partial application**.

```js
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2); // a is permanently 2, this = null (irrelevant)
const triple = multiply.bind(null, 3); // a is permanently 3

console.log(double(5)); // 10
console.log(double(9)); // 18
console.log(triple(4)); // 12
console.log(triple(7)); // 21
```

You created specialized functions from a generic one — no need to repeat the `2` or `3` every time.

```js
function log(level, timestamp, message) {
  console.log(`[${level}] ${timestamp}: ${message}`);
}

const logError = log.bind(null, "ERROR");
const logInfo = log.bind(null, "INFO");

logError(Date.now(), "Something went wrong");
logInfo(Date.now(), "Server started");
// [ERROR] 1719123456789: Something went wrong
// [INFO]  1719123456789: Server started
```

---

## 7. Real-World Use Cases

### 7.1 The Classic `this` Problem in Event Listeners

The most common real-world problem: `this` loses its context inside a callback.

```js
class Timer {
  constructor() {
    this.seconds = 0;
  }

  start() {
    // ❌ Without bind — this inside the callback is NOT the Timer instance
    setInterval(function () {
      this.seconds++; // this = window or undefined — TypeError!
      console.log(this.seconds);
    }, 1000);
  }
}

const t = new Timer();
t.start(); // 💥 Breaks
```

**Fix with `.bind()`:**

```js
class Timer {
  constructor() {
    this.seconds = 0;
  }

  start() {
    // ✅ bind fixes this permanently to the Timer instance
    setInterval(
      function () {
        this.seconds++;
        console.log(this.seconds);
      }.bind(this),
      1000,
    );
  }
}

const t = new Timer();
t.start(); // 1, 2, 3, 4...
```

**Alternative fix with arrow functions** (they inherit `this` from their enclosing scope):

```js
start() {
  setInterval(() => {
    this.seconds++; // ✅ Arrow function — this is inherited from start()
    console.log(this.seconds);
  }, 1000);
}
```

---

### 7.2 Borrowing Methods Between Objects

`.call()` and `.apply()` let one object borrow another's method without inheritance.

```js
const arrayUtils = {
  sum() {
    return Array.from(arguments).reduce((acc, n) => acc + n, 0);
  },
  max() {
    return Math.max(...arguments);
  },
};

const stats = { data: [4, 7, 2, 9, 1] };

// Borrow Array's join method for a NodeList or arguments object
function printArgs() {
  // arguments is array-like, not a real array — borrow join from Array.prototype
  const joined = Array.prototype.join.call(arguments, " | ");
  console.log(joined);
}

printArgs("apple", "banana", "cherry");
// "apple | banana | cherry"
```

**Real example — converting `arguments` to a real array:**

```js
function oldStyleFunction() {
  // arguments is NOT a real array — it has no .map(), .filter(), etc.
  const argsArray = Array.prototype.slice.call(arguments);
  // Now it's a real array
  return argsArray.map((x) => x * 2);
}

oldStyleFunction(1, 2, 3); // [2, 4, 6]
```

---

### 7.3 Method Borrowing Between Classes/Objects

```js
const dog = {
  name: "Bruno",
  sound: "Woof",
  speak() {
    console.log(`${this.name} says ${this.sound}!`);
  },
};

const cat = {
  name: "Whiskers",
  sound: "Meow",
};

// cat doesn't have a speak method, but it can borrow dog's
dog.speak.call(cat); // "Whiskers says Meow!"
```

---

### 7.4 Passing Dynamic Arguments with `.apply()`

`.apply()` shines when you have arguments in an array and don't know how many there are.

```js
// Finding max in an array — Math.max doesn't accept arrays
const scores = [88, 95, 72, 100, 63];

// ❌ This doesn't work
Math.max(scores); // NaN — Math.max expects individual numbers

// ✅ .apply() spreads the array as individual arguments
const highest = Math.max.apply(null, scores); // 100

// Modern equivalent (ES6 spread — preferred today)
const highest2 = Math.max(...scores); // 100
```

**Dynamic function calls from config:**

```js
const actions = {
  sayHello(name) {
    console.log(`Hello, ${name}!`);
  },
  sayBye(name) {
    console.log(`Goodbye, ${name}!`);
  },
};

function dispatch(actionName, context, args) {
  if (actions[actionName]) {
    actions[actionName].apply(context, args);
  }
}

dispatch("sayHello", {}, ["Hamza"]); // "Hello, Hamza!"
dispatch("sayBye", {}, ["Sara"]); // "Goodbye, Sara!"
```

---

### 7.5 React-Style Event Handlers (Pre-Arrow-Function Era)

This pattern is still common in class-based React components:

```js
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };

    // ✅ Bind in constructor so this is correct when React calls the handler
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // Without bind, this would be undefined here
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Searching for:", this.state.query);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} value={this.state.query} />
        <button type="submit">Search</button>
      </form>
    );
  }
}
```

---

### 7.6 Implementing Function Composition / Pipelines

`.call()` is used heavily in utility libraries to apply functions in context:

```js
// A simple pipeline that passes context through transformations
function pipeline(...fns) {
  return function (value) {
    return fns.reduce((acc, fn) => fn.call(this, acc), value);
  };
}

const processName = pipeline(
  (str) => str.trim(),
  (str) => str.toLowerCase(),
  (str) => str.replace(/\s+/g, "_"),
);

processName("  Hamza Ahmed  "); // "hamza_ahmed"
```

---

### 7.7 Mixin Pattern with `.call()`

Mixins let you add behavior to objects without classical inheritance:

```js
// Reusable behaviors (mixins)
const Serializable = {
  serialize() {
    return JSON.stringify(this);
  },
  deserialize(json) {
    return Object.assign(this, JSON.parse(json));
  },
};

const Validatable = {
  validate() {
    return Object.keys(this).every(
      (key) => this[key] !== null && this[key] !== undefined,
    );
  },
};

// Apply mixins to a class via .call()
function User(name, email) {
  this.name = name;
  this.email = email;

  Serializable.serialize = Serializable.serialize.bind(this);
  Validatable.validate = Validatable.validate.bind(this);
}

const user = new User("Hamza", "hamza@example.com");
console.log(Serializable.serialize.call(user)); // '{"name":"Hamza","email":"hamza@example.com"}'
console.log(Validatable.validate.call(user)); // true
```

---

### 7.8 Currying with `.bind()`

Build specialized functions progressively using partial application:

```js
function request(method, baseUrl, endpoint) {
  return fetch(`${baseUrl}${endpoint}`, { method });
}

// Create API-specific versions
const getFromAPI = request.bind(null, "GET", "https://api.example.com");
const postToAPI = request.bind(null, "POST", "https://api.example.com");
const getFromAuth = request.bind(null, "GET", "https://auth.example.com");

// Usage — clean and readable
getFromAPI("/users"); // GET https://api.example.com/users
getFromAPI("/products"); // GET https://api.example.com/products
postToAPI("/orders"); // POST https://api.example.com/orders
getFromAuth("/me"); // GET https://auth.example.com/me
```

---

### 7.9 Debounce / Throttle with `this` Preservation

A debounce that properly preserves context:

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    // .apply preserves the caller's `this` and passes all arguments
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const searchInput = {
  query: "",
  search(term) {
    this.query = term;
    console.log(`Searching for: ${this.query}`);
  },
};

searchInput.debouncedSearch = debounce(searchInput.search, 300);

// Even though debounce wraps the function, this stays correct
searchInput.debouncedSearch.call(searchInput, "javascript"); // fires after 300ms
```

---

## 8. Implementing `.call()`, `.apply()`, `.bind()` from Scratch

Understanding their internals makes them unforgettable.

### Implementing `myCall`

```js
Function.prototype.myCall = function (context, ...args) {
  // 'this' here is the function being called
  context = context || globalThis;

  // Temporarily attach the function to the context object
  const tempKey = Symbol("temp");
  context[tempKey] = this;

  // Call it as a method (so `this` inside it = context)
  const result = context[tempKey](...args);

  // Clean up
  delete context[tempKey];
  return result;
};

// Test
function greet(greeting) {
  return `${greeting}, I'm ${this.name}`;
}
const person = { name: "Hamza" };
console.log(greet.myCall(person, "Hello")); // "Hello, I'm Hamza"
```

### Implementing `myApply`

```js
Function.prototype.myApply = function (context, argsArray = []) {
  context = context || globalThis;

  const tempKey = Symbol("temp");
  context[tempKey] = this;

  // Spread the array as individual arguments
  const result = context[tempKey](...argsArray);

  delete context[tempKey];
  return result;
};

console.log(greet.myApply(person, ["Hi"])); // "Hi, I'm Hamza"
```

### Implementing `myBind`

```js
Function.prototype.myBind = function (context, ...presetArgs) {
  const originalFn = this;

  // Return a new function
  return function (...laterArgs) {
    // Merge preset args with args given at call time
    return originalFn.apply(context, [...presetArgs, ...laterArgs]);
  };
};

const boundGreet = greet.myBind(person, "Hey");
console.log(boundGreet()); // "Hey, I'm Hamza"
```

---

## 9. Comparison Table

| Feature                      | `.call()`                        | `.apply()`                | `.bind()`                           |
| ---------------------------- | -------------------------------- | ------------------------- | ----------------------------------- |
| Invokes immediately          | ✅ Yes                           | ✅ Yes                    | ❌ No                               |
| Returns a new function       | ❌ No                            | ❌ No                     | ✅ Yes                              |
| Argument style               | Spread: `(ctx, a, b)`            | Array: `(ctx, [a, b])`    | Spread: `(ctx, a, b)`               |
| Supports partial application | ❌ No                            | ❌ No                     | ✅ Yes                              |
| `this` is permanent          | Per call                         | Per call                  | Forever                             |
| Best for                     | Borrowing methods, one-off calls | Dynamic/unknown arg count | Callbacks, event handlers, currying |

---

## 10. When to Use Which

**Use `.call()` when:**

- You want to invoke a function immediately with a specific `this`
- You know the arguments ahead of time and there aren't many
- You're borrowing a method from another object for a one-off use

```js
Array.prototype.slice.call(arguments);
greet.call(user, "Hello");
```

**Use `.apply()` when:**

- You want to invoke a function immediately with a specific `this`
- Your arguments are already in an array or you're spreading dynamically
- You're working with variadic functions like `Math.max`

```js
Math.max.apply(null, numbersArray);
fn.apply(context, dynamicArgsArray);
```

**Use `.bind()` when:**

- You need to pass a function somewhere and use it _later_ (callbacks, event handlers)
- You want to create a specialized/partial version of a function
- You need to permanently fix `this` for a method extracted from its object

```js
button.addEventListener("click", this.handleClick.bind(this));
const double = multiply.bind(null, 2);
```

---

## 11. Common Mistakes

### Mistake 1: Calling `.bind()` and expecting immediate invocation

```js
// ❌ bind returns a function — it doesn't call it
const result = greet.bind(user, "Hello"); // result is a function, not "Hello, I'm Hamza"

// ✅ Use .call() if you want to invoke immediately
const result2 = greet.call(user, "Hello"); // "Hello, I'm Hamza"

// ✅ Or call the bound function
const boundGreet = greet.bind(user, "Hello");
const result3 = boundGreet(); // "Hello, I'm Hamza"
```

### Mistake 2: Passing `null` when you care about `this`

```js
// ❌ Passing null as context when the function uses `this`
Math.max.apply(null, [1, 2, 3]); // ✅ Fine here — Math.max doesn't use `this`

// ❌ But this breaks if your function uses `this`
greet.call(null, "Hello"); // "Hello, I'm undefined" — this = global, no .name
```

### Mistake 3: Binding an already-bound function

```js
const fn = greet.bind(user1);
const fn2 = fn.bind(user2); // ❌ Does nothing — bind is permanent

fn2("Hi"); // Still uses user1 as context
```

### Mistake 4: Forgetting `.bind()` in class constructors

```js
class Button {
  constructor() {
    this.count = 0;
    // ❌ Forgot to bind — this.handleClick loses context when React calls it
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.count++; // ❌ TypeError: Cannot read properties of undefined
  }
}
```

---

## 12. Quick Reference Cheatsheet

```js
// Setup
function fn(a, b) {
  console.log(this.x, a, b);
}
const ctx = { x: 42 };

// .call() — immediate, args spread
fn.call(ctx, 1, 2); // 42 1 2

// .apply() — immediate, args as array
fn.apply(ctx, [1, 2]); // 42 1 2

// .bind() — deferred, returns new function
const bound = fn.bind(ctx, 1); // not called yet
bound(2); // 42 1 2

// Partial application
const partial = fn.bind(ctx, 1); // a = 1 is pre-filled
partial(99); // 42 1 99

// Borrow a method
const arr = [3, 1, 4, 1, 5];
Math.max.apply(null, arr); // 5

// Fix this in callback
setTimeout(fn.bind(ctx, 1, 2), 1000); // called later with correct context
```

---

## Summary

`.call()`, `.apply()`, and `.bind()` are all about **controlling `this`**. They don't add new functionality — they give you precision over something JavaScript normally decides on its own.

- **`.call()`** → Run now, pass args one by one
- **`.apply()`** → Run now, pass args as array
- **`.bind()`** → Don't run yet, lock in `this` and optionally pre-fill args, return new function

Master these and you'll understand how `this` truly works in JavaScript — which is the key to debugging a huge class of confusing bugs and writing more intentional, reusable code.
