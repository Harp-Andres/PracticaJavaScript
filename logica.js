
let inputDocumentoConsultado;
let documentoConsultado;
let estudiante;
let estudiantes;
let notaAlta = 0;

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("index.html")) {
        inputDocumentoConsultado = document.getElementById("numberDocumento");
        document.getElementById("botonNotas").disabled = true;
        document.getElementById("botonPromedio").disabled = true;
        document.getElementById("botonNotaAlta").disabled = true;
        document.getElementById("botonAplazo").disabled = true;


    }
});

function verificarDocumento() {
    documentoConsultado = inputDocumentoConsultado.value;
    if (documentoConsultado === "") {
        alert("Indique el documento del estudiante");
    } else {
        obtenerEstudiantePorDocumento();

    }
}

function obtenerEstudiantePorDocumento() {
    estudiantes = JSON.parse(localStorage.getItem('estudiantes'));
    // Convertir el array de objetos en una cadena JSON legible
    //let estudiantesJSON = JSON.stringify(estudiantes, null, 3);
    // Mostrar la cadena JSON en una ventana de alerta
    //alert(estudiantesJSON);

    for (let i = 0; i < estudiantes.length; i++) {
        if (estudiantes[i].documento === documentoConsultado) {
            // Encontraste al estudiante por su número de documento
            estudiante = estudiantes[i];
            // Convertir el array de objetos en una cadena JSON legible
            //let estudiantesJSON = JSON.stringify(estudiante, null, 3);
            // Mostrar la cadena JSON en una ventana de alerta
            //alert(estudiantesJSON);
            // Realiza la validación o cualquier operación que necesites con el estudiante encontrado
            console.log("Nombre del estudiante: " + estudiante.nombre);
            console.log("Notas del estudiante: " + estudiante.notas.join(", ")); // Muestra las notas como una cadena separada por comas
            //return estudiante; // Opcional: puedes retornar el estudiante encontrado
            document.getElementById("botonNotas").disabled = false;
            document.getElementById("botonPromedio").disabled = false;
            document.getElementById("botonNotaAlta").disabled = false;
            document.getElementById("botonAplazo").disabled = false;
            let contenedor = document.getElementById("divTextosDinamicos");
            // Elimina todos los elementos dentro del contenedor
            while (contenedor.firstChild) {
                contenedor.removeChild(contenedor.firstChild);
            }
            crearElementosVisuales();
        }

        if (estudiantes[i].documento != documentoConsultado && i >= estudiantes.length) {
            alert("El numero de documento " + documentoConsultado + " no fue encontrado aun no tiene notas asignadas");
            let contenedor = document.getElementById("divTextosDinamicos");
            // Elimina todos los elementos dentro del contenedor
            while (contenedor.firstChild) {
                contenedor.removeChild(contenedor.firstChild);
            }
            let contenedor2 = document.getElementById("encabezadosDinamicos");
            // Elimina todos los elementos dentro del contenedor
            while (contenedor2.firstChild) {
                contenedor2.removeChild(contenedor2.firstChild);
            }
            document.getElementById("botonNotas").disabled = true;
            document.getElementById("botonPromedio").disabled = true;
            document.getElementById("botonNotaAlta").disabled = true;
            document.getElementById("botonAplazo").disabled = true;
        }
    }

}

function crearElementosVisuales() {
    let contenedor = document.getElementById("encabezadosDinamicos");
    // Elimina todos los elementos dentro del contenedor
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    let tituloBienvenida = document.createElement("h2");
    tituloBienvenida.id = "tituloBienvenida";
    tituloBienvenida.textContent = "Bienvenid@ " + estudiante.nombre + " ahora puede realizar sus consultas !!!";
    document.getElementById("encabezadosDinamicos").appendChild(tituloBienvenida); // Agregar el <h3> al body o a otro elemento contenedor

}

function solicitudNotas() {
    let contenedor = document.getElementById("divTextosDinamicos");
    // Elimina todos los elementos dentro del contenedor
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    for (let i = 0; i < estudiante.notas.length; i++) {
        // Crear el elemento <h3> con ID "tituloNota"
        let tituloNota = document.createElement("h4");
        tituloNota.id = "tituloNota" + i;
        tituloNota.textContent = "Nota ";
        // Crear el elemento <span> con ID "spanNumeroNota"
        let spantituloNota = document.createElement("span");
        spantituloNota.id = "spanNumeroNota" + i;
        spantituloNota.textContent = i + 1; // Establecer el contenido del <span>

        // Crear el elemento <input> con ID "numberNota" y tipo "number"
        let inputNota = document.createElement("input");
        inputNota.id = "numberNota" + i;
        inputNota.type = "number";
        inputNota.value = estudiante.notas[i];
        inputNota.disabled = true;
        inputNota.style.textAlign = "center";
        // Agregar los elementos creados al DOM
        document.getElementById("divTextosDinamicos").appendChild(tituloNota); // Agregar el <h3> al body o a otro elemento contenedor
        // Agregar el <span> como hijo del <h3>
        document.getElementById("tituloNota" + i).appendChild(spantituloNota);
        document.getElementById("divTextosDinamicos").appendChild(inputNota); // Agregar el <input> al body o a otro elemento contenedor
    }
    document.getElementById("botonNotas").disabled = true;
    document.getElementById("botonPromedio").disabled = false;
    document.getElementById("botonNotaAlta").disabled = false;
    document.getElementById("botonAplazo").disabled = false;

}

