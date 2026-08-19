const VERSION = "0.61";
const CACHE_NAME = "oyuncak-toplama-" + VERSION;

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([
        "./",
        "./index.html",
        "./styles.css?v=" + VERSION,
        "./game.js?v=" + VERSION,
        "./firebase-config.js?v=" + VERSION,
        "./manifest.json",
        "./icon.svg",
      ])
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request, { cache: "no-store" }).catch(() => caches.match("./index.html"))
    );
    return;
  }

  const alwaysNetwork =
    url.pathname.endsWith("/sw.js") || url.pathname.endsWith("/version.json");

  event.respondWith(
    fetch(event.request, { cache: "no-store" })
      .then((response) => {
        if (!alwaysNetwork && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
