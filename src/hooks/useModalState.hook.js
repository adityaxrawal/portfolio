import { useCallback, useEffect, useState } from "react";

export const useModalState = (open, onClose) => {
  const [currentStep, setCurrentStep] = useState("options");

  // Handle ESC key press to close modal
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      // Store original overflow value
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Apply styles to prevent background scrolling
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      // Reset state when modal closes
      setCurrentStep("options");
    }
  }, [open, handleKeyDown]);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return {
    currentStep,
    setCurrentStep,
    handleBackdropClick,
  };
};
