let saldoActual = 1000;

// Creo un array vacío:
const historial = [];

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

// Función para actualizar un array genérico:
function cargarArray(arr, valor) {
    arr.push(valor);
}
// fin de la función para actualizar el historial

// Función Plazo Fijo:
function plazoFijo(capital, plazo) {
    let tasaPlazoFijo = 75.1;
      
    let interesesGanados = (tasaPlazoFijo / 100 / 365 * plazo) * capital;
    let capitalTotal = capital + interesesGanados;
    saldoActual += interesesGanados;  
    const nuevaInversion = new Inversion("Plazo Fijo", interesesGanados.toFixed(2), plazo, tasaPlazoFijo, new Date().toLocaleString(), capitalTotal.toFixed(2));
    const nuevaInversionJSON = JSON.stringify(nuevaInversion);

    contador = contador + 1;
    localStorage.setItem("contador", contador);
    localStorage.setItem(contador, nuevaInversionJSON);
    
    cargarArray(historial, nuevaInversion); 

    const contenedorResultados = document.getElementById("contenedorResultados");
    contenedorResultados.innerHTML = "";
    let div = document.createElement("div");
    div.innerHTML = `
                    <p class="text-dark fs-4">Tipo de inversión:</p>
                    <p class="text-dark fs-4 fw-bold ">Plazo fijo</p>
                    <p class="text-dark fs-4">Capital invertido: </p>
                    <p class="text-dark fs-4 fw-bold ">$ ${capital} </p> 
                    <p class="text-dark fs-4">Capital final: </p>
                    <p class="text-dark fs-4 fw-bold ">$ ${historial[historial.length - 1].capitalFinal} </p>  
                    <p class="text-dark fs-4">Intereses ganados: </p>
                    <p class="text-dark fs-4 fw-bold ">$ ${historial[historial.length - 1].interesGanado} </p>  
                    <p class="text-dark fs-4">Plazo: </p>
                    <p class="text-dark fs-4 fw-bold "> ${historial[historial.length - 1].plazo} día(s)</p>  
                    <p class="text-dark fs-4">Tasa Nominal Anual: </p>
                    <p class="text-dark fs-4 fw-bold "> ${historial[historial.length - 1].tna}%</p> 
                    `;
    contenedorResultados.appendChild(div);

    const saldo = document.getElementById("saldo");
    saldo.innerText = `$${saldoActual.toFixed(2)} `;
}
// fin de la función Plazo Fijo

// Función Mercadopago:
function mercadopago(capital, plazo) {
    let tasaMercadopago = 58.2;
      
    let interesesGanados = (tasaMercadopago / 100 / 365 * plazo) * capital;
    let capitalTotal = capital + interesesGanados;
    saldoActual += interesesGanados;  

    const nuevaInversion = new Inversion("Mercadopago", interesesGanados.toFixed(2), plazo, tasaMercadopago, new Date().toLocaleString(), capitalTotal.toFixed(2));
    const nuevaInversionJSON = JSON.stringify(nuevaInversion);
    
    contador = contador + 1;
    localStorage.setItem("contador", contador);
    localStorage.setItem(contador, nuevaInversionJSON);

    cargarArray(historial, nuevaInversion);

    const contenedorResultados = document.getElementById("contenedorResultados");
    contenedorResultados.innerHTML = "";
    let div = document.createElement("div");
    div.innerHTML = `
                    <p class="text-dark fs-4">Tipo de inversión:</p>
                    <p class="text-dark fs-4 fw-bold ">Mercadopago</p>
                    <p class="text-dark fs-4">Capital invertido: </p>
                    <p class="text-dark fs-4 fw-bold ">$ ${capital} </p> 
                    <p class="text-dark fs-4">Capital final: </p>
                    <p class="text-dark fs-4 fw-bold ">$ ${historial[historial.length - 1].capitalFinal} </p>  
                    <p class="text-dark fs-4">Intereses ganados: </p>
                    <p class="text-dark fs-4 fw-bold ">$ ${historial[historial.length - 1].interesGanado} </p>  
                    <p class="text-dark fs-4">Plazo: </p>
                    <p class="text-dark fs-4 fw-bold "> ${historial[historial.length - 1].plazo} día(s)</p>  
                    <p class="text-dark fs-4">Tasa Nominal Anual: </p>
                    <p class="text-dark fs-4 fw-bold "> ${historial[historial.length - 1].tna}%</p> 
                    `;
    contenedorResultados.appendChild(div);

    const saldo = document.getElementById("saldo");
    saldo.innerText = `$${saldoActual.toFixed(2)} `;
}
// fin de la función Mercadopago

