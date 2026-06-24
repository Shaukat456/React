# Server Components in Next.js — From Scratch

> **What you'll learn:** What Server Components actually are, how they differ from Client Components, the mental model for thinking in the Server/Client boundary, composition patterns, and real-world use cases — with examples throughout.

---

## 1. The Problem They Solve

Before Server Components, every React component ran in **two places**:

1. **On the server** — initial HTML generation (SSR/SSG)
2. **On the client** — hydration + re-renders

This meant your entire component tree, including things like database clients, secret keys, and heavy libraries, had to be bundled and shipped to the browser — even if the browser never needed them.

```jsx
// Old SSR React — this code ran on both server AND client
import { db } from "./database"; // 💀 Shipped to browser
import { formatDate } from "date-fns"; // 💀 Full library shipped to browser
import crypto from "crypto"; // 💀 Polyfilled for browser

export default function BlogPost({ id }) {
  // On server: fetches from DB for initial HTML
  // On client: tries to re-run this — but can't access DB!
  const post = db.posts.findById(id);
  return <article>{post.content}</article>;
}
```

**Server Components fix this entirely.** A Server Component runs _only_ on the server — its code is never sent to the browser, never hydrated, never re-executed on the client.

---

## 2. Server Components vs. Client Components — The Core Difference

```
┌─────────────────────────────────────────────────────────────────┐
│                        YOUR APP                                  │
│                                                                  │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │              SERVER COMPONENTS                            │  │
│   │  ✅ async/await directly in component                    │  │
│   │  ✅ Access databases, file system, secrets               │  │
│   │  ✅ Zero JS sent to browser                              │  │
│   │  ❌ No useState, useEffect, event handlers               │  │
│   │  ❌ No browser APIs (window, localStorage)               │  │
│   │                                                          │  │
│   │   ┌────────────────────────────────────────────────┐    │  │
│   │   │           CLIENT COMPONENTS                     │    │  │
│   │   │  ✅ useState, useEffect, useContext             │    │  │
│   │   │  ✅ Event handlers (onClick, onChange)          │    │  │
│   │   │  ✅ Browser APIs                                │    │  │
│   │   │  ❌ Cannot be async                             │    │  │
│   │   │  ❌ Cannot access DB/secrets directly           │    │  │
│   │   └────────────────────────────────────────────────┘    │  │
│   └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

| Capability                      | Server Component | Client Component |
| ------------------------------- | ---------------- | ---------------- |
| `async/await`                   | ✅               | ❌               |
| Database access                 | ✅               | ❌               |
| Environment secrets             | ✅               | ❌               |
| `useState` / `useReducer`       | ❌               | ✅               |
| `useEffect` / `useLayoutEffect` | ❌               | ✅               |
| Event handlers (`onClick`)      | ❌               | ✅               |
| `useContext`                    | ❌               | ✅               |
| Browser APIs                    | ❌               | ✅               |
| Sent in JS bundle               | ❌ Never         | ✅ Yes           |
| Can render Server Components    | ✅               | ❌               |
| Can render Client Components    | ✅               | ✅               |

---

## 3. How to Declare Each Type

### Server Component (Default in App Router)

**No special directive needed.** Every component in the App Router is a Server Component by default.

```tsx
// app/blog/page.tsx — Server Component by default
// No "use client" = runs only on the server

