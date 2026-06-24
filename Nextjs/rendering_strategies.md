# Rendering Strategies in Next.js — From Scratch

> **What you'll learn:** Every rendering strategy Next.js offers, how each one works under the hood, when to use which, and real-world examples for all of them — covering both the Pages Router and the modern App Router.

---

## 1. The Core Question: Where and When Does HTML Get Built?

Every web page is ultimately HTML. The question that defines rendering strategy is:

> **Where** does the HTML get generated, and **when**?

| Strategy | Where | When |
|---|---|---|
| CSR — Client-Side Rendering | Browser | On every user visit, in the browser |
| SSR — Server-Side Rendering | Server | On every user request, at request time |
| SSG — Static Site Generation | Server | At build time, once |
| ISR — Incremental Static Regeneration | Server | At build time + re-generated on interval |
| PPR — Partial Prerendering | Server | Static shell at build + dynamic parts at request |

Next.js is unique because it supports **all of these** in the same project — even in the same page.

---

## 2. Before Next.js: The Problems It Solves

### Pure Client-Side Rendering (React without Next.js)

```jsx
// A plain React app — everything renders in the browser
function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  return <ProductList products={products} />;
}
```

**What the browser gets first:**
```html
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>   <!-- Empty! -->
    <script src="bundle.js"></script>
  </body>
</html>
```

**Problems:**
- Search engines see an empty page (bad SEO)
- Users see a blank screen until JS loads and runs (bad UX)
- Every user triggers a fresh API call (slow, expensive)

Next.js solves all three — depending on which strategy you pick.

---

## 3. The Two Routers in Next.js

Next.js has two paradigms. You need to know which one you're using.

```
your-app/
├── app/          ← App Router (Next.js 13+, recommended)
│   ├── layout.tsx
│   └── page.tsx
└── pages/        ← Pages Router (legacy, still supported)
    └── index.tsx
```

The rendering strategies are the same conceptually, but the **API is different**. This guide covers both.

---

## 4. Static Site Generation (SSG) — Build Once, Serve Forever

### What It Does

HTML is generated **once at build time** (`next build`) and reused for every request. The page is served from a CDN — blazing fast, zero server compute per request.

### Pages Router — `getStaticProps`

```tsx
// pages/blog/index.tsx

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
}

interface Props {
  posts: Post[];
}

// Runs at BUILD TIME only — never in the browser
export async function getStaticProps() {
  const res = await fetch("https://api.example.com/posts");
  const posts: Post[] = await res.json();

  return {
    props: { posts }, // passed to the component as props
  };
}

export default function BlogIndex({ posts }: Props) {
  return (
    <main>
      <h1>Blog</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </main>
  );
}
```

### Pages Router — Dynamic Routes with `getStaticPaths`

For dynamic routes like `/blog/[slug]`, you must tell Next.js which paths to pre-build.

```tsx
// pages/blog/[slug].tsx

export async function getStaticPaths() {
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();

  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false, // 404 for any path not in the list
    // fallback: "blocking" — SSR on first visit, then cached as static
    // fallback: true    — show loading state, then SSR + cache
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const res = await fetch(`https://api.example.com/posts/${params.slug}`);
  const post = await res.json();

  return {
    props: { post },
  };
}

export default function BlogPost({ post }: { post: Post & { content: string } }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

### App Router — Server Components (Default Behavior)

In the App Router, **every component is a Server Component by default** and runs at build time for static routes. No special function needed.

```tsx
// app/blog/page.tsx  ← This is SSG by default

async function getPosts() {
  // fetch() is automatically cached in Next.js App Router
  const res = await fetch("https://api.example.com/posts", {
    cache: "force-cache", // default — cache indefinitely (SSG behavior)
  });
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts(); // runs at build time

  return (
    <main>
      <h1>Blog</h1>
      {posts.map((post: Post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </main>
  );
}
```

```tsx
// app/blog/[slug]/page.tsx

// Tell Next.js which slugs to pre-render
export async function generateStaticParams() {
  const posts = await fetch("https://api.example.com/posts").then((r) => r.json());

  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetch(`https://api.example.com/posts/${params.slug}`, {
    cache: "force-cache",
  }).then((r) => r.json());

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

### When to Use SSG

**Perfect for:** Marketing pages, blogs, documentation, landing pages, product catalogs that don't change often.

**Avoid when:** Content changes frequently, content is user-specific, or you have millions of dynamic paths.

---

## 5. Server-Side Rendering (SSR) — Fresh HTML on Every Request

### What It Does

HTML is generated **on every incoming request** on the server. The user always gets up-to-date data, but there's server compute involved for every visit.

### Pages Router — `getServerSideProps`

```tsx
// pages/dashboard.tsx

import { GetServerSideProps } from "next";

interface DashboardProps {
  user: { name: string; email: string };
  stats: { visits: number; revenue: number; orders: number };
}

// Runs on EVERY request — has access to req/res
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, query } = context;

  // Read auth cookie from request
  const token = req.cookies["auth_token"];

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Fetch personalized data
  const [user, stats] = await Promise.all([
    fetch("https://api.example.com/me", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

    fetch("https://api.example.com/stats", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),
  ]);

  // Set cache headers
  res.setHeader("Cache-Control", "private, no-cache");

  return {
    props: { user, stats },
  };
};

export default function Dashboard({ user, stats }: DashboardProps) {
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <div>
        <Stat label="Total Visits" value={stats.visits} />
        <Stat label="Revenue" value={`$${stats.revenue}`} />
        <Stat label="Orders" value={stats.orders} />
      </div>
    </div>
  );
}
```

### App Router — `no-store` Cache / Dynamic Functions

In the App Router, opt into SSR by either using `cache: "no-store"` or using **dynamic functions** like `cookies()`, `headers()`, or `searchParams`.

```tsx
// app/dashboard/page.tsx

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

async function getUserData(token: string) {
  const res = await fetch("https://api.example.com/me", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store", // ← This makes it SSR — fresh every request
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function DashboardPage() {
  // Using cookies() automatically makes this page dynamic (SSR)
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) redirect("/login");

  const user = await getUserData(token);
  if (!user) redirect("/login");

  return (
    <div>
      <h1>Welcome back, {user.name}</h1>
      <p>Last login: {user.lastLogin}</p>
    </div>
  );
}
```

```tsx
// app/search/page.tsx
// searchParams makes this automatically SSR

interface SearchPageProps {
  searchParams: { q?: string; page?: string };
}

async function searchProducts(query: string, page: number) {
  const res = await fetch(
    `https://api.example.com/search?q=${query}&page=${page}`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const page = Number(searchParams.page) || 1;

  const { results, total } = await searchProducts(query, page);

  return (
    <div>
      <h1>Results for "{query}"</h1>
      <p>{total} products found</p>
      <ProductGrid products={results} />
      <Pagination currentPage={page} total={total} />
    </div>
  );
}
```

### When to Use SSR

**Perfect for:** User dashboards, search results pages, authenticated content, pages with request-specific data (cookies, headers), real-time pricing.

**Avoid when:** Content is the same for all users (use SSG instead), or you need extreme performance at scale (SSR adds latency per request).

---

## 6. Incremental Static Regeneration (ISR) — The Best of Both Worlds

### What It Does

Pages are statically generated at build time, but they **automatically regenerate in the background** after a specified interval. Users always get a cached page (fast), but the cache stays fresh.

```
Request 1 (0s)   → Cached static page served instantly
Request 2 (30s)  → Cached page served + background regeneration triggered
Request 3 (31s)  → NEW regenerated page served, new cache started
```

### Pages Router — `revalidate` in `getStaticProps`

```tsx
// pages/products/[id].tsx

export async function getStaticProps({ params }: { params: { id: string } }) {
  const product = await fetch(
    `https://api.example.com/products/${params.id}`
  ).then((r) => r.json());

  return {
    props: { product },
    revalidate: 60, // Regenerate at most every 60 seconds
  };
}

export async function getStaticPaths() {
  // Pre-build only the top 100 most popular products
  const topProducts = await fetch(
    "https://api.example.com/products?sort=popular&limit=100"
  ).then((r) => r.json());

  return {
    paths: topProducts.map((p: { id: string }) => ({
      params: { id: p.id },
    })),
    fallback: "blocking", // Other products are SSR on first visit, then cached
  };
}
```

### Pages Router — On-Demand Revalidation

Instead of a time interval, trigger revalidation manually — e.g., from a CMS webhook.

```tsx
// pages/api/revalidate.ts

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Protect with a secret token from your CMS
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const { slug } = req.body; // CMS sends the updated content's slug

  try {
    await res.revalidate(`/blog/${slug}`);
    return res.json({ revalidated: true, path: `/blog/${slug}` });
  } catch (err) {
    return res.status(500).json({ message: "Error revalidating" });
  }
}
```

### App Router — `next.revalidate`

```tsx
// app/products/[id]/page.tsx

async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`, {
    next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
  });
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p className="price">${product.price}</p>
      <p>{product.description}</p>
      <p className="stock">
        {product.inStock ? "In Stock" : "Out of Stock"}
      </p>
    </div>
  );
}
```

### App Router — On-Demand Revalidation

```tsx
// app/api/revalidate/route.ts

import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidation-secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, slug, tag } = await request.json();

  if (type === "path") {
    revalidatePath(`/blog/${slug}`);
    return NextResponse.json({ revalidated: true, path: `/blog/${slug}` });
  }

  if (type === "tag") {
    revalidateTag(tag); // revalidate all fetches tagged with this tag
    return NextResponse.json({ revalidated: true, tag });
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}
```

```tsx
// app/blog/[slug]/page.tsx — using cache tags

async function getPost(slug: string) {
  return fetch(`https://api.example.com/posts/${slug}`, {
    next: {
      tags: [`post-${slug}`, "posts"], // tag this fetch
    },
  }).then((r) => r.json());
}
```

### When to Use ISR

**Perfect for:** E-commerce product pages, news articles, pricing pages, any content that changes occasionally but must load fast and be SEO-friendly.

**Avoid when:** Content must be real-time accurate per request (user-specific data), or content never changes (use plain SSG).

---

## 7. Client-Side Rendering (CSR) — Dynamic, Interactive UIs

### What It Does

The server sends a static HTML shell, and JavaScript fetches data in the browser after load. No server compute per request beyond serving the initial HTML.

### App Router — `"use client"` directive

```tsx
// app/components/LiveStockTicker.tsx
"use client"; // ← Marks this as a Client Component

import { useState, useEffect } from "react";

interface Stock {
  symbol: string;
  price: number;
  change: number;
}

export default function LiveStockTicker() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStocks() {
      const res = await fetch("/api/stocks");
      const data = await res.json();
      setStocks(data);
      setLoading(false);
    }

    fetchStocks();
    const interval = setInterval(fetchStocks, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="skeleton">Loading prices...</div>;

  return (
    <div className="ticker">
      {stocks.map((stock) => (
        <div key={stock.symbol} className="stock-item">
          <span className="symbol">{stock.symbol}</span>
          <span className="price">${stock.price.toFixed(2)}</span>
          <span className={stock.change >= 0 ? "up" : "down"}>
            {stock.change >= 0 ? "▲" : "▼"} {Math.abs(stock.change)}%
          </span>
        </div>
      ))}
    </div>
  );
}
```

### CSR with SWR (recommended for client-side data fetching)

```tsx
// app/components/UserActivity.tsx
"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function UserActivity({ userId }: { userId: string }) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/users/${userId}/activity`,
    fetcher,
    {
      refreshInterval: 30_000, // auto-refresh every 30 seconds
      revalidateOnFocus: true,  // refresh when user returns to tab
    }
  );

  if (isLoading) return <ActivitySkeleton />;
  if (error) return <p>Failed to load activity.</p>;

  return (
    <div>
      <h2>Recent Activity</h2>
      {data.activities.map((activity: any) => (
        <ActivityItem key={activity.id} {...activity} />
      ))}
      <button onClick={() => mutate()}>Refresh</button>
    </div>
  );
}
```

### When to Use CSR

**Perfect for:** Real-time data (stock prices, live scores), highly interactive UIs (dashboards, drag-and-drop), user-specific data after login, infinite scroll / pagination.

**Avoid for:** Content that needs SEO, initial page load performance is critical, or the data could be fetched on the server instead.

---

## 8. Partial Prerendering (PPR) — The Newest Strategy (Next.js 14+)

### What It Does

PPR lets a **single page** have a **static shell** (built at build time) and **dynamic holes** that fill in at request time. The user gets immediate static content with a streaming placeholder, then dynamic content pops in.

```
                        ┌─────────────────────────────────┐
   Static (build time)  │  Header, Nav, Layout, Hero       │
                        │  ┌─────────────────────────────┐ │
   Dynamic (request)    │  │ <Suspense fallback={...}>    │ │
                        │  │   Personalized recommendations│ │
                        │  │   Cart count                  │ │
                        │  └─────────────────────────────┘ │
                        └─────────────────────────────────┘
```

### Setup

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true, // Enable Partial Prerendering
  },
};

module.exports = nextConfig;
```

```tsx
// app/page.tsx

import { Suspense } from "react";
import { cookies } from "next/headers";

// This component is STATIC — built at build time
function StaticHero() {
  return (
    <section className="hero">
      <h1>Welcome to Our Store</h1>
      <p>Discover thousands of products</p>
    </section>
  );
}

// This component is DYNAMIC — runs at request time
async function PersonalizedRecommendations() {
  const cookieStore = cookies(); // dynamic function → dynamic component
  const userId = cookieStore.get("user_id")?.value;

  const recommendations = await fetch(
    `https://api.example.com/recommendations?user=${userId}`,
    { cache: "no-store" }
  ).then((r) => r.json());

  return (
    <section>
      <h2>Recommended for You</h2>
      <ProductGrid products={recommendations} />
    </section>
  );
}

// The PAGE mixes static and dynamic with Suspense boundaries
export default function HomePage() {
  return (
    <main>
      {/* Static — served instantly from CDN */}
      <StaticHero />
      <FeaturedCategories />

      {/* Dynamic — streams in after the static shell */}
      <Suspense fallback={<RecommendationsSkeleton />}>
        <PersonalizedRecommendations />
      </Suspense>

      {/* Static again */}
      <NewsletterSignup />
    </main>
  );
}
```

### When to Use PPR

**Perfect for:** E-commerce home pages (static layout + personalized content), news sites (static articles + dynamic comments/reactions), SaaS dashboards (static sidebar + dynamic data widgets).

**Current status:** Still experimental as of Next.js 14 — stabilizing in Next.js 15.

---

## 9. Streaming with React Suspense

Streaming lets the server send HTML **in chunks** as components resolve — the user sees content progressively instead of waiting for the slowest component.

```tsx
// app/dashboard/page.tsx

import { Suspense } from "react";

// Each of these fetches independently
async function RevenueChart() {
  const data = await fetch("https://api.example.com/revenue", {
    cache: "no-store",
  }).then((r) => r.json());
  return <Chart data={data} />;
}

async function RecentOrders() {
  const orders = await fetch("https://api.example.com/orders/recent", {
    cache: "no-store",
  }).then((r) => r.json());
  return <OrderTable orders={orders} />;
}

async function TopProducts() {
  const products = await fetch("https://api.example.com/products/top", {
    cache: "no-store",
  }).then((r) => r.json());
  return <ProductList products={products} />;
}

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Each section streams in independently */}
      {/* The user sees each section as soon as it's ready */}
      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <RecentOrders />
      </Suspense>

      <Suspense fallback={<ListSkeleton />}>
        <TopProducts />
      </Suspense>
    </div>
  );
}
```

Without Suspense: user waits for ALL three fetches (e.g., 300ms + 200ms + 500ms = waits 500ms for nothing).
With Suspense + Streaming: each section appears as soon as it's ready — RecentOrders shows at 200ms, RevenueChart at 300ms, TopProducts at 500ms.

---

## 10. Real-World Architecture: E-Commerce App

Here's how a real e-commerce app would combine all strategies:

```
app/
├── page.tsx                    ← PPR (static layout + dynamic cart/recommendations)
├── products/
│   ├── page.tsx                ← ISR revalidate:3600 (product listings)
│   └── [slug]/
│       └── page.tsx            ← ISR revalidate:300 (product details + live inventory CSR)
├── search/
│   └── page.tsx                ← SSR (search results depend on query params)
├── dashboard/
│   └── page.tsx                ← SSR (authenticated, user-specific)
├── blog/
│   ├── page.tsx                ← SSG (rarely changes)
│   └── [slug]/
│       └── page.tsx            ← SSG + on-demand revalidation from CMS webhook
└── components/
    ├── CartCount.tsx           ← CSR (real-time, user-specific)
    ├── LiveInventory.tsx       ← CSR (real-time stock levels)
    └── RecentlyViewed.tsx      ← CSR (browser localStorage)
```

```tsx
// app/products/[slug]/page.tsx
// ISR for product details + CSR island for live inventory

import { Suspense } from "react";
import LiveInventory from "@/components/LiveInventory"; // client component

export async function generateStaticParams() {
  const products = await fetch("https://api.example.com/products").then((r) =>
    r.json()
  );
  return products.map((p: { slug: string }) => ({ slug: p.slug }));
}

async function getProduct(slug: string) {
  return fetch(`https://api.example.com/products/${slug}`, {
    next: { revalidate: 300 }, // ISR: rebuild every 5 minutes
  }).then((r) => r.json());
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  return (
    <div>
      {/* Static content from ISR */}
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>

      {/* Live inventory — CSR island inside static page */}
      <Suspense fallback={<p>Checking availability...</p>}>
        <LiveInventory productId={product.id} />
      </Suspense>

      <AddToCartButton productId={product.id} />
    </div>
  );
}
```

```tsx
// app/components/LiveInventory.tsx
"use client";

import { useState, useEffect } from "react";

export default function LiveInventory({ productId }: { productId: string }) {
  const [stock, setStock] = useState<number | null>(null);

  useEffect(() => {
    const fetchStock = async () => {
      const res = await fetch(`/api/inventory/${productId}`);
      const data = await res.json();
      setStock(data.quantity);
    };

    fetchStock();
    const interval = setInterval(fetchStock, 15_000);
    return () => clearInterval(interval);
  }, [productId]);

  if (stock === null) return null;
  if (stock === 0) return <p className="out-of-stock">Out of Stock</p>;
  if (stock < 5) return <p className="low-stock">Only {stock} left!</p>;
  return <p className="in-stock">In Stock</p>;
}
```

---

## 11. Metadata & SEO Per Strategy

```tsx
// SSG / ISR — generateMetadata runs at build time
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await fetch(`https://api.example.com/products/${params.slug}`, {
    next: { revalidate: 3600 },
  }).then((r) => r.json());

  return {
    title: `${product.name} | My Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

// SSR — generateMetadata runs at request time
export async function generateMetadata({ searchParams }: { searchParams: { q: string } }) {
  return {
    title: `Search: ${searchParams.q} | My Store`,
    robots: { index: false }, // Don't index search result pages
  };
}
```

---

## 12. Choosing the Right Strategy — Decision Tree

```
Is the content the same for every user?
├── YES → Does it change?
│   ├── NEVER / RARELY  → SSG (docs, marketing pages)
│   ├── OCCASIONALLY    → ISR with revalidate interval
│   └── ON CONTENT UPDATE → ISR with on-demand revalidation
└── NO → Is it personalized per user?
    ├── YES → Is it needed for SEO?
    │   ├── YES → SSR (personalized + indexed, like search)
    │   └── NO  → CSR (dashboard, account pages)
    └── PARTIALLY → PPR (static shell + dynamic islands)
```

---

## 13. Performance Comparison

| Strategy | TTFB | First Paint | SEO | Server Load | CDN Cacheable |
|---|---|---|---|---|---|
| SSG | ⚡ ~50ms | ⚡ Instant | ✅ Full | None | ✅ Yes |
| ISR | ⚡ ~50ms | ⚡ Instant | ✅ Full | Minimal | ✅ Yes |
| SSR | 🐢 100–500ms | Moderate | ✅ Full | High | ❌ No (private) |
| CSR | ⚡ ~50ms | 🐢 After JS | ❌ None | None | ✅ Shell only |
| PPR | ⚡ ~50ms | ⚡ Shell instant | ✅ Full | Low (streaming) | ✅ Shell only |
| Streaming | ⚡ ~50ms | ⚡ Progressive | ✅ Full | Moderate | ❌ Dynamic |

---

## 14. Quick Reference Cheatsheet

### Pages Router

```tsx
// SSG — runs at build time
export async function getStaticProps() {
  return { props: { data }, revalidate: 60 }; // add revalidate for ISR
}

// SSG dynamic routes
export async function getStaticPaths() {
  return { paths: [...], fallback: "blocking" };
}

// SSR — runs on every request
export async function getServerSideProps(context) {
  const { req, res, query, params } = context;
  return { props: { data } };
}
```

### App Router

```tsx
// SSG (default) — cache forever
fetch(url, { cache: "force-cache" });

// ISR — revalidate every N seconds
fetch(url, { next: { revalidate: 60 } });

// ISR with tags — revalidate by tag
fetch(url, { next: { tags: ["products"] } });
revalidateTag("products"); // in route handler

// SSR — never cache
fetch(url, { cache: "no-store" });

// SSR — also triggered by using:
import { cookies, headers } from "next/headers"; // dynamic functions
// or accessing searchParams in a page

// CSR — Client Component
"use client";
import { useState, useEffect } from "react";

// Streaming — wrap slow components
<Suspense fallback={<Skeleton />}>
  <SlowComponent />
</Suspense>

// On-demand revalidation
import { revalidatePath, revalidateTag } from "next/cache";
revalidatePath("/blog/my-post");
revalidateTag("posts");
```

---

## Summary

Next.js rendering strategies aren't competing options — they're **tools in a toolbox**, and mature apps use all of them together:

- **SSG** → your default. Fast, cheap, great SEO. Use it until you have a reason not to.
- **ISR** → SSG that stays fresh. Perfect for content that changes but not on every request.
- **SSR** → when you need request-time data (auth, personalization, search).
- **CSR** → for interactivity, real-time updates, and user-specific browser state.
- **PPR** → the future — static performance with dynamic personalization in one page.
- **Streaming** → make SSR and SSR-heavy pages feel faster by sending HTML progressively.

The skill is knowing which tool fits which problem — and Next.js is uniquely powerful because it lets you mix them freely, even within a single page.