// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

function serveLocalAssetsPlugin() {
  return {
    name: 'serve-local-assets-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.url || '';
        const decodedUrl = decodeURIComponent(rawUrl.split('?')[0]);

        if (decodedUrl.includes('/book/')) {
          const fileName = path.basename(decodedUrl);
          const candidates = [
            path.resolve('.assets/book', fileName),
            path.resolve('public/book', fileName),
          ];

          for (const targetPath of candidates) {
            if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
              const stat = fs.statSync(targetPath);
              res.writeHead(200, {
                'Content-Type': 'application/pdf',
                'Content-Length': stat.size,
                'Content-Disposition': `inline; filename="${encodeURIComponent(fileName)}"`,
                'Accept-Ranges': 'bytes',
                'Cache-Control': 'public, max-age=31536000',
              });
              return fs.createReadStream(targetPath).pipe(res);
            }
          }
        }
        next();
      });
    }
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://brahmacharya.fixeehub.com',
  base: process.env.ASTRO_BASE || '/',

  build: {
    assets: '_astro'
  },

  vite: {
    plugins: [
      tailwindcss(),
      serveLocalAssetsPlugin()
    ]
  },

  integrations: [react()]
});