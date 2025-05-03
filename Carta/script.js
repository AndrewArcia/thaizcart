// --- Referencias a Elementos (sin cambios) ---
const botonNo = document.getElementById('boton-no');
const botonSi = document.getElementById('boton-si');
const contenedorPrincipal = document.querySelector('.contenedor-principal');
const pregunta = document.querySelector('.pregunta');
const contenedorBotones = document.querySelector('.contenedor-botones');
const mensajeFinalDiv = document.getElementById('mensaje-final');

// --- Variables para el encogimiento del Botón "No" ---
let escalaActualBotonNo = 1.0; // Escala inicial (100%)
const factorEncogimiento = 0.85; // Cuánto se reduce en cada clic (85% del tamaño anterior)
const escalaMinima = 0.1; // Escala mínima para que no desaparezca del todo
const textosBotonNo = [ // Textos opcionales para el botón
    "¿Segura?",
    "¡Auch! Más pequeño...",
    "¿De verdad?",
    "¡Casi ni me ves!",
    "Ok, ok, tú ganas...  :(" // Último mensaje antes (o al llegar) al mínimo
];
let indiceTextoBotonNo = 0;


// --- NUEVA Función para encoger el botón "No" ---
function encogerBotonNo() {
    // 1. Calcular la nueva escala
    let nuevaEscala = escalaActualBotonNo * factorEncogimiento;

    // 2. Limitar a la escala mínima
    nuevaEscala = Math.max(escalaMinima, nuevaEscala);

    // 3. Aplicar la transformación de escala
    // Usamos transform para escalar todo el botón (fondo, padding, texto)
    botonNo.style.transform = `scale(${nuevaEscala})`;
    botonNo.style.transformOrigin = 'center center'; // Asegura que encoja hacia el centro

    // 4. Actualizar la escala actual para el próximo clic
    escalaActualBotonNo = nuevaEscala;

    // 5. (Opcional) Cambiar el texto del botón
    if (indiceTextoBotonNo < textosBotonNo.length) {
        // Cambiar el texto solo si no hemos llegado al final de los mensajes
        if (nuevaEscala > escalaMinima || indiceTextoBotonNo < textosBotonNo.length -1 ) {
             botonNo.textContent = textosBotonNo[indiceTextoBotonNo];
             indiceTextoBotonNo++;
        } else {
            // Si ya está en escala mínima Y es el último mensaje, mantenerlo
             botonNo.textContent = textosBotonNo[textosBotonNo.length - 1];
        }
    }

    // 6. (Opcional) Hacer algo si llega al mínimo (ej: deshabilitarlo)
    if (escalaActualBotonNo <= escalaMinima) {
        // Podríamos deshabilitarlo para que no se pueda hacer más clic
        // botonNo.disabled = true;
        // O simplemente dejarlo muy pequeño
    }

    // 7. Ya no necesitamos la clase 'moviendose' ni position:absolute
    botonNo.classList.remove('moviendose');
    // Si se añadió position absolute antes, quitarlo (aunque no debería ser necesario ahora)
    if (botonNo.style.position === 'absolute') {
       botonNo.style.position = 'static'; // O 'relative' si lo necesitas por otra razón
    }
}


// --- Función Respuesta "Sí" (SIN CAMBIOS) ---
function respuestaSi() {
    contenedorPrincipal.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    contenedorPrincipal.style.opacity = '0';
    contenedorPrincipal.style.transform = 'scale(0.9)';
    setTimeout(() => {
        mensajeFinalDiv.innerHTML = 'Ya sabía <br> ¡TE AMO MUCHISÍMO MÁS JSJSJSJ! ❤️✨';
        mensajeFinalDiv.classList.add('visible');
        lanzarConfeti();
    }, 500);
}

// --- Función para lanzar confeti (SIN CAMBIOS) ---
function lanzarConfeti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 110 };
    function randomInRange(min, max) { return Math.random() * (max - min) + min; }
    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) { return clearInterval(interval); }
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, zIndex: 110, colors: ['#ff9a9e', '#fecfef', '#ffe4e1', '#ff7b7b', '#ffffff'] });
}


// --- Añadir Event Listeners (ACTUALIZADO) ---
// Llama a la nueva función de encoger al hacer clic en "No"
botonNo.addEventListener('click', encogerBotonNo);
// El listener para el botón "Sí" no cambia
botonSi.addEventListener('click', respuestaSi);