let dataCacheName = 'twiqqsData'
let cacheName = 'twiqqs'
let filesToCache = [
  'https://fonts.googleapis.com/css?family=Roboto:100,300,700',
  '/images/icons/icon-72x72.png',
  '/images/icons/icon-96x96.png',
  '/images/icons/icon-128x128.png',
  '/images/icons/icon-144x144.png',
  '/images/icons/icon-152x152.png',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-384x384.png',
  '/images/icons/icon-384x384.png',
  '/images/icons/icon-512x512.png',
  '/images/man.png'
]

self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Install')
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then(async (cache) => {
      console.log('[ServiceWorker] Caching app shell')
      try {
        let result = await cache.addAll(filesToCache)
        return result;
      } catch (ex) {
        console.log(ex)
      }
    })
  )
})

self.addEventListener('activate', function (e) {
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
  let dataUrl = 'https://pbkh6aqm1e.execute-api.eu-west-1.amazonaws.com/test/twiqqs/'
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
  let notification = e.notification;
  let primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});

self.addEventListener('notificationclick', (e) => {
  let notification = e.notification;
  let action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow(`${self.origin}/#${notification.data.message.topic}`);
    notification.close();
  }
});