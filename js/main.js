"use strict";

//SELECTORS:
const buttons = document.querySelectorAll("#buttonsContainer > button");
const audios = document.querySelectorAll("#audiosContainer > audio");
const sillaTerror = document.getElementById("sillaTerror"); //Botón rec
const efectoStop = document.getElementById("efectoStop"); //Botón stop
const caracuero = document.getElementById("icono"); //Caracuero
const ataud = document.getElementById("icono2"); //Ataud
const calavera = document.getElementById("icono3"); //Calavera

//EVENTS BY CLICK:
//Recorremos el array buttons y le añadimos un escuchador con un evento click. A cada click aplicaremos estilos a los botones, activaremos la función que reproduce los sonidos y, si se cumple la condición establecida, activaremos la función saveSound(), que guardará los sonidos para reproducirlos luego.

for (let btn of buttons) {
  btn.addEventListener("click", () => {
    //STYLES:
    btn.style.backgroundColor = "red";
    btn.style.transform = "scale(0.93)";
    setTimeout(() => {
      btn.style.backgroundColor = "";
      btn.style.transform = "scale(1)";
    }, 200);
    //Imagen Caracuero
    if (anchoVentana >= 1450) {
      caracuero.style.display = "block";
      setTimeout(() => {
        caracuero.style.display = "none";
      }, 200);
    }
    //PLAY FUNCTION:
    playSoundByClickAndKey(btn.id);
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
  // Obtiene el botón correspondiente a la tecla presionada
  const button = document.getElementById(keysArray[key]);

  //Activa la función reproductora.
  playSoundByClickAndKey(keysArray[key]);

  //Si se cumple la condición, activa la función grabadora.
  if (isRecording) {
    //Activa la función grabadora.
    saveSound(keysArray[key]);
  }

  //Se pongan los botones del pad en rojo también al pulsar el teclado.
  button.style.backgroundColor = "red";
  setTimeout(() => {
    button.style.backgroundColor = ""; // Restablece el color inicial
  }, 200);

  //Mostrar a Caracuero.
  if (anchoVentana >= 1450) {
    caracuero.style.display = "block";
    setTimeout(() => {
      caracuero.style.display = "none";
    }, 200);
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
//Esta es la función que reproduce los sonidos, tanto de los eventos "click" como de los "keys". Recorre el array "audios" y compara el id recibido con la clase de cada audio. Si todo está bien crea una nueva instancia del sonido, para poder reproducirlo fluidamente y no tener que esperar que se termine el anterior para reproducir el actual, y lo reproduce.
//El el caso de las keys, recibe el parámetro "key" que es el valor contrastado en el array "keysArray" y lo usa para compararlo con la clase de los audios.
function playSoundByClickAndKey(id) {
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
//------------------------------------------------------
//RECORD script:
//Parte de la grabación y posterior reprodución de sonidos grabados.

//Selections:
const recordButton = document.querySelector(".recordButton");
const stopButton = document.querySelector(".stopButton");
const playButton = document.querySelector(".playButton");
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
  sillaTerror.play(); //Eecto de sonido del botón.
  soundsArray = []; //Reinicia el array de sonidos guardados.
  isRecording = true; //Activa la grabación de clicks en el array.
  recordButton.blur(); //Saca el foco sobre el botón.
  //STYLES:
  recordButton.style.backgroundColor = "red"; //Al hacer click se pone rojo.
  recordButton.style.transition = "transform 1.3s";
  recordButton.style.transform = "scale(0.93)"; //Al hacer click se hace pequeño, creando el efecto de estar pulsado.
  playButton.style.backgroundColor = ""; //Aquí se reinician los estilos del botón play.
  playButton.style.transform = "scale(1)"; //Se reinicia la escala del botón play, de modo que al pulsar uno se reinicien los estilos del otro.
  //PAD:
  clearInterval(interval1); //Activa la función para escribir el el PAD.
  if (!writing) {
    writing = true;
    interval2 = setInterval(PadContentRecording, 800);
  }
  //Imágenes de terror:
  if (anchoVentana >= 1450) {
    calavera.style.display = "block"; //Icono de una calavera;
    ataud.style.display = "none"; //Borramos icono del ataud.
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
  recordButton.style.backgroundColor = "";
  recordButton.style.transform = "scale(1)";
  //PAD:
  clearInterval(interval2); //Para activar el mensaje en el PAD.
  if (!writing) {
    writing = true;
    interval1 = setInterval(PadContentPlaying, 800);
  }
  //Imágenes de terror:
  if (anchoVentana >= 1450) {
    ataud.style.display = "block"; //Icono de un ataud;
    calavera.style.display = "none"; //Borramos icono de la calavera.
  }
});

stopButton.addEventListener("click", () => {
  console.log(soundsArray);
  efectoStop.play();
  isRecording = false; //Detiene la grabación de sonidos.
  isPlaying = false; //Desactiva el botón play.
  writing = false; //Desactiva los mensajes del PAD.
  stopPlaying = true; //Termina la función de reproducción.
  stopButton.blur(); //Saca el foto en el botón stop.
  //STYLES:
  stopButton.style.transform = "scale(0.93)";
  recordButton.style.backgroundColor = "";
  recordButton.style.transform = "scale(1)";
  playButton.style.backgroundColor = "";
  playButton.style.transform = "scale(1)";
  setTimeout(() => {
    stopButton.style.transform = "scale(1)";
    stopButton.style.backgroundColor = "";
  }, 200);
  //PAD:
  clearInterval(interval1); //Termina todos los intervalos.
  clearInterval(interval2);
  pad.textContent = "";
  //Imágenes de terror:
  if (anchoVentana >= 1450) {
    ataud.style.display = "none"; //Borramos icono del ataud.
    calavera.style.display = "none"; //Borramos icono de la calavera.
  }
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
    pad.innerHTML = `
    <p style="font-style: italic;">Now, playing sounds from</p>
    <p style="color: red; font-weight: bold;">HELL</p>
  `;
    hideOrNot = false;
  } else if (!hideOrNot) {
    pad.textContent = "";
    hideOrNot = true;
  }
}
function PadContentRecording() {
  if (hideOrNot) {
    pad.innerHTML = `
    <p style="color: red; font-weight: bold;">¡DANGER!</p>
    <p style="font-style: italic;">Recording in progress...</p>
  `;
    hideOrNot = false;
  } else if (!hideOrNot) {
    pad.textContent = "";
    hideOrNot = true;
  }
}

//Escuchador para que las imágenes de terror solo se muestren en pantalla completa.
//Nota: Lo hacemos así porque jugamos con el "display:none" y "display: block" para hacerlas aparecer cuando pulsamos los botones.
let anchoVentana;
// Función para capturar el ancho de la ventana
function capturarAnchoVentana() {
  anchoVentana = window.innerWidth;
}
window.addEventListener("resize", capturarAnchoVentana);
capturarAnchoVentana();
