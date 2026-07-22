// =================================
// 库存管理
// =================================



let editInventoryId = null;




// 页面加载库存

async function loadInventory(){


let data =
await getAllData(
"inventory"
);



renderInventoryList(data);



}







// ================================
// 添加库存
// ================================


async function addInventory(){



let shelf =
prompt(
"请输入货架号"
);



let style =
prompt(
"请输入款号"
);



let color =
prompt(
"请输入颜色"
);




if(
!shelf ||
!style ||
!color
){

alert(
"信息不能为空"
);

return;

}



let time =
nowTime();



let item={


shelf:shelf,


style:style,


color:color,


createTime:time,


updateTime:time


};




await addData(
"inventory",
item
);



alert(
"添加成功"
);



loadInventory();



}









// ================================
// 查询库存
// ================================


async function searchInventory(keyword){



let data =
await getAllData(
"inventory"
);



if(!keyword){


return data;


}



keyword =
keyword.toLowerCase();



return data.filter(item=>{


return (

item.style
.toLowerCase()
.includes(keyword)

||

item.shelf
.toLowerCase()
.includes(keyword)

||

item.color
.toLowerCase()
.includes(keyword)


);


});


}









// ================================
// 搜索输入
// ================================


document.addEventListener(
"input",
async function(e){


if(
e.target.id==="searchInput"
){


let result =
await searchInventory(
e.target.value
);



renderSearchResult(result);



}



});









// ================================
// 查询结果显示
// ================================


function renderSearchResult(list){



let box =
document.getElementById(
"searchResult"
);



if(
list.length===0
){

box.innerHTML=
"暂无数据";

return;

}



let html="";



list.forEach(item=>{


html+=`

<div class="card">


<div>
📍货架：
${item.shelf}
</div>


<div>
👕款号：
${item.style}
</div>


<div>
🎨颜色：
${item.color}
</div>


<div class="time">

添加：
${item.createTime}

<br>

修改：
${item.updateTime}

</div>


</div>

`;



});



box.innerHTML=html;



}










// ================================
// 管理列表
// ================================


function renderInventoryList(list){



let box =
document.getElementById(
"inventoryList"
);



if(!box)
return;



let html="";



list.forEach(item=>{


html+=`

<div class="card">


<b>
${item.style}
</b>


<br>

货架:
${item.shelf}


<br>

颜色:
${item.color}


<br>


<span>

创建:
${item.createTime}

<br>

修改:
${item.updateTime}

</span>


<br>



<button
onclick="editInventory(${item.id})">

修改

</button>



<button
onclick="removeInventory(${item.id})">

删除

</button>



</div>


`;



});




box.innerHTML=html || "暂无数据";



}









// ================================
// 修改库存
// ================================


async function editInventory(id){



let item =
await getDataById(
"inventory",
id
);



if(!item)
return;




let shelf =
prompt(
"修改货架号",
item.shelf
);



let style =
prompt(
"修改款号",
item.style
);



let color =
prompt(
"修改颜色",
item.color
);




item.shelf=shelf;

item.style=style;

item.color=color;



item.updateTime=
nowTime();




await updateData(
"inventory",
item
);



loadInventory();



}









// ================================
// 删除库存
// ================================


async function removeInventory(id){



if(
!confirm(
"确定删除？"
)
)
return;



await deleteData(
"inventory",
id
);



loadInventory();



}









// 启动加载

window.addEventListener(
"DOMContentLoaded",
()=>{


initDB()
.then(()=>{


loadInventory();


});


});
