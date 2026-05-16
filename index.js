//Creamos otro archivo .js donde exportamos la variable. API_KEY porque no me fucnionan
//las librerias para usar .env
import { API_KEY } from "./api.js";
const tiempo = document.querySelector(".tiempo");
const ciudadInput = document.querySelector(".inputCiudad");
const cuadro = document.querySelector(".cuadro");

tiempo.addEventListener("submit", async event => {
    event.preventDefault();

    const ciudad = ciudadInput.value;

    if(ciudad){
        try{
            const datoTiempo = await getTiempoInfo(ciudad);
            displayInfo(datoTiempo);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Introduzca una ciudad");
    }
});

async function getTiempoInfo(ciudad){
    //url para coger los datos de la ciudad con nuestra llave
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;
 
    const respuesta = await fetch(apiUrl);
    
    if(!respuesta.ok){
        throw new Error("No se ha podido encontrar los datos");
    }
    //Retornar la respuesta en formato json
    return await respuesta.json();
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