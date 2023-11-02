$(document).ready(function () {
    const apiKey = '91a333bff23b487bb955431e7cae2590'; 

    $.get('https://openexchangerates.org/api/latest.json', { app_id: apiKey }, function (data) {

        console.log(data);

        $('#dolarValue').text(data.rates.USD);
        $('#pesoArgentinoValue').text(data.rates.ARS);
        $('#pesoUruguayoValue').text(data.rates.UYU);
        
        if (data.rates.BTC) {
            $('#bitcoinValue').text(data.rates.BTC);
        } else {
            $('#bitcoinValue').text('No disponible');
        }
    });
});


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

        const accionesCell = row.insertCell(5);
        const eliminarButton = document.createElement("button");
        eliminarButton.textContent = "Eliminar";
        eliminarButton.className = "btn btn-danger";
        eliminarButton.addEventListener("click", () => eliminarPersona(i));
        accionesCell.appendChild(eliminarButton);
    }
}

function eliminarPersona(index) {
    if (confirm("Seguro que deseas eliminar esta persona?")) {
        personas.splice(index, 1);
        saveToLocalStorage(personas);
        updatePersonasTable();
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
    return data ? JSON.parse(data) : [];
}

updatePersonasTable();
