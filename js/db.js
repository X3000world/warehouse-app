// ================================
// IndexedDB 数据库
// ================================


const DB_NAME = "WarehouseDB";

const DB_VERSION = 1;


let db;



// 初始化数据库

function initDB(){


return new Promise((resolve,reject)=>{


const request =
indexedDB.open(DB_NAME,DB_VERSION);



request.onerror=function(){

console.error(
"数据库打开失败"
);

reject(request.error);

};





request.onsuccess=function(e){

db=e.target.result;

console.log(
"IndexedDB启动成功"
);

resolve(db);

};





request.onupgradeneeded=function(e){


db=e.target.result;



// =====================
// 库存表
// =====================


if(!db.objectStoreNames.contains("inventory")){


let inventoryStore =
db.createObjectStore(
"inventory",
{
keyPath:"id",
autoIncrement:true
}
);



inventoryStore.createIndex(
"style",
"style",
{
unique:false
}
);



inventoryStore.createIndex(
"shelf",
"shelf",
{
unique:false
}
);



}





// =====================
// 备忘表
// =====================



if(!db.objectStoreNames.contains("memo")){


let memoStore =
db.createObjectStore(
"memo",
{
keyPath:"id",
autoIncrement:true
}
);



memoStore.createIndex(
"customer",
"customer",
{
unique:false
}
);



}





};




});


}






// ================================
// 通用新增
// ================================


function addData(storeName,data){


return new Promise((resolve,reject)=>{


const tx =
db.transaction(
storeName,
"readwrite"
);



const store =
tx.objectStore(storeName);



let request =
store.add(data);



request.onsuccess=function(){

resolve(request.result);

};



request.onerror=function(){

reject(request.error);

};



});


}








// ================================
// 查询全部
// ================================


function getAllData(storeName){


return new Promise((resolve,reject)=>{


let tx =
db.transaction(
storeName,
"readonly"
);



let store =
tx.objectStore(storeName);



let request =
store.getAll();



request.onsuccess=function(){

resolve(request.result);

};



request.onerror=function(){

reject(request.error);

};



});


}








// ================================
// 根据ID查询
// ================================


function getDataById(
storeName,
id
){


return new Promise((resolve,reject)=>{


let tx =
db.transaction(
storeName,
"readonly"
);



let store =
tx.objectStore(storeName);



let request =
store.get(id);



request.onsuccess=function(){

resolve(request.result);

};



request.onerror=function(){

reject(request.error);

};



});


}









// ================================
// 修改
// ================================


function updateData(
storeName,
data
){


return new Promise((resolve,reject)=>{


let tx =
db.transaction(
storeName,
"readwrite"
);



let store =
tx.objectStore(storeName);



let request =
store.put(data);



request.onsuccess=function(){

resolve(true);

};



request.onerror=function(){

reject(request.error);

};



});


}








// ================================
// 删除
// ================================


function deleteData(
storeName,
id
){


return new Promise((resolve,reject)=>{


let tx =
db.transaction(
storeName,
"readwrite"
);



let store =
tx.objectStore(storeName);



let request =
store.delete(id);



request.onsuccess=function(){

resolve(true);

};



request.onerror=function(){

reject(request.error);

};



});


}








// ================================
// 时间
// ================================


function nowTime(){

return new Date()
.toLocaleString();

}
