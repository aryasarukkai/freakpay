const CACHE_NAME = 'freakpay-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/freakbob.png',
  '/freakpay.png',
  '/tap-to-freakpay.png',
  '/balance.png',
  '/thanks.png',
  '/failed.png',
  '/freakbob-call.png',
  '/ringtone.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});