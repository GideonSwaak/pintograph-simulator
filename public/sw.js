const CACHE_NAME = "pintograph";
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(
                [
                    'index.html'
                ]
            );
        })
    );
});

self.addEventListener('fetch', (e) => {
    fetch(e.request).then(response => e.respondWith(response));
    // e.respondWith(
        // fetch(e.request)
    //   caches.match(e.request).then((response) => /*response ||*/ fetch(e.request)),
    // );
  });
