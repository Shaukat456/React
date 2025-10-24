import React from "react";

// Memoized to avoid re-render unless props change by shallow compare
const TaskItem = React.memo(function TaskItem({ task, onToggle, onRemove }) {
  return (
    <li
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        padding: "4px 0",
      }}
      data-id={task.id}
    >
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
        {task.text}
      </span>
      <button
        onClick={() => onRemove(task.id)}
        aria-label={`remove-${task.id}`}
      >
        Remove
      </button>
    </li>
  );
});

export default TaskItem;
