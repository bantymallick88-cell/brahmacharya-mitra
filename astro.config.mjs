// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE || 'https://your-github-username.github.io',
  base: '/brahmacharya-mitra',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});