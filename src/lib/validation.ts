import { API_ENDPOINTS } from '@/constants';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  clientIp?: string;
  dailyLimit?: number;
  formattedMessage?: string;
  recipient?: string;
}

export const validateContactForm = (formData: ContactFormData) => {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.subject.trim()) {
    errors.subject = 'Subject is required';
  }

  if (!formData.message.trim()) {
    errors.message = 'Message is required';
  }

  return errors;
};

export const createFormSubmitter = (
  showSuccess: (msg: string) => void,
  showError: (msg: string) => void,
  onClose: () => void,
) => {
  return async (formData: ContactFormData) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT_FORM, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      if (response.ok) {
        showSuccess('Message sent successfully.');

        // Close modal after a short delay
        setTimeout(() => {
          onClose();
        }, 2000);

        return true;
      } else {
        interface ApiError {
          message?: string;
        }
        let errorData: ApiError = {};

        try {
          errorData = await response.json();
        } catch {
          errorData = {};
        }

        showError(
          errorData.message || 'Failed to send message. Please try again.',
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        showError('Request timed out. Please try again later.');
      } else {
        showError('Network error. Please check your connection and try again.');
      }
    } finally {
      clearTimeout(timeoutId);
    }

    return false;
  };
};
