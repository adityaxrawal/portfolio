import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  assetsInclude: ['**/*.glb'],
  plugins: [
    react(),
    tsconfigPaths(),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      template: 'treemap',
    }),
  ],
  server: {
    open: true,
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-core';
            if (id.includes('three') || id.includes('@react-three') || id.includes('@dimforge/rapier')) {
              return '3d-engine';
            }
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
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx', '.json'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
