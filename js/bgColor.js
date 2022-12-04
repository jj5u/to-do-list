const colors = ["#000", "#141e36", "#5f0000", "#0b4c3d"];
const chosenColor = colors[Math.floor(Math.random() * colors.length)];
document.getElementById("left").style.backgroundColor = chosenColor;
