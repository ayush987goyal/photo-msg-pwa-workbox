importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

// Allow new SW to take over
workbox.skipWaiting();
workbox.clientsClaim();

// Cache .js files - cache first
workbox.routing.registerRoute(/\.js$/, workbox.strategies.networkFirst());
