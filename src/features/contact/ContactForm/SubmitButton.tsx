import { memo } from 'react';

interface SubmitButtonProps { isFormValid: boolean; isSubmitting: boolean; }

const SubmitButton = memo(({ isFormValid, isSubmitting }: SubmitButtonProps) => (
  <button
    type="submit"
    className="submit-button"
    disabled={!isFormValid || isSubmitting}
    aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
  >
    {isSubmitting ? (
      <>
        <span className="spinner" aria-hidden="true"></span>
        Sending...
      </>
    ) : (
      'Send Message'
    )}
  </button>
));

SubmitButton.displayName = 'SubmitButton';

export default SubmitButton;
