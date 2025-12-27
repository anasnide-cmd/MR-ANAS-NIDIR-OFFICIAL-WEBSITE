// Bump VERSION setiap deploy
const VERSION = 'anas-v2-2025-08-12';
const APP_SHELL = [
  '/', '/index.html',
  '/css/index.css?v=2025-08-12',
  '/js/index.js?v=2025-08-12',
  '/assets/logo.jpg'
];

// Install: cache shell (best-effort)
self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(c => c.addAll(APP_SHELL).catch(()=>{})));
  // NOTE: no skipWaiting here (we wait for user confirmation)
});

// Activate: claim + delete old caches
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

// Message from page (when user clicks Refresh)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch strategy
self.addEventListener('fetch', event => {
  const req = event.request;
  const accept = req.headers.get('accept') || '';

  // HTML → network-first
  if (req.mode === 'navigate' || accept.includes('text/html')) {
    event.respondWith((async ()=>{
      try {
        const fresh = await fetch(req, { cache: 'no-store' });
        const cache = await caches.open(VERSION);
        cache.put(req, fresh.clone());
        return fresh;
      } catch {
        const cache = await caches.open(VERSION);
        const cached = await cache.match(req);
        return cached || cache.match('/index.html');
      }
    })());
    return;
  }

  // Assets → stale-while-revalidate
  event.respondWith((async ()=>{
    const cache = await caches.open(VERSION);
    const cached = await cache.match(req);
    const fetchPromise = fetch(req).then(res => {
      if (res && res.status === 200 && req.method === 'GET') cache.put(req, res.clone());
      return res;
    }).catch(()=>null);
    return cached || fetchPromise || new Response(null, { status: 504 });
  })());
});