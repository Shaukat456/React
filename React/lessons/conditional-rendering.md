# 🚦 **Conditional Rendering in React (In Depth)**

Conditional Rendering = **deciding what UI to show based on some condition**.
Think of React as a **smart switchboard** — you give it conditions, it decides which UI branch to turn on.

---

# 🧠 **Core Idea**

React is **just JavaScript**.
So conditional rendering = **if/else**, **ternary**, **&&**, **switch**, **function return conditions**, etc.

But React has patterns that work better for readability, performance, and preventing messy JSX.

---

# 🔥 Techniques (From Simple → Advanced)

---

# ⭐ 1) **Ternary Operator (The Most Common)**

### ✔ Use when:

- You want **A OR B**
- You want a complete alternate UI (not just toggle)

```jsx
{
  isLoggedIn ? <Dashboard /> : <Login />;
}
```

### Analogy:

Like a coin flip — heads → UI1, tails → UI2.

---

# ⭐ 2) **Logical AND (`&&`)**

### ✔ Use when:

- Conditionally show something **OR NOTHING**
- No “else” needed

```jsx
{
  error && <p className="error">{error}</p>;
}
{
  isAdmin && <AdminPanel />;
}
```

### Analogy:

“Show this **only if** permission=true.”

⚠ Avoid using `&&` when the left side can be a number:

```jsx
0 && <Component />; // → 0 is returned!
```

---

# ⭐ 3) **Guard Clauses (Early Returns)**

This is cleanest for components with multiple rules.

### ✔ Use when:

- Conditions are complex
- You want maximum readability
- Avoid nested JSX

```jsx
function Profile({ user }) {
  if (!user) return <Loading />;

  if (!user.isActive) return <SuspendedScreen />;

  return <ProfilePage user={user} />;
}
```

### Why it’s good:

- No nested ternaries
- No “pyramids of doom”
- Logic stays separate from UI

---

# ⭐ 4) **Switch Statements**

### ✔ Use when:

- Multiple UI states
- You don’t want long ternaries

```jsx
switch (status) {
  case "loading":
    return <Loader />;
  case "error":
    return <ErrorView />;
  case "success":
    return <DataView />;
  default:
    return null;
}
```

### Analogy:

Like a traffic light with multiple states (green, yellow, red).

---

# ⭐ 5) **Inline Immediately-Invoked Functions (IIFEs)**

Useful when JSX needs some calculation.

```jsx
{
  (() => {
    if (role === "admin") return <AdminUI />;
    if (role === "user") return <UserUI />;
    return <GuestUI />;
  })();
}
```

✔ Keeps JSX clean
✔ Avoids deeply nested ternaries

⚠ Requires discipline — don't overuse.

---

# ⭐ 6) **Conditional Variables Before Return**

One of the cleanest and most scalable patterns.

```jsx
let content;

if (loading) content = <Loader />;
else if (error) content = <Error />;
else content = <Data data={data} />;

return <section>{content}</section>;
```

### ✔ Use when components become big

Very readable and maintainable.

---

# ⭐ 7) **Helper Functions (Extracted UI Logic)**

```jsx
function renderContent() {
  if (loading) return <Loader />;
  if (error) return <Error />;
  return <DataList items={items} />;
}

return <div>{renderContent()}</div>;
```

### Advantages:

- UI decisions separated from main component
- Reusable patterns across components
- Super clean return()

---

# ⭐ 8) **Object Lookup Pattern (Underrated)**

Great for avoiding switch/case.

```jsx
const UI = {
  loading: <Loader />,
  error: <Error />,
  success: <Data data={data} />,
};

return UI[state] ?? null;
```

✔ Best for well-defined states
✔ Very clean
✔ No if/else mess

---

# ⭐ 9) **Fragment Conditions (`<> </>`)**

You can conditionally wrap components:

```jsx
<>
  {isPremium && <PremiumBadge />}
  <UserInfo />
</>
```

---

# ⭐ 10) **Conditional Classes vs Conditional Components**

### Example:

```jsx
<div className={isActive ? "active" : "inactive"}></div>
```

OR conditionally render entire component:

```jsx
{
  isActive && <ActiveCard />;
}
```

---

# ⭐ 11) **Short Circuit + Optional Chaining**

```jsx
{
  user?.profile && <ProfileCard data={user.profile} />;
}
```

---

# ⭐ 12) **Return Null (Do not render)**

```jsx
function Banner({ show }) {
  if (!show) return null;
  return <div>Banner</div>;
}
```

React is completely okay with **returning null**.

---

# ⭐ 13) **Suspense + Conditional Fallback (React 18+)**

```jsx
<Suspense fallback={<Loader />}>
  {isReady ? <Dashboard /> : <Skeleton />}
</Suspense>
```

Works beautifully with Server Components & Data Fetching.

---

# ⭐ 14) **Conditional Hook Execution – NEVER DO**

(Important rule)

❌ Wrong:

```jsx
if (show) {
  const [x, setX] = useState(0); // ❌ break rules of hooks
}
```

React requires hooks to run **in same order, always**.

So do this instead:

✔ Correct:

```jsx
const [x, setX] = useState(0);
if (!show) return null;
```

---

# ⭐ 15) **Conditional Rendering Performance Tips**

### ✔ Prefer early returns

### ✔ Avoid deeply nested ternaries

### ✔ Use memoization if UI is expensive

### ✔ For large conditional blocks → extract into components

---

# 🧠 When to Use Which Technique (Cheat Sheet)

| Scenario                             | Best Technique                   |
| ------------------------------------ | -------------------------------- |
| Show component OR null               | `&&`                             |
| Show A or B                          | Ternary                          |
| Multiple states (loading/error/data) | Switch OR lookup object          |
| Complex logic                        | Guard clauses / helper functions |
| Nested UI decisions                  | Extract components               |
| Huge UIs                             | Pre-calc `content` variable      |

---

# 📌 Real-World Example: Loading, Error, Logged-In, Admin

```jsx
function App({ user, loading, error }) {
  if (loading) return <Spinner />;
  if (error) return <ErrorScreen />;

  if (!user) return <Login />;

  return user.role === "admin" ? <AdminPanel /> : <UserPanel />;
}
```

Simple, clean, scalable.

---

# 📌 Real-World Example 2: Render Component Variants

```jsx
const buttons = {
  primary: <PrimaryBtn />,
  secondary: <SecondaryBtn />,
  danger: <DangerBtn />,
};

return buttons[type] ?? <PrimaryBtn />;
```

---

# 🧠 Mental Model (Final)

React conditional rendering is like:

> **“Show this UI branch depending on the state of your data or app logic.”**
> React re-renders when data changes, and **your conditions decide the new UI**.
> JSX is just JavaScript → anything valid in JS expressions can control UI.

---
