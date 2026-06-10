import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  timeout: 120000,
  use: {
    baseURL: 'http://localhost:3001',
  },
  // webServer: {
  //   command: 'pnpm dev',
  //   url: 'http://localhost:3001',
  //   reuseExistingServer: true,
  // },
});