async function getPosts() {
  const res = await fetch("https://api.example.com/posts");
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts(); // ✅ Top-level await — no useEffect needed

  return (
    <main>
      {posts.map((post: any) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </main>
  );
}
```

### Client Component

Add `"use client"` at the very top of the file. This marks the component **and all its imports** as client-side.

```tsx
// app/components/Counter.tsx
"use client"; // ← Must be the first line (before imports)

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

## 4. The "use client" Boundary — How It Actually Works

`"use client"` doesn't mean "this component only runs on the client." It means **"this is where the server/client boundary begins."**

Everything **above** this boundary (ancestors) can be Server Components. Everything **below** it (the component itself and its imports) becomes client-side.

```
app/page.tsx           → Server Component
  └── ProductCard.tsx  → Server Component
        └── AddToCart.tsx  "use client" ← BOUNDARY
              └── CartIcon.tsx  → Client Component (even without "use client")
              └── PriceDisplay.tsx → Client Component (even without "use client")
```

Once you cross the boundary into a Client Component, all its **imported** components become client-side too — even if they don't have `"use client"`.

```tsx
// ❌ This makes PureServerComponent run on the client
// because it's imported inside a Client Component

"use client";
import PureServerComponent from "./PureServerComponent"; // ← Now client-side!

export default function ClientWrapper() {
  return <PureServerComponent />;
}
```

**The fix:** Pass Server Components as `children` or props — they stay on the server.

```tsx
// ✅ Server Component passed as children — stays on server
"use client";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      {open && children} {/* children can be a Server Component! */}
    </div>
  );
}
```

```tsx
// app/page.tsx — Server Component
import ClientWrapper from "./ClientWrapper";
import ServerContent from "./ServerContent"; // Server Component

export default function Page() {
  return (
    <ClientWrapper>
      <ServerContent /> {/* Rendered on server, passed as children */}
    </ClientWrapper>
  );
}
```

---

## 5. Fetching Data in Server Components

This is where Server Components shine. No `useEffect`, no loading state, no API route needed.

### Direct Database Access

```tsx
// app/dashboard/page.tsx
import { db } from "@/lib/database"; // never shipped to browser
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser(); // reads cookies/session on server

  // Query DB directly — no API needed
  const [orders, stats, notifications] = await Promise.all([
    db.orders.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    db.stats.findUnique({ where: { userId: user.id } }),
    db.notifications.count({ where: { userId: user.id, read: false } }),
  ]);

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>{notifications} unread notifications</p>
      <StatsPanel stats={stats} />
      <OrderTable orders={orders} />
    </div>
  );
}
```

The database credentials, the Prisma/DB client, the query logic — **none of it reaches the browser.** The browser only receives the final rendered HTML.

### Waterfall vs. Parallel Fetching

```tsx
// ❌ Waterfall — each awaits the previous one (slow)
async function SlowPage() {
  const user = await getUser(); // 200ms
  const orders = await getOrders(user.id); // 300ms — starts AFTER user
  const stats = await getStats(user.id); // 250ms — starts AFTER orders
  // Total: ~750ms
}

// ✅ Parallel — all fire simultaneously (fast)
async function FastPage() {
  const userPromise = getUser();
  const ordersPromise = getOrders(); // starts immediately
  const statsPromise = getStats(); // starts immediately

  const [user, orders, stats] = await Promise.all([
    userPromise,
    ordersPromise,
    statsPromise,
  ]);
  // Total: ~300ms (slowest one)
}
```

### Request Memoization — Fetch the Same Data Anywhere, Pay Once

Next.js automatically **deduplicates** identical `fetch()` calls within a single render. Call the same endpoint in 10 different components — it only hits the network once.

```tsx
// lib/data.ts
export async function getUser(id: string) {
  // This fetch is automatically memoized per request
  const res = await fetch(`https://api.example.com/users/${id}`);
  return res.json();
}
```

```tsx
// app/profile/page.tsx
import { getUser } from "@/lib/data";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfilePosts from "./ProfilePosts";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  // Called once here
  const user = await getUser(params.id);
  return (
    <>
      <ProfileHeader userId={params.id} /> {/* calls getUser internally */}
      <ProfileStats userId={params.id} /> {/* calls getUser internally */}
      <ProfilePosts userId={params.id} /> {/* calls getUser internally */}
    </>
  );
}
```

```tsx
// app/profile/ProfileHeader.tsx — Server Component
import { getUser } from "@/lib/data";

export default async function ProfileHeader({ userId }: { userId: string }) {
  const user = await getUser(userId); // ✅ Deduplicated — no extra network call
  return (
    <header>
      <h1>{user.name}</h1>
    </header>
  );
}
```

All four calls to `getUser` result in **one network request**. React memoizes it automatically.

---

## 6. Accessing Server-Only Resources

### Environment Variables & Secrets

```tsx
// app/api-client/page.tsx — Server Component
// ✅ Safe — STRIPE_SECRET_KEY never reaches the browser
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function BillingPage() {
  const paymentMethods = await stripe.paymentMethods.list({ limit: 10 });

  return (
    <div>
      {paymentMethods.data.map((pm) => (
        <PaymentMethodCard key={pm.id} last4={pm.card?.last4} />
      ))}
    </div>
  );
}
```

```tsx
// ❌ This is dangerous in a Client Component
"use client";
// process.env.NEXT_PUBLIC_* is exposed to browser
// process.env.STRIPE_SECRET_KEY would be undefined (Next.js protects this)
// but the pattern of using secrets in client components is wrong
```

### Enforcing Server-Only Modules

Install `server-only` to get a build-time error if a server module is accidentally imported in a Client Component.

```bash
npm install server-only
```

```tsx
// lib/database.ts
import "server-only"; // ← Build fails if this is imported in a client component

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma || new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
```

```tsx
// lib/auth.ts
import "server-only";
import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}
```

### Reading Cookies and Headers

```tsx
// app/settings/page.tsx — Server Component
import { cookies, headers } from "next/headers";

