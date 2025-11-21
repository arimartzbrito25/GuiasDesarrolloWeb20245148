// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE TENDRA LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");

// ACCEDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");

// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// Ejercicio 1 complementario: función para validar si el ID ya existe
const idExiste = (id) => document.getElementById(id) !== null;

// Ejercicio 1 complementario: crear botón para validar formulario
const btnValidar = document.createElement("button");
btnValidar.textContent = "Validar formulario";
btnValidar.className = "btn btn-success mt-3";
btnValidar.type = "button";
newForm.insertAdjacentElement("afterend", btnValidar);

// Evento del botón validar
btnValidar.onclick = () => {
    let errores = [];

    [...newForm.elements].forEach(el => {
        let tipo = el.type;

        if (tipo === "text" || tipo === "number" || tipo === "email" || tipo === "password" || tipo === "date") {
            if (el.value.trim() === "") {
                errores.push(`El campo "${el.id}" está vacío`);
            }
        }

        if (tipo === "select-one") {
            if (el.value === "" || el.value === "0") {
                errores.push(`Seleccione una opción válida en "${el.id}"`);
            }
        }

        if (tipo === "radio") {
            let radios = document.querySelectorAll(`input[name="${el.name}"]`);
            if ([...radios].every(r => !r.checked)) {
                errores.push(`Debe seleccionar una opción en los radios de "${el.name}"`);
            }
        }

        if (tipo === "checkbox") {
            if (!el.checked) {
                errores.push(`Marque la opción "${el.id}"`);
            }
        }
    });

    if (errores.length > 0) {
        alert("Errores encontrados:\n\n" + errores.join("\n"));
    } else {
        alert("Formulario válido ✔");
    }
};

// AGREGANDO FUNCIONES
const vericarTipoElemento = function () {
    let elemento = cmbElemento.value;
    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creará");
    }
};

const newSelect = function () {
    let idControl = `id${nombreElemento.value}`;
    if (idExiste(idControl)) {
        alert("❌ Este ID ya existe. Use uno diferente.");
        return;
    }

    let addElemento = document.createElement("select");
    addElemento.setAttribute("id", idControl);
    addElemento.setAttribute("class", "form-select");

    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opción ${i}`;
        addElemento.appendChild(addOption);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", idControl);
    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.className = "form-floating";

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (newElemento) {
    let idControl = `id${nombreElemento.value}`;
    if (idExiste(idControl)) {
        alert("❌ Este ID ya existe. Use uno diferente.");
        return;
    }

    let addElemento = document.createElement("input");
    addElemento.setAttribute("id", idControl);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");
    addElemento.name = nombreElemento.value;

    let labelElemento = document.createElement("label");
    labelElemento.className = "form-check-label";
    labelElemento.setAttribute("for", idControl);
    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.className = "form-check";

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

const newInput = function (newElemento) {
    let idControl = `id${nombreElemento.value}`;
    if (idExiste(idControl)) {
        alert("❌ Este ID ya existe. Use uno diferente.");
        return;
    }

    let addElemento =
        newElemento == "textarea"
            ? document.createElement("textarea")
            : document.createElement("input");

    addElemento.setAttribute("id", idControl);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", idControl);

    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");
    labelElemento.textContent = tituloElemento.value;
    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.className = "form-floating mb-3";

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

// AGREGANDO EVENTO CLIC A LOS BOTONES
buttonCrear.onclick = () => {
    vericarTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        let elemento = cmbElemento.value;

        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }
    } else {
        alert("Faltan campos por completar");
    }
};

//Agregando evento para el modal de boostrap
document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});
