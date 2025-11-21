document.getElementById("btnValidar").onclick = () => {
    
    const carnet = document.getElementById("carnet").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const dui = document.getElementById("dui").value.trim();
    const nit = document.getElementById("nit").value.trim();
    const fecha = document.getElementById("fecha").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const edad = document.getElementById("edad").value.trim();

    // Expresiones regulares
    const regexCarnet = /^[A-Z]{2}\d{3}$/;
    const regexNombre = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/;
    const regexApellido = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/;
    const regexDui = /^\d{8}-\d$/;
    const regexNit = /^\d{4}-\d{6}-\d{3}-\d$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const regexEdad = /^\d{1,3}$/;

    let valid = true;

    // Función para mostrar errores
    const showError = (id, cond, msg) => {
        if (!cond) {
            document.getElementById(id).innerText = msg;
            valid = false;
        } else {
            document.getElementById(id).innerText = "";
        }
    };

    showError("errCarnet", regexCarnet.test(carnet), "Formato válido: AB123");
    showError("errNombre", regexNombre.test(nombre), "Solo letras");
    showError("errApellido", regexApellido.test(apellido), "Solo letras");
    showError("errDui", regexDui.test(dui), "Formato válido: 00000000-0");
    showError("errNit", regexNit.test(nit), "Formato válido: ####-######-###-#");
    showError("errCorreo", regexCorreo.test(correo), "Correo inválido");
    showError("errEdad", regexEdad.test(edad) && edad >= 15 && edad <= 100, "Edad entre 15 y 100");

    showError("errFecha", fecha !== "", "Seleccione una fecha");

    if (valid) {
        alert("✔ Todos los datos son válidos");
    }
};
