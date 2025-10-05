import React, { useState, useCallback, useMemo } from "react";
import "./contactInfo.component.css";
import { useSharedState } from "../../../context/app-context";
import { useModalState } from "../../../hooks/useModalState.hook";
import { useAlert } from "../../../hooks/useAlert.hook";
import { createFormSubmitter } from "../../../utils/validation";
import { MODAL_STEPS, MODAL_TITLES } from "../../../share/utils/constant";
import Alert from "../../Alert/alert.component";
import ModalHeader from "./ModalHeader/ModalHeader.component";
import ContactOptions from "./ContactOptions/ContactOptions.component";
import ContactForm from "./ContactForm/ContactForm.component";

const ContactInfo = React.memo(({ open, onClose }) => {
  const { isDarkTheme } = useSharedState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { currentStep, setCurrentStep, handleBackdropClick } = useModalState(
    open,
    onClose
  );
  const { alert, showSuccess, showError, clearAlert, getAlertDuration } =
    useAlert();

  // Clear alert when modal closes
  React.useEffect(() => {
    if (!open) {
      clearAlert();
    }
  }, [open, clearAlert]);

  // Memoize the modal title to avoid recalculation
  const modalTitle = useMemo(() => {
    return MODAL_TITLES[currentStep] || "Contact";
  }, [currentStep]);

  // Memoize the form submit handler to prevent unnecessary re-renders
  const handleFormSubmit = useCallback(
    async (formData) => {
      setIsSubmitting(true);
      try {
        const submitForm = createFormSubmitter(showSuccess, showError, onClose);
        await submitForm(formData);
      } finally {
        setIsSubmitting(false);
      }
    },
    [showSuccess, showError, onClose]
  );

  // Memoize the back handler to prevent ContactForm re-renders
  const handleBackToOptions = useCallback(() => {
    setCurrentStep(MODAL_STEPS.OPTIONS);
  }, [setCurrentStep]);

  // Memoize the content renderer
  const renderContent = useCallback(() => {
    if (currentStep === MODAL_STEPS.OPTIONS) {
      return <ContactOptions onSelectOption={setCurrentStep} />;
    }

    return (
      <ContactForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
    );
  }, [currentStep, setCurrentStep, handleFormSubmit, isSubmitting]);

  if (!open) return null;

  return (
    <>
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={clearAlert}
          duration={getAlertDuration(alert.type)}
        />
      )}

      <div className="contact-modal-backdrop" onClick={handleBackdropClick}>
        <div
          className={`contact-info-modal ${isDarkTheme ? "dark" : "light"}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-title"
        >
          <ModalHeader
            title={modalTitle}
            onClose={onClose}
            showBackButton={currentStep === MODAL_STEPS.FORM}
            onBack={handleBackToOptions}
          />

          {renderContent()}
        </div>
      </div>
    </>
  );
});

ContactInfo.displayName = "ContactInfo";

export default ContactInfo;
