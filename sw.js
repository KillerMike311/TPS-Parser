const CACHE = "tps-notes-v8";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

// Always pull fresh copies (skip the browser's HTTP cache) when installing
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" })))));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

// Network first (so updates show up right away), cached copy when offline
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;

  // Shared text arrives in the address (?text=...). Long shares make the address too long for
  // GitHub's server ("URI Too Long"), so answer these from the copy saved on the phone instead.
  const url = new URL(e.request.url);
  if (e.request.mode === "navigate" && (url.searchParams.has("text") || url.searchParams.has("title"))) {
    e.respondWith(caches.match("./").then(r => r || fetch("./", { cache: "no-store" })));
    return;
  }
  e.respondWith(
    fetch(e.request, { cache: "no-store" })
      .then(res => {
        if (res.ok && new URL(e.request.url).origin === location.origin) {
          const key = e.request.mode === "navigate" ? "./" : e.request;
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(key, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true })
        .then(r => r || (e.request.mode === "navigate" ? caches.match("./") : undefined)))
  );
});
