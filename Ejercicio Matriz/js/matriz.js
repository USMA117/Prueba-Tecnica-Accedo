const tablero = document.getElementById('tablero');
let filas = 10;
let columnas = 5;
let celdas = [];
let celdasDeshabilitadas = 0;

for (let i = 1; i <= filas; i++) {
    const fila = document.createElement("tr");
    fila.setAttribute("class", `fila-${i}`);
    for (let j = 1; j <= columnas; j++) {
        const columna = document.createElement("td");
        fila.appendChild(columna);
        columna.setAttribute("class", `tabla tabla-${j}`);
        celdas.push(columna);
    }
    tablero.appendChild(fila);
}

celdas.forEach(celda => {
    celda.addEventListener("click", () => {
        deshabilitar(celda);
    });
});

function deshabilitar(celdaDeshabilitar) {
    if (celdasDeshabilitadas < 5) {
        const indiceCelda = celdas.indexOf(celdaDeshabilitar);

        // Calcula la posición de la fila y columna de la celda en el tablero
        const fila = Math.floor(indiceCelda / columnas);
        const columna = indiceCelda % columnas;

        celdaDeshabilitar.textContent = "SELECCIONADO";
        
        for (let i = fila * columnas; i < (fila + 1) * columnas; i++) {
            celdas[i].disabled = true;
            celdas[i].classList.add("celda_seleccionada");
            
        }

        for (let i = columna; i < celdas.length; i += columnas) {
            celdas[i].disabled = true;
            celdas[i].classList.add("celda_seleccionada");
            
        }

        celdasDeshabilitadas++;
    } else {
        const alerta_limite_celdas = document.getElementById('alerta_limite_celdas');
        alerta_limite_celdas.style.display= "block";
        console.log("Lo siento, ya no puedes bloquear más botones");
    }
}

btn_reiniciar.addEventListener("click", () => {
    celdas.forEach(celda => {
        celda.disabled = false;
        celda.classList.remove("celda_seleccionada");
        celda.textContent = "";
    });
    celdasDeshabilitadas = 0;
});

btn_bloqueo_aleatorio.addEventListener("click", () => {
    const celdasHabilitadas = celdas.filter(celda => !celda.disabled);

    if (celdasHabilitadas.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * celdasHabilitadas.length);
        const celdaAleatoria = celdasHabilitadas[indiceAleatorio];

        deshabilitar(celdaAleatoria);
    } else {
        console.log("No hay celdas disponibles para bloquear.");
    }
});
