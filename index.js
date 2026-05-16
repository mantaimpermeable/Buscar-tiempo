//Creamos otro archivo .js donde exportamos la variable. API_KEY porque no me fucnionan
//las librerias para usar .env
import { API_KEY } from "./api.js";

//usando querySelector seleccionamos las clases de los elemnetos html
const tiempo = document.querySelector(".tiempo");
const ciudadInput = document.querySelector(".inputCiudad");
const cuadro = document.querySelector(".cuadro");

//Toda la logica del programa se activa cuando se pulsa el boton de tiempo
tiempo.addEventListener("submit", async event => {
    //Esto es para prevenir el comportamiento por defecto
    event.preventDefault();

    //trabajamos con el valor que introduce el usuario dentro del input
    const ciudad = ciudadInput.value;

    //La condicion es que haya algun valor y si no lo hay mostramos un error
    if(ciudad){
        try{
            //creamos constante que es igual a la informacion del tiempo de la ciudad
            //que introduzca el usuario, abajo se explica la funcion
            const datoTiempo = await getTiempoInfo(ciudad);
            //usamos la informacion y el metodo para mostrarla
            displayInfo(datoTiempo);
        }
        catch(error){
            //Si se produce un error se muestra por consola y por pantalla con un formato
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Introduzca una ciudad");
    }
});

//funcion con async para poder llamarla con un await, necesario por si tarda en llegar 
//la informacion que no se haga ninguna tarea antes que esta, el metodo devolvera
//la informacion recogida de la API sobre el parametro ciudad que proporciona el usuario
async function getTiempoInfo(ciudad){
    //url para coger los datos de la ciudad con nuestra llave
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;

    //constante respuesta con el contenido recogido de la url hacia la ciudad que inserta
    //el usuario, se hace fetch a la url 
    const respuesta = await fetch(apiUrl);
    
    //Si la propiedad ok no es verdadera significa que el fetch no ha sido exitoso 
    //entonces lanzamos un error
    if(!respuesta.ok){
        throw new Error("No se ha podido encontrar los datos");
    }
    //Retornar la respuesta en formato json
    return await respuesta.json();
}

//funcion para mostrar la informacion que e¡hemos extraido de la api con el estilo que
//hemos hecho antes para cada clase en css, tiene un parametro datos que son los datos
//de la ciudad buscada
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

    //creamos elementos html con los que luego trabajamos para insertar la informacion 
    //que hemos obtenido y luego mostrarlos con el estilo de cada clase
    const ciudadDisplay = document.createElement("h1");    
    const temperaturaDisplay = document.createElement("p"); 
    const humedadDisplay = document.createElement("p");     
    const descripcionDisplay = document.createElement("p");    
    const simboloDisplay = document.createElement("p");    

    //hacemoa que cada elemento tengo la informacion que hemos obtenido de la API
    ciudadDisplay.textContent= ciudad;
    temperaturaDisplay.textContent = `${(temp - 273.15).toFixed(1)}ºC`;
    humedadDisplay.textContent = `Humedad: ${humidity}%`;
    descripcionDisplay.textContent = descripcion;
    simboloDisplay.textContent = getSimboloTiempo(id);

    //Le añadimos la correspondiente clase a cada uno para que tenga el estilo que queriamos
    ciudadDisplay.classList.add("ciudad");
    temperaturaDisplay.classList.add("temperatura");
    humedadDisplay.classList.add("humedad");
    descripcionDisplay.classList.add("descripcion");
    simboloDisplay.classList.add("simboloTiempo");

    //Tenemos que agregar los elementos al cuadro
    cuadro.appendChild(ciudadDisplay);
    cuadro.appendChild(temperaturaDisplay);
    cuadro.appendChild(humedadDisplay);
    cuadro.appendChild(descripcionDisplay);
    cuadro.appendChild(simboloDisplay);


    }

function getSimboloTiempo(IdTiempo){
    //Cada rango de id significa un tipo de clima 
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

//funcion para mostrar un error si se ocurre aunque tambien lo usamos como
//base para pedir que se introduzca una ciudad
function displayError(mensaje){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = mensaje;
    errorDisplay.classList.add("error");

    cuadro.textContent="";
    cuadro.style.display = "flex";
    cuadro.appendChild(errorDisplay);

}