import React, { useMemo, useState, useRef, useEffect } from "react";

function makeItems() {
  return Array.from({ length: 5 }, (_, i) => ({
    id: String(i + 1),
    name: `Item ${i + 1}`,
  }));
}

function ListItem({ item }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  return (
    <div
      className="list-item"
      style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}
    >
      <span style={{ width: 60 }}>{item.name}</span>
      <input
        ref={inputRef}
        placeholder="type here"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: 6 }}
      />
    </div>
  );
}

function BadList({ items }) {
  // Intentionally use index as key to demonstrate problems on reorder
  return (
    <div>
      <h4>Index keys (bad)</h4>
      {items.map((item, index) => (
        <ListItem key={index} item={item} />
      ))}
      <p style={{ fontSize: 12, color: "#b00" }}>
        Try: Click into any input, then click "Move first to end". Notice how
        text and focus may jump to a different row.
      </p>
    </div>
  );
}

function GoodList({ items }) {
  return (
    <div>
      <h4>Stable keys (good)</h4>
      {items.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
      <p style={{ fontSize: 12, color: "#0a0" }}>
        With stable keys, each row keeps its own state and focus even when the
        list reorders.
      </p>
    </div>
  );
}

export default function VdomKeysFocusDemo() {
  const [items, setItems] = useState(() => makeItems());

  function moveFirstToEnd() {
    setItems((arr) => (arr.length > 0 ? [...arr.slice(1), arr[0]] : arr));
  }

  function removeFirst() {
    setItems((arr) => arr.slice(1));
  }

  function reset() {
    setItems(makeItems());
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <p>
        This demo shows how React uses keys during reconciliation. The left list
        uses index keys (bad), the right uses stable IDs (good). Type into any
        input, then reorder or remove items to observe the difference.
      </p>
      <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
        <button onClick={moveFirstToEnd}>Move first to end</button>
        <button onClick={removeFirst}>Remove first</button>
        <button onClick={reset}>Reset</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <BadList items={items} />
        <GoodList items={items} />
      </div>
    </div>
  );
}
