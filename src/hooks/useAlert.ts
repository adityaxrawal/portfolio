import { useState, useCallback } from 'react';

import { ALERT_DURATION } from '@/constants';

type AlertType = 'info' | 'success' | 'error' | 'warning';

export const useAlert = () => {
  const [alert, setAlert] = useState({ message: '', type: '', duration: 3000 });

  const getAlertDuration = useCallback((type: string) => {
    const durationMap: Record<string, number> = ALERT_DURATION;
    return durationMap[type.toUpperCase()] || ALERT_DURATION.WARNING;
  }, []);

  const showAlert = useCallback(
    (message: string, type: AlertType | string = 'info', duration?: number) => {
      setAlert({
        message,
        type,
        duration: duration || getAlertDuration(type),
      });
    },
    [getAlertDuration],
  );

  const showSuccess = useCallback(
    (message: string) => {
      showAlert(message, 'success');
    },
    [showAlert],
  );

  const showError = useCallback(
    (message: string) => {
      showAlert(message, 'error');
    },
    [showAlert],
  );

  const showWarning = useCallback(
    (message: string) => {
      showAlert(message, 'warning');
    },
    [showAlert],
  );

  const clearAlert = useCallback(() => {
    setAlert({ message: '', type: '', duration: 3000 });
  }, []);

  return {
    alert,
    showAlert,
    showSuccess,
    showError,
    showWarning,
    clearAlert,
    getAlertDuration,
  };
};
