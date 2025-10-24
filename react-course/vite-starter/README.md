Vite React Starter — examples for the React course

This folder contains a minimal Vite + React starter with several example components used in the course.

Getting started

1. Install dependencies:

```bash
cd f:\React\react-course\vite-starter
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open the URL printed by Vite (usually http://localhost:5173)

Included examples

- `Counter` — simple `useState` demo
- `Timer` — `useEffect` with cleanup
- `FetchUsers` — data fetching with cancellation
- `ErrorBoundaryDemo` — class error boundary catching child errors
- `FormWithReducer` — form state managed with `useReducer` (validation + reset)
- `UndoRedoDemo` — demonstrates undo/redo history pattern with `useReducer`
- `VdomKeysFocusDemo` — Virtual DOM keys demo showing list reorder vs stable keys and focus/state preservation
- `Dashboard` — integrated demo using: context (theme), reducer for tasks, transitions + deferred search, memoized list items, imperative input ref, layout measurement, error boundary, and lazy-loaded settings

Notes

- This is a small self-contained project suitable for local experimentation and for moving examples from CDN-based HTML files to a real project.
- To build for production run `npm run build` and `npm run preview` to serve the built files locally.
