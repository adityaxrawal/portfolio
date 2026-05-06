import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import {
  reportWebVitalsWithAnalytics,
  setupPerformanceObserver,
} from './shared/services/reportWebVitals';
import { notifyAppUpdateAvailable } from './shared/services/appUpdateEvents';
import { register as registerSW } from './shared/services/serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
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
    import('./shared/services/reportWebVitals').then(
      ({ monitorMemoryUsage }) => {
        monitorMemoryUsage();
      },
    );
  }, 30000);
}
