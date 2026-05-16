declare global {
  interface Window {
    __portfolioUpdateRegistration?: ServiceWorkerRegistration | null;
  }
}

export const APP_UPDATE_AVAILABLE_EVENT = 'portfolio:update-available';

export const notifyAppUpdateAvailable = (
  registration: ServiceWorkerRegistration,
) => {
  window.__portfolioUpdateRegistration = registration;

  window.dispatchEvent(
    new CustomEvent(APP_UPDATE_AVAILABLE_EVENT, {
      detail: { registration },
    }),
  );
};

export const getPendingAppUpdate = () => window.__portfolioUpdateRegistration;

export const clearPendingAppUpdate = () => {
  window.__portfolioUpdateRegistration = null;
};
