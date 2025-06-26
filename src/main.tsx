
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeProductionConfig } from "./config/production";
import { performanceLogger } from "./utils/performance";

// Initialize production configuration
initializeProductionConfig();

// Register service worker for offline capability
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Enhanced performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    // Log Core Web Vitals
    if (entry.entryType === 'largest-contentful-paint') {
      console.log(`📊 LCP: ${entry.startTime.toFixed(2)}ms`);
    }
    
    if (entry.entryType === 'first-input') {
      const fidEntry = entry as PerformanceEventTiming;
      console.log(`📊 FID: ${(fidEntry.processingStart - fidEntry.startTime).toFixed(2)}ms`);
    }
    
    if (entry.entryType === 'layout-shift') {
      const clsEntry = entry as any;
      if (clsEntry.value > 0.1) { // Only log significant shifts
        console.log(`📊 CLS: ${clsEntry.value.toFixed(4)}`);
      }
    }
    
    // Log navigation and resource timing
    if (entry.entryType === 'navigation' || entry.entryType === 'resource') {
      if (entry.duration > 1000) { // Only log slow resources
        console.log(`📊 ${entry.name}: ${entry.duration.toFixed(2)}ms`);
      }
    }
  });
});

if (typeof window !== 'undefined') {
  performanceObserver.observe({ 
    entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift', 'navigation', 'resource'] 
  });
}

// Error tracking and monitoring
window.addEventListener('error', (event) => {
  console.error('🚨 Global Error:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error,
    timestamp: new Date().toISOString()
  });
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled Promise Rejection:', {
    reason: event.reason,
    promise: event.promise,
    timestamp: new Date().toISOString()
  });
});

// App initialization with performance timing
const initTimer = performanceLogger.startTimer('App Initialization');

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

initTimer.end();

// Log initial memory usage
performanceLogger.logMemoryUsage();
