"use strict";

//Selectors:
const buttons = document.querySelectorAll("#buttonsContainer > button");
const audios = document.querySelectorAll("#audiosContainer > audio");

//Events click:
for (let btn of buttons) {
  btn.addEventListener("click", () => {
    //STYLES:
    btn.style.backgroundColor = "red";
    btn.style.transform = "scale(0.93)";
    setTimeout(() => {
      btn.style.backgroundColor = "#555";
      btn.style.transform = "scale(1)";
    }, 200);
    //PLAY FUNCTION:
    playSound(btn.id);
    btn.blur();
    //RECORD FUNCTION:
    if (isRecording) {
      soundsArray.push(btn.value);
    } else if (!isRecording) {
      return;
    }
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
        const newAudio = new Audio(sound.src);
        newAudio.play();
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

//------------------------------------------------------
//RECORD script:

//Selections:
const recordButton = document.getElementById("recordButton");
const stopButton = document.getElementById("stopButton");
const playButton = document.getElementById("playButton");
let pad = document.querySelector(".contenidoPantalla");

//vars:
let isRecording = false;
let isPlaying = false;
let soundsArray = [];
let hideOrNot = true;
let interval1;
let interval2;

//Events:
recordButton.addEventListener("click", () => {
  soundsArray = [];
  isRecording = true;
  //STYLES:
  recordButton.style.backgroundColor = "red";
  recordButton.style.transform = "scale(0.93)";
  playButton.style.backgroundColor = "#777";
  playButton.style.transform = "scale(1)";
  //PAD:
  clearInterval(interval1);
  interval2 = setInterval(PadContentRecording, 800);
});

playButton.addEventListener("click", () => {
  isPlaying = true;
  playFunction();
  //STYLES:
  playButton.style.backgroundColor = "green";
  playButton.style.transform = "scale(0.93)";
  recordButton.style.backgroundColor = "#777";
  recordButton.style.transform = "scale(1)";
  //PAD:
  clearInterval(interval2);
  interval1 = setInterval(PadContentPlaying, 800);
});

stopButton.addEventListener("click", () => {
  isRecording = false;
  isPlaying = false;
  //STYLES:
  stopButton.style.transform = "scale(0.93)";
  recordButton.style.backgroundColor = "#777";
  recordButton.style.transform = "scale(1)";
  playButton.style.backgroundColor = "#777";
  playButton.style.transform = "scale(1)";
  setTimeout(() => {
    stopButton.style.transform = "scale(1)";
  }, 200);
  //PAD:
  clearInterval(interval1);
  clearInterval(interval2);
  pad.textContent = "";
});

//Functions:
function playFunction() {
  if (isPlaying) {
    let delay = 0;

    function playWithDelay() {
      if (delay < soundsArray.length) {
        let track = new Audio(soundsArray[delay]);
        track.play();
      }
    }
    playWithDelay();

    setInterval(() => {
      delay++;
      playWithDelay();
    }, 600);
  }
}

function PadContentPlaying() {
  if (hideOrNot) {
    pad.textContent = "Playing...";
    hideOrNot = false;
  } else if (!hideOrNot) {
    pad.textContent = "";
    hideOrNot = true;
  }
}
function PadContentRecording() {
  if (hideOrNot) {
    pad.textContent = "Recording...";
    hideOrNot = false;
  } else if (!hideOrNot) {
    pad.textContent = "";
    hideOrNot = true;
  }
}
