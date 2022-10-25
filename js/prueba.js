let saldo = 100000;
let tasaPlazoFijo = 75.1;
let tasaMercadopago = 54.2;
let tasaCaucion = 50.3;

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
    let aux = false;
    
    let interesesGanados = (tasaPlazoFijo / 100 / 365 * plazo) * capital;
    capital += interesesGanados;

    const nuevaInversion = new Inversion("Plazo Fijo", interesesGanados.toFixed(2), plazo, tasaPlazoFijo, new Date().toLocaleString(), capital.toFixed(2));

    cargarArray(historial, nuevaInversion);
    console.log(historial);
    
    const contenedorResultados = document.getElementById("contenedorResultados");
    let div = document.createElement("div");
    div.innerHTML = `
    
                    `

    /* while (!aux && plazo != null) {
        plazo = parseInt(plazo);
        if (plazo >= 30 && plazo <= 365) {
            let interesesGanados = (tasaPlazoFijo / 100 / 365 * plazo) * capital;
            capital += interesesGanados;
            alert("INVERSIÓN EN PLAZO FIJO \n\nCapital final: $" + capital.toFixed(2) + "\nIntereses ganados: $" + interesesGanados.toFixed(2) + "\nPlazo: " + plazo + " día(s)\nTasa Nominal Anual: " + tasaPlazoFijo + "%");

            const nuevaInversion = new Inversion("Plazo Fijo", interesesGanados.toFixed(2), plazo, tasaPlazoFijo, new Date().toLocaleString(), capital.toFixed(2));

            cargarArray(historial, nuevaInversion);
            console.log(historial);
            let interesTotal = calcularTotal(historial);
            alert("El interés total es: $" + interesTotal.toFixed(2));
            console.log("El interés total es: " + interesTotal.toFixed(2));
            aux = true;
        } else {
            alert("El plazo no es válido.");
            plazo = prompt("PLAZO FIJO \n\nIngresá el plazo en días (mínimo 30 días - máximo 365 días):");
        }
    } */
}
// fin de la función Plazo Fijo

const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const msjError = document.getElementById("msjError");
    
    msjError.innerHTML = "";

    const montoAInvertir = parseFloat(document.getElementById("montoAInvertir").value);
    const tipoInversion = parseInt(document.getElementById("tipoInversion").value);
    const plazoDeInversion = parseInt(document.getElementById("plazoDeInversion").value);

    formulario.reset();
    
    // console.log(montoAInvertir);
    // console.log(tipoInversion);
    // console.log(plazoDeInversion);

    switch (tipoInversion) {
        case 1:
            plazoFijo(montoAInvertir, plazoDeInversion);
            break;
        case 2:
            mercadopago(montoAInvertir, tasa2);
            break;
        case 3:
            caucion(montoAInvertir, tasa3);
            break;
        default:
            const parrafo = document.createElement("p");
            parrafo.innerText = "La opción elegida no es válida. Vuelva a intentar.";
            parrafo.className = "text-danger fs-5 mt-4";
            msjError.appendChild(parrafo);
        break;
    }
   
})