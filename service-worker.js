const CACHE_NAME="warehouse-cache-v1";


const CACHE_FILES=[

"./",

"./index.html",

"./manifest.json",

"./css/style.css",

"./js/app.js",

"./js/db.js"

];



self.addEventListener(
"install",
event=>{


event.waitUntil(

caches.open(CACHE_NAME)

.then(cache=>{

return cache.addAll(CACHE_FILES);

})

);


});




self.addEventListener(
"activate",
event=>{


event.waitUntil(

self.clients.claim()

);


});





self.addEventListener(
"fetch",
event=>{


event.respondWith(

caches.match(event.request)

.then(response=>{


return response || fetch(event.request);


})

);


});
