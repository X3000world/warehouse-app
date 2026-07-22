/**
 * 库存管理模块
 */


let inventoryCache=[];




// =========================
// 初始化库存
// =========================


async function loadInventory(){


inventoryCache =
await getAllInventory();



return inventoryCache;


}





// =========================
// 添加库存
// =========================


async function createInventory(
shelf,
style,
color
){



const data={

shelf,

style,

color

};



await addInventory(data);



await loadInventory();


}







// =========================
// 修改库存
// =========================


async function editInventory(
id,
shelf,
style,
color
){



const item =
inventoryCache.find(
x=>x.id===id
);



if(!item){

return;

}



item.shelf=shelf;

item.style=style;

item.color=color;



await updateInventory(item);



await loadInventory();



}








// =========================
// 删除库存
// =========================


async function removeInventory(id){



if(
!confirm(
"确定删除该库存记录？"
)
){

return;

}



await deleteInventory(id);



await loadInventory();


}









// =========================
// 查询库存
// =========================


function searchInventory(keyword){



keyword =
keyword
.trim()
.toLowerCase();



if(!keyword){

return [];

}




const keys =
keyword
.split(
/[/\s,，]+/
);



return inventoryCache.filter(
item=>{


return keys.some(k=>{


return (

item.style
.toLowerCase()
.includes(k)

||

item.color
.toLowerCase()
.includes(k)

||

item.shelf
.toLowerCase()
.includes(k)


);


});


}

);


}








// =========================
// 批量导入
// =========================


async function batchCreateInventory(text){


const lines =
text
.split("\n");


let count=0;



for(
let line of lines
){



line=line.trim();



if(!line){

continue;

}



const arr =
line.split("/");



if(arr.length!==3){

continue;

}



await createInventory(

arr[0].trim(),

arr[1].trim(),

arr[2].trim()

);



count++;


}



return count;


}








// =========================
// 获取排序数据
// =========================


function sortInventory(
data,
type="shelf"
){



return data.sort(
(a,b)=>{


if(type==="style"){


return a.style.localeCompare(
b.style
);


}



return a.shelf.localeCompare(
b.shelf
);



}

);


}
