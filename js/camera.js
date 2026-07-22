// =================================
// 图片处理模块
// =================================


// 图片最大尺寸

const IMAGE_MAX_SIZE = 1200;


// 图片质量

const IMAGE_QUALITY = 0.75;



// 当前选择类型

let currentImageType = "";





// =================================
// 打开拍照
// =================================


function openCamera(type){


currentImageType = type;



let input =
document.createElement(
"input"
);



input.type="file";


input.accept="image/*";


// 调用摄像头

input.capture="environment";



input.onchange=function(e){


handleImageFiles(
e.target.files,
type
);



};



input.click();



}









// =================================
// 打开相册
// =================================


function openAlbum(type){



currentImageType = type;



let input =
document.createElement(
"input"
);



input.type="file";


input.accept="image/*";


input.multiple=true;



input.onchange=function(e){



handleImageFiles(
e.target.files,
type
);



};



input.click();



}









// =================================
// 处理图片
// =================================


function handleImageFiles(
files,
type
){



Array.from(files)
.forEach(file=>{


compressImage(
file,
(result)=>{


if(type==="tag"){


currentTagImages.push(
result
);



}



if(type==="remark"){


currentRemarkImages.push(
result
);



}




renderImagePreview();



}

);



});



}









// =================================
// 图片压缩
// =================================


function compressImage(
file,
callback
){



let reader =
new FileReader();



reader.onload=function(e){



let img =
new Image();



img.onload=function(){



let canvas =
document.createElement(
"canvas"
);



let width =
img.width;


let height =
img.height;



if(width>height){


if(width>IMAGE_MAX_SIZE){


height =
height *
IMAGE_MAX_SIZE /
width;


width =
IMAGE_MAX_SIZE;


}


}

else{


if(height>IMAGE_MAX_SIZE){


width =
width *
IMAGE_MAX_SIZE /
height;


height =
IMAGE_MAX_SIZE;


}


}





canvas.width=width;

canvas.height=height;



let ctx =
canvas.getContext(
"2d"
);



ctx.drawImage(
img,
0,
0,
width,
height
);




let base64 =
canvas.toDataURL(
"image/jpeg",
IMAGE_QUALITY
);



callback(base64);



};



img.src=e.target.result;



};



reader.readAsDataURL(file);



}









// =================================
// 图片预览
// =================================


function renderImagePreview(){



let tagBox =
document.getElementById(
"tagPreview"
);



let remarkBox =
document.getElementById(
"remarkPreview"
);





if(tagBox){



tagBox.innerHTML =
createImageHTML(
currentTagImages,
"tag"
);


}





if(remarkBox){


remarkBox.innerHTML =
createImageHTML(
currentRemarkImages,
"remark"
);



}



}









// =================================
// 生成图片HTML
// =================================


function createImageHTML(
images,
type
){



let html="";



images.forEach(
(img,index)=>{


html+=`

<div class="img-item">


<img 
src="${img}"
onclick="previewImage('${img}')"
>



<button
onclick="deleteImage('${type}',${index})">

×


</button>


</div>


`;


});



return html;



}









// =================================
// 删除图片
// =================================


function deleteImage(
type,
index
){



if(type==="tag"){



currentTagImages.splice(
index,
1
);


}



if(type==="remark"){



currentRemarkImages.splice(
index,
1
);


}



renderImagePreview();



}








// =================================
// 大图预览
// =================================


function previewImage(src){



let img =
document.createElement(
"img"
);



img.src=src;



img.style.position="fixed";

img.style.top="0";

img.style.left="0";

img.style.width="100%";

img.style.height="100%";

img.style.objectFit="contain";

img.style.background="#000";

img.style.zIndex="9999";




img.onclick=function(){

document.body.removeChild(img);

};




document.body.appendChild(img);



}
