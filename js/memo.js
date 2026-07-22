// =================================
// 备忘管理模块
// =================================


let currentMemoId = null;


// 当前图片缓存

let currentTagImages = [];

let currentRemarkImages = [];




// =================================
// 打开添加窗口
// =================================


function openMemo(){


currentMemoId = null;


currentTagImages = [];

currentRemarkImages = [];



document.getElementById(
"memoCustomer"
).value="";



document.getElementById(
"memoLogistics"
).value="";



document.getElementById(
"memoRemark"
).value="";



renderImagePreview();



showMemoModal();


}






// =================================
// 编辑备忘
// =================================


async function editMemo(id){



let data =
await getDataById(
"memo",
id
);



if(!data)
return;



currentMemoId=id;



document.getElementById(
"memoCustomer"
).value =
data.customer;



document.getElementById(
"memoLogistics"
).value =
data.logistics || "";



document.getElementById(
"memoRemark"
).value =
data.remark || "";



currentTagImages =
data.tagImages || [];



currentRemarkImages =
data.remarkImages || [];



renderImagePreview();



showMemoModal();



}








// =================================
// 保存备忘
// =================================


async function saveMemo(){



let customer =
document.getElementById(
"memoCustomer"
).value.trim();



let logistics =
document.getElementById(
"memoLogistics"
).value.trim();



let remark =
document.getElementById(
"memoRemark"
).value.trim();





if(!customer){


alert(
"请输入客户名称"
);


return;


}






let time =
nowTime();





// 新增


if(!currentMemoId){



let memo={


customer,


tagImages:
currentTagImages,


logistics,


remark,


remarkImages:
currentRemarkImages,



createTime:
time,


updateTime:
time



};



await addData(
"memo",
memo
);



alert(
"保存成功"
);



}






// 修改


else{



let old =
await getDataById(
"memo",
currentMemoId
);



old.customer =
customer;



old.logistics =
logistics;



old.remark =
remark;



old.tagImages =
currentTagImages;



old.remarkImages =
currentRemarkImages;



old.updateTime =
time;



await updateData(
"memo",
old
);



alert(
"修改成功"
);



}





closeMemoModal();


loadMemoList();



}









// =================================
// 获取全部备忘
// =================================


async function loadMemoList(){



let list =
await getAllData(
"memo"
);



// 最新修改排前面


list.sort(
(a,b)=>{

return new Date(
b.updateTime
)
-
new Date(
a.updateTime
);

}

);



renderMemoList(list);



}










// =================================
// 显示列表
// =================================


function renderMemoList(list){



let box =
document.getElementById(
"memoList"
);



if(!box)
return;




let html="";





list.forEach(item=>{


html+=`

<div class="memo-card">


<h3>
👤 ${item.customer}
</h3>



<p>
🚚 ${item.logistics || "暂无物流"}
</p>



<p>
📝 ${item.remark || "暂无备注"}
</p>




<div class="time">

添加：
${item.createTime}

<br>

修改：
${item.updateTime}

</div>




<button onclick="editMemo(${item.id})">

编辑

</button>



<button onclick="deleteMemo(${item.id})">

删除

</button>



</div>


`;



});





box.innerHTML =
html ||
"暂无备忘";



}









// =================================
// 删除
// =================================


async function deleteMemo(id){



if(
!confirm(
"确定删除?"
)
)
return;



await deleteData(
"memo",
id
);



loadMemoList();



}









// =================================
// 弹窗控制
// =================================


function showMemoModal(){



let modal =
document.getElementById(
"memoModal"
);



if(modal)

modal.style.display="block";



}




function closeMemoModal(){


let modal =
document.getElementById(
"memoModal"
);



if(modal)

modal.style.display="none";



currentMemoId=null;


}
