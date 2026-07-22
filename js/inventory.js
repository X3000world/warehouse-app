// =====================================
// 仓库库存模块
// =====================================



let currentEditId = null;



// ================================
// 获取全部库存
// ================================


async function getInventory(){


    return await getAllData(
        "inventory"
    );


}








// ================================
// 查询
// ================================


async function searchInventory(keyword){


    let list =
    await getInventory();



    if(!keyword){


        return list;


    }



    keyword =
    keyword
    .toLowerCase()
    .trim();



    return list.filter(
    item=>{


        return (

            item.shelf
            .toLowerCase()
            .includes(keyword)


            ||

            item.style
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
// 添加库存
// ================================


async function addInventory(data){



    let time =
    nowTime();



    let item={


        shelf:
        data.shelf,


        style:
        data.style,


        color:
        data.color,



        createTime:
        time,



        updateTime:
        time


    };




    await addData(
        "inventory",
        item
    );



    toast(
    "添加成功"
    );



}









// ================================
// 修改库存
// ================================


async function updateInventory(
id,
data
){



    let old =
    await getData(
        "inventory",
        id
    );



    if(!old)
    return;




    old.shelf =
    data.shelf;


    old.style =
    data.style;


    old.color =
    data.color;



    old.updateTime =
    nowTime();



    await updateData(
        "inventory",
        old
    );



    toast(
    "修改成功"
    );



}









// ================================
// 删除库存
// ================================


async function deleteInventory(id){



    if(
    !confirm(
    "确定删除吗？"
    )
    )
    return;



    await deleteData(
        "inventory",
        id
    );



    toast(
    "删除成功"
    );


}









// ================================
// 批量导入
// ================================


async function batchImportInventory(text){



    let lines =
    text
    .split("\n");



    let count=0;



    for(
    let line of lines
    ){


        line =
        line.trim();



        if(!line)
        continue;



        let arr =
        line.split("/");



        if(
        arr.length!==3
        )
        continue;



        await addInventory({

            shelf:
            arr[0].trim(),


            style:
            arr[1].trim(),


            color:
            arr[2].trim()


        });



        count++;



    }



    toast(
    "成功导入"+count+"条"
    );



}









// ================================
// 判断重复款号
// ================================


async function checkStyleExist(style){



    let list =
    await getInventory();



    return list.filter(
    item=>
    item.style===style
    );



}









// ================================
// 渲染库存列表
// ================================


async function renderInventoryList(){



    let box =
    document.getElementById(
        "inventoryList"
    );



    if(!box)
    return;



    let list =
    await getInventory();



    let html="";



    list.forEach(
    item=>{


        html+=`

<div class="manage-item">


<div>

<b>
${item.shelf}
</b>

<br>

${item.style}
-
${item.color}

<br>


<small>
创建:
${item.createTime}

<br>

修改:
${item.updateTime}

</small>


</div>



<div>


<button
onclick="editInventory(${item.id})">

修改

</button>



<button
onclick="deleteInventory(${item.id})">

删除

</button>


</div>



</div>

`;



});



box.innerHTML =
html ||
"暂无数据";



}









// ================================
// 编辑入口
// ================================


async function editInventory(id){



let item =
await getData(
"inventory",
id
);



if(!item)
return;



currentEditId=id;



document
.getElementById(
"shelfInput"
)
.value =
item.shelf;



document
.getElementById(
"styleInput"
)
.value =
item.style;



document
.getElementById(
"colorInput"
)
.value =
item.color;



}