// Función Caución:
function caucion(capital, plazo) {
    let tasaCaucion = 50.5;
      
    let interesesGanados = (tasaCaucion / 100 / 365 * plazo) * capital;
    let capitalTotal = capital + interesesGanados;
    saldoActual += interesesGanados;  

    const nuevaInversion = new Inversion("Mercadopago", interesesGanados.toFixed(2), plazo, tasaCaucion, new Date().toLocaleString(), capitalTotal.toFixed(2));
    const nuevaInversionJSON = JSON.stringify(nuevaInversion);

    contador = contador + 1;
    localStorage.setItem("contador", contador);
    localStorage.setItem(contador, nuevaInversionJSON);

    cargarArray(historial, nuevaInversion);

    const contenedorResultados = document.getElementById("contenedorResultados");
    contenedorResultados.innerHTML = "";
    let div = document.createElement("div");
    div.innerHTML = `
                    <p class="text-dark fs-4">Tipo de inversión:</p>
                    <p class="text-dark fs-4 fw-bold ">Caución</p>
                    <p class="text-dark fs-4">Capital invertido: </p>
                    <p class="text-dark fs-4 fw-bold ">$ ${capital} </p> 
                    <p class="text-dark fs-4">Capital final: </p>
                    <p class="text-dark fs-4 fw-bold ">$ ${historial[historial.length - 1].capitalFinal} </p>  
                    <p class="text-dark fs-4">Intereses ganados: </p>
                    <p class="text-dark fs-4 fw-bold ">$ ${historial[historial.length - 1].interesGanado} </p>  
                    <p class="text-dark fs-4">Plazo: </p>
                    <p class="text-dark fs-4 fw-bold "> ${historial[historial.length - 1].plazo} día(s)</p>  
                    <p class="text-dark fs-4">Tasa Nominal Anual: </p>
                    <p class="text-dark fs-4 fw-bold "> ${historial[historial.length - 1].tna}%</p> 
                    `;
    contenedorResultados.appendChild(div);

    const saldo = document.getElementById("saldo");
    saldo.innerText = `$${saldoActual.toFixed(2)} `;
}
// fin de la función Caución

// Utilizo un contador con persistencia para generar ID's, uso esos ID's para generar la Clave de los objetos guardados en el Storage
let contador = 0;
let contadorEnLS = JSON.parse(localStorage.getItem("contador"));
if (contadorEnLS) {
    contador = contadorEnLS;
} else {
    localStorage.setItem("contador", contador);
}

const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const msjError = document.getElementById("msjError");
    msjError.innerHTML = "";

    const montoAInvertir = parseFloat(document.getElementById("montoAInvertir").value);
    const tipoInversion = parseInt(document.getElementById("tipoInversion").value);
    const plazoDeInversion = parseInt(document.getElementById("plazoDeInversion").value);

    formulario.reset();

    switch (tipoInversion) {
        case 1:
            plazoFijo(montoAInvertir, plazoDeInversion);
            break;
        case 2:
            mercadopago(montoAInvertir, plazoDeInversion);
            break;
        case 3:
            caucion(montoAInvertir, plazoDeInversion);
            break;
        default:
            const parrafo = document.createElement("p");
            parrafo.innerText = "La opción elegida no es válida. Vuelva a intentar.";
            parrafo.className = "text-danger fs-5 mt-4";
            msjError.appendChild(parrafo);
        break;
    }
   
})