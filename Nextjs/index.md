# ▲ Next.js — The Complete Guide to What Actually Matters

> **Prerequisites:** Know React basics (components, hooks, props, state).  
> **Version:** Next.js 14+ (App Router) — the current industry standard.  
> **Goal:** From zero to job-ready with every concept that interviewers ask about.

---

## 📖 Table of Contents

1. [What is Next.js & Why It Exists](#1-what-is-nextjs--why-it-exists)
2. [The Two Routers — Pages vs App Router](#2-the-two-routers--pages-vs-app-router)
3. [File-Based Routing — The Core Idea](#3-file-based-routing--the-core-idea)
4. [Server Components vs Client Components](#4-server-components-vs-client-components)
5. [Data Fetching Patterns](#5-data-fetching-patterns)
6. [Rendering Strategies — SSG, SSR, ISR, CSR](#6-rendering-strategies--ssg-ssr-isr-csr)
7. [Loading, Error & Not-Found UI](#7-loading-error--not-found-ui)
8. [Layouts & Nested Layouts](#8-layouts--nested-layouts)
9. [Server Actions — The Game Changer](#9-server-actions--the-game-changer)
10. [API Routes](#10-api-routes)
11. [Middleware](#11-middleware)
12. [Image, Font & Script Optimization](#12-image-font--script-optimization)
13. [Metadata & SEO](#13-metadata--seo)
14. [Environment Variables](#14-environment-variables)
15. [Caching in Next.js](#15-caching-in-nextjs)
16. [Authentication Patterns](#16-authentication-patterns)
17. [Performance & Best Practices](#17-performance--best-practices)
18. [Interview Questions & Answers](#18-interview-questions--answers)
19. [Quick Reference Cheatsheet](#19-quick-reference-cheatsheet)

---

## 1. What is Next.js & Why It Exists

### The Problem with Plain React

Plain React is a **UI library** — it only runs in the browser. This means:

```
User visits website
      ↓
Browser downloads empty HTML (just a <div id="root">)
      ↓
Browser downloads massive JavaScript bundle
      ↓
JavaScript runs, React renders the page
      ↓
User finally sees something ← This takes TIME
```

**Problems:**

- Slow initial page load (bad UX)
- Search engines see empty HTML (bad SEO)
- No backend capabilities (no database, no auth)
- No built-in routing (need React Router)
- No image optimization, no code splitting by default

### What Next.js Adds on Top

Next.js is a **React framework** that gives React superpowers:

| Feature     | Plain React            | Next.js                 |
| ----------- | ---------------------- | ----------------------- |
| Routing     | Manual (React Router)  | Built-in, file-based    |
| Rendering   | Client-side only       | SSR, SSG, ISR, CSR      |
| SEO         | Poor (empty HTML)      | Excellent               |
| Backend     | Separate server needed | Built-in API routes     |
| Performance | Manual optimization    | Automatic               |
| Images      | `<img>` tag            | Optimized `<Image>`     |
| Fonts       | Manual loading         | Zero-layout-shift fonts |

### The Mental Model

```
Next.js = React + Router + Server + Optimizations
```

Think of Next.js as a full-stack framework where your React components can optionally run on the **server** instead of the browser.

---

## 2. The Two Routers — Pages vs App Router

Next.js has two routing systems. You will encounter both in jobs.

### Pages Router (Legacy — Next.js 12 and below)

```
pages/
├── index.js          → /
├── about.js          → /about
├── blog/
│   ├── index.js      → /blog
│   └── [slug].js     → /blog/any-slug
└── api/
    └── users.js      → /api/users (API endpoint)
```

### App Router (Modern — Next.js 13.4+, current standard)

```
app/
├── page.js           → /
├── layout.js         → Root layout (wraps everything)
├── about/
│   └── page.js       → /about
├── blog/
│   ├── page.js       → /blog
│   └── [slug]/
│       └── page.js   → /blog/any-slug
└── api/
    └── users/
        └── route.js  → /api/users (API endpoint)
```

### Key Differences at a Glance

|                        | Pages Router                           | App Router                         |
| ---------------------- | -------------------------------------- | ---------------------------------- |
| Default component type | Client Component                       | **Server Component**               |
| Data fetching          | `getServerSideProps`, `getStaticProps` | Direct `async/await` in components |
| Layouts                | `_app.js` (only one)                   | Nested layouts per route           |
| Loading states         | Manual                                 | `loading.js` file                  |
| Error handling         | `_error.js`                            | `error.js` file                    |
| Streaming              | ❌                                     | ✅                                 |
| Server Actions         | ❌                                     | ✅                                 |

> 💡 **Which to learn?** Focus on **App Router**. All new projects use it. But know the Pages Router exists because most existing codebases still use it.

---

## 3. File-Based Routing — The Core Idea

In Next.js, **the file system is the router**. No `<Route>` components needed.

### Special Files in App Router

| File            | Purpose                                  |
| --------------- | ---------------------------------------- |
| `page.js`       | The UI of a route (makes URL accessible) |
| `layout.js`     | Wraps pages, persists across navigations |
| `loading.js`    | Shown while page is loading              |
| `error.js`      | Shown when an error occurs               |
| `not-found.js`  | Shown for 404 errors                     |
| `route.js`      | API endpoint (no UI)                     |
| `template.js`   | Like layout, but re-mounts on navigation |
| `middleware.js` | Runs before every request                |

### Dynamic Routes

```
app/
├── blog/
│   └── [slug]/           ← Dynamic segment
│       └── page.js       → /blog/hello-world, /blog/nextjs-guide
├── shop/
│   └── [...categories]/  ← Catch-all segment
│       └── page.js       → /shop/a, /shop/a/b, /shop/a/b/c
└── user/
    └── [[...id]]/        ← Optional catch-all
        └── page.js       → /user AND /user/123 AND /user/123/settings
```

```jsx
// app/blog/[slug]/page.js
// params comes from the URL automatically
export default function BlogPost({ params }) {
  return <h1>Post: {params.slug}</h1>;
}

// /blog/hello-world → params = { slug: 'hello-world' }
```

```jsx
// app/shop/[...categories]/page.js
export default function ShopPage({ params }) {
  return <div>Categories: {params.categories.join(" > ")}</div>;
}

// /shop/electronics/phones → params = { categories: ['electronics', 'phones'] }
```

### Route Groups — Organize Without Affecting URL

```
app/
├── (marketing)/          ← Parentheses = route group (not in URL)
│   ├── layout.js         → Only applies to marketing pages
│   ├── page.js           → /
│   └── about/
│       └── page.js       → /about
└── (dashboard)/
    ├── layout.js         → Only applies to dashboard pages
    └── dashboard/
        └── page.js       → /dashboard
```

Route groups let you have **different layouts** for different sections without affecting the URL structure.

### Parallel Routes — Show Multiple Pages at Once

```
app/
└── dashboard/
    ├── layout.js
    ├── page.js
    ├── @analytics/        ← Parallel route slot
    │   └── page.js
    └── @team/             ← Parallel route slot
        └── page.js
```

```jsx
// app/dashboard/layout.js
export default function DashboardLayout({ children, analytics, team }) {
  return (
    <div>
      {children} {/* dashboard/page.js */}
      {analytics} {/* @analytics/page.js */}
      {team} {/* @team/page.js */}
    </div>
  );
}
```

---

## 4. Server Components vs Client Components

This is the most important concept in modern Next.js. Get this wrong and nothing else makes sense.

### The Mental Model

```
Your Next.js App
├── Server Components  ← Run on the server. HTML sent to browser.
│   ✅ Can fetch data directly (async/await)
│   ✅ Can access databases, file system, secrets
│   ✅ Zero JS sent to browser (fast!)
│   ❌ No useState, useEffect, or any hooks
│   ❌ No event handlers (onClick, onChange)
│   ❌ No browser APIs (localStorage, window)
│
└── Client Components  ← Run in the browser (like regular React)
    ✅ useState, useEffect, all hooks
    ✅ Event handlers (onClick, etc.)
    ✅ Browser APIs
    ❌ No direct database access
    ❌ Can't use server-only secrets
```

### By Default — Server Components

In the App Router, **every component is a Server Component by default**. To make it a Client Component, add `'use client'` at the top:

```jsx
// app/page.js — SERVER COMPONENT (default)
// No 'use client' directive = runs on server

async function getUsers() {
  const res = await fetch("https://api.example.com/users");
  return res.json();
}

export default async function HomePage() {
  const users = await getUsers(); // ✅ Can await directly! No useEffect needed.

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

```jsx
// components/Counter.jsx — CLIENT COMPONENT
"use client"; // ← This line makes it a Client Component

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0); // ✅ Hooks work here

  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}
```

### Composing Them Together

The golden rule: **Server Components can contain Client Components, but Client Components cannot contain Server Components.**

```jsx
// app/dashboard/page.js — Server Component
import UserList from "@/components/UserList"; // Server Component
import SearchBar from "@/components/SearchBar"; // Client Component (has useState)

async function getUsers() {
  return await db.users.findMany(); // Direct DB access!
}

export default async function DashboardPage() {
  const users = await getUsers();

  return (
    <div>
      <SearchBar /> {/* Client Component inside Server Component ✅ */}
      <UserList users={users} /> {/* Server Component */}
    </div>
  );
}
```

```jsx
// components/SearchBar.jsx — Client Component
"use client";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

### The "Passing Server Components as Children" Pattern

```jsx
// ❌ This WON'T work — Server Component inside Client Component
'use client';
import ServerComponent from './ServerComponent'; // Can't do this!

// ✅ This WORKS — pass Server Component as a prop/children
'use client';
export default function ClientWrapper({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      {open && children} {/* children can be a Server Component! */}
    </div>
  );
}

// app/page.js (Server Component)
import ClientWrapper from '@/components/ClientWrapper';
import ServerContent from '@/components/ServerContent';

export default function Page() {
  return (
    <ClientWrapper>
      <ServerContent /> {/* Server Component passed as children ✅ */}
    </ClientWrapper>
  );
}
```

---

## 5. Data Fetching Patterns

### Pattern 1: Direct async/await in Server Components (Most Common)

```jsx
// app/products/page.js
export default async function ProductsPage() {
  // Fetch runs on the server — no CORS, no loading state needed
  const products = await fetch("https://api.store.com/products").then((r) =>
    r.json(),
  );

  return (
    <div>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
```

### Pattern 2: Parallel Data Fetching

```jsx
// ❌ Sequential — slow! Each waits for the previous
async function Page() {
  const user = await fetchUser(); // 200ms
  const posts = await fetchPosts(); // 300ms
  const comments = await fetchComments(); // 150ms
  // Total: 650ms
}

// ✅ Parallel — fast! All run at the same time
async function Page() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(), // ↓
    fetchPosts(), // ↓ All start simultaneously
    fetchComments(), // ↓
  ]);
  // Total: 300ms (longest one)
}
```

### Pattern 3: Fetching in Client Components (with useEffect or SWR)

```jsx
"use client";
import { useState, useEffect } from "react";

// The old way — manual useEffect
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

```jsx
// The better way — SWR (recommended for client-side fetching)
"use client";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

function ProductList() {
  const { data, error, isLoading } = useSWR("/api/products", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <ul>
      {data.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

### Pattern 4: Streaming with Suspense

Stream parts of the page as they become ready instead of waiting for everything:

```jsx
// app/dashboard/page.js
import { Suspense } from "react";
import UserProfile from "@/components/UserProfile"; // Fast
import RecentOrders from "@/components/RecentOrders"; // Slow
import Analytics from "@/components/Analytics"; // Very slow

export default function DashboardPage() {
  return (
    <div>
      {/* Renders immediately */}
      <UserProfile />

      {/* Streams in when RecentOrders is ready */}
      <Suspense fallback={<div>Loading orders...</div>}>
        <RecentOrders />
      </Suspense>

      {/* Streams in when Analytics is ready */}
      <Suspense fallback={<div>Loading analytics...</div>}>
        <Analytics />
      </Suspense>
    </div>
  );
}
```

The user sees content progressively — no blank screen waiting for the slowest query!

---

## 6. Rendering Strategies — SSG, SSR, ISR, CSR

This is the heart of Next.js. Understanding rendering strategies is what separates Next.js developers from React developers.

### SSG — Static Site Generation

The page is rendered at **build time** and served as a static file. Fastest possible delivery.

```jsx
// app/about/page.js
// No fetch = static by default in App Router
export default function AboutPage() {
  return <h1>About Us</h1>; // HTML generated once at build time
}
```

```jsx
// Fetching at build time = SSG
export default async function BlogPage() {
  // This fetch happens at BUILD TIME, not on each request
  const posts = await fetch("https://api.blog.com/posts", {
    cache: "force-cache", // ← Tells Next.js to cache forever (SSG behavior)
  }).then((r) => r.json());

  return <PostList posts={posts} />;
}
```

**When to use:** Marketing pages, docs, blogs — content that doesn't change per user.

### SSR — Server-Side Rendering

The page is rendered on the **server on each request**. Fresh data every time.

```jsx
// app/dashboard/page.js
export default async function DashboardPage() {
  const data = await fetch("https://api.example.com/data", {
    cache: "no-store", // ← Tells Next.js: never cache, always fetch fresh
  }).then((r) => r.json());

  return <Dashboard data={data} />;
}
```

```jsx
// Another way to opt into SSR
export const dynamic = "force-dynamic"; // Force this route to always SSR

export default async function Page() {
  const data = await fetchFreshData();
  return <div>{data}</div>;
}
```

**When to use:** User-specific pages (dashboard, profile), real-time data, pages with auth.

### ISR — Incremental Static Regeneration

The best of both worlds: static speed with fresh data. The page is statically generated but **revalidated** after a set time.

```jsx
// app/products/page.js
export default async function ProductsPage() {
  const products = await fetch("https://api.store.com/products", {
    next: { revalidate: 3600 }, // ← Revalidate every 1 hour (3600 seconds)
  }).then((r) => r.json());

  return <ProductList products={products} />;
}
```

**How ISR works:**

```
First request  → Generate static page (takes 200ms)
Next requests  → Serve cached static page instantly (0ms)
After 1 hour   → Next request triggers background regeneration
New requests   → Still get old page while new one generates
After rebuild  → Everyone gets fresh page
```

**When to use:** E-commerce products, news articles, prices — data that changes but not every second.

### On-Demand ISR — Revalidate When Data Changes

```jsx
// app/api/revalidate/route.js
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  const secret = request.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  // Call this from your CMS webhook when content changes
  revalidatePath("/blog"); // Revalidate a specific path
  revalidateTag("blog-posts"); // Revalidate all fetches with this tag

  return NextResponse.json({ revalidated: true });
}
```

### CSR — Client-Side Rendering

Like plain React — page renders in the browser. No server involvement.

```jsx
"use client";
import useSWR from "swr";

// This component fetches data in the browser, just like plain React
export default function LivePrices() {
  const { data } = useSWR("/api/prices", fetcher, {
    refreshInterval: 1000, // Refetch every second
  });

  return <div>BTC: ${data?.bitcoin}</div>;
}
```

**When to use:** Real-time data (prices, chat), user-specific private data, interactive widgets.

### Rendering Strategy Summary

```
                Fast?   Fresh?  SEO?  Per-User?
SSG             ✅✅✅   ❌       ✅     ❌
SSR             ✅      ✅✅✅   ✅     ✅
ISR             ✅✅     ✅✅     ✅     ❌
CSR             ✅      ✅✅✅   ❌     ✅

Use SSG  → static content, marketing, docs
Use SSR  → user dashboards, auth pages, real-time
Use ISR  → e-commerce, news, blogs
Use CSR  → live data, private user content
```

---

## 7. Loading, Error & Not-Found UI

Next.js has special files that automatically handle these states.

### loading.js — Automatic Loading States

```jsx
// app/blog/loading.js
// Automatically shown while blog/page.js is loading
export default function BlogLoading() {
  return (
    <div>
      {/* Skeleton UI */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-title" />
          <div className="skeleton-text" />
        </div>
      ))}
    </div>
  );
}
```

Next.js wraps your `page.js` in a `<Suspense>` boundary using `loading.js` automatically. You don't write any Suspense code yourself.

### error.js — Automatic Error Boundaries

```jsx
// app/blog/error.js
// ⚠️ MUST be a Client Component
"use client";

export default function BlogError({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      {/* reset() retries the failed render */}
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### not-found.js — 404 Pages

```jsx
// app/not-found.js — Global 404 page
export default function NotFound() {
  return (
    <div>
      <h1>404 — Page Not Found</h1>
      <a href="/">Go Home</a>
    </div>
  );
}
```

```jsx
// app/blog/[slug]/page.js — Trigger 404 programmatically
import { notFound } from "next/navigation";

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound(); // ← Renders not-found.js
  }

  return <article>{post.content}</article>;
}
```

### The Error Hierarchy

```
app/
├── error.js            ← Catches errors from any page (global)
├── layout.js
├── page.js
└── blog/
    ├── error.js        ← Only catches errors from blog routes
    ├── loading.js      ← Only shows for blog routes
    └── [slug]/
        ├── error.js    ← Most specific — only for a single post
        └── page.js
```

---

## 8. Layouts & Nested Layouts

Layouts are components that **wrap pages** and **persist across navigations** (no re-mount). This is huge for performance and UX.

### Root Layout (Required)

```jsx
// app/layout.js — REQUIRED. Wraps the entire app.
export const metadata = {
  title: "My App",
  description: "The best app ever",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* Renders on every page */}
        <main>
          {children} {/* Each page renders here */}
        </main>
        <Footer /> {/* Renders on every page */}
      </body>
    </html>
  );
}
```

### Nested Layouts

```jsx
// app/dashboard/layout.js
// Only wraps dashboard pages — /dashboard, /dashboard/settings, etc.
export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar /> {/* Only on dashboard pages */}
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
```

```jsx
// app/dashboard/settings/layout.js
// Even more nested — only wraps settings pages
export default function SettingsLayout({ children }) {
  return (
    <div>
      <SettingsNav /> {/* Only on settings pages */}
      {children}
    </div>
  );
}
```

**What the user sees for `/dashboard/settings/profile`:**

```
RootLayout (Navbar + Footer)
  └── DashboardLayout (Sidebar)
       └── SettingsLayout (SettingsNav)
            └── ProfilePage (page.js)
```

**Key benefit:** When navigating from `/dashboard` to `/dashboard/settings`, the `DashboardLayout` (and its `Sidebar`) does NOT re-mount. Only the inner page changes. This is much faster than React Router.

---

## 9. Server Actions — The Game Changer

Server Actions let you run server-side code directly from your components — no API routes needed for simple mutations. This is one of the most powerful Next.js 14 features.

### The Old Way (Before Server Actions)

```
User clicks "Submit"
      ↓
Client-side fetch to /api/create-post
      ↓
API route handles validation + DB write
      ↓
Returns JSON response
      ↓
Client updates UI
```

### The New Way (Server Actions)

```
User clicks "Submit"
      ↓
Server Action runs directly (validation + DB write)
      ↓
Page automatically revalidates
```

### Basic Server Action

```jsx
// app/posts/new/page.js
export default function NewPostPage() {
  // Define the action — this runs on the SERVER
  async function createPost(formData) {
    "use server"; // ← This directive makes it a Server Action

    const title = formData.get("title");
    const content = formData.get("content");

    // Direct database access — no API needed!
    await db.posts.create({ data: { title, content } });

    // Revalidate the posts page cache
    revalidatePath("/posts");
    redirect("/posts"); // Redirect after success
  }

  return (
    // Pass the server action to the form's action prop
    <form action={createPost}>
      <input name="title" placeholder="Post title" required />
      <textarea name="content" placeholder="Content" required />
      <button type="submit">Create Post</button>
    </form>
  );
}
```

### Server Action in a Separate File

```jsx
// app/actions/posts.js
"use server"; // All functions in this file are Server Actions

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export async function createPost(formData) {
  const title = formData.get("title");
  const content = formData.get("content");

  // Validation
  if (!title || title.length < 3) {
    throw new Error("Title must be at least 3 characters");
  }

  await db.posts.create({
    data: { title, content, userId: getCurrentUserId() },
  });

  revalidatePath("/posts");
  redirect("/posts");
}

export async function deletePost(id) {
  await db.posts.delete({ where: { id } });
  revalidatePath("/posts");
}

export async function updatePost(id, formData) {
  const title = formData.get("title");
  await db.posts.update({ where: { id }, data: { title } });
  revalidatePath(`/posts/${id}`);
}
```

### Using Server Actions with useFormStatus

```jsx
// components/SubmitButton.jsx
"use client";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus(); // Knows if the form action is running

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create Post"}
    </button>
  );
}
```

### Using Server Actions Programmatically (Not Just Forms)

```jsx
"use client";
import { deletePost } from "@/app/actions/posts";

export default function DeleteButton({ postId }) {
  return <button onClick={() => deletePost(postId)}>Delete Post</button>;
}
```

---

## 10. API Routes

API Routes let you build a backend API inside your Next.js project. They run on the server and return JSON (or any response).

### Creating API Routes (App Router)

```jsx
// app/api/users/route.js
import { NextResponse } from "next/server";

// GET /api/users
export async function GET(request) {
  const users = await db.users.findMany();
  return NextResponse.json(users);
}

// POST /api/users
export async function POST(request) {
  const body = await request.json();
  const { name, email } = body;

  const user = await db.users.create({
    data: { name, email },
  });

  return NextResponse.json(user, { status: 201 });
}
```

```jsx
// app/api/users/[id]/route.js
// GET /api/users/123
export async function GET(request, { params }) {
  const user = await db.users.findUnique({
    where: { id: params.id },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// DELETE /api/users/123
export async function DELETE(request, { params }) {
  await db.users.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "User deleted" });
}

// PATCH /api/users/123
export async function PATCH(request, { params }) {
  const body = await request.json();
  const user = await db.users.update({
    where: { id: params.id },
    data: body,
  });
  return NextResponse.json(user);
}
```

### Using URL Search Params

```jsx
// GET /api/products?category=shoes&page=2
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1");

  const products = await db.products.findMany({
    where: { category },
    skip: (page - 1) * 10,
    take: 10,
  });

  return NextResponse.json({ products, page });
}
```

### When to Use API Routes vs Server Actions

```
API Routes            → External clients (mobile apps, other services),
                         complex REST APIs, webhooks, public APIs

Server Actions        → Form submissions, mutations triggered by UI,
                         internal data mutations, simpler flows
```

---

## 11. Middleware

Middleware runs **before** a request completes. It can redirect, rewrite, add headers, or modify the response.

```jsx
// middleware.js — lives in the ROOT of your project (not inside /app)
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // --- Auth Protection ---
  const token = request.cookies.get("auth-token")?.value;

  if (pathname.startsWith("/dashboard") && !token) {
    // Redirect to login if trying to access dashboard without auth
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // --- Locale/Language Redirect ---
  if (pathname === "/") {
    const locale =
      request.headers.get("accept-language")?.split(",")[0] || "en";
    if (locale.startsWith("ar")) {
      return NextResponse.redirect(new URL("/ar", request.url));
    }
  }

  // --- Add Custom Headers ---
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

// Control which routes middleware runs on
export const config = {
  matcher: [
    "/dashboard/:path*", // All dashboard routes
    "/admin/:path*", // All admin routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // Everything except assets
  ],
};
```

### Common Middleware Use Cases

```jsx
// 1. A/B Testing
export function middleware(request) {
  const bucket = Math.random() < 0.5 ? "a" : "b";
  const url = request.nextUrl.clone();
  url.pathname = `/experiments/${bucket}${request.nextUrl.pathname}`;
  return NextResponse.rewrite(url);
}

// 2. Geo-based routing
export function middleware(request) {
  const country = request.geo?.country || "US";
  if (country === "PK") {
    return NextResponse.rewrite(
      new URL("/pk" + request.nextUrl.pathname, request.url),
    );
  }
}

// 3. Rate limiting (simplified)
export function middleware(request) {
  const ip = request.ip || "unknown";
  // Check rate limit (in real app, use Redis or similar)
  const isRateLimited = checkRateLimit(ip);
  if (isRateLimited) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
}
```

---

## 12. Image, Font & Script Optimization

### next/image — Automatic Image Optimization

```jsx
import Image from 'next/image';

// ✅ Optimized: automatic WebP conversion, lazy loading, size optimization
export default function ProductCard({ product }) {
  return (
    <div>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={400}          // Required for external images
        height={300}         // Required for external images
        priority={false}     // Set true for above-the-fold images (LCP)
        placeholder="blur"   // Shows blur while loading
        blurDataURL="..."    // Tiny base64 image for blur placeholder
      />
    </div>
  );
}

// For images that fill their container:
export default function HeroSection() {
  return (
    <div style={{ position: 'relative', height: '500px' }}>
      <Image
        src="/hero.jpg"
        alt="Hero image"
        fill                       // Fills parent container
        style={{ objectFit: 'cover' }}
        priority                   // Load immediately — it's above the fold!
      />
    </div>
  );
}
```

```js
// next.config.js — Allow external image domains
module.exports = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.cloudinary.com" },
    ],
  },
};
```

### next/font — Zero Layout Shift Fonts

```jsx
// app/layout.js
import { Inter, Roboto_Mono, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // CSS variable for use in CSS files
});

const mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

**Why this is amazing:** Fonts are downloaded, self-hosted, and inlined — no FOUT (Flash of Unstyled Text), no layout shift, no external network request for fonts.

### next/script — Optimized Third-Party Scripts

```jsx
import Script from "next/script";

export default function Layout({ children }) {
  return (
    <>
      {children}

      {/* Load after everything else — won't block page render */}
      <Script
        src="https://analytics.example.com/script.js"
        strategy="lazyOnload"
      />

      {/* Load after page is interactive */}
      <Script
        src="https://maps.googleapis.com/..."
        strategy="afterInteractive"
      />

      {/* Load immediately (for critical scripts) */}
      <Script src="/critical-script.js" strategy="beforeInteractive" />

      {/* Inline script with callback */}
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() => console.log("FB SDK loaded")}
      />
    </>
  );
}
```

---

## 13. Metadata & SEO

Next.js has a built-in Metadata API that generates `<head>` tags — crucial for SEO.

### Static Metadata

```jsx
// app/about/page.js
export const metadata = {
  title: "About Us — My Company",
  description: "Learn about our mission and team",
  keywords: ["react", "nextjs", "web development"],
  openGraph: {
    title: "About Us",
    description: "Learn about our mission",
    images: [{ url: "https://mysite.com/og-about.jpg" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us",
    description: "Learn about our mission",
    images: ["https://mysite.com/og-about.jpg"],
  },
};

export default function AboutPage() {
  return <main>About content...</main>;
}
```

### Dynamic Metadata

```jsx
// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  // Fetch the post to get its title and description
  const post = await getPost(params.slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} — My Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return <article>{post.content}</article>;
}
```

### Title Templates

```jsx
// app/layout.js
export const metadata = {
  title: {
    template: "%s | My Site", // %s = page-specific title
    default: "My Site", // Used when no title is set
  },
  description: "My awesome site",
};

// app/about/page.js
export const metadata = {
  title: "About", // Becomes "About | My Site"
};

// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return { title: post.title }; // Becomes "Post Title | My Site"
}
```

---

## 14. Environment Variables

```bash
# .env.local — for local development (never commit this!)
DATABASE_URL=postgresql://localhost/mydb
JWT_SECRET=super-secret-key-12345

# Public variables accessible in browser (prefix with NEXT_PUBLIC_)
NEXT_PUBLIC_API_URL=https://api.mysite.com
NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIzaSy...

# .env.production — for production only
DATABASE_URL=postgresql://prod-server/mydb

# .env — shared defaults (can commit, but no secrets!)
NEXT_PUBLIC_APP_NAME=My App
```

```jsx
// Server-side — access any env variable
// (Only in Server Components, API routes, Server Actions, middleware)
const dbUrl = process.env.DATABASE_URL;
const secret = process.env.JWT_SECRET;

// Client-side — ONLY NEXT_PUBLIC_ variables are accessible
// (In Client Components)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ❌ This will be undefined on the client!
const secret = process.env.JWT_SECRET; // undefined — security feature!
```

> 🔐 **Security rule:** Never prefix secrets with `NEXT_PUBLIC_`. Non-prefixed variables are server-only and are never sent to the browser. This is how Next.js protects your secrets.

---

## 15. Caching in Next.js

Caching is one of Next.js's most powerful (and confusing) features. Next.js 14 has four caching layers.

### Layer 1: Request Memoization (Within One Render)

```jsx
// Even if you call this in 10 different components,
// the actual fetch only happens ONCE per request
async function getUser(id) {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}

// Component A
async function Header() {
  const user = await getUser(1); // Fetch happens here
  return <div>{user.name}</div>;
}

// Component B — even deep in the tree
async function Sidebar() {
  const user = await getUser(1); // Returns cached result — no second fetch!
  return <div>{user.role}</div>;
}
```

React deduplicates identical fetch requests within a single server render automatically.

### Layer 2: Data Cache (Across Requests)

```jsx
// Cached forever (SSG behavior)
fetch(url, { cache: "force-cache" });

// Never cached (SSR behavior)
fetch(url, { cache: "no-store" });

// Cached for 1 hour, then revalidated (ISR behavior)
fetch(url, { next: { revalidate: 3600 } });

// Cached with a tag — revalidate by tag name
fetch(url, { next: { tags: ["posts", "homepage"] } });
```

```jsx
// Revalidate by tag from a Server Action or API route
import { revalidateTag } from "next/cache";

export async function updatePost(id, data) {
  "use server";
  await db.posts.update({ where: { id }, data });
  revalidateTag("posts"); // Clears all fetches tagged with 'posts'
}
```

### Layer 3: Full Route Cache (Static Pages)

Next.js caches statically rendered routes at build time. The HTML + React Server Component payload is stored on disk. Opt out with `export const dynamic = 'force-dynamic'`.

### Layer 4: Router Cache (Client-Side)

Next.js caches visited pages in the browser for instant back/forward navigation. Routes are stored for 30 seconds (dynamic) or 5 minutes (static) by default.

```jsx
// Force a full refresh of the router cache
import { useRouter } from "next/navigation";

function RefreshButton() {
  const router = useRouter();
  return <button onClick={() => router.refresh()}>Refresh</button>;
}
```

---

## 16. Authentication Patterns

### Using NextAuth.js (Most Popular)

```bash
npm install next-auth
```

```jsx
// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    // OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Email/Password provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await db.users.findByEmail(credentials.email);
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isValid) return null;

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub; // Add user ID to session
      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom login page
    error: "/auth/error", // Custom error page
  },
});

export { handler as GET, handler as POST };
```

```jsx
// app/layout.js — Provide session to the app
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
```

```jsx
// Protecting routes in middleware
// middleware.js
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/profile/:path*"],
};
```

```jsx
// Using session in Server Components
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) redirect("/login");

  return <div>Welcome, {session.user.name}!</div>;
}
```

```jsx
// Using session in Client Components
"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (session) {
    return (
      <nav>
        <span>{session.user.name}</span>
        <button onClick={() => signOut()}>Sign out</button>
      </nav>
    );
  }

  return <button onClick={() => signIn("google")}>Sign in with Google</button>;
}
```

---

## 17. Performance & Best Practices

### 1. Use Server Components by Default

```jsx
// ✅ Default: Server Component — zero JS bundle cost
async function ProductList() {
  const products = await db.products.findMany();
  return <ul>{products.map(...)}</ul>;
}

// ✅ Only add 'use client' when you need interactivity
'use client';
function AddToCartButton({ productId }) {
  const [added, setAdded] = useState(false);
  return <button onClick={() => setAdded(true)}>{added ? '✓ Added' : 'Add to Cart'}</button>;
}
```

### 2. Push 'use client' as Deep as Possible

```jsx
// ❌ BAD — entire page is a Client Component because of one button
"use client";
async function ProductPage({ params }) {
  // Can't be async anymore!
  // Can't fetch directly on server
  return (
    <div>
      <h1>Product Details</h1>
      <button onClick={handleAdd}>Add to Cart</button>{" "}
      {/* Only this needs client! */}
    </div>
  );
}

// ✅ GOOD — only the button is a Client Component
// app/products/[id]/page.js (Server Component)
async function ProductPage({ params }) {
  const product = await getProduct(params.id); // Direct fetch!
  return (
    <div>
      <h1>{product.name}</h1>
      <AddToCartButton productId={product.id} /> {/* Client Component */}
    </div>
  );
}
```

### 3. Use generateStaticParams for Dynamic SSG

```jsx
// app/blog/[slug]/page.js
// Tell Next.js which slugs to generate at build time
export async function generateStaticParams() {
  const posts = await db.posts.findMany({ select: { slug: true } });
  return posts.map((post) => ({ slug: post.slug }));
}
// → Generates /blog/post-1, /blog/post-2, etc. at build time
// → New posts that aren't in this list use ISR or SSR
```

### 4. Always Use next/link for Navigation

```jsx
import Link from 'next/link';

// ✅ Prefetches the page when link enters viewport
<Link href="/about">About</Link>

// ✅ Prefetch control
<Link href="/about" prefetch={false}>About</Link>

// ❌ Don't use plain <a> tags for internal links — no prefetching!
<a href="/about">About</a>
```

### 5. Redirect and Navigate Correctly

```jsx
// In Server Components, API routes, Server Actions:
import { redirect } from "next/navigation";
redirect("/login");

// In Client Components:
("use client");
import { useRouter } from "next/navigation";
const router = useRouter();
router.push("/dashboard");
router.replace("/login"); // No browser history entry
router.back();
router.refresh(); // Re-fetch server data for current route
```

---

## 18. Interview Questions & Answers

### 🟢 Beginner

---

**Q1: What is Next.js and how is it different from React?**

**A:** React is a UI library for building components that runs in the browser. Next.js is a full-stack framework built on top of React that adds file-based routing, server-side rendering, static site generation, built-in API routes, automatic code splitting, image/font optimization, and much more. You write React components, but Next.js decides when and where they run (server or client).

---

**Q2: What is file-based routing?**

**A:** In Next.js, routes are determined by the file system structure instead of code. A file at `app/about/page.js` automatically creates the `/about` route. No router configuration needed. Dynamic routes use brackets: `app/blog/[slug]/page.js` matches `/blog/any-slug`.

---

**Q3: What are Server Components and Client Components?**

**A:** Server Components run on the server — they can fetch data directly, access databases, and use server-only secrets, but can't use hooks or event handlers. Client Components (marked with `'use client'`) run in the browser and support all React features including hooks and DOM events. In the App Router, all components are Server Components by default.

---

**Q4: What is the difference between SSR and SSG?**

**A:** SSG (Static Site Generation) generates HTML at build time — pages are pre-built and served instantly from a CDN. SSR (Server-Side Rendering) generates HTML on each request — always fresh but slightly slower. SSG is better for content that doesn't change per user (blogs, docs); SSR is better for user-specific or real-time content.

---

**Q5: What is ISR?**

**A:** ISR (Incremental Static Regeneration) combines SSG and SSR. Pages are statically generated, but automatically re-generated in the background after a specified time interval (e.g., every hour). You get static speed with reasonably fresh data. Set it with `next: { revalidate: 3600 }` in your fetch call.

---

### 🟡 Intermediate

---

**Q6: When should you use 'use client'?**

**A:** Add `'use client'` when a component needs: React hooks (useState, useEffect, useContext), browser APIs (localStorage, window, geolocation), event handlers (onClick, onChange), or third-party libraries that use client-side features. The golden rule: push `'use client'` as deep into the component tree as possible to keep most components as Server Components.

---

**Q7: What are Server Actions and why are they useful?**

**A:** Server Actions are async functions marked with `'use server'` that run exclusively on the server. They can be called from forms or Client Components, and they can directly access databases without needing a separate API endpoint. They simplify the data mutation flow — instead of fetch → API route → DB, you get component → Server Action → DB. They also automatically integrate with React's form handling.

---

**Q8: How does Next.js caching work?**

**A:** Next.js has four caching layers: (1) Request Memoization — deduplicates identical fetch calls within a single render; (2) Data Cache — persists fetch results on disk across requests, controlled via `cache` and `next.revalidate` options; (3) Full Route Cache — caches static route HTML/RSC payloads; (4) Router Cache — client-side cache for already-visited routes. You control caching through fetch options and `revalidatePath`/`revalidateTag` functions.

---

**Q9: What is the difference between layout.js and template.js?**

**A:** Both wrap child pages, but layouts **persist across navigations** within their segment — they don't unmount or re-render when you navigate between child routes. Templates **re-mount** on every navigation, running `useEffect` again and resetting state. Use layouts for persistent UI like sidebars; use templates when you need fresh state on every navigation, like page transition animations or form resets.

---

**Q10: How do you protect routes in Next.js?**

**A:** There are three main ways: (1) **Middleware** — check auth tokens before the request reaches the page, redirect to login if unauthorized; (2) **Server Component** — call `getServerSession` at the top of a Server Component, redirect if no session; (3) **Nested Layouts** — put auth checks in a layout file so all child routes inherit the protection. Middleware is best for performance since it runs at the edge before any component renders.

---

### 🔴 Advanced

---

**Q11: Explain the Next.js rendering waterfall problem and how Suspense solves it.**

**A:** Without Suspense, if a page has three data fetches (fast, medium, slow), the entire page waits for the slowest one before sending HTML. With Suspense, you wrap each section individually — Next.js streams HTML as each section's data resolves. The user sees content progressively: the fast section renders in 100ms, the medium in 300ms, the slow in 1000ms, instead of nothing until 1000ms. This dramatically improves perceived performance (Time to First Byte and Largest Contentful Paint).

---

**Q12: What happens when you call revalidatePath vs revalidateTag?**

**A:** `revalidatePath('/blog')` invalidates the Full Route Cache for a specific path — next request regenerates that page. `revalidateTag('posts')` invalidates the Data Cache for all fetch calls tagged with `'posts'`, across all pages that use that tag. Use tags when multiple pages depend on the same data (e.g., after creating a post, revalidate 'posts' to update the blog index AND the homepage's "latest posts" section in one call).

---

**Q13: How would you implement streaming with selective hydration?**

**A:** Wrap slow components in `<Suspense>` with a fallback. Next.js sends the shell of the page immediately, then streams HTML chunks as each Suspense boundary's data resolves. For Client Components inside Suspense, React uses selective hydration — it can start hydrating interactive components that are already loaded while slower ones are still streaming. Combine this with `loading.js` files for route-level streaming (the file automatically creates a Suspense boundary around `page.js`).

---

**Q14: What is the difference between next/navigation and next/router?**

**A:** `next/router` is from the Pages Router (legacy). `next/navigation` is for the App Router (current). They have different APIs: `next/navigation` has `useRouter`, `usePathname`, `useSearchParams`, and `useParams` as separate hooks, while `next/router` combined most of these into one `useRouter` hook. In the App Router, `useRouter()` from `next/navigation` only has navigation methods (push, replace, back, refresh) — no pathname or params, which are separate hooks.

---

**Q15: How does Next.js handle code splitting and what is the `dynamic` import?**

**A:** Next.js automatically code-splits at the route level — each page only loads its own JavaScript. For further splitting within a page, use `dynamic` from `next/dynamic`:

```jsx
import dynamic from "next/dynamic";

// Component only loads when it's rendered
const HeavyChart = dynamic(() => import("@/components/HeavyChart"), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // Don't render on server (useful for browser-only libraries)
});
```

This keeps your initial bundle small by deferring large components (charts, maps, editors) until they're needed.

---

## 19. Quick Reference Cheatsheet

### File Conventions

```
app/
├── layout.js          → Persistent wrapper (required at root)
├── page.js            → Route UI (makes URL accessible)
├── loading.js         → Suspense fallback for the route
├── error.js           → Error boundary ('use client' required)
├── not-found.js       → 404 UI (trigger with notFound())
├── route.js           → API endpoint (GET, POST, etc.)
├── template.js        → Like layout but re-mounts on nav
└── middleware.js       → Runs before requests (in /root, not /app)
```

### Rendering at a Glance

```jsx
// SSG — build time, cached forever
fetch(url, { cache: "force-cache" });

// SSR — every request, never cached
fetch(url, { cache: "no-store" });
// OR
export const dynamic = "force-dynamic";

// ISR — cached, revalidated every N seconds
fetch(url, { next: { revalidate: 60 } });

// ISR by tag — revalidated on demand
fetch(url, { next: { tags: ["products"] } });
revalidateTag("products"); // Call from Server Action / API route
```

### Server vs Client Decision

```
Need useState / useEffect?          → 'use client'
Need onClick / onChange?            → 'use client'
Need browser APIs?                  → 'use client'
Need to fetch data?                 → Server Component (async/await)
Need to access DB / secrets?        → Server Component
Need SEO-friendly HTML?             → Server Component
Need real-time updates?             → Client Component + SWR/polling
```

### Navigation

```jsx
// Link (prefetches on hover/viewport)
import Link from "next/link";
<Link href="/about">About</Link>;

// Programmatic navigation (Client Components only)
import { useRouter } from "next/navigation";
router.push("/page");
router.replace("/page");
router.back();
router.refresh();

// Server-side redirect
import { redirect } from "next/navigation";
redirect("/login");

// Current path (Client)
import { usePathname } from "next/navigation";
const path = usePathname(); // '/dashboard'

// URL params (Client)
import { useSearchParams } from "next/navigation";
const params = useSearchParams();
const query = params.get("q");
```

### Key Rules to Remember

```
📌 Every file in /app must export a default React component (except route.js)
📌 Layouts persist — don't put per-page state in layouts
📌 error.js MUST be 'use client'
📌 Server Actions: put 'use server' at top of function OR top of file
📌 NEXT_PUBLIC_ prefix = accessible in browser
📌 No NEXT_PUBLIC_ prefix = server-only (never sent to browser)
📌 next/link for internal links (prefetching!)
📌 next/image for all images (optimization!)
📌 next/font for fonts (zero layout shift!)
📌 middleware.js goes in ROOT, not inside /app
```

---

> **Final Thought 💡**
>
> Next.js is not just a framework — it's a different way of thinking about React.  
> The key shift: **not every component needs to run in the browser.**  
> Once that clicks, everything else in Next.js starts to make sense.
>
> Start with the App Router. Understand Server vs Client Components deeply.  
> Master data fetching and caching. The rest follows naturally.

---

_Next.js 14+ | App Router | React 18 | Server Components_  
_Key patterns: Server Components, Server Actions, ISR, Streaming, Middleware_
