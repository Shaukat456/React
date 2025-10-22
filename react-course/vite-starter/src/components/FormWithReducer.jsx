import React, { useReducer } from "react";

function formReducer(state, action) {
  switch (action.type) {
    case "change":
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
      };
    case "validate":
      return { ...state, errors: action.errors };
    case "reset":
      return action.initial;
    default:
      return state;
  }
}

const initialForm = { values: { name: "", email: "" }, errors: {} };

export default function FormWithReducer() {
  const [state, dispatch] = useReducer(formReducer, initialForm);

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch({ type: "change", field: name, value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = {};
    if (!state.values.name) errors.name = "Name is required";
    if (!state.values.email.includes("@")) errors.email = "Invalid email";
    if (Object.keys(errors).length) {
      dispatch({ type: "validate", errors });
    } else {
      alert("Submitted: " + JSON.stringify(state.values));
    }
  }

  return (
    <div className="example">
      <h3>Form (useReducer)</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            name="name"
            value={state.values.name}
            onChange={handleChange}
          />
          {state.errors.name && (
            <div className="error">{state.errors.name}</div>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            value={state.values.email}
            onChange={handleChange}
          />
          {state.errors.email && (
            <div className="error">{state.errors.email}</div>
          )}
        </div>
        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={() => dispatch({ type: "reset", initial: initialForm })}
        >
          Reset
        </button>
      </form>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
