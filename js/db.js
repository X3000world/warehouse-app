const DB_NAME="warehouse_db_v2";

const DB_VERSION=1;


let warehouseDB=null;



function openDB(){


return new Promise((resolve,reject)=>{


const request=indexedDB.open(
DB_NAME,
DB_VERSION
);



request.onupgradeneeded=function(e){


const db=e.target.result;



//库存

if(!db.objectStoreNames.contains("inventory")){


const store=db.createObjectStore(
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



//备忘

if(!db.objectStoreNames.contains("memo")){


db.createObjectStore(
"memo",
{
keyPath:"id",
autoIncrement:true
}
);


}



//图片

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


console.log(
"IndexedDB初始化成功"
);


}
