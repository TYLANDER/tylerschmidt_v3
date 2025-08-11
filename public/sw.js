// Service Worker for Tyler Schmidt Portfolio
// Version: 1.0.0

const CACHE_NAME = 'tyler-schmidt-v1';
const urlsToCache = [
  '/',
  '/work',
  '/about',
  '/contact',
  '/manifest.json',
  '/fonts/Aeonik-Full-Family-Web/Aeonik-Regular.woff2',
  '/fonts/Aeonik-Full-Family-Web/Aeonik-Bold.woff2',
  '/fonts/Aeonik-Full-Family-Web/Aeonik-Medium.woff2',
];

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache valid responses
          caches.open(CACHE_NAME)
            .then((cache) => {
              // Only cache same-origin and CORS-enabled resources
              if (event.request.url.startsWith(self.location.origin) || 
                  event.request.url.includes('fonts.googleapis.com')) {
                cache.put(event.request, responseToCache);
              }
            });

          return response;
        });
      })
      .catch(() => {
        // Offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      })
  );
});
