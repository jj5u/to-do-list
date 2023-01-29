const lineWidth = document.querySelector("#width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const color = document.getElementById("color");
const colorOption = Array.from(document.getElementsByClassName("color-option"));
const strokeModeBtn = document.querySelector(".mode-btn");
const resetBtn = document.querySelector(".reset-btn");
const eraserBtn = document.querySelector(".eraser-btn");
const CANVAS_SIZE = 300;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let strokeMode = true;
let eraserMode = false;
function startPainting() {
  isPainting = true;
  ctx.beginPath();
}
function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}
function onLineWidthChange(e) {
  ctx.lineWidth = e.target.value;
}
function onColorChange(e) {
  ctx.strokeStyle = e.target.value;
}
function onColorClick(e) {
  const colorValue = e.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}
function onModeClick(e) {
  ctx.strokeStyle = color.value;
  strokeMode ? (strokeMode = false) : (strokeMode = true);
  strokeMode ? (e.target.innerText = "stroke-mode") : (e.target.innerText = "fill-mode");
  eraserMode = false ? (eraserBtn.innerText = "eraser") : (eraserBtn.innerText = "eraser");
}
function onMousemove(e) {
  if (isPainting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    strokeMode ? ctx.stroke() : ctx.fill();
    return;
  }
  ctx.moveTo(e.offsetX, e.offsetY);
}
function resetCanvas() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}
function eraseCanvas(e) {
  strokeMode = true;
  strokeModeBtn.innerText = "stroke-mode";
  eraserMode = false ? (eraserMode = true) : (eraserMode = false);
  eraserMode = false ? (eraserBtn.innerText = "eraser") : (eraserBtn.innerText = "eraser on");
  eraserMode = false ? (ctx.strokeStyle = color.value) : (ctx.strokeStyle = "#fff");
}
canvas.addEventListener("mousemove", onMousemove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
strokeModeBtn.addEventListener("click", onModeClick);
colorOption.forEach((color) => {
  color.addEventListener("click", onColorClick);
});
resetBtn.addEventListener("click", resetCanvas);
eraserBtn.addEventListener("click", eraseCanvas);
