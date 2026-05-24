import { useState, useCallback } from 'react';

import { ALERT_DURATION } from '@/config';

import type { AlertType } from '@/features/contact';

export const useAlert = () => {
  const [alert, setAlert] = useState({ message: '', type: '' as AlertType | '', duration: 3000 });

  const getAlertDuration = useCallback((type: string) => {
    const durationMap = ALERT_DURATION as Record<string, number>;
    return durationMap[type.toUpperCase()] || ALERT_DURATION.WARNING;
  }, []);

  const showAlert = useCallback(
    (message: string, type: AlertType = 'info', duration?: number) => {
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
