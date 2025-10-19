# Lesson 05 — Forms and controlled components

Learning objectives

- Understand controlled vs uncontrolled inputs
- Manage form state and validation in React
- Implement form submission and accessibility considerations

Overview & significance

Forms are the primary way users provide input. React encourages controlled components, where input values are kept in component state and updated via onChange handlers. Controlled forms provide a single source of truth and enable validation, formatting, and dynamic UIs.

Controlled input example

```jsx
function NameForm({ onSubmit }) {
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState(null);

  function submit(e) {
    e.preventDefault();
    if (name.trim() === "") {
      setError("Name required");
      return;
    }
    onSubmit(name);
  }

  return (
    <form onSubmit={submit} aria-label="name-form">
      <label>
        Name:
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(null);
          }}
        />
      </label>
      {error && (
        <div role="alert" style={{ color: "red" }}>
          {error}
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
```

Uncontrolled input (brief)

- Uses DOM refs to read values on submit (less React-y, sometimes simpler for third-party libs or large forms where performance matters).

```jsx
function UncontrolledForm({ onSubmit }) {
  const ref = React.useRef();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(ref.current.value);
      }}
    >
      <input ref={ref} defaultValue="" />
      <button>Send</button>
    </form>
  );
}
```

Real-world scenarios

- Single-field forms: controlled inputs are easiest to reason about.
- Large forms (hundreds of fields): uncontrolled inputs or form libraries (Formik, React Hook Form) can be more performant and easier to scale.
- Accessibility: always attach labels, use aria attributes for error messages and real-time feedback.

Good practices

- Validate early and show clear, accessible error messages.
- Keep form state local to the form; lift only when multiple components must read the form state.
- Use debounce for expensive validation (e.g., remote username checks).

Bad practices

- Mutating DOM inputs manually or mixing controlled/uncontrolled patterns on the same input.
- Storing form values in deep global state unnecessarily.

Exercises

1. Build a login form with email and password, validate email format, and show error messages.
2. Implement a multi-step form (wizard) keeping state in a parent component.

Interview Q&A

Q: What's the difference between controlled and uncontrolled inputs?
A: Controlled inputs keep their current value in React state and update on onChange; uncontrolled inputs read values from the DOM via refs. Controlled inputs provide a single source-of-truth; uncontrolled can be simpler and slightly faster for very large forms.

Q: When would you use a form library?
A: When forms are large, have complex validation, need field-level performance optimizations, or require advanced features like schema-based validation (Yup) or dirty tracking.

Q: How do you make forms accessible?
A: Provide labels for inputs, use `aria-invalid` and `aria-describedby` for errors, make error messages focusable or announced via role="alert", and ensure keyboard operability.
