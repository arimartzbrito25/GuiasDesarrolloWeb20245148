// Obteniendo referencias del formulario y botón
const formulario = document.forms["frmRegistro"];
const button = formulario.elements["btnRegistro"];

// Modal de bootstrap
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const bodyModal = document.getElementById("idBodyModal");

// Expresión regular para validar correo electrónico
const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Función principal
const validarFormulario = function () {

    let errores = [];

    // a. Validar campos vacíos
    const nombre = document.getElementById("idNombre");
    const apellidos = document.getElementById("idApellidos");
    const fechaNac = document.getElementById("idFechaNac");
    const correo = document.getElementById("idCorreo");
    const pass1 = document.getElementById("idPassword");
    const pass2 = document.getElementById("idPasswordRepetir");
    const pais = document.getElementById("idCmPais");

    if (nombre.value.trim() === "") errores.push("El campo Nombres no puede estar vacío.");
    if (apellidos.value.trim() === "") errores.push("El campo Apellidos no puede estar vacío.");
    if (fechaNac.value.trim() === "") errores.push("Debe seleccionar una fecha de nacimiento.");
    if (correo.value.trim() === "") errores.push("Debe ingresar un correo electrónico.");
    if (pass1.value.trim() === "") errores.push("Debe ingresar una contraseña.");
    if (pass2.value.trim() === "") errores.push("Debe repetir la contraseña.");

    // b. Validar fecha nacimiento < fecha actual
    let hoy = new Date();
    let fechaIngresada = new Date(fechaNac.value);

    if (fechaIngresada > hoy) {
        errores.push("La fecha de nacimiento no puede ser mayor a hoy.");
    }

    // c. Validar email con expresión regular
    if (!regEmail.test(correo.value)) {
        errores.push("El correo electrónico no tiene un formato válido.");
    }

    // d. Contraseñas iguales
    if (pass1.value !== pass2.value) {
        errores.push("Las contraseñas no coinciden.");
    }

    // e. Al menos un interés
    const intereses = [
        document.getElementById("idCkProgramacion"),
        document.getElementById("idCkBD"),
        document.getElementById("idCkRedes"),
        document.getElementById("idCkSeguridad")
    ];

    if (!intereses.some(chk => chk.checked)) {
        errores.push("Debe seleccionar al menos un interés.");
    }

    // f. Carrera seleccionada 
    const carreras = document.getElementsByName("idRdCarrera");
    if (![...carreras].some(r => r.checked)) {
        errores.push("Debe seleccionar una carrera.");
    }

    // g. Validar país de origen
    if (pais.value === "Seleccione una opcion") {
        errores.push("Debe seleccionar un país.");
    }

    // Si hay errores → mostrar alert
    if (errores.length > 0) {
        alert("Errores encontrados:\n\n" + errores.join("\n"));
        return;
    }

    // Si todo está bien → mostrar datos en el modal
    mostrarDatosModal(nombre.value, apellidos.value, fechaNac.value, correo.value, pais.options[pais.selectedIndex].text, intereses, carreras);
};

// Mostrar información en modal usando SOLO DOM
const mostrarDatosModal = function (nombre, apellidos, fecha, correo, pais, intereses, carreras) {

    // Limpiar modal
    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }

    // Crear tabla
    let tabla = document.createElement("table");
    tabla.className = "table table-bordered";

    // Función auxiliar para crear filas
    const addRow = (label, value) => {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.appendChild(document.createTextNode(label));

        let td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(value));

        tr.appendChild(td1);
        tr.appendChild(td2);

        tabla.appendChild(tr);
    };

    // Datos simples
    addRow("Nombres", nombre);
    addRow("Apellidos", apellidos);
    addRow("Fecha nacimiento", fecha);
    addRow("Correo", correo);
    addRow("País", pais);

    // Intereses seleccionados
    let interesesSeleccionados = intereses
        .filter(chk => chk.checked)
        .map(chk => chk.nextElementSibling.innerText)
        .join(", ");

    addRow("Intereses", interesesSeleccionados);

    // Carrera seleccionada
    let carreraSeleccionada = [...carreras].find(r => r.checked).nextElementSibling.innerText;
    addRow("Carrera", carreraSeleccionada);

    // Agregar tabla al modal
    bodyModal.appendChild(tabla);

    // Mostrar modal
    modal.show();
};

// Evento del botón
button.onclick = () => {
    validarFormulario();
};
