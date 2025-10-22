import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import BuggyComponent from "./BuggyComponent";

export default function ErrorBoundaryDemo() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}
