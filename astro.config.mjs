// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import fs from 'node:fs';
import path from 'node:path';

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
            const rawUrl = req.url?.split('?')[0] || '';
            const cleanUrl = rawUrl.replace(/^\/brahmacharya-mitra/, '');
            if (
              cleanUrl.startsWith('/media/') ||
              cleanUrl.startsWith('/data/') ||
              cleanUrl.startsWith('/photo_mahadev.')
            ) {
              const filePath = path.resolve('./public' + cleanUrl);
              if (fs.existsSync(filePath)) {
                const stat = fs.statSync(filePath);
                if (stat.isFile()) {
                  const ext = path.extname(filePath).toLowerCase();
                  const mime =
                    ext === '.mp4'
                      ? 'video/mp4'
                      : ext === '.json'
                      ? 'application/json; charset=utf-8'
                      : ext === '.jpg' || ext === '.jpeg'
                      ? 'image/jpeg'
                      : ext === '.png'
                      ? 'image/png'
                      : 'application/octet-stream';

                  const range = req.headers.range;
                  if (range && ext === '.mp4') {
                    const parts = range.replace(/bytes=/, '').split('-');
                    const start = parseInt(parts[0], 10);
                    const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
                    const chunksize = end - start + 1;
                    res.writeHead(206, {
                      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
                      'Accept-Ranges': 'bytes',
                      'Content-Length': chunksize,
                      'Content-Type': mime,
                    });
                    fs.createReadStream(filePath, { start, end }).pipe(res);
                    return;
                  }

                  res.writeHead(200, {
                    'Content-Type': mime,
                    'Content-Length': stat.size,
                    'Accept-Ranges': 'bytes',
                  });
                  fs.createReadStream(filePath).pipe(res);
                  return;
                }
              }
            }
            next();
          });
        }
      }
    ]
  },

  integrations: [react()]
});