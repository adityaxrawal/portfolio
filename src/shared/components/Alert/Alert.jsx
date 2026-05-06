import { memo, useEffect, useState } from 'react';
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
  FaTimesCircle,
} from 'react-icons/fa';

import './Alert.css';

const iconMap = {
  success: FaCheckCircle,
  error: FaTimesCircle,
  warning: FaExclamationTriangle,
  info: FaInfoCircle,
};

const titleMap = {
  success: 'Done',
  error: 'Needs attention',
  warning: 'Small note',
  info: 'Note',
};

const Alert = ({
  message,
  type = 'info',
  title,
  theme = 'dark',
  onClose,
  duration = 3000,
}) => {
  const [closing, setClosing] = useState(false);
  const Icon = iconMap[type] || iconMap.info;

  useEffect(() => {
    setClosing(false);
    const timer = setTimeout(() => setClosing(true), duration);
    return () => clearTimeout(timer);
  }, [duration, message, type]);

  useEffect(() => {
    if (!closing) {
      return undefined;
    }

    const fadeOutTimer = setTimeout(() => {
      onClose();
    }, 260);

    return () => clearTimeout(fadeOutTimer);
  }, [closing, onClose]);

  if (!message) return null;

  return (
    <div
      className={`alert alert-${type} alert--${theme} ${
        closing ? 'fade-out' : ''
      }`}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="alert__accent" />
      <Icon className="alert__icon" aria-hidden="true" />
      <span className="alert__content">
        <strong>{title || titleMap[type] || titleMap.info}</strong>
        <span>{message}</span>
      </span>
      <button
        className="alert__close"
        onClick={() => setClosing(true)}
        aria-label="Close notification"
        type="button"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default memo(Alert);
