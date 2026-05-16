//Creamos otro archivo .js donde exportamos la variable. API_KEY porque no me fucnionan
//las librerias para usar .env
import { API_KEY } from "./api.js";
const tiempo = document.querySelector(".tiempo");
const ciudadInput = document.querySelector(".inputCiudad");
const cuadro = document.querySelector(".cuadro");

tiempo.addEventListener("submit", event => {
    event.preventDefault();

    const ciudad = ciudadInput.value;

    if(ciudad){

    }
    else{
        displayError("Introduzca una ciudad");
    }
});

async function getTiempoInfo(ciudad){

}
function displayInfo(datos){

}
function getSimboloTiempo(IdTiempo){

}
function displayError(mensaje){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = mensaje;
    errorDisplay.classList.add("error");

    cuadro.textContent="";
    cuadro.style.display = "flex";
    cuadro.appendChild(errorDisplay);

}