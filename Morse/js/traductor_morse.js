let diccionario = [
    {letra: "a", codMorse: ".-"},{letra: "b", codMorse: "-..."},{letra: "c", codMorse: "-.-."},
    {letra: "d", codMorse: "-.."},{letra: "e", codMorse: "."},{letra: "f", codMorse: "..-."},
    {letra: "g", codMorse: "--."},{letra: "h", codMorse: "...."},{letra: "i", codMorse: ".."},
    {letra: "j", codMorse: ".---"},{letra: "k", codMorse: "-.-"},{letra: "l", codMorse: ".-.."},
    {letra: "m", codMorse: "--"},{letra: "n", codMorse: "-."},{letra: "o", codMorse: "---"},
    {letra: "p", codMorse: ".--."},{letra: "q", codMorse: "--.-"},{letra: "r", codMorse: ".-."},
    {letra: "s", codMorse: "..."},{letra: "t", codMorse: "-"},{letra: "u", codMorse: "..-"},
    {letra: "v", codMorse: "...-"},{letra: "w", codMorse: ".--"},{letra: "x", codMorse: "-..-"},
    {letra: "y", codMorse: "-.--"},{letra: "z", codMorse: "--.."}
];

const textarea_mensaje = document.getElementById('textarea_mensaje');
const btn_convertir_morse = document.getElementById('btn_convertir_morse');
const btn_traducir_morse = document.getElementById('btn_traducir_morse');
const contenedor_traduccion = document.getElementById('contenedor_traduccion');
const traduccion = document.getElementById('traduccion');
const icono_copiar = document.getElementById("icono_clipboard");


btn_convertir_morse.addEventListener("click", () => {
    let texto = textarea_mensaje.value.toLowerCase();
    let texto_convertido_morse = "";

    for (let i = 0; i < texto.length; i++) {
        let letraActual = texto[i];
        let encontrado = false;

        for (let j = 0; j < diccionario.length; j++) {
            if (letraActual === diccionario[j].letra) {
                texto_convertido_morse += diccionario[j].codMorse + " ";
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            texto_convertido_morse += " / ";
        }
    }
    traduccion.textContent = texto_convertido_morse.trim();
    habilitar_traduccion();
});

btn_traducir_morse.addEventListener("click", () => {
    let morse = textarea_mensaje.value;
    let texto_traducido = "";

    let palabrasMorse = morse.split(" / ");

    for (let i = 0; i < palabrasMorse.length; i++) {
        let palabras = palabrasMorse[i].split(' ');

        for (let j = 0; j < palabras.length; j++) {

            // Ciclo para buscar la letra correspondiente en el diccionario 
            for (let k = 0; k < diccionario.length; k++) {
                if (palabras[j] === diccionario[k].codMorse) {
                    texto_traducido += diccionario[k].letra;
                    break;
                }
            }
            
        }
        texto_traducido += ' ';
    }
    traduccion.textContent = texto_traducido.trim();
    habilitar_traduccion();
});

function habilitar_traduccion(){
    contenedor_traduccion.style.display = "block";
}

icono_copiar.addEventListener("click",()=>{
    navigator.clipboard.writeText(traduccion.textContent);
    icono_copiar.setAttribute("class","fa-solid fa-clipboard-check");
    setTimeout(()=>{
        icono_copiar.setAttribute("class","fa-regular fa-clipboard");
    },2000);

});