const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

//This figures out how far from the left and the top of the monitor the canvas is
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

//This figures out how big the canvas is
canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;

//These will hold the XY coordinates of where the pencil starts
let startX;
let startY;

toolbar.addEventListener('click', e=>{
    if(e.target.id === 'clear'){
        ctx.clearRect(0,0,canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e=>{
    if(e.target.id === 'stroke'){
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth'){
        lineWidth = e.target.value;
    }
});

const draw = (e) =>{
    if(!isPainting){
        return;
    }
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round'; //This makes it look like you're drawing with a pen
    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY); //Minus canvasOffsetX so that the mouse and the line drawn line up

    ctx.stroke(); //This allows you to see what you're drawing as you draw

}

canvas.addEventListener('mousedown', e=>{
    isPainting = true
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e=>{
    isPainting = false;
    ctx.stroke();
    ctx.beginPath(); //This makes sure the next kine drawn is not a continuation of the previous one
});

canvas.addEventListener('mousemove', draw);