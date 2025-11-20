## ✅ 1. What are dynamic keys?

## ✅ 2. Why do we need them? (Real-world examples)

## ✅ 3. How JavaScript handles dynamic object properties

## ✅ 4. Dynamic keys inside functions

## ✅ 5. Dynamic keys in arrays & maps

## ✅ 6. Dynamic keys in React (VERY important!)

## ✅ 7. Advanced real-world use-cases & interview patterns

---

# 🧩 1. **What Are Dynamic Keys?**

A **dynamic key** means:

> You do NOT know the object property name beforehand.
> You compute it during runtime.

### Example:

```js
const key = "username";
const obj = {
  [key]: "Shaukat",
};
console.log(obj.username); // "Shaukat"
```

The `[]` brackets allow **dynamic** evaluation.

---

# 🏪 2. Why Do We Need Dynamic Keys? (Real World)

### 🔹 **Use Case 1: Forms**

A form with inputs like:

```
name      => data["name"]
email     => data["email"]
password  => data["password"]
```

You don’t write separate handlers — you use the input’s `name` dynamically.

### 🔹 **Use Case 2: API data is variable**

Sometimes server returns unpredictable keys:

```json
{
  "2023": 120,
  "2024": 180
}
```

You must iterate them dynamically.

### 🔹 **Use Case 3: Multi-language website**

```
lang = "en"
labels[lang] => "Submit"
```

### 🔹 **Use Case 4: Feature flagging**

```
features["newNavbar"] === true
```

---

# 🧠 3. Dynamic Keys in Objects — JS Techniques

## ✔️ A) Bracket notation

```js
const key = "role";
const user = {};
user[key] = "admin";
```

## ✔️ B) Dynamic keys inside object literals

```js
const prefix = "user_";
let id = 101;

const obj = {
  [prefix + id]: "active",
};

console.log(obj.user_101);
```

## ✔️ C) Build objects dynamically in loops

```js
const users = ["ali", "umair", "sarim"];
let obj = {};

users.forEach((name, idx) => {
  obj[`user_${idx}`] = name;
});
```

---

# ⚙️ 4. Dynamic Keys in Functions

### Real-world: general-purpose update function

```js
function updateObject(obj, key, value) {
  return {
    ...obj,
    [key]: value,
  };
}
```

Usage:

```js
const user = { name: "Ali" };
const updated = updateObject(user, "age", 22);
```

This pattern is heavily used in **React reducers**.

---

# 📚 5. Dynamic Keys in Arrays & Maps

### Array index is a dynamic key:

```js
arr[i] = value;
```

### Map is made **for dynamic keys**:

```js
const map = new Map();
map.set("user_1", { name: "Ahsan" });
map.get("user_1");
```

### Why use Map?

- Keys can be objects
- Maintain insertion order
- Fast for large dynamic datasets

React developers use Map for:

- caching results
- memoization
- component lookup tables

---

# ⚛️ 6. Dynamic Keys in **React** (VERY Common!)

This is where dynamic keys become a superpower.

---

## 🟦 **1. Updating form state dynamically**

Classic React pattern:

### HTML:

```html
<input name="email" /> <input name="password" />
```

### React:

```js
const [form, setForm] = useState({});

function handleChange(e) {
  setForm((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
}
```

This lets **1 function update every field**.

---

## 🟦 2. Updating nested state dynamically

```js
setData((prev) => ({
  ...prev,
  user: {
    ...prev.user,
    [field]: value,
  },
}));
```

Real use case:

- edit profile
- dynamic dashboards
- admin panels

---

## 🟦 3. Rendering UI based on dynamic keys

### Example: Table with unknown columns

```js
Object.keys(data).map((key) => <td>{data[key]}</td>);
```

Useful for:

- dynamic API responses
- CMS-driven websites
- admin dashboards

---

## 🟦 4. Conditional UI logic using dynamic keys

Example: show components conditionally:

```js
const Components = {
  home: HomePage,
  dashboard: DashboardPage,
  profile: ProfilePage,
};

const ActiveComponent = Components[currentPage];
return <ActiveComponent />;
```

This is used in:

- routing systems
- dynamic modals
- component registry patterns

---

## 🟦 5. Dynamic styles / classNames

```js
<div className={styles[theme + "_button"]}>
```

Used in:

- theming
- dark mode
- design systems

---

# 🚀 7. Advanced Real-World Patterns

## ⭐ Pattern 1: Lookup Tables (React Optimization)

Instead of many if-else statements:

```js
const handlers = {
  login: loginUser,
  logout: logoutUser,
  register: registerUser,
};

handlers[actionType](payload);
```

Fast, scalable, readable.

---

## ⭐ Pattern 2: Event Routing (Middleware-like behavior)

```js
const routers = {
  "/user": handleUser,
  "/products": handleProducts,
  "/admin": handleAdmin,
};

routers[path](req, res);
```

Used in:

- Express backends
- Next.js server actions
- custom routing logic

---

## ⭐ Pattern 3: Dynamic validation schemas

```js
const rules = {
  email: (v) => v.includes("@"),
  age: (v) => v > 18,
};

rules[fieldName](value);
```

Example:

- form validation libraries
- CMS rules
- admin input filtering

---

## ⭐ Pattern 4: Feature Flags

```js
const flags = {
  newNavbar: true,
  betaFeature: false,
};

if (flags["newNavbar"]) {
  renderNewNavbar();
}
```

Used in:

- A/B testing
- gradual rollouts
- experimental UI

---

## ⭐ Pattern 5: Dynamic API Request Builder

```js
const endpoints = {
  users: "/api/users",
  posts: "/api/posts",
  comments: "/api/comments",
};

fetch(endpoints[type]);
```

Used in:

- react-query setups
- frontend services
- monorepo shared API layers

---