export default async function SettingsPage() {
  const cookieStore = cookies();
  const headersList = headers();

  const theme = cookieStore.get("theme")?.value ?? "light";
  const locale = headersList.get("accept-language")?.split(",")[0] ?? "en";
  const userAgent = headersList.get("user-agent") ?? "";

  return (
    <div data-theme={theme}>
      <h1>Settings</h1>
      <p>Language: {locale}</p>
      <p>Theme: {theme}</p>
    </div>
  );
}
```

---

## 7. Composing Server and Client Components

This is the most nuanced part — and where most mistakes happen.

### Pattern 1: Server Component Wraps Client Component

The most common pattern. Server fetches data, Client handles interaction.

```tsx
// app/products/page.tsx — Server Component
import ProductFilter from "./ProductFilter"; // Client Component
import { db } from "@/lib/database";

export default async function ProductsPage() {
  // Server fetches initial data
  const categories = await db.categories.findMany();
  const products = await db.products.findMany({ take: 20 });

  return (
    <div>
      {/* Pass server data as props to client component */}
      <ProductFilter categories={categories} initialProducts={products} />
    </div>
  );
}
```

```tsx
// app/products/ProductFilter.tsx — Client Component
"use client";

import { useState } from "react";

export default function ProductFilter({ categories, initialProducts }: Props) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState(initialProducts);

  async function handleFilter(categoryId: string) {
    setActiveCategory(categoryId);
    const res = await fetch(`/api/products?category=${categoryId}`);
    const data = await res.json();
    setProducts(data);
  }

  return (
    <div>
      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilter(cat.id)}
            className={activeCategory === cat.id ? "active" : ""}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
```

### Pattern 2: Interleaving — Client Wrapper with Server Children

```tsx
// app/components/Accordion.tsx — Client Component
"use client";

import { useState } from "react";

export default function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion">
      <button onClick={() => setOpen(!open)}>
        {title} {open ? "▲" : "▼"}
      </button>
      {open && <div className="content">{children}</div>}
    </div>
  );
}
```

```tsx
// app/faq/page.tsx — Server Component
import Accordion from "@/components/Accordion";
import { db } from "@/lib/database";

export default async function FAQPage() {
  const faqs = await db.faqs.findMany({ orderBy: { order: "asc" } });

  return (
    <main>
      <h1>FAQ</h1>
      {faqs.map((faq) => (
        // Client Component (Accordion) wraps Server-rendered content
        <Accordion key={faq.id} title={faq.question}>
          {/* This content is rendered on the server */}
          <p>{faq.answer}</p>
          {faq.relatedLinks && (
            <ul>
              {faq.relatedLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          )}
        </Accordion>
      ))}
    </main>
  );
}
```

### Pattern 3: Passing Server Components as Props

```tsx
// app/layout.tsx — Server Component
import Sidebar from "./Sidebar"; // Server Component
import UserMenu from "./UserMenu"; // Client Component
import { getCurrentUser } from "@/lib/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html>
      <body>
        <nav>
          <Logo />
          {/* Server Component passed as prop to Client Component */}
          <UserMenu
            userAvatar={<UserAvatar user={user} />} // Server Component as prop
          />
        </nav>
        <div className="layout">
          <Sidebar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
```

```tsx
// app/UserMenu.tsx — Client Component
"use client";

import { useState } from "react";

export default function UserMenu({
  userAvatar,
}: {
  userAvatar: React.ReactNode; // Server Component arrives as pre-rendered JSX
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="user-menu">
      <button onClick={() => setMenuOpen(!menuOpen)}>
        {userAvatar} {/* Rendered on server, displayed here */}
      </button>
      {menuOpen && (
        <ul className="dropdown">
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/settings">Settings</a>
          </li>
          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      )}
    </div>
  );
}
```

---

## 8. Server Components with Streaming & Suspense

Server Components work natively with React Suspense. While a slow Server Component is fetching, React streams the rest of the page and fills in the component when it's ready.

```tsx
// app/dashboard/page.tsx — Server Component
import { Suspense } from "react";

// Each of these is a slow Server Component
async function RevenueWidget() {
  await new Promise((r) => setTimeout(r, 500)); // simulates slow DB query
  const data = await db.revenue.getThisMonth();
  return <RevenueChart data={data} />;
}

async function OrdersWidget() {
  const orders = await db.orders.getRecent(10); // ~300ms
  return <OrderTable orders={orders} />;
}

async function AlertsWidget() {
  const alerts = await db.alerts.getUnread(); // ~200ms
  return <AlertList alerts={alerts} />;
}

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Streams in after ~200ms */}
      <Suspense fallback={<WidgetSkeleton />}>
        <AlertsWidget />
      </Suspense>

      {/* Streams in after ~300ms */}
      <Suspense fallback={<WidgetSkeleton />}>
        <OrdersWidget />
      </Suspense>

      {/* Streams in after ~500ms */}
      <Suspense fallback={<WidgetSkeleton />}>
        <RevenueWidget />
      </Suspense>
    </div>
  );
}
```

The user sees the page shell immediately. Each widget pops in as its data arrives — no waterfall, no full-page spinner.

### Nested Suspense

```tsx
// app/shop/page.tsx

