import React, { useReducer } from "react";

function historyReducer(state, action) {
  const { past, present, future } = state;
  switch (action.type) {
    case "set":
      return { past: [...past, present], present: action.value, future: [] };
    case "undo":
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      return {
        past: past.slice(0, -1),
        present: previous,
        future: [present, ...future],
      };
    case "redo":
      if (future.length === 0) return state;
      const next = future[0];
      return {
        past: [...past, present],
        present: next,
        future: future.slice(1),
      };
    case "reset":
      return { past: [], present: action.value, future: [] };
    default:
      return state;
  }
}

export default function UndoRedoDemo() {
  const [state, dispatch] = useReducer(historyReducer, {
    past: [],
    present: "",
    future: [],
  });

  return (
    <div className="example">
      <h3>Undo / Redo Demo</h3>
      <input
        value={state.present}
        onChange={(e) => dispatch({ type: "set", value: e.target.value })}
      />
      <div style={{ marginTop: 8 }}>
        <button
          onClick={() => dispatch({ type: "undo" })}
          disabled={state.past.length === 0}
        >
          Undo
        </button>
        <button
          onClick={() => dispatch({ type: "redo" })}
          disabled={state.future.length === 0}
        >
          Redo
        </button>
        <button onClick={() => dispatch({ type: "reset", value: "" })}>
          Reset
        </button>
      </div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
