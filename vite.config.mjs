import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
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
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx', '.json'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
