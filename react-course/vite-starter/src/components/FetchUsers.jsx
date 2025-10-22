import React from "react";

export default function FetchUsers() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) {
          setUsers(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>
          {u.name} — {u.email}
        </li>
      ))}
    </ul>
  );
}
