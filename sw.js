// Abschalt-Service-Worker für die alte Adresse /repzeit/: alte Caches löschen, abmelden, offene Fenster nach /edt-timer/ schicken.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k.startsWith('repzeit-')) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: 'window', includeUncontrolled: true })) {
    try { await c.navigate('/edt-timer/' + new URL(c.url).search + new URL(c.url).hash); } catch { /* Fenster ohne Navigationsrecht */ }
  }
})()));
