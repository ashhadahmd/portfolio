import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// Full site URL for the share-image tags in index.html. The deploy workflow
// sets it; locally it stays empty, which only affects link previews.
process.env.VITE_SITE_URL ??= '';

export default defineConfig({
  // GitHub Pages serves project sites from /<repo>/. The deploy workflow sets
  // BASE_PATH; local dev and custom domains use the root.
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
