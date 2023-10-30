"use strict";

//MODULO GRABACION Y REPRODUCCION

//Selectors:

const buttons=document.querySelectorAll("#buttonsContainer>button")
const audios = document.querySelectorAll("#audiosContainer > audio");

//Record
const recordButton=document.getElementById("record")//Enlace boton de grabacion OJO ENLACE EN CSS
const stopRecord=document.getElementById("stopRecord")//Enlace boton de stop grabacion OJO ENLACE EN CSS

let isRecord=false;
let ritmoRecord=[]
  

buttons.forEach((button)=>{
  button.addEventListener("click",()=>{
    if (isRecord==true) {
      ritmoRecord.push(button.value)//) ['bombo', 'plato']
    //ritmoRecord.push(button)// ['bombo', button#bombo.buttons, 'plato', button#plato.buttons]
      console.log(ritmoRecord);
      console.log(isRecord);
    }
        
  }) 
})
  
    
recordButton.addEventListener("click",()=>{
  isRecord =true;
  recordButton.setAttribute("disabled",false);
  console.log("Estamos grabando");
  
});
    
stopRecord.addEventListener("click",()=>{
  isRecord = false;
  recordButton.removeAttribute("disabled");
  console.log("paro la grabacion");
  
});