const CACHE_NAME = "Test-PWA-AMBW";
const OFFLINE_PAGE = "offline.html";
const ASSETS = [
    "index.html",
    "about.html",
    "offline.html",
    "style/styles.css",
    "script.app.js",
    "script.script.js",
    "icons/icon-192x192.png",
    "icons/icon-512x512.png"
];

// Install Service Worker
self.addEventListener("install", (event) => {
    console.log("Service Worker Installed");
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Fetch Strategy (Network then Cache)
self.addEventListener("fetch", (event) => {
    if (!event.request.url.startsWith("http")) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response)
                return response;
            else {
                return fetch(event.request).then((response) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                }).catch((error) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        return caches.match(OFFLINE_PAGE);
                    });
                });
            }
        })
    );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
});
