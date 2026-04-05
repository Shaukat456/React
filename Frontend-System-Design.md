# 🖥️ Frontend System Design Mastery

## From Scratch to Advanced — Job-Ready Course

> A complete, lesson-by-lesson guide covering everything you need to ace frontend system design interviews and build production-grade applications.

---

## 📚 Course Overview

| Property            | Details                                                                   |
| ------------------- | ------------------------------------------------------------------------- |
| **Level**           | Beginner → Advanced                                                       |
| **Target Audience** | Frontend Engineers (0–8 yrs), Full-Stack Developers, Interview Candidates |
| **Outcome**         | Job-ready Frontend System Design skills                                   |
| **Lessons**         | 20 structured lessons                                                     |
| **Includes**        | Interview Q&A, Case Studies, Diagrams, Real-world Examples                |

---

## 🗂️ Table of Contents

1. [Lesson 01 — What is Frontend System Design?](#lesson-01)
2. [Lesson 02 — Gathering Requirements](#lesson-02)
3. [Lesson 03 — High-Level Architecture](#lesson-03)
4. [Lesson 04 — Component Design & UI Architecture](#lesson-04)
5. [Lesson 05 — State Management at Scale](#lesson-05)
6. [Lesson 06 — Networking, APIs & Data Fetching](#lesson-06)
7. [Lesson 07 — Performance Optimization](#lesson-07)
8. [Lesson 08 — Rendering Strategies (CSR, SSR, SSG, ISR)](#lesson-08)
9. [Lesson 09 — Caching Strategies](#lesson-09)
10. [Lesson 10 — Scalable CSS Architecture](#lesson-10)
11. [Lesson 11 — Design Systems & Component Libraries](#lesson-11)
12. [Lesson 12 — Accessibility (a11y) at Scale](#lesson-12)
13. [Lesson 13 — Security in Frontend Systems](#lesson-13)
14. [Lesson 14 — Real-Time Systems (WebSockets, SSE)](#lesson-14)
15. [Lesson 15 — Micro-Frontends Architecture](#lesson-15)
16. [Lesson 16 — Monorepo & Build Systems](#lesson-16)
17. [Lesson 17 — Testing Strategy for Large-Scale Frontend](#lesson-17)
18. [Lesson 18 — Observability, Logging & Monitoring](#lesson-18)
19. [Lesson 19 — CI/CD for Frontend Applications](#lesson-19)
20. [Lesson 20 — Putting It All Together — Mock System Design Interview](#lesson-20)

---

<a name="lesson-01"></a>

## Lesson 01 — What is Frontend System Design?

### 🎯 Learning Objectives

- Understand what distinguishes frontend system design from backend system design
- Learn the structure of a frontend system design interview
- Know how to approach open-ended design problems

---

### 📖 Core Concepts

Frontend System Design is the practice of **architecting large-scale user interfaces** — making decisions about component structure, state management, data flow, performance, scalability, and developer experience.

Unlike backend system design (which focuses on servers, databases, and APIs), frontend system design focuses on:

| Concern             | Examples                                 |
| ------------------- | ---------------------------------------- |
| **UI Architecture** | Component hierarchy, design systems      |
| **Data Flow**       | State management, prop drilling, context |
| **Performance**     | Bundle size, lazy loading, rendering     |
| **Network**         | REST vs GraphQL, caching, real-time      |
| **Scalability**     | Micro-frontends, monorepos               |
| **DX**              | Build tools, testing, CI/CD              |

---

### 🏗️ The RADIO Framework (Interview Structure)

Use **RADIO** to structure your system design answers:

```
R — Requirements Clarification
A — Architecture / High-Level Design
D — Data Model
I — Interface Definition (API contracts, component APIs)
O — Optimization & Edge Cases
```

**Example walkthrough:** "Design a Twitter Feed"

```
R → How many users? Real-time updates? Infinite scroll?
A → Feed component tree, data fetching layer, virtual scroll
D → Tweet model: {id, content, author, media[], likes, timestamp}
I → useFeed(userId), <TweetCard />, <FeedList />
O → Skeleton loading, offline support, accessibility
```

---

### 📋 Interview Question Bank

**Q1: What is Frontend System Design and how is it different from Backend System Design?**

> **Answer:** Frontend System Design focuses on building scalable, performant, and maintainable UI systems. It covers component architecture, state management, rendering strategies, bundling, and user experience concerns. Backend system design focuses on servers, databases, load balancing, and distributed systems. Frontend design deals with the client side — how data is displayed, managed, and how the interface scales with users and features.

---

**Q2: How do you approach an open-ended frontend design question?**

> **Answer:** I use a structured framework like RADIO:
>
> 1. **Clarify requirements** — functional (what it does) vs non-functional (performance, scale)
> 2. **Sketch high-level architecture** — components, data flow, external services
> 3. **Define data models** — what data lives where and in what shape
> 4. **Define component APIs** — props, hooks, events
> 5. **Discuss optimizations** — lazy loading, caching, error boundaries

---

**Q3: What are non-functional requirements in frontend?**

> **Answer:** Non-functional requirements include:
>
> - **Performance:** Time to First Byte (TTFB), Largest Contentful Paint (LCP)
> - **Scalability:** Can the app handle 10M users with the same architecture?
> - **Accessibility:** WCAG AA compliance
> - **Reliability:** Error boundaries, graceful degradation
> - **Security:** XSS prevention, CSP headers
> - **Maintainability:** Code splitting, documentation, testing coverage

---

### 🧪 Case Study: Designing Instagram Feed (High-Level)

**Problem:** Design the Instagram Home Feed UI System

**Step 1 — Requirements**

- Functional: Show posts from followed accounts, like/comment, infinite scroll, stories row
- Non-Functional: Load in under 2s, smooth 60fps scroll, offline graceful degradation

**Step 2 — Architecture Sketch**

```
App
├── StoriesBar
│   └── StoryCircle[]
├── FeedContainer
│   ├── FeedHeader
│   ├── PostCard[] (virtualized)
│   │   ├── PostHeader (avatar, username, location)
│   │   ├── PostMedia (image/video)
│   │   ├── PostActions (like, comment, share, save)
│   │   └── PostComments
│   └── InfiniteScrollTrigger
└── BottomNav
```

**Step 3 — Key Decisions**

- Use **virtual scrolling** (react-window) for performance
- **Optimistic UI** for likes
- **Image lazy loading** with IntersectionObserver
- **Service Worker** for offline caching

---

<a name="lesson-02"></a>

## Lesson 02 — Gathering Requirements

### 🎯 Learning Objectives

- Learn to ask the right clarifying questions
- Distinguish functional vs non-functional requirements
- Scope a frontend problem effectively

---

### 📖 Core Concepts

In interviews and real projects, **requirement gathering is the foundation**. Poor requirements lead to over-engineering or under-engineering.

#### Functional Requirements

What the system **must do** from the user's perspective.

```
✅ Users can search for products
✅ Users can add items to a cart
✅ Admin can see analytics dashboard
```

#### Non-Functional Requirements

How the system **performs and scales**.

```
⚡ Page loads in < 2 seconds on 3G
🌍 Supports 10 million concurrent users
♿ WCAG 2.1 AA accessible
🔒 No XSS vulnerabilities
📱 Mobile-first responsive design
```

---

### ❓ The Question Checklist (Use in Interviews)

```markdown
## User & Scale

- Who are the primary users? (consumers, enterprises, admins?)
- How many concurrent users are expected?
- What devices/browsers must be supported?

## Features & Scope

- What are the core features (MVP)?
- What can be deferred to v2?
- Are there real-time requirements? (notifications, live chat)

## Performance

- What are the latency expectations?
- Do we need offline support?
- Are there specific Core Web Vitals targets?

## Data

- What APIs are available? (REST, GraphQL, gRPC)
- Who owns the data model?
- Are there pagination/infinite scroll requirements?

## Constraints

- What tech stack are we limited to?
- Are there existing design system / component library constraints?
- Any compliance or security requirements? (GDPR, SOC2)
```

---

### 📋 Interview Question Bank

**Q1: How do you scope a frontend system design problem in 5 minutes?**

> **Answer:** I start by identifying: (1) the core user journey — what is the ONE thing users need to do? (2) the primary data entities involved, (3) performance expectations, and (4) whether it's read-heavy or write-heavy. With that, I can sketch an architecture that addresses 80% of the problem and optimize from there.

---

**Q2: What questions would you ask before designing a dashboard?**

> **Answer:**
>
> - How many widgets/charts are there and what data do they display?
> - Is the data real-time or periodic (e.g., refresh every 5 min)?
> - Can users customize/rearrange widgets?
> - How many concurrent users view this dashboard?
> - Are there role-based views (admin vs viewer)?
> - What are the performance targets? (Initial load, chart render time)

---

**Q3: How do you handle conflicting requirements?**

> **Answer:** I surface the conflict early and ask the stakeholder/interviewer to prioritize. For example, "offline support" and "real-time data" conflict. I'd explain the trade-off: offline means we cache data, which may be stale; real-time means we need a live connection. I'd document both options, recommend one based on user needs, and confirm before proceeding.

---

### 🧪 Case Study: Requirements Gathering for a Collaborative Docs App (Google Docs Clone)

**Scenario:** "Design a real-time collaborative document editor"

#### Requirement Gathering Session:

| Question                        | Answer Assumed              |
| ------------------------------- | --------------------------- |
| Max simultaneous editors?       | Up to 50 per doc            |
| Offline support?                | Yes, sync when reconnected  |
| Media in docs (images, tables)? | Yes                         |
| Version history?                | Yes, last 30 days           |
| Mobile support?                 | Read-only on mobile         |
| Auth & permissions?             | Owner, Editor, Viewer roles |

#### Resulting Priority List:

1. **P0 (Must):** Real-time text sync, cursor presence, basic formatting
2. **P1 (Should):** Version history, comments, image embeds
3. **P2 (Nice):** Offline editing, mobile editor, AI suggestions

---

<a name="lesson-03"></a>

## Lesson 03 — High-Level Architecture

### 🎯 Learning Objectives

- Design the macro-architecture of a frontend application
- Understand client-server interaction patterns
- Learn to draw architecture diagrams for interviews

---

### 📖 Core Concepts

#### The Frontend Architecture Stack

```
┌──────────────────────────────────────────────┐
│                  Browser/Client               │
│  ┌──────────────────────────────────────┐    │
│  │        Presentation Layer             │    │
│  │   (React/Vue/Angular Components)      │    │
│  ├──────────────────────────────────────┤    │
│  │        State Management Layer         │    │
│  │   (Redux/Zustand/Jotai/React Query)   │    │
│  ├──────────────────────────────────────┤    │
│  │        Service / API Layer            │    │
│  │   (Axios, fetch, GraphQL client)      │    │
│  ├──────────────────────────────────────┤    │
│  │        Routing Layer                  │    │
│  │   (React Router, Next.js Router)      │    │
│  └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
           ↕ HTTP / WebSocket / gRPC
┌──────────────────────────────────────────────┐
│                  Backend Services             │
│  ┌─────────┐  ┌──────────┐  ┌─────────────┐ │
│  │   API   │  │   CDN    │  │  WebSocket  │ │
│  │ Gateway │  │  (Assets)│  │   Server    │ │
│  └─────────┘  └──────────┘  └─────────────┘ │
└──────────────────────────────────────────────┘
```

#### Key Architectural Patterns

**1. Layered Architecture**
Separates concerns: UI → State → API → Network

**2. Feature-Sliced Design (FSD)**
Organizes code by feature domains, not technical role:

```
src/
├── app/           # App init, providers, router
├── pages/         # Route-level components
├── widgets/       # Composite UI blocks
├── features/      # User interactions (auth, search)
├── entities/      # Business objects (User, Product)
└── shared/        # Reusable utils, UI kit, API
```

**3. Flux / Unidirectional Data Flow**

```
Action → Dispatcher → Store → View → Action (cycle)
```

---

### 📋 Interview Question Bank

**Q1: How do you structure a large-scale React application?**

> **Answer:** I use Feature-Sliced Design or a domain-driven folder structure. The key principle is: **co-locate things that change together**. Each feature has its own components, hooks, API calls, and types. Shared utilities live in a `shared/` directory. This prevents cross-feature coupling and makes it easy to delete or refactor features in isolation.

---

**Q2: What is the difference between monolithic frontend and micro-frontend architecture?**

> **Answer:** A monolithic frontend is a single deployable app managing all UI. A micro-frontend breaks the UI into independently deployable units owned by different teams. Monolith is simpler for small teams; micro-frontends shine at scale (multiple teams, different release cycles). The trade-off: micro-frontends add complexity in routing, shared state, and bundle duplication.

---

**Q3: How does a CDN fit into frontend architecture?**

> **Answer:** A CDN serves static assets (JS, CSS, images, fonts) from edge nodes geographically close to users, reducing latency. In frontend architecture, the build output is uploaded to a CDN (e.g., CloudFront, Vercel Edge, Fastly). API requests still go to origin servers. CDNs also handle HTTP/2, Brotli compression, and cache-control headers, significantly improving Time to First Byte for static assets.

---

### 🧪 Case Study: Architecture for an E-Commerce Platform (Shopify-scale)

**Problem:** Design the frontend architecture for a high-traffic e-commerce platform

#### Architecture Decision:

```
┌─────────────────────────────────────────┐
│          Next.js Application            │
│                                         │
│  /                 → SSG (Homepage)     │
│  /products         → ISR (Catalog)      │
│  /products/[slug]  → ISR (PDP)          │
│  /cart             → CSR (Dynamic)      │
│  /checkout         → SSR (Secure)       │
│  /account          → CSR (Private)      │
└─────────────────────────────────────────┘
           ↕
┌──────────────────────────────────────────┐
│           API Layer                       │
│  Product API    → REST (Paginated)        │
│  Cart API       → REST + Optimistic UI   │
│  Search API     → Algolia / Elasticsearch │
│  Auth API       → NextAuth.js             │
│  CMS            → Contentful / Sanity     │
└──────────────────────────────────────────┘
```

**Key Decisions & Rationale:**

| Decision                  | Rationale                                                                       |
| ------------------------- | ------------------------------------------------------------------------------- |
| Next.js with ISR for PDPs | Products change infrequently; ISR allows stale-while-revalidate for performance |
| CSR for Cart              | Cart is user-specific, cannot be cached at CDN                                  |
| SSR for Checkout          | Security-sensitive; needs server validation on each request                     |
| Algolia for Search        | Sub-100ms search with typo tolerance out of the box                             |
| Optimistic UI for cart    | Perceived performance; rollback on error                                        |

---

<a name="lesson-04"></a>

## Lesson 04 — Component Design & UI Architecture

### 🎯 Learning Objectives

- Design scalable component hierarchies
- Understand component composition patterns
- Apply the Single Responsibility Principle to UI

---

### 📖 Core Concepts

#### Component Hierarchy Levels

```
Level 1: Atoms       → Button, Input, Icon, Badge
Level 2: Molecules   → SearchBar, FormField, Card
Level 3: Organisms   → Header, ProductGrid, Sidebar
Level 4: Templates   → PageLayout, DashboardLayout
Level 5: Pages       → HomePage, ProductPage, CheckoutPage
```

_(Adapted from Atomic Design by Brad Frost)_

---

#### Key Component Patterns

**1. Compound Components**

```jsx
// Usage:
<Select>
  <Select.Trigger>Choose an option</Select.Trigger>
  <Select.Menu>
    <Select.Item value="a">Option A</Select.Item>
    <Select.Item value="b">Option B</Select.Item>
  </Select.Menu>
</Select>
```

✅ Flexible, declarative, no prop drilling

---

**2. Render Props**

```jsx
<DataFetcher url="/api/users">
  {({ data, loading, error }) =>
    loading ? <Spinner /> : <UserList users={data} />
  }
</DataFetcher>
```

✅ Separates data logic from rendering logic

---

**3. Container / Presentational Split**

```
UserProfileContainer  (fetches data, manages state)
└── UserProfileCard   (pure UI, receives props)
```

✅ Testability — pure components are easy to unit test

---

**4. Headless Components (Radix UI, Headless UI)**
Logic-only components with no styles — you bring the UI:

```jsx
<Dialog.Root>
  <Dialog.Trigger className="my-btn">Open</Dialog.Trigger>
  <Dialog.Content className="my-modal">
    {/* Your custom styled content */}
  </Dialog.Content>
</Dialog.Root>
```

✅ Full design freedom + built-in accessibility

---

#### Component API Design Principles

```tsx
// ❌ Poor API — too many boolean props
<Button primary large rounded disabled loading />

// ✅ Good API — composable variants
<Button
  variant="primary"     // "primary" | "secondary" | "ghost"
  size="lg"             // "sm" | "md" | "lg"
  isLoading={false}
  leftIcon={<SearchIcon />}
>
  Search
</Button>
```

---

### 📋 Interview Question Bank

**Q1: How do you decide when to split a component?**

> **Answer:** I apply the Single Responsibility Principle: if a component does more than one thing — renders a list AND fetches data AND handles pagination — it should be split. I also split when: (1) a part of the component is reused elsewhere, (2) the component exceeds ~200 lines, (3) different parts re-render at different rates (performance split). The goal is components that are easy to understand, test, and replace.

---

**Q2: What are the trade-offs of compound components vs prop-based components?**

> **Answer:** Prop-based components are simpler and have explicit APIs, but become unwieldy with many configuration options ("prop explosion"). Compound components offer composability and flexibility at the cost of implicit context coupling — children must be used inside the parent. Compound components shine for complex UI patterns like dropdowns, tabs, accordions, and date pickers.

---

**Q3: How do you prevent prop drilling in large component trees?**

> **Answer:** Several approaches:
>
> 1. **React Context** — for global/section-level state (theme, auth, locale)
> 2. **Component composition** — pass components as children instead of data
> 3. **State management libraries** — Zustand, Redux for cross-cutting state
> 4. **URL state** — filter/sort state lives in the URL, readable from anywhere
> 5. **Compound components** — implicit context via Context API internally

---

### 🧪 Case Study: Designing a Reusable Data Table Component

**Problem:** Design a `<DataTable />` component for an admin panel that:

- Handles sorting, filtering, pagination
- Supports custom cell renderers
- Works with both local and server-side data

**API Design:**

```tsx
<DataTable
  columns={[
    { key: "name", header: "Name", sortable: true },
    { key: "status", header: "Status", render: (val) => <Badge>{val}</Badge> },
    {
      key: "actions",
      header: "",
      render: (_, row) => <ActionMenu row={row} />,
    },
  ]}
  data={users}
  pagination={{ pageSize: 25, total: 1200, onPageChange: handlePage }}
  sorting={{ field: "name", order: "asc", onChange: handleSort }}
  loading={isLoading}
  emptyState={<EmptyUsers />}
/>
```

**Internal Architecture:**

```
DataTable
├── TableHeader
│   └── HeaderCell (sortable, filterable)
├── TableBody
│   └── TableRow[]
│       └── TableCell[] (custom renderers)
├── TablePagination
└── TableSkeleton (loading state)
```

**Key decisions:**

- Columns config drives everything — no hardcoded layout
- Custom `render` functions make cells extensible without touching DataTable
- Controlled pagination — parent owns page state (server-side friendly)
- `loading` prop swaps body with skeleton rows (same number as pageSize)

---

<a name="lesson-05"></a>

## Lesson 05 — State Management at Scale

### 🎯 Learning Objectives

- Categorize different types of frontend state
- Choose the right state management solution for the problem
- Avoid common state management anti-patterns

---

### 📖 Core Concepts

#### Types of State

| Type                | Description                      | Tool                            |
| ------------------- | -------------------------------- | ------------------------------- |
| **Server State**    | Data from APIs (async, cached)   | React Query, SWR, Apollo        |
| **Global UI State** | Theme, sidebar open, user prefs  | Zustand, Redux, Context         |
| **Local UI State**  | Modal open, form inputs, hover   | useState, useReducer            |
| **URL State**       | Filters, search, pagination      | URLSearchParams, Next.js router |
| **Form State**      | Validation, dirty fields, submit | React Hook Form, Formik         |

---

#### State Management Decision Tree

```
Is it server data? (from an API)
  └─ YES → Use React Query / SWR
           (handles caching, loading, error, refetch automatically)
  └─ NO → Is it needed across many components?
             └─ YES → Is it complex with many actions?
                        └─ YES → Redux Toolkit
                        └─ NO  → Zustand / Jotai / Context
             └─ NO → useState / useReducer (keep it local)
```

---

#### React Query — The Gold Standard for Server State

```tsx
// Define a query
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ["users", { page, search }],
  queryFn: () => fetchUsers({ page, search }),
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes
});

// Mutations with optimistic updates
const mutation = useMutation({
  mutationFn: updateUser,
  onMutate: async (newUser) => {
    await queryClient.cancelQueries(["users"]);
    const previous = queryClient.getQueryData(["users"]);
    queryClient.setQueryData(["users"], (old) =>
      old.map((u) => (u.id === newUser.id ? newUser : u)),
    );
    return { previous }; // rollback context
  },
  onError: (err, newUser, context) => {
    queryClient.setQueryData(["users"], context.previous);
  },
  onSettled: () => queryClient.invalidateQueries(["users"]),
});
```

---

#### Zustand — Minimal Global State

```tsx
// store.ts
const useStore = create<AppState>((set) => ({
  theme: "light",
  sidebarOpen: false,
  user: null,
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setUser: (user) => set({ user }),
}));

// Component usage
const { theme, setTheme } = useStore();
```

---

### 📋 Interview Question Bank

**Q1: Why should server state and client state be managed separately?**

> **Answer:** Server state has unique characteristics: it's async, can be stale, shared with other clients, and needs caching/deduplication. Libraries like React Query handle these concerns automatically (background refetching, cache invalidation, deduplication of network requests). Mixing server state into Redux/Zustand leads to boilerplate for loading, error, caching states that React Query handles out of the box. Separating them keeps each tool focused on what it does best.

---

**Q2: When would you use Redux over Zustand?**

> **Answer:** Redux is preferable when: (1) you need time-travel debugging and strong DevTools, (2) the team is large and needs strict unidirectional data flow enforcement, (3) you have complex state machines with many interdependent actions (Redux Toolkit's `createSlice` + middleware). Zustand wins for smaller to medium apps — it's simpler, has less boilerplate, and handles most global UI state needs without ceremony.

---

**Q3: How do you prevent stale closures in event handlers with state?**

> **Answer:** Stale closures happen when a closure captures a state value at creation time, not at call time. Solutions:
>
> 1. Use functional updates: `setState(prev => prev + 1)` instead of `setState(count + 1)`
> 2. Use `useRef` for values needed in callbacks without re-subscribing
> 3. Use `useCallback` with correct dependencies
> 4. In React Query, use `queryClient.getQueryData()` inside mutations rather than closed-over state

---

### 🧪 Case Study: State Architecture for a Real-time Chat App

**Problem:** Design state management for a Slack-like chat application

**State Classification:**

```
Server State (React Query / WebSocket):
  - Messages per channel (paginated, real-time)
  - Channel list
  - User profiles

Global UI State (Zustand):
  - Active workspace ID
  - Active channel ID
  - Sidebar collapsed
  - Notification preferences
  - Unread counts per channel

Local UI State (useState):
  - Message compose input
  - Emoji picker open
  - Reply thread open
  - Message hover actions visible

URL State (Router):
  - /workspace/:workspaceId/channel/:channelId
```

**Real-time Integration:**

```tsx
// Merge WebSocket updates into React Query cache
useEffect(() => {
  const ws = new WebSocket(`wss://api.slack.com/ws`);
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    queryClient.setQueryData(["messages", message.channelId], (old) => ({
      ...old,
      pages: appendMessage(old.pages, message),
    }));
    // Increment unread count in Zustand
    useStore.getState().incrementUnread(message.channelId);
  };
  return () => ws.close();
}, [channelId]);
```

---

<a name="lesson-06"></a>

## Lesson 06 — Networking, APIs & Data Fetching

### 🎯 Learning Objectives

- Design the API layer for a frontend application
- Understand REST vs GraphQL trade-offs
- Handle loading, error, and empty states gracefully

---

### 📖 Core Concepts

#### REST vs GraphQL vs tRPC

| Feature        | REST                | GraphQL             | tRPC                    |
| -------------- | ------------------- | ------------------- | ----------------------- |
| Over-fetching  | Common              | Eliminated          | Eliminated              |
| Type Safety    | Manual              | Schema-based        | End-to-end (TypeScript) |
| Caching        | Easy (HTTP cache)   | Complex             | React Query based       |
| Learning curve | Low                 | Medium              | Low (for TS teams)      |
| Best for       | Public APIs, simple | Complex data graphs | Full-stack TS teams     |

---

#### API Layer Architecture

```
src/
├── api/
│   ├── client.ts        # Axios instance with interceptors
│   ├── endpoints.ts     # URL constants
│   ├── users.api.ts     # User-related API functions
│   ├── products.api.ts  # Product-related API functions
│   └── types.ts         # API response types
├── hooks/
│   ├── useUsers.ts      # React Query hooks wrapping API
│   └── useProducts.ts
```

**Axios Client with Interceptors:**

```tsx
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor — attach auth token
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — handle 401, format errors
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      await refreshToken();
      return apiClient.request(error.config);
    }
    return Promise.reject(formatError(error));
  },
);
```

---

#### Loading / Error / Empty State Pattern

```tsx
function UserList() {
  const { data, isLoading, isError, error } = useUsers();

  if (isLoading) return <UserListSkeleton count={5} />;
  if (isError) return <ErrorState message={error.message} onRetry={refetch} />;
  if (!data?.length)
    return <EmptyState icon={<UsersIcon />} message="No users found" />;

  return (
    <ul>
      {data.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </ul>
  );
}
```

---

### 📋 Interview Question Bank

**Q1: How do you handle API errors gracefully in a large application?**

> **Answer:** I use a multi-layer approach:
>
> 1. **Network layer** — Axios interceptors catch 4xx/5xx and normalize error shapes
> 2. **Query layer** — React Query's `onError` callback logs and notifies
> 3. **Component layer** — `isError` state renders user-facing error UI with retry
> 4. **Boundary layer** — React Error Boundaries catch rendering errors
> 5. **Global layer** — Toast notifications for non-blocking errors (form submissions)
>
> I also distinguish between recoverable (retry button) and unrecoverable (navigate to error page) errors.

---

**Q2: What is the N+1 problem and how do you solve it on the frontend?**

> **Answer:** The N+1 problem is making 1 request to get a list, then N more requests to fetch details for each item. On the frontend, solutions include:
>
> 1. **Ask the backend for nested data** — include related data in a single response
> 2. **GraphQL** — request exactly what you need in one query, including nested relations
> 3. **Batch requests** — `Promise.all()` for parallel requests; or API endpoints that accept arrays of IDs
> 4. **React Query's `useQueries`** — parallel queries with shared cache management

---

**Q3: How do you implement request deduplication?**

> **Answer:** React Query automatically deduplicates requests with the same `queryKey` — if two components mount simultaneously and both call `useQuery(['users'])`, only one HTTP request fires. For custom implementations, I use a request map (in-flight promises keyed by URL) so identical concurrent requests share the same promise. Axios adapters can also be used for deduplication at the HTTP level.

---

### 🧪 Case Study: GraphQL Client Architecture for a Social Platform

**Problem:** Design the data fetching layer for a Facebook-like social platform

**Decision: GraphQL with Apollo Client**

**Schema-aligned Query Design:**

```graphql
query GetFeed($userId: ID!, $cursor: String, $limit: Int = 20) {
  feed(userId: $userId, cursor: $cursor, limit: $limit) {
    edges {
      node {
        id
        content
        media {
          url
          type
        }
        author {
          id
          name
          avatar
        }
        stats {
          likes
          comments
          shares
        }
        viewerHasLiked
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

**Apollo Client Config:**

```tsx
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feed: relayStylePagination(), // Cursor-based pagination merging
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: { fetchPolicy: "cache-and-network" },
  },
});
```

**Result:** 60% reduction in over-fetching vs REST; feed loads with 1 request instead of 21 (1 list + 20 author profiles).

---

<a name="lesson-07"></a>

## Lesson 07 — Performance Optimization

### 🎯 Learning Objectives

- Understand Core Web Vitals and their impact
- Apply code splitting, lazy loading, and virtualization
- Optimize React re-renders

---

### 📖 Core Concepts

#### Core Web Vitals (Google's Ranking Signals)

| Metric                              | What It Measures      | Target  |
| ----------------------------------- | --------------------- | ------- |
| **LCP** (Largest Contentful Paint)  | Loading performance   | < 2.5s  |
| **INP** (Interaction to Next Paint) | Responsiveness        | < 200ms |
| **CLS** (Cumulative Layout Shift)   | Visual stability      | < 0.1   |
| **FCP** (First Contentful Paint)    | Time to first content | < 1.8s  |
| **TTFB** (Time to First Byte)       | Server response time  | < 600ms |

---

#### Code Splitting Strategies

**Route-level splitting (automatic in Next.js, manual in React):**

```tsx
// React Router + lazy loading
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));

<Suspense fallback={<PageSkeleton />}>
  <Routes>
    <Route path="/product/:id" element={<ProductPage />} />
    <Route path="/checkout" element={<CheckoutPage />} />
  </Routes>
</Suspense>;
```

**Component-level splitting:**

```tsx
// Heavy component (chart library, rich text editor)
const RichEditor = lazy(() => import("./RichEditor"));

function PostCreator() {
  const [showEditor, setShowEditor] = useState(false);
  return (
    <>
      <button onClick={() => setShowEditor(true)}>Write Post</button>
      {showEditor && (
        <Suspense fallback={<EditorSkeleton />}>
          <RichEditor />
        </Suspense>
      )}
    </>
  );
}
```

---

#### Virtual Scrolling

For lists with thousands of items, DOM nodes become the bottleneck.

```tsx
import { FixedSizeList } from "react-window";

function VirtualFeed({ posts }) {
  return (
    <FixedSizeList
      height={800} // Container height
      itemCount={posts.length}
      itemSize={200} // Each item height
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <PostCard post={posts[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}
```

---

#### React Re-render Optimization

```tsx
// 1. Memoize expensive computations
const sortedUsers = useMemo(
  () => users.sort((a, b) => a.name.localeCompare(b.name)),
  [users],
);

// 2. Memoize callbacks passed to children
const handleDelete = useCallback((id) => deleteUser(id), [deleteUser]);

// 3. Memoize components that receive stable props
const UserCard = memo(({ user, onDelete }) => (
  <div>
    {user.name}
    <button onClick={() => onDelete(user.id)}>Delete</button>
  </div>
));

// 4. Use state colocation — move state down to prevent high re-renders
// ❌ Bad: Search state in App causes everything to re-render
// ✅ Good: Search state lives in SearchBar component
```

---

### 📋 Interview Question Bank

**Q1: A page scores poorly on LCP. How do you diagnose and fix it?**

> **Answer:** I start with Chrome DevTools → Lighthouse and WebPageTest to identify the LCP element. Common causes and fixes:
>
> - **Large images** → Use WebP/AVIF, add `loading="eager"` + `fetchpriority="high"` to hero images, use `srcset` for responsive sizing
> - **Render-blocking resources** → Move CSS inline for above-the-fold, defer non-critical JS
> - **Slow server** → Enable CDN, use SSG/ISR instead of SSR, add `Cache-Control` headers
> - **Client-side rendering** → Switch to SSR or SSG so HTML arrives with content

---

**Q2: What is the difference between `useMemo` and `useCallback`?**

> **Answer:** `useMemo` memoizes a **computed value** (the return value of a function). `useCallback` memoizes a **function itself** (useful when passing callbacks to memoized children). Both prevent unnecessary recalculation/recreation when dependencies haven't changed. Importantly, neither should be used prematurely — profile first, then optimize. The cost of memoization (memory + comparison) can exceed the cost of recomputation for simple values.

---

**Q3: How does virtual scrolling work and when should you use it?**

> **Answer:** Virtual scrolling renders only the DOM nodes currently visible in the viewport (+ a small buffer), swapping them as the user scrolls. The full dataset lives in memory; only ~10–20 DOM nodes exist at once. Use it when rendering 100+ items in a list. Libraries: `react-window` (fixed size items), `react-virtual` (variable size), `TanStack Virtual` (headless). Trade-offs: custom scroll anchoring, dynamic heights, and accessibility require extra work.

---

### 🧪 Case Study: Performance Optimization for a News Feed App

**Before optimization:**

- LCP: 6.2s, Bundle: 2.1MB, TTI: 8.4s

**Optimizations Applied:**

| Issue                         | Fix                            | Impact                 |
| ----------------------------- | ------------------------------ | ---------------------- |
| 2.1MB JS bundle               | Route-level code splitting     | Bundle → 340KB initial |
| Hero image unoptimized        | next/image with priority, WebP | LCP 6.2s → 2.1s        |
| 500-item list in DOM          | react-window virtualization    | 60fps scroll           |
| All data fetched upfront      | Paginated API + infinite query | 80% less initial data  |
| Re-renders on every keystroke | Debounced search input         | INP 400ms → 80ms       |
| CSS in JS runtime             | Moved to CSS Modules           | -200ms FCP             |

**After optimization:**

- LCP: 1.9s ✅, Bundle: 340KB ✅, TTI: 2.8s ✅

---

<a name="lesson-08"></a>

## Lesson 08 — Rendering Strategies (CSR, SSR, SSG, ISR)

### 🎯 Learning Objectives

- Understand the four main rendering strategies
- Know when to use each one
- Combine strategies within a single application

---

### 📖 Core Concepts

#### The Four Rendering Strategies

**1. CSR — Client-Side Rendering**

```
Browser → Downloads HTML shell → Executes JS → Fetches data → Renders UI
```

- ✅ Rich interactions, no server needed
- ❌ Slow initial load, poor SEO, blank initial HTML

**2. SSR — Server-Side Rendering**

```
Browser → Request → Server fetches data + renders HTML → Sends full HTML
```

- ✅ Fast perceived load, great SEO, always fresh data
- ❌ Server cost, slower TTFB than static, can't cache at CDN easily

**3. SSG — Static Site Generation**

```
Build time → Server fetches data + renders HTML → Deploys to CDN
```

- ✅ Fastest possible load, CDN-cached, great SEO
- ❌ Data is stale until next build, slow builds for large sites

**4. ISR — Incremental Static Regeneration (Next.js)**

```
SSG + automatic background regeneration after `revalidate` seconds
```

- ✅ Best of SSG + SSR, per-page revalidation
- ❌ Next.js-specific, complexity in cache invalidation

---

#### Decision Matrix

| Page Type          | Strategy               | Reason                      |
| ------------------ | ---------------------- | --------------------------- |
| Marketing homepage | SSG                    | Rarely changes, needs SEO   |
| Blog post          | ISR (revalidate: 3600) | Changes infrequently        |
| Product listing    | ISR (revalidate: 60)   | Inventory changes           |
| Product detail     | ISR (revalidate: 300)  | Price/stock changes         |
| Search results     | SSR                    | Unique per query            |
| Dashboard          | CSR                    | Authenticated, personalized |
| Checkout           | SSR                    | Security + fresh pricing    |

---

#### Next.js App Router Patterns

```tsx
// SSG — no dynamic data
export default async function AboutPage() {
  return <About />;
}

// SSR — dynamic per request
export const dynamic = "force-dynamic";
export default async function DashboardPage() {
  const data = await fetchUserData(); // runs on every request
  return <Dashboard data={data} />;
}

// ISR — revalidate every 60 seconds
export const revalidate = 60;
export default async function ProductsPage() {
  const products = await fetchProducts();
  return <ProductGrid products={products} />;
}
```

---

### 📋 Interview Question Bank

**Q1: What is hydration and why can it be a problem?**

> **Answer:** Hydration is the process where React takes server-rendered HTML and attaches JavaScript event listeners to make it interactive. The problem (hydration mismatch) occurs when the server-rendered HTML doesn't match what React would render on the client — causing a full re-render and layout shift. Common causes: dates formatted differently by server/client timezone, random IDs, browser extensions modifying HTML. Solutions: use `suppressHydrationWarning` for known mismatches, use `useEffect` for browser-only code, ensure consistent data between server and client.

---

**Q2: When would SSR hurt performance instead of helping it?**

> **Answer:** SSR hurts performance when: (1) the server is slow to respond (DB queries, external APIs), making TTFB worse than CSR + cached API calls; (2) pages are highly personalized making CDN caching impossible; (3) the server has insufficient capacity and becomes a bottleneck under load; (4) the page is behind auth and rarely indexed by search engines, removing the SEO benefit. In these cases, CSR with skeleton loading can provide better perceived performance.

---

**Q3: Explain Streaming SSR and its benefits.**

> **Answer:** Streaming SSR (React 18 + Next.js App Router) sends HTML in chunks as it's ready, rather than waiting for all server data. Using `<Suspense>` boundaries, the shell of the page (nav, layout) streams immediately while data-heavy sections stream in progressively. Benefits: faster Time to First Byte for the shell, users see content immediately, no single slow data fetch blocks the entire page. It's like progressive loading but at the HTML level.

---

### 🧪 Case Study: Rendering Strategy for a News Publication (BBC-scale)

**Site Structure & Strategy:**

```
bbc.com/                    → SSG (revalidate: 60s) - Homepage changes constantly
bbc.com/news/[article-slug] → ISR (revalidate: 300s) - Articles update infrequently
bbc.com/search              → SSR - Unique per query
bbc.com/account             → CSR - Authenticated, no SEO value
bbc.com/live/[event-id]     → SSR + WebSocket - Breaking news, real-time
```

**ISR Cache Strategy for articles:**

- Initial request → generates + caches static HTML at CDN
- Next request within 5 min → serves stale HTML instantly
- Background → fetches fresh article data, regenerates HTML
- On publish → calls `revalidatePath('/news/[slug]')` via webhook to CMS

**Result:** 99% of article requests served from CDN edge (< 50ms), with content freshness within 5 minutes of CMS publish.

---

<a name="lesson-09"></a>

## Lesson 09 — Caching Strategies

### 🎯 Learning Objectives

- Understand the browser caching layers
- Implement HTTP cache headers correctly
- Design application-level caching strategies

---

### 📖 Core Concepts

#### Caching Layers in a Frontend System

```
Layer 1: Browser Memory Cache      → Same-tab, in-session (React Query)
Layer 2: Browser Disk Cache        → HTTP Cache-Control headers
Layer 3: Service Worker Cache      → Offline-first, custom strategies
Layer 4: CDN Cache                 → Geographically distributed, static assets
Layer 5: Application Server Cache  → Redis, in-memory (API responses)
```

---

#### HTTP Cache Headers

```
Cache-Control: public, max-age=31536000, immutable
  → For: Hashed static assets (app.a3f5c.js)
  → Cached for 1 year everywhere; content hash ensures freshness

Cache-Control: public, s-maxage=60, stale-while-revalidate=600
  → For: ISR pages
  → CDN serves stale for 10 min while revalidating in background

Cache-Control: private, no-cache
  → For: Authenticated pages, user-specific data
  → Browser may store but must revalidate every time

Cache-Control: no-store
  → For: Sensitive data (banking, medical)
  → Never cached anywhere
```

---

#### Service Worker Caching Strategies

```tsx
// Workbox strategies:

// 1. Cache First (offline-first, static assets)
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [new ExpirationPlugin({ maxEntries: 60 })],
  }),
);

// 2. Network First (API calls that need freshness)
registerRoute(
  ({ url }) => url.pathname.startsWith("/api/"),
  new NetworkFirst({ cacheName: "api-responses", networkTimeoutSeconds: 3 }),
);

// 3. Stale While Revalidate (balance of speed + freshness)
registerRoute(
  ({ request }) => request.destination === "document",
  new StaleWhileRevalidate({ cacheName: "pages" }),
);
```

---

#### React Query Caching Config

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data considered fresh for 5 min
      gcTime: 30 * 60 * 1000, // Keep in memory 30 min after unmount
      refetchOnWindowFocus: true, // Refetch when tab regains focus
      refetchOnReconnect: true, // Refetch after offline → online
      retry: 3, // Retry failed requests 3 times
    },
  },
});
```

---

### 📋 Interview Question Bank

**Q1: What is `stale-while-revalidate` and why is it useful?**

> **Answer:** `stale-while-revalidate` is a caching strategy that serves cached (potentially stale) content immediately, while fetching a fresh copy in the background. The user sees content instantly (no loading spinner), and the updated version appears on the next load or when the background fetch completes. It's the foundation of React Query's behavior and HTTP's `Cache-Control: stale-while-revalidate` directive. It trades perfect data freshness for perceived performance — ideal for content that changes but not in ways that critically impact the current user session.

---

**Q2: How do you handle cache invalidation in a frontend app?**

> **Answer:** Cache invalidation is hard! My strategies:
>
> - **Time-based** — Set appropriate `staleTime`; cache expires automatically
> - **Event-based** — After a mutation, call `queryClient.invalidateQueries(['users'])` to mark data stale
> - **Optimistic updates** — Update cache immediately, rollback on error
> - **Webhooks** → ISR revalidation\*\* — CMS triggers `revalidatePath` on content change
> - **Cache keys** — Content-addressed assets (hashed filenames) invalidate automatically by deploying a new hash

---

**Q3: When would you implement a Service Worker and what are the risks?**

> **Answer:** Service Workers are valuable for: offline support, background sync, push notifications, and serving a shell instantly. Risks include: caching bugs that persist to users until SW updates, complexity in debugging, and update delays (SW serves old version until all tabs close). Mitigation: use Workbox to manage SW lifecycle, add a "new version available" UI prompt, always include `skipWaiting()` strategically, and test with Chrome's DevTools Application panel.

---

### 🧪 Case Study: Offline-First PWA for a Field Service App

**Context:** Technicians use tablets in low-connectivity environments to view work orders and submit inspection reports.

**Caching Architecture:**

```
App Shell (nav, layout)  → Cache First (SW)    — Always instant
Work Orders List         → Network First (SW)   — Fresh when online
Individual Work Orders   → StaleWhileRevalidate — Pre-cached for shift
Photos / Attachments     → Cache First          — Once downloaded
Form Submissions         → Background Sync      — Queue when offline
```

**Offline Flow:**

```
Online → SW pre-caches today's work orders (10 records)
          ↓
Goes offline on job site
          ↓
App loads from SW cache instantly
          ↓
Technician submits inspection report
          ↓
SW queues request via Background Sync API
          ↓
Reconnects → SW replays queued requests
          ↓
Server receives submission, confirms to app
```

**Result:** App fully functional with zero connectivity. Zero lost reports. Adopted by 500+ field technicians.

---

<a name="lesson-10"></a>

## Lesson 10 — Scalable CSS Architecture

### 🎯 Learning Objectives

- Choose a CSS architecture for large teams
- Prevent CSS specificity conflicts at scale
- Implement theming and design tokens

---

### 📖 Core Concepts

#### CSS Architecture Options

| Approach                  | Best For                         | Tools                      |
| ------------------------- | -------------------------------- | -------------------------- |
| **BEM**                   | Traditional multi-team projects  | Pure CSS                   |
| **CSS Modules**           | React, scoped by default         | Webpack/Vite               |
| **CSS-in-JS**             | Component-driven, dynamic styles | styled-components, Emotion |
| **Utility-First**         | Rapid development, consistency   | Tailwind CSS               |
| **CSS Custom Properties** | Theming across any approach      | Native CSS                 |

---

#### CSS Custom Properties (Design Tokens)

```css
/* tokens.css */
:root {
  /* Colors */
  --color-brand-500: #3b82f6;
  --color-brand-600: #2563eb;
  --color-neutral-900: #111827;

  /* Typography */
  --font-sans: "Inter", system-ui, sans-serif;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;

  /* Spacing */
  --space-1: 0.25rem;
  --space-4: 1rem;
  --space-8: 2rem;

  /* Shadows */
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);

  /* Border Radius */
  --radius-md: 0.5rem;
}

/* Dark mode via class */
[data-theme="dark"] {
  --color-bg: #111827;
  --color-text: #f9fafb;
}
```

---

#### CSS Modules Pattern

```tsx
// Button.module.css
.button { padding: var(--space-2) var(--space-4); border-radius: var(--radius-md); }
.primary { background: var(--color-brand-500); color: white; }
.secondary { background: transparent; border: 1px solid var(--color-brand-500); }

// Button.tsx
import styles from './Button.module.css';
import clsx from 'clsx';

export function Button({ variant = 'primary', className, ...props }) {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      {...props}
    />
  );
}
```

---

#### Tailwind CSS at Scale

```tsx
// Use cva (class-variance-authority) for variant management
import { cva } from "class-variance-authority";

const button = cva(
  "inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "border border-blue-600 text-blue-600 hover:bg-blue-50",
        ghost: "text-gray-600 hover:bg-gray-100",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);
```

---

### 📋 Interview Question Bank

**Q1: How do you prevent CSS specificity wars in a large codebase?**

> **Answer:** Specificity conflicts come from inconsistent selector patterns. Solutions: (1) **CSS Modules** — locally scoped class names by default; (2) **Utility-first (Tailwind)** — almost all styles are single-class utilities, no custom cascade; (3) **BEM** — naming convention prevents specificity escalation by using only class selectors; (4) **CSS layers** (`@layer`) — explicitly order cascade layers so utility styles always win. I also ban `!important` via stylelint rules and avoid ID selectors in component styles.

---

**Q2: What are design tokens and why are they important?**

> **Answer:** Design tokens are the atomic visual decisions of a design system — colors, spacing, typography, shadows — stored as named variables. They create a single source of truth shared between design tools (Figma tokens) and code (CSS custom properties, JSON). When a brand color changes, you update one token and every component reflecting that token updates automatically. They also enable theming (light/dark mode, white-labeling) by swapping token values without touching component code.

---

**Q3: What are the trade-offs of CSS-in-JS?**

> **Answer:** Pros: dynamic styles based on props, co-location with component, no class name conflicts, TypeScript props for styles. Cons: runtime overhead (style injection at paint time), larger JS bundle, SSR complexity (critical CSS extraction needed), poor caching (styles in JS bundle, not separate CSS file). In 2024+, the trend has shifted toward zero-runtime alternatives like Linaria, vanilla-extract, or Tailwind, which generate static CSS at build time while keeping the DX of component-scoped styles.

---

### 🧪 Case Study: CSS Architecture Migration — Legacy to Scalable

**Problem:** 200k lines of global CSS with specificity wars, breaking changes on every deployment

**Migration Strategy:**

```
Phase 1: Audit & Freeze
  - Install stylelint, ban new global CSS
  - Add CSS Modules for all new components

Phase 2: Design Tokens
  - Extract 47 hardcoded colors → 12 semantic tokens
  - Extract spacing scale → 8 step scale
  - Implement via CSS Custom Properties

Phase 3: Component Migration (strangler fig pattern)
  - For each legacy component: rewrite with CSS Modules
  - Delete corresponding global CSS
  - Test visual regression with Percy

Phase 4: Tailwind adoption
  - Introduce Tailwind for new features
  - Gradually migrate Modules to Tailwind where repetitive

Results:
  - CSS bundle: 380KB → 42KB (Tailwind purged)
  - Zero specificity conflicts post-migration
  - Theme switching (light/dark) added in 1 day
  - Developer CSS-related bugs: -73%
```

---

<a name="lesson-11"></a>

## Lesson 11 — Design Systems & Component Libraries

### 🎯 Learning Objectives

- Understand the anatomy of a design system
- Build a component library with versioning
- Establish governance and contribution models

---

### 📖 Core Concepts

#### Anatomy of a Design System

```
Design System
├── Foundation Layer
│   ├── Design Tokens (colors, spacing, typography)
│   ├── Typography Scale
│   └── Icon System
├── Component Library
│   ├── Primitives (Button, Input, Checkbox)
│   ├── Composite (Modal, DatePicker, DataTable)
│   └── Layout (Grid, Stack, Container)
├── Pattern Library
│   ├── Form Patterns
│   ├── Navigation Patterns
│   └── Empty/Error/Loading States
└── Documentation
    ├── Usage guidelines
    ├── Accessibility notes
    └── Code examples
```

---

#### Component Library Architecture

```
packages/
├── tokens/           # Design tokens package
│   ├── src/
│   │   ├── colors.ts
│   │   └── spacing.ts
│   └── package.json  # @company/tokens
├── components/       # React component library
│   ├── src/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   └── index.ts  # Barrel export
│   └── package.json  # @company/ui
└── icons/            # Icon package
    └── package.json  # @company/icons
```

---

#### Versioning & Release Strategy

```
Semantic Versioning:
  MAJOR.MINOR.PATCH

  PATCH (1.0.1) → Bug fixes, no API changes
  MINOR (1.1.0) → New components, backward compatible
  MAJOR (2.0.0) → Breaking changes (removed props, renamed components)

Release channels:
  latest    → Stable, production
  next      → Release candidates
  canary    → Experimental features
```

---

### 📋 Interview Question Bank

**Q1: How do you ensure component library changes don't break consuming apps?**

> **Answer:** Multiple safety nets: (1) **Semantic versioning** — breaking changes are major bumps, documented in CHANGELOG; (2) **Visual regression tests** with Chromatic/Percy — catch visual changes before publish; (3) **Codemods** — for large breaking changes, provide automated migration scripts using jscodeshift; (4) **Deprecation warnings** — add `console.warn` for deprecated props before removing them in the next major; (5) **TypeScript** — type errors surface breaking API changes at compile time in consuming apps.

---

**Q2: What is the difference between a design system and a component library?**

> **Answer:** A **component library** is the code implementation — React components, hooks, utilities. A **design system** is broader: it includes the visual language (color palette, typography, spacing principles), UX patterns (how forms behave, error messaging guidelines), design tokens (shared between Figma and code), documentation, and governance (how teams contribute and consume). A component library is one artifact of a design system.

---

**Q3: How do you handle design system adoption across 20+ teams?**

> **Answer:** Adoption is a people + process problem, not just a technical one. Strategies: (1) **Inner source model** — teams can contribute components back, reducing "not invented here" syndrome; (2) **Dedicated DS team** is on-call to unblock consuming teams; (3) **Dogfooding** — the DS team uses its own library in real products; (4) **Office hours + Slack channel** for support; (5) **Adoption metrics** — track import counts per component across repos; (6) **Deprecation runway** — minimum 2 major versions before removing something.

---

### 🧪 Case Study: Building Airbnb-scale Design System (Simplified)

**Context:** 50 product teams, 3 platforms (web, iOS, Android), 8 languages, brand refresh every 18 months

**Architecture Decision: Multi-platform token pipeline**

```
Figma Variables (Source of Truth)
         ↓
   Style Dictionary (transforms)
         ↓
┌────────┬─────────────┬──────────────┐
│  CSS   │  Swift      │  Kotlin      │
│ Custom │  ColorSet   │  Color.xml   │
│ Props  │             │              │
└────────┴─────────────┴──────────────┘
         ↓
   @company/tokens published
   to internal npm registry
```

**Component Governance Model:**

| Level                 | Who                      | What                              |
| --------------------- | ------------------------ | --------------------------------- |
| Tier 1 (Core)         | DS Team                  | Button, Input, Modal, Toast       |
| Tier 2 (Domain)       | Domain teams + DS review | DataTable, Calendar, Charts       |
| Tier 3 (Experimental) | Any team                 | New patterns, proposed for Tier 2 |

**Metrics after 18 months:**

- 47 components in library
- 94% of new features use DS components
- Design-to-code inconsistency: -82%
- Accessibility issues in products: -67%

---

<a name="lesson-12"></a>

## Lesson 12 — Accessibility (a11y) at Scale

### 🎯 Learning Objectives

- Understand WCAG guidelines and their impact
- Implement accessible components by default
- Build accessibility into the development workflow

---

### 📖 Core Concepts

#### WCAG 2.1 Principles (POUR)

| Principle          | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| **Perceivable**    | Content can be perceived by all users (alt text, captions) |
| **Operable**       | UI can be operated by keyboard, no time limits             |
| **Understandable** | Content is readable, behavior is predictable               |
| **Robust**         | Works with current and future assistive technologies       |

---

#### Essential a11y Patterns

**Semantic HTML (most impactful, zero cost)**

```html
<!-- ❌ Inaccessible -->
<div onclick="handleClick()">Submit</div>

<!-- ✅ Accessible -->
<button type="submit" onClick="{handleClick}">Submit</button>
```

**Focus Management in Modals**

```tsx
function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Move focus into modal
      modalRef.current?.focus();
      // Trap focus within modal (use focus-trap-react library)
    }
  }, [isOpen]);

  return isOpen ? (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
    >
      <h2 id="modal-title">Modal Title</h2>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  ) : null;
}
```

**Accessible Form Errors**

```tsx
<div>
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    aria-describedby="email-error"
    aria-invalid={!!errors.email}
  />
  {errors.email && (
    <p id="email-error" role="alert">
      {errors.email.message}
    </p>
  )}
</div>
```

---

#### Accessibility Testing Pyramid

```
Manual Testing (Screen readers: NVDA, VoiceOver, JAWS)
      ↑
Integration Tests (cypress-axe, playwright-axe)
      ↑
Unit Tests (jest-axe for component-level)
      ↑
Linting (eslint-plugin-jsx-a11y — catches at write time)
```

---

### 📋 Interview Question Bank

**Q1: What are the most common accessibility failures in React apps?**

> **Answer:** The most common failures are:
>
> 1. **Missing alt text** on images
> 2. **Custom interactive elements** (divs with onClick) missing keyboard support and ARIA roles
> 3. **Color contrast** below 4.5:1 ratio for normal text
> 4. **Focus not managed** after modal open/close or route change
> 5. **Form inputs** without associated labels
> 6. **Animated content** that can't be stopped (violates WCAG 2.3.3)
> 7. **Error messages** not announced to screen readers (`role="alert"`)

---

**Q2: How do you implement skip navigation links?**

> **Answer:** Skip links allow keyboard users to bypass repetitive navigation and jump to main content. Implementation:
>
> ```html
> <a href="#main-content" class="skip-link">Skip to main content</a>
> <nav>...</nav>
> <main id="main-content">...</main>
> ```
>
> The skip link is visually hidden by default but appears on focus (`:focus-visible`). This is required for WCAG 2.4.1 (Bypass Blocks).

---

**Q3: How do you make a custom dropdown accessible?**

> **Answer:** Custom dropdowns need to replicate browser select behavior: (1) Trigger button with `aria-haspopup="listbox"` and `aria-expanded`; (2) Menu with `role="listbox"`; (3) Options with `role="option"` and `aria-selected`; (4) Keyboard: Enter/Space to open, Arrow keys to navigate, Escape to close, Home/End for first/last; (5) Focus returns to trigger on close. This is exactly what Radix UI's `Select` primitive implements — I recommend using headless primitives rather than rebuilding from scratch.

---

### 🧪 Case Study: Accessibility Audit & Remediation for a SaaS Dashboard

**Initial State:** 0 accessibility testing, 143 axe violations, WCAG AA non-compliant

**Remediation Plan (Priority Order):**

```
Week 1: Low-hanging fruit (automated fixes)
  - Add alt text to 89 images (eslint rule enforced)
  - Fix 34 color contrast issues (update design tokens)
  - Add labels to 23 unlabeled inputs

Week 2-3: Component fixes
  - Replace custom dropdown divs with Radix Select
  - Add keyboard support to date pickers
  - Implement focus trapping in all modals

Week 4: Workflow changes
  - Add eslint-plugin-jsx-a11y to CI (blocks merge)
  - Add jest-axe to component test suite
  - Add accessibility section to PR template
  - Train team with 2hr workshop

Month 2-3: Screen reader testing
  - Manual testing with NVDA + Firefox
  - Manual testing with VoiceOver + Safari
  - Hire accessibility consultant for audit

Results:
  - Violations: 143 → 4 (known exceptions, documented)
  - WCAG 2.1 AA certified
  - Enterprise deals unblocked (3 required compliance)
```

---

<a name="lesson-13"></a>

## Lesson 13 — Security in Frontend Systems

### 🎯 Learning Objectives

- Understand common frontend security vulnerabilities
- Implement Content Security Policy
- Secure authentication and authorization in SPAs

---

### 📖 Core Concepts

#### OWASP Top Frontend Threats

**1. Cross-Site Scripting (XSS)**

```tsx
// ❌ Vulnerable — executes injected scripts
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Safe — React escapes by default
<div>{userInput}</div>

// ✅ Safe — sanitize when HTML is needed
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

**2. Cross-Site Request Forgery (CSRF)**

```tsx
// Include CSRF token in state-changing requests
const csrfToken = document.cookie.match(/csrfToken=([^;]+)/)?.[1];

fetch("/api/transfer", {
  method: "POST",
  headers: {
    "X-CSRF-Token": csrfToken,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ amount: 100 }),
});
```

**3. Content Security Policy (CSP)**

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-abc123';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.company.com;
  frame-ancestors 'none';
```

---

#### Secure Authentication in SPAs

```tsx
// Token storage decision:
//
// ❌ localStorage → Vulnerable to XSS (any JS can read it)
// ❌ sessionStorage → Same XSS risk
// ✅ HttpOnly Cookie → Inaccessible to JavaScript
//    → Server sets: Set-Cookie: token=...; HttpOnly; Secure; SameSite=Strict
//
// If you must use localStorage:
//    → Use short-lived access tokens (15 min)
//    → Refresh tokens in HttpOnly cookies
//    → Clear on tab close

// Route protection
function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// Authorization (role-based)
function AdminPanel() {
  const { user } = useAuth();

  if (!user?.roles.includes("admin")) {
    return <AccessDenied />;
  }
  return <AdminDashboard />;
}
```

---

### 📋 Interview Question Bank

**Q1: Where should JWT tokens be stored in a browser?**

> **Answer:** The safest option is **HttpOnly cookies** — they cannot be accessed by JavaScript, protecting against XSS. The cookie should also be `Secure` (HTTPS only) and `SameSite=Strict` (CSRF protection). If using `localStorage` (necessary for some architectures), the token must be short-lived (15 minutes), used with refresh tokens stored in HttpOnly cookies, and the app must be very strict about XSS prevention (tight CSP, no `dangerouslySetInnerHTML`). Never store long-lived tokens in localStorage.

---

**Q2: How does a Content Security Policy prevent XSS?**

> **Answer:** CSP is an HTTP header that tells the browser which sources of content are trusted. `script-src 'self'` means only scripts from your own domain can execute — if an attacker injects `<script src="https://evil.com/steal.js">`, the browser blocks it. `script-src 'nonce-abc'` goes further — only scripts with the matching nonce attribute execute. This breaks nearly all XSS attack vectors because the attacker can't know the server-generated nonce. CSP is a defense-in-depth measure — it doesn't replace input sanitization, it layers on top of it.

---

**Q3: What is Clickjacking and how do you prevent it?**

> **Answer:** Clickjacking embeds your site in an invisible iframe on an attacker's page, tricking users into clicking buttons they can't see (e.g., confirming a bank transfer while thinking they're playing a game). Prevention: `X-Frame-Options: DENY` header (legacy) or CSP's `frame-ancestors 'none'` (modern) — both prevent your site from being embedded in iframes. React apps should always include these headers in their server/CDN configuration.

---

### 🧪 Case Study: Security Hardening for a Banking Frontend

**Security Measures Implemented:**

| Threat                     | Mitigation                                                                     |
| -------------------------- | ------------------------------------------------------------------------------ |
| XSS                        | Strict CSP with nonces, DOMPurify for rich content, no dangerouslySetInnerHTML |
| CSRF                       | SameSite=Strict cookies, CSRF tokens for sensitive mutations                   |
| Clickjacking               | `frame-ancestors 'none'` in CSP                                                |
| Token theft                | HttpOnly cookies, 15-min access tokens, device fingerprinting                  |
| Sensitive data in URLs     | No tokens/IDs in URL query params                                              |
| Dependency vulnerabilities | Dependabot + npm audit in CI                                                   |
| Subresource integrity      | SRI hashes on all CDN assets                                                   |
| HTTPS downgrade            | HSTS header with 1-year max-age                                                |

**Security headers configuration (Next.js):**

```js
// next.config.js
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];
```

---

<a name="lesson-14"></a>

## Lesson 14 — Real-Time Systems (WebSockets, SSE)

### 🎯 Learning Objectives

- Understand real-time communication protocols
- Implement WebSocket-based features correctly
- Handle connection management and reconnection

---

### 📖 Core Concepts

#### Real-Time Protocols Comparison

| Protocol          | Direction     | Use Case                    | Complexity  |
| ----------------- | ------------- | --------------------------- | ----------- |
| **Short Polling** | Client→Server | Simple updates (every 5s)   | Low         |
| **Long Polling**  | Client→Server | Moderate real-time          | Medium      |
| **SSE**           | Server→Client | Notifications, live feeds   | Low-Medium  |
| **WebSocket**     | Bidirectional | Chat, collaboration, gaming | Medium-High |
| **WebRTC**        | Peer-to-peer  | Video/audio, file sharing   | High        |

---

#### WebSocket Implementation with Reconnection

```tsx
function useWebSocket(url: string) {
  const [state, setState] = useState<"connecting" | "open" | "closed">(
    "connecting",
  );
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<number>(1000); // exponential backoff

  const connect = useCallback(() => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      setState("open");
      reconnectTimeout.current = 1000; // reset backoff
    };

    wsRef.current.onmessage = (event) => {
      setLastMessage(event);
    };

    wsRef.current.onclose = () => {
      setState("closed");
      // Exponential backoff reconnection
      const timeout = Math.min(reconnectTimeout.current * 2, 30000);
      reconnectTimeout.current = timeout;
      setTimeout(connect, timeout);
    };
  }, [url]);

  useEffect(() => {
    connect();
    return () => wsRef.current?.close();
  }, [connect]);

  const sendMessage = useCallback((data: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(data);
    }
  }, []);

  return { state, lastMessage, sendMessage };
}
```

---

#### Server-Sent Events (SSE)

```tsx
// Server (Node.js/Express)
app.get("/api/notifications/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Send events
  const interval = setInterval(() => {
    sendEvent({ type: "heartbeat", timestamp: Date.now() });
  }, 30000);

  req.on("close", () => clearInterval(interval));
});

// Client (React)
function useSSE(url: string) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const es = new EventSource(url);
    es.onmessage = (e) => {
      setEvents((prev) => [...prev, JSON.parse(e.data)]);
    };
    es.onerror = () => es.close();
    return () => es.close();
  }, [url]);

  return events;
}
```

---

### 📋 Interview Question Bank

**Q1: When would you use SSE over WebSockets?**

> **Answer:** SSE is ideal for **unidirectional** server-to-client streaming: live feeds, notifications, progress updates, stock tickers. It works over regular HTTP, supports automatic reconnection natively, and passes through corporate proxies and firewalls more easily than WebSockets. WebSockets are needed for **bidirectional** communication: chat, collaborative editing, live gaming. Rule of thumb: if the client only listens (doesn't send messages on the same connection), SSE is simpler and sufficient.

---

**Q2: How do you handle WebSocket disconnections gracefully?**

> **Answer:** Implement exponential backoff reconnection — start at 1s, double on each failure up to a max (e.g., 30s). Show the user a "reconnecting..." indicator. Buffer outgoing messages during disconnection and replay them on reconnect (or discard, depending on semantics). Implement a heartbeat (ping/pong) to detect silent disconnections (when TCP connection dies without a close event). On reconnect, sync missed state by fetching from REST API to fill the gap.

---

**Q3: How do you integrate WebSocket data with React Query cache?**

> **Answer:** React Query manages server state; WebSockets are the real-time update channel. The pattern: (1) initial data load via React Query; (2) WebSocket message handler updates the React Query cache using `queryClient.setQueryData()` or `queryClient.invalidateQueries()`; (3) React Query re-renders all subscribed components automatically. This gives you the best of both: caching, deduplication, and background sync from React Query, with real-time updates from WebSocket.

---

### 🧪 Case Study: Real-Time Collaborative Whiteboard

**Features:** Multiple users drawing simultaneously, cursor presence, object sync

**Architecture:**

```
Client A ──┐
Client B ──┤──→ WebSocket Server ──→ CRDT Engine ──→ Broadcast to all clients
Client C ──┘
```

**CRDT (Conflict-free Replicated Data Type) for sync:**

```
Each drawing operation is:
  { userId, timestamp, operation: 'drawPath', data: { points, color, width } }

CRDTs ensure:
  - No conflicts when two users draw simultaneously
  - Same final state regardless of operation order
  - Works offline; merges on reconnect
```

**Client implementation:**

```tsx
function useWhiteboard(roomId: string) {
  const { sendMessage, lastMessage } = useWebSocket(
    `wss://ws.app.com/room/${roomId}`,
  );
  const [shapes, dispatch] = useReducer(shapesReducer, []);

  // Handle incoming operations
  useEffect(() => {
    if (!lastMessage) return;
    const op = JSON.parse(lastMessage.data);
    dispatch({ type: "APPLY_REMOTE_OPERATION", payload: op });
  }, [lastMessage]);

  // Send local operations
  const drawShape = useCallback(
    (shape) => {
      dispatch({ type: "ADD_SHAPE", payload: shape });
      sendMessage(JSON.stringify({ type: "ADD_SHAPE", shape, userId: myId }));
    },
    [sendMessage],
  );

  return { shapes, drawShape };
}
```

---

<a name="lesson-15"></a>

## Lesson 15 — Micro-Frontends Architecture

### 🎯 Learning Objectives

- Understand micro-frontend patterns and trade-offs
- Implement Module Federation
- Design inter-micro-frontend communication

---

### 📖 Core Concepts

#### When to Consider Micro-Frontends

```
✅ DO use when:
  - 5+ teams working on the same frontend
  - Teams have different release cycles
  - Different parts need different frameworks
  - Portions need independent scaling/deployment

❌ DON'T use when:
  - Small team (< 5 frontend engineers)
  - High cohesion requirements (lots of shared state)
  - Performance is the top priority (bundle duplication)
  - Team lacks DevOps maturity
```

---

#### Micro-Frontend Patterns

**1. Build-time Integration (npm packages)**

```
Pros: Simplest, type-safe, tree-shakeable
Cons: Synchronized deployments required
```

**2. Runtime Integration via iframes**

```
Pros: Complete isolation (CSS, JS, security)
Cons: Poor UX (scroll, focus, communication overhead)
```

**3. Module Federation (Webpack 5)**

```
Pros: True runtime composition, share dependencies, lazy loading
Cons: Webpack-specific, complex setup, runtime errors
```

---

#### Module Federation Setup

```js
// Host App (shell) — webpack.config.js
new ModuleFederationPlugin({
  name: "shell",
  remotes: {
    checkout: "checkout@https://checkout.company.com/remoteEntry.js",
    catalog: "catalog@https://catalog.company.com/remoteEntry.js",
  },
  shared: ["react", "react-dom"], // Share React to avoid duplicates
});

// Checkout App — webpack.config.js
new ModuleFederationPlugin({
  name: "checkout",
  filename: "remoteEntry.js",
  exposes: {
    "./CheckoutWidget": "./src/CheckoutWidget",
  },
  shared: ["react", "react-dom"],
});
```

**Usage in Host:**

```tsx
const CheckoutWidget = lazy(() => import("checkout/CheckoutWidget"));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <CheckoutWidget />
    </Suspense>
  );
}
```

---

#### Inter-MFE Communication

```tsx
// 1. Custom Events (decoupled, DOM-based)
// Publishing MFE
window.dispatchEvent(new CustomEvent("cart:updated", { detail: { count: 3 } }));

// Subscribing MFE
window.addEventListener("cart:updated", (e) => {
  setCartCount(e.detail.count);
});

// 2. Shared State Store (Zustand with window)
// Set by Shell App
window.__sharedStore = createStore();

// Used by any MFE
const store = window.__sharedStore;
```

---

### 📋 Interview Question Bank

**Q1: What is Module Federation and how does it differ from regular code splitting?**

> **Answer:** Regular code splitting splits your own app's bundle into chunks loaded lazily. Module Federation allows completely separate applications, built and deployed independently, to share code at runtime. Application A can import a component from Application B's live deployment — they share dependencies (like React) to avoid duplication. This enables true independent deployments: the checkout team can ship a new checkout flow without redeploying the main app.

---

**Q2: How do you handle shared state between micro-frontends?**

> **Answer:** Options from least to most coupled: (1) **URL state** — each MFE reads route params; (2) **Custom events** (`window.dispatchEvent`) — decoupled but loosely typed; (3) **Shared state library** — a tiny store (Zustand/Redux) exposed on `window.__store`; (4) **URL-driven shell** — shell owns routing, passes props down to MFEs. Avoid deep shared state — it creates the same coupling that micro-frontends are meant to avoid. Prefer event-based communication and design MFEs to be as self-contained as possible.

---

**Q3: What are the performance implications of micro-frontends?**

> **Answer:** Main risks: (1) **Bundle duplication** — if React is loaded twice, add 40KB. Mitigate with Module Federation's `shared` config; (2) **Multiple network waterfalls** — each MFE may load its own remoteEntry.js. Mitigate with preloading hints; (3) **No shared cache** across MFEs if on different origins. Best practice: host all MFEs on the same CDN with matching cache keys for shared dependencies, and use a single version of React/framework across all MFEs.

---

### 🧪 Case Study: Amazon-like E-Commerce Micro-Frontend Migration

**Problem:** Monolith SPA with 12 teams causing constant merge conflicts and coordinated releases every 2 weeks

**Migration to Micro-Frontends:**

```
Before:
  One 4.2MB monolith SPA
  2-week release cycle (blocked by all teams)
  12 teams, 80 engineers

After:
  Shell App (routing, auth, nav shell)
  ├── /         → HomeMFE (team: Discovery)
  ├── /catalog  → CatalogMFE (team: Catalog)
  ├── /product  → PDPMFE (team: Product Detail)
  ├── /cart     → CartMFE (team: Cart)
  ├── /checkout → CheckoutMFE (team: Checkout)
  └── /account  → AccountMFE (team: Account)

Each MFE:
  - Own CI/CD pipeline
  - Independent deployment (weekly or more frequent)
  - Own error monitoring
  - Communicates via Custom Events + URL
```

**Results:**

- Release cycle: 2 weeks → Daily per team
- Deployment conflicts: eliminated
- Initial bundle (Shell): 180KB (vs 4.2MB)
- Team autonomy: each team owns their MFE end-to-end

---

<a name="lesson-16"></a>

## Lesson 16 — Monorepo & Build Systems

### 🎯 Learning Objectives

- Understand monorepo vs polyrepo trade-offs
- Set up Turborepo for a frontend monorepo
- Optimize build times with caching

---

### 📖 Core Concepts

#### Monorepo vs Polyrepo

|                  | Monorepo                     | Polyrepo            |
| ---------------- | ---------------------------- | ------------------- |
| **Code sharing** | Easy — direct imports        | Via npm packages    |
| **Refactoring**  | Atomic (one PR)              | Complex, multi-repo |
| **CI/CD**        | Complex (build what changed) | Simple per repo     |
| **Autonomy**     | Shared tooling enforced      | Per-repo freedom    |
| **Scale**        | Requires tooling (Nx, Turbo) | Simpler at start    |
| **Examples**     | Google, Meta, Microsoft      | Most startups       |

---

#### Turborepo Monorepo Structure

```
company-monorepo/
├── apps/
│   ├── web/              # Next.js consumer app
│   ├── admin/            # Vite React admin app
│   └── docs/             # Docusaurus documentation
├── packages/
│   ├── ui/               # Shared component library
│   ├── config-eslint/    # Shared ESLint config
│   ├── config-ts/        # Shared TypeScript config
│   ├── utils/            # Shared utilities
│   └── api-client/       # Generated API client
├── turbo.json            # Pipeline config
├── package.json          # Root workspace config
└── pnpm-workspace.yaml   # pnpm workspaces
```

**Turbo Pipeline:**

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"], // Build deps first
      "outputs": ["dist/**", ".next/**"],
      "cache": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"],
      "cache": true
    },
    "lint": {
      "outputs": [],
      "cache": true
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

---

#### Build Performance Optimization

```bash
# Only build/test what changed (Turborepo does this automatically)
turbo run build --filter=[HEAD^1]  # Changed since last commit
turbo run test --filter=web        # Only the web app
turbo run build --filter=...web    # web + all its dependencies

# Remote caching (share cache across CI machines)
turbo run build --team=my-team --token=$TURBO_TOKEN
# → If this exact build ran before (same inputs),
#   restore from remote cache in seconds
```

---

### 📋 Interview Question Bank

**Q1: What problems does Turborepo solve?**

> **Answer:** In a monorepo without tooling, running `build` or `test` rebuilds everything every time. Turborepo solves: (1) **Task orchestration** — runs tasks in dependency order (build `ui` before `web` that imports it); (2) **Local caching** — if code didn't change, restore previous output from cache; (3) **Remote caching** — CI machine can use cache from another engineer's machine; (4) **Parallelization** — runs independent tasks concurrently. Result: a build that takes 10 min can complete in 30s if nothing relevant changed.

---

**Q2: How do you manage shared dependencies across packages in a monorepo?**

> **Answer:** Use a single version policy: one version of React, TypeScript, etc. defined at the root `package.json` and inherited. Use workspace protocols (`workspace:*`) for internal package references so they resolve locally, not from npm. Use tools like `syncpack` to detect version mismatches. For truly conflicting version needs (rare), allow exceptions but document them. The biggest risk is duplicate React instances — enforce deduplication via pnpm's deduplication or webpack's resolve.alias.

---

**Q3: When should a team NOT use a monorepo?**

> **Answer:** Avoid monorepos when: (1) Teams are truly independent with no code sharing needs; (2) The team lacks DevOps maturity to manage complex CI pipelines; (3) Security requirements demand strict code isolation (e.g., open-sourcing part of the codebase); (4) The tech stack is wildly heterogeneous (Python backend + React + Swift apps — poor fit for JS monorepo tooling). Start with a monorepo for new projects; migrate to polyrepo only if concrete problems emerge that monorepo tooling can't solve.

---

### 🧪 Case Study: Migrating to Monorepo at a Fintech Company

**Before:** 23 separate repos, 4 teams, constant version sync issues, shared UI duplicated in 5 repos

**Migration:**

```
Phase 1: Consolidate (Month 1)
  - Move all repos into monorepo (git history preserved)
  - Set up pnpm workspaces + Turborepo
  - Configure CI to use Turborepo (only test changed packages)

Phase 2: Extract shared packages (Month 2)
  - @fintech/ui        ← consolidated from 5 duplicates
  - @fintech/auth      ← shared auth logic
  - @fintech/api       ← generated OpenAPI client
  - @fintech/config    ← shared ESLint, TS, Prettier

Phase 3: Optimize (Month 3)
  - Enable Turbo remote cache (Vercel Remote Cache)
  - Set up affected-only CI triggers
  - Document contribution guidelines
```

**Results:**

- CI time for unaffected packages: 8 min → 45s (cache hit)
- UI inconsistency bugs across products: -91%
- Developer onboarding: single repo clone, one `pnpm install`
- Shared package update: 1 PR across all consumers simultaneously

---

<a name="lesson-17"></a>

## Lesson 17 — Testing Strategy for Large-Scale Frontend

### 🎯 Learning Objectives

- Design a testing pyramid for frontend applications
- Write effective unit, integration, and E2E tests
- Integrate testing into CI/CD pipelines

---

### 📖 Core Concepts

#### The Frontend Testing Trophy

```
        ╔═══════════════╗
        ║    E2E Tests  ║  (Few, expensive, high confidence)
        ║   Playwright  ║
        ╠═══════════════╣
        ║  Integration  ║  (Most, RTL + MSW, user behavior)
        ║     Tests     ║
        ╠═══════════════╣
        ║   Unit Tests  ║  (Logic, utils, hooks)
        ║  Jest/Vitest  ║
        ╠═══════════════╣
        ║    Static     ║  (TypeScript, ESLint, Prettier)
        ║   Analysis    ║
        ╚═══════════════╝
```

_(Kent C. Dodds' Testing Trophy — favors integration tests)_

---

#### Unit Testing — Logic and Hooks

```tsx
// Custom hook test
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  it("increments count", () => {
    const { result } = renderHook(() => useCounter(0));
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });

  it("resets to initial value", () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => result.current.reset());
    expect(result.current.count).toBe(5);
  });
});
```

---

#### Integration Testing with MSW

```tsx
// Mock the API at the network level
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  http.get("/api/users", () => {
    return HttpResponse.json([{ id: 1, name: "Alice", role: "admin" }]);
  }),
);

describe("UserList", () => {
  it("displays users from API", async () => {
    render(<UserList />);

    // Loading state
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();

    // Data loads
    const alice = await screen.findByText("Alice");
    expect(alice).toBeInTheDocument();
    expect(screen.getByText("admin")).toBeInTheDocument();
  });

  it("shows error state on API failure", async () => {
    server.use(http.get("/api/users", () => HttpResponse.error()));
    render(<UserList />);
    await screen.findByText(/something went wrong/i);
  });
});
```

---

#### E2E Testing with Playwright

```tsx
// checkout.spec.ts
test("complete checkout flow", async ({ page }) => {
  await page.goto("/products/shoes-123");

  await page.getByRole("button", { name: /add to cart/i }).click();
  await expect(page.getByTestId("cart-count")).toHaveText("1");

  await page.getByRole("link", { name: /checkout/i }).click();
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Card number").fill("4242424242424242");
  await page.getByRole("button", { name: /place order/i }).click();

  await expect(
    page.getByRole("heading", { name: /order confirmed/i }),
  ).toBeVisible();
});
```

---

### 📋 Interview Question Bank

**Q1: What is the difference between testing implementation details vs behavior?**

> **Answer:** Testing implementation details means asserting on internal state, class names, or method calls — tests break when you refactor even if the behavior is unchanged. Testing behavior means asserting on what the user sees and can do — "clicking Submit shows a success message." React Testing Library enforces this by only exposing queries that match what users experience (`getByRole`, `getByText`, `getByLabelText`). Behavior-focused tests survive refactors and give genuine confidence.

---

**Q2: How do you test components that depend on global state (Redux, Zustand)?**

> **Answer:** For Redux: wrap the component in a test-specific `<Provider store={createTestStore(initialState)}>`. For Zustand: either pass a pre-seeded store or use Zustand's `act` + `getState` for assertions. The key is creating isolated store instances per test to avoid state leakage. React Testing Library's `render` accepts a `wrapper` option, making this clean. For Zustand with the context pattern, inject a mock store via context in tests.

---

**Q3: When would you write E2E tests vs integration tests?**

> **Answer:** E2E tests are expensive (slow, flaky, require running app + backend) but provide the highest confidence for critical user journeys: registration flow, checkout, core feature paths. Integration tests (RTL + MSW) are faster and more stable, testing component logic with mocked APIs. My rule: write E2E for the **5-10 most business-critical paths** (if this breaks, we lose revenue/users). Write integration tests for all user-facing component behavior. Write unit tests for complex logic (reducers, utils, algorithms).

---

### 🧪 Case Study: Test Strategy for a SaaS Project Management App

**Coverage Goal:** 80% integration, catch regressions before production

**Test Pyramid Implementation:**

```
E2E (Playwright) — 24 critical flows:
  - Auth (signup, login, password reset, SSO)
  - Project creation wizard (multi-step form)
  - Task CRUD + drag-and-drop
  - Billing (upgrade plan, update card)
  - Team invite flow

Integration (RTL + MSW) — ~400 tests:
  - Every page component: loading, success, error, empty states
  - Form validation scenarios
  - Permission-gated UI (what admins see vs viewers)

Unit (Vitest) — ~200 tests:
  - Date formatting utils
  - Permission checking functions
  - Custom hooks (useFilters, useSort, usePagination)
  - Reducers / state machines

Static Analysis:
  - TypeScript strict mode
  - ESLint + eslint-plugin-react-hooks
  - jest-axe for a11y in integration tests
```

**CI Integration:**

```
On every PR:
  → Lint + TypeScript (30s)
  → Unit + Integration tests (2m, parallelized)
  → Visual regression on Storybook (Percy)
  → E2E on changed routes only (3-5m)

On merge to main:
  → Full E2E suite (15m)
  → Performance budget check (Lighthouse CI)
```

---

<a name="lesson-18"></a>

## Lesson 18 — Observability, Logging & Monitoring

### 🎯 Learning Objectives

- Implement error tracking and performance monitoring
- Design structured logging for frontend applications
- Set up alerting for frontend health metrics

---

### 📖 Core Concepts

#### Frontend Observability Pillars

```
1. Error Tracking     → Sentry, Datadog RUM
2. Performance        → Core Web Vitals, custom metrics
3. User Analytics     → Mixpanel, Amplitude, PostHog
4. Session Replay     → LogRocket, FullStory (for debugging)
5. Alerting           → PagerDuty, Opsgenie
```

---

#### Error Boundary + Sentry Integration

```tsx
import * as Sentry from "@sentry/react";

// Initialize
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of transactions
  replaysOnErrorSampleRate: 1.0, // 100% of errors get replay
});

// Error Boundary
function AppErrorBoundary({ children }) {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => (
        <ErrorPage error={error} onRetry={resetError} />
      )}
      beforeCapture={(scope, error) => {
        scope.setTag("component", "app-root");
        scope.setUser({ id: getCurrentUserId() });
      }}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}

// Custom error with context
try {
  await submitOrder(orderData);
} catch (error) {
  Sentry.captureException(error, {
    contexts: { order: { id: orderData.id, total: orderData.total } },
  });
  throw error;
}
```

---

#### Core Web Vitals Monitoring

```tsx
import { onCLS, onINP, onLCP, onFCP, onTTFB } from "web-vitals";

function sendToAnalytics({ name, value, rating, id }) {
  fetch("/api/metrics", {
    method: "POST",
    body: JSON.stringify({ name, value, rating, id, url: location.href }),
  });
}

// Report all Core Web Vitals
onCLS(sendToAnalytics);
onINP(sendToAnalytics);
onLCP(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);
```

---

#### Structured Logging

```tsx
// logger.ts — structured, contextual logging
const logger = {
  info: (message: string, context?: Record<string, unknown>) => {
    console.log(
      JSON.stringify({
        level: "info",
        message,
        ...context,
        timestamp: new Date().toISOString(),
      }),
    );
  },
  error: (
    message: string,
    error?: Error,
    context?: Record<string, unknown>,
  ) => {
    console.error(
      JSON.stringify({
        level: "error",
        message,
        error: {
          name: error?.name,
          message: error?.message,
          stack: error?.stack,
        },
        ...context,
        timestamp: new Date().toISOString(),
      }),
    );
    Sentry.captureException(error, { extra: context });
  },
};

// Usage
logger.info("User completed checkout", { userId, orderId, total });
logger.error("Payment failed", error, { userId, orderId });
```

---

### 📋 Interview Question Bank

**Q1: How do you debug a production error you can't reproduce locally?**

> **Answer:** I rely on the observability stack: (1) **Sentry error details** — stack trace, browser/OS, user context, breadcrumbs (recent user actions), and session replay (video of exactly what happened); (2) **Feature flags** — if a recent deploy caused it, roll back the flag; (3) **Log correlation** — trace the error back through structured logs with a correlation ID; (4) **Canary deployment** — reproduce in production by routing a small percentage of traffic to the suspect build; (5) **Browser-specific** — Sentry tags tell us if it's Chrome 120 only, pointing to a browser compatibility issue.

---

**Q2: What metrics would you alert on for a frontend application?**

> **Answer:** Critical alerts (page someone): (1) JavaScript error rate spikes > 5% of sessions; (2) LCP > 4s (p75) for key pages; (3) API error rate from frontend > 2%; (4) Successful checkout rate drops > 10%. Warning alerts: (1) Bundle size increases > 10% vs previous deploy; (2) Core Web Vital scores cross "Needs Improvement" threshold; (3) Session crash rate > 1%. I also track business metrics: conversion rate, feature adoption — these catch silent failures that don't trigger JS errors.

---

**Q3: What is Real User Monitoring (RUM) and how does it differ from synthetic monitoring?**

> **Answer:** RUM collects performance data from actual users' browsers in production — real device capabilities, real network conditions, real geographic distribution. Synthetic monitoring uses scripted bots running in controlled environments on a schedule (e.g., Lighthouse CI, WebPageTest). RUM catches edge cases (slow 3G users in Southeast Asia, old Android devices) that synthetic misses. Synthetic catches regressions before they affect users. Use both: synthetic in CI to catch regressions, RUM in production to understand actual user experience.

---

### 🧪 Case Study: Observability Stack for a High-Traffic Media Site

**Stack:**

```
Error Tracking: Sentry (with session replay for top 0.1% errors)
Performance: web-vitals → Datadog → dashboards + alerts
Analytics: PostHog (product analytics, feature flags)
Synthetic: Lighthouse CI in GitHub Actions
Alerting: PagerDuty for p0/p1, Slack for p2/p3
```

**Dashboard (Datadog):**

```
Real-time:
  - JS Error Rate (target: < 0.5%)
  - API Error Rate from client (target: < 1%)
  - Active users

Performance (p75):
  - LCP by page type (homepage, article, search)
  - INP across all pages
  - TTFB by region (US, EU, APAC)

Business:
  - Article completion rate
  - Newsletter signup conversion
  - Paywall conversion rate
```

**Incident example:**
LCP alert fires at 4.2s (target 2.5s). Sentry shows 3 errors on image loading. Session replay reveals hero image 404ing. Root cause: CDN path change in deploy. Rollback in 8 minutes. Total impact: 23 minutes of degraded LCP for 15% of users.

---

<a name="lesson-19"></a>

## Lesson 19 — CI/CD for Frontend Applications

### 🎯 Learning Objectives

- Design a CI/CD pipeline for frontend apps
- Implement preview deployments and feature flags
- Automate quality gates

---

### 📖 Core Concepts

#### Complete Frontend CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    name: Quality Gates
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - name: Install
        run: pnpm install --frozen-lockfile

      - name: Type Check
        run: pnpm tsc --noEmit

      - name: Lint
        run: pnpm lint

      - name: Unit & Integration Tests
        run: pnpm test --coverage

      - name: Build
        run: pnpm build

      - name: Bundle Size Check
        run: pnpm bundlesize # fails if bundle > threshold

  visual-regression:
    name: Visual Tests
    runs-on: ubuntu-latest
    steps:
      - name: Chromatic
        run: pnpm chromatic --exit-zero-on-changes

  e2e:
    name: E2E Tests
    runs-on: ubuntu-latest
    needs: [quality]
    steps:
      - name: Playwright
        run: pnpm playwright test

  deploy-preview:
    name: Preview Deployment
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - name: Deploy to Vercel Preview
        run: vercel deploy --prebuilt

  deploy-production:
    name: Production Deploy
    runs-on: ubuntu-latest
    needs: [quality, e2e]
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Production
        run: vercel deploy --prod --prebuilt

      - name: Lighthouse CI
        run: lhci autorun
```

---

#### Feature Flags for Safe Deployments

```tsx
// Feature flag with LaunchDarkly / PostHog / Unleash
import { useFeatureFlag } from "@/hooks/useFeatureFlag";

function ProductPage() {
  const showNewCheckout = useFeatureFlag("new-checkout-flow");

  return (
    <div>
      {showNewCheckout ? (
        <NewCheckoutWidget /> // Only shown to flagged users
      ) : (
        <LegacyCheckout />
      )}
    </div>
  );
}

// Gradual rollout:
// Day 1: 5% of users → new checkout
// Day 2: No errors → 25%
// Day 3: Conversion improved → 100%
// Day 4: Remove flag + old code
```

---

#### Deployment Strategies

| Strategy          | Description                      | Risk     | Best For                 |
| ----------------- | -------------------------------- | -------- | ------------------------ |
| **Big Bang**      | Full replacement                 | High     | Small apps, emergencies  |
| **Blue/Green**    | Two environments, instant switch | Medium   | Zero-downtime deploys    |
| **Canary**        | Gradual traffic shift            | Low      | Large traffic, high risk |
| **Feature Flags** | Code ships, feature hidden       | Very Low | Feature-level control    |

---

### 📋 Interview Question Bank

**Q1: What quality gates would you add to a frontend CI pipeline?**

> **Answer:** My essential gates: (1) TypeScript compilation — catch type errors; (2) ESLint — catch code quality issues and a11y violations; (3) Unit/integration tests — catch regressions; (4) Bundle size check (Bundlesize/Size Limit) — catch accidental dependency additions; (5) E2E tests on critical flows; (6) Lighthouse CI — catch performance regressions. Optional: visual regression (Chromatic/Percy), security scan (npm audit), dead code detection. The key is failing fast — type checking first (30s), tests second (2-5m), E2E last (10-15m).

---

**Q2: How do you implement zero-downtime frontend deployments?**

> **Answer:** For static frontends (SSG/CSR): atomic deploys to CDN — new files go up, then the index.html is updated atomically. Users on the old version continue until they refresh (old assets remain cached). For SSR: blue/green — two server pools, traffic shifts to green after health checks pass. For all: content-hashed filenames mean old bundles stay accessible at CDN indefinitely for users mid-session. The main risk is API backwards compatibility — deploy backend changes first, then frontend.

---

**Q3: How do you handle frontend rollbacks?**

> **Answer:** Fast rollback options: (1) **Git revert + re-deploy** — ~5 min for CI to run; (2) **Previous build artifact** — Vercel/Netlify keep previous deployments; promote instantly; (3) **Feature flag kill switch** — disable the problematic feature without redeploying; (4) **CDN rollback** — swap `index.html` to point to previous asset hash. For critical production incidents, I always choose the fastest option (feature flag or CDN rollback) to stop the bleeding, then do a proper revert+deploy as the permanent fix.

---

### 🧪 Case Study: CI/CD Maturity Journey at a 30-Person Startup

```
Stage 1 (0-6 months): Manual
  - Manual deployments from laptop
  - No tests
  - "It works on my machine"
  - Time to deploy: 30 min, frequent 3am rollbacks

Stage 2 (6-12 months): Basic CI
  - GitHub Actions: lint + test on PR
  - Vercel auto-deploy on merge
  - Time to deploy: 8 min
  - Production incidents: -40%

Stage 3 (12-18 months): Quality Gates
  - TypeScript strict mode added
  - Bundle size limits enforced
  - E2E tests for checkout + auth
  - Visual regression with Chromatic
  - Time to deploy: 12 min (more gates)
  - Production regressions: -75%

Stage 4 (18-24 months): Advanced
  - Feature flags (PostHog)
  - Canary deployments for major features
  - Lighthouse CI (budget enforced)
  - DORA metrics tracked
  - Deploy frequency: 8/day
  - Mean time to recover: 12 min
```

---

<a name="lesson-20"></a>

## Lesson 20 — Putting It All Together: Mock System Design Interview

### 🎯 Learning Objectives

- Apply all concepts to a realistic interview question
- Practice the RADIO framework end-to-end
- Understand how to score well in frontend system design interviews

---

### 📖 Interview Scoring Rubric

| Area              | What Interviewers Look For                                  |
| ----------------- | ----------------------------------------------------------- |
| **Requirements**  | Do you ask the right questions? Do you scope appropriately? |
| **Architecture**  | Is the component hierarchy clear? Are trade-offs explained? |
| **Data Model**    | Is the data model complete and realistic?                   |
| **Performance**   | Are you proactive about performance concerns?               |
| **Edge Cases**    | Error states, empty states, offline, a11y?                  |
| **Communication** | Can you explain trade-offs clearly? Do you think aloud?     |

---

### 🧪 Full Mock Interview: Design YouTube

**Interviewer:** "Design the YouTube frontend."

---

#### Step 1: Requirements Clarification (5 min)

**Candidate asks:**

- "Are we designing the full YouTube or a specific part? Let me assume the video watch page and homepage feed."
- "Do we need mobile app design or web only?" → Web only
- "How many concurrent users?" → 100M
- "Do we need offline support?" → No
- "Real-time features needed?" → Live chat for live streams
- "Is authentication required?" → Yes, for personalized feed

**Functional Requirements:**

- Homepage: personalized feed, trending
- Video page: playback, recommendations, comments, like/subscribe
- Search
- Live stream with chat

**Non-Functional Requirements:**

- LCP < 2.5s on homepage
- Video start time < 2s on 4G
- Comments: eventually consistent (< 5s)
- Live chat: real-time (< 500ms latency)

---

#### Step 2: High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│              Next.js Application                 │
│                                                  │
│  / (Homepage)          → SSR (personalized)      │
│  /watch?v=xxx          → SSR (SEO + meta tags)   │
│  /results?q=xxx        → SSR (SEO)               │
│  /live/xxx             → CSR (real-time)         │
└─────────────────────────────────────────────────┘
           ↕
┌──────────────────────────────────────────────────┐
│              External Services                    │
│  Video CDN (CloudFront)  → HLS adaptive streaming │
│  Recommendations API     → ML-based               │
│  Search API              → Elasticsearch          │
│  Comments API            → REST (paginated)        │
│  Live Chat               → WebSocket              │
│  Auth                    → OAuth2 + NextAuth       │
└──────────────────────────────────────────────────┘
```

---

#### Step 3: Component Design

```
WatchPage
├── VideoPlayer
│   ├── VideoElement (HLS via hls.js)
│   ├── PlayerControls (play/pause/volume/fullscreen)
│   ├── QualitySelector (adaptive, manual override)
│   └── ProgressBar (with chapter markers)
├── VideoInfo
│   ├── Title, ViewCount, PublishDate
│   ├── LikeButton (optimistic update)
│   └── SubscribeButton (optimistic update)
├── CommentSection
│   ├── CommentComposer
│   ├── CommentList (paginated, virtual scroll)
│   └── CommentCard (nested replies, lazy)
└── RecommendationSidebar
    └── VideoThumbnailCard[]

HomePage
├── Header (search, auth, nav)
├── CategoryPills (horizontal scroll)
├── FeedGrid
│   └── VideoCard[] (virtualized grid)
└── InfiniteScrollSentinel
```

---

#### Step 4: Data Model

```typescript
interface Video {
  id: string;
  title: string;
  description: string;
  thumbnails: { default: string; maxres: string };
  duration: number; // seconds
  viewCount: number;
  likeCount: number;
  channelId: string;
  publishedAt: string;
  hlsManifestUrl: string; // for adaptive streaming
  chapters: { title: string; startTime: number }[];
}

interface Comment {
  id: string;
  videoId: string;
  authorId: string;
  content: string;
  likeCount: number;
  publishedAt: string;
  replyCount: number;
  // replies fetched separately on expand
}

interface FeedItem {
  video: Pick<
    Video,
    "id" | "title" | "thumbnails" | "duration" | "viewCount" | "publishedAt"
  >;
  channel: { id: string; name: string; avatar: string };
  watchedPercent?: number; // for resume feature
}
```

---

#### Step 5: Key Design Decisions

**Video Streaming:**

- Use HLS (HTTP Live Streaming) with `hls.js`
- Adaptive bitrate: starts at low quality, upgrades as bandwidth allows
- Preload: `metadata` only (not full video) for fast start
- Prefetch next video in recommendations while current plays

**Feed Pagination:**

```tsx
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ["feed", { category }],
  queryFn: ({ pageParam }) => fetchFeed({ cursor: pageParam, category }),
  getNextPageParam: (lastPage) => lastPage.nextCursor,
});

// Virtual grid for performance (react-virtual)
// Intersection Observer for infinite scroll trigger
```

**Comments (Optimistic):**

```tsx
const postComment = useMutation({
  mutationFn: (content) => createComment({ videoId, content }),
  onMutate: async (content) => {
    // Optimistically add comment to top of list
    queryClient.setQueryData(
      ["comments", videoId],
      addOptimisticComment(content),
    );
  },
  onError: (err, vars, context) => {
    queryClient.setQueryData(["comments", videoId], context.previousComments);
    toast.error("Failed to post comment");
  },
});
```

**Live Chat:**

```tsx
// WebSocket with reconnection for live stream chat
const { lastMessage, sendMessage } = useWebSocket(
  `wss://live.youtube.com/${liveId}`,
);

// Limit DOM nodes — only show last 50 messages
// Virtual scroll for heavy chats (gaming streams: 10k msg/min)
```

---

#### Step 6: Performance & Edge Cases

| Concern                        | Solution                                               |
| ------------------------------ | ------------------------------------------------------ |
| Thumbnail LCP                  | Priority fetch, WebP, aspect-ratio CSS to prevent CLS  |
| Cold start on video page       | SSR so meta tags + initial frame exist in HTML         |
| Slow mobile connection         | Adaptive HLS starts at 144p                            |
| Comment section (10k comments) | Paginate, virtual scroll, load replies on demand       |
| Offline                        | Service Worker caches shell; video requires connection |
| Accessibility                  | Video player keyboard controls, captions (aria-live)   |
| Ad-blocker                     | Don't block critical requests with ad-adjacent naming  |

---

### 📋 Final Interview Question Bank (Advanced)

**Q1: How would you design the YouTube thumbnail system for performance?**

> **Answer:** Thumbnails are the biggest LCP contributor on the homepage. Key decisions: (1) Use `srcset` with multiple sizes (320w, 480w, 720w) — browser picks appropriate size; (2) WebP format with JPEG fallback; (3) Set explicit `width` and `height` attributes to prevent CLS; (4) Only the first 4-6 visible thumbnails load eagerly (`loading="eager"`, `fetchpriority="high"`); rest use `loading="lazy"`; (5) Pre-connect to the CDN domain (`<link rel="preconnect" href="//i.ytimg.com">`); (6) The thumbnail CDN URL is generated client-side from the video ID — no API call needed.

---

**Q2: How would you handle the YouTube recommendation system integration?**

> **Answer:** Recommendations are fetched server-side (SSR) for the initial 6 items (visible on load, SEO-friendly), then client-side via React Query for subsequent batches. The query key includes the current video ID and user context. I'd implement a prefetch strategy: as the user watches, pre-fetch the top recommendation so clicking feels instant. The recommendation API is eventually consistent — stale-while-revalidate is appropriate. If the API is slow, I'd show skeleton cards and progressively fill them in.

---

**Q3: Design the subscription button with offline support.**

> **Answer:** The Subscribe button uses optimistic updates — clicking immediately shows "Subscribed" state while the API call is in-flight. If the API fails, rollback and show an error toast. For offline: detect with `navigator.onLine`; if offline, show "Subscribe when online" tooltip and queue the action. On reconnect, Background Sync API replays queued subscriptions. The subscription state is stored in React Query cache, persisted to localStorage via `react-query-persist-client`, so the UI is consistent across page refreshes even before the API confirms.

---

## 🎓 Course Summary

### Skills You've Mastered

| Module        | Key Skills                                      |
| ------------- | ----------------------------------------------- |
| Foundations   | Requirements, RADIO framework, Architecture     |
| Components    | Design systems, composition patterns, APIs      |
| Data          | State management, fetching, caching             |
| Performance   | Core Web Vitals, code splitting, virtual scroll |
| Rendering     | CSR/SSR/SSG/ISR, streaming, hydration           |
| Styling       | CSS architecture, design tokens, theming        |
| Quality       | Testing trophy, CI/CD, observability            |
| Scale         | Micro-frontends, monorepos, real-time           |
| Security      | XSS/CSRF, CSP, auth patterns                    |
| Accessibility | WCAG, a11y testing, focus management            |

---

### 📚 Recommended Resources

| Resource                                                  | Type          | Focus                        |
| --------------------------------------------------------- | ------------- | ---------------------------- |
| [web.dev](https://web.dev)                                | Documentation | Performance, Core Web Vitals |
| [React Docs](https://react.dev)                           | Documentation | React patterns               |
| [TanStack Docs](https://tanstack.com)                     | Documentation | React Query, Router, Table   |
| [Kent C. Dodds Blog](https://kentcdodds.com)              | Blog          | Testing, React patterns      |
| [Josh W. Comeau](https://joshwcomeau.com)                 | Blog          | CSS, animations              |
| [Patterns.dev](https://patterns.dev)                      | Book/Site     | Design patterns              |
| [WCAG Quick Ref](https://www.w3.org/WAI/WCAG21/quickref/) | Reference     | Accessibility                |
| [GreatFrontEnd](https://greatfrontend.com)                | Practice      | Frontend system design       |

---

### 🏆 Interview Preparation Checklist

```
Week 1: Foundations
  □ Practice RADIO framework on 5 different products
  □ Draw architecture diagrams without looking at notes
  □ Explain trade-offs for: SSR vs CSR, REST vs GraphQL

Week 2: Deep Dives
  □ Code: implement useWebSocket with reconnection
  □ Code: implement virtual scroll from scratch
  □ Code: set up React Query with optimistic updates
  □ Code: write integration tests with MSW

Week 3: Mock Interviews
  □ Design: Twitter Feed
  □ Design: Airbnb Search Results
  □ Design: Google Docs
  □ Design: Uber Real-time Map
  □ Record yourself, review for clarity and structure

Week 4: Polish
  □ Review all case studies
  □ Practice explaining trade-offs in 30 seconds
  □ Prepare your own projects' architectural decisions
  □ Read OWASP top 10 for frontend
```

---

> Remember: The goal isn't to have all the answers — it's to demonstrate structured thinking, awareness of trade-offs, and genuine engineering judgment.

---

---
