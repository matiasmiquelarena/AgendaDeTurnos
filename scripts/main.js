console.log("Bienvenidos a mi agenda de turnos");

// Clase Turno para representar un turno
class Turno {
    constructor(nombre, turno, servicio) {
        this.nombre = nombre;         // Nombre del cliente
        this.servicio = servicio;     // Tipo de servicio
        this.estado = "Agendado";     // Estado del turno (por defecto agendado)

        // Intentamos usar moment para formatear la fecha
        const fecha = moment(turno, 'YYYY-MM-DD HH:mm', true); // Usamos 'YYYY-MM-DD HH:mm'

        if (fecha.isValid()) {
            // Si la fecha es válida, asignamos el valor
            this.turno = fecha.format('YYYY-MM-DD HH:mm'); // Guardamos la fecha en el formato deseado
            this.fechaFormateada = fecha.format('dddd, MMMM Do YYYY, h:mm a'); // Para mostrar de manera legible
        } else {
            // Si la fecha es inválida, asignamos valores predeterminados
            this.turno = 'Fecha inválida';
            this.fechaFormateada = 'Fecha inválida';
        }
    }

    // Método para obtener los detalles del turno
    obtenerDetalles() {
        return `${this.fechaFormateada} - Servicio: ${this.servicio} - Estado: ${this.estado}`;
    }
}

// Clase Agenda para gestionar los turnos
class Agenda {
    constructor() {
        this.turnos = [];
        // Intentar cargar los turnos desde localStorage o mediante fetch
        this.cargarTurnos();
    }

    // Método para cargar los turnos desde localStorage o desde un archivo JSON con fetch
    async cargarTurnos() {
        // Intentamos cargar desde localStorage
        const turnosGuardados = JSON.parse(localStorage.getItem('turnos'));

        if (turnosGuardados) {
            // Si hay turnos en localStorage, los cargamos
            this.turnos = turnosGuardados.map(turnoData => new Turno(turnoData.nombre, turnoData.turno, turnoData.servicio));
        } else {
            // Si no hay turnos en localStorage, intentamos cargarlos desde un archivo JSON o API externa
            try {
                const response = await fetch('turnos.json');  // Aquí pones la URL de tu archivo JSON o API
                if (!response.ok) {
                    throw new Error('No se pudo cargar el archivo de turnos');
                }
                const turnosData = await response.json();
                this.turnos = turnosData.map(turno => new Turno(turno.nombre, turno.turno, turno.servicio));
                // Guardamos los turnos en localStorage para persistirlos
                this.guardarTurnos();
            } catch (error) {
                console.error('Error al cargar los turnos:', error);
                // Aquí mostramos un mensaje de error en caso de no poder cargar los turnos
                Swal.fire({
                    title: '¡Error!',
                    text: 'No se pudieron cargar los turnos desde el archivo. Intenta más tarde.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        }
    }

    // Método para agregar un turno
    agregarTurno(turno) {
        this.turnos.push(turno);
        this.guardarTurnos();  // Guardamos los turnos en LocalStorage cada vez que agregamos uno
    }

    // Método para eliminar un turno
    eliminarTurno(indice) {
        this.turnos.splice(indice, 1);
        this.guardarTurnos();  // Guardamos los cambios en LocalStorage
    }

    // Método para cambiar un turno
    cambiarTurno(indice, nuevoTurno) {
        this.turnos[indice] = nuevoTurno;
        this.guardarTurnos();  // Guardamos los cambios en LocalStorage
    }

    // Método para mostrar todos los turnos agendados
    mostrarTurnos() {
        let turnosListElement = document.getElementById('turnosList');
        turnosListElement.innerHTML = ''; // Limpiar la lista antes de mostrar los nuevos turnos

        if (this.turnos.length === 0) {
            turnosListElement.innerHTML = "<p>No tienes turnos agendados.</p>";
        } else {
            this.turnos.forEach((turno, index) => {
                let turnoElement = document.createElement('div');
                turnoElement.classList.add('turno');
                turnoElement.textContent = turno.obtenerDetalles();

                // Botón para eliminar el turno
                let eliminarButton = document.createElement('button');
                eliminarButton.textContent = 'Eliminar';
                eliminarButton.addEventListener('click', () => {
                    this.eliminarTurno(index);
                    this.mostrarTurnos(); // Actualiza la vista
                });

                // Botón para cambiar el turno
                let cambiarButton = document.createElement('button');
                cambiarButton.textContent = 'Cambiar';
                cambiarButton.addEventListener('click', () => {
                    Swal.fire({
                        title: 'Cambiar turno',
                        html: `
                            <label for="nuevaFecha">Ingresa la nueva fecha y hora (YYYY-MM-DD HH:mm):</label>
                            <input type="text" id="nuevaFecha" class="swal2-input" placeholder="2025-02-05 15:00" />`,
                        focusConfirm: false,
                        preConfirm: () => {
                            const nuevaFecha = document.getElementById('nuevaFecha').value;
                            if (nuevaFecha) {
                                const nuevoTurno = new Turno(turno.nombre, nuevaFecha, turno.servicio);
                                if (nuevoTurno.turno !== 'Fecha inválida') {
                                    this.cambiarTurno(index, nuevoTurno);
                                    this.mostrarTurnos(); // Actualiza la vista
                                    Swal.fire({
                                        title: '¡Turno actualizado!',
                                        text: 'El turno ha sido cambiado exitosamente.',
                                        icon: 'success',
                                        confirmButtonText: 'Aceptar'
                                    });
                                } else {
                                    Swal.fire({
                                        title: '¡Error!',
                                        text: 'La nueva fecha es inválida. Usa el formato correcto (YYYY-MM-DD HH:mm).',
                                        icon: 'error',
                                        confirmButtonText: 'Aceptar'
                                    });
                                }
                            } else {
                                Swal.fire({
                                    title: '¡Error!',
                                    text: 'Debes ingresar una fecha.',
                                    icon: 'error',
                                    confirmButtonText: 'Aceptar'
                                });
                            }
                        }
                    });
                });

                turnoElement.appendChild(eliminarButton);
                turnoElement.appendChild(cambiarButton);
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

    if (nombre && turno && servicio) {
        let nuevoTurno = new Turno(nombre, turno, servicio);

        if (nuevoTurno.turno === 'Fecha inválida') {
            Swal.fire({
                title: '¡Error!',
                text: 'La fecha ingresada es inválida. Por favor, usa el formato correcto (YYYY-MM-DD HH:mm).',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        agenda.agregarTurno(nuevoTurno);

        Swal.fire({
            title: '¡Turno agendado!',
            text: 'El turno se ha agendado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        nombreInput.value = '';
        turnoInput.value = '';
        servicioSelect.value = 'Dermatología';
    } else {
        Swal.fire({
            title: '¡Error!',
            text: 'Faltan datos para agendar el turno.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
});

// Evento para ver los turnos agendados
verTurnosButton.addEventListener('click', function () {
    agenda.mostrarTurnos();
});
