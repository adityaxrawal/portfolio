import { useCallback, useEffect, useState } from 'react';
import { FiRefreshCw, FiX } from 'react-icons/fi';

import './AppUpdatePrompt.css';
import { useSharedState } from '@/app/providers/AppContext';
import {
  APP_UPDATE_AVAILABLE_EVENT,
  clearPendingAppUpdate,
  getPendingAppUpdate,
} from '@/lib/appUpdateEvents';

const AppUpdatePrompt = () => {
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { isDarkTheme } = useSharedState();

  useEffect(() => {
    const pendingUpdate = getPendingAppUpdate();

    if (pendingUpdate) {
      setRegistration(pendingUpdate);
    }

    const handleUpdateAvailable = (event: Event) => {
      const customEvent = event as CustomEvent;
      setRegistration(customEvent.detail?.registration ?? null);
    };

    window.addEventListener(APP_UPDATE_AVAILABLE_EVENT, handleUpdateAvailable);

    return () => {
      window.removeEventListener(
        APP_UPDATE_AVAILABLE_EVENT,
        handleUpdateAvailable,
      );
    };
  }, []);

  const refreshToLatest = useCallback(() => {
    setIsRefreshing(true);

    let hasReloaded = false;
    const reloadOnce = () => {
      if (hasReloaded) return;
      hasReloaded = true;
      window.location.reload();
    };

    if (registration?.waiting) {
      navigator.serviceWorker?.addEventListener(
        'controllerchange',
        reloadOnce,
        {
          once: true,
        },
      );
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.setTimeout(reloadOnce, 1200);
      return;
    }

    reloadOnce();
  }, [registration]);

  const dismissUpdate = useCallback(() => {
    clearPendingAppUpdate();
    setRegistration(null);
  }, []);

  if (!registration) return null;

  const themeClass = isDarkTheme
    ? 'app-update-prompt--dark'
    : 'app-update-prompt--light';

  return (
    <section
      className={`app-update-prompt ${themeClass}`}
      role="status"
      aria-live="polite"
      aria-label="Portfolio update available"
    >
      <div className="app-update-prompt__content">
        <p className="app-update-prompt__eyebrow">Fresh build landed</p>
        <h2 className="app-update-prompt__title">New work is ready</h2>
        <p className="app-update-prompt__message">
          Refresh to load the latest version of the portfolio.
        </p>

        <div className="app-update-prompt__actions">
          <button
            className="app-update-prompt__refresh"
            type="button"
            onClick={refreshToLatest}
            disabled={isRefreshing}
          >
            <FiRefreshCw aria-hidden="true" />
            <span>{isRefreshing ? 'Refreshing' : 'Refresh now'}</span>
          </button>
        </div>
      </div>

      <button
        className="app-update-prompt__dismiss"
        type="button"
        onClick={dismissUpdate}
        aria-label="Dismiss update message"
      >
        <FiX aria-hidden="true" />
      </button>
    </section>
  );
};

export default AppUpdatePrompt;
