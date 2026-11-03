// Brahmacharya Mitra — Progressive Web App (PWA) Service Worker
// Version: 2.5.0 (Auto-updating cache-buster)

const CACHE_NAME = 'bm-pwa-v2.5.0';

// Base scope resolution
const SCOPE_URL = self.registration ? self.registration.scope : './';

const PRECACHE_ASSETS = [
  SCOPE_URL,
  new URL('manifest.json', self.location).href,
  new URL('favicon.svg', self.location).href,
  new URL('photo_mahadev.jpg', self.location).href,
];

// 1. INSTALL: Force immediate activation without waiting for existing clients to close
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Pre-cache partial warning:', err);
      });
    })
  );
});

// 2. ACTIVATE: Immediately claim all open PWA windows and delete all obsolete caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Claim clients immediately so open windows are controlled by this worker
      await self.clients.claim();

      // Purge all stale caches from previous builds
      const cacheKeys = await caches.keys();
      await Promise.all(
        cacheKeys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Purging stale cache:', key);
            return caches.delete(key);
          }
        })
      );
    })()
  );
});

// 3. MESSAGE: Allow client to trigger instant skipWaiting on update detection
self.addEventListener('message', (event) => {
  if (event.data && (event.data.type === 'SKIP_WAITING' || event.data === 'skipWaiting')) {
    self.skipWaiting();
  }
});

// 4. FETCH: Intelligent caching strategy with Network-First for HTML navigation
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Skip non-http(s) schemes (e.g. chrome-extension://, blob:)
  if (!url.protocol.startsWith('http')) return;

  // Skip analytics & tracking requests
  if (
    url.hostname.includes('google-analytics.com') ||
    url.hostname.includes('googletagmanager.com')
  ) {
    return;
  }

  // A. Navigation (HTML Pages): NETWORK-FIRST
  // Always fetch fresh HTML from Cloudflare Pages so deployed updates show immediately.
  // Falls back to offline cache if offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          return caches.match(SCOPE_URL) || caches.match('./') || caches.match('/');
        })
    );
    return;
  }

  // B. Hashed Vite/Astro Assets (/_astro/*): Cache-First with Network Fallback
  if (url.pathname.includes('/_astro/')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // C. All Other Assets (Images, Icons, Fonts, Audio): Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

