# TypeScript for JavaScript Developers

### A Practical Course with Real-World Examples

> **Who is this for?** If you already know JavaScript and want to understand _why_ TypeScript exists and _how_ it makes your code safer, faster to debug, and easier to scale — this course is for you.

---

## Table of Contents

1. [Why TypeScript? The Problem with JavaScript](#1-why-typescript-the-problem-with-javascript)
2. [Setting Up TypeScript](#2-setting-up-typescript)
3. [Basic Types — Your First Safety Net](#3-basic-types--your-first-safety-net)
4. [Type Inference — TypeScript Reads Your Mind](#4-type-inference--typescript-reads-your-mind)
5. [Interfaces vs Types](#5-interfaces-vs-types)
6. [Functions in TypeScript](#6-functions-in-typescript)
7. [Union & Intersection Types](#7-union--intersection-types)
8. [Generics — Write Once, Use Everywhere](#8-generics--write-once-use-everywhere)
9. [Classes in TypeScript](#9-classes-in-typescript)
10. [Enums](#10-enums)
11. [Type Narrowing & Type Guards](#11-type-narrowing--type-guards)
12. [Utility Types — TypeScript's Built-in Superpowers](#12-utility-types--typescripts-built-in-superpowers)
13. [Modules & Declaration Files](#13-modules--declaration-files)
14. [Real-World Project: Typed API Layer](#14-real-world-project-typed-api-layer)

---

## 1. Why TypeScript? The Problem with JavaScript

JavaScript is **dynamically typed** — meaning variables can hold any value, and types are checked at **runtime**, not before your code runs.

This leads to real bugs in production.

### The Classic JS Bug

```javascript
// JavaScript — no errors until runtime
function getFullName(user) {
  return user.firstName + " " + user.lastName;
}

getFullName({ firstName: "Ali" });
// Returns: "Ali undefined"
// No error thrown — but the output is WRONG
```

You only discover this when a user sees "Ali undefined" on the screen.

### The TypeScript Fix

```typescript
// TypeScript — error caught BEFORE running
interface User {
  firstName: string;
  lastName: string;
}

function getFullName(user: User): string {
  return user.firstName + " " + user.lastName;
}

getFullName({ firstName: "Ali" });
// ❌ ERROR: Property 'lastName' is missing
// You fix it in your editor, not in production
```

### Real-World Scenario: The $1M Bug

Imagine you're building an e-commerce checkout:

```javascript
// JavaScript
function calculateTotal(price, taxRate) {
  return price + price * taxRate;
}

// Called by a junior dev somewhere in the codebase
calculateTotal("199.99", 0.1); // Returns "199.990.1" — string concatenation!
// Order gets processed with wrong total
```

```typescript
// TypeScript
function calculateTotal(price: number, taxRate: number): number {
  return price + price * taxRate;
}

calculateTotal("199.99", 0.1);
// ❌ ERROR: Argument of type 'string' is not assignable to parameter of type 'number'
// The bug never reaches production
```

> **Key Insight:** TypeScript is a **superset of JavaScript**. Every valid JS file is valid TS. You can adopt it gradually.

---

## 2. Setting Up TypeScript

### Installation

```bash
# Install TypeScript globally
npm install -g typescript

# Or locally in a project
npm install --save-dev typescript

# Check version
tsc --version
```

### Initialize a Project

```bash
mkdir my-ts-project && cd my-ts-project
npm init -y
npx tsc --init
```

This creates a `tsconfig.json` — the config file for your TypeScript project.

### Essential tsconfig.json Settings

```json
{
  "compilerOptions": {
    "target": "ES2020", // JS version to compile to
    "module": "commonjs", // Module system (Node.js)
    "strict": true, // Enable ALL strict type checks — ALWAYS use this
    "outDir": "./dist", // Where compiled JS goes
    "rootDir": "./src", // Where your TS files live
    "esModuleInterop": true, // Better import compatibility
    "resolveJsonModule": true // Import JSON files
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Compile and Run

```bash
# Compile TypeScript to JavaScript
tsc

# Run compiled output
node dist/index.js

# Or use ts-node for development (no compilation step)
npm install -D ts-node
npx ts-node src/index.ts
```

---

## 3. Basic Types — Your First Safety Net

### Primitive Types

```typescript
// JavaScript has these types too — TS just makes them explicit
let username: string = "Ali Hassan";
let age: number = 28;
let isVerified: boolean = true;
let profilePicture: null = null;
let sessionToken: undefined = undefined;
```

### Arrays

```typescript
// Two equivalent syntaxes
let scores: number[] = [95, 87, 100];
let tags: Array<string> = ["typescript", "javascript", "webdev"];

// ❌ This would be caught immediately
scores.push("hello");
// ERROR: Argument of type 'string' is not assignable to parameter of type 'number'
```

### Tuples — Fixed-Length Arrays

```typescript
// Real-world: [latitude, longitude] coordinates
let coordinates: [number, number] = [24.8607, 67.0011]; // Karachi

// Real-world: CSV row where columns have known positions
type CsvRow = [string, number, boolean]; // [name, age, isActive]
let row: CsvRow = ["Alice", 30, true];

// ❌ Wrong order caught
let badRow: CsvRow = [30, "Alice", true]; // ERROR
```

### The `any` Type — The Escape Hatch (Use Sparingly)

```typescript
// any turns off type checking — avoid unless absolutely necessary
let data: any = fetchFromLegacyAPI();
data.whatever.you.want; // No errors — but no safety either

// Better alternative: `unknown`
let safeData: unknown = fetchFromLegacyAPI();
safeData.whatever; // ❌ ERROR — must narrow type first (see Type Narrowing section)
```

### `void` and `never`

```typescript
// void — function returns nothing
function logMessage(msg: string): void {
  console.log(msg);
  // No return statement needed
}

// never — function never returns (throws or infinite loop)
function throwError(message: string): never {
  throw new Error(message);
}
```

---

## 4. Type Inference — TypeScript Reads Your Mind

You don't always need to annotate types. TypeScript is smart enough to infer them.

```typescript
// TypeScript INFERS these types automatically
let city = "Karachi"; // inferred as string
let population = 14910352; // inferred as number
let isCapital = false; // inferred as boolean

city = 42; // ❌ ERROR — TypeScript knows city should be string
```

### Inference in Functions

```typescript
// Return type is inferred as number
function add(a: number, b: number) {
  return a + b; // TypeScript knows this is number + number = number
}

const result = add(5, 10); // result is inferred as number
result.toUpperCase(); // ❌ ERROR — numbers don't have toUpperCase
```

### When to Annotate vs When to Let TypeScript Infer

```typescript
// ✅ Let TypeScript infer — it's obvious
const name = "Alice";
const numbers = [1, 2, 3];

// ✅ Annotate — when the type isn't obvious, or for documentation
function parseUserFromAPI(rawData: unknown): User {
  // ...
}

// ✅ Annotate function parameters — TypeScript can't infer these
function greet(name: string) {
  return `Hello, ${name}`;
}
```

---

## 5. Interfaces vs Types

Both define the shape of an object. Here's when to use each.

### Interface — For Object Shapes (Preferred)

```typescript
// Real-world: defining a Product in an e-commerce app
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  imageUrl?: string; // Optional property — the ? makes it optional
}

const laptop: Product = {
  id: "prod_001",
  name: "MacBook Pro",
  price: 299999, // in PKR
  category: "Electronics",
  inStock: true,
  // imageUrl is optional — no error if omitted
};
```

### Type Alias — More Flexible

```typescript
// Types can represent primitives, unions, tuples — not just objects
type UserId = string;
type Status = "active" | "inactive" | "banned";
type Coordinates = [number, number];

// Object type alias
type Address = {
  street: string;
  city: string;
  country: string;
};
```

### Interface Extension — Building on Existing Shapes

```typescript
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// User extends BaseEntity — gets all 3 base fields
interface User extends BaseEntity {
  name: string;
  email: string;
  role: "admin" | "customer";
}

// Order also extends BaseEntity
interface Order extends BaseEntity {
  userId: string;
  total: number;
  status: "pending" | "shipped" | "delivered";
}

// Now every User and Order automatically has id, createdAt, updatedAt
```

### Interface Merging — Extending Third-Party Types

```typescript
// Real-world: Adding custom fields to Express Request
// This is called "declaration merging" — only interfaces support this

// Normally Express's Request doesn't have a `user` property
// We can extend it globally
declare global {
  namespace Express {
    interface Request {
      user?: User; // Now req.user is typed in all your route handlers!
    }
  }
}
```

### Interface vs Type — Quick Rule

| Use Case            | Interface         | Type             |
| ------------------- | ----------------- | ---------------- |
| Object shapes       | ✅ Preferred      | ✅ Works         |
| Union types         | ❌ Can't          | ✅ Required      |
| Tuple types         | ❌ Can't          | ✅ Required      |
| Declaration merging | ✅ Supported      | ❌ Not supported |
| Extending           | `extends` keyword | `&` intersection |

---

## 6. Functions in TypeScript

### Parameter and Return Types

```typescript
// Basic typed function
function formatCurrency(amount: number, currency: string): string {
  return `${currency} ${amount.toLocaleString()}`;
}

formatCurrency(15000, "PKR"); // "PKR 15,000"
```

### Optional & Default Parameters

```typescript
// Optional parameter with ?
function createSlug(title: string, separator?: string): string {
  const sep = separator ?? "-"; // default to "-" if not provided
  return title.toLowerCase().replace(/\s+/g, sep);
}

createSlug("Hello World"); // "hello-world"
createSlug("Hello World", "_"); // "hello_world"

// Default parameter
function paginate(items: number, perPage: number = 10): number {
  return Math.ceil(items / perPage);
}

paginate(95); // 10 pages (using default 10 per page)
paginate(95, 20); // 5 pages
```

### Function Overloads — Real-World Use Case

```typescript
// Real-world: A search function that can take different argument types

// Overload signatures
function findUser(id: number): User;
function findUser(email: string): User;
function findUser(query: number | string): User {
  if (typeof query === "number") {
    return db.users.findById(query);
  } else {
    return db.users.findByEmail(query);
  }
}

findUser(42); // ✅ Finds by ID
findUser("ali@example.com"); // ✅ Finds by email
findUser(true); // ❌ ERROR — no overload for boolean
```

### Higher-Order Functions

```typescript
// Typed callbacks
function fetchData<T>(
  url: string,
  onSuccess: (data: T) => void,
  onError: (error: Error) => void,
): void {
  fetch(url)
    .then((res) => res.json())
    .then((data) => onSuccess(data as T))
    .catch(onError);
}

// Usage
fetchData<User[]>(
  "/api/users",
  (users) => console.log(users[0].name), // users is typed as User[]
  (error) => console.error(error.message),
);
```

---

## 7. Union & Intersection Types

### Union Types — "This OR That"

```typescript
// Real-world: An ID can be a number or string
type ID = number | string;

function printId(id: ID) {
  // TypeScript forces you to handle both cases
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(0));
  }
}

printId(101); // Works
printId("user_abc"); // Works
printId(true); // ❌ ERROR
```

### Discriminated Unions — The Most Powerful Pattern

This is one of the most important TypeScript patterns for real apps.

```typescript
// Real-world: API response can be success or error

type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "error"; message: string; code: number };

function handleResponse(response: ApiResponse<User[]>) {
  if (response.status === "success") {
    // TypeScript KNOWS data exists here
    console.log(response.data[0].name);
  } else {
    // TypeScript KNOWS message and code exist here
    console.error(`Error ${response.code}: ${response.message}`);
  }
}
```

### Intersection Types — "This AND That"

```typescript
// Combining multiple types together
type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};

type Auditable = {
  createdBy: string;
  updatedBy: string;
};

// A DatabaseRecord has ALL properties from both types
type DatabaseRecord = Timestamps & Auditable;

const record: DatabaseRecord = {
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: "admin",
  updatedBy: "user_123",
};
```

---

## 8. Generics — Write Once, Use Everywhere

Generics let you write reusable, type-safe code that works with multiple types.

### The Problem Without Generics

```typescript
// Without generics — you'd need a function for each type
function getFirstNumber(arr: number[]): number {
  return arr[0];
}
function getFirstString(arr: string[]): string {
  return arr[0];
}
// This is repetitive and doesn't scale
```

### Generics to the Rescue

```typescript
// One function works for ALL types
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const firstNum = getFirst([1, 2, 3]); // TypeScript infers T = number
const firstStr = getFirst(["a", "b", "c"]); // TypeScript infers T = string
const firstUser = getFirst(users); // T = User

// No type info lost — firstNum is number, not any
firstNum.toFixed(2); // ✅
firstStr.toUpperCase(); // ✅
```

### Generic Constraints — "T must have these properties"

```typescript
// Real-world: A function that sorts objects by a field

interface Sortable {
  id: number;
}

function sortById<T extends Sortable>(items: T[]): T[] {
  return [...items].sort((a, b) => a.id - b.id);
}

sortById(users); // ✅ Works — User has id
sortById([1, 2, 3]); // ❌ ERROR — numbers don't have .id
```

### Generic Interfaces — Real-World API Pattern

```typescript
// Real-world: Typed paginated API response
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  hasNextPage: boolean;
}

// Reused for ANY resource
type UserListResponse = PaginatedResponse<User>;
type ProductListResponse = PaginatedResponse<Product>;
type OrderListResponse = PaginatedResponse<Order>;

async function getUsers(page: number): Promise<PaginatedResponse<User>> {
  const res = await fetch(`/api/users?page=${page}`);
  return res.json();
}

const response = await getUsers(1);
response.data[0].name; // ✅ TypeScript knows .name exists
response.data[0].price; // ❌ ERROR — User doesn't have price
```

### Generic React Component (Bonus)

```tsx
// Real-world: A typed SelectDropdown component
interface SelectProps<T> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  getLabel: (item: T) => string;
}

function Select<T>({ options, value, onChange, getLabel }: SelectProps<T>) {
  return (
    <select onChange={(e) => onChange(options[Number(e.target.value)])}>
      {options.map((option, index) => (
        <option key={index} value={index} selected={option === value}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  );
}

// Fully typed — TypeScript knows the type flows through correctly
<Select<User>
  options={users}
  value={selectedUser}
  onChange={setSelectedUser}
  getLabel={(user) => user.name}
/>;
```

---

## 9. Classes in TypeScript

TypeScript adds access modifiers and other features to JavaScript classes.

### Access Modifiers

```typescript
class BankAccount {
  // public — accessible everywhere (default)
  public accountNumber: string;

  // private — only accessible inside this class
  private balance: number;

  // protected — accessible in this class AND subclasses
  protected ownerId: string;

  // readonly — can only be set in constructor
  readonly createdAt: Date;

  constructor(accountNumber: string, ownerId: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.ownerId = ownerId;
    this.balance = initialBalance;
    this.createdAt = new Date();
  }

  public deposit(amount: number): void {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.balance += amount;
  }

  public getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount("PK123", "user_001", 50000);
account.deposit(10000);
account.getBalance(); // ✅ 60000
account.balance; // ❌ ERROR — private
account.createdAt = new Date(); // ❌ ERROR — readonly
```

### Constructor Shorthand

```typescript
// The verbose way
class User {
  public name: string;
  public email: string;
  private password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

// The TypeScript shorthand — same result, less code
class User {
  constructor(
    public name: string,
    public email: string,
    private password: string,
  ) {}
}
```

### Abstract Classes

```typescript
// Real-world: Payment gateway with multiple providers

abstract class PaymentGateway {
  abstract charge(amount: number, currency: string): Promise<string>;
  abstract refund(transactionId: string): Promise<boolean>;

  // Shared logic for all gateways
  protected formatAmount(amount: number): string {
    return (amount / 100).toFixed(2);
  }
}

class StripeGateway extends PaymentGateway {
  async charge(amount: number, currency: string): Promise<string> {
    // Stripe-specific implementation
    const response = await stripe.charges.create({ amount, currency });
    return response.id;
  }

  async refund(transactionId: string): Promise<boolean> {
    await stripe.refunds.create({ charge: transactionId });
    return true;
  }
}

class JazzCashGateway extends PaymentGateway {
  async charge(amount: number, currency: string): Promise<string> {
    // JazzCash-specific implementation
    // ...
    return "jc_txn_001";
  }

  async refund(transactionId: string): Promise<boolean> {
    // ...
    return true;
  }
}

// Can't instantiate abstract class directly
const gateway = new PaymentGateway(); // ❌ ERROR
const stripe = new StripeGateway(); // ✅
```

---

## 10. Enums

Enums represent a set of named constants — much more readable than magic strings or numbers.

### String Enums (Recommended)

```typescript
// Real-world: Order status in an e-commerce system
enum OrderStatus {
  Pending = "PENDING",
  Confirmed = "CONFIRMED",
  Processing = "PROCESSING",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
  Cancelled = "CANCELLED",
  Refunded = "REFUNDED",
}

function updateOrderStatus(orderId: string, status: OrderStatus): void {
  // ...
}

updateOrderStatus("ord_001", OrderStatus.Shipped); // ✅ Clear and type-safe
updateOrderStatus("ord_001", "shipped"); // ❌ ERROR — must use enum
updateOrderStatus("ord_001", "DISPATCHED"); // ❌ ERROR — not a valid status
```

### Const Enums — For Performance

```typescript
// const enums are inlined at compile time — no runtime object created
const enum HttpStatus {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500,
}

function handleStatus(status: HttpStatus) {
  if (status === HttpStatus.NotFound) {
    // Compiled to: if (status === 404) — no enum object overhead
  }
}
```

### Alternative: Union of Literals (Modern Preference)

```typescript
// Many modern TS codebases prefer this over enums
type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

// Pros: simpler, serializes naturally to JSON
// Cons: no autocomplete grouping like enums provide
```

---

## 11. Type Narrowing & Type Guards

TypeScript can "narrow" a broad type into a specific one inside a block of code.

### `typeof` Narrowing

```typescript
function processInput(input: string | number) {
  if (typeof input === "string") {
    // TypeScript knows input is string here
    return input.trim().toUpperCase();
  } else {
    // TypeScript knows input is number here
    return input.toFixed(2);
  }
}
```

### `instanceof` Narrowing

```typescript
function handleError(error: unknown) {
  if (error instanceof Error) {
    // TypeScript knows error is Error here
    console.error(error.message);
    console.error(error.stack);
  } else {
    console.error("Unknown error:", error);
  }
}
```

### Custom Type Guards — Real-World Pattern

```typescript
// Real-world: Validating API responses

interface AdminUser {
  role: "admin";
  adminLevel: number;
  canDeleteUsers: boolean;
}

interface RegularUser {
  role: "customer";
  loyaltyPoints: number;
}

type AppUser = AdminUser | RegularUser;

// Custom type guard — the "is" keyword tells TypeScript what we've checked
function isAdmin(user: AppUser): user is AdminUser {
  return user.role === "admin";
}

function renderDashboard(user: AppUser) {
  if (isAdmin(user)) {
    // TypeScript knows this is AdminUser
    console.log(`Admin level: ${user.adminLevel}`);
    if (user.canDeleteUsers) {
      renderDeleteButton();
    }
  } else {
    // TypeScript knows this is RegularUser
    console.log(`Loyalty points: ${user.loyaltyPoints}`);
  }
}
```

### Exhaustive Checks with `never`

```typescript
// Real-world: Ensuring you handle all cases in a switch

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return 0.5 * shape.base * shape.height;
    default:
      // This line ensures you handle ALL cases
      // If you add a new Shape variant and forget to handle it,
      // TypeScript gives an error HERE instead of silently failing
      const exhaustiveCheck: never = shape;
      throw new Error(`Unhandled shape: ${exhaustiveCheck}`);
  }
}
```

---

## 12. Utility Types — TypeScript's Built-in Superpowers

These built-in types transform and manipulate other types without rewriting them.

### `Partial<T>` — All Properties Optional

```typescript
interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  website: string;
}

// Real-world: Update endpoint — user might only change some fields
async function updateProfile(
  userId: string,
  updates: Partial<UserProfile>, // All fields are now optional
): Promise<UserProfile> {
  return db.users.update(userId, updates);
}

// Valid — user only changed their bio
updateProfile("user_001", { bio: "Full-stack developer" });
```

### `Required<T>` — All Properties Mandatory

```typescript
interface DraftPost {
  title?: string;
  content?: string;
  tags?: string[];
}

// When publishing, all fields must exist
function publishPost(post: Required<DraftPost>) {
  // title, content, tags are all required here
}
```

### `Pick<T, K>` — Select Specific Fields

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

// Real-world: Public API response should NEVER include passwordHash
type PublicUser = Pick<User, "id" | "name" | "email">;
// Type is: { id: string; name: string; email: string }

function getPublicProfile(userId: string): PublicUser {
  const user = db.users.find(userId);
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    // passwordHash is excluded — can't accidentally return it
  };
}
```

### `Omit<T, K>` — Exclude Specific Fields

```typescript
// Opposite of Pick — exclude fields instead of selecting them

// Real-world: CreateUser request shouldn't have id (server generates it)
type CreateUserDto = Omit<User, "id" | "createdAt">;
// Type is: { name: string; email: string; passwordHash: string }

async function createUser(data: CreateUserDto): Promise<User> {
  return db.users.create({
    ...data,
    id: generateId(),
    createdAt: new Date(),
  });
}
```

### `Record<K, V>` — Typed Key-Value Maps

```typescript
// Real-world: Config map, translations, route definitions

type SupportedLanguage = "en" | "ur" | "ar";

const translations: Record<SupportedLanguage, string> = {
  en: "Welcome",
  ur: "خوش آمدید",
  ar: "مرحبًا",
};

// TypeScript ensures ALL languages have a translation
translations.en; // ✅
translations.fr; // ❌ ERROR — 'fr' is not a valid key
```

### `ReturnType<T>` — Extract Return Type of a Function

```typescript
async function fetchCurrentUser() {
  const res = await fetch("/api/me");
  return res.json() as Promise<User>;
}

// Instead of duplicating the return type, infer it
type CurrentUser = Awaited<ReturnType<typeof fetchCurrentUser>>;
// CurrentUser is: User
```

### `NonNullable<T>` — Remove null and undefined

```typescript
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>; // string

function processEmail(email: string | null | undefined) {
  const safeEmail: NonNullable<typeof email> = email ?? "default@example.com";
  // safeEmail is now string — can use string methods safely
  return safeEmail.toLowerCase();
}
```

---

## 13. Modules & Declaration Files

### Importing and Exporting

```typescript
// types.ts — shared types across your app
export interface User {
  id: string;
  name: string;
  email: string;
}

export type ApiResponse<T> = {
  data: T;
  status: number;
};

// userService.ts
import type { User, ApiResponse } from "./types"; // `import type` is a best practice

export async function getUser(id: string): Promise<ApiResponse<User>> {
  const res = await fetch(`/api/users/${id}`);
  const data = await res.json();
  return { data, status: res.status };
}
```

### Declaration Files (`.d.ts`) — Typing Untyped Libraries

When you use a library without TypeScript support, you can add types:

```typescript
// types/legacy-library.d.ts

declare module "legacy-analytics" {
  export function track(
    event: string,
    properties?: Record<string, unknown>,
  ): void;
  export function identify(
    userId: string,
    traits?: Record<string, unknown>,
  ): void;
  export function page(name: string): void;
}

// Now you can use the library with types
import analytics from "legacy-analytics";
analytics.track("button_clicked", { buttonId: "checkout" }); // ✅ Typed
```

### Using `@types` Packages

Most popular libraries have type definitions:

```bash
npm install --save-dev @types/node
npm install --save-dev @types/express
npm install --save-dev @types/lodash
```

Modern libraries like `axios`, `zod`, `prisma` ship with types built-in — no `@types` needed.

---

## 14. Real-World Project: Typed API Layer

Let's put it all together. Here's a complete, typed service layer for an e-commerce app.

### `types/index.ts`

```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: Date;
}

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; code: number };

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  hasMore: boolean;
}
```

### `services/api.ts`

```typescript
import type { Product, Order, ApiResponse, PaginatedResponse } from "../types";

const BASE_URL = "https://api.myshop.com";

class ApiError extends Error {
  constructor(
    public code: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const json: ApiResponse<T> = await res.json();

  if (!json.success) {
    throw new ApiError(json.code, json.error);
  }

  return json.data;
}

// Products API
export const ProductsService = {
  async getAll(page: number = 1): Promise<PaginatedResponse<Product>> {
    return request<PaginatedResponse<Product>>(`/products?page=${page}`);
  },

  async getById(id: string): Promise<Product> {
    return request<Product>(`/products/${id}`);
  },

  async search(query: string): Promise<Product[]> {
    return request<Product[]>(
      `/products/search?q=${encodeURIComponent(query)}`,
    );
  },
};

// Orders API
export const OrdersService = {
  async create(
    items: Array<{ productId: string; quantity: number }>,
    userId: string,
  ): Promise<Order> {
    return request<Order>("/orders", {
      method: "POST",
      body: JSON.stringify({ items, userId }),
    });
  },

  async getById(orderId: string): Promise<Order> {
    return request<Order>(`/orders/${orderId}`);
  },

  async getByUser(userId: string): Promise<Order[]> {
    return request<Order[]>(`/users/${userId}/orders`);
  },
};
```

### `hooks/useProducts.ts` (React)

```typescript
import { useState, useEffect } from "react";
import { ProductsService } from "../services/api";
import type { Product } from "../types";

interface UseProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(page: number = 1): UseProductsState {
  const [state, setState] = useState<UseProductsState>({
    products: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    ProductsService.getAll(page)
      .then((response) => {
        setState({
          products: response.data,
          loading: false,
          error: null,
        });
      })
      .catch((err) => {
        setState({
          products: [],
          loading: false,
          error: err instanceof Error ? err.message : "Unknown error",
        });
      });
  }, [page]);

  return state;
}
```

### `components/ProductCard.tsx` (React)

```tsx
import type { Product, CartItem } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const handleAddToCart = () => {
    // TypeScript ensures this CartItem has the correct shape
    onAddToCart({
      product,
      quantity: 1,
    });
  };

  return (
    <div className="product-card">
      {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
      <h3>{product.name}</h3>
      <p>PKR {product.price.toLocaleString()}</p>
      <p className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
      </p>
      <button onClick={handleAddToCart} disabled={product.stock === 0}>
        Add to Cart
      </button>
    </div>
  );
}
```

---

## Summary: JavaScript vs TypeScript — Key Differences

| Feature            | JavaScript    | TypeScript             |
| ------------------ | ------------- | ---------------------- |
| Type checking      | Runtime       | Compile time           |
| Bugs caught        | In production | In your editor         |
| Autocomplete       | Limited       | Full, context-aware    |
| Refactoring        | Risky         | Safe — find all usages |
| Team collaboration | Error-prone   | Self-documenting       |
| Learning curve     | Lower         | Moderate               |
| Setup required     | None          | `tsc --init`           |

---

## What to Learn Next

Once you're comfortable with everything in this course:

1. **Zod** — Runtime schema validation that integrates with TypeScript types
2. **tRPC** — End-to-end type safety from backend to frontend
3. **Prisma** — Fully typed database ORM
4. **TypeScript with React** — `useRef`, `forwardRef`, `Context` typing patterns
5. **Advanced Types** — Conditional types, mapped types, template literal types

---

> **Final Thought:** TypeScript doesn't slow you down — it speeds you up by catching bugs before they become production incidents. The initial setup cost pays back tenfold in the size and complexity of the codebase you can confidently maintain.
