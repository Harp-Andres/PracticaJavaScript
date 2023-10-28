
let inputDocumento;
let inputNombre;
let inputCantidadNotas;
let documentoEstudiante;
let nombreEstudiante;
let cantidadNotas;
let notasEstudiantes = [];
let botonEnviar;
let botonAgregarNotas;
let botonAgregarEstudiantes;



document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.includes("index2.html")) {
    inputDocumento = document.getElementById("numberDocumento");
    inputNombre = document.getElementById("textNombre");
    inputCantidadNotas = document.getElementById("numberCantidadNotas");
    botonEnviar = document.getElementById("botonEnviar");
    textoNotas = document.getElementById("textoNotas");
    textoNotas.style.display = "none";
    botonAgregarNotas = document.getElementById("botonAgregarNotas");
    botonAgregarNotas.disabled = true;
    botonAgregarEstudiantes = document.getElementById("botonAgregarEstudiante");
    botonAgregarEstudiantes.style.display = "none";
    }
});

function validarYEnviarDatos() {
    let msjDocumento = "";
    let msjNombre = "";
    let msjNotas = "";
    documentoEstudiante = inputDocumento.value;
    nombreEstudiante = inputNombre.value;
    cantidadNotas = inputCantidadNotas.value;

    if (documentoEstudiante === "" || documentoEstudiante.trim() === '') {
        msjDocumento = "Indique el documento del estudiante.\n";

    }
    if (nombreEstudiante === "" || nombreEstudiante.trim() === '') {
        msjNombre = "Indique el nombre del estudiante.\n";

    }
    //La función isNaN (que significa "is Not-a-Number") se utiliza en JavaScript para comprobar si un valor no es un número válido.
    if (cantidadNotas === "" || isNaN(cantidadNotas) || cantidadNotas.trim() === '') {
        msjNotas = "Indique cuantas notas desea agregar, solo debe ingresar numeros.\n";
    } 

    if (msjDocumento !== "" || msjNombre !== "" || msjNotas !== "") {
        msj = ("Por favor:\n" + msjDocumento + msjNombre + msjNotas);
        alert(msj);

    } else {
       
        inputDocumento.disabled = true;
        inputNombre.disabled = true;
        inputCantidadNotas.disabled = true;
        botonEnviar.disabled = true;
        textoNotas.style.display = "";
        botonAgregarNotas.disabled = "";
        crearElementos();
        
    }
}


function crearElementos() {
    for (let i = 1; i <= cantidadNotas; i++) {
        // Crear el elemento <h3> con ID "tituloNota"
        let tituloNota = document.createElement("h3");
        tituloNota.id = "tituloNota" + i;
        tituloNota.textContent = "Nota ";
        // Crear el elemento <span> con ID "spanNumeroNota"
        let spantituloNota = document.createElement("span");
        spantituloNota.id = "spanNumeroNota" + i;
        spantituloNota.textContent = i; // Establecer el contenido del <span>

        // Crear el elemento <input> con ID "numberNota" y tipo "number"
        let inputNota = document.createElement("input");
        inputNota.id = "numberNota" + i;
        inputNota.type = "number";

        // Agregar los elementos creados al DOM
        document.getElementById("divTextosAleatorios").appendChild(tituloNota); // Agregar el <h3> al body o a otro elemento contenedor
        // Agregar el <span> como hijo del <h3>
        document.getElementById("tituloNota" + i).appendChild(spantituloNota);
        document.getElementById("divTextosAleatorios").appendChild(inputNota); // Agregar el <input> al body o a otro elemento contenedor
    }

}

function agregarNotas() {
 
    // Crear un array vacío para almacenar las notas
    let notas = [];

    // Recopilar las notas ingresadas en los inputs y convertirlas en números
    for (let i = 1; i <= cantidadNotas; i++) {
        let nota = parseFloat(document.getElementById("numberNota" + i).value);
        notas.push(nota);
        
    }

    // Crear un nuevo estudiante con las notas ingresadas
    let nuevoEstudiante = {
        nombre: nombreEstudiante,
        documento: documentoEstudiante,
        notas: notas
    };


    // Agregar el nuevo estudiante al array de estudiantes
    notasEstudiantes.push(nuevoEstudiante);
    localStorage.setItem('estudiantes', JSON.stringify(notasEstudiantes));

     // Limpiar los campos de entrada
     for (let i = 1; i <= cantidadNotas; i++) {
        //document.getElementById("numberNota" + i).value = '';
        document.getElementById("numberNota" + i).disabled = true;
    }
    botonAgregarEstudiantes.style.display = "";
    botonAgregarNotas.disabled = true;
     // Convertir el array de objetos en una cadena JSON legible
     //let notasEstudiantesJSON = JSON.stringify(notasEstudiantes, null, 3);
     // Mostrar la cadena JSON en una ventana de alerta
    //alert(notasEstudiantesJSON);

}

function agregarNuevoEstudiante(){
    inputDocumento.disabled = false;
    inputDocumento.value = "";
    inputNombre.disabled = false;
    inputNombre.value = "";
    inputCantidadNotas.disabled = false;
    inputCantidadNotas.value = "";
    botonEnviar.disabled = false;
    textoNotas.style.display = "none";
    botonAgregarNotas.disabled = false;
   botonAgregarEstudiantes.style.display = "none";
    // Obtén una referencia al contenedor
    let contenedor = document.getElementById("divTextosAleatorios");
    // Elimina todos los elementos dentro del contenedor
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }

  




}