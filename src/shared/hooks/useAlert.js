import { useState, useCallback } from 'react';

import { ALERT_DURATION } from '../utils/constants';

export const useAlert = () => {
  const [alert, setAlert] = useState({ message: '', type: '', duration: 3000 });

  const getAlertDuration = useCallback((type) => {
    return ALERT_DURATION[type.toUpperCase()] || ALERT_DURATION.WARNING;
  }, []);

  const showAlert = useCallback(
    (message, type = 'info', duration) => {
      setAlert({
        message,
        type,
        duration: duration || getAlertDuration(type),
      });
    },
    [getAlertDuration],
  );

  const showSuccess = useCallback(
    (message) => {
      showAlert(message, 'success');
    },
    [showAlert],
  );

  const showError = useCallback(
    (message) => {
      showAlert(message, 'error');
    },
    [showAlert],
  );

  const showWarning = useCallback(
    (message) => {
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
