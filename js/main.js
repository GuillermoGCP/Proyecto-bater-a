"use strict";

//MÓDULO REPRODUCCIÓN DE SONIDOS INDIVIDUALES:

//Buttons:
const crashButton = document.getElementById("crashButton");
const hithat_closeButton = document.getElementById("hihat_closeButton");
const hithat_openButton = document.getElementById("hihat_openButton");
const kickButton = document.getElementById("kickButton");
const rideButton = document.getElementById("rideButton");
const snareButton = document.getElementById("snareButton");
const tom_highButton = document.getElementById("tom_highButton");
const tom_lowButton = document.getElementById("tom_lowButton");
const tom_midButton = document.getElementById("tom_midButton");

//Audios:
const audioCrash = new Audio("../audio/crash.wav");
const audioHihat_close = new Audio("../audio/hihat-close.wav");
const audioHihat_open = new Audio("../audio/hihat-open.wav");
const audioKick = new Audio("../audio/kick.wav");
const audioRide = new Audio("../audio/ride.wav");
const audioSnare = new Audio("../audio/snare.wav");
const audioTom_high = new Audio("../audio/tom-high.wav");
const audioTom_low = new Audio("../audio/tom-low.wav");
const audioTom_mid = new Audio("../audio/tom-mid.wav");

//Events with click:
crashButton.addEventListener("click", () => {
  audioCrash.play();
  crashButton.blur();
});
hithat_closeButton.addEventListener("click", () => {
  audioHihat_close.play();
  hithat_closeButton.blur();
});
hithat_openButton.addEventListener("click", () => {
  audioHihat_open.play();
  hithat_openButton.blur();
});
kickButton.addEventListener("click", () => {
  audioKick.play();
  kickButton.blur();
});
rideButton.addEventListener("click", () => {
  audioRide.play();
  rideButton.blur();
});
snareButton.addEventListener("click", () => {
  audioSnare.play();
  snareButton.blur();
});
tom_highButton.addEventListener("click", () => {
  audioTom_high.play();
  tom_highButton.blur();
});
tom_lowButton.addEventListener("click", () => {
  audioTom_low.play();
  tom_lowButton.blur();
});
tom_midButton.addEventListener("click", () => {
  audioTom_mid.play();
  tom_midButton.blur();
});

//Events with keypress:
document.body.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    audioSnare.play();
  }
  if (event.key === " ") {
    audioKick.play();
  }
  if (event.key === "t") {
    audioTom_high.play();
  }
  if (event.key === "r") {
    audioTom_mid.play();
  }
  if (event.key === "e") {
    audioTom_low.play();
  }
  if (event.key === "p") {
    audioCrash.play();
  }
  if (event.key === "o") {
    audioHihat_close.play();
  }
  if (event.key === "i") {
    audioHihat_open.play();
  }
  if (event.key === "u") {
    audioRide.play();
  }
});

//Estilos
let buttons = document.querySelectorAll(".buttons");
console.log(buttons);
for (let boton of buttons) {
  boton.addEventListener("click", () => {
    boton.style.color = "blue";
    setTimeout(() => {
      boton.style.color = "inherit";
    }, 300);
  });
}
