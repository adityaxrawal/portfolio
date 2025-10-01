// src/utils/reportWebVitals.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

// Enhanced Web Vitals reporting with multiple analytics integration
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Core Web Vitals
    getCLS(onPerfEntry); // Cumulative Layout Shift
    getFID(onPerfEntry); // First Input Delay
    getFCP(onPerfEntry); // First Contentful Paint
    getLCP(onPerfEntry); // Largest Contentful Paint
    getTTFB(onPerfEntry); // Time to First Byte
  }
};

// Enhanced reporting with console logging and potential analytics integration
export const reportWebVitalsWithAnalytics = () => {
  reportWebVitals((metric) => {
    // Console logging for development
    if (process.env.NODE_ENV === "development") {
      console.log("📊 Web Vitals:", metric);
    }

    // Send to analytics (Google Analytics 4 example)
    if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
      window.gtag("event", metric.name, {
        event_category: "Web Vitals",
        event_label: metric.id,
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value
        ),
        non_interaction: true,
      });
    }

    // Send to custom analytics endpoint
    if (process.env.NODE_ENV === "production") {
      sendToAnalytics(metric);
    }
  });
};

// Custom analytics function - replace with your preferred analytics service
const sendToAnalytics = (metric) => {
  // Example: Send to your own analytics endpoint
  const analyticsEndpoint = process.env.REACT_APP_ANALYTICS_ENDPOINT;

  if (analyticsEndpoint) {
    fetch(analyticsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    }).catch((error) => {
      console.warn("Failed to send analytics:", error);
    });
  }
};

// Performance observer for additional metrics
export const setupPerformanceObserver = () => {
  if ("PerformanceObserver" in window) {
    try {
      // Observe long tasks (> 50ms)
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            console.warn("⚠️ Long task detected:", {
              duration: entry.duration,
              startTime: entry.startTime,
              name: entry.name,
            });
          }
        });
      });
      longTaskObserver.observe({ entryTypes: ["longtask"] });

      // Observe layout shifts
      const layoutShiftObserver = new PerformanceObserver((list) => {
        let cumulativeScore = 0;
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            cumulativeScore += entry.value;
          }
        });

        if (cumulativeScore > 0.1) {
          console.warn("⚠️ Layout shift detected:", cumulativeScore);
        }
      });
      layoutShiftObserver.observe({ entryTypes: ["layout-shift"] });
    } catch (error) {
      console.warn("Performance Observer not supported:", error);
    }
  }
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if ("memory" in performance) {
    const memoryInfo = performance.memory;
    const memoryUsage = {
      usedJSHeapSize: Math.round(memoryInfo.usedJSHeapSize / 1048576), // MB
      totalJSHeapSize: Math.round(memoryInfo.totalJSHeapSize / 1048576), // MB
      jsHeapSizeLimit: Math.round(memoryInfo.jsHeapSizeLimit / 1048576), // MB
    };

    console.log("💾 Memory Usage:", memoryUsage);

    // Warn if memory usage is high
    if (memoryUsage.usedJSHeapSize > 50) {
      console.warn("⚠️ High memory usage detected:", memoryUsage);
    }

    return memoryUsage;
  }

  return null;
};

export default reportWebVitals;
