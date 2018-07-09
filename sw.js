let staticCacheName = 'rest-reviews-static-v1';

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) return response;
			return fetch(event.request);
		})
		)
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(cacheName => 
					cacheName.startsWith('rest-reviews') && cacheName != staticCacheName)
				.map(cacheName => caches.delete(cacheName))
				)
		})
		)
});

self.addEventListener('install', function(event) {
	console.log('Install event triggered')
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll([
				'/',
				'/restaurant.html',
				'/css/styles.css',
				'/js/main.js',
				'/js/restaurant_info.js',
				'/js/dbhelper.js',
				'/fonts/lobster.otf',
				'/data/restaurants.json',
				'/img/1x/1.jpg',
				'/img/1x/2.jpg',
				'/img/1x/3.jpg',
				'/img/1x/4.jpg',
				'/img/1x/5.jpg',
				'/img/1x/6.jpg',
				'/img/1x/7.jpg',
				'/img/1x/8.jpg',
				'/img/1x/9.jpg',
				'/img/1x/10.jpg',
				'/img/small/1.jpg',
				'/img/small/2.jpg',
				'/img/small/3.jpg',
				'/img/small/4.jpg',
				'/img/small/5.jpg',
				'/img/small/6.jpg',
				'/img/small/7.jpg',
				'/img/small/8.jpg',
				'/img/small/9.jpg',
				'/img/small/10.jpg'
				])
		})
		);
});
