const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2C2c";
const CANVAS_SIZE = 700;

canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let filling = false;
let painting = false;

function stopPainting(){
    painting= false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    //전달된 이벤트에 대해 콘솔로그 출력
    // console.log(event);
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x, y);
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}


function onMouseUp(event){
    stopPainting();
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
}

function handleRangeChange(event){
    // console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth=size;
}

function handleModeClick(){
    if(filling === true){
        filling =false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }

}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event){
    // console.log(event);
    // event.preventDefault(); //우클릭 방지
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href=image;
    link.download = "PaintJS[😝]";
    link.click();
}
if(canvas){
    //canvas위에 마우스가 움직일때 onMouseMove로 
    //event를 전달하는 이벤트 리스너 부착
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}