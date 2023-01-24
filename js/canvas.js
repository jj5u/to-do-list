const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 300;

ctx.fillRect(100, 200, 25, 200);
ctx.fillRect(200, 200, 25, 200);
ctx.lineWidth = 2;
ctx.strokeRect(150, 250, 25, 50);
ctx.fillRect(100, 200, 100, 5);
ctx.moveTo(100, 200);
ctx.lineTo(162, 150);
ctx.lineTo(225, 200);
ctx.fill();
ctx.beginPath();
ctx.arc(169, 280, 3, 0, 2 * Math.PI);
ctx.stroke();

const colors = ['red','yellow','blue']
let xPoint = ""
let yPoint = ""

function draw(e) {
const color = colors[Math.floor(Math.random()*colors.length)]
ctx.moveTo(xPoint,yPoint);
ctx.lineTo(e.offsetX,e.offsetY);
ctx.strokeStyle = color
ctx.stroke();
ctx.beginPath()
}
function onClick(e) {
xPoint = e.offsetX
yPoint = e.offsetY
ctx.moveTo(xPoint,yPoint);
canvas.addEventListener('mousemove',draw);
}
canvas.addEventListener('click',onClick)
