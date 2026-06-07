/* Neon Maze service worker — offline play + home-screen install.
   Bump CACHE when you change any file to force clients to update. */
const CACHE = 'neon-maze-v10';
const CORE = [
  '.',
  'index.html',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-180.png',
  'icons/icon-512-maskable.png',
  'music/maze1.mp3'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // Let the browser handle media range requests directly — the mp3 is already
  // precached as a full response, and caching 206 partials breaks playback.
  if (req.headers.has('range')) return;

  e.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const res = await fetch(req);
      try {
        const url = new URL(req.url);
        const cacheable = res && res.ok &&
          (url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(url.host));
        if (cacheable) {
          const copy = res.clone();
          const c = await caches.open(CACHE);
          c.put(req, copy);
        }
      } catch (_) {}
      return res;
    } catch (err) {
      if (req.mode === 'navigate') {
        const idx = await caches.match('index.html');
        if (idx) return idx;
      }
      throw err;
    }
  })());
});
