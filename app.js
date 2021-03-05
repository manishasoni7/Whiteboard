const canvas= document.querySelector("#draw");
const ctx= canvas.getContext("2d");

const inputs=document.querySelectorAll('.control input');
const tool=document.querySelectorAll('.tools img')

canvas.width=(window.visualViewport.width-70);
canvas.height=window.visualViewport.height;


ctx.lineJoin="round";
ctx.lineCap="round";

let isDrawing= false;
let isMulticolor=false;
let lastX=0;
let lastY=0;
let hue=0;

const handleUpdate=(e)=>{
    e.preventDefault();
    isMulticolor=false;
    if(e.target.title=="highlighter"){
        ctx.strokeStyle='rgba(255,255,0,0.075)';
        ctx.lineWidth=40;
        ctx.lineCap="rectangle";
    }
    if(e.target.title=="Pen"){
        inputs.forEach(input => {
            input.addEventListener('change',penUpdate);
    });   
    }
    if(e.target.title=="Multicolor Pencil"){
        ctx.lineWidth=e.target.dataset.size;
        isMulticolor=true;
    }
    else{
        ctx.strokeStyle=e.target.dataset.color;
        ctx.lineWidth=e.target.dataset.size;
    }    
}
const penUpdate=(e)=>{ 
    e.preventDefault();
    if(e.target.name=='size')  
    ctx.lineWidth=e.target.value;
    if(e.target.name=='colour')
    ctx.strokeStyle=e.target.value;
}

inputs.forEach(input => input.addEventListener('change',penUpdate));
tool.forEach(input => input.addEventListener('click',handleUpdate));

let nextX=0;
let nextY=0;
let rect = canvas.getBoundingClientRect();

const drawing=(e)=>{
    
    e.preventDefault();
    if(isDrawing===false)return;
    if(isMulticolor===true){
        ctx.strokeStyle = `hsla(${hue}, 100%, 50%, 0.5)`;
    }
    ctx.beginPath();
    ctx.moveTo(lastX,lastY);
    if(window.innerWidth<1024){
        [nextX, nextY]=[e.touches[0].clientX-70,e.touches[0].clientY];
    }   
    else{
        [nextX, nextY]=[e.offsetX,e.offsetY]
    }
    ctx.lineTo(nextX,nextY);
    ctx.stroke();
    [lastX,lastY]=[nextX,nextY];
    
    hue++;
    if(hue>=360) hue=0;
}
function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      
    }}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });
  canvas.addEventListener('mousemove', drawing);
  canvas.addEventListener('mouseup', () => isDrawing = false);
 
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDrawing = true;
    [lastX,lastY]=[e.touches[0].clientX-70,e.touches[0].clientY];
    console.log(lastX,lastY)
  });
  canvas.addEventListener('touchmove', drawing);
  canvas.addEventListener('touchend', (e) => {e.preventDefault();
    isDrawing = false});

  
  