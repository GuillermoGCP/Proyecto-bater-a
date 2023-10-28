"use strict";

//MÓDULO REPRODUCCIÓN DE SONIDOS INDIVIDUALES:

//Selectors:
const buttons = document.querySelectorAll("#buttonsContainer > button");
const audios = document.querySelectorAll("#audiosContainer > audio");

//Styles and play:
for (let btn of buttons) {
  btn.addEventListener("click", () => {
    //STYLES:
    btn.style.color = "blue";
    btn.style.transform = "scale(0.93)";
    setTimeout(() => {
      btn.style.color = "inherit";
      btn.style.transform = "scale(1)";
    }, 200);
    //PLAY FUNCTION:
    playSound(btn.id);
    btn.blur();
  });
}

// Functions:
function playSound(id) {
  for (let audio of audios) {
    const sound = audio;
    if (id === sound.className) {
      sound.play();
    }
  }
}
