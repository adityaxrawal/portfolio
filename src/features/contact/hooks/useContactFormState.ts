import { useMemo, useState } from 'react';

import { MESSAGE_LIMIT } from '../components/ContactForm/contactFormConstants';

export function useContactFormState(isSubmitting: boolean) {
  const [subject, setSubject] = useState('');
  const [messageLength, setMessageLength] = useState(0);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const [insertPanel, setInsertPanel] = useState<string | null>(null);
  const [insertTextValue, setInsertTextValue] = useState('');
  const [insertValue, setInsertValue] = useState('');
  const [selectedLinkText, setSelectedLinkText] = useState('');

  const messageRemaining = MESSAGE_LIMIT - messageLength;

  const canSend = useMemo(
    () => subject.trim().length > 0 && messageLength > 0 && !isSubmitting,
    [isSubmitting, messageLength, subject],
  );

  return {
    subject,
    setSubject,
    messageLength,
    setMessageLength,
    isToolbarVisible,
    setIsToolbarVisible,
    insertPanel,
    setInsertPanel,
    insertTextValue,
    setInsertTextValue,
    insertValue,
    setInsertValue,
    selectedLinkText,
    setSelectedLinkText,
    messageRemaining,
    canSend,
  };
}
