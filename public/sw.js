importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js'
)

workbox.core.setCacheNameDetails({
  // This allows you to work on multiple projects using
  // the same localhost port number without mixing up the caches.
  prefix: 'on',
})

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
)

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
)

// Cache images with a cache-first strategy for 30 days
workbox.routing.registerRoute(
  /\.*(?:png|gif|jpg|jpeg|webp|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
)

workbox.routing.registerRoute(
  /\.*(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
)

self.addEventListener('message', event => {
  switch (event.data) {
    case 'skipWaiting':
      // console.log('self.skipWaiting()');
      self.skipWaiting()
      // We don't call claim as it would be too strong.
      // Instead of controlling the page after it was loaded.
      // We wait for the activated event to reload the page and have the
      // activated service worker control it.
      // self.clients.claim();
      break
    default:
      break
  }
})
