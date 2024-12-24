console.log("Bienvenidos a mi agenda de turnos");

// Pedir el nombre del usuario
let nombreApellido = prompt("Ingrese su nombre y apellido:");
alert("Hola " + nombreApellido + " bienvenido!");

// Arreglo para almacenar los turnos
let agenda = [];

// Variable para controlar el ciclo
let seguir = true;

while (seguir) {
    let opcion = prompt("¿Qué deseas hacer?\n1. Agregar turno\n2. Ver turnos agendados\n3. Cancelar turno\n4. Salir");

    if (opcion === "1") {
        // Agregar un turno
        let turno = prompt("Ingresa el día y hora del turno (ejemplo: 'Lunes 15:00')");
        if (turno) {
            agenda.push({ nombre: nombreApellido, turno: turno, estado: "Agendado" });
            alert("Turno agendado exitosamente: " + turno);
        } else {
            alert("No ingresaste un turno válido.");
        }
    } else if (opcion === "2") {
        // Mostrar todos los turnos
        if (agenda.length === 0) {
            alert("No hay turnos agendados.");
        } else {
            let mensaje = "Turnos agendados:\n";
            for (let i = 0; i < agenda.length; i++) {
                mensaje += (i + 1) + ". " + agenda[i].turno + " - Estado: " + agenda[i].estado + "\n";
            }
            alert(mensaje);
        }
    } else if (opcion === "3") {
        // Cancelar un turno
        let turnoId = prompt("Ingresa el número del turno que deseas cancelar:\n(Escribe el número de turno como se muestra en la lista)");

        // Convertir el número ingresado a un índice válido
        turnoId = parseInt(turnoId) - 1;  // Restamos 1 para que el índice coincida con la lista

        // Verificamos si el turnoId es válido (está dentro del rango de turnos)
        if (turnoId >= 0 && turnoId < agenda.length) {
            agenda[turnoId].estado = "Cancelado";
            alert("El turno " + agenda[turnoId].turno + " ha sido cancelado.");
        } else {
            alert("Turno no encontrado. Por favor ingresa un número de turno válido.");
        }
    } else if (opcion === "4") {
        // Salir
        alert("¡Hasta luego!");
        seguir = false;  // Cambiamos la variable a false para salir del ciclo
    } else {
        alert("Opción no válida.");
    }
}
