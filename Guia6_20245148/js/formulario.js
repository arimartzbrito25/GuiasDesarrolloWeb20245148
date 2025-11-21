//Accediendo a los elementos
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCdePais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnBorrar");
const buttonAgregarPais = document.getElementById("idBtnAñadirPais");

// Toast
const notificacion = document.getElementById("idnotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

// Modal país
const idModal = document.getElementById("idModalPais");

// Array global
let arrayPaciente = [];

// LIMPIAR FORMULARIO
const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";
    inputNombre.focus();
};

// AGREGAR PACIENTE

const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
        inputRdMasculino.checked
            ? "Hombre"
            : inputRdFemenino.checked
            ? "Mujer"
            : "";
    let pais = cmbPais.value;
    let paisLabel = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre !== "" &&
        apellido !== "" &&
        fechaNacimiento !== "" &&
        sexo !== "" &&
        pais != 0 &&
        direccion !== ""
    ) {
        arrayPaciente.push(
            new Array(nombre, apellido, fechaNacimiento, sexo, paisLabel, direccion)
        );

        mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        toast.show();
        limpiarForm();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};


// GENERAR TABLA
function imprimirFilas() {
    let filas = "";
    let contador = 1;

    arrayPaciente.forEach((element) => {
        filas += `<tr>
            <td class="text-center fw-bold">${contador}</td>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>${element[2]}</td>
            <td>${element[3]}</td>
            <td>${element[4]}</td>
            <td>${element[5]}</td>
            <td>
                <button id="idBtnEditar${contador}" class="btn btn-primary">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button id="idBtnEliminar${contador}" class="btn btn-danger">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>`;
        contador++;
    });

    return filas;
}

const imprimirPaciente5 = () => {
    let tabla = `<div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <tr>
                <th class="text-center">#</th>
                <th class="text-center">Nombre</th>
                <th class="text-center">Apellido</th>
                <th class="text-center">Fecha nacimiento</th>
                <th class="text-center">Sexo</th>
                <th class="text-center">País</th>
                <th class="text-center">Dirección</th>
                <th class="text-center">Opciones</th>
            </tr>
            ${imprimirFilas()}
        </table>
    </div>`;

    document.getElementById("idTablaPacientes").innerHTML = tabla;

    enlazarBotones();
};
// ENLAZAR BOTONES EDITAR / ELIMINAR

function enlazarBotones() {
    arrayPaciente.forEach((_, index) => {
        let num = index + 1;

        const btnEditar = document.getElementById(`idBtnEditar${num}`);
        const btnEliminar = document.getElementById(`idBtnEliminar${num}`);

        if (btnEditar) btnEditar.onclick = () => abrirModalEditar(index);
        if (btnEliminar) btnEliminar.onclick = () => eliminarPaciente(index);
    });
}

// EDITAR
function abrirModalEditar(index) {
    const p = arrayPaciente[index];

    document.getElementById("idIndexEditar").value = index;
    document.getElementById("idEditNombre").value = p[0];
    document.getElementById("idEditApellido").value = p[1];
    document.getElementById("idEditFecha").value = p[2];
    document.getElementById("idEditSexo").value = p[3];
    document.getElementById("idEditPais").value = p[4];
    document.getElementById("idEditDireccion").value = p[5];

    new bootstrap.Modal(document.getElementById("idModalEditar")).show();
}

document.getElementById("idBtnGuardarCambios").onclick = () => {
    const index = document.getElementById("idIndexEditar").value;

    arrayPaciente[index] = [
        document.getElementById("idEditNombre").value,
        document.getElementById("idEditApellido").value,
        document.getElementById("idEditFecha").value,
        document.getElementById("idEditSexo").value,
        document.getElementById("idEditPais").value,
        document.getElementById("idEditDireccion").value
    ];

    imprimirPaciente5();
    mensaje.innerHTML = "Paciente editado correctamente";
    toast.show();

    bootstrap.Modal.getInstance(document.getElementById("idModalEditar")).hide();
};

// ELIMINAR
function eliminarPaciente(index) {
    if (confirm("¿Desea eliminar este paciente?")) {
        arrayPaciente.splice(index, 1);
        imprimirPaciente5();

        mensaje.innerHTML = "Paciente eliminado";
        toast.show();
    }
}

// AGREGAR NUEVO PAÍS
let contadorGlobalOption = cmbPais.children.length;

const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew !== "") {
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        cmbPais.appendChild(option);

        mensaje.innerHTML = "País agregado correctamente";
        toast.show();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

// ASIGNAR EVENTOS
buttonLimpiarPaciente.onclick = limpiarForm;
buttonAgregarPaciente.onclick = addPaciente;
buttonMostrarPaciente.onclick = imprimirPaciente5;
buttonAgregarPais.onclick = addPais;

idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});


limpiarForm();
