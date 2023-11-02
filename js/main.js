"use strict";

//SELECTORS:
const buttons = document.querySelectorAll("#buttonsContainer > button");
const audios = document.querySelectorAll("#audiosContainer > audio");

//EVENTS BY CLICK:
//Recorremos el array buttons y le añadimos un escuchador con un evento click. A cada click aplicaremos estilos a los botones, activaremos la función que reproduce los sonidos y, si se cumple la condición establecida, activaremos la función saveSound(), que guardará los sonidos para reproducirlos luego.

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
    playSoundByClick(btn.id);
    btn.blur();
    //RECORD FUNCTION:
    if (isRecording) {
      saveSound(btn.id);
    }
  });
}

//EVENTS BY KEY:
//Añadimos un escuchador al body con un evento keydown, de forma que cuando se presione cualquier tecla se cree una variable que guardará el evento key. Luego llamamos a la función encargada de reproducir los sonidos y le pasamos como parámetro el valor comparado en el objeto keysArray, de modo que, por ejemplo, si presionas "Enter" envíe como parámetro "snare". Más abajo, la función playSoundsByKey recorrerá todos los audios y comparará este valor con la clase de cada uno de ellos, y si coincide, lo reproduce.
document.body.addEventListener("keydown", (event) => {
  const key = event.key;
  playSoundByKey(keysArray[key]);
  if (isRecording) {
    //Activa la función grabadora.
    saveSound(keysArray[key]);
  }
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

// FUNCTIONS:
//Esta es la función que reproduce los sonidos del evento "click". Recorre el array "audios" y compara el id recibido con la clase de cada audio. Si todo está bien crea una nueva instancia del sonido, para poder reproducirlo fluidamente y no tener que esperar que se termine el anterior para reproducir el actual, y lo reproduce.
function playSoundByClick(id) {
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

//Esta es la función que reproduce los sonidos del evento "keydown". Recibe el parámetro "key" que es el valor contrastado en el array "keysArray" y lo usa para compararlo con la clase de los audios. Si se cumple el requisito crea una nueva instancia del sonido y lo reproduce.
//Además, si la variable "isRecording" es true, añade el atributo src al array "soundsArray", para reproducirlos cuando se pulse el botón "play". Todo esto se explica más abajo.
function playSoundByKey(key) {
  try {
    for (let audio of audios) {
      if (audio.className === key) {
        const newAudio = new Audio(audio.src);
        newAudio.play();
      }
    }
  } catch (error) {
    console.error(`Error al reproducir el audio: ${error.message}`);
  }
}

//------------------------------------------------------
//RECORD script:
//Parte de la grabación y posterior reprodución de sonidos grabados.

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
let writing = false;
let stopPlaying = false;
let interval1;
let interval2;
let interval3;
let index = 0;

//Events:
//En el botón de grabar añadimos un escuchador con un evento "click". Lo primero que hace es reiniciar el array de sonidos de las grabaciones anteriores, acto seguido pone en "true" la variable isRecording. Luego le ponemos un blur para evitar que se nos quede el foco puesto sobre el botón y nos interfiera con las teclas que reproducen sonidos.
//Añadimos estilos al botón y anulamos los estilos del botón play, si los hubiera.
//Por último terminamos el intervalo anterior, si estuviera activo, y activamos un intervalo de un segundo para activar la función que se encarga de escribir los mensajes en el PAD (ver más abajo).
recordButton.addEventListener("click", () => {
  soundsArray = []; //Reinicia el array de sonidos guardados.
  isRecording = true; //Activa la grabación de clicks en el array.
  recordButton.blur(); //Saca el foco sobre el botón.
  //STYLES:
  recordButton.style.backgroundColor = "red";
  recordButton.style.transform = "scale(0.93)";
  playButton.style.backgroundColor = "#777";
  playButton.style.transform = "scale(1)";
  //PAD:
  clearInterval(interval1); //Activa la función para escribir el el PAD.
  if (!writing) {
    writing = true;
    interval2 = setInterval(PadContentRecording, 800);
  }
});

//Lo mismo hacemos con los otros dos botones:
playButton.addEventListener("click", () => {
  stopPlaying = false; //Para activar la función reproductora.
  isPlaying = true; //Para activar el botón play.
  clearInterval(interval3); //Finaliza el intervalo de tiempo entre sonidos.
  index = 0; //Reinicia el índice.
  playRecordedSounds(); //Activa la función.
  playButton.blur(); //Saca el foco sobre el botón.
  //STYLES:
  playButton.style.backgroundColor = "green";
  playButton.style.transform = "scale(0.93)";
  recordButton.style.backgroundColor = "#777";
  recordButton.style.transform = "scale(1)";
  //PAD:
  clearInterval(interval2); //Para activar el mensaje en el PAD.
  if (!writing) {
    writing = true;
    interval1 = setInterval(PadContentPlaying, 800);
  }
});

stopButton.addEventListener("click", () => {
  console.log(soundsArray);
  isRecording = false; //Detiene la grabación de sonidos.
  isPlaying = false; //Desactiva el botón play.
  writing = false; //Desactiva los mensajes del PAD.
  stopPlaying = true; //Termina la función de reproducción.
  stopButton.blur(); //Saca el foto en el botón stop.
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
  clearInterval(interval1); //Termina todos los intervalos.
  clearInterval(interval2);
  pad.textContent = "";
});

//FUNCTIONS:

//Esta es la función que guarda los sonidos en el array correspondiente al hacer click cuando "isRecording" es "true", al igual que la anterior, comparando los id de los botones con la clase de los audios.

let lastClickTime = 0; //Para la parte de grabación. Almacena la cantidad de milisegundos del último click.
let finalTime; //Aquí, la diferencia entre clicks

function saveSound(id) {
  for (let audio of audios) {
    //Recorremos los audios.
    if (id === audio.className) {
      //Comparamos id y class.
      let initialTime = new Date().getTime(); //Milisegundos al momento de hacer click.
      finalTime = initialTime - lastClickTime; //Diferencia entre el click actual y el último.
      //NOTA: para el primer objeto enviado no importa el resultado de la resta (que será de initialTime - 0), porque la función que reproducirá los sonidos partirá del valor del segundo objeto (ver función).
      soundsArray.push({ audio: audio.src, time: finalTime });
      lastClickTime = initialTime; //Aquí actualizamos el valor del último click para restar al siguiente objeto.
    }
  }
}

//Esta es la función encargada de reproducir los sonidos almacenados (Grabados).
function playRecordedSounds() {
  if (stopPlaying) {
    //La función entera se detiene si pulsas el botón Stop (stopPlaying), se cierra el intervalo y se restablece el valor del último click.
    clearInterval(interval3);
    lastClickTime = 0;
    return;
  }
  if (index < soundsArray.length) {
    let track = new Audio(soundsArray[index].audio);
    track.play(); //Reproduce solo el audio del array con el índice indicado en la variable "delay".
    index++;
  } else {
    clearTimeout(interval3);
    lastClickTime = 0; //Cuando la reproducción termina, este contador se reinicia a "0".
  }
  if (index < soundsArray.length) {
    interval3 = setTimeout(playRecordedSounds, soundsArray[index].time);
  }
}

//Estas son las funciones que escriben en el PAD el mensaje de grabando y reproduciendo:
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
