import { useCallback, useEffect, useRef, useState } from 'react';

const BODY_STYLE_DEFAULTS = { overflow: '', paddingRight: '' };

export const useModalState = (open: boolean, onClose: () => void) => {
  const [currentStep, setCurrentStep] = useState('options');
  const bodyStylesRef = useRef(BODY_STYLE_DEFAULTS);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onCloseRef.current();
    }
  }, []);

  useEffect(() => {
    if (open) {
      bodyStylesRef.current = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
      };

      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = bodyStylesRef.current.overflow;
        document.body.style.paddingRight = bodyStylesRef.current.paddingRight;
        document.removeEventListener('keydown', handleKeyDown);
      };
    }

    setCurrentStep('options');
  }, [open, handleKeyDown]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCloseRef.current();
    }
  }, []);

  return {
    currentStep,
    setCurrentStep,
    handleBackdropClick,
  };
};
