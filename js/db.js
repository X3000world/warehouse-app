const DB_NAME = "warehouse_db_v2";
const DB_VERSION = 2;


let warehouseDB = null;



// 初始化数据库

function openDB(){


return new Promise((resolve,reject)=>{


const request = indexedDB.open(
DB_NAME,
DB_VERSION
);



request.onupgradeneeded=function(e){


const db=e.target.result;



//库存表

if(!db.objectStoreNames.contains("inventory")){


let store=db.createObjectStore(
"inventory",
{
keyPath:"id",
autoIncrement:true
}
);



store.createIndex(
"style",
"style",
{
unique:false
}
);


}



//备忘表

if(!db.objectStoreNames.contains("memo")){


db.createObjectStore(
"memo",
{
keyPath:"id",
autoIncrement:true
}
);


}



//图片表

if(!db.objectStoreNames.contains("images")){


db.createObjectStore(
"images",
{
keyPath:"id",
autoIncrement:true
}
);


}




};



request.onsuccess=function(e){


warehouseDB=e.target.result;


console.log(
"数据库连接成功"
);


resolve(warehouseDB);



};



request.onerror=function(e){


reject(e);


};



});


}




async function initDatabase(){

if(!warehouseDB){

await openDB();

}


}






// ==========================
// 通用事务
// ==========================


function getStore(
table,
mode="readonly"
){


return warehouseDB
.transaction(
table,
mode
)
.objectStore(table);


}




// ==========================
// 添加库存
// ==========================


function addInventory(data){


return new Promise((resolve,reject)=>{


const time=new Date()
.toISOString();



data.createTime=time;

data.updateTime=time;



const request=
getStore(
"inventory",
"readwrite"
)
.add(data);



request.onsuccess=()=>{

resolve();

};


request.onerror=e=>{

reject(e);

};



});

}







// ==========================
// 获取全部库存
// ==========================


function getAllInventory(){


return new Promise((resolve,reject)=>{


const request=
getStore(
"inventory"
)
.getAll();



request.onsuccess=()=>{


resolve(
request.result
);


};



request.onerror=e=>{


reject(e);


};



});


}







// ==========================
// 修改库存
// ==========================


function updateInventory(data){


return new Promise((resolve,reject)=>{


data.updateTime=
new Date()
.toISOString();



const request=
getStore(
"inventory",
"readwrite"
)
.put(data);



request.onsuccess=()=>{


resolve();


};


request.onerror=e=>{


reject(e);


};



});


}







// ==========================
// 删除库存
// ==========================


function deleteInventory(id){


return new Promise((resolve,reject)=>{


const request=
getStore(
"inventory",
"readwrite"
)
.delete(id);



request.onsuccess=()=>{

resolve();

};



request.onerror=e=>{

reject(e);

};



});


}






// ==========================
// 清空库存
// ==========================


function clearInventory(){


return new Promise((resolve)=>{


getStore(
"inventory",
"readwrite"
)
.clear()
.onsuccess=()=>resolve();



});


}
