function Persona(nombre, apellido, ingreso, egreso) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.ingreso = ingreso;
    this.egreso = egreso;
    this.saldo = ingreso - egreso;
}

const personas = loadFromLocalStorage() || [];

const agregarPersonaButton = document.getElementById("agregarPersona");
const personaForm = document.getElementById("personaForm");
const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellido");
const ingresoInput = document.getElementById("ingreso");
const egresoInput = document.getElementById("egreso");
const guardarPersonaButton = document.getElementById("guardarPersona");
const personasTableBody = document.getElementById("personasTableBody");

agregarPersonaButton.addEventListener("click", () => {
    personaForm.style.display = "block";
});

guardarPersonaButton.addEventListener("click", () => {
    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const ingreso = parseFloat(ingresoInput.value);
    const egreso = parseFloat(egresoInput.value);

    if (nombre && apellido && !isNaN(ingreso) && !isNaN(egreso)) {
        const nuevaPersona = new Persona(nombre, apellido, ingreso, egreso);
        personas.push(nuevaPersona);
        saveToLocalStorage(personas);
        updatePersonasTable();
        resetForm();
        personaForm.style.display = "none";
    }
});

function updatePersonasTable() {
    personasTableBody.innerHTML = "";
    for (let i = 0; i < personas.length; i++) {
        const persona = personas[i];
        const row = personasTableBody.insertRow();
        row.insertCell(0).textContent = persona.nombre;
        row.insertCell(1).textContent = persona.apellido;
        row.insertCell(2).textContent = persona.ingreso;
        row.insertCell(3).textContent = persona.egreso;
        row.insertCell(4).textContent = persona.saldo;
    }
}

function resetForm() {
    nombreInput.value = "";
    apellidoInput.value = "";
    ingresoInput.value = "";
    egresoInput.value = "";
}

function saveToLocalStorage(data) {
    localStorage.setItem("personasData", JSON.stringify(data));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem("personasData");
    return data ? JSON.parse(data) : null;
}

updatePersonasTable();
