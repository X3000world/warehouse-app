// =================================
// PWA Service Worker
// =================================


const CACHE_NAME =
"warehouse-v1";



const CACHE_FILES=[


"./",

"./index.html",


"./css/style.css",


"./js/app.js",
"./js/db.js",
"./js/backup.js",


"./manifest.json"



];




// 安装

self.addEventListener(
"install",
event=>{


event.waitUntil(


caches.open(
CACHE_NAME
)
.then(
cache=>{


return cache.addAll(
CACHE_FILES
);


})


);



self.skipWaiting();



});







// 激活


self.addEventListener(
"activate",
event=>{


event.waitUntil(


clients.claim()


);



});









// 请求拦截


self.addEventListener(
"fetch",
event=>{


event.respondWith(


caches.match(
event.request
)
.then(
response=>{


return response ||
fetch(
event.request
);


})


);



});
