import React from "react";
import { useTheme } from "../context/ThemeContext";

// Separate chunk loaded lazily via React.lazy in Dashboard
export default function SettingsPanel() {
  const { theme, toggle } = useTheme();
  return (
    <div style={{ borderTop: "1px solid #eee", paddingTop: 8 }}>
      <h4>Settings</h4>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span>Current theme: {theme}</span>
        <button onClick={toggle}>Toggle theme</button>
      </div>
      <p style={{ fontSize: 12, color: "#666" }}>
        This component is code-split using React.lazy + Suspense.
      </p>
    </div>
  );
}
