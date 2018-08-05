const CACHE_NAME = 'tampere-cache-v1';


self.addEventListener('install', event => {
  console.log("Install: Saving static files to cache");
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Caching...");
      return cache.addAll([
        '/',
        '/sw.js',
        '/util.js',
        '/common.js',
        '/manifest.json',
        '/static/js/bundle.js'
      ])
      .catch(function(error) {
        console.log('Failed to add files to cache');
        console.log(error);
      });
    })
  );
});

self.addEventListener('activate', () => {
  console.log("Activating");
  self.clients.matchAll({ type: 'window' }).then(windowClients => {
    for (let windowClient of windowClients) {
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.
      windowClient.navigate(windowClient.url);
    }
  });
});

self.addEventListener('fetch', event => {
  console.log('Fetching:', event.request);
  // if (event.request.url.startsWith(self.location.origin)) {
  event.respondWith(
    caches.match(event.request).then(response => {
      console.log('Fetching from cache:', event.request);
      if (response) {
        console.log('Serving request from cache');
        return response;
      }
      return fetch(event.request).then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          console.log('Request not found in cache, caching now');
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    })
  );
});
