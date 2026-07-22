/**
 * 库存页面控制
 */



// 当前编辑ID

let editInventoryId=null;



// ========================
// 打开管理页面
// ========================


async function renderInventoryPage(){


const list =
document.getElementById(
"inventoryList"
);



const data =
sortInventory(
await getAllInventory()
);



if(data.length===0){

list.innerHTML=
`
<div class="empty-state">
暂无库存数据
</div>
`;

return;

}




let html="";



data.forEach(item=>{


html+=`

<div class="manage-item">


<div class="manage-item-info">

<b>${item.shelf}</b>
<br>

款号：
${item.style}

<br>

颜色：
${item.color}


<br>

<small>
添加：
${formatTime(item.createTime)}
</small>

<br>

<small>
修改：
${formatTime(item.updateTime)}
</small>


</div>


<div>


<button

class="btn btn-primary"

onclick="
editInventoryOpen(${item.id})
">

修改

</button>



<button

class="btn btn-danger"

onclick="
removeInventory(${item.id});
renderInventoryPage();
">

删除

</button>



</div>


</div>


`;



});



list.innerHTML=html;



}








// ========================
// 保存库存
// ========================


async function saveInventoryForm(){



const shelf=
document
.getElementById(
"inventoryShelf"
)
.value
.trim();



const style=
document
.getElementById(
"inventoryStyle"
)
.value
.trim();



const color=
document
.getElementById(
"inventoryColor"
)
.value
.trim();




if(
!shelf||
!style||
!color
){

alert(
"请填写完整"
);

return;

}




if(editInventoryId){


await editInventory(

editInventoryId,

shelf,

style,

color

);


editInventoryId=null;



}else{


await createInventory(

shelf,

style,

color

);


}




clearInventoryForm();



await renderInventoryPage();



alert(
"保存成功"
);



}








// ========================
// 修改
// ========================


async function editInventoryOpen(id){



const data =
(await getAllInventory())
.find(
x=>x.id===id
);



if(!data){

return;

}




document
.getElementById(
"inventoryShelf"
)
.value=data.shelf;


document
.getElementById(
"inventoryStyle"
)
.value=data.style;


document
.getElementById(
"inventoryColor"
)
.value=data.color;



editInventoryId=id;



}






function clearInventoryForm(){


document
.getElementById(
"inventoryShelf"
)
.value="";


document
.getElementById(
"inventoryStyle"
)
.value="";


document
.getElementById(
"inventoryColor"
)
.value="";



}
async function batchInventorySubmit(){



const text=
document
.getElementById(
"batchInventory"
)
.value;



const count=
await batchCreateInventory(text);



alert(
"成功添加 "+count+" 条"
);



document
.getElementById(
"batchInventory"
)
.value="";



renderInventoryPage();


}




function formatTime(time){


if(!time){

return "-";

}


return new Date(time)
.toLocaleString();


}
