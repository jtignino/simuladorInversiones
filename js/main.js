let usuario = "admin";
let contrasenia = "admin123";

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
                let contraseniaIngresada = prompt("Ingresá tu contraseña.", "admin123");
                if (contraseniaIngresada == contrasenia) {
                    alert("¡Bienvenido/a!");
                    ingresar = true;
                    break;
                } else {
                    alert("Contraseña incorrecta. Tenés " + i + " intentos más.");   
                }
                if (i == 0) {
                    bloqueo = true;
                }
            }
        }
    } while (ingresar != true && bloqueo != true);

    return ingresar;
}

let ingreso = login();

if (ingreso) {
    alert("Salió todo bien.");
} else {
    alert("Usuario bloqueado. Contacte al soporte.");
}