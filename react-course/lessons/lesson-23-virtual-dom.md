````markdown
# Lesson 23 — Virtual DOM and Reconciliation

Estimated time: 90–120 minutes (read + hands-on exercises)

Purpose: Explain what the Virtual DOM (VDOM) is, how React diffs trees and reconciles updates, why keys matter, an overview of the Fiber architecture (render vs commit phases), and practical guidance to avoid reconciliation pitfalls.

---

## What is the Virtual DOM?

- The Virtual DOM is an in-memory representation of the UI tree (React elements). Instead of writing directly to the real DOM each time something changes, React updates the VDOM and calculates the minimal set of real DOM changes required.
- Benefits: cheaper JS-to-DOM work, batched updates, and an abstraction that enables features like reconciliation and concurrent rendering.

---

## Reconciliation (diffing) at a high level

- When state or props change, React creates a new VDOM tree for the affected subtree.
- React then compares the previous VDOM tree and the new one to determine what changed — this process is called reconciliation.
- The output of reconciliation is a list of mutations applied to the real DOM during the commit phase.

Key heuristic rules React uses:

- If elements have different types (e.g., <div> vs <span> or different component), React tears down the old tree and mounts the new one.
- For elements of the same type, React will attempt to update attributes/props and reconcile children.

For children arrays, React uses keys to match items between the old and new trees — keys tell React which items are the same and which moved/added/removed.

---

## Why keys matter — a concrete example

- Keys should be stable, unique identifiers for list items (not the array index unless the list is static and never reordered).

Bad (uses index):

```js
{
  items.map((item, idx) => <li key={idx}>{item.name}</li>);
}
```
````

Good (stable id):

```js
{
  items.map((item) => <li key={item.id}>{item.name}</li>);
}
```

Why: When keys change (or are unstable), React may reuse the wrong DOM nodes, causing input focus loss, wrong animations, or incorrect state in child components.

Exercise: create a small list with an input inside each item. Remove the first element with/without stable keys and observe focus/state behavior.

---

## Fiber architecture overview (why React can be interruptible)

- Fiber is React's internal data structure and scheduler that enables incremental and interruptible rendering. It breaks rendering work into units of work (fibers).
- Two important phases:
  1. Render (reconciliation) phase — React computes the new VDOM tree and prepares side-effects; this phase can be paused or interrupted (in concurrent mode).
  2. Commit phase — React applies the computed changes to the real DOM (synchronous and quick to avoid visual inconsistency).

Understanding this helps reason about lifecycle timing and hooks: some work happens before DOM mutations (render phase) and some after (commit). For example, `useLayoutEffect` runs after DOM mutations but before the browser paints.

---

## Reconciliation heuristics and optimization tips

- Keep keys stable and specific.
- Avoid creating new inline objects/arrays as props if a child component depends on shallow equality (useMemo/useCallback or lift state).
- Split large lists with virtualization rather than trying to optimize render-all lists.
- Use `React.memo` to avoid re-rendering pure children when props haven't changed.

---

## Common pitfalls

- Using array index as `key` when items may reorder.
- Mutating objects in-place and relying on equality checks — always return new references for changed objects.
- Expecting reconciliation to be semantic: React’s diff is heuristic-based and optimized for typical UI patterns (it doesn't do deep structural diffing across the whole tree in all cases).

---

## Small demos / exercises

1. List item reordering: Build a list with local state per item (e.g., an input). Reorder items and compare behavior when using `index` as key vs `item.id`.
2. Focus-preservation: Create list where each item has an input. Delete an item and verify focus goes to the right input when keys are stable.
3. Memoization experiment: Wrap a list item with `React.memo` and pass an inline object prop each render — observe that memoization fails unless you stabilize the prop.

---

## Interview Q&A

Q: What happens if you use indices as keys and then insert an item at the start of the list?

A: React will consider items as having changed identity (because their indices change). DOM nodes will be moved/reused incorrectly, which can break focus, animations, and local state.

Q: What is the difference between render and commit phases in React?

A: Render (reconciliation) computes the new VDOM and can be paused/batched; commit applies the changes to the real DOM and runs layout effects — it's synchronous to avoid visual inconsistencies.

---

## When to worry about VDOM performance

- Most apps are fine with default reconciliation. Focus first on expensive children, large lists, or high-frequency updates.
- Use the React Profiler to identify hot spots, then apply targeted fixes (memoization, virtualization, batching).

---

```

```
