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
  DARK_GRID: '#242423' /* --color-background-secondary (dark) */,
  DARK_TEXT: '#F4F1E8' /* --color-text-primary (dark) */,
  DARK_BG: '#1C1C1B' /* --color-background-base (dark) */,
  LIGHT_GRID: '#EBE8E3' /* --color-border-grid (light) */,
  LIGHT_TEXT: '#101010' /* --color-text-primary (light) */,
  LIGHT_BG: '#F3F0EB' /* --color-background-base (light) */,
};

export const darkModeColorList: Record<number, string> = {
  0: THEME_COLORS.DARK_BG /* --color-background-base (dark) */,
  1: '#2B2A28' /* --color-background-tertiary (dark) */,
  2: '#333230' /* --color-surface-raised (dark) */,
  3: '#3A3937' /* --color-surface-overlay (dark) */,
  4: '#4A4845' /* --color-border-default (dark) */,
  5: '#6B6866' /* --color-border-strong (dark) */,
};

export const lightModeColorList: Record<number, string> = {
  0: THEME_COLORS.LIGHT_BG /* --color-background-base (light) */,
  1: '#DDDAD6' /* --color-background-secondary (light) */,
  2: '#ECE8E2' /* --color-surface-default (light) */,
  3: '#E2DED8' /* --color-surface-sunken (light) */,
  4: '#D6D3CE' /* --color-border-card (light) */,
  5: '#BDBCB9' /* --color-border-default (light) */,
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

export const LOADER_LOGS = {
  GLOBAL_BOOT: [
    'INITIALIZING KERNEL MODULES...',
    'MOUNTING VIRTUAL FILE SYSTEMS...',
    'ALLOCATING MEMORY SPACES...',
    'LOADING EXPERIENCE GRAPH...',
    'ESTABLISHING SECURE PROTOCOLS...',
    'CONNECTING CLOUD SERVICES...',
    'COMPILING USER INTERFACES...',
    'RESOLVING DEPENDENCY TREES...',
    'INDEXING PROJECT SNAPSHOTS...',
    'OPTIMIZING ASSET PIPELINES...',
    'SYNCHRONIZING DATA LAYERS...',
    'PREPARING INTERACTIVE MODULES...',
    'INITIALIZING EVENT EMITTERS...',
    'VALIDATING SYSTEM ARCHITECTURE...',
    'BOOT SEQUENCE NEARING COMPLETION...',
  ],
  ROUTES: [
    'ROUTING PROTOCOLS INITIATED...',
    'RESOLVING DYNAMIC IMPORTS...',
    'FETCHING MODULE BUNDLES...',
    'PARSING COMPONENT TREES...',
    'HYDRATING DOM ELEMENTS...',
  ],
  HERO: [
    'INITIALIZING WEBGL CONTEXT...',
    'ALLOCATING GPU BUFFERS...',
    'COMPILING SHADER PROGRAMS...',
    'LOADING GEOMETRY DATA...',
    'CALIBRATING 3D PHYSICS ENGINE...',
    'COMPUTING LIGHTING AND SHADOWS...',
    'RENDERING MESHES...',
  ],
  GITHUB: [
    'INITIATING SECURE HANDSHAKE WITH GITHUB API...',
    'AUTHENTICATING REQUEST...',
    'FETCHING REPOSITORY METADATA...',
    'PARSING COMMIT HISTORY...',
    'CALCULATING LANGUAGE STATISTICS...',
    'PROCESSING PULL REQUEST DATA...',
    'COMPILING REPOSITORY CARDS...',
  ],
  PORTFOLIO: [
    'ALLOCATING RESOURCES FOR PORTFOLIO CONTENT...',
    'RETRIEVING PROJECT MANIFESTS...',
    'PRELOADING IMAGES AND ASSETS...',
    'ASSEMBLING GRID LAYOUTS...',
    'APPLYING TYPOGRAPHIC SCALES...',
    'LOADING PORTFOLIO CONTENT...',
  ],
  PAGE_SECTIONS: [
    'IDENTIFYING PAGE TOPOLOGY...',
    'MOUNTING INTERSECTION OBSERVERS...',
    'CALCULATING SCROLL SNAP POINTS...',
    'PREPARING ANIMATION KEYFRAMES...',
    'LOADING PAGE SECTIONS...',
  ],
  ARCHITECTURE: [
    'FETCHING ARCHITECTURE BLUEPRINTS...',
    'PARSING DIAGRAM SCHEMAS...',
    'GENERATING VECTOR ELEMENTS...',
    'POSITIONING DIAGRAM NODES...',
    'DRAWING RELATIONSHIP EDGES...',
    'LOADING ARCHITECTURE DIAGRAMS...',
  ],
  ERROR_RECOVERY: [
    'CRITICAL EXCEPTION DETECTED...',
    'CAPTURING STACK TRACE...',
    'ANALYZING FAILURE POINT...',
    'ISOLATING CORRUPTED MODULES...',
    'INITIATING SAFE MODE DEPLOYMENT...',
    'ATTEMPTING SYSTEM RECOVERY...',
  ],
} as const;
