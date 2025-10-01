import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  reportWebVitalsWithAnalytics,
  setupPerformanceObserver,
} from "./utils/reportWebVitals";
import {
  register as registerSW,
  setupPWAInstallPrompt,
} from "./utils/serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Initialize performance monitoring
reportWebVitalsWithAnalytics();
setupPerformanceObserver();

// Register service worker for PWA functionality
if (process.env.NODE_ENV === "production") {
  registerSW({
    onSuccess: (registration) => {
      console.log("🎉 Service worker registration successful:", registration);
    },
    onUpdate: (registration) => {
      console.log("🔄 New content is available, please refresh.");
      // You could show a toast notification here
      if (window.confirm("New version available! Refresh to update?")) {
        window.location.reload();
      }
    },
  });

  // Setup PWA install prompt
  setupPWAInstallPrompt();
}

// Monitor memory usage periodically in development
if (process.env.NODE_ENV === "development") {
  setInterval(() => {
    import("./utils/reportWebVitals").then(({ monitorMemoryUsage }) => {
      monitorMemoryUsage();
    });
  }, 30000); // Check every 30 seconds
}
