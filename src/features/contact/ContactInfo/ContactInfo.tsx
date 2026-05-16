import { memo, useCallback, useEffect, useState } from 'react';

import './ContactInfo.css';
import ContactForm from '../ContactForm';
import {
  DAILY_CONTACT_LIMIT,
  getContactRateStatus,
  recordContactMailSent,
} from '../services/contactRateLimit';

import { useSharedState } from '@/app/providers/AppContext';
import Alert from '@/components/Alert';
import { useAlert } from '@/hooks/useAlert';
import { createFormSubmitter } from '@/lib/validation';

export interface ContactInfoProps {
  open: boolean;
  onClose: () => void;
}

const ContactInfo = memo(({ open, onClose }: ContactInfoProps) => {
  const { isDarkTheme } = useSharedState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { alert, showAlert, showSuccess, showError, showWarning, clearAlert } =
    useAlert();

  useEffect(() => {
    if (!open) {
      clearAlert();
    }
  }, [open, clearAlert]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose, open]);

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  const handleFormSubmit = useCallback(
    async (formData: {
      recipient: string;
      subject: string;
      message: string;
      formattedMessage: string;
    }) => {
      setIsSubmitting(true);

      try {
        const rateStatus = await getContactRateStatus();

        if (!rateStatus.allowed) {
          showWarning(
            `Daily send limit reached. You can send ${DAILY_CONTACT_LIMIT} messages per day.`,
          );
          return;
        }

        const submitForm = createFormSubmitter(showSuccess, showError, onClose);
        const wasSent = await submitForm({
          ...formData,
          name: 'Portfolio visitor',
          email: 'portfolio.visitor@adityarawal.com',
          phone: '',
          clientIp: rateStatus.ipAddress,
          dailyLimit: rateStatus.limit,
        });

        if (wasSent) {
          const nextLimit = recordContactMailSent(rateStatus.ipAddress);

          if (nextLimit.remaining > 0) {
            showSuccess(
              `Message sent. ${nextLimit.remaining} sends left today.`,
            );
          }
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [onClose, showError, showSuccess, showWarning],
  );

  const notify = useCallback(
    (message: string, type = 'info') => {
      showAlert(message, type);
    },
    [showAlert],
  );

  if (!open) return null;

  return (
    <>
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={clearAlert}
          duration={alert.duration}
          theme={isDarkTheme ? 'dark' : 'light'}
        />
      )}

      <div
        className="contact-modal-backdrop"
        onClick={handleBackdropClick}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleBackdropClick(event);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Close compose window"
      >
        <div
          className={`contact-info-modal contact-compose-modal ${
            isDarkTheme ? 'dark' : 'light'
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-compose-title"
        >
          <h2 id="contact-compose-title" className="sr-only">
            Compose message
          </h2>
          <ContactForm
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
            onClose={onClose}
            notify={notify}
          />
        </div>
      </div>
    </>
  );
});

ContactInfo.displayName = 'ContactInfo';

export default ContactInfo;
