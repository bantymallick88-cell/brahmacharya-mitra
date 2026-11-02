import fs from 'node:fs';
import path from 'node:path';

// Cloudflare Pages strictly enforces a 25 MiB single-file limit
const CLOUDFLARE_MAX_BYTES = 24.5 * 1024 * 1024; // 24.5 MB threshold to guarantee safety

function processDirectory(targetDir, assetsBackupDir) {
  if (!fs.existsSync(targetDir)) return;

  if (!fs.existsSync(assetsBackupDir)) {
    fs.mkdirSync(assetsBackupDir, { recursive: true });
  }

  const entries = fs.readdirSync(targetDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath, path.join(assetsBackupDir, entry.name));
    } else if (entry.isFile()) {
      const stats = fs.statSync(fullPath);
      if (stats.size > CLOUDFLARE_MAX_BYTES) {
        const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
        const backupPath = path.join(assetsBackupDir, entry.name);

        // Ensure the heavy file is preserved in .assets/ before removal from dist/
        if (!fs.existsSync(backupPath)) {
          fs.copyFileSync(fullPath, backupPath);
          console.log(`[Cloudflare Asset Guard] Preserved ${entry.name} (${sizeMb} MB) in ${assetsBackupDir}`);
        }

        // Remove from dist to satisfy Cloudflare Pages 25MB single-file limit
        fs.unlinkSync(fullPath);
        console.log(`[Cloudflare Asset Guard] Excluded ${entry.name} (${sizeMb} MB > 25MB) from build output (${targetDir})`);
      }
    }
  }
}

// 1. Process build output (dist)
const distPath = path.resolve('dist');
const assetsPath = path.resolve('.assets/book');

if (fs.existsSync(distPath)) {
  console.log('[Cloudflare Asset Guard] Scanning build output for Cloudflare Pages 25MB asset threshold...');
  processDirectory(distPath, assetsPath);
  console.log('[Cloudflare Asset Guard] Verification complete. All dist files comply with Cloudflare Pages limits.');
}

