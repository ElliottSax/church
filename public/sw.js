// Service Worker for Minneapolis Community of Christ
const CACHE_NAME = 'mcc-v1';
const DYNAMIC_CACHE = 'mcc-dynamic-v1';

// Files to cache for offline use
const urlsToCache = [
  '/',
  '/offline',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/_next/static/css/app.css',
  '/_next/static/js/app.js',
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching essential files');
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
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE;
          })
          .map((cacheName) => {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Chrome extension requests
  if (request.url.includes('chrome-extension')) return;

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache dynamic content
          caches.open(DYNAMIC_CACHE)
            .then((cache) => {
              cache.put(request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Return offline page for navigation requests
        if (request.destination === 'document') {
          return caches.match('/offline');
        }
      })
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  console.log('Push notification received');

  let data = {
    title: 'Minneapolis Community of Christ',
    body: 'You have a new notification',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/icon-192x192.png',
    badge: data.badge || '/icon-72x72.png',
    tag: data.tag || 'default',
    data: data.data || {},
    requireInteraction: data.requireInteraction || false,
    actions: data.actions || [],
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.notification.tag);
  event.notification.close();

  // Handle action clicks
  if (event.action) {
    switch (event.action) {
      case 'rsvp':
        event.waitUntil(clients.openWindow('/connect/events'));
        break;
      case 'pray':
        event.waitUntil(clients.openWindow('/#prayer-wall'));
        break;
      case 'watch':
        event.waitUntil(clients.openWindow('/grow/worship#live'));
        break;
      case 'confirm':
        event.waitUntil(clients.openWindow('/members/volunteer-schedule'));
        break;
      default:
        event.waitUntil(clients.openWindow('/'));
    }
  } else {
    // Default action - open homepage
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync event:', event.tag);

  if (event.tag === 'sync-prayer-requests') {
    event.waitUntil(syncPrayerRequests());
  } else if (event.tag === 'sync-rsvp') {
    event.waitUntil(syncRSVPs());
  }
});

// Sync prayer requests submitted offline
async function syncPrayerRequests() {
  try {
    const cache = await caches.open('offline-requests');
    const requests = await cache.keys();

    for (const request of requests) {
      const response = await cache.match(request);
      const data = await response.json();

      // Send to server
      await fetch('/api/prayer-wall/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // Remove from cache after successful sync
      await cache.delete(request);
    }
  } catch (error) {
    console.error('Error syncing prayer requests:', error);
  }
}

// Sync RSVPs submitted offline
async function syncRSVPs() {
  try {
    const cache = await caches.open('offline-rsvps');
    const requests = await cache.keys();

    for (const request of requests) {
      const response = await cache.match(request);
      const data = await response.json();

      // Send to server
      await fetch(`/api/events/${data.eventId}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // Remove from cache after successful sync
      await cache.delete(request);
    }
  } catch (error) {
    console.error('Error syncing RSVPs:', error);
  }
}

// Message event for client communication
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-events') {
    event.waitUntil(checkForNewEvents());
  }
});

async function checkForNewEvents() {
  try {
    const response = await fetch('/api/events/upcoming?limit=5');
    const events = await response.json();

    // Check if there are new events
    // (This would need to store last checked events)
    // For now, just log
    console.log('Checking for new events:', events.length);
  } catch (error) {
    console.error('Error checking for new events:', error);
  }
}