"use strict";

//Selectors:
const buttons = document.querySelectorAll("#buttonsContainer > button");
const audios = document.querySelectorAll("#audiosContainer > audio");

//Styles and click play:
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
      try {
        sound.play();
      } catch (error) {
        console.error(`Error al reproducir el audio: ${error.message}`);
      }
    }
  }
}

//Keys play:
document.body.addEventListener("keydown", (event) => {
  for (let audio of audios) {
    if (event.key === "Enter" && audio.className === "snare") {
      audio.play();
      break;
    }
    if (event.key === " " && audio.className === "kick") {
      audio.play();
    }
    if (event.key === "t" && audio.className === "tom_high") {
      audio.play();
    }
    if (event.key === "r" && audio.className === "tom_mid") {
      audio.play();
    }
    if (event.key === "e" && audio.className === "tom_low") {
      audio.play();
    }
    if (event.key === "p" && audio.className === "crash") {
      audio.play();
    }
    if (event.key === "o" && audio.className === "hihat_close") {
      audio.play();
    }
    if (event.key === "i" && audio.className === "hihat_open") {
      audio.play();
    }
    if (event.key === "u" && audio.className === "ride") {
      audio.play();
    }
  }
});
