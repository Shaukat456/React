# Async/Await in JavaScript — From Scratch

> **What you'll learn:** How JavaScript handles time, why async code exists, and how `async/await` makes it readable and maintainable — with real-world examples throughout.

---

## 1. The Problem: JavaScript Is Single-Threaded

JavaScript runs on a **single thread**. That means it can only do one thing at a time. But the real world requires waiting — for a server response, a file read, a database query, a timer.

If JavaScript just _stopped_ and waited, your entire UI would freeze.

```js
// ❌ Imagine if JS worked like this — your browser would hang!
const data = waitForServer(); // freezes everything for 2 seconds
console.log(data);
```

Instead, JavaScript uses an **event loop** and **asynchronous operations** to keep moving while waiting.

---

## 2. The Evolution: Callbacks → Promises → Async/Await

### 2.1 Callbacks (The Old Way)

Before Promises, we passed functions as callbacks.

```js
function getUserData(userId, callback) {
  setTimeout(() => {
    callback(null, { id: userId, name: "Hamza" });
  }, 1000);
}

getUserData(1, function (error, user) {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("User:", user);
  }
});
```

**The problem — "Callback Hell":**

```js
// Real-world cascade: get user → get their orders → get order details → get shipping info
getUser(userId, function (err, user) {
  getOrders(user.id, function (err, orders) {
    getOrderDetails(orders[0].id, function (err, details) {
      getShipping(details.shippingId, function (err, shipping) {
        // 😱 We're 4 levels deep — and this is still simplified
        console.log(shipping);
      });
    });
  });
});
```

Deeply nested, hard to read, hard to handle errors — hence the name "Callback Hell" or "Pyramid of Doom."

---

### 2.2 Promises (The Better Way)

A **Promise** is an object that represents a value that will be available _later_. It can be in one of three states:

- `pending` — still waiting
- `fulfilled` — completed successfully
- `rejected` — something went wrong

```js
function getUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: "Hamza" }); // success
      } else {
        reject(new Error("Invalid user ID")); // failure
      }
    }, 1000);
  });
}

// Consuming the Promise
getUserData(1)
  .then((user) => {
    console.log("User:", user);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
```

**Chaining Promises — flatter, but still awkward:**

```js
getUser(userId)
  .then((user) => getOrders(user.id))
  .then((orders) => getOrderDetails(orders[0].id))
  .then((details) => getShipping(details.shippingId))
  .then((shipping) => console.log(shipping))
  .catch((err) => console.error(err));
```

Better! But still hard to debug and share intermediate values between steps.

---

### 2.3 Async/Await (The Modern Way)

`async/await` is **syntax sugar built on top of Promises**. It lets you write asynchronous code that _looks_ synchronous.

```js
async function loadShipping(userId) {
  const user = await getUser(userId);
  const orders = await getOrders(user.id);
  const details = await getOrderDetails(orders[0].id);
  const shipping = await getShipping(details.shippingId);
  console.log(shipping);
}

loadShipping(1);
```

Clean, linear, readable — and still completely non-blocking.

---

## 3. Core Syntax

### 3.1 The `async` Keyword

Adding `async` before a function does two things:

1. It makes the function always return a **Promise**
2. It enables the use of `await` inside it

```js
// This function...
async function greet() {
  return "Hello!";
}

// ...is equivalent to this:
function greet() {
  return Promise.resolve("Hello!");
}

// Both resolve with "Hello!"
greet().then(console.log); // "Hello!"
```

### 3.2 The `await` Keyword

`await` pauses execution **inside the async function** until the Promise resolves, then returns the resolved value.

```js
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log("Start");
  await delay(2000); // waits 2 seconds here
  console.log("2 seconds later");
  await delay(1000); // waits 1 more second
  console.log("Done!");
}

run();
// Output:
// Start
// (2 seconds later)
// 2 seconds later
// (1 second later)
// Done!
```

> **Key insight:** `await` only pauses the _current async function_. The rest of your app keeps running normally.

### 3.3 Error Handling with `try/catch`

This is how you handle errors in async/await — just like synchronous code:

```js
async function fetchUser(id) {
  try {
    const response = await fetch(`https://api.example.com/users/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    return null;
  }
}
```

---

## 4. Common Patterns

### 4.1 Sequential vs. Parallel Execution

**Sequential** — each request waits for the previous one to finish:

```js
async function sequential() {
  console.time("sequential");

  const user = await fetchUser(1); // waits ~300ms
  const posts = await fetchPosts(1); // waits AFTER user is done
  const comments = await fetchComments(1); // waits AFTER posts are done

  console.timeEnd("sequential"); // ~900ms total
}
```

**Parallel** — fire all requests at once using `Promise.all`:

```js
async function parallel() {
  console.time("parallel");

  const [user, posts, comments] = await Promise.all([
    fetchUser(1), // all three
    fetchPosts(1), // start at
    fetchComments(1), // the same time
  ]);

  console.timeEnd("parallel"); // ~300ms total (fastest wins the wait)
}
```

> **Rule of thumb:** Use `Promise.all` when requests are **independent**. Use sequential `await` when each result depends on the previous one.

### 4.2 `Promise.allSettled` — When You Don't Want to Fail Fast

Unlike `Promise.all` (which rejects if _any_ promise fails), `Promise.allSettled` waits for _all_ promises and gives you each result individually:

```js
async function fetchDashboard(userId) {
  const results = await Promise.allSettled([
    fetchProfile(userId),
    fetchNotifications(userId),
    fetchRecentActivity(userId),
  ]);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Request ${index + 1} succeeded:`, result.value);
    } else {
      console.warn(`Request ${index + 1} failed:`, result.reason.message);
    }
  });
}
```

### 4.3 `Promise.race` — First One Wins

Resolves or rejects as soon as the _fastest_ promise settles:

```js
async function fetchWithTimeout(url, timeoutMs) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), timeoutMs),
  );

  return Promise.race([fetch(url), timeout]);
}

// If the fetch takes more than 5 seconds, it throws "Request timed out"
const data = await fetchWithTimeout("https://api.example.com/data", 5000);
```

### 4.4 Async in Loops

**The common mistake — `forEach` doesn't work with async:**

```js
// ❌ This does NOT wait for each async operation
const ids = [1, 2, 3];
ids.forEach(async (id) => {
  const user = await fetchUser(id); // these all fire simultaneously, uncontrolled
  console.log(user);
});
console.log("Done?"); // runs BEFORE the fetches finish
```

**Fix 1: `for...of` for sequential processing:**

```js
// ✅ Each iteration truly waits
async function processUsers(ids) {
  for (const id of ids) {
    const user = await fetchUser(id);
    console.log(user);
  }
  console.log("Truly done!");
}
```

**Fix 2: `Promise.all` with `.map` for parallel processing:**

```js
// ✅ All fire at once, all results gathered
async function processUsersParallel(ids) {
  const users = await Promise.all(ids.map((id) => fetchUser(id)));
  users.forEach((user) => console.log(user));
  console.log("All done!");
}
```

---

## 5. Real-World Use Cases

### 5.1 Fetching Data from an API

The most common real-world use case — consuming a REST API.

```js
// utils/api.js
const BASE_URL = "https://jsonplaceholder.typicode.com";

async function fetchPosts() {
  try {
    const response = await fetch(`${BASE_URL}/posts`);

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error("Network error — are you connected to the internet?");
    }
    throw error;
  }
}

async function createPost(title, body, userId) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return await response.json();
}

// Usage
async function main() {
  const posts = await fetchPosts();
  console.log(`Fetched ${posts.length} posts`);

  const newPost = await createPost("My Title", "My content", 1);
  console.log("Created post with ID:", newPost.id);
}

main().catch(console.error);
```

---

### 5.2 User Authentication Flow

A real login flow — token-based auth with multiple async steps:

```js
// auth/login.js
async function loginUser(email, password) {
  // Step 1: Authenticate
  const authResponse = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!authResponse.ok) {
    const err = await authResponse.json();
    throw new Error(err.message || "Login failed");
  }

  const { token } = await authResponse.json();

  // Step 2: Store token
  localStorage.setItem("auth_token", token);

  // Step 3: Fetch user profile with the new token
  const profileResponse = await fetch("/api/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const user = await profileResponse.json();

  // Step 4: Log the login event (fire-and-forget — don't await)
  logEvent("user_login", { userId: user.id }); // intentionally not awaited

  return user;
}

// In your login form handler
async function handleLoginSubmit(event) {
  event.preventDefault();
  const submitBtn = event.target.querySelector("button[type=submit]");

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = "Logging in...";

    const user = await loginUser(email, password);
    console.log("Welcome,", user.name);
    window.location.href = "/dashboard";
  } catch (error) {
    showErrorMessage(error.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Log In";
  }
}
```

---

### 5.3 Loading a Dashboard with Multiple Data Sources

A real dashboard needs data from many sources simultaneously:

```js
// dashboard/loader.js
async function loadDashboard(userId) {
  const loadingIndicator = document.getElementById("loading");
  loadingIndicator.style.display = "block";

  try {
    // Fire all independent requests in parallel
    const [profile, stats, notifications, recentOrders] = await Promise.all([
      fetchProfile(userId),
      fetchStats(userId),
      fetchNotifications(userId),
      fetchRecentOrders(userId, { limit: 5 }),
    ]);

    // Now render with all data available
    renderProfile(profile);
    renderStats(stats);
    renderNotifications(notifications);
    renderRecentOrders(recentOrders);

    // Then fetch secondary data that depends on the profile
    const teamMembers = await fetchTeamMembers(profile.teamId);
    renderTeam(teamMembers);
  } catch (error) {
    showDashboardError("Failed to load dashboard. Please refresh.");
    console.error(error);
  } finally {
    loadingIndicator.style.display = "none";
  }
}
```

---

### 5.4 Retry Logic

Production apps need to handle transient failures gracefully:

```js
// utils/retry.js
async function withRetry(asyncFn, options = {}) {
  const { retries = 3, delay = 1000, backoff = 2 } = options;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await asyncFn();
    } catch (error) {
      const isLastAttempt = attempt === retries;

      if (isLastAttempt) {
        throw new Error(`Failed after ${retries} attempts: ${error.message}`);
      }

      const waitTime = delay * Math.pow(backoff, attempt - 1);
      console.warn(`Attempt ${attempt} failed. Retrying in ${waitTime}ms...`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }
}

// Usage: automatically retries up to 3 times with exponential backoff
async function loadCriticalData() {
  const data = await withRetry(
    () => fetch("https://api.example.com/critical-data").then((r) => r.json()),
    { retries: 3, delay: 500, backoff: 2 },
    // Waits: 500ms → 1000ms → 2000ms between retries
  );
  return data;
}
```

---

### 5.5 Reading Files in Node.js

Async/await with Node's file system module:

```js
// scripts/processFiles.js
const fs = require("fs").promises; // Promise-based fs API
const path = require("path");

async function processLogFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const lines = content.split("\n").filter(Boolean);
    const errors = lines.filter((line) => line.includes("[ERROR]"));

    return {
      totalLines: lines.length,
      errorCount: errors.length,
      errors,
    };
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`File not found: ${filePath}`);
    }
    throw error;
  }
}

async function processAllLogs(logsDir) {
  const files = await fs.readdir(logsDir);
  const logFiles = files.filter((f) => f.endsWith(".log"));

  const results = await Promise.all(
    logFiles.map(async (file) => {
      const fullPath = path.join(logsDir, file);
      const analysis = await processLogFile(fullPath);
      return { file, ...analysis };
    }),
  );

  const totalErrors = results.reduce((sum, r) => sum + r.errorCount, 0);
  console.log(
    `Processed ${logFiles.length} files. Total errors: ${totalErrors}`,
  );
  return results;
}

processAllLogs("./logs").catch(console.error);
```

---

### 5.6 Building an Async Queue / Rate Limiter

When you need to limit how many async operations run at once (e.g., you can't hit an API with 1000 simultaneous requests):

```js
// utils/rateLimit.js
async function runWithConcurrencyLimit(tasks, limit) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    const promise = task().then((result) => {
      executing.delete(promise);
      return result;
    });

    executing.add(promise);
    results.push(promise);

    // If we've hit the limit, wait for one to finish before continuing
    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

// Example: Upload 100 files but only 5 at a time
const fileUploads = files.map((file) => () => uploadFile(file));
const uploadResults = await runWithConcurrencyLimit(fileUploads, 5);
console.log(`Uploaded ${uploadResults.length} files`);
```

---

## 6. Common Mistakes and How to Fix Them

### Mistake 1: Forgetting `await`

```js
// ❌ Missing await — data is a Promise object, not the value
async function getUser() {
  const data = fetch("/api/user"); // forgot await!
  console.log(data); // [object Promise]
}

// ✅ Correct
async function getUser() {
  const data = await fetch("/api/user");
  console.log(data); // actual response
}
```

### Mistake 2: Not Handling Errors

```js
// ❌ Unhandled rejection — crashes silently or throws uncaught error
async function loadData() {
  const data = await fetch("/api/might-fail").then((r) => r.json());
  return data;
}

// ✅ Always handle errors
async function loadData() {
  try {
    const data = await fetch("/api/might-fail").then((r) => r.json());
    return data;
  } catch (error) {
    console.error("loadData failed:", error);
    return null; // or re-throw, or return a default value
  }
}
```

### Mistake 3: Unnecessary Sequential `await`

```js
// ❌ Slow — each waits for the previous unnecessarily
async function slow() {
  const a = await fetchA(); // 1s
  const b = await fetchB(); // 1s
  const c = await fetchC(); // 1s
  // Total: ~3 seconds
}

// ✅ Fast — all run in parallel
async function fast() {
  const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);
  // Total: ~1 second
}
```

### Mistake 4: Using `async` Where It's Not Needed

```js
// ❌ Unnecessary — doesn't do anything async
async function add(a, b) {
  return a + b; // no await inside, no need for async
}

// ✅ Only use async when you need await
function add(a, b) {
  return a + b;
}
```

### Mistake 5: `await` Inside `map`/`filter` Without `Promise.all`

```js
// ❌ Returns array of Promises, not resolved values
const users = ids.map(async (id) => await fetchUser(id));
// users = [Promise, Promise, Promise]

// ✅ Wrap with Promise.all
const users = await Promise.all(ids.map((id) => fetchUser(id)));
// users = [{ id: 1 }, { id: 2 }, { id: 3 }]
```

---

## 7. The `finally` Block

`finally` runs regardless of whether the try succeeded or the catch was triggered — perfect for cleanup:

```js
async function submitForm(data) {
  const button = document.getElementById("submit-btn");

  try {
    button.disabled = true;
    button.textContent = "Submitting...";

    const result = await postFormData(data);
    showSuccessMessage("Form submitted!");
    return result;
  } catch (error) {
    showErrorMessage(error.message);
    throw error; // re-throw so caller knows it failed
  } finally {
    // This ALWAYS runs — success or failure
    button.disabled = false;
    button.textContent = "Submit";
  }
}
```

---

## 8. Async IIFE (Immediately Invoked Function Expression)

When you need to use `await` at the top level but you're in a non-module context:

```js
// Useful in scripts, browser consoles, or older environments
(async () => {
  const data = await fetchSomething();
  console.log(data);
})();

// Modern JS (ES2022+) supports top-level await in modules
// In a .mjs file or <script type="module">:
const data = await fetchSomething(); // works directly!
```

---

## 9. Quick Reference

| Concept                | Syntax                               | Notes                                 |
| ---------------------- | ------------------------------------ | ------------------------------------- |
| Declare async function | `async function foo() {}`            | Always returns a Promise              |
| Arrow async function   | `const foo = async () => {}`         | Same rules apply                      |
| Wait for a Promise     | `const result = await somePromise`   | Only inside async functions           |
| Handle errors          | `try { await ... } catch (e) {}`     | Catches both sync and async errors    |
| Run in parallel        | `await Promise.all([a(), b(), c()])` | All start simultaneously              |
| First to finish        | `await Promise.race([a(), b()])`     | Resolves/rejects with fastest         |
| Get all results        | `await Promise.allSettled([...])`    | Never rejects; gives each status      |
| Cleanup                | `try {} catch {} finally {}`         | `finally` always runs                 |
| Top-level (modules)    | `await fetch(...)` at file root      | Requires ES modules (`type="module"`) |

---

## 10. Mental Model

Think of `async/await` like ordering food at a restaurant:

- You (`async function`) place multiple orders (`await` calls)
- You don't stand at the counter frozen — you sit down and do other things
- When your food is ready, the waiter (`event loop`) brings it to you
- If the kitchen catches fire (`rejection`), you get an error notification (`catch`)
- Either way, you settle your bill when you leave (`finally`)

The restaurant doesn't stop serving other customers while your food is being prepared. That's the essence of non-blocking async JavaScript.

---

## Summary

Async/await didn't replace Promises — it made them approachable. Under the hood, every `async` function returns a Promise, and every `await` unwraps one. The benefits:

- **Readability:** Code flows top-to-bottom like synchronous code
- **Debuggability:** Stack traces are cleaner; breakpoints work as expected
- **Error handling:** `try/catch` works naturally
- **Composability:** Easy to mix sequential and parallel operations

Master these patterns — `Promise.all` for parallelism, `try/catch/finally` for error handling, `for...of` for sequential async loops — and you'll handle virtually any async scenario JavaScript throws at you.
