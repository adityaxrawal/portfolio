import { API_ENDPOINTS } from "../share/utils/constant";

export const validateContactForm = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.subject.trim()) {
    errors.subject = "Subject is required";
  }

  if (!formData.message.trim()) {
    errors.message = "Message is required";
  }

  return errors;
};

export const createFormSubmitter = (showSuccess, showError, onClose) => {
  return async (formData) => {
    try {
      const response = await fetch(API_ENDPOINTS.CONTACT_FORM, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showSuccess("Message sent successfully!");

        // Close modal after a short delay
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        const errorData = await response.json();
        showError(
          errorData.message || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      showError("Network error. Please check your connection and try again.");
    }
  };
};
