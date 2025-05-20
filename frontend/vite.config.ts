import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // ✅ forces relative URLs for assets
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0
  },
  define: {
    'process.env': {}
  }
});
