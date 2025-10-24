import React, {
  Suspense,
  lazy,
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useTransition,
} from "react";
import TaskItem from "./TaskItem";
import SmartInput from "./SmartInput";
import ErrorBoundary from "./ErrorBoundary";
import { useTheme } from "../context/ThemeContext";

// Lazy-loaded settings panel to demonstrate code-splitting
const SettingsPanel = lazy(() => import("./SettingsPanel"));

// Reducer for task list
function tasksReducer(state, action) {
  switch (action.type) {
    case "set":
      return action.tasks;
    case "add":
      return [
        ...state,
        { id: String(Date.now()), text: action.text, done: false },
      ];
    case "toggle":
      return state.map((t) =>
        t.id === action.id ? { ...t, done: !t.done } : t
      );
    case "remove":
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}

// Simulate heavy filtering
function heavyFilter(tasks, q) {
  if (!q) return tasks;
  const lower = q.toLowerCase();
  // simulate CPU work
  let result = tasks.filter((t) => t.text.toLowerCase().includes(lower));
  // extra loop to emulate cost
  for (let i = 0; i < 1000; i++) {
    // noop loop
  }
  return result;
}

export default function Dashboard() {
  const { theme, toggle } = useTheme();

  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [listHeight, setListHeight] = useState(0);
  const inputId = useId(); // for accessible label pairing

  // Fetch initial tasks (with abort on unmount)
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      if (!controller.signal.aborted) {
        dispatch({
          type: "set",
          tasks: [
            { id: "1", text: "Write docs", done: false },
            { id: "2", text: "Review PRs", done: true },
            { id: "3", text: "Plan roadmap", done: false },
          ],
        });
      }
    }, 400);
    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  // Measure list height after layout commits
  useLayoutEffect(() => {
    if (listRef.current) {
      setListHeight(listRef.current.getBoundingClientRect().height);
    }
  }, [tasks]);

  // Stable handlers for memoized children
  const onToggle = useCallback((id) => dispatch({ type: "toggle", id }), []);
  const onRemove = useCallback((id) => dispatch({ type: "remove", id }), []);

  function onAdd(text) {
    if (!text.trim()) return;
    dispatch({ type: "add", text: text.trim() });
    // Clear + refocus via imperative handle
    if (inputRef.current) {
      inputRef.current.clear();
      inputRef.current.focus();
    }
  }

  // Expensive derived list, computed from deferred query
  const filtered = useMemo(
    () => heavyFilter(tasks, deferredQuery),
    [tasks, deferredQuery]
  );

  // Transition the query update so typing stays responsive while list filters
  const handleQueryChange = (e) => {
    const value = e.target.value;
    startTransition(() => setQuery(value));
  };

  // Local component to demonstrate a throw (wrapped by error boundary)
  function MaybeBug() {
    if (filtered.length > 50) {
      throw new Error("Too many tasks!");
    }
    return null;
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h3>Dashboard</h3>
        <div>
          <span style={{ marginRight: 8 }}>Theme: {theme}</span>
          <button onClick={toggle}>Toggle theme</button>
        </div>
      </div>

      {/* Add task form using SmartInput (imperative handle) */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <label htmlFor={inputId}>New task</label>
        <TaskAdder inputId={inputId} onAdd={onAdd} inputRef={inputRef} />
      </div>

      {/* Search with transition + deferred value */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <input
          placeholder="Search tasks..."
          value={query}
          onChange={handleQueryChange}
          style={{ padding: 8, minWidth: 240 }}
        />
        {isPending && <span style={{ fontSize: 12 }}>Filtering...</span>}
      </div>

      {/* Error boundary around possibly-throwing component */}
      <ErrorBoundary>
        <MaybeBug />
        <div style={{ marginBottom: 8, fontSize: 12, color: "#555" }}>
          List height: {Math.round(listHeight)}px
        </div>
        <ul ref={listRef} style={{ paddingLeft: 16 }}>
          {filtered.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onRemove={onRemove}
            />
          ))}
        </ul>
      </ErrorBoundary>

      {/* Lazy-loaded settings panel */}
      <div style={{ marginTop: 16 }}>
        <Suspense fallback={<div>Loading settings...</div>}>
          <SettingsPanel />
        </Suspense>
      </div>
    </div>
  );
}

function TaskAdder({ inputId, onAdd, inputRef }) {
  const [text, setText] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText("");
  };
  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", gap: 8, alignItems: "center" }}
    >
      <SmartInput
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g. Refactor components"
        autoFocus
        id={inputId}
      />
      <button type="submit">Add</button>
    </form>
  );
}
