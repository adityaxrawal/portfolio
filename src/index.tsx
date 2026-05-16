import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from '@/app/App';
import {
  reportWebVitalsWithAnalytics,
  setupPerformanceObserver,
  monitorMemoryUsage,
} from '@/lib/reportWebVitals';
import { notifyAppUpdateAvailable } from '@/lib/appUpdateEvents';
import { register as registerSW } from '@/lib/serviceWorkerRegistration';

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
      console.log('🎉 Service worker registration successful:', registration);
    },
    onUpdate: (registration) => {
      console.log('🔄 New content is available, please refresh.');
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
