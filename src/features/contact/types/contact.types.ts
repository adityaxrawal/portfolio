export interface ContactFormData {
  recipient: string;
  subject: string;
  message: string;
  formattedMessage: string;
}

export interface ContactFormSubmitPayload extends ContactFormData {
  name: string;
  email: string;
  phone: string;
  clientIp: string;
  dailyLimit: number;
}

export type ContactNotifyType = 'info' | 'success' | 'error' | 'warning';

/** Alert severity used by `useAlert` and the contact modal. */
export type AlertType = ContactNotifyType;

export type ContactNotifyFn = (
  message: string,
  type?: ContactNotifyType,
) => void;
