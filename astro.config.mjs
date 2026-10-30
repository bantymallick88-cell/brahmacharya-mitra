// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://bantymallick88-cell.github.io',
  base: '/brahmacharya-mitra',

  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'serve-root-public-assets',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url && (
              req.url === '/photo_mahadev.jpg' ||
              req.url === '/photo_mahadev.png' ||
              req.url.startsWith('/photo_mahadev.')
            )) {
              req.url = '/brahmacharya-mitra' + req.url;
            }
            next();
          });
        }
      }
    ]
  },

  integrations: [react()]
});