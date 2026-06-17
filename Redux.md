# 🔄 Redux & Redux Toolkit — The Complete Guide

> **Prerequisites:** JavaScript (ES6+), React basics, ideally Context API knowledge.  
> **Version:** Redux Toolkit (RTK) — the modern, official way to write Redux.  
> **Goal:** Understand Redux deeply, write it professionally, and ace interviews.

---

## 📖 Table of Contents

1. [Why Redux Exists — The Problem](#1-why-redux-exists--the-problem)
2. [Core Redux Concepts — The Mental Model](#2-core-redux-concepts--the-mental-model)
3. [The Three Principles of Redux](#3-the-three-principles-of-redux)
4. [Vanilla Redux (The Hard Way — Know This for Interviews)](#4-vanilla-redux-the-hard-way--know-this-for-interviews)
5. [Redux Toolkit (The Right Way)](#5-redux-toolkit-the-right-way)
6. [createSlice — The Heart of RTK](#6-createslice--the-heart-of-rtk)
7. [configureStore — Setting Up the Store](#7-configurestore--setting-up-the-store)
8. [React-Redux — Connecting to Components](#8-react-redux--connecting-to-components)
9. [Async Actions — createAsyncThunk](#9-async-actions--createasyncthunk)
10. [RTK Query — Data Fetching & Caching](#10-rtk-query--data-fetching--caching)
11. [Selectors & Reselect — Derived State](#11-selectors--reselect--derived-state)
12. [Middleware](#12-middleware)
13. [Redux DevTools](#13-redux-devtools)
14. [Real-World Example — Full E-Commerce Store](#14-real-world-example--full-e-commerce-store)
15. [Redux vs Context API vs Zustand](#15-redux-vs-context-api-vs-zustand)
16. [Common Patterns & Best Practices](#16-common-patterns--best-practices)
17. [Common Mistakes](#17-common-mistakes)
18. [Interview Questions & Answers](#18-interview-questions--answers)
19. [Quick Reference Cheatsheet](#19-quick-reference-cheatsheet)

---

## 1. Why Redux Exists — The Problem

### The Problem at Scale

React's built-in state management (useState, useContext) works great for small apps. But as apps grow:

```
Small App:        Medium App:           Large App:

  App               App                   App
  └─ Page           ├─ Navbar             ├─ Navbar (needs user, cart)
      └─ Card       ├─ Sidebar            ├─ Sidebar (needs user, settings)
                    └─ Content            ├─ Content
                        └─ Card               ├─ ProductList (needs cart, wishlist)
                                              ├─ Cart (needs cart, user, promo)
                                              ├─ Checkout (needs cart, user, address)
                                              └─ Profile (needs user, orders, settings)
```

As apps grow, you end up with:

- **Prop drilling** through 5+ levels
- **Duplicate state** in multiple components
- **Sync problems** — two places update the same data differently
- **"Who changed this?"** — impossible to trace bugs
- **Shared state** across completely unrelated components

### What Redux Promises

```
Without Redux:                    With Redux:

Component A ──→ State A           Component A ──→ Dispatch Action
Component B ──→ State B                 ↓
                                  Redux Store (single source of truth)
A wants B's state? Props!               ↓
B wants A's state? Lift up!       Component A ← Subscribe
A and B get out of sync? 💀       Component B ← Subscribe
                                  Component C ← Subscribe (no prop drilling!)
```

Redux gives you a **single source of truth** — one central store for all your app's state, with predictable, traceable updates.

---

## 2. Core Redux Concepts — The Mental Model

Before writing a single line of code, understand these five concepts:

### The Bank Analogy 🏦

Think of Redux like a bank:

| Redux        | Bank                                                    |
| ------------ | ------------------------------------------------------- |
| **Store**    | The bank vault (holds all the money/state)              |
| **State**    | The money in the vault                                  |
| **Action**   | A withdrawal/deposit slip (describes what you want)     |
| **Reducer**  | The bank teller (processes the slip, updates the vault) |
| **Dispatch** | Submitting the slip to the teller                       |
| **Selector** | Checking your account balance (reading from the vault)  |

### The Flow — One-Way Data

```
┌─────────────┐
│  Component  │  ← useSelector reads state from store
└──────┬──────┘
       │
       │ useDispatch → dispatch(action)
       ↓
┌─────────────┐
│   Action    │  { type: 'cart/addItem', payload: { id: 1, name: 'Shoes' } }
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Reducer   │  Pure function: (currentState, action) → newState
└──────┬──────┘
       │
       ↓
┌─────────────┐
│    Store    │  State updated! All subscribers notified.
└─────────────┘
       │
       └──────── Component re-renders with new state
```

This is **unidirectional data flow** — data only moves in one direction. This makes bugs easy to trace.

### The Five Pillars

```
1. ACTION     → Plain object describing what happened
               { type: 'user/login', payload: { name: 'Ahmed' } }

2. ACTION     → Function that creates an action
   CREATOR      const login = (user) => ({ type: 'user/login', payload: user })

3. REDUCER    → Pure function: takes current state + action, returns new state
               (state, action) => newState   ← NEVER mutates state!

4. STORE      → Holds the entire state tree
               Created with configureStore({ reducer: { ... } })

5. DISPATCH   → The only way to trigger a state change
               store.dispatch({ type: 'user/login', payload: user })
```

---

## 3. The Three Principles of Redux

These are foundational — interviewers love asking about them.

### Principle 1: Single Source of Truth

```js
// The entire state of your app lives in ONE store
store.getState()
// Returns:
{
  auth: { user: null, isLoggedIn: false },
  cart: { items: [], total: 0 },
  products: { list: [], loading: false },
  ui: { theme: 'dark', sidebarOpen: false }
}
// One object. One store. Everything in one place.
```

**Why:** Easier debugging, server-side rendering, and state persistence.

### Principle 2: State is Read-Only

```js
// ❌ NEVER do this — direct mutation is forbidden
store.getState().cart.items.push(newItem);
store.getState().auth.user = { name: "Ahmed" };

// ✅ The ONLY way to change state is to dispatch an action
store.dispatch({ type: "cart/addItem", payload: newItem });
store.dispatch({ type: "auth/setUser", payload: { name: "Ahmed" } });
```

**Why:** Ensures every state change is intentional, traceable, and recorded.

### Principle 3: Changes are Made with Pure Functions (Reducers)

```js
// ✅ Pure reducer — same input always gives same output
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "cart/addItem":
      // Return NEW state — don't mutate existing state!
      return { ...state, items: [...state.items, action.payload] };
    default:
      return state;
  }
}

// ❌ Impure reducer — breaks Redux
function badReducer(state = initialState, action) {
  state.items.push(action.payload); // MUTATION! Never do this.
  return state; // Returns same reference — React won't re-render!
}
```

**Why:** Pure functions are predictable, testable, and enable time-travel debugging.

---

## 4. Vanilla Redux (The Hard Way — Know This for Interviews)

Understanding vanilla Redux helps you understand WHY Redux Toolkit exists.

```bash
npm install redux react-redux
```

```js
// store.js — VANILLA REDUX (the old painful way)

// --- Action Types ---
// Strings as constants to avoid typos
const ADD_TODO = "todos/add";
const TOGGLE_TODO = "todos/toggle";
const DELETE_TODO = "todos/delete";
const SET_FILTER = "filter/set";

// --- Action Creators ---
const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { id: Date.now(), text, completed: false },
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

// --- Initial State ---
const initialTodoState = { items: [] };
const initialFilterState = { value: "all" }; // 'all' | 'active' | 'completed'

// --- Reducers ---
// ⚠️ Must be pure: no mutations, no side effects, no API calls

function todosReducer(state = initialTodoState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case TOGGLE_TODO:
      return {
        ...state,
        items: state.items.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case DELETE_TODO:
      return {
        ...state,
        items: state.items.filter((todo) => todo.id !== action.payload),
      };

    default:
      return state; // ← Always return current state for unknown actions!
  }
}

function filterReducer(state = initialFilterState, action) {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, value: action.payload };
    default:
      return state;
  }
}

// --- Combine Reducers ---
import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
});

// --- Create Store ---
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__?.(), // DevTools (manual!)
);

export default store;
export { addTodo, toggleTodo, deleteTodo, setFilter };
```

```jsx
// App.jsx — Connecting vanilla Redux to React
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}
```

```jsx
// TodoList.jsx — Using vanilla Redux in a component
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "./store";

function TodoList() {
  const todos = useSelector((state) => state.todos.items);
  const filter = useSelector((state) => state.filter.value);
  const dispatch = useDispatch();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <ul>
      {filteredTodos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
          />
          <span
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
          </span>
          <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

### Why Vanilla Redux is Painful

```
Problems with vanilla Redux:
❌ Tons of boilerplate (action types, action creators, reducers — all separate)
❌ Must spread state manually to avoid mutation (error-prone)
❌ No built-in async support (need redux-thunk separately)
❌ combineReducers is manual
❌ DevTools setup is manual
❌ Immutability is your responsibility
```

This is exactly why **Redux Toolkit** was created.

---

## 5. Redux Toolkit (The Right Way)

Redux Toolkit (RTK) is the **official, recommended way** to write Redux. It solves all vanilla Redux pain points.

```bash
npm install @reduxjs/toolkit react-redux
```

### What RTK Gives You

```
Redux Toolkit includes:
✅ configureStore()    → Sets up store with DevTools + middleware automatically
✅ createSlice()       → Actions + Reducers in one place, with Immer (safe mutations!)
✅ createAsyncThunk()  → Handles async logic (API calls)
✅ createSelector()    → Memoized selectors
✅ RTK Query           → Full data fetching + caching solution
✅ Immer built-in      → Write "mutating" code that's actually immutable under the hood
```

### Immer — Write Mutations Safely

RTK uses **Immer** internally. This means you can write code that looks like mutation but is actually creating new state:

```js
// ❌ Vanilla Redux — manual spreading (tedious and error-prone)
case 'addItem':
  return {
    ...state,
    cart: {
      ...state.cart,
      items: [...state.cart.items, action.payload],
      total: state.cart.total + action.payload.price,
    }
  };

// ✅ RTK with Immer — looks like mutation, IS immutable under the hood
addItem: (state, action) => {
  state.cart.items.push(action.payload);       // Looks like mutation!
  state.cart.total += action.payload.price;    // Immer handles this safely
}
// Immer intercepts these "mutations" and produces a new immutable state
```

---

## 6. createSlice — The Heart of RTK

`createSlice` combines action types, action creators, and reducers into one clean slice.

```js
// features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart", // Prefix for all action types: 'cart/addItem', 'cart/removeItem'
  initialState,
  reducers: {
    // Each key here becomes an action creator AND a reducer case

    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1; // Immer makes this safe!
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },

    removeItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      } else {
        // If quantity is 1, remove the item
        state.items = state.items.filter((i) => i.id !== action.payload);
        state.totalQuantity -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    // Sometimes you want to prepare the payload before it hits the reducer
    addItemWithTimestamp: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (item) => ({
        payload: { ...item, addedAt: new Date().toISOString(), quantity: 1 },
      }),
    },
  },
});

// RTK auto-generates action creators from your reducer functions
export const {
  addItem,
  removeItem,
  decrementQuantity,
  clearCart,
  addItemWithTimestamp,
} = cartSlice.actions;

// The reducer goes into the store
export default cartSlice.reducer;
```

### What createSlice Auto-Generates

```js
// RTK generates these action creators automatically:
cartSlice.actions.addItem({ id: 1, name: "Shoes", price: 50 });
// Returns: { type: 'cart/addItem', payload: { id: 1, name: 'Shoes', price: 50 } }

cartSlice.actions.clearCart();
// Returns: { type: 'cart/clearCart' }

// Action types (useful for checking in other slices or middleware)
cartSlice.actions.addItem.type; // 'cart/addItem'
cartSlice.actions.removeItem.type; // 'cart/removeItem'
```

---

## 7. configureStore — Setting Up the Store

```js
// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productsReducer,
    ui: uiReducer,
  },
  // RTK automatically adds:
  // - Redux DevTools Extension support
  // - redux-thunk middleware (for async actions)
  // - Serializable check middleware (warns about non-serializable values)

  // You can customize middleware:
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in serializable check (e.g., for dates, functions)
        ignoredActions: ['auth/setUser'],
        ignoredPaths: ['auth.user.createdAt'],
      },
    }),
  // .concat(yourCustomMiddleware) — add your own middleware
});

// TypeScript-friendly type exports (important for large codebases)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

```jsx
// main.jsx or index.jsx — Provide the store to React
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

---

## 8. React-Redux — Connecting to Components

### useSelector — Reading State

```jsx
import { useSelector } from "react-redux";

function CartIcon() {
  // Select ONLY what this component needs
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  // useSelector subscribes to the store
  // This component only re-renders when totalQuantity or totalPrice changes
  return (
    <div>
      🛒 {totalQuantity} items — ${totalPrice.toFixed(2)}
    </div>
  );
}

function ProductList() {
  // Select derived/computed data
  const items = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const theme = useSelector((state) => state.ui.theme);

  // ❌ DON'T do this — component re-renders on ANY state change
  const everything = useSelector((state) => state); // Very bad!

  // ✅ DO this — select only what you need
  const cartItemCount = useSelector((state) => state.cart.totalQuantity);
}
```

### useDispatch — Triggering Actions

```jsx
import { useDispatch } from "react-redux";
import { addItem, removeItem, clearCart } from "../features/cart/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>

      <button onClick={() => dispatch(addItem(product))}>Add to Cart</button>

      <button onClick={() => dispatch(removeItem(product.id))}>Remove</button>
    </div>
  );
}

function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  return (
    <div>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
    </div>
  );
}
```

### Custom Hooks — The Professional Pattern

Instead of calling `useSelector` and `useDispatch` directly in every component, create custom hooks:

```js
// features/cart/cartHooks.js
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, decrementQuantity, clearCart } from "./cartSlice";

// Custom hook wraps all cart logic
export function useCart() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  return {
    items,
    totalQuantity,
    totalPrice,
    addItem: (product) => dispatch(addItem(product)),
    removeItem: (id) => dispatch(removeItem(id)),
    decrementQuantity: (id) => dispatch(decrementQuantity(id)),
    clearCart: () => dispatch(clearCart()),
  };
}
```

```jsx
// Usage in any component — clean and simple
function CartPage() {
  const { items, totalPrice, removeItem, clearCart } = useCart();

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          {item.name} × {item.quantity}
          <button onClick={() => removeItem(item.id)}>×</button>
        </div>
      ))}
      <p>Total: ${totalPrice}</p>
      <button onClick={clearCart}>Clear</button>
    </div>
  );
}
```

---

## 9. Async Actions — createAsyncThunk

Redux reducers must be **pure and synchronous**. For API calls, use `createAsyncThunk`.

### What is a Thunk?

A **thunk** is a function that returns another function. In Redux, it's a way to delay an action or do async work before dispatching.

```js
// A thunk (manually, without RTK)
const fetchUser = (id) => async (dispatch, getState) => {
  dispatch({ type: "user/fetchStart" });
  try {
    const user = await api.getUser(id);
    dispatch({ type: "user/fetchSuccess", payload: user });
  } catch (error) {
    dispatch({ type: "user/fetchError", payload: error.message });
  }
};
```

### createAsyncThunk — The RTK Way

```js
// features/products/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 1. Create the thunk
// createAsyncThunk(actionType, payloadCreator)
export const fetchProducts = createAsyncThunk(
  "products/fetchAll", // Action type prefix
  async (filters, thunkAPI) => {
    // filters = argument passed when dispatching
    try {
      const response = await fetch(
        `/api/products?category=${filters?.category || ""}`,
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      return await response.json(); // Return value becomes the action payload
    } catch (error) {
      // Use rejectWithValue to pass a custom error to rejected case
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Fetch a single product
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) throw new Error("Product not found");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// 2. Handle thunk lifecycle in the slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Synchronous actions
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },

  // Handle async thunk actions here
  extraReducers: (builder) => {
    // fetchProducts lifecycle
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // The returned value from the thunk
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // The rejectWithValue message
      })

      // fetchProductById lifecycle
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedProduct, setFilter } = productsSlice.actions;
export default productsSlice.reducer;
```

```jsx
// Using the thunk in a component
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";

function ProductsPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    // Dispatch the thunk like any other action
    dispatch(fetchProducts({ category: "electronics" }));
  }, [dispatch]);

  // createAsyncThunk returns a promise — you can chain it!
  const handleRefresh = async () => {
    const result = await dispatch(fetchProducts());
    if (fetchProducts.fulfilled.match(result)) {
      console.log("Loaded:", result.payload);
    } else {
      console.error("Failed:", result.payload);
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error)
    return (
      <div>
        Error: {error} <button onClick={handleRefresh}>Retry</button>
      </div>
    );

  return (
    <div>
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### The Three States of Every Async Action

```
dispatch(fetchProducts())
        ↓
  PENDING state  → loading: true, error: null
        ↓
  [API call runs]
        ↓
  FULFILLED      → loading: false, items: [...data]  (success)
  OR
  REJECTED       → loading: false, error: 'message'  (failure)
```

---

## 10. RTK Query — Data Fetching & Caching

RTK Query is a powerful data fetching and caching tool built into Redux Toolkit. Think of it as Redux's answer to React Query / SWR.

```js
// features/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API
export const apiSlice = createApi({
  reducerPath: "api", // Key in the Redux store
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.mystore.com",
    // Add auth headers to every request
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // Cache tag system for invalidation
  tagTypes: ["Product", "User", "Order"],

  endpoints: (builder) => ({
    // Query = GET data (read)
    getProducts: builder.query({
      query: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return `/products?${params}`;
      },
      providesTags: ["Product"], // This query provides 'Product' data
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // Mutation = POST/PUT/DELETE data (write)
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"], // Refetch all Product queries after this
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    placeOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

// RTK Query auto-generates hooks for each endpoint!
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetUserQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  usePlaceOrderMutation,
} = apiSlice;
```

```js
// Add RTK Query to the store
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // RTK Query middleware (for caching, polling)
});
```

```jsx
// Using RTK Query in components — incredibly clean!
import {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} from "../features/api/apiSlice";

function ProductsPage() {
  // Automatically fetches, caches, and manages loading/error state!
  const {
    data: products,
    isLoading,
    isError,
    error,
    isFetching, // true when refetching in background
    refetch, // manually trigger a refetch
  } = useGetProductsQuery({ category: "shoes" });

  // Polling — refetch every 30 seconds
  const { data: liveData } = useGetProductsQuery(undefined, {
    pollingInterval: 30000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      {isFetching && <div>Refreshing...</div>}
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

function AdminProductsPage() {
  const { data: products } = useGetProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap(); // .unwrap() throws on error
      alert("Product deleted!");
      // RTK Query automatically refetches getProducts because we invalidated 'Product' tag
    } catch (error) {
      alert("Failed to delete: " + error.message);
    }
  };

  const handleAdd = async (productData) => {
    try {
      const newProduct = await addProduct(productData).unwrap();
      console.log("Created:", newProduct);
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  return (
    <div>
      {products?.map((p) => (
        <div key={p.id}>
          {p.name}
          <button onClick={() => handleDelete(p.id)} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      ))}
    </div>
  );
}
```

### RTK Query vs createAsyncThunk

```
createAsyncThunk:
→ Manual caching (you write the loading/error state)
→ You control everything
→ Good for non-GET operations or complex flows
→ No automatic cache invalidation

RTK Query:
→ Automatic caching, deduplication, invalidation
→ Auto-generated hooks
→ Background refetching
→ Optimistic updates support
→ Best for standard CRUD APIs
```

---

## 11. Selectors & Reselect — Derived State

Selectors are functions that extract and compute data from the Redux state.

### Basic Selectors

```js
// Simple selectors — just functions
const selectCartItems = (state) => state.cart.items;
const selectTotalPrice = (state) => state.cart.totalPrice;
const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

// Use them in components
const items = useSelector(selectCartItems);
const isLoggedIn = useSelector(selectIsLoggedIn);
```

### Memoized Selectors with createSelector

The problem: if you compute derived data inside `useSelector`, it recalculates on **every render**, even if the inputs haven't changed.

```js
import { createSelector } from "@reduxjs/toolkit"; // or from 'reselect'

// Input selectors — simple, cheap
const selectCartItems = (state) => state.cart.items;
const selectFilter = (state) => state.filter.value;
const selectSearchQuery = (state) => state.ui.searchQuery;

// Memoized selector — only recalculates when inputs change
export const selectFilteredCartItems = createSelector(
  [selectCartItems, selectFilter], // Input selectors
  (items, filter) => {
    // Result function (runs only when inputs change)
    if (filter === "all") return items;
    if (filter === "active") return items.filter((item) => !item.purchased);
    return items.filter((item) => item.purchased);
  },
);

// Even more complex derived state
export const selectCartSummary = createSelector([selectCartItems], (items) => ({
  totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  uniqueItemCount: items.length,
  hasItems: items.length > 0,
}));

// Selector with argument — use factory function
export const selectItemById = (id) =>
  createSelector([selectCartItems], (items) =>
    items.find((item) => item.id === id),
  );
```

```jsx
// Usage in components
function CartSummary() {
  // Only recalculates when cart items change — not on every render!
  const { totalItems, totalPrice, hasItems } = useSelector(selectCartSummary);
  const filteredItems = useSelector(selectFilteredCartItems);

  return (
    <div>
      <p>
        {totalItems} items — ${totalPrice}
      </p>
      {!hasItems && <p>Your cart is empty</p>}
    </div>
  );
}

// Selector with argument
function CartItem({ itemId }) {
  const item = useSelector(selectItemById(itemId));
  return <div>{item?.name}</div>;
}
```

---

## 12. Middleware

Middleware intercepts dispatched actions **before** they reach the reducer. It's the place for side effects.

```
dispatch(action) → Middleware 1 → Middleware 2 → Reducer → New State
```

### Built-in Middleware in RTK

```js
// RTK adds these by default:
// 1. redux-thunk — enables dispatching functions (for async)
// 2. serializabilityCheck — warns if non-serializable values in state
// 3. immutabilityCheck — warns if state was mutated in dev mode
```

### Writing Custom Middleware

```js
// Logger middleware — logs every action
const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.group(action.type);
  console.log("Dispatching:", action);
  console.log("State before:", storeAPI.getState());

  const result = next(action); // Pass action to next middleware / reducer

  console.log("State after:", storeAPI.getState());
  console.groupEnd();

  return result;
};

// Analytics middleware — track events
const analyticsMiddleware = (storeAPI) => (next) => (action) => {
  // Track specific actions
  if (action.type === "cart/addItem") {
    analytics.track("Product Added to Cart", {
      productId: action.payload.id,
      productName: action.payload.name,
      price: action.payload.price,
    });
  }

  if (action.type === "auth/logout") {
    analytics.track("User Logged Out");
  }

  return next(action);
};

// Error middleware — catch and report errors
const errorMiddleware = (storeAPI) => (next) => (action) => {
  try {
    return next(action);
  } catch (error) {
    console.error("Redux error:", error);
    Sentry.captureException(error);
    throw error;
  }
};

// Add custom middleware to the store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loggerMiddleware)
      .concat(analyticsMiddleware)
      .concat(errorMiddleware),
});
```

---

## 13. Redux DevTools

Redux DevTools is one of Redux's biggest advantages — time-travel debugging.

```js
// RTK enables DevTools automatically in development
// Install the browser extension:
// Chrome: "Redux DevTools" extension
// Firefox: "Redux DevTools" extension
```

### What DevTools Shows You

```
Redux DevTools panel:
├── Action log (every action dispatched, in order)
│   ├── @@INIT
│   ├── cart/addItem   ← Click to inspect
│   ├── auth/setUser
│   └── products/fetchAll/fulfilled
│
├── State diff (what changed between actions)
│
├── State tree (full current state)
│
└── Time-travel controls:
    ├── ← Jump to any past state
    ├── Replay from the beginning
    └── Import/Export state snapshots
```

### Using DevTools Effectively

```js
// In development, add action descriptions to help debugging
const cartSlice = createSlice({
  name: "cart",
  reducers: {
    addItem: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (item) => ({
        payload: item,
        // This shows up in DevTools!
        meta: { description: `Added ${item.name} to cart` },
      }),
    },
  },
});
```

---

## 14. Real-World Example — Full E-Commerce Store

Let's put it all together with a realistic feature folder structure:

```
src/
├── app/
│   └── store.js                 ← Store configuration
├── features/
│   ├── auth/
│   │   ├── authSlice.js
│   │   └── authHooks.js
│   ├── cart/
│   │   ├── cartSlice.js
│   │   ├── cartHooks.js
│   │   └── CartPage.jsx
│   ├── products/
│   │   ├── productsSlice.js
│   │   └── ProductsPage.jsx
│   └── api/
│       └── apiSlice.js          ← RTK Query
└── components/
    ├── Navbar.jsx
    └── ProductCard.jsx
```

```js
// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      // Save token to localStorage for persistence
      localStorage.setItem("token", data.token);
      return data; // { user, token }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await fetch("/api/auth/logout", { method: "POST" });
  localStorage.removeItem("token");
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null, // Rehydrate from localStorage
    isLoggedIn: Boolean(localStorage.getItem("token")),
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

// Selectors co-located with the slice
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.loading;
```

```js
// features/auth/authHooks.js
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser, clearError } from "./authSlice";
import {
  selectCurrentUser,
  selectIsLoggedIn,
  selectAuthLoading,
  selectAuthError,
} from "./authSlice";

export function useAuth() {
  const dispatch = useDispatch();

  return {
    user: useSelector(selectCurrentUser),
    isLoggedIn: useSelector(selectIsLoggedIn),
    loading: useSelector(selectAuthLoading),
    error: useSelector(selectAuthError),
    login: (credentials) => dispatch(loginUser(credentials)),
    logout: () => dispatch(logoutUser()),
    clearError: () => dispatch(clearError()),
  };
}
```

```jsx
// features/auth/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authHooks";

export default function LoginPage() {
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);
    if (loginUser.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="error">
          {error}
          <button type="button" onClick={clearError}>
            ✕
          </button>
        </div>
      )}
      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
```

---

## 15. Redux vs Context API vs Zustand

```
                Context API       Redux Toolkit      Zustand
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Bundle size     0kb               ~47kb              ~3kb
Dependencies    None              RTK + react-redux  zustand
Provider        Required          Required           NOT required
DevTools        ❌                ✅ (best)          ✅ (basic)
Performance     Manual            Good w/ selectors  Auto (excellent)
Learning curve  Low               Medium             Very Low
Async           Manual (thunks)   Built-in           Built-in
Middleware      ❌                ✅                 ✅ (middleware)
Data caching    ❌                RTK Query ✅        SWR/RQ needed
Time travel     ❌                ✅                 Limited
Best for        Small/theme/auth  Large apps / teams Medium apps
```

```js
// Zustand — for comparison (notice how simple it is!)
import { create } from "zustand";

const useCartStore = create((set, get) => ({
  items: [],
  totalPrice: 0,

  addItem: (product) =>
    set((state) => ({
      items: [...state.items, { ...product, quantity: 1 }],
      totalPrice: state.totalPrice + product.price,
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),
}));

// Usage — no Provider needed!
function CartPage() {
  const { items, addItem } = useCartStore();
  // Only re-renders when 'items' or 'addItem' changes — automatic!
}
```

### When to Choose What

```
Context API   → Themes, auth, language (rarely-changing global state)
Redux Toolkit → Large apps, complex state, teams, need DevTools
Zustand       → Medium apps, simple API preferred, no Provider needed
Jotai/Recoil  → Atomic state, fine-grained subscriptions
RTK Query     → Server state, API data fetching (pairs with Redux)
React Query   → Server state only (no client state management)
```

---

## 16. Common Patterns & Best Practices

### 1. Feature Folder Structure (Ducks Pattern)

```
features/
└── cart/
    ├── cartSlice.js      ← Actions + Reducers + Selectors
    ├── cartHooks.js      ← Custom hooks (useCart)
    ├── cartSelectors.js  ← Complex selectors (optional, for large slices)
    ├── CartPage.jsx      ← Page component
    └── CartItem.jsx      ← Sub-component
```

### 2. Co-locate Selectors with Slices

```js
// cartSlice.js — selectors at the bottom of the slice file
const cartSlice = createSlice({ ... });
export default cartSlice.reducer;
export const { addItem } = cartSlice.actions;

// Selectors live with the slice they select from
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.totalPrice;
export const selectCartItemById = (id) => (state) =>
  state.cart.items.find(item => item.id === id);
```

### 3. Normalize Complex State

```js
// ❌ Nested arrays are hard to update efficiently
state = {
  posts: [
    { id: 1, title: 'Post 1', comments: [{ id: 1, text: 'Great!' }] },
    { id: 2, title: 'Post 2', comments: [...] }
  ]
}

// ✅ Normalized state — flat, indexed by ID (like a database)
state = {
  posts: {
    ids: [1, 2],                          // Ordered list of IDs
    entities: {                           // Lookup table
      1: { id: 1, title: 'Post 1', commentIds: [1] },
      2: { id: 2, title: 'Post 2', commentIds: [] },
    }
  },
  comments: {
    ids: [1],
    entities: { 1: { id: 1, text: 'Great!', postId: 1 } }
  }
}
```

RTK has `createEntityAdapter` to help with this:

```js
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt), // Sort newest first
});

const postsSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState({ loading: false }),
  reducers: {
    postAdded: postsAdapter.addOne, // Auto-handles normalization
    postUpdated: postsAdapter.updateOne,
    postDeleted: postsAdapter.removeOne,
    postsLoaded: postsAdapter.setAll,
  },
});

// Auto-generated selectors!
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);
```

### 4. Handle Optimistic Updates

```js
// Update UI immediately, revert if API fails
updateProduct: builder.mutation({
  query: ({ id, ...patch }) => ({ url: `/products/${id}`, method: 'PATCH', body: patch }),

  async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
    // Optimistically update the cache
    const patchResult = dispatch(
      apiSlice.util.updateQueryData('getProducts', undefined, (draft) => {
        const product = draft.find(p => p.id === id);
        if (product) Object.assign(product, patch);
      })
    );

    try {
      await queryFulfilled; // Wait for the actual API response
    } catch {
      patchResult.undo(); // Revert if API call fails
    }
  },
}),
```

---

## 17. Common Mistakes

### ❌ Mistake 1: Mutating State Directly (Without Immer)

```js
// ❌ WRONG — in vanilla Redux (without RTK)
case 'addItem':
  state.items.push(action.payload); // MUTATION! React won't re-render.
  return state;

// ✅ CORRECT — always return new state
case 'addItem':
  return { ...state, items: [...state.items, action.payload] };
```

### ❌ Mistake 2: Putting Non-Serializable Values in State

```js
// ❌ Redux state must be serializable (JSON.stringify-able)
state.user.createdAt = new Date(); // Date object!
state.ui.modalRef = React.createRef(); // Ref object!
state.actions.callback = () => {}; // Function!

// ✅ Store serializable equivalents
state.user.createdAt = new Date().toISOString(); // String
state.ui.modalOpen = true; // Boolean
// Keep refs and callbacks in component state (useState/useRef), not Redux
```

### ❌ Mistake 3: Selecting Too Much State

```js
// ❌ This component re-renders on ANY store change
const state = useSelector((state) => state);
const cart = useSelector((state) => state.cart); // Still too broad!

// ✅ Select only what you need
const items = useSelector((state) => state.cart.items);
const total = useSelector((state) => state.cart.totalPrice);
```

### ❌ Mistake 4: Doing Async Logic in Reducers

```js
// ❌ WRONG — reducers must be pure!
addItem: async (state, action) => {
  const response = await fetch("/api/check-stock"); // NO! Never async in reducer
  state.items.push(action.payload);
};

// ✅ Use createAsyncThunk for async logic
```

### ❌ Mistake 5: One Giant Slice

```js
// ❌ Don't put everything in one slice
const appSlice = createSlice({
  name: 'app',
  // auth state + cart state + products state + ui state + ... all in one! 😱
});

// ✅ Split into focused slices
const authSlice = createSlice({ name: 'auth', ... });
const cartSlice = createSlice({ name: 'cart', ... });
const productsSlice = createSlice({ name: 'products', ... });
```

### ❌ Mistake 6: Dispatching from useSelector

```js
// ❌ Never dispatch inside useSelector — causes infinite loops!
const badValue = useSelector((state) => {
  store.dispatch(someAction()); // NEVER
  return state.something;
});
```

---

## 18. Interview Questions & Answers

### 🟢 Beginner

---

**Q1: What is Redux and why is it used?**

**A:** Redux is a predictable state management library for JavaScript apps (commonly used with React). It centralizes all application state in a single store, making state changes predictable and traceable. It's used when multiple components need access to the same data, when prop drilling becomes unmanageable, or when you need features like time-travel debugging and action logging.

---

**Q2: What are actions, reducers, and the store?**

**A:**

- **Action** — A plain JavaScript object that describes what happened. Has a `type` field and optionally a `payload`. Example: `{ type: 'cart/addItem', payload: { id: 1, name: 'Shoes' } }`
- **Reducer** — A pure function that takes the current state and an action, and returns a new state. It's the only place where state changes happen.
- **Store** — The object that holds the entire state tree of the app. Created once with `configureStore()`. Components subscribe to it via `useSelector`.

---

**Q3: What is the difference between Redux and Redux Toolkit?**

**A:** Redux Toolkit (RTK) is the official, opinionated toolset for Redux that eliminates boilerplate. Vanilla Redux requires manually writing action type constants, action creators, and reducers separately, plus wiring up DevTools and middleware manually. RTK combines all of these with `createSlice`, automatically sets up DevTools and redux-thunk, and uses Immer internally so you can write "mutating" code that's actually immutable. All new Redux projects should use RTK.

---

**Q4: What is the purpose of dispatch?**

**A:** `dispatch` is the only way to trigger a state change in Redux. You call `dispatch(action)` to send an action to the store. The store passes the action through middleware (like thunks) and then to the reducer, which computes the new state. Think of `dispatch` as submitting a form — you describe what you want, and the system processes it.

---

**Q5: What is a pure function and why must reducers be pure?**

**A:** A pure function always returns the same output for the same inputs and has no side effects (no API calls, no mutations, no random values). Reducers must be pure because Redux relies on this predictability to enable time-travel debugging, testing, and server-side rendering. If reducers had side effects, replaying actions wouldn't produce the same state, breaking Redux's core value proposition.

---

### 🟡 Intermediate

---

**Q6: What is a thunk and when do you use createAsyncThunk?**

**A:** A thunk is a function that returns another function that receives `dispatch` and `getState`. It's used to perform async operations (API calls) before dispatching actions. `createAsyncThunk` is RTK's solution — you provide a string action type and an async function, and it automatically dispatches `pending`, `fulfilled`, and `rejected` actions based on the promise's outcome. Use it for any async operation that needs to update Redux state.

---

**Q7: What is the difference between useSelector and useDispatch?**

**A:** `useSelector` reads data from the Redux store — it takes a selector function and returns the selected value, re-rendering the component whenever that value changes. `useDispatch` returns the store's dispatch function for sending actions. Think of `useSelector` as reading and `useDispatch` as writing. A component can use one, both, or neither depending on its needs.

---

**Q8: How does Immer work in Redux Toolkit?**

**A:** Immer is a library that uses JavaScript Proxies to track "draft" mutations. When you write `state.items.push(item)` inside a RTK reducer, Immer intercepts it, records the intended mutation, and produces a brand new immutable state object based on that mutation. Your code looks mutating but the actual result is a new state object — giving you the simplicity of mutations with the safety of immutability.

---

**Q9: What is RTK Query and how does it differ from createAsyncThunk?**

**A:** RTK Query is a data fetching and caching layer built into RTK. Unlike `createAsyncThunk` where you manually manage loading/error state, RTK Query automatically handles caching, deduplication of requests, background refetching, and cache invalidation via a tag system. It auto-generates React hooks for each endpoint. `createAsyncThunk` is for one-off async operations; RTK Query is for structured CRUD APIs where you want automatic caching.

---

**Q10: What is the purpose of createSelector?**

**A:** `createSelector` (from Reselect, built into RTK) creates memoized selectors. When a component uses a computed/derived value (like filtered items or totals), recalculating it on every render is wasteful. `createSelector` caches the result and only recalculates when its input selectors return new values. This is crucial for performance when selecting expensive derived data from the store.

---

### 🔴 Advanced

---

**Q11: Explain the middleware signature `(storeAPI) => (next) => (action) => ...`**

**A:** This is a curried function with three levels. The first call `(storeAPI)` receives `dispatch` and `getState` — the middleware has access to the full store. The second call `(next)` receives the next middleware's dispatch function (or the reducer if it's the last middleware). The third call `(action)` is what gets invoked when an action is dispatched. Calling `next(action)` passes the action forward in the chain; not calling it swallows the action. This design allows middleware to intercept, transform, delay, or cancel actions.

---

**Q12: How would you handle race conditions in createAsyncThunk?**

**A:** RTK's `createAsyncThunk` provides an `AbortController` signal you can use to cancel in-flight requests. Also, you can check `condition` to skip dispatching if data already exists. For race conditions where multiple requests are in flight:

```js
export const fetchData = createAsyncThunk(
  "data/fetch",
  async (id, { signal, rejectWithValue }) => {
    try {
      const response = await fetch(`/api/data/${id}`, { signal });
      return await response.json();
    } catch (err) {
      if (err.name === "AbortError") return rejectWithValue("Aborted");
      return rejectWithValue(err.message);
    }
  },
  {
    // Don't dispatch if data is already loaded
    condition: (id, { getState }) => {
      const { data } = getState();
      if (data.ids.includes(id)) return false; // Cancel the thunk
    },
  },
);

// In component — abort on unmount or re-fetch
useEffect(() => {
  const promise = dispatch(fetchData(id));
  return () => promise.abort(); // Abort if component unmounts
}, [id]);
```

---

**Q13: How do you share actions between slices (cross-slice communication)?**

**A:** Use `extraReducers` to listen to actions from other slices:

```js
// cartSlice listens to auth/logout action from authSlice
const cartSlice = createSlice({
  name: 'cart',
  reducers: { ... },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      // When user logs out, clear the cart!
      state.items = [];
      state.totalPrice = 0;
    });
  },
});
```

This keeps slices independent while allowing coordinated responses to shared events — much cleaner than importing slices into each other.

---

**Q14: What is state normalization and why does it matter?**

**A:** Normalization stores state in a flat, database-like structure indexed by ID instead of nested arrays. It matters for performance and correctness: with nested data, updating a single item requires mapping over arrays and spreading objects (O(n) time); with normalized data, it's a direct property update (O(1) time). It also prevents data duplication — if a user object appears in 5 places in nested state, you'd need to update all 5; normalized, you update one. RTK's `createEntityAdapter` provides normalized CRUD operations out of the box.

---

**Q15: What are the trade-offs of putting all state in Redux vs using local state?**

**A:** Not all state belongs in Redux. Local UI state (a modal's open/close, a form's draft values, hover states) should stay in `useState` — putting it in Redux adds unnecessary action/reducer boilerplate for zero benefit. Redux is for state that: (1) is shared across multiple unrelated components, (2) needs to persist beyond component lifecycle, (3) benefits from DevTools visibility, or (4) is modified by complex coordinated logic. A common rule: "Does any other component need to know about this? No → useState. Yes → Redux."

---

## 19. Quick Reference Cheatsheet

### The Complete Setup (5 Files)

```js
// 1. features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCount = (state) => state.counter.value;
export default counterSlice.reducer;
```

```js
// 2. app/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
export const store = configureStore({ reducer: { counter: counterReducer } });
```

```jsx
// 3. main.jsx
import { Provider } from "react-redux";
import { store } from "./app/store";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

```jsx
// 4. Counter.jsx
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "./counterSlice";
import { selectCount } from "./counterSlice";

function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}
```

### Key APIs at a Glance

```js
// SLICE
createSlice({ name, initialState, reducers, extraReducers })

// STORE
configureStore({ reducer, middleware, devTools })

// ASYNC
createAsyncThunk('slice/action', async (arg, thunkAPI) => { ... })
// thunkAPI: { dispatch, getState, rejectWithValue, signal, abort }

// SELECTORS
createSelector([inputSelectors], resultFunction)

// RTK QUERY
createApi({ reducerPath, baseQuery, endpoints })
builder.query({ query, providesTags })
builder.mutation({ query, invalidatesTags })

// ENTITY ADAPTER
createEntityAdapter({ selectId, sortComparer })
adapter.addOne / addMany / updateOne / removeOne / setAll / upsertOne

// REACT HOOKS
useSelector(selectorFn)    // Read state
useDispatch()              // Get dispatch function
```

### Redux Flow in One Diagram

```
User interaction
      ↓
dispatch(actionCreator(payload))
      ↓
Middleware (thunks, logger, analytics...)
      ↓
Reducer: (state, action) => newState  ← PURE FUNCTION
      ↓
Store updates
      ↓
useSelector subscribers re-render
      ↓
UI updates
```

### Golden Rules

```
📌 State is read-only — only dispatch() changes state
📌 Reducers are pure — no side effects, no async, no mutations
📌 Use RTK — never write vanilla Redux in new projects
📌 Use createAsyncThunk for API calls — never async in reducers
📌 Select minimally — useSelector(state => state.specific.value)
📌 Split slices by feature — not by data type
📌 Co-locate selectors with slices
📌 Local UI state → useState, Shared state → Redux
📌 Install Redux DevTools — it's your best debugging friend
📌 createSelector for derived/computed state
```

---

> **Final Thought 💡**
>
> Redux feels like overkill for small apps — because it is.  
> Redux shines when your app has complex state shared across many components,  
> when teams need to debug state changes, or when you need RTK Query's  
> powerful caching. If you're building a CRUD app with Next.js,  
> start with React Query or RTK Query first. Add Redux only when  
> you genuinely need shared client-side state at scale.
>
> Master the flow: **Action → Reducer → Store → Component**.  
> Everything else in Redux is just tools to make that flow easier.

---

_Redux Toolkit 2.x | React-Redux 9.x | Reselect 5.x_  
_Key patterns: createSlice, createAsyncThunk, RTK Query, createSelector, Immer_
