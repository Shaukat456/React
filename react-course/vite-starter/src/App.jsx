import React from "react";
import Counter from "./components/Counter";
import Timer from "./components/Timer";
import FetchUsers from "./components/FetchUsers";
import ErrorBoundaryDemo from "./components/ErrorBoundaryDemo";

export default function App() {
  return (
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
    </div>
  );
}
