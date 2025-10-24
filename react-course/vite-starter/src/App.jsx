import React from "react";
import Counter from "./components/Counter";
import Timer from "./components/Timer";
import FetchUsers from "./components/FetchUsers";
import ErrorBoundaryDemo from "./components/ErrorBoundaryDemo";
import FormWithReducer from "./components/FormWithReducer";
import UndoRedoDemo from "./components/UndoRedoDemo";
import VdomKeysFocusDemo from "./components/VdomKeysFocusDemo";
import Dashboard from "./components/Dashboard";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <h1>React Course - Vite Starter</h1>
        <section>
          <h2>Counter</h2>
          <Counter />
        </section>
        <section>
          <h2>Timer</h2>
          <Timer />
        </section>
        <section>
          <h2>Fetch Users</h2>
          <FetchUsers />
        </section>
        <section>
          <h2>Error Boundary Demo</h2>
          <ErrorBoundaryDemo />
        </section>
        <section>
          <h2>Form with useReducer</h2>
          <FormWithReducer />
        </section>
        <section>
          <h2>Undo / Redo (useReducer)</h2>
          <UndoRedoDemo />
        </section>
        <section>
          <h2>Virtual DOM: Keys & Focus Demo</h2>
          <VdomKeysFocusDemo />
        </section>
        <section>
          <h2>Integrated Demo: Dashboard</h2>
          <Dashboard />
        </section>
      </div>
    </ThemeProvider>
  );
}
