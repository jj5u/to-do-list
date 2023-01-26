const lineWidth = document.querySelector("#width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const color = document.getElementById("color");
const colorOption = Array.from(document.getElementsByClassName("color-option"));
const fillMode = document.querySelector(".fill-yn");
canvas.width = 300;
canvas.height = 300;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let fillModeYn = 1;

function startPainting() {
  ctx.beginPath();
  isPainting = true;
  //   fillModeYn = 1;
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
function onFillMode(e) {
  fillModeYn === 1 ? (fillModeYn = 0) : (fillModeYn = 1);
  fillModeYn === 1 ? (e.target.innerText = "stroke-mode") : (e.target.innerText = "fill-mode");
}
function onMousemove(e) {
  if (isPainting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    fillModeYn === 1 ? ctx.stroke() : ctx.fill();
    return;
  }
  ctx.moveTo(e.offsetX, e.offsetY);
}
canvas.addEventListener("mousemove", onMousemove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
fillMode.addEventListener("click", onFillMode);
colorOption.forEach((color) => {
  color.addEventListener("click", onColorClick);
});
