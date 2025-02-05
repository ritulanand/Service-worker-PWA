const CACHE_NAME = "news-aggregator-cache-v1";
const urlsToCache =["/", "/index.html", "/styles.css", "/app.js"];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("caching files..");
            return cache.addAll(urlsToCache);
        })
    )
})


self.addEventListener("fetch", (event) => {
    if(event.request.url.includes('jsonplaceholder.typicode.com')){
        event.respondWith(handleFetchAndCache(event.request));
    }
})


async function handleFetchAndCache(request){
    try{
        const networkResponse = fetch(request); // network first
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, networkResponse.clone());
        return networkResponse;
    }catch(error){
        const cachedResponse = await caches.match(request);
        return (
            cachedResponse || new Response("network & cache both failed" ,{status : 500})
        )
    }
}