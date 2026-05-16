import { memo, useCallback } from 'react';

import { links, MODAL_STEPS } from '@/config';
import './ContactOptions.css';

interface ContactOptionsProps {
  onSelectOption: (step: string) => void;
}

const ContactOptions = memo(({ onSelectOption }: ContactOptionsProps) => {
  const handleSendMessage = useCallback(() => {
    onSelectOption(MODAL_STEPS.FORM);
  }, [onSelectOption]);

  return (
    <div className="modal-content">
      <p>Let&apos;s connect and discuss opportunities!</p>

      <div className="contact-options">
        <a
          href={links.linkedInLink}
          className="contact-option linkedin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">💼</span>
          <span>LinkedIn</span>
        </a>

        <a
          href={links.githubLink}
          className="contact-option github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">🧑🏻‍💻</span>
          <span>GitHub</span>
        </a>

        <button
          type="button"
          className="contact-option send-message"
          onClick={handleSendMessage}
        >
          <span className="icon">📨</span>
          <span>Send Message</span>
        </button>
      </div>
    </div>
  );
});

ContactOptions.displayName = 'ContactOptions';

export default ContactOptions;
