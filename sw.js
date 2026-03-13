/**
 * GW코리아 Service Worker
 * - 오프라인 캐싱 및 빠른 재방문 로딩
 */
const CACHE_NAME = 'gw-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/services.html',
  '/css/style.css',
  '/css/slider.css',
  '/css/chat.css',
  '/js/main.js',
  '/js/chat.js',
  '/images/logo.svg',
];

// Install: 정적 자원 캐시
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: 이전 캐시 정리
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: 네트워크 우선, 실패 시 캐시
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
