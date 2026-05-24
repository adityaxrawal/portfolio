// src/config/index.ts
import { env } from './env';
export * from './env';

export const links = {
  linkedInLink: 'https://www.linkedin.com/in/adityaxrawal',
  githubLink: 'https://www.github.com/adityaxrawal',
  portfolioRepoLink: 'https://github.com/adityaxrawal/portfolio',
  email: 'ar.adityarawal@gmail.com',
  twitterLink: 'https://www.twitter.com/adityaxrawal',
};

// API Endpoints — URLs sourced from environment variables (see src/config/env.ts)
export const API_ENDPOINTS = {
  CONTACT_FORM: env.CONTACT_API_URL,
};

export const THEME_COLORS = {
  DARK_GRID: 'rgba(38, 38, 38, 1)',
  DARK_TEXT: '#F0ECD8',
  DARK_BG: 'rgba(35, 35, 35, 1)',
  LIGHT_GRID: '#efece7ff',
  LIGHT_TEXT: 'rgba(0, 0, 0, 1)',
  LIGHT_BG: '#F4F1EC',
};

export const darkModeColorList: Record<number, string> = {
  0: THEME_COLORS.DARK_BG,
  1: '#31363F',
  2: '#76ABAE',
  3: '#EEEEEE',
  4: '#B8E0E3',
  5: '#F0F5F7',
};

export const lightModeColorList: Record<number, string> = {
  0: THEME_COLORS.LIGHT_BG,
  1: '#DBE2EF',
  2: '#C1D0E6',
  3: '#A7BEDC',
  4: '#3F72AF',
  5: '#112D4E',
};

// --- Modal Constants ---
export const MODAL_STEPS = Object.freeze({
  OPTIONS: 'options',
  FORM: 'form',
});

export const MODAL_TITLES = Object.freeze({
  [MODAL_STEPS.OPTIONS]: 'Get In Touch 🤝',
  [MODAL_STEPS.FORM]: 'Contact Form 📜',
});

export const FORM_SUBMISSION_STATES = Object.freeze({
  IDLE: 'idle',
  SUBMITTING: 'submitting',
  SUCCESS: 'success',
  ERROR: 'error',
});

export const ALERT_DURATION = Object.freeze({
  INFO: 3000,
  SUCCESS: 2000,
  ERROR: 4000,
  WARNING: 3000,
});
