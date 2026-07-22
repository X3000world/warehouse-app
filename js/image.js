/**
 * 图片处理模块
 * 负责:
 * 1. 图片选择
 * 2. 拍照
 * 3. 图片压缩
 * 4. IndexedDB存储
 */


// 图片最大尺寸
const IMAGE_MAX_SIZE = 1000;


// 压缩质量
const IMAGE_QUALITY = 0.8;



/**
 * 图片压缩
 */
function compressImage(file){


return new Promise((resolve,reject)=>{


const reader = new FileReader();



reader.onload=function(e){


const img=new Image();



img.onload=function(){


let width=img.width;
let height=img.height;



if(width>height){

if(width>IMAGE_MAX_SIZE){

height =
height *
IMAGE_MAX_SIZE /
width;

width=IMAGE_MAX_SIZE;

}

}else{


if(height>IMAGE_MAX_SIZE){


width =
width *
IMAGE_MAX_SIZE /
height;


height=IMAGE_MAX_SIZE;


}

}




const canvas =
document.createElement("canvas");


canvas.width=width;
canvas.height=height;



const ctx =
canvas.getContext("2d");


ctx.drawImage(
img,
0,
0,
width,
height
);



const base64 =
canvas.toDataURL(
"image/jpeg",
IMAGE_QUALITY
);



resolve(base64);


};



img.src=e.target.result;


};



reader.onerror=reject;


reader.readAsDataURL(file);


});


}




/**
 * 保存图片到IndexedDB
 *
 * type:
 * tag      吊牌/洗水唛/主唛
 *
 * remark   备注图片
 */


function saveImage(
base64,
type
){


return new Promise(
(resolve,reject)=>{


const data={


type:type,


data:base64,


createTime:
new Date()
.toISOString()



};



const request =
getStore(
"images",
"readwrite"
)
.add(data);



request.onsuccess=function(){


resolve(
request.result
);


};



request.onerror=reject;



});


}





/**
 * 根据ID读取图片
 */


function getImage(id){


return new Promise(
(resolve,reject)=>{


const request =
getStore(
"images"
)
.get(id);



request.onsuccess=function(){


resolve(
request.result
);


};



request.onerror=reject;


});


}





/**
 * 删除图片
 */


function deleteImage(id){


return new Promise(
(resolve)=>{


getStore(
"images",
"readwrite"
)
.delete(id)
.onsuccess=resolve;



});


}
