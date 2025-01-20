console.log("Bienvenidos a mi agenda de turnos");

// Clase Turno para representar un turno
class Turno {
    constructor(nombre, turno, servicio, duracion) {
        this.nombre = nombre;         // Nombre del cliente
        this.turno = turno;           // Día y hora del turno
        this.servicio = servicio;     // Tipo de servicio
        this.duracion = duracion;     // Duración en minutos
        this.estado = "Agendado";     // Estado del turno (por defecto agendado)
    }

    // Método para obtener los detalles del turno
    obtenerDetalles() {
        return `${this.turno} - Servicio: ${this.servicio} - Duración: ${this.duracion} minutos - Estado: ${this.estado}`;
    }
}

// Clase Agenda para gestionar los turnos
class Agenda {
    constructor() {
        // Intentamos cargar los turnos guardados en LocalStorage, si existen
        const turnosGuardados = JSON.parse(localStorage.getItem('turnos'));
        this.turnos = turnosGuardados || [];  // Si no existen, iniciamos con un arreglo vacío
    }

    // Método para agregar un turno
    agregarTurno(turno) {
        this.turnos.push(turno);
        this.guardarTurnos();  // Guardamos los turnos en LocalStorage cada vez que agregamos uno
    }

    // Método para mostrar todos los turnos agendados
    mostrarTurnos() {
        let turnosListElement = document.getElementById('turnosList');
        turnosListElement.innerHTML = ''; // Limpiar la lista antes de mostrar los nuevos turnos
        
        if (this.turnos.length === 0) {
            turnosListElement.innerHTML = "<p>No tienes turnos agendados.</p>";
        } else {
            this.turnos.forEach(turno => {
                let turnoElement = document.createElement('div');
                turnoElement.classList.add('turno');
                turnoElement.textContent = turno.obtenerDetalles();
                turnosListElement.appendChild(turnoElement);
            });
        }
    }

    // Método para guardar los turnos en LocalStorage
    guardarTurnos() {
        localStorage.setItem('turnos', JSON.stringify(this.turnos));
    }
}

// Crear una nueva agenda
let agenda = new Agenda();

// Obtener referencias a los elementos del DOM
let nombreInput = document.getElementById('nombre');
let turnoInput = document.getElementById('turno');
let servicioSelect = document.getElementById('servicio');
let agregarTurnoButton = document.getElementById('agregarTurno');
let verTurnosButton = document.getElementById('verTurnos');

// Evento para agregar un turno
agregarTurnoButton.addEventListener('click', function () {
    let nombre = nombreInput.value;
    let turno = turnoInput.value;
    let servicio = servicioSelect.value;
    let duracion;

    // Definir la duración según el servicio
    if (servicio === "Dermatología") {
        duracion = 30; // Duración predeterminada para Dermatología
    } else if (servicio === "Electrocardiograma") {
        duracion = 20; // Duración predeterminada para Electrocardiograma
    } else if (servicio === "Otorrino") {
        duracion = 40; // Duración predeterminada para Otorrino
    } else if (servicio === "Oculista") {
        duracion = 30; // Duración predeterminada para Oculista
    } else if (servicio === "Urologo") {
        duracion = 30; // Duración predeterminada para Urólogo
    } else if (servicio === "Ginecologo") {
        duracion = 45; // Duración predeterminada para Ginecólogo
    } else if (servicio === "Otros") {
        duracion = 30; // Duración predeterminada para "Otros"
    }

    if (nombre && turno && servicio) {
        let nuevoTurno = new Turno(nombre, turno, servicio, duracion);
        agenda.agregarTurno(nuevoTurno);
        alert("Turno agendado exitosamente.");
        // Limpiar los campos del formulario
        nombreInput.value = '';
        turnoInput.value = '';
        servicioSelect.value = 'Dermatología'; // Restablecer la selección
    } else {
        alert("Faltan datos para agendar el turno.");
    }
});

// Evento para ver los turnos agendados
verTurnosButton.addEventListener('click', function () {
    agenda.mostrarTurnos();
});