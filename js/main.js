let usuario = "admin";
let contrasenia = "admin123";
let saldo = 100000;
let tasaPlazoFijo = 75.0;
let tasaMercadopago = 54.0;
let tasaCaucion = 50.0;

// Función para iniciar sesión:
function login() {
    let ingresar = false;
    let bloqueo = false;
    do {
        let usuarioIngresado = prompt("Ingresá tu usuario:", "admin");
        if (usuarioIngresado != usuario) {
            alert("El usuario no existe.");
            ingresar = false;
        } else {
            for (let i = 2; i >= 0; i--) {
                let contraseniaIngresada = prompt("Ingresá tu contraseña:", "admin123");
                if (contraseniaIngresada == contrasenia) {
                    alert("¡Bienvenido/a!");
                    ingresar = true;
                    break;
                } else {
                    switch (i) {
                        case 0:
                            alert("Contraseña incorrecta. Usuario bloqueado.");
                            bloqueo = true;
                            break;
                        case 1:
                            alert("Contraseña incorrecta. Te queda " + i + " intento.");
                            break;
                        case 2:
                            alert("Contraseña incorrecta. Te quedan " + i + " intentos.");
                        default:
                            break;
                    }         
                }                
            }
        }
    } while (ingresar != true && bloqueo != true);

    return ingresar;
}
// fin de la función para iniciar sesión

// Función menú
function menu(capital, tasa1, tasa2, tasa3) {
    let opcion = prompt("Elegí el tipo de inversión:\n\n1- Plazo Fijo. \n2- FCI Mercadopago. \n3- Caución. \nPresioná X para salir.");
    while (opcion != "X" && opcion != "x") {
        switch (opcion) {
            case "1":
                plazoFijo(capital, tasa1);
                break;
            case "2":
                mercadopago(capital, tasa2);
                break;
            case "3":
                caucion(capital, tasa3);
                break;
            default:
                alert("La opción elegida no es válida.");
                break;
        }
        opcion = prompt("Elegí el tipo de inversión:\n\n1- Plazo Fijo. \n2- FCI Mercadopago. \n3- Caución. \nPresioná X para salir.");
    }
}
// fin de la función menú

// Función Plazo Fijo:
function plazoFijo(capital, tasa) {
    let aux = false;
    do {
        let plazo = parseInt(prompt("PLAZO FIJO \n\nIngresá el plazo en días (mínimo 30 días - máximo 365 días):"));
        if (plazo >= 30 && plazo <= 365) {
            let interesesGanados = (tasa / 100 / 365 * plazo) * capital;
            capital += interesesGanados;
            alert("INVERSIÓN EN PLAZO FIJO \n\nCapital final: $" + capital.toFixed(2) + "\nIntereses ganados: $" + interesesGanados.toFixed(2) + "\nPlazo: " + plazo + " día(s)\nTasa Nominal Anual: " + tasa + "%");
            aux = true;
        } else {
            alert("El plazo no es válido.");
        }
    } while (!aux);   
}
// fin de la función Plazo Fijo

// Función Mercadopago:
function mercadopago(capital, tasa) {
    let aux = false;
    do {
        let plazo = parseInt(prompt("MERCADOPAGO \n\nIngresá el plazo en días (mínimo 5 días - máximo 365 días):"));
        if (plazo >= 5 && plazo <= 365) {
            let interesesGanados = (tasa / 100 / 365 * plazo) * capital;
            capital += interesesGanados;
            alert("INVERSIÓN EN MERCADOPAGO \n\nCapital final: $" + capital.toFixed(2) + "\nIntereses ganados: $" + interesesGanados.toFixed(2) + "\nPlazo: " + plazo + " día(s)\nTasa Nominal Anual: " + tasa + "%");
            aux = true;
        } else {
            alert("El plazo no es válido.");
        }
    } while (!aux);   
}

let ingreso = login();
if (ingreso) {
    let capitalAInvertir = parseInt(prompt("Tu saldo actual es de $" + saldo + " \n\nIngresá el capital a invertir (mínimo $1.000.-):"));
    if (capitalAInvertir > saldo || capitalAInvertir < 1000) {
        alert("Saldo insuficiente.");
    } else {
        menu(capitalAInvertir, tasaPlazoFijo, tasaMercadopago, tasaCaucion);
    }

} else {
    alert("Para desbloquear su cuenta por favor contacte al soporte.");
}