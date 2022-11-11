// ---------- VARIABLES GLOBALES ---------- //
let saldoActual = 10000;
let contador = 0;
const historial = [];
const url = "../data/datos.json";

// ---------- LIBRERÍA LUXON ---------- //
const DateTime = luxon.DateTime;
const dt = DateTime.now();

// ---------- FETCH, CONSTRUCTOR, FUNCIONES ---------- //
// Función asincrónica que trae los datos del archivo JSON local:
const fetchAPILocal = async (url) => {
    const response = await fetch(url);
    const datos = await response.json();
    datosFormulario(datos);
};

// Función que toma los datos del formulario para hacer la simulación correspondiente:
function datosFormulario(datos) {
    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const montoAInvertir = parseFloat(document.getElementById("montoAInvertir").value);
        const tipoInversion = parseInt(document.getElementById("tipoInversion").value);
        const plazoDeInversion = parseInt(document.getElementById("plazoDeInversion").value);
        const contenedorResultados = document.getElementById("contenedorResultados");

        if (montoAInvertir < 1000 || montoAInvertir > saldoActual.toFixed(2)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `El monto a invertir no debe ser menor a $1000 ni mayor al saldo actual ($${saldoActual.toFixed(2)})`,    
            })
            contenedorResultados.innerHTML = "";
        } else if (plazoDeInversion === 0 || plazoDeInversion > 365) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ingrese un plazo mayor a 1 día y menor a 365 días.',    
            })
            contenedorResultados.innerHTML = "";
        } else {
            switch (tipoInversion) {
                case 1:
                    plazoFijo(montoAInvertir, plazoDeInversion, datos);
                    break;
                case 2:
                    mercadopago(montoAInvertir, plazoDeInversion, datos);
                    break;
                case 3:
                    caucion(montoAInvertir, plazoDeInversion, datos);
                    break;
                default:
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'La opción de inversión elegida no es válida. Vuelva a intentar.',    
                    })
                    contenedorResultados.innerHTML = "";
                    break;
            }
        }
        formulario.reset();
    })
}
// fin de la función que toma los datos del formulario

// Creo la clase constructora de objetos que luego se guardarán en el historial:
class Inversion {
    constructor(tipoInversion, interesGanado, plazo, tna, fecha, capitalFinal) {
        this.tipoInversion = tipoInversion;
        this.interesGanado = parseFloat(interesGanado);
        this.plazo = parseInt(plazo);
        this.tna = parseFloat(tna);
        this.fecha = fecha;
        this.capitalFinal = parseFloat(capitalFinal);
    }
}
// fin de la clase constructora

// Función que trae el saldo guardado en el Storage. Si no existe la clave entonces la crea y la pinta el saldo en el HTML:
function saldoEnStorage() {
    let saldoEnStorage = JSON.parse(localStorage.getItem("saldo"));
    saldoEnStorage ? saldoActual = saldoEnStorage : localStorage.setItem("saldo", saldoActual);

    const saldo = document.getElementById("saldo");
    saldo.innerText = `$${saldoActual.toFixed(2)} `;
}
// fin de la función

// Función que genera ID's con un contador que se guarda en Local Storage, se utilizan para generar las claves de los objetos que se almacenan en el storage a medida que se simulan inversiones:
function IdEnStorage() {
    let contadorEnLS = JSON.parse(localStorage.getItem("contador"));
    contadorEnLS ? contador = contadorEnLS : localStorage.setItem("contador", contador);
}
// fin de la función

// Función para actualizar el historial:
function cargarArray(arr, valor) {
    arr.push(valor);
}
// fin de la función para actualizar el historial

// Función Plazo Fijo:
function plazoFijo(capital, plazo, arr) {
    const tasaPlazoFijo = arr.find(el => el.nombre === "plazo fijo").tna;
    
    let interesesGanados = (tasaPlazoFijo / 100 / 365 * plazo) * capital;
    let capitalTotal = capital + interesesGanados;
    saldoActual += interesesGanados;
    const nuevaInversion = new Inversion("Plazo Fijo", interesesGanados.toFixed(2), plazo, tasaPlazoFijo, dt.toLocaleString(DateTime.DATETIME_SHORT), capitalTotal.toFixed(2));
    const nuevaInversionJSON = JSON.stringify(nuevaInversion);

    contador++;
    localStorage.setItem("contador", contador);
    localStorage.setItem(contador, nuevaInversionJSON);

    cargarArray(historial, nuevaInversion);

    const contenedorResultados = document.getElementById("contenedorResultados");
    contenedorResultados.innerHTML = "";
    let div = document.createElement("div");
    div.innerHTML = `
                    <p class="text-dark fs-6">Tipo de inversión:</p>
                    <p class="text-success fs-6 font-monospace">Plazo fijo</p>
                    <p class="text-dark fs-6">Capital invertido: </p>
                    <p class="text-success fs-6 font-monospace">$ ${capital} </p> 
                    <p class="text-dark fs-6">Capital final: </p>
                    <p class="text-success fs-6 font-monospace">$ ${historial[historial.length - 1].capitalFinal} </p>  
                    <p class="text-dark fs-6">Intereses ganados: </p>
                    <p class="text-success fs-6 font-monospace">$ ${historial[historial.length - 1].interesGanado} </p>  
                    <p class="text-dark fs-6">Plazo: </p>
                    <p class="text-success fs-6 font-monospace"> ${historial[historial.length - 1].plazo} día(s)</p>  
                    <p class="text-dark fs-6">Tasa Nominal Anual: </p>
                    <p class="text-success fs-6 font-monospace"> ${historial[historial.length - 1].tna}%</p> 
                    `;
    contenedorResultados.appendChild(div);

    const saldo = document.getElementById("saldo");
    saldo.innerText = `$${saldoActual.toFixed(2)} `;
    localStorage.setItem("saldo", saldoActual.toFixed(2));
}
// fin de la función Plazo Fijo

// Función Mercadopago:
function mercadopago(capital, plazo, arr) {
    const tasaMercadopago = arr.find(el => el.nombre === "mercadopago").tna;

    let interesesGanados = (tasaMercadopago / 100 / 365 * plazo) * capital;
    let capitalTotal = capital + interesesGanados;
    saldoActual += interesesGanados;

    const nuevaInversion = new Inversion("Mercadopago", interesesGanados.toFixed(2), plazo, tasaMercadopago, dt.toLocaleString(DateTime.DATETIME_SHORT), capitalTotal.toFixed(2));
    const nuevaInversionJSON = JSON.stringify(nuevaInversion);

    contador++;
    localStorage.setItem("contador", contador);
    localStorage.setItem(contador, nuevaInversionJSON);

    cargarArray(historial, nuevaInversion);

    const contenedorResultados = document.getElementById("contenedorResultados");
    contenedorResultados.innerHTML = "";
    let div = document.createElement("div");
    div.innerHTML = `
                    <p class="text-dark fs-6">Tipo de inversión:</p>
                    <p class="text-success fs-6 font-monospace">Mercadopago</p>
                    <p class="text-dark fs-6">Capital invertido: </p>
                    <p class="text-success fs-6 font-monospace">$ ${capital} </p> 
                    <p class="text-dark fs-6">Capital final: </p>
                    <p class="text-success fs-6 font-monospace">$ ${historial[historial.length - 1].capitalFinal} </p>  
                    <p class="text-dark fs-6">Intereses ganados: </p>
                    <p class="text-success fs-6 font-monospace">$ ${historial[historial.length - 1].interesGanado} </p>  
                    <p class="text-dark fs-6">Plazo: </p>
                    <p class="text-success fs-6 font-monospace"> ${historial[historial.length - 1].plazo} día(s)</p>  
                    <p class="text-dark fs-6">Tasa Nominal Anual: </p>
                    <p class="text-success fs-6 font-monospace"> ${historial[historial.length - 1].tna}%</p> 
                    `;
    contenedorResultados.appendChild(div);

    const saldo = document.getElementById("saldo");
    saldo.innerText = `$${saldoActual.toFixed(2)} `;
    localStorage.setItem("saldo", saldoActual.toFixed(2));
}
// fin de la función Mercadopago

// Función Caución:
function caucion(capital, plazo, arr) {
    const tasaCaucion = arr.find(el => el.nombre === "caución").tna;

    let interesesGanados = (tasaCaucion / 100 / 365 * plazo) * capital;
    let capitalTotal = capital + interesesGanados;
    saldoActual += interesesGanados;

    const nuevaInversion = new Inversion("Caución", interesesGanados.toFixed(2), plazo, tasaCaucion, dt.toLocaleString(DateTime.DATETIME_SHORT), capitalTotal.toFixed(2));
    const nuevaInversionJSON = JSON.stringify(nuevaInversion);

    contador++;
    localStorage.setItem("contador", contador);
    localStorage.setItem(contador, nuevaInversionJSON);

    cargarArray(historial, nuevaInversion);

    const contenedorResultados = document.getElementById("contenedorResultados");
    contenedorResultados.innerHTML = "";
    let div = document.createElement("div");
    div.innerHTML = `
                    <p class="text-dark fs-6">Tipo de inversión:</p>
                    <p class="text-success fs-6 font-monospace">Caución</p>
                    <p class="text-dark fs-6">Capital invertido: </p>
                    <p class="text-success fs-6 font-monospace">$ ${capital} </p> 
                    <p class="text-dark fs-6">Capital final: </p>
                    <p class="text-success fs-6 font-monospace">$ ${historial[historial.length - 1].capitalFinal} </p>  
                    <p class="text-dark fs-6">Intereses ganados: </p>
                    <p class="text-success fs-6 font-monospace">$ ${historial[historial.length - 1].interesGanado} </p>  
                    <p class="text-dark fs-6">Plazo: </p>
                    <p class="text-success fs-6 font-monospace"> ${historial[historial.length - 1].plazo} día(s)</p>  
                    <p class="text-dark fs-6">Tasa Nominal Anual: </p>
                    <p class="text-success fs-6 font-monospace"> ${historial[historial.length - 1].tna}%</p> 
                    `;
    contenedorResultados.appendChild(div);

    const saldo = document.getElementById("saldo");
    saldo.innerText = `$${saldoActual.toFixed(2)} `;
    localStorage.setItem("saldo", saldoActual.toFixed(2));
}
// fin de la función Caución


// ---------- PROGRAMA PRINCIPAL ---------- //

saldoEnStorage();
IdEnStorage();
fetchAPILocal(url);

