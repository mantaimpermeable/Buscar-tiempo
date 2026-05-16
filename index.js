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
    //Sacamos valores de las constante de "datos" que es un json con toda la informacion
    //scada de la api, para esto usamos la deestructuracion 
    const {name: ciudad, 
           main: {temp, humidity},
           weather: [{descripcion,id}]} = datos;

           console.log(datos);

    //Hacemos que el cuadro sea visible y luego vamos añadiendo
    cuadro.textContent="";
    cuadro.style.display="flex";

    const ciudadDisplay = document.createElement("h1");    
    const temperaturaDisplay = document.createElement("p"); 
    const humedadDisplay = document.createElement("p");     
    const descripcionDisplay = document.createElement("p");    
    const simboloDisplay = document.createElement("p");    

    ciudadDisplay.textContent= ciudad;
    temperaturaDisplay.textContent = `${(temp - 273.15).toFixed(1)}ºC`;
    humedadDisplay.textContent = `Humedad: ${humidity}%`;
    descripcionDisplay.textContent = descripcion;
    simboloDisplay.textContent = getSimboloTiempo(id);

    ciudadDisplay.classList.add("ciudad");
    temperaturaDisplay.classList.add("temperatura");
    humedadDisplay.classList.add("humedad");
    descripcionDisplay.classList.add("descripcion");
    simboloDisplay.classList.add("simboloTiempo");


    cuadro.appendChild(ciudadDisplay);
    cuadro.appendChild(temperaturaDisplay);
    cuadro.appendChild(humedadDisplay);
    cuadro.appendChild(descripcionDisplay);
    cuadro.appendChild(simboloDisplay);


    }

function getSimboloTiempo(IdTiempo){
    switch(true){
        case(IdTiempo >= 200 && IdTiempo < 300):
        return "⛈️";
        case(IdTiempo >= 300 && IdTiempo < 400):
        return "🌧️";
        case(IdTiempo >= 500 && IdTiempo < 600):
        return "🌧️";
        case(IdTiempo >= 600 && IdTiempo < 700):
        return "❄️";
        case(IdTiempo >= 700 && IdTiempo < 800):
        return "😶‍🌫️";
        case(IdTiempo === 800):
        return "☀️";
        case(IdTiempo >= 801 && IdTiempo < 810):
        return "☁️";
        default:
            return "⁉️";
        
    }
}
function displayError(mensaje){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = mensaje;
    errorDisplay.classList.add("error");

    cuadro.textContent="";
    cuadro.style.display = "flex";
    cuadro.appendChild(errorDisplay);

}