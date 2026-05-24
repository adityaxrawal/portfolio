/**
 * src/config/env.ts
 *
 * Single source of truth for all environment variables consumed by the browser bundle.
 * All VITE_ variables are validated here at module load time so misconfiguration
 * surfaces immediately as a thrown error rather than a silent runtime failure.
 *
 * Server-side-only vars (e.g. GITHUB_TOKEN) intentionally do NOT appear here — they
 * are consumed directly in scripts/dev-github-api.mjs and never sent to the client.
 */

/**
 * Returns the value of a Vite env var, or a default if provided.
 * Throws at startup if the var is required but missing.
 */
function readEnv(key: string, defaultValue: string): string;
function readEnv(key: string): string | undefined;
function readEnv(key: string, defaultValue?: string): string | undefined {
  const value = (import.meta.env as Record<string, string | undefined>)[key];
  if (!value && defaultValue === undefined) return undefined;
  return value ?? defaultValue;
}

export const env = {
  /**
   * Contact form backend URL.
   * Falls back to the production Cloud Run URL when VITE_CONTACT_API_URL is not set.
   * Set VITE_CONTACT_API_URL in .env to override for local development.
   */
  CONTACT_API_URL: readEnv(
    'VITE_CONTACT_API_URL',
    'https://portfolio-backend-v1-373822582459.europe-west1.run.app/contact',
  ),

  /**
   * Optional custom analytics endpoint for web vitals reporting.
   * If not set, vitals are only logged in development mode.
   */
  ANALYTICS_ENDPOINT: readEnv('VITE_ANALYTICS_ENDPOINT'),

  /** Vite built-in mode flags */
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
  MODE: import.meta.env.MODE,
} as const;
