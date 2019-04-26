var dataCacheName = 'twiqqsData'
var cacheName = 'twiqqs-v4'
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/main.css'
]

self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Install')
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell')
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate')
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key)
          return caches.delete(key)
        }
      }))
    })
  )
  return self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  console.log('[Service Worker] Fetch', e.request.url)
  var dataUrl = 'https://pbkh6aqm1e.execute-api.eu-west-1.amazonaws.com/test/twiqqs/something'
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh data.
     * In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then(function (cache) {
        return fetch(e.request).then(function (response) {
          cache.put(e.request.url, response.clone())
          return response
        })
      })
    )
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function (response) {
        return response || fetch(e.request)
      })
    )
  }
})

self.addEventListener('notificationclose', (e) => {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});

self.addEventListener('notificationclick', (e) => {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('http://www.example.com');
    notification.close();
  }
});