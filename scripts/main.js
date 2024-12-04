console.log("Bienvenidos a mi agenda de turnos")

/* Agenda de turnos - ingresar nombre y apellido */
let nombreApellido = "";
while (nombreApellido.trim() === "") {
    nombreApellido = prompt("Ingrese su nombre y apellido para agendar un turno");
    if (nombreApellido.trim() === "") {
        alert("No ingresaste tu nombre. Por favor, ingrésalo para continuar.");
    }
}
alert("Hola " + nombreApellido + " bienvenido!");

// Arreglo para almacenar los turnos
let agenda = [];
let index = 0;  // Variable para controlar la posición en el arreglo

// Función para agregar un turno
function agregarTurno() {
    const turno = prompt("Ingresa el día y hora del turno (ejemplo: 'Lunes 15:00')");
    if (turno && turno.trim() !== "") {
        agenda[index] = turno; // Agregar el turno en la posición actual del índice
        alert("Turno agendado exitosamente: " + turno);
        index++; // Incrementamos el índice para la siguiente posición
    } else {
        alert("No se ingresó un turno válido.");
    }
}

// Menú principal para interactuar con la agenda
function menuAgenda() {
    let opcion = prompt("¿Qué deseas hacer?\n1. Agregar turno\n2. Salir");
    
    if (opcion === "1") {
        agregarTurno(); // Si elige "1", agregar un turno
        menuAgenda(); // Volver al menú principal después de agendar
    } else if (opcion === "2") {
        alert("¡Hasta luego!"); // Si elige "2", salimos
    } else {
        alert("Opción no válida, por favor elige una opción correcta.");
        menuAgenda(); // Llamamos de nuevo al menú si la opción no es válida
    }
}

// Iniciamos el menú de la agenda
menuAgenda();