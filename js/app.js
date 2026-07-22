// ======================================
// APP核心启动文件
// ======================================


// 当前版本

const APP_VERSION = "1.0.0";




// ================================
// APP启动
// ================================


window.onload = async function(){


    console.log(
        "仓库管理系统启动",
        APP_VERSION
    );


    // 初始化数据库

    await initDB();



    // 加载数据

    await loadInventory();



    await loadMemo();



    // 更新时间显示

    updateTime();



};







// ================================
// 时间工具
// ================================


function nowTime(){


    let d =
    new Date();


    let y =
    d.getFullYear();


    let m =
    String(
        d.getMonth()+1
    ).padStart(2,"0");



    let day =
    String(
        d.getDate()
    ).padStart(2,"0");



    let h =
    String(
        d.getHours()
    ).padStart(2,"0");



    let min =
    String(
        d.getMinutes()
    ).padStart(2,"0");



    let s =
    String(
        d.getSeconds()
    ).padStart(2,"0");



    return `${y}-${m}-${day} ${h}:${min}:${s}`;

}








// ================================
// 更新时间
// ================================


function updateTime(){


    let el =
    document.getElementById(
        "systemTime"
    );


    if(el){


        el.innerHTML =
        nowTime();


    }



}









// ================================
// 数据加载
// ================================


async function loadInventory(){



    window.inventoryData =
    await getAllData(
        "inventory"
    );



    if(!inventoryData){


        inventoryData=[];


    }



    console.log(
        "库存:",
        inventoryData.length
    );



}








async function loadMemo(){



    window.memoData =
    await getAllData(
        "memo"
    );



    if(!memoData){


        memoData=[];


    }



    console.log(
        "备忘:",
        memoData.length
    );



}









// ================================
// 页面切换
// ================================


function switchPage(page){



    document
    .querySelectorAll(
        ".page"
    )
    .forEach(
        e=>{
            e.style.display="none";
        }
    );



    let target =
    document.getElementById(
        page
    );



    if(target){


        target.style.display="block";


    }



}









// ================================
// 防止误退出提示
// ================================


let dataChanged=false;




function markChanged(){


    dataChanged=true;


}







window.onbeforeunload=function(e){


    if(dataChanged){


        e.preventDefault();


        return "";

    }


};










// ================================
// 图片处理
// ================================



function imageToBase64(file){



return new Promise(
(resolve)=>{


let reader =
new FileReader();



reader.onload=function(e){


resolve(
e.target.result
);


};



reader.readAsDataURL(
file
);



});


}









// ================================
// 图片压缩
// ================================


function compressImage(
base64,
maxWidth=1000
){



return new Promise(
resolve=>{


let img =
new Image();



img.onload=function(){



let canvas =
document.createElement(
"canvas"
);



let scale =
maxWidth /
img.width;



if(scale>1)
scale=1;



canvas.width =
img.width*scale;


canvas.height =
img.height*scale;



let ctx =
canvas.getContext(
"2d"
);



ctx.drawImage(
img,
0,
0,
canvas.width,
canvas.height
);



resolve(
canvas.toDataURL(
"image/jpeg",
0.8
)
);



};



img.src=base64;



});



}










// ================================
// 通用提示
// ================================


function toast(msg){



let div =
document.createElement(
"div"
);



div.innerHTML=msg;



div.style.position=
"fixed";



div.style.bottom=
"80px";



div.style.left=
"50%";



div.style.transform=
"translateX(-50%)";



div.style.background=
"rgba(0,0,0,.75)";



div.style.color=
"#fff";



div.style.padding=
"12px 20px";



div.style.borderRadius=
"20px";



div.style.zIndex=
"9999";



document.body.appendChild(
div
);



setTimeout(
()=>{

div.remove();

},
2000
);



}
