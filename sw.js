let staticCacheName = 'rest-reviews-static-v1';

self.addEventListener('fetch', (event) =>
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) return response;
            return fetch(event.request);
        })
    )
);

self.addEventListener('activate', (event) =>
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter(cacheName =>
                    cacheName.startsWith('rest-reviews') && cacheName != staticCacheName)
                .map(cacheName => caches.delete(cacheName))
            )
        })
    )
);

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            return cache.addAll([
                '/',
                '/restaurant.html',
                '/css/styles.css',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/js/dbhelper.js',
                '/fonts/lobster.otf',
                '/data/restaurants.json'
            ])
        })
    );
});