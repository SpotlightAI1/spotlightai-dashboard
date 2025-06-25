
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeProductionConfig } from "./config/production";

// Initialize production configuration
initializeProductionConfig();

// Log performance metrics
const perfObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(`📊 ${entry.name}: ${entry.duration.toFixed(2)}ms`);
  });
});

if (typeof window !== 'undefined') {
  perfObserver.observe({ entryTypes: ['navigation', 'resource'] });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
