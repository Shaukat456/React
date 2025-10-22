import React from "react";

export default function Timer() {
  const [seconds, setSeconds] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <div>Seconds elapsed: {seconds}</div>;
}