export default function ShopPage() {
  return (
    <div>
      {/* Outer: loads product list */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid>
          {/* Inner: loads recommendations — can take longer */}
          <Suspense fallback={<RecommendationsSkeleton />}>
            <Recommendations />
          </Suspense>
        </ProductGrid>
      </Suspense>
    </div>
  );
}
```

---

## 9. Server Actions — Mutations from Server Components

Server Actions are **async functions that run on the server**, called directly from forms or Client Components — no API route needed.

```tsx
// app/posts/new/page.tsx — Server Component with Server Action

import { redirect } from "next/navigation";
import { db } from "@/lib/database";
import { getCurrentUser } from "@/lib/auth";

// Server Action — marked with "use server"
async function createPost(formData: FormData) {
  "use server"; // ← Can be inline or in a separate file

  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const post = await db.posts.create({
    data: {
      title,
      content,
      authorId: user.id,
      publishedAt: new Date(),
    },
  });

  redirect(`/posts/${post.slug}`); // server-side redirect after mutation
}

export default function NewPostPage() {
  return (
    <main>
      <h1>New Post</h1>
      {/* action={createPost} — no onSubmit handler needed */}
      <form action={createPost}>
        <input name="title" placeholder="Post title" required />
        <textarea name="content" placeholder="Write your post..." required />
        <button type="submit">Publish</button>
      </form>
    </main>
  );
}
```

### Server Actions in Client Components

```tsx
// app/actions/posts.ts — Server Actions file
"use server";

import { db } from "@/lib/database";
import { revalidatePath } from "next/cache";

export async function likePost(postId: string) {
  await db.likes.create({ data: { postId } });
  revalidatePath(`/posts/${postId}`); // revalidate the post page
  return { success: true };
}

export async function deletePost(postId: string) {
  await db.posts.delete({ where: { id: postId } });
  revalidatePath("/posts");
}
```

```tsx
// app/posts/LikeButton.tsx — Client Component calling Server Action
"use client";

import { useState, useTransition } from "react";
import { likePost } from "@/app/actions/posts";

export default function LikeButton({
  postId,
  initialLikes,
}: {
  postId: string;
  initialLikes: number;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [isPending, startTransition] = useTransition();

  function handleLike() {
    startTransition(async () => {
      const result = await likePost(postId); // Calls server directly
      if (result.success) setLikes((l) => l + 1);
    });
  }

  return (
    <button onClick={handleLike} disabled={isPending}>
      ❤️ {likes} {isPending ? "..." : ""}
    </button>
  );
}
```

---

## 10. Real-World Example: Full E-Commerce Product Page

This shows the complete Server/Client composition for a real product page.

```tsx
// app/products/[slug]/page.tsx — Root Server Component

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/database";
import { getCurrentUser } from "@/lib/auth";
import AddToCartButton from "./AddToCartButton"; // Client
import ReviewSection from "./ReviewSection"; // Server + Client mix
import RelatedProducts from "./RelatedProducts"; // Server

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await db.products.findUnique({
    where: { slug: params.slug },
    include: { images: true, category: true },
  });

  if (!product) notFound();

  const user = await getCurrentUser();

  return (
    <div className="product-page">
      {/* Server-rendered — zero JS */}
      <div className="product-images">
        {product.images.map((img) => (
          <img key={img.id} src={img.url} alt={img.alt} />
        ))}
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>

        {/* Client Component — needs interactivity */}
        <AddToCartButton
          productId={product.id}
          userId={user?.id}
          inStock={product.stock > 0}
        />
      </div>

      {/* Streams in — slow query */}
      <Suspense fallback={<div className="skeleton">Loading reviews...</div>}>
        <ReviewSection productId={product.id} userId={user?.id} />
      </Suspense>

      {/* Streams in — separate query */}
      <Suspense fallback={<div className="skeleton">Loading related...</div>}>
        <RelatedProducts
          categoryId={product.category.id}
          currentId={product.id}
        />
      </Suspense>
    </div>
  );
}
```

```tsx
// app/products/[slug]/AddToCartButton.tsx — Client Component
"use client";

import { useState, useTransition } from "react";
import { addToCart } from "@/app/actions/cart";

export default function AddToCartButton({
  productId,
  userId,
  inStock,
}: {
  productId: string;
  userId?: string;
  inStock: boolean;
}) {
  const [added, setAdded] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (!inStock) {
    return (
      <button disabled className="out-of-stock">
        Out of Stock
      </button>
    );
  }

  function handleAdd() {
    if (!userId) {
      window.location.href = "/login";
      return;
    }
    startTransition(async () => {
      await addToCart(productId, userId);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    });
  }

  return (
    <button onClick={handleAdd} disabled={isPending} className="add-to-cart">
      {isPending ? "Adding..." : added ? "Added! ✓" : "Add to Cart"}
    </button>
  );
}
```

```tsx
// app/products/[slug]/ReviewSection.tsx — Server Component

import { db } from "@/lib/database";
import ReviewForm from "./ReviewForm"; // Client Component

export default async function ReviewSection({
  productId,
  userId,
}: {
  productId: string;
  userId?: string;
}) {
  const reviews = await db.reviews.findMany({
    where: { productId },
    include: { author: { select: { name: true, avatar: true } } },
    orderBy: { createdAt: "desc" },
  });

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0;

  return (
    <section className="reviews">
      <h2>Reviews ({reviews.length})</h2>
      <p>
        Average: {"⭐".repeat(Math.round(avgRating))} ({avgRating.toFixed(1)})
      </p>

      {/* Client Component for the review form */}
      {userId && <ReviewForm productId={productId} userId={userId} />}

      {/* Server-rendered review list */}
      <ul className="review-list">
        {reviews.map((review) => (
          <li key={review.id} className="review">
            <img src={review.author.avatar} alt={review.author.name} />
            <strong>{review.author.name}</strong>
            <span>{"⭐".repeat(review.rating)}</span>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

---

## 11. Common Mistakes & How to Fix Them

### Mistake 1: Using hooks in a Server Component

```tsx
// ❌ Server Components can't use hooks
export default async function Page() {
  const [data, setData] = useState(null); // Error!
  useEffect(() => { ... }, []);           // Error!
  return <div />;
}

// ✅ Just await the data directly
export default async function Page() {
  const data = await fetchData();
  return <div>{data.title}</div>;
}
```

### Mistake 2: Importing a Server Component into a Client Component

```tsx
// ❌ This silently makes ServerOnlyThing run on the client
"use client";
import ServerOnlyThing from "./ServerOnlyThing"; // Becomes client-side

// ✅ Pass it as children from a Server Component above
("use client");
export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
```

### Mistake 3: Passing non-serializable props across the boundary

Props crossing the Server → Client boundary must be **serializable** (JSON-compatible). Functions, class instances, and Dates need special handling.

```tsx
// ❌ Functions can't cross the Server → Client boundary
<ClientComponent onClick={() => console.log("hi")} /> // Error!

// ❌ Class instances can't cross either
<ClientComponent user={new UserClass()} />

// ✅ Pass plain serializable data
<ClientComponent userId={user.id} userName={user.name} />

// ✅ Use Server Actions for passing functions
<ClientComponent onSubmit={serverAction} /> // Server Actions ARE serializable
```

### Mistake 4: Making everything a Client Component

```tsx
// ❌ Unnecessary — this component has no interactivity
"use client";
export default function ProductCard({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>${product.price}</p>
    </div>
  );
}

// ✅ Keep it as a Server Component — no JS shipped
export default function ProductCard({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>${product.price}</p>
    </div>
  );
}
```

### Mistake 5: Sequential fetches when you could parallelize

```tsx
// ❌ Unnecessary waterfall
export default async function Page({ params }) {
  const user = await getUser(params.id); // 200ms
  const posts = await getPosts(params.id); // 300ms — waits
  const followers = await getFollowers(params.id); // 150ms — waits
  // Total: 650ms
}

// ✅ Parallel
export default async function Page({ params }) {
  const [user, posts, followers] = await Promise.all([
    getUser(params.id),
    getPosts(params.id),
    getFollowers(params.id),
  ]);
  // Total: 300ms
}
```

---

## 12. The Mental Model — Think in Layers

The best way to think about Server vs. Client Components is in **layers**:

```
┌─────────────────────────────────────────────────────┐
│  DATA LAYER (Server Only)                            │
│  DB queries, API calls, auth, secrets                │
│  → Prisma, DrizzleORM, fetch with secrets            │
├─────────────────────────────────────────────────────┤
│  RENDER LAYER (Server Components)                    │
│  Transform data → HTML structure                     │
│  → async components, no useState                     │
├─────────────────────────────────────────────────────┤
│  INTERACTION LAYER (Client Components)               │
│  Handle user events, manage UI state                 │
│  → useState, useEffect, onClick, forms               │
└─────────────────────────────────────────────────────┘
```

**Ask yourself for every component:**

1. Does it need to respond to user interaction? → Client Component
2. Does it need browser APIs? → Client Component
3. Otherwise? → Keep it as a Server Component

---

## 13. Quick Reference

```tsx
// ── SERVER COMPONENT ──────────────────────────────────
// No directive needed. Default in App Router.
export default async function ServerComp() {
  const data = await db.query();          // ✅ DB access
  const secret = process.env.SECRET;     // ✅ Secrets safe
  return <div>{data.value}</div>;
}

// ── CLIENT COMPONENT ──────────────────────────────────
"use client";
import { useState } from "react";
export default function ClientComp() {
  const [val, setVal] = useState(0);     // ✅ Hooks
  return <button onClick={() => setVal(v => v + 1)}>{val}</button>;
}

// ── PASSING DATA SERVER → CLIENT ──────────────────────
// Server Component
export default async function Page() {
  const data = await getData();          // server
  return <ClientComp data={data} />;    // serializable props only
}

// ── KEEPING SERVER COMPONENTS INSIDE CLIENT BOUNDARY ──
// Client Component
export default function ClientWrapper({ children }) {
  return <div onClick={...}>{children}</div>;  // children = server component
}
// Server Component
export default function Page() {
  return <ClientWrapper><ServerChild /></ClientWrapper>;
}

// ── SERVER ACTION ──────────────────────────────────────
async function submit(formData: FormData) {
  "use server";
  await db.create({ data: formData.get("title") });
  revalidatePath("/");
}
export default function Form() {
  return <form action={submit}><button>Submit</button></form>;
}

// ── ENFORCE SERVER-ONLY ────────────────────────────────
import "server-only"; // Add to any file that must never run client-side
```

---

## Summary

Server Components are not just a performance optimization — they're a **fundamental shift in how you architect React apps**:

- **Default to Server Components.** Only add `"use client"` when you genuinely need interactivity or browser APIs.
- **The boundary is a design decision.** Push it as far down the tree as possible — keep data fetching and heavy logic on the server.
- **Children as props** is the key pattern for threading Server Components through Client Component trees.
- **Server Actions** replace API routes for mutations — no fetch boilerplate needed.
- **`server-only`** is your safety net — use it on any module that must never reach the browser.

The result: smaller JS bundles, faster load times, simpler data fetching, and a clear architectural boundary between "what the server knows" and "what the user interacts with."
