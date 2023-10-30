"use strict";

// todos los elementos con la clase "drum-pad"
const drumPads = document.querySelectorAll(".drum-pad");

// clic a cada botón y se ilumina en rojo
drumPads.forEach((pad) => {
  pad.addEventListener("click", () => {
    pad.style.backgroundColor = "red";

    // vuelveal colororiginal despues de pulsar pasado un intervalo de tiempo cortito
    setTimeout(() => {
      pad.style.backgroundColor = "";
    }, 300);
  });
});

// me parecía que tenía un poco de latencia y ajusté
document.addEventListener("DOMContentLoaded", function () {
  const drumButtons = document.querySelectorAll(".drum-pad");

  drumButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const soundFile = button.getAttribute("data-sound");
      const audio = new Audio(`audio/${soundFile}`);

      // Reproducir el sonido inmediatamente al hacer clic en el botón
      audio.play();

      // Agregar una clase CSS para la animación
      button.classList.add("active");

      // Eliminar la clase CSS después de un corto intervalo
      setTimeout(function () {
        button.classList.remove("active");
      }, 100); // Puedes ajustar la duración de la animación aquí
    });
  });
});

// mapear teclas

document.addEventListener("DOMContentLoaded", function () {
  const drumButtons = document.querySelectorAll(".drum-pad");

  drumButtons.forEach(function (button) {
    button.addEventListener("click", playSound);
  });

  // Agrega un evento para detectar las teclas del teclado numérico derecho (cuadrícula de 3x3)
  document.addEventListener("keydown", function (event) {
    // Mapea las teclas del teclado numérico a los botones de drum pad
    const keyMappings = {
      97: 0, // Tecla 1 (crash)
      98: 1, // Tecla 2 (hat-close)
      99: 2, // Tecla 3 (hat-open)
      100: 3, // Tecla 4 (kick)
      101: 4, // Tecla 5 (ride)
      102: 5, // Tecla 6 (snare)
      103: 6, // Tecla 7 (tom-high)
      104: 7, // Tecla 8 (tom-low)
      105: 8, // Tecla 9 (tom-mid)
    };

    const buttonIndex = keyMappings[event.keyCode];

    if (buttonIndex !== undefined) {
      const button = drumButtons[buttonIndex];
      playSound(button);
    }
  });

  function playSound(button) {
    const soundFile = button.getAttribute("data-sound");
    const audio = new Audio(`audio/${soundFile}`);
    audio.play();
  }
});

// controlador de volumen
const volumeSlider = document.getElementById("volume-slider");
const audioElements = document.querySelectorAll(".drum-pad audio");

// // Agregar un evento al control deslizante
// volumeSlider.addEventListener("input", function () {
//   const volume = volumeSlider.value;

// Ajustar el volumen de todos los elementos de audio
// audioElements.forEach(function (audio) {
//   audio.volume = volume;
// });
// });
