import { useState, useCallback } from "react";
import { ALERT_DURATION } from "../share/utils/constant";

export const useAlert = () => {
  const [alert, setAlert] = useState({ message: "", type: "" });

  const showAlert = useCallback((message, type = "info") => {
    setAlert({ message, type });
  }, []);

  const showSuccess = useCallback(
    (message) => {
      showAlert(message, "success");
    },
    [showAlert]
  );

  const showError = useCallback(
    (message) => {
      showAlert(message, "error");
    },
    [showAlert]
  );

  const showWarning = useCallback(
    (message) => {
      showAlert(message, "warning");
    },
    [showAlert]
  );

  const clearAlert = useCallback(() => {
    setAlert({ message: "", type: "" });
  }, []);

  const getAlertDuration = useCallback((type) => {
    return ALERT_DURATION[type.toUpperCase()] || ALERT_DURATION.WARNING;
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
