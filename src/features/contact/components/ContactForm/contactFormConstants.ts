export const SUBJECT_LIMIT = 100;
export const MESSAGE_LIMIT = 1000;
export const LIMIT_WARNING_COOLDOWN = 1800;

export const fontOptions = [
  { label: 'Sans Serif', value: 'Arial' },
  { label: 'Serif', value: 'Georgia' },
  { label: 'Monospace', value: 'Courier New' },
] as const;

export const sizeOptions = [
  { label: 'Normal', value: 'p' },
  { label: 'Title', value: 'h2' },
  { label: 'Small', value: 'h5' },
] as const;

export const textColors = ['#202124' /* TODO: palette - contact text color */, '#ccff00' /* TODO: palette - contact text color */, '#d93025' /* TODO: palette - contact text color */, '#188038' /* TODO: palette - contact text color */, '#1967d2' /* TODO: palette - contact text color */];

export const actionLabels = {
  attach: 'Attachments are not available in this form yet.',
  drive: 'Drive attachments are not available in this form yet.',
  confidential: 'Confidential mode is not available in this form yet.',
  pen: 'Signature support is not available in this form yet.',
  more: 'More compose actions are not available in this form yet.',
} as const;

export const panelMeta = {
  link: {
    title: 'Paste a link',
    urlLabel: 'Link URL',
    urlPlaceholder: 'https://example.com',
  },
  image: {
    title: 'Paste an image URL',
    urlLabel: 'Image URL',
    urlPlaceholder: 'https://example.com/image.png',
  },
} as const;