function solicitudPromedio() {
    let sumaNotas = 0;
    let promedio = 0;
    let contenedor = document.getElementById("divTextosDinamicos");
    // Elimina todos los elementos dentro del contenedor
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    let tituloPromedio = document.createElement("h4");
    tituloPromedio.id = "tituloPromedio";
    tituloPromedio.textContent = "Tu promedio es: ";
    for (let i = 0; i < estudiante.notas.length; i++) {
        sumaNotas += estudiante.notas[i];
    }

    promedio = sumaNotas / estudiante.notas.length;
    // Crear el elemento <input> con ID "numberNota" y tipo "number"
    let inputPromedio = document.createElement("input");
    inputPromedio.id = "inputPromedio";
    inputPromedio.type = "number";
    inputPromedio.value = promedio;
    inputPromedio.disabled = true;
    inputPromedio.style.textAlign = "center";

    // Agregar los elementos creados al DOM
    document.getElementById("divTextosDinamicos").appendChild(tituloPromedio); // Agregar el <h3> al body o a otro elemento contenedor
    document.getElementById("divTextosDinamicos").appendChild(inputPromedio); // Agregar el <input> al body o a otro elemento contenedor
    document.getElementById("botonPromedio").disabled = true;
    document.getElementById("botonNotaAlta").disabled = false;
    document.getElementById("botonNotas").disabled = false;
    document.getElementById("botonAplazo").disabled = false;

}

function solicitudNotaAlta() {
    let contenedor = document.getElementById("divTextosDinamicos");
    // Elimina todos los elementos dentro del contenedor
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    let tituloNotaAlta = document.createElement("h4");
    tituloNotaAlta.id = "tituloNotaAlta";
    tituloNotaAlta.textContent = "Tu nota mas alta es: ";

    for (let i = 0; i < estudiante.notas.length; i++) {
        if (notaAlta < estudiante.notas[i]) {
            notaAlta = estudiante.notas[i];
        }
    }

    // Crear el elemento <input> con ID "numberNota" y tipo "number"
    let inputNotaAlta = document.createElement("input");
    inputNotaAlta.id = "inputPromedio";
    inputNotaAlta.type = "number";
    inputNotaAlta.value = notaAlta;
    inputNotaAlta.disabled = true;
    inputNotaAlta.style.textAlign = "center";

    // Agregar los elementos creados al DOM
    document.getElementById("divTextosDinamicos").appendChild(tituloNotaAlta); // Agregar el <h3> al body o a otro elemento contenedor
    document.getElementById("divTextosDinamicos").appendChild(inputNotaAlta); // Agregar el <input> al body o a otro elemento contenedor
    document.getElementById("botonNotaAlta").disabled = true;
    document.getElementById("botonPromedio").disabled = false;
    document.getElementById("botonNotas").disabled = false;
    document.getElementById("botonAplazo").disabled = false;

}


function solicitudAplazo() {
    let contenedor = document.getElementById("divTextosDinamicos");
    // Elimina todos los elementos dentro del contenedor
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    let tituloAplazo = document.createElement("h4");
    tituloAplazo.id = "tituloAplazo";
    let aplazo = "";
    let notaMinima = 3;
    let todasNotasAprobadas = true;

    for (let i = 0; i < estudiante.notas.length; i++) {
        if (estudiante.notas[i] < notaMinima) {
            todasNotasAprobadas = false;
            break; // Si hay una nota menor a 3, no es necesario verificar las demás
        }
    }

    if (todasNotasAprobadas) {
        tituloAplazo.textContent = "Debido a que tus notas fueron superiores a 3 no hubo aplazo:";
        aplazo = "No hubo aplazo";
    } else {
        tituloAplazo.textContent = "Debido a que obtuviste una nota inferior a 3 hubo aplazo:";
        aplazo = "Hubo aplazo";
    }

    // Crear el elemento <input> con ID "numberNota" y tipo "number"
    let inputAplazo = document.createElement("input");
    inputAplazo.id = "inputPromedio";
    inputAplazo.type = "Text";
    inputAplazo.value = aplazo;
    inputAplazo.disabled = true;
    inputAplazo.style.textAlign = "center";

    // Agregar los elementos creados al DOM
    document.getElementById("divTextosDinamicos").appendChild(tituloAplazo); // Agregar el <h3> al body o a otro elemento contenedor
    document.getElementById("divTextosDinamicos").appendChild(inputAplazo); // Agregar el <input> al body o a otro elemento contenedor

    document.getElementById("botonNotaAlta").disabled = false;
    document.getElementById("botonPromedio").disabled = false;
    document.getElementById("botonNotas").disabled = false;
    document.getElementById("botonAplazo").disabled = true;
}
/*
<h4 id="textoNotas"> sus notas son</h4>
<ul id="listaNotas">
</ul>
<p id="textoPromedio">El promedio final de las notas es: <span id="promedio"></span> </p>
<p id="textoNotaAlta">La nota mas alta del semestre fue: <span id="notaAlta"></span></p>
<p id="textoAplazo">El estudiante aplazo: <span id="aplazo"></span></p>

*/