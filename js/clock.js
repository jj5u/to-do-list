"use strict";

function getClock() {
  const date = new Date();
  const clock = document.querySelector("div#clock");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  clock.innerHTML = `<span>${hours} <br> ${minutes} <br> ${seconds} </span>`;
}

setInterval(getClock, 1000);
