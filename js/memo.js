/**
 * 备忘管理模块
 */


let currentMemoId = null;


/**
 * 创建备忘
 */

async function addMemo(data){


const time =
new Date()
.toISOString();



const memo={


name:data.name,


logistics:data.logistics || "",


remark:data.remark || "",



tagImages:data.tagImages || [],


remarkImages:data.remarkImages || [],



createTime:time,

updateTime:time


};



return new Promise(
(resolve,reject)=>{


const request =
getStore(
"memo",
"readwrite"
)
.add(memo);



request.onsuccess=function(){

resolve(request.result);

};



request.onerror=reject;


});


}






/**
 * 获取全部备忘
 */


function getAllMemo(){


return new Promise(
(resolve,reject)=>{


const request =
getStore(
"memo"
)
.getAll();



request.onsuccess=function(){


resolve(request.result);


};



request.onerror=reject;


});


}






/**
 * 根据ID查询
 */


function getMemo(id){


return new Promise(
(resolve,reject)=>{


const request =
getStore(
"memo"
)
.get(id);



request.onsuccess=function(){

resolve(request.result);

};



request.onerror=reject;


});


}







/**
 * 修改备忘
 */


function updateMemo(data){


return new Promise(
(resolve,reject)=>{


data.updateTime =
new Date()
.toISOString();



const request =
getStore(
"memo",
"readwrite"
)
.put(data);



request.onsuccess=function(){

resolve();

};



request.onerror=reject;


});


}








/**
 * 删除备忘
 */


async function deleteMemoById(id){


const memo =
await getMemo(id);



if(!memo){

return;

}




//删除吊牌图片

if(memo.tagImages){

for(
let img of memo.tagImages
){

await deleteImage(img);

}

}



//删除备注图片

if(memo.remarkImages){

for(
let img of memo.remarkImages
){

await deleteImage(img);

}

}




return new Promise(
(resolve)=>{


getStore(
"memo",
"readwrite"
)
.delete(id)
.onsuccess=resolve;



});


}








/**
 * 保存吊牌图片
 */


async function addTagImage(file){


const base64 =
await compressImage(file);



const id =
await saveImage(
base64,
"tag"
);



return id;


}







/**
 * 保存备注图片
 */


async function addRemarkImage(file){


const base64 =
await compressImage(file);



const id =
await saveImage(
base64,
"remark"
);



return id;


}







/**
 * 获取图片列表
 */


async function getImages(ids){


let result=[];


for(
let id of ids
){


const img =
await getImage(id);



if(img){

result.push(img);

}


}



return result;

}
