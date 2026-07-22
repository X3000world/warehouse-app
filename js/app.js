window.onload=async function(){


await initDatabase();



document.getElementById("app").innerHTML=`

<h3>
✅ 系统初始化完成
</h3>


<p>
数据库：IndexedDB
</p>


<p>
PWA框架已加载
</p>


`;


};





// 注册PWA

if(
"serviceWorker" in navigator
){


navigator.serviceWorker.register(
"./service-worker.js"
)

.then(()=>{

console.log(
"Service Worker启动成功"
);

});


}
