import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
// @ts-expect-error - no types for local script
import { createGitHubStatsDevMiddleware } from './scripts/dev-github-api.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  assetsInclude: ['**/*.glb'],
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      template: 'treemap',
    }),
    {
      name: 'github-stats-api',
      configureServer(server) {
        server.middlewares.use(
          createGitHubStatsDevMiddleware(server.config.mode),
        );
      },
    },
  ],
  resolve: {
    tsconfigPaths: true,
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.jsx', '.js', '.ts', '.tsx', '.json'],
  },
  server: {
    open: true,
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three') || id.includes('@dimforge/rapier')) {
              return '3d-engine';
            }
            if (id.includes('react')) return 'react-core';
            if (id.includes('framer-motion')) return 'motion';
            if (
              id.includes('gsap') ||
              id.includes('lenis') ||
              id.includes('tinycolor2')
            ) {
              return 'libs';
            }
            return 'vendor';
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
