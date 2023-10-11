const CACHE_NAME = 'VilmaStorage';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    // Añade aquí más archivos que quieras precargar, como canciones.
  ];
  
  self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          return cache.addAll(urlsToCache);
        })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
    );
  });