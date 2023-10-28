"use strict";

//Selectors:
const buttons = document.querySelectorAll("#buttonsContainer > button");
const audios = document.querySelectorAll("#audiosContainer > audio");

//Events click:
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

//Events keys:
document.body.addEventListener("keydown", (event) => {
  const key = event.key;
  playSoundsKey(keysArray[key]);
});

const keysArray = {
  Enter: "snare",
  " ": "kick",
  u: "ride",
  t: "tom_high",
  e: "tom_low",
  r: "tom_mid",
  p: "crash",
  o: "hihat_close",
  i: "hihat_open",
};

// Functions:
function playSound(id) {
  for (let audio of audios) {
    const sound = audio;
    if (id === sound.className) {
      try {
        sound.play();
      } catch (error) {
        console.error(`Error al reproducir el audio: ${error.message}`);
      }
    }
  }
}

function playSoundsKey(key) {
  for (let audio of audios) {
    if (audio.className === key) {
      audio.play();
    }
  }
}
