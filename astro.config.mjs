// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// Dev server middleware: serves books dynamically from .assets/book or public/book
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

// Astro build hook: guarantees dist/ never contains any file exceeding Cloudflare's 25 MiB threshold
function cloudflareAssetGuardIntegration() {
  const CLOUDFLARE_MAX_BYTES = 24.5 * 1024 * 1024; // 24.5 MB threshold

  function scanAndGuard(targetDir) {
    if (!fs.existsSync(targetDir)) return;

    const entries = fs.readdirSync(targetDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(targetDir, entry.name);
      if (entry.isDirectory()) {
        scanAndGuard(fullPath);
      } else if (entry.isFile()) {
        const stats = fs.statSync(fullPath);
        if (stats.size > CLOUDFLARE_MAX_BYTES) {
          const backupDir = path.resolve('.assets/book');
          if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
          const backupPath = path.join(backupDir, entry.name);
          if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(fullPath, backupPath);
            console.log(`[Cloudflare Asset Guard] Preserved ${entry.name} in .assets/book`);
          }
          fs.unlinkSync(fullPath);
          console.log(`[Cloudflare Asset Guard] Excluded ${entry.name} (${(stats.size / 1048576).toFixed(2)} MB > 25MB) from build output.`);
        }
      }
    }
  }

  return {
    name: 'cloudflare-asset-guard',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        let distPath = path.resolve('dist');
        if (dir && typeof dir === 'object' && dir.pathname) {
          distPath = dir.pathname.replace(/^\/([A-Z]:)/, '$1');
        }
        console.log('[Cloudflare Asset Guard] Checking dist files against Cloudflare Pages 25MB threshold...');
        scanAndGuard(distPath);
        console.log('[Cloudflare Asset Guard] Verification complete. All files comply with Cloudflare Pages 25MB limit.');
      }
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

  integrations: [
    react(),
    cloudflareAssetGuardIntegration()
  ]
});
