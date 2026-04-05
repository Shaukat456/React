# 🧠 Software Engineering: Problem Solving Mastery

### From Scratch to Advanced — A Complete Course

> **Who is this for?** Complete beginners with no prior experience, all the way to intermediate developers who want to sharpen their problem-solving skills for real-world projects and technical interviews.

---

## 📚 Course Outline

| #   | Lesson                         | Topics                                  |
| --- | ------------------------------ | --------------------------------------- |
| 01  | Foundations of Problem Solving | Mindset, decomposition, pseudocode      |
| 02  | Variables, Data Types & Logic  | Memory model, types, boolean logic      |
| 03  | Conditionals & Decision Making | if/else, switch, nested conditions      |
| 04  | Loops & Iteration              | for, while, do-while, loop patterns     |
| 05  | Functions & Abstraction        | DRY, parameters, return values          |
| 06  | Arrays & Lists                 | Indexing, traversal, manipulation       |
| 07  | Strings                        | Manipulation, patterns, common problems |
| 08  | Hashmaps & Sets                | Frequency counting, lookups             |
| 09  | Recursion                      | Base case, call stack, divide & conquer |
| 10  | Sorting Algorithms             | Bubble, Selection, Merge, Quick         |
| 11  | Searching Algorithms           | Linear, Binary Search                   |
| 12  | Two Pointers & Sliding Window  | Optimized array/string techniques       |
| 13  | Stacks & Queues                | LIFO, FIFO, real-world applications     |
| 14  | Linked Lists                   | Nodes, traversal, reversal              |
| 15  | Trees & Binary Search Trees    | Traversal, insertion, deletion          |
| 16  | Graphs                         | BFS, DFS, shortest path                 |
| 17  | Dynamic Programming            | Memoization, tabulation, patterns       |
| 18  | Greedy Algorithms              | When and how to apply greedy            |
| 19  | Problem Solving Patterns       | Template approach for interviews        |
| 20  | Mock Interview & Final Review  | Full walkthrough & tips                 |

---

## 🎯 LESSON 01 — Foundations of Problem Solving

### What is Problem Solving?

Problem solving in software engineering is the ability to take a complex, ambiguous task and break it down into small, logical steps a computer can execute.

Every program ever written — from a calculator to Google Search — is just a series of well-defined steps for solving a problem.

### The Problem Solving Framework

Use this 5-step framework for **every** problem you encounter:

```
1. UNDERSTAND   → What exactly is being asked?
2. EXPLORE      → What are the inputs and expected outputs?
3. PLAN         → How will you solve it? (pseudocode)
4. CODE         → Implement the plan
5. REVIEW       → Test, optimize, and explain
```

### Step 1: Understand the Problem

Before writing a single line of code, ask yourself:

- What are the **inputs**?
- What is the expected **output**?
- Are there **edge cases** (empty input, negatives, large numbers)?
- What **constraints** exist (time, memory)?

**Example:**

> "Write a function that takes two numbers and returns their sum."

- Input: two numbers (e.g., 3 and 5)
- Output: one number (e.g., 8)
- Edge cases: What if they're decimals? What if one is negative?
- Constraint: none specified

### Step 2: Explore with Examples

Always create 3–5 concrete examples:

```
add(3, 5)     → 8
add(-1, 1)    → 0
add(0, 0)     → 0
add(100, 200) → 300
```

### Step 3: Write Pseudocode

Pseudocode is **plain English** that describes your algorithm before writing real code. It helps you think without worrying about syntax.

```
FUNCTION add(a, b):
    result = a + b
    RETURN result
```

### Step 4: Code It

```javascript
function add(a, b) {
  return a + b;
}
```

### Step 5: Review

- Does it pass all your test cases?
- Is it readable?
- Can it be simplified?

---

### 🔑 Key Concept: Decomposition

**Decomposition** means breaking a large problem into smaller sub-problems.

**Example Problem:** Build a program that finds the most expensive item in a shopping cart.

**Decomposed Steps:**

1. Get the list of items and their prices
2. Start with the first item as the "current max"
3. Go through each item
4. If any item costs more than the current max, update the max
5. Return the most expensive item

This is all problem solving is — breaking big things into small, manageable steps.

---

### 💡 Problem Solving Mindset

> "Every expert was once a beginner. The difference is they kept solving problems."

**Do:**

- Start with simple examples
- Talk through your logic out loud
- Write pseudocode first
- Be comfortable with not knowing the answer immediately

**Avoid:**

- Jumping straight into code
- Googling the exact solution before thinking
- Skipping edge cases

---

### 📝 Interview Questions — Lesson 01

**Q1: How do you approach a problem you've never seen before?**

> **Answer:** I use a structured framework: first I read the problem carefully and repeat it in my own words to make sure I understand it. Then I identify the inputs and expected outputs. I write 2-3 example test cases. Next, I write pseudocode to plan my approach before writing actual code. Finally, I code the solution and test it against my examples, including edge cases.

**Q2: What is pseudocode and why is it useful?**

> **Answer:** Pseudocode is an informal, plain-language description of an algorithm. It's not real code — it doesn't follow any specific syntax. It's useful because it lets you focus on _logic_ without worrying about syntax errors. It also makes it easier to communicate your approach to others and catch logical errors early.

**Q3: What are edge cases and why do they matter?**

> **Answer:** Edge cases are unusual or extreme inputs that might cause a program to behave unexpectedly. For example, if a function processes a list, an edge case might be an empty list, a list with one element, or a list with duplicate values. They matter because they often expose bugs that normal inputs won't reveal.

**Q4: What is decomposition in problem solving?**

> **Answer:** Decomposition is the process of breaking a complex problem into smaller, simpler sub-problems. Each sub-problem is easier to solve individually. Once all sub-problems are solved, they're combined to solve the original problem.

---

### 🏋️ Practice Problems — Lesson 01

1. Write pseudocode for a program that tells whether a number is even or odd.
2. Write pseudocode for a program that finds the largest of three numbers.
3. List 3 edge cases for a function that divides two numbers.

---

## 🎯 LESSON 02 — Variables, Data Types & Logic

### What is a Variable?

A variable is a named container that stores a value in memory.

```javascript
let age = 25; // stores the number 25
let name = "Alice"; // stores the text "Alice"
let isStudent = true; // stores a boolean
```

Think of variables like labeled boxes. The label is the variable name, and what's inside is the value.

### Data Types

Every value has a **type** that tells the computer how to store and process it.

#### Primitive Types

| Type               | Description         | Example          |
| ------------------ | ------------------- | ---------------- |
| `int` / `number`   | Whole numbers       | `42`, `-7`, `0`  |
| `float` / `double` | Decimal numbers     | `3.14`, `-0.5`   |
| `string`           | Text                | `"hello"`, `"A"` |
| `boolean`          | True or False       | `true`, `false`  |
| `null`             | Intentionally empty | `null`           |
| `undefined`        | Not yet assigned    | `undefined`      |

#### Reference Types

| Type       | Description            | Example                    |
| ---------- | ---------------------- | -------------------------- |
| `array`    | Ordered list of values | `[1, 2, 3]`                |
| `object`   | Key-value pairs        | `{name: "Alice", age: 25}` |
| `function` | Reusable block of code | `function greet() {}`      |

### Type Matters!

```javascript
let x = "5";
let y = 5;

console.log(x + y); // "55"  (string concatenation!)
console.log(y + y); // 10    (number addition)
```

This is a common bug. Always be aware of what type your variables hold.

---

### Boolean Logic

Boolean logic is the foundation of all decision-making in programming.

#### Comparison Operators

```javascript
5 == 5; // true  - equal to
5 != 3; // true  - not equal to
5 > 3; // true  - greater than
5 < 3; // false - less than
5 >= 5; // true  - greater than or equal to
5 <= 4; // false - less than or equal to
```

#### Logical Operators

```javascript
// AND → both must be true
true && true; // true
true && false; // false

// OR → at least one must be true
true || false; // true
false || false; // false

// NOT → flips the value
!true; // false
!false; // true
```

#### Truth Tables

```
AND (&&):
T && T = T
T && F = F
F && T = F
F && F = F

OR (||):
T || T = T
T || F = T
F || T = T
F || F = F
```

---

### Memory Model: How Variables Work

When you write `let x = 10;`, here's what happens:

1. The computer allocates a small chunk of memory
2. It stores the value `10` in that chunk
3. It associates the label `x` with that memory address

```
Memory:
┌─────────┬───────┐
│ Address │ Value │
├─────────┼───────┤
│  0x001  │  10   │  ← x
│  0x002  │  25   │  ← age
│  0x003  │ true  │  ← isStudent
└─────────┴───────┘
```

---

### 📝 Interview Questions — Lesson 02

**Q1: What is the difference between `==` and `===` in JavaScript?**

> **Answer:** `==` is a loose equality operator — it compares values but does **type coercion** first (e.g., `"5" == 5` is `true`). `===` is strict equality — it compares both **value AND type** (e.g., `"5" === 5` is `false`). Always prefer `===` to avoid unexpected bugs.

**Q2: What is type coercion?**

> **Answer:** Type coercion is when a programming language automatically converts one data type into another. For example, in JavaScript, `"5" + 3` results in `"53"` because the number `3` is coerced into a string. It can lead to subtle bugs if you're not careful.

**Q3: What is the difference between `null` and `undefined`?**

> **Answer:** `null` is an intentionally empty value — a developer explicitly sets it to indicate "no value." `undefined` means a variable has been declared but not yet assigned a value. Both represent "no value," but they have different semantic meanings.

**Q4: Can you explain short-circuit evaluation?**

> **Answer:** In JavaScript (and many languages), `&&` and `||` use short-circuit evaluation. With `&&`, if the first operand is `false`, the second is never evaluated. With `||`, if the first operand is `true`, the second is never evaluated. This is useful for default values: `let name = input || "Guest"` — if `input` is falsy, `name` becomes `"Guest"`.

---

### 🏋️ Practice Problems — Lesson 02

1. What does `true && false || true` evaluate to? (Hint: `&&` has higher precedence than `||`)
2. Predict the output: `console.log("10" - 5)` — what happens and why?
3. Write variables to store: your name, your age, whether you're a student, and your GPA.

---

## 🎯 LESSON 03 — Conditionals & Decision Making

### The `if` Statement

An `if` statement runs a block of code **only if** a condition is true.

```javascript
if (condition) {
  // code runs if condition is true
}
```

**Example:**

```javascript
let temperature = 35;

if (temperature > 30) {
  console.log("It's hot outside!");
}
// Output: "It's hot outside!"
```

### `if...else`

```javascript
let age = 16;

if (age >= 18) {
  console.log("You can vote.");
} else {
  console.log("You cannot vote yet.");
}
// Output: "You cannot vote yet."
```

### `if...else if...else`

```javascript
let score = 75;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}
// Output: "Grade: C"
```

### Nested Conditionals

```javascript
let isLoggedIn = true;
let isAdmin = false;

if (isLoggedIn) {
  if (isAdmin) {
    console.log("Welcome, Admin!");
  } else {
    console.log("Welcome, User!");
  }
} else {
  console.log("Please log in.");
}
// Output: "Welcome, User!"
```

> ⚠️ **Tip:** Deeply nested conditionals are hard to read. Aim for maximum 2–3 levels of nesting. Refactor into functions when it gets complex.

### The `switch` Statement

`switch` is cleaner than multiple `if...else if` when checking a single variable against many values.

```javascript
let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of work week");
    break;
  case "Friday":
    console.log("End of work week");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend!");
    break;
  default:
    console.log("Midweek");
}
```

> ⚠️ Always include `break` — without it, execution "falls through" to the next case.

### Ternary Operator

A compact version of `if...else` for simple conditions:

```javascript
// Syntax: condition ? valueIfTrue : valueIfFalse

let age = 20;
let status = age >= 18 ? "adult" : "minor";
console.log(status); // "adult"
```

---

### Common Pattern: Guard Clauses

Instead of deeply nesting, return early when conditions fail:

```javascript
// ❌ Deeply nested
function processUser(user) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        // do the actual work
        return "Processing...";
      }
    }
  }
}

// ✅ Guard clauses (flat, readable)
function processUser(user) {
  if (!user) return "No user";
  if (!user.isActive) return "User is inactive";
  if (!user.hasPermission) return "No permission";

  // do the actual work
  return "Processing...";
}
```

---

### 📝 Interview Questions — Lesson 03

**Q1: What is the difference between `if...else if` and multiple `if` statements?**

> **Answer:** With `if...else if`, once one condition is `true`, the rest are skipped — only one branch executes. With multiple `if` statements, each condition is checked independently, so multiple blocks can execute. Use `if...else if` when only one case should run; use multiple `if` statements when cases are independent.

**Q2: When would you use `switch` over `if...else if`?**

> **Answer:** Use `switch` when you're comparing a single variable against many discrete values (like a menu selection, day of the week, or status code). It's more readable than a long chain of `if...else if` in those scenarios. However, `if...else if` is better when you have complex conditions involving ranges or multiple variables.

**Q3: What are guard clauses and why are they good practice?**

> **Answer:** Guard clauses are early return statements at the top of a function that handle invalid or edge-case inputs immediately. They reduce nesting, make the "happy path" clearer, and make code easier to read and maintain.

**Q4: What is "short-circuit" and how can it simplify conditionals?**

> **Answer:** Because of short-circuit evaluation, we can write `user && user.name` instead of `if (user) { return user.name; }`. The right side is only evaluated if the left side is truthy. This is common for optional chaining checks.

---

### 🏋️ Practice Problems — Lesson 03

1. Write a function `classifyBMI(bmi)` that returns `"Underweight"`, `"Normal"`, `"Overweight"`, or `"Obese"` based on BMI ranges.
2. Write a function `fizzbuzz(n)` that returns `"Fizz"` if n is divisible by 3, `"Buzz"` if divisible by 5, `"FizzBuzz"` if divisible by both, and the number otherwise.
3. Rewrite this deeply nested code using guard clauses:

```javascript
function login(user, password) {
  if (user) {
    if (password) {
      if (user.password === password) {
        return "Login successful";
      }
    }
  }
  return "Login failed";
}
```

---

## 🎯 LESSON 04 — Loops & Iteration

### Why Loops?

Loops let you repeat code without writing it multiple times.

```javascript
// Without a loop — tedious:
console.log(1);
console.log(2);
console.log(3);
// ... up to 100?

// With a loop — elegant:
for (let i = 1; i <= 100; i++) {
  console.log(i);
}
```

### The `for` Loop

Best when you know exactly how many times to repeat.

```javascript
for (initialization; condition; update) {
  // code to repeat
}

// Example: Print 1 to 5
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// Output: 1 2 3 4 5
```

**Step by Step:**

1. `let i = 1` — start with i = 1
2. `i <= 5` — keep looping while this is true
3. `i++` — increment i by 1 after each iteration

### The `while` Loop

Best when you don't know in advance how many times to repeat.

```javascript
while (condition) {
  // code to repeat
}

// Example: Keep asking for input until valid
let input = "";
while (input !== "quit") {
  input = getUserInput(); // imaginary function
  processInput(input);
}
```

### The `do...while` Loop

Runs at least once, then checks the condition.

```javascript
do {
  // code runs at least once
} while (condition);

let number = 0;
do {
  console.log("Running at least once");
  number++;
} while (number < 3);
// Output: "Running at least once" (printed 3 times)
```

### `for...of` — Iterating Arrays

```javascript
let fruits = ["apple", "banana", "cherry"];

for (let fruit of fruits) {
  console.log(fruit);
}
// apple
// banana
// cherry
```

### `for...in` — Iterating Objects

```javascript
let person = { name: "Alice", age: 25, city: "NYC" };

for (let key in person) {
  console.log(key + ": " + person[key]);
}
// name: Alice
// age: 25
// city: NYC
```

---

### Loop Control: `break` and `continue`

```javascript
// break: exit the loop early
for (let i = 1; i <= 10; i++) {
  if (i === 5) break;
  console.log(i);
}
// Output: 1 2 3 4

// continue: skip current iteration
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;
  console.log(i);
}
// Output: 1 2 4 5
```

---

### Common Loop Patterns

#### Pattern 1: Accumulator

```javascript
// Sum all numbers in an array
let numbers = [1, 2, 3, 4, 5];
let sum = 0;

for (let num of numbers) {
  sum += num; // accumulate
}
console.log(sum); // 15
```

#### Pattern 2: Find Maximum

```javascript
let prices = [12, 45, 7, 89, 23];
let max = prices[0]; // assume first is max

for (let i = 1; i < prices.length; i++) {
  if (prices[i] > max) {
    max = prices[i]; // update max
  }
}
console.log(max); // 89
```

#### Pattern 3: Filtering

```javascript
let ages = [12, 25, 18, 7, 30];
let adults = [];

for (let age of ages) {
  if (age >= 18) {
    adults.push(age);
  }
}
console.log(adults); // [25, 18, 30]
```

#### Pattern 4: Nested Loops (2D)

```javascript
// Print multiplication table
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(i + " x " + j + " = " + i * j);
  }
}
```

---

### 📝 Interview Questions — Lesson 04

**Q1: What is an infinite loop and how do you prevent it?**

> **Answer:** An infinite loop runs forever because its condition never becomes `false`. For example, `while (true) {}`. To prevent it: always ensure the loop variable changes in each iteration and the condition will eventually be false. Also, double-check that `break` is reachable in loops that only exit via `break`.

**Q2: What's the difference between `for...of` and `for...in`?**

> **Answer:** `for...of` iterates over the **values** of an iterable (arrays, strings, maps). `for...in` iterates over the **keys** (or indices) of an object. Using `for...in` on an array gives you the indices (0, 1, 2...) as strings — generally avoid `for...in` on arrays; use `for...of` instead.

**Q3: When would you use `while` over `for`?**

> **Answer:** Use `while` when you don't know upfront how many iterations are needed — for example, reading user input until they type "quit," or processing data until a certain condition is met. Use `for` when you know the count in advance, like iterating over every element in an array.

**Q4: What is the time complexity of a loop inside a loop?**

> **Answer:** A single loop over n elements is O(n). Two nested loops, each going up to n, is O(n²). Three nested loops would be O(n³). This is why nested loops should be avoided for large datasets — they scale poorly.

---

### 🏋️ Practice Problems — Lesson 04

1. Write a loop that prints all even numbers from 2 to 20.
2. Write a function `sumArray(arr)` that returns the sum of all elements using a loop.
3. Write a function `countVowels(str)` that counts the number of vowels in a string using a loop.
4. Write a function that finds the second largest number in an array.

---

## 🎯 LESSON 05 — Functions & Abstraction

### What is a Function?

A function is a named, reusable block of code that performs a specific task.

```javascript
function greet(name) {
  // definition
  return "Hello, " + name + "!";
}

let message = greet("Alice"); // call
console.log(message); // "Hello, Alice!"
```

### Why Functions?

1. **DRY (Don't Repeat Yourself)** — Write logic once, use many times
2. **Abstraction** — Hide complexity behind a simple name
3. **Testability** — Easier to test small, focused functions
4. **Readability** — Code reads like plain English

---

### Anatomy of a Function

```javascript
//  ┌── keyword   ┌── name   ┌── parameters
function calculateArea(width, height) {
  let area = width * height; // function body
  return area; // return value
}
//                    └── arguments
let result = calculateArea(5, 10); // 50
```

### Parameters vs Arguments

- **Parameters** are placeholders defined in the function signature
- **Arguments** are the actual values passed when calling the function

```javascript
function add(a, b) {
  // a and b are parameters
  return a + b;
}

add(3, 5); // 3 and 5 are arguments
```

### Default Parameters

```javascript
function greet(name = "World") {
  return "Hello, " + name + "!";
}

greet("Alice"); // "Hello, Alice!"
greet(); // "Hello, World!" (uses default)
```

### Return Values

A function can return any type — or nothing at all.

```javascript
function isEven(n) {
  return n % 2 === 0; // returns boolean
}

function printName(name) {
  console.log(name); // returns nothing (undefined)
}
```

---

### Pure Functions

A **pure function** always returns the same output for the same input and has no side effects.

```javascript
// ✅ Pure function
function multiply(a, b) {
  return a * b;
}

// ❌ Impure — depends on external state
let tax = 0.1;
function calculateTotal(price) {
  return price + price * tax; // depends on `tax`
}
```

Pure functions are easier to test, debug, and reason about.

---

### Function Scope

Variables declared inside a function are not accessible outside it.

```javascript
function calculate() {
  let result = 42; // only accessible inside
  return result;
}

console.log(result); // ❌ ReferenceError
```

---

### Arrow Functions (Modern Syntax)

```javascript
// Traditional
function square(n) {
  return n * n;
}

// Arrow function
const square = (n) => n * n;

// Multi-line arrow function
const add = (a, b) => {
  let sum = a + b;
  return sum;
};
```

---

### Common Function Patterns

#### Pattern 1: Transform (map)

```javascript
function double(numbers) {
  let result = [];
  for (let n of numbers) {
    result.push(n * 2);
  }
  return result;
}
double([1, 2, 3]); // [2, 4, 6]
```

#### Pattern 2: Filter

```javascript
function getEvens(numbers) {
  let evens = [];
  for (let n of numbers) {
    if (n % 2 === 0) evens.push(n);
  }
  return evens;
}
getEvens([1, 2, 3, 4, 5]); // [2, 4]
```

#### Pattern 3: Reduce

```javascript
function sum(numbers) {
  let total = 0;
  for (let n of numbers) {
    total += n;
  }
  return total;
}
sum([1, 2, 3, 4, 5]); // 15
```

---

### 📝 Interview Questions — Lesson 05

**Q1: What is the difference between a function declaration and a function expression?**

> **Answer:** A **function declaration** (`function foo() {}`) is hoisted — it's available throughout its scope even before the line it's defined on. A **function expression** (`const foo = function() {}`) is not hoisted — it's only available after the assignment. Arrow functions are also function expressions.

**Q2: What does it mean for a function to be "pure"?**

> **Answer:** A pure function has two properties: (1) It always returns the same output for the same input, and (2) It has no side effects (doesn't modify external state, doesn't do I/O). Pure functions are predictable, easy to test, and safe to use in concurrent environments.

**Q3: What is function scope?**

> **Answer:** Variables declared inside a function are only accessible within that function — they have local scope. The outer scope cannot access inner variables. This prevents naming conflicts and protects internal state.

**Q4: What is the DRY principle?**

> **Answer:** DRY stands for "Don't Repeat Yourself." It means every piece of logic should appear only once. If you find yourself writing the same code in multiple places, it should be extracted into a function. DRY code is easier to maintain — when logic changes, you only update it in one place.

---

## 🎯 LESSON 06 — Arrays & Lists

### What is an Array?

An array is an ordered collection of values, accessed by index (starting from 0).

```javascript
let fruits = ["apple", "banana", "cherry"];
//              [0]      [1]       [2]

console.log(fruits[0]); // "apple"
console.log(fruits[2]); // "cherry"
console.log(fruits.length); // 3
```

### Creating Arrays

```javascript
let empty = []; // empty array
let numbers = [1, 2, 3, 4, 5]; // number array
let mixed = [1, "hello", true, null]; // mixed types
let matrix = [
  [1, 2],
  [3, 4],
  [5, 6],
]; // 2D array
```

### Core Array Methods

```javascript
let arr = [1, 2, 3];

// Add/Remove
arr.push(4); // [1, 2, 3, 4]   — add to end
arr.pop(); // [1, 2, 3]      — remove from end
arr.unshift(0); // [0, 1, 2, 3]  — add to start
arr.shift(); // [1, 2, 3]      — remove from start

// Find
arr.indexOf(2); // 1              — first index of value
arr.includes(3); // true           — check existence
arr.find((n) => n > 2); // 3         — first match

// Transform
arr.slice(1, 3); // [2, 3]         — extract portion (non-mutating)
arr.splice(1, 1); // removes index 1 (mutating!)
arr.reverse(); // [3, 2, 1]      — reverse in place
arr.sort(); // sort (default: alphabetical!)

// Iterate
arr.forEach((n) => console.log(n)); // loop over each
arr.map((n) => n * 2); // [2, 4, 6] — transform each
arr.filter((n) => n > 1); // [2, 3] — keep matching
arr.reduce((acc, n) => acc + n, 0); // 6 — reduce to single value
```

> ⚠️ **Critical:** `sort()` converts to strings by default! `[10, 2, 1].sort()` gives `[1, 10, 2]`.
> Always pass a comparator: `arr.sort((a, b) => a - b)` for numeric sort.

---

### Array Traversal Patterns

#### Pattern 1: Count occurrences

```javascript
function countItem(arr, target) {
  let count = 0;
  for (let item of arr) {
    if (item === target) count++;
  }
  return count;
}
countItem([1, 2, 2, 3, 2], 2); // 3
```

#### Pattern 2: Reverse an array manually

```javascript
function reverseArray(arr) {
  let reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
}
reverseArray([1, 2, 3]); // [3, 2, 1]
```

#### Pattern 3: Find duplicates

```javascript
function hasDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}
```

---

### 📝 Interview Questions — Lesson 06

**Q1: What is the difference between `push`/`pop` and `shift`/`unshift`?**

> **Answer:** `push` adds to the **end** and `pop` removes from the **end** — both are O(1) operations. `unshift` adds to the **start** and `shift` removes from the **start** — both are O(n) because all other elements must be re-indexed.

**Q2: What is the difference between `splice` and `slice`?**

> **Answer:** `slice(start, end)` returns a new sub-array without modifying the original. `splice(start, deleteCount, ...items)` modifies the original array — it removes elements and optionally inserts new ones. Remember: **slice** is safe (non-mutating), **splice** is destructive (mutating).

**Q3: How do you remove duplicates from an array?**

> **Answer:** The most elegant way in modern JS is to convert to a Set (which only holds unique values) and back: `[...new Set(arr)]`. Alternatively, use `filter` with `indexOf`: `arr.filter((item, index) => arr.indexOf(item) === index)`.

**Q4: What is the time complexity of searching an unsorted array?**

> **Answer:** O(n) — you have to check every element in the worst case because there's no ordering to exploit. This is called linear search.

---

### 🏋️ Practice Problems — Lesson 06

1. Write `flatten(arr)` that flattens `[[1,2],[3,4],[5]]` to `[1,2,3,4,5]`.
2. Write `rotate(arr, k)` that rotates an array `k` positions to the right.
3. Write `intersection(arr1, arr2)` that returns common elements.
4. **Classic:** Given `[2, 7, 11, 15]` and target `9`, find two numbers that sum to the target.

---

## 🎯 LESSON 07 — Strings

### String Basics

A string is a sequence of characters, indexed just like an array.

```javascript
let str = "Hello, World!";
//         0123456789...

str.length; // 13
str[0]; // "H"
str[7]; // "W"
str[str.length - 1]; // "!"
```

### Key String Methods

```javascript
let s = "Hello, World!";

// Case
s.toUpperCase(); // "HELLO, WORLD!"
s.toLowerCase(); // "hello, world!"

// Search
s.indexOf("World"); // 7
s.includes("Hello"); // true
s.startsWith("He"); // true
s.endsWith("!"); // true

// Extract
s.slice(7, 12); // "World"
s.substring(7, 12); // "World"

// Modify
s.replace("World", "Alice"); // "Hello, Alice!"
s.trim(); // removes whitespace from both ends
s.split(", "); // ["Hello", "World!"]

// Repeat/Pad
"ab".repeat(3); // "ababab"
"5".padStart(3, "0"); // "005"
```

---

### String ↔ Array Conversion

```javascript
// String to array
"hello".split(""); // ["h", "e", "l", "l", "o"]
"a,b,c".split(","); // ["a", "b", "c"]

// Array to string
["h", "e", "l", "l", "o"].join(""); // "hello"
["a", "b", "c"].join("-"); // "a-b-c"
```

---

### Common String Patterns

#### Pattern 1: Check if Palindrome

```javascript
function isPalindrome(str) {
  let reversed = str.split("").reverse().join("");
  return str === reversed;
}
isPalindrome("racecar"); // true
isPalindrome("hello"); // false
```

#### Pattern 2: Count character frequency

```javascript
function charFrequency(str) {
  let freq = {};
  for (let char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}
charFrequency("hello"); // { h:1, e:1, l:2, o:1 }
```

#### Pattern 3: Check Anagram

```javascript
function isAnagram(s1, s2) {
  return s1.split("").sort().join("") === s2.split("").sort().join("");
}
isAnagram("listen", "silent"); // true
isAnagram("hello", "world"); // false
```

#### Pattern 4: Reverse words in a sentence

```javascript
function reverseWords(sentence) {
  return sentence.split(" ").reverse().join(" ");
}
reverseWords("Hello World"); // "World Hello"
```

---

### 📝 Interview Questions — Lesson 07

**Q1: Are strings mutable in JavaScript?**

> **Answer:** No — strings are **immutable** in JavaScript. When you call `str.replace()` or `str.toUpperCase()`, a new string is returned; the original is unchanged. This means every string operation creates a new string in memory.

**Q2: How do you check if a string is a palindrome?**

> **Answer:** Compare the string to its reverse. `str === str.split("").reverse().join("")`. For a more efficient O(n/2) approach, use two pointers — one at the start and one at the end — comparing characters as they move inward, stopping when they meet in the middle.

**Q3: What is the time complexity of string concatenation in a loop?**

> **Answer:** Each concatenation creates a new string in memory. Doing this in a loop of n iterations is O(n²). The efficient approach is to collect all strings in an array and join them at the end: O(n).

**Q4: How would you count the occurrences of each character in a string?**

> **Answer:** Use a hash map. Loop through each character, and for each one, increment its count in the map. This is O(n) time and O(k) space where k is the number of unique characters.

---

## 🎯 LESSON 08 — Hashmaps & Sets

### What is a HashMap?

A HashMap (called Object or Map in JavaScript) stores **key-value pairs** for O(1) average lookup.

```javascript
// Object as HashMap
let map = {};
map["apple"] = 3;
map["banana"] = 5;
map["apple"]; // 3 (O(1) lookup!)

// ES6 Map
let m = new Map();
m.set("apple", 3);
m.set("banana", 5);
m.get("apple"); // 3
m.has("cherry"); // false
m.size; // 2
```

### Why HashMaps are Powerful

Without a HashMap:

- "Is 'apple' in this list of 1,000,000 items?" → O(n) — check every item

With a HashMap:

- Same question → O(1) — direct key lookup

---

### What is a Set?

A Set stores **unique values** with O(1) lookup.

```javascript
let set = new Set();
set.add(1);
set.add(2);
set.add(2); // duplicate, ignored
set.add(3);

set.size; // 3
set.has(2); // true
set.has(99); // false
set.delete(1);

// Remove duplicates from array
let unique = [...new Set([1, 2, 2, 3, 3])]; // [1, 2, 3]
```

---

### The Frequency Counter Pattern

This is one of the most powerful patterns in problem solving.

**Problem:** Given two arrays, check if they have the same elements (regardless of order).

```javascript
// ❌ Naive O(n²) approach
function sameElements(arr1, arr2) {
  for (let val of arr1) {
    if (!arr2.includes(val)) return false; // O(n) inside O(n)
  }
  return true;
}

// ✅ HashMap O(n) approach
function sameElements(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  let freq = {};

  for (let val of arr1) {
    freq[val] = (freq[val] || 0) + 1;
  }

  for (let val of arr2) {
    if (!freq[val]) return false;
    freq[val]--;
  }

  return true;
}
```

---

### Classic HashMap Problems

#### Two Sum

```javascript
// Given an array and target, find indices of two numbers that sum to target
function twoSum(nums, target) {
  let seen = new Map(); // value → index

  for (let i = 0; i < nums.length; i++) {
    let complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}
twoSum([2, 7, 11, 15], 9); // [0, 1] → 2 + 7 = 9
```

#### First Non-Repeating Character

```javascript
function firstUnique(str) {
  let freq = {};
  for (let ch of str) freq[ch] = (freq[ch] || 0) + 1;
  for (let ch of str) if (freq[ch] === 1) return ch;
  return null;
}
firstUnique("leetcode"); // "l"
```

---

### 📝 Interview Questions — Lesson 08

**Q1: What is the time complexity of HashMap operations?**

> **Answer:** Average case: O(1) for get, set, and delete. Worst case is O(n) due to hash collisions, but in practice with a good hash function, collisions are rare and amortized cost is O(1).

**Q2: When would you use a Set vs an Array?**

> **Answer:** Use a Set when you need to: (1) ensure uniqueness of values, (2) quickly check membership (O(1) vs O(n) for arrays), or (3) perform set operations (union, intersection). Use an array when order matters or duplicates are allowed.

**Q3: How does the Two Sum problem benefit from a HashMap?**

> **Answer:** The naive approach checks every pair — O(n²). With a HashMap, we iterate once and store each number. For each new number, we check if its "complement" (target - current) exists in the map — O(1) lookup. Total time: O(n).

**Q4: What is hashing?**

> **Answer:** Hashing is the process of converting any value into a fixed-size integer (the "hash code") using a hash function. This hash code is used as an index into a backing array. Good hash functions distribute values evenly to minimize collisions.

---

## 🎯 LESSON 09 — Recursion

### What is Recursion?

Recursion is when a function calls **itself** to solve a smaller version of the same problem.

```javascript
function countdown(n) {
  if (n <= 0) {
    // base case: stop
    console.log("Done!");
    return;
  }
  console.log(n);
  countdown(n - 1); // recursive call (smaller problem)
}
countdown(3);
// 3
// 2
// 1
// Done!
```

### The Two Rules of Recursion

1. **Base Case** — The condition where recursion stops. Without this, you get infinite recursion (stack overflow).
2. **Recursive Case** — The function calls itself with a smaller/simpler input, moving toward the base case.

---

### The Call Stack

Every function call is added to the "call stack." With recursion:

```
countdown(3)
  → countdown(2)
      → countdown(1)
          → countdown(0)  ← base case, returns
          ↑ returns
      ↑ returns
  ↑ returns
```

Each call waits for the inner call to complete.

---

### Classic: Factorial

```
n! = n × (n-1) × (n-2) × ... × 1
5! = 5 × 4 × 3 × 2 × 1 = 120
```

```javascript
// Recursive definition: n! = n × (n-1)!
function factorial(n) {
  if (n <= 1) return 1; // base case
  return n * factorial(n - 1); // recursive case
}

factorial(5);
// = 5 * factorial(4)
// = 5 * 4 * factorial(3)
// = 5 * 4 * 3 * factorial(2)
// = 5 * 4 * 3 * 2 * factorial(1)
// = 5 * 4 * 3 * 2 * 1
// = 120
```

### Classic: Fibonacci

```
F(0) = 0
F(1) = 1
F(n) = F(n-1) + F(n-2)
```

```javascript
function fib(n) {
  if (n <= 1) return n; // base cases
  return fib(n - 1) + fib(n - 2); // recursive case
}

fib(6); // 8
// (0, 1, 1, 2, 3, 5, 8)
```

> ⚠️ This naive Fibonacci is O(2^n) — exponentially slow. Use memoization to fix this (see Lesson 17).

---

### Recursion vs Iteration

Most recursive problems can also be solved iteratively:

```javascript
// Recursive factorial
function factRec(n) {
  if (n <= 1) return 1;
  return n * factRec(n - 1);
}

// Iterative factorial
function factIter(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
```

Use recursion when the problem is naturally recursive (trees, divide & conquer). Use iteration for simple linear problems — iteration is usually faster and avoids stack overflow.

---

### 📝 Interview Questions — Lesson 09

**Q1: What is a base case and why is it critical in recursion?**

> **Answer:** A base case is the condition that stops recursive calls. Without a base case, the function would call itself indefinitely, eventually causing a stack overflow error. The base case must be reachable — every recursive call must move closer to the base case.

**Q2: What is a stack overflow?**

> **Answer:** A stack overflow occurs when the call stack runs out of memory. In recursion, if there are too many nested calls (e.g., no base case, or very deep recursion), the stack fills up and throws an error. This is why deep recursion should sometimes be replaced with an iterative approach or tail-call optimization.

**Q3: How does memoization improve recursive Fibonacci?**

> **Answer:** Naive Fibonacci recalculates the same sub-problems many times. Memoization stores the result of each `fib(n)` call in a cache. On subsequent calls for the same `n`, the cached result is returned immediately. This reduces time from O(2^n) to O(n).

**Q4: Can every recursive function be written iteratively?**

> **Answer:** Yes, theoretically — recursion is just a way of using the call stack, and you can always simulate a call stack with an explicit stack data structure. However, some problems (like tree traversal) are much more naturally expressed recursively, so the trade-off is code clarity vs. performance.

---

## 🎯 LESSON 10 — Sorting Algorithms

### Why Learn Sorting?

Sorting is one of the most fundamental operations in CS. Understanding different sorting algorithms teaches you about:

- Time and space complexity trade-offs
- Algorithm design paradigms
- When to use which approach

---

### Bubble Sort — The Simplest

Repeatedly compare adjacent elements and swap them if they're in the wrong order.

```javascript
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
bubbleSort([64, 34, 25, 12, 22]); // [12, 22, 25, 34, 64]
```

**Visual:**

```
[64, 34, 25, 12, 22]
[34, 25, 12, 22, 64]  ← 64 "bubbled" to the end
[25, 12, 22, 34, 64]
[12, 22, 25, 34, 64]  ← sorted!
```

**Complexity:** O(n²) time, O(1) space. Good for teaching, bad for production.

---

### Selection Sort

Find the minimum element and place it at the front, repeatedly.

```javascript
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}
```

**Complexity:** O(n²) time, O(1) space.

---

### Merge Sort — Divide & Conquer

Split the array in half, recursively sort each half, then merge them.

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr; // base case

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}
```

**Visual:**

```
[38, 27, 43, 3]
  [38, 27] [43, 3]
  [38][27]  [43][3]
  [27, 38]  [3, 43]
  [3, 27, 38, 43]
```

**Complexity:** O(n log n) time, O(n) space. Excellent for large datasets.

---

### Sorting Complexity Comparison

| Algorithm      | Best       | Average    | Worst      | Space    | Stable? |
| -------------- | ---------- | ---------- | ---------- | -------- | ------- |
| Bubble Sort    | O(n)       | O(n²)      | O(n²)      | O(1)     | Yes     |
| Selection Sort | O(n²)      | O(n²)      | O(n²)      | O(1)     | No      |
| Insertion Sort | O(n)       | O(n²)      | O(n²)      | O(1)     | Yes     |
| Merge Sort     | O(n log n) | O(n log n) | O(n log n) | O(n)     | Yes     |
| Quick Sort     | O(n log n) | O(n log n) | O(n²)      | O(log n) | No      |
| Heap Sort      | O(n log n) | O(n log n) | O(n log n) | O(1)     | No      |

---

### 📝 Interview Questions — Lesson 10

**Q1: Why is Merge Sort preferred over Bubble Sort for large arrays?**

> **Answer:** Bubble Sort is O(n²) — doubling the input quadruples the operations. Merge Sort is O(n log n) — much more scalable. For 1,000 elements: Bubble Sort makes ~1,000,000 comparisons; Merge Sort makes ~10,000.

**Q2: What does "stable" mean in sorting?**

> **Answer:** A stable sort preserves the original relative order of equal elements. For example, if you sort a list of students by grade, a stable sort ensures students with the same grade remain in their original order. Merge sort is stable; quicksort (in most implementations) is not.

**Q3: When would you use Insertion Sort despite it being O(n²)?**

> **Answer:** Insertion Sort is excellent for small arrays (n < 20) because its overhead is very low, and it's very fast on nearly-sorted data (best case O(n)). Many production sort implementations (like Timsort in Python) use insertion sort for small subarrays within a merge sort framework.

---

## 🎯 LESSON 11 — Searching Algorithms

### Linear Search

Check every element one by one until you find the target.

```javascript
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1; // not found
}

linearSearch([3, 5, 1, 8, 4], 8); // 3
linearSearch([3, 5, 1, 8, 4], 9); // -1
```

**Complexity:** O(n) — must check every element in the worst case.
**When to use:** Unsorted arrays, or small arrays.

---

### Binary Search

For **sorted** arrays only. Check the middle element — if target is smaller, search left half; if larger, search right half. Halve the search space each time.

```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid; // found!
    if (arr[mid] < target)
      left = mid + 1; // search right
    else right = mid - 1; // search left
  }

  return -1; // not found
}

binarySearch([1, 3, 5, 7, 9, 11], 7); // 3
binarySearch([1, 3, 5, 7, 9, 11], 6); // -1
```

**Visual (searching for 7 in [1, 3, 5, 7, 9, 11]):**

```
left=0, right=5, mid=2 → arr[2]=5 < 7 → search right
left=3, right=5, mid=4 → arr[4]=9 > 7 → search left
left=3, right=3, mid=3 → arr[3]=7 === 7 → found!
```

**Complexity:** O(log n) — cuts the search space in half each step.

> With 1,000,000 sorted elements, binary search takes at most 20 steps (log₂(1,000,000) ≈ 20).

---

### Binary Search Variants

#### Find First Occurrence

```javascript
function findFirst(arr, target) {
  let left = 0,
    right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      result = mid;
      right = mid - 1; // keep searching left for earlier occurrence
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}
```

#### Find Insert Position

```javascript
function searchInsert(arr, target) {
  let left = 0,
    right = arr.length;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) left = mid + 1;
    else right = mid;
  }
  return left;
}
```

---

### 📝 Interview Questions — Lesson 11

**Q1: What is the prerequisite for Binary Search?**

> **Answer:** The array must be **sorted**. Binary search exploits the ordering to eliminate half the search space at each step. On an unsorted array, it would give incorrect results.

**Q2: What is the time complexity of Binary Search and why?**

> **Answer:** O(log n). At each step we halve the search space: n → n/2 → n/4 → ... → 1. The number of steps is log₂(n). For 1 billion elements, it takes at most 30 steps.

**Q3: How would you use Binary Search to find the first element greater than a target?**

> **Answer:** Modify binary search to track the last index where `arr[mid] > target` and continue searching left. When the loop ends, return the tracked index. This is essentially finding the "upper bound" and is a common binary search variant.

---

## 🎯 LESSON 12 — Two Pointers & Sliding Window

### Two Pointers Technique

Use two indices that move through an array — often from opposite ends or at different speeds.

**Best for:** Pairs, sorted arrays, palindromes, removing duplicates.

#### Pattern 1: Opposite Ends

```javascript
// Check if array is a palindrome
function isPalindrome(arr) {
  let left = 0,
    right = arr.length - 1;

  while (left < right) {
    if (arr[left] !== arr[right]) return false;
    left++;
    right--;
  }
  return true;
}
```

#### Pattern 2: Two Sum (Sorted Array)

```javascript
// Find pair that sums to target in sorted array
function twoSumSorted(arr, target) {
  let left = 0,
    right = arr.length - 1;

  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target)
      left++; // need bigger sum
    else right--; // need smaller sum
  }
  return [];
}
twoSumSorted([1, 3, 5, 7, 9], 8); // [1, 3] → 3 + 5 = 8
```

#### Pattern 3: Remove Duplicates (Sorted)

```javascript
function removeDuplicates(arr) {
  let write = 1; // slow pointer (write position)

  for (let read = 1; read < arr.length; read++) {
    // fast pointer
    if (arr[read] !== arr[read - 1]) {
      arr[write] = arr[read];
      write++;
    }
  }
  return write; // length of unique portion
}
```

---

### Sliding Window Technique

Maintain a "window" (subarray) and slide it across the array. Instead of recalculating from scratch each time, update the window by adding one element and removing another.

**Best for:** Subarrays/substrings of a fixed or variable size.

#### Fixed Window: Max Sum Subarray of Size K

```javascript
function maxSumSubarray(arr, k) {
  let windowSum = 0;
  let maxSum = 0;

  // Build first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  // Slide the window
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i]; // add new element
    windowSum -= arr[i - k]; // remove old element
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}
maxSumSubarray([2, 1, 5, 1, 3, 2], 3); // 9 (subarray [5,1,3])
```

#### Variable Window: Longest Substring Without Repeating

```javascript
function lengthOfLongestSubstring(s) {
  let seen = new Set();
  let left = 0,
    maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    // Shrink window from left while duplicate exists
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
lengthOfLongestSubstring("abcabcbb"); // 3 ("abc")
```

---

### 📝 Interview Questions — Lesson 12

**Q1: When would you use the two-pointer technique?**

> **Answer:** When the array is sorted and you're looking for pairs or triplets with a certain sum, or when comparing elements from both ends (palindrome check). The key insight is that you can decide which pointer to move based on whether the current sum/comparison is too large or too small.

**Q2: What is the advantage of the Sliding Window over a brute force approach?**

> **Answer:** Brute force recalculates each subarray from scratch — O(n²) or O(n²k). Sliding window reuses previous calculations by incrementally updating the window — O(n). Instead of summing k elements for every position, we add one and remove one.

**Q3: What's the difference between a fixed and variable sliding window?**

> **Answer:** A fixed window has a predetermined size k — we always maintain exactly k elements. A variable window expands and contracts based on conditions (e.g., "expand until a duplicate appears, then shrink"). Variable windows typically use two pointers (left and right) with a condition to manage the window boundaries.

---

## 🎯 LESSON 13 — Stacks & Queues

### The Stack

A stack is a **LIFO** (Last In, First Out) data structure — like a stack of plates.

```
Push 1 → [1]
Push 2 → [1, 2]
Push 3 → [1, 2, 3]
Pop    → returns 3, stack is [1, 2]
```

```javascript
class Stack {
  constructor() {
    this.items = [];
  }
  push(item) {
    this.items.push(item);
  }
  pop() {
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
}
```

**Real-world uses:** Browser back button, function call stack, undo/redo, balanced parentheses.

#### Classic Stack Problem: Balanced Parentheses

```javascript
function isBalanced(str) {
  let stack = [];
  let map = { ")": "(", "}": "{", "]": "[" };

  for (let ch of str) {
    if ("({[".includes(ch)) {
      stack.push(ch); // opening bracket → push
    } else if (")}]".includes(ch)) {
      if (stack.pop() !== map[ch]) return false; // mismatch
    }
  }
  return stack.length === 0; // must be empty
}
isBalanced("({[]})"); // true
isBalanced("({)}"); // false
```

---

### The Queue

A queue is a **FIFO** (First In, First Out) data structure — like a line at a checkout.

```
Enqueue 1 → [1]
Enqueue 2 → [1, 2]
Enqueue 3 → [1, 2, 3]
Dequeue   → returns 1, queue is [2, 3]
```

```javascript
class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(item) {
    this.items.push(item);
  }
  dequeue() {
    return this.items.shift();
  }
  front() {
    return this.items[0];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
}
```

**Real-world uses:** Print queue, BFS traversal, task scheduling, message queues.

---

### 📝 Interview Questions — Lesson 13

**Q1: What is LIFO and FIFO?**

> **Answer:** LIFO (Last In, First Out) is the principle of a stack — the last item added is the first removed, like a stack of plates. FIFO (First In, First Out) is the principle of a queue — the first item added is the first removed, like a waiting line.

**Q2: How would you implement a Queue using two Stacks?**

> **Answer:** Use two stacks. For enqueue, push to stack1. For dequeue, if stack2 is empty, pop everything from stack1 into stack2 (this reverses the order). Then pop from stack2. Amortized O(1) per operation.

**Q3: What are real-world applications of a stack?**

> **Answer:** The call stack in programming, browser navigation (back/forward), undo/redo in text editors, expression evaluation (infix to postfix), and syntax validation (balanced parentheses/brackets).

---

## 🎯 LESSON 14 — Linked Lists

### What is a Linked List?

A Linked List is a sequence of **nodes**, where each node holds a value and a pointer to the next node.

```
[1] → [2] → [3] → [4] → null
head
```

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(value) {
    let node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) current = current.next;
      current.next = node;
    }
    this.size++;
  }

  print() {
    let current = this.head;
    let result = [];
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result.join(" → ");
  }
}
```

### Array vs Linked List

| Operation             | Array          | Linked List |
| --------------------- | -------------- | ----------- |
| Access by index       | O(1)           | O(n)        |
| Insert at beginning   | O(n)           | O(1)        |
| Insert at end         | O(1) amortized | O(n)        |
| Delete from beginning | O(n)           | O(1)        |
| Search                | O(n)           | O(n)        |

### Classic: Reverse a Linked List

```javascript
function reverseList(head) {
  let prev = null;
  let current = head;

  while (current) {
    let next = current.next; // save next
    current.next = prev; // reverse pointer
    prev = current; // advance prev
    current = next; // advance current
  }
  return prev; // new head
}
```

### Classic: Detect a Cycle (Floyd's Algorithm)

```javascript
function hasCycle(head) {
  let slow = head,
    fast = head;

  while (fast && fast.next) {
    slow = slow.next; // move 1 step
    fast = fast.next.next; // move 2 steps
    if (slow === fast) return true; // cycle detected!
  }
  return false;
}
```

---

### 📝 Interview Questions — Lesson 14

**Q1: Why use a Linked List over an Array?**

> **Answer:** Linked lists excel at O(1) insertion and deletion at the beginning or middle (once you have a pointer to the position) without shifting elements. Arrays require O(n) shifting. However, arrays offer O(1) random access; linked lists are O(n).

**Q2: How does Floyd's Cycle Detection Algorithm work?**

> **Answer:** Use two pointers — a slow one (moves 1 step) and a fast one (moves 2 steps). If there's a cycle, the fast pointer will eventually lap the slow pointer and they'll meet. If there's no cycle, the fast pointer will reach the end (null).

**Q3: What is the difference between a singly and doubly linked list?**

> **Answer:** A singly linked list has nodes with one pointer — to the next node. A doubly linked list has two pointers per node — to both the next and previous nodes. Doubly linked lists allow O(1) traversal in both directions but use twice the memory per node.

---

## 🎯 LESSON 15 — Trees & Binary Search Trees

### What is a Tree?

A tree is a hierarchical data structure of nodes where each node has a value and references to its children. The topmost node is the **root**.

```
        10
       /  \
      5    15
     / \   / \
    3   7 12  20
```

### Binary Tree Node

```javascript
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
```

### Tree Traversals

```javascript
// In-order: Left → Root → Right (gives sorted output for BST)
function inOrder(node) {
  if (!node) return;
  inOrder(node.left);
  console.log(node.value);
  inOrder(node.right);
}

// Pre-order: Root → Left → Right (good for copying a tree)
function preOrder(node) {
  if (!node) return;
  console.log(node.value);
  preOrder(node.left);
  preOrder(node.right);
}

// Post-order: Left → Right → Root (good for deleting a tree)
function postOrder(node) {
  if (!node) return;
  postOrder(node.left);
  postOrder(node.right);
  console.log(node.value);
}
```

### Binary Search Tree (BST)

In a BST: **left child < parent < right child** at every node.

```javascript
class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    let node = new TreeNode(value);
    if (!this.root) {
      this.root = node;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = node;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = node;
          return;
        }
        current = current.right;
      }
    }
  }

  search(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }
}
```

---

### 📝 Interview Questions — Lesson 15

**Q1: What are the time complexities for BST operations?**

> **Answer:** For a balanced BST: O(log n) for search, insert, and delete. For a degenerate (sorted input) BST that becomes a linked list: O(n). Balanced BSTs like AVL and Red-Black trees guarantee O(log n) always.

**Q2: What is the difference between In-order, Pre-order, and Post-order traversal?**

> **Answer:** In-order (L→Root→R) visits nodes in sorted order for a BST. Pre-order (Root→L→R) processes the root before children — useful for copying/serializing a tree. Post-order (L→R→Root) processes children before the parent — useful for deleting a tree or computing sizes of subtrees.

**Q3: How do you find the height of a binary tree?**

> **Answer:** Recursively: `height(node) = 1 + max(height(node.left), height(node.right))`. The base case is `height(null) = 0`. This is O(n) — must visit every node.

---

## 🎯 LESSON 16 — Graphs

### What is a Graph?

A graph is a collection of **nodes (vertices)** connected by **edges**. Unlike trees, graphs can have cycles and any node can connect to any other.

```
  A — B
  |   |
  C — D
```

### Types of Graphs

- **Directed** — edges have direction (like a one-way street)
- **Undirected** — edges go both ways (like a road)
- **Weighted** — edges have costs (like distances)
- **Cyclic/Acyclic** — whether cycles exist

### Representing a Graph

```javascript
// Adjacency List (most common)
let graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "D"],
  D: ["B", "C"],
};
```

### Breadth-First Search (BFS)

Explore all neighbors level by level. Uses a **Queue**.

```javascript
function bfs(graph, start) {
  let visited = new Set();
  let queue = [start];
  let result = [];

  visited.add(start);

  while (queue.length > 0) {
    let node = queue.shift(); // dequeue
    result.push(node);

    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor); // enqueue
      }
    }
  }
  return result;
}
bfs(graph, "A"); // ["A", "B", "C", "D"]
```

**Use BFS for:** Shortest path in unweighted graphs, level-by-level traversal.

### Depth-First Search (DFS)

Explore as deep as possible before backtracking. Uses a **Stack** (or recursion).

```javascript
function dfs(graph, node, visited = new Set()) {
  visited.add(node);
  console.log(node);

  for (let neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}
```

**Use DFS for:** Cycle detection, topological sort, path finding, connected components.

---

### 📝 Interview Questions — Lesson 16

**Q1: What is the difference between BFS and DFS?**

> **Answer:** BFS explores level by level using a queue — it finds the shortest path in unweighted graphs. DFS explores as deep as possible using a stack/recursion — it's better for cycle detection, topological ordering, and exploring all paths. BFS uses more memory (stores entire level), DFS uses less (only current path).

**Q2: How do you detect a cycle in a directed graph?**

> **Answer:** Use DFS with three states for each node: unvisited, in-progress (currently in DFS stack), and done. If you encounter an "in-progress" node during DFS, there's a cycle. A simpler approach for undirected graphs: during DFS, if you find an already-visited neighbor that isn't the parent, there's a cycle.

**Q3: What is topological sort?**

> **Answer:** Topological sort orders nodes in a directed acyclic graph (DAG) such that for every directed edge A → B, A comes before B. It's used to determine task/dependency ordering — like build systems or course prerequisites.

---

## 🎯 LESSON 17 — Dynamic Programming

### What is Dynamic Programming?

DP solves complex problems by breaking them into overlapping sub-problems, solving each once, and storing the results.

**Two conditions for DP:**

1. **Optimal substructure** — optimal solution contains optimal solutions to sub-problems
2. **Overlapping sub-problems** — same sub-problems are solved multiple times in recursion

### Two Approaches

**Memoization (Top-Down):** Recursive + cache
**Tabulation (Bottom-Up):** Iterative + table

---

### Example: Fibonacci with DP

```javascript
// Memoization (Top-Down)
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n]; // cache hit
  if (n <= 1) return n;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}
// O(n) time, O(n) space

// Tabulation (Bottom-Up)
function fibTab(n) {
  if (n <= 1) return n;
  let dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
// O(n) time, O(n) space
```

---

### Classic DP: Coin Change

**Problem:** Given coins `[1, 5, 10, 25]` and an amount, find the minimum coins needed.

```javascript
function coinChange(coins, amount) {
  // dp[i] = min coins needed to make amount i
  let dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // base case: 0 coins for amount 0

  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
coinChange([1, 5, 10, 25], 36); // 3 (25 + 10 + 1)
```

---

### Classic DP: Longest Common Subsequence

```javascript
function lcs(s1, s2) {
  let m = s1.length,
    n = s2.length;
  let dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}
lcs("ABCBDAB", "BDCAB"); // 4 (BCAB or BDAB)
```

---

### 📝 Interview Questions — Lesson 17

**Q1: How do you identify if a problem is solvable with DP?**

> **Answer:** Look for two signals: (1) The problem asks for an optimal value (minimum, maximum, longest, shortest, or number of ways). (2) The problem can be broken into smaller sub-problems that overlap. If you can write a recursive brute-force solution and notice repeated computations, DP (memoization) can optimize it.

**Q2: What is the difference between memoization and tabulation?**

> **Answer:** Memoization (top-down) starts from the original problem, recurses down, and caches results along the way — only computes needed sub-problems. Tabulation (bottom-up) fills a table from the smallest sub-problems up to the final answer — computes all sub-problems. Tabulation avoids recursion overhead but may compute unneeded sub-problems.

**Q3: What is the "state" in a DP problem?**

> **Answer:** The state captures all the information needed to make a decision at any point. In Fibonacci, the state is just `n`. In coin change, it's the remaining `amount`. In grid problems, it might be `(row, col)`. Identifying the right state is the key challenge in DP problems.

---

## 🎯 LESSON 18 — Greedy Algorithms

### What is a Greedy Algorithm?

A greedy algorithm makes the **locally optimal choice** at each step, hoping to find a globally optimal solution.

**Key insight:** Greedy works when local optimality implies global optimality.

---

### Classic: Activity Selection

**Problem:** Given activities with start/end times, select the maximum number of non-overlapping activities.

**Greedy Choice:** Always pick the activity that ends earliest.

```javascript
function activitySelection(activities) {
  // Sort by end time
  activities.sort((a, b) => a.end - b.end);

  let selected = [activities[0]];
  let lastEnd = activities[0].end;

  for (let i = 1; i < activities.length; i++) {
    if (activities[i].start >= lastEnd) {
      selected.push(activities[i]);
      lastEnd = activities[i].end;
    }
  }
  return selected;
}
```

### Classic: Jump Game

**Problem:** Given array of max jumps, can you reach the last index?

```javascript
function canJump(nums) {
  let maxReach = 0; // farthest index reachable

  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false; // can't reach here
    maxReach = Math.max(maxReach, i + nums[i]); // update max reach
  }
  return true;
}
canJump([2, 3, 1, 1, 4]); // true
canJump([3, 2, 1, 0, 4]); // false
```

---

### When Greedy Works vs When It Fails

```
✅ Greedy Works:
- Activity selection (greedy: pick earliest ending)
- Fractional knapsack (greedy: pick highest value/weight ratio)
- Huffman encoding
- Dijkstra's shortest path (with non-negative weights)

❌ Greedy Fails:
- 0/1 Knapsack (need DP)
- Coin change with arbitrary coins (need DP)
- Traveling Salesman Problem (need exhaustive/approx)
```

---

### 📝 Interview Questions — Lesson 18

**Q1: How do you know when to use Greedy vs Dynamic Programming?**

> **Answer:** Try greedy first — if you can prove that always picking the local optimum leads to the global optimum, greedy works and is simpler. If counter-examples exist where greedy fails (picking the best now prevents a better overall outcome), use DP. Coin change with arbitrary coin denominations is a classic case where greedy fails but DP works.

**Q2: Give an example where greedy fails.**

> **Answer:** Coin change with coins `[1, 3, 4]` and target `6`. Greedy picks 4, then needs 2 more — picks 1+1 = three coins total. But optimal is 3+3 = two coins. Greedy chose the locally best option but missed the globally optimal solution.

---

## 🎯 LESSON 19 — Problem Solving Patterns & Templates

### The UMPIRE Method (Interview Template)

```
U — Understand    → Restate the problem in your own words
M — Match         → Match to known patterns
P — Plan          → Write pseudocode
I — Implement     → Write the code
R — Review        → Test with examples
E — Evaluate      → Analyze time/space complexity
```

### Pattern Matching Guide

| Pattern                       | Signals                      | Technique               |
| ----------------------------- | ---------------------------- | ----------------------- |
| Find a pair that sums to X    | Unsorted array, two elements | HashMap or Two Pointers |
| Subarray with max/min sum     | Window size, contiguous      | Sliding Window          |
| Sorted + pair/triplet         | Sorted array, O(n) target    | Two Pointers            |
| Shortest path                 | Graph, unweighted            | BFS                     |
| All paths / cycles            | Graph, explore all           | DFS                     |
| Optimal value (min/max/count) | Choices, sub-problems        | DP or Greedy            |
| Tree path / structure         | Binary tree                  | DFS Recursion           |
| Level-by-level tree           | BFS on tree                  | Queue                   |
| Top K elements                | Frequency, rankings          | Heap or Bucket Sort     |
| Parentheses, undo             | Nested structure             | Stack                   |

---

### Big O Complexity Cheat Sheet

```
O(1)       — constant: direct lookup (HashMap)
O(log n)   — logarithmic: binary search
O(n)       — linear: single loop
O(n log n) — linearithmic: merge sort, heap sort
O(n²)      — quadratic: nested loops, bubble sort
O(2^n)     — exponential: recursive subsets, naive DP
O(n!)      — factorial: permutations
```

**Space Complexity:**

```
O(1)   — no extra space (in-place)
O(n)   — linear extra space (result array, hashmap)
O(log n) — recursion stack for log-depth problems
O(n²)  — 2D DP table
```

---

### Interview Code Quality Checklist

Before submitting any solution in an interview:

```
☐ Does it handle empty input?
☐ Does it handle a single element?
☐ Does it handle negative numbers (if applicable)?
☐ Does it handle duplicates?
☐ Does it handle the maximum constraints without TLE?
☐ Is it readable? (meaningful variable names)
☐ Have you stated the time and space complexity?
```

---

### 📝 General Interview Q&A

**Q: What is Big O Notation?**

> Big O describes how the runtime or space of an algorithm scales with input size. O(n) means linear growth; O(n²) means quadratic. It describes the **worst case** upper bound.

**Q: What is the difference between time and space complexity?**

> Time complexity measures how runtime grows with input size. Space complexity measures how memory usage grows. Both use Big O notation.

**Q: When would you use recursion over iteration?**

> Use recursion when the problem has a naturally recursive structure (trees, graphs, divide & conquer). Prefer iteration for linear problems — it's faster (no call stack overhead) and avoids stack overflow.

**Q: What is memoization?**

> Memoization is an optimization technique where you store the results of expensive function calls and return the cached result when the same inputs are encountered again. It transforms exponential recursive solutions into polynomial ones.

**Q: What is the difference between a Stack and a Queue?**

> A stack is LIFO (last in, first out). A queue is FIFO (first in, first out). Use a stack for DFS, undo operations, and bracket matching. Use a queue for BFS and task scheduling.

**Q: How do you optimize a brute-force solution?**

> First, identify the bottleneck (usually nested loops). Then look for patterns: Can a loop be replaced with a HashMap lookup? Can you precompute prefix sums? Can you use two pointers instead of checking all pairs? Can overlapping sub-problems be memoized?

---

## 🎯 LESSON 20 — Mock Interview & Final Review

### Sample Problem Walkthrough

**Problem:** Given an array of integers, find the length of the longest subarray with a sum equal to `k`.

**Step 1 — Understand:**

- Input: `nums = [1, -1, 5, -2, 3]`, `k = 3`
- Output: length of longest subarray summing to 3
- Examples: `[1, -1, 5, -2]` sums to 3 → length 4

**Step 2 — Match Pattern:**

- Subarray sum → Prefix Sum + HashMap

**Step 3 — Plan (Pseudocode):**

```
prefixSum = 0
maxLen = 0
seen = {0: -1}  // sum: earliest index

for each index i:
  prefixSum += nums[i]
  if (prefixSum - k) is in seen:
    maxLen = max(maxLen, i - seen[prefixSum - k])
  if prefixSum not in seen:
    seen[prefixSum] = i

return maxLen
```

**Step 4 — Implement:**

```javascript
function maxSubarrayLen(nums, k) {
  let prefixSum = 0,
    maxLen = 0;
  let seen = new Map([[0, -1]]);

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    if (seen.has(prefixSum - k)) {
      maxLen = Math.max(maxLen, i - seen.get(prefixSum - k));
    }
    if (!seen.has(prefixSum)) seen.set(prefixSum, i);
  }
  return maxLen;
}
```

**Step 5 — Complexity:**

- Time: O(n) — single pass
- Space: O(n) — HashMap

---

### Final Advice

1. **Practice daily** — even 30 minutes. Consistency beats intensity.
2. **Understand, don't memorize** — know _why_ each algorithm works.
3. **Start brute force** — always code a working solution first, then optimize.
4. **Think aloud** — in interviews, narrate your thought process continuously.
5. **Know your complexity** — every solution you write, state its Big O.
6. **Master the fundamentals** — arrays, hashmaps, two pointers, and recursion cover 80% of interview problems.
7. **Read others' solutions** — after solving, study better approaches on LeetCode, HackerRank, etc.

---

### Recommended Practice Path

**Week 1–2: Foundations**

- Arrays, Strings, HashMaps
- Two Pointers, Sliding Window

**Week 3–4: Core Data Structures**

- Stacks, Queues, Linked Lists
- Trees, BST

**Week 5–6: Algorithms**

- Sorting, Searching
- Recursion, Divide & Conquer

**Week 7–8: Advanced**

- Graphs (BFS/DFS)
- Dynamic Programming
- Greedy Algorithms

**Week 9–10: Interview Prep**

- Timed mock problems (45 min each)
- Review and optimize solutions
- Behavioral questions + system design basics

---

### Problem Solving Cheat Sheet

```
ARRAY PROBLEMS
├── Find pair/triplet   → Two Pointers or HashMap
├── Subarray sum        → Prefix Sum + HashMap
├── Max subarray        → Kadane's Algorithm
└── Rotate/shift        → Reverse technique

STRING PROBLEMS
├── Anagram check       → Sort or Frequency Map
├── Palindrome          → Two Pointers
├── Longest unique      → Sliding Window + Set
└── Pattern matching    → KMP or Sliding Window

TREE PROBLEMS
├── Path/depth          → DFS (recursion)
├── Level order         → BFS (queue)
├── Validate BST        → Inorder traversal
└── LCA                 → DFS with parent tracking

GRAPH PROBLEMS
├── Shortest path       → BFS (unweighted) / Dijkstra (weighted)
├── All paths           → DFS
├── Cycle detection     → DFS with state or Union-Find
└── Connected components→ DFS/BFS with visited set

OPTIMIZATION PROBLEMS
├── Try greedy first    → If local = global optimum
├── Overlapping subs    → Dynamic Programming
└── Constraints small   → Backtracking/Brute Force
```

---

> **You've completed the course!** 🎉
>
> The journey from beginner to confident problem solver is one of consistent practice, curiosity, and the willingness to be stuck — and then unstuck. Every hard problem you solve makes the next one easier.
>
> Keep building. Keep solving. Keep growing.

---
