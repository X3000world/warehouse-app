let tagFiles=[];

let remarkFiles=[];



// 吊牌图片选择

document
.getElementById("tagCamera")
.onchange=function(e){

handleFiles(
e.target.files,
"tag"
);

};


document
.getElementById("tagGallery")
.onchange=function(e){

handleFiles(
e.target.files,
"tag"
);

};




//备注图片

document
.getElementById("remarkCamera")
.onchange=function(e){

handleFiles(
e.target.files,
"remark"
);

};



document
.getElementById("remarkGallery")
.onchange=function(e){

handleFiles(
e.target.files,
"remark"
);

};






function handleFiles(
files,
type
){


for(let file of files){


if(type==="tag"){

tagFiles.push(file);

showPreview(
file,
"tagPreview"
);


}else{


remarkFiles.push(file);

showPreview(
file,
"remarkPreview"
);


}


}



}






function showPreview(
file,
id
){


const reader=
new FileReader();



reader.onload=function(e){


const img=
document.createElement("img");


img.src=e.target.result;


document
.getElementById(id)
.appendChild(img);


};


reader.readAsDataURL(file);


}







async function saveMemoPage(){



const name =
document
.getElementById("memoName")
.value
.trim();



if(!name){

alert("请输入客户名称");

return;

}





let tagIds=[];


for(
let file of tagFiles
){


let id=
await addTagImage(file);


tagIds.push(id);


}






let remarkIds=[];


for(
let file of remarkFiles
){


let id=
await addRemarkImage(file);


remarkIds.push(id);


}






await addMemo({

name:name,


logistics:
document
.getElementById("memoLogistics")
.value,


remark:
document
.getElementById("memoRemark")
.value,


tagImages:tagIds,


remarkImages:remarkIds


});




alert(
"保存成功"
);




clearMemoForm();


}






function clearMemoForm(){


document
.getElementById("memoName")
.value="";


document
.getElementById("memoLogistics")
.value="";


document
.getElementById("memoRemark")
.value="";



tagFiles=[];

remarkFiles=[];



document
.getElementById("tagPreview")
.innerHTML="";


document
.getElementById("remarkPreview")
.innerHTML="";


}
