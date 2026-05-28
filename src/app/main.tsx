import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import '../assets/styles/globals.css';
import App from './App';

import { notifyAppUpdateAvailable } from '@/lib/appUpdateEvents';
import {
  reportWebVitalsWithAnalytics,
  setupPerformanceObserver,
  monitorMemoryUsage,
} from '@/lib/reportWebVitals';
import { register as registerSW } from '@/lib/serviceWorkerRegistration';

const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('THREE.Clock: This module has been deprecated') ||
      args[0].includes(
        'using deprecated parameters for the initialization function',
      ))
  ) {
    return;
  }
  originalWarn(...args);
};
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Initialize performance monitoring
reportWebVitalsWithAnalytics();
setupPerformanceObserver();

// Register service worker for PWA functionality
if (import.meta.env.MODE === 'production') {
  registerSW({
    onSuccess: (registration) => {
      if (import.meta.env.DEV) {
        console.log('🎉 Service worker registration successful:', registration);
      }
    },
    onUpdate: (registration) => {
      if (import.meta.env.DEV) {
        console.log('🔄 New content is available, please refresh.');
      }
      notifyAppUpdateAvailable(registration);
    },
  });
}

// Monitor memory usage periodically in development
if (import.meta.env.DEV) {
  setInterval(() => {
    monitorMemoryUsage();
  }, 30000);
}
