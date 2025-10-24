import React from "react";

export default function BuggyComponent() {
  const [throwNow, setThrowNow] = React.useState(false);
  if (throwNow) throw new Error("I crashed!");
  return (
    <div>
      <p>No error. Click to crash:</p>
      <button onClick={() => setThrowNow(true)}>Crash</button>
    </div>
  );
}
