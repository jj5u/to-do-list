const lineWidth = document.querySelector("#width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const color = document.getElementById("color");
const colorSelected = document.querySelector(".selected-color-option");
const colorOption = Array.from(document.getElementsByClassName("color-option"));
const strokeModeBtn = document.querySelector(".mode-btn");
const resetBtn = document.querySelector(".reset-btn");
const eraserBtn = document.querySelector(".eraser-btn");
const saveBtn = document.querySelector(".save-btn");
const inputImage = document.getElementById("file-image");
const inputTxt = document.getElementById("input-txt");
const radios = document.getElementsByName("font-style");
const selectFontFace = document.getElementById("font-family");
const selectFontSize = document.getElementById("font-size");
const fillBtn = document.querySelector(".canvas-fill-btn");
const CANVAS_SIZE = 300;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
colorSelected.dataset.color = color.value;
colorSelected.style.backgroundColor = color.value;
let isPainting = false;
let strokeMode = true;
let eraserMode = false;
let fontStroke = true;
let fontStyle = "";
let fontSize = selectFontSize.value;
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
  const colorInputValue = e.target.value;
  ctx.strokeStyle = colorInputValue;
  colorSelected.dataset.color = colorInputValue;
  colorSelected.style.backgroundColor = colorInputValue;
}
function onColorClick(e) {
  const colorValue = e.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
  colorSelected.dataset.color = colorValue;
  colorSelected.style.backgroundColor = colorValue;
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
function onFileChange(e) {
  const files = e.target.files[0];
  const url = URL.createObjectURL(files);
  const img = new Image();
  img.src = url;
  img.onload = function () {
    ctx.drawImage(img, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    inputImage.value = null;
  };
}
function paintText(e) {
  const text = inputTxt.value;
  ctx.lineWidth = 1;
  const selectedStyle = `${fontSize}rem '${fontStyle}'`;
  ctx.font = selectedStyle;
  if (text !== "" && fontStroke) {
    ctx.strokeText(text, e.offsetX, e.offsetY);
  } else if (text !== "" && !fontStroke) {
    ctx.fillText(text, e.offsetX, e.offsetY);
  }
}
function onDbClick(e) {
  ctx.save();
  paintText(e);
  ctx.restore();
}
function saveCanvas() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "my_img.png";
  a.click();
}
function onRadioClick(e) {
  if (e.target.value === "font-style-fill") {
    fontStroke = false;
  } else {
    fontStroke = true;
  }
}
function setFont(fontFamily, fontUrl) {
  let fontFile = new FontFace(fontFamily, "url(" + fontUrl + ")");
  document.fonts.add(fontFile);
  fontFile.load();
  fontStyle = fontFile.family;
}
function onSelectChange(e) {
  const fontFamily = e.target.value;
  const fontIndex = e.target.selectedIndex;
  const fontUrlList = [
    "",
    "https://fonts.gstatic.com/s/sassyfrass/v5/LhWhMVrGOe0FLb97BjhsE-9aEtSygOan.woff2",
    "https://fonts.gstatic.com/s/robotomono/v22/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vq_ROW4AJi8SJQt.woff2",
  ];
  const fontUrl = fontUrlList[fontIndex];
  setFont(fontFamily, fontUrl);
}
function onFontSizeChange(e) {
  fontSize = e.target.value;
}
function paintCanvas() {
  ctx.fillStyle = color.value;
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}
function onFillBtnClick() {
  ctx.save();
  paintCanvas();
  ctx.restore();
}
canvas.addEventListener("dblclick", onDbClick);
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
radios.forEach((radio) => {
  radio.addEventListener("click", onRadioClick);
});
resetBtn.addEventListener("click", resetCanvas);
eraserBtn.addEventListener("click", eraseCanvas);
saveBtn.addEventListener("click", saveCanvas);
inputImage.addEventListener("change", onFileChange);
selectFontFace.addEventListener("change", onSelectChange);
selectFontSize.addEventListener("change", onFontSizeChange);
fillBtn.addEventListener("click", onFillBtnClick);
