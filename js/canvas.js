const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 300;
ctx.lineWidth = 2;
let isPainting = false;

function onMousemove(e){
    if (isPainting) {
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()
        return;
    }
    ctx.moveTo(e.offsetX, e.offsetY)
}
function startPainting(){
    isPainting = true
}
function cancelPainting(){
    isPainting = false
}
canvas.addEventListener('mousemove',onMousemove)
canvas.addEventListener('mousedown',startPainting)
canvas.addEventListener('mouseup',cancelPainting)
canvas.addEventListener('mouseleave',cancelPainting)