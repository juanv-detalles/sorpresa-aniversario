// ==========================================
// 1. TU DEDICATORIA PERFECTA Y EXTENSA
// ==========================================
const mensajePredeterminado = `💛🌻 ¡PARA LA PERSONA MÁS ESPECIAL DEL MUNDO! 🌻💛

✨ ¡Felicidades! Si lograste entrar aquí es porque recordabas con exactitud esa fecha tan nuestra... Esa fecha mágica que marcó un antes y un después definitivo en nuestras vidas. Fue el día exacto en que nuestros caminos se cruzaron, el instante en que todo comenzó y en el que decidimos, con toda la ilusión del universo, empezar a escribir nuestra propia historia de amor de la mano. ✨

Mirar atrás y recordar ese momento me llena de una alegría inmensa, porque entendí que fue el inicio del viaje más maravilloso, loco y bonito de toda mi vida. 🥹❤️

Quiero aprovechar esta pequeña gran sorpresa para recordarte lo muchísimo que significas para mí y el lugar tan sagrado que ocupas en mis días. A veces el tiempo avanza muy rápido, pero hoy me detengo para decirte lo que dicta mi corazón: ¡GRACIAS! 

🌟 Gracias por cada sonrisa compartida.
🌟 Gracias por cada abrazo sincero en los momentos en que más lo necesitaba.
🌟 Gracias por tu paciencia infinita, tu ternura y el hermoso regalo de tu presencia.
🌟 Gracias por hacer que mi mundo sea un lugar brillante, feliz y lleno de paz.

Cada detalle tuyo, cada conversación nocturna y cada segundo a tu lado es un tesoro invaluable que guardo bajo llave en lo más profundo de mi ser. No cambiaría por nada de este planeta absolutamente nada de lo que hemos construido juntos: las risas cómplices, las metas que planeamos en voz alta, las pequeñas locuras y esa hermosa conexión que solo nosotros dos entendemos. Me fascina ver cómo crecemos juntos y cómo nos apoyamos en cada paso que damos.

Eres mi persona favorita, mi refugio seguro contra todo lo malo, mi paz en medio de la tormenta, mi complemento perfecto y la razón de mis sonrisas más honestas y transparentes. Gracias por ser tú, por no rendirte y por enseñarme lo hermoso que es amar y ser amado sin condiciones. 🧸💞

Te amo con todas las fuerzas de mi alma, hoy, mañana y para toda la eternidad. ✨🌌`;

const pantallaConfig = document.getElementById('pantalla-config');
const pantallaCompartir = document.getElementById('pantalla-compartir');
const pantallaValidar = document.getElementById('pantalla-validar');
const pantallaSorpresa = document.getElementById('pantalla-sorpresa');

// ==========================================
// 2. PASO 1: GENERAR LINK ENCRIPTADO CORTO
// ==========================================
document.getElementById('btn-generar').addEventListener('click', () => {
    const dia = document.getElementById('config-dia').value;
    const mes = document.getElementById('config-mes').value;
    const anio = document.getElementById('config-anio').value;
    const nombre = document.getElementById('config-nombre').value;

    if (!dia || !mes || !anio || !nombre) {
        alert("Por favor rellena la fecha completa y tu nombre.");
        return;
    }

    const payload = { f: `${dia}-${mes}-${anio}`, n: nombre };
    const hashConfig = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    const linkFinal = `${window.location.origin}${window.location.pathname}?s=${hashConfig}`;

    pantallaConfig.classList.add('oculto');
    pantallaCompartir.classList.remove('oculto');

    document.getElementById('btn-copiar-link').onclick = function() {
        navigator.clipboard.writeText(linkFinal).then(() => {
            document.getElementById('copiado-aviso').classList.remove('oculto');
        });
    };
});

// ==========================================
// 3. PASO 2: COMPROBAR URL AL ABRIR LA PÁGINA
// ==========================================
const parametrosUrl = new URLSearchParams(window.location.search);
const datosSorpresaCargados = parametrosUrl.get('s');
let configuracionRecibida = null;

if (datosSorpresaCargados) {
    pantallaConfig.classList.add('oculto');
    pantallaValidar.classList.remove('oculto');
    try {
        configuracionRecibida = JSON.parse(decodeURIComponent(escape(atob(datosSorpresaCargados))));
    } catch(e) {
        alert("El enlace compartido no es válido.");
    }
}

// ==========================================
// 4. PASO 3: VALIDACIÓN DE FECHA Y LLUVIA INSTANTÁNEA
// ==========================================
document.getElementById('btn-verificar').addEventListener('click', () => {
    const dia = document.getElementById('adivinar-dia').value;
    const mes = document.getElementById('adivinar-mes').value;
    const anio = document.getElementById('adivinar-anio').value;
    const fechaIntento = `${dia}-${mes}-${anio}`;

    if (!configuracionRecibida) return;

    if (fechaIntento === configuracionRecibida.f) {
        document.getElementById('error-mensaje').classList.add('oculto');
        pantallaValidar.classList.add('oculto');
        pantallaSorpresa.classList.remove('oculto');

        document.getElementById('remitente-carta').textContent = configuracionRecibida.n;

        // Lluvia instantánea de corazones geométricos reales al visualizar la dedicatoria
        lanzarLluviaCorazones();

        // Efecto máquina de escribir palabra por palabra (velocidad: 180ms)
        mostrarTextoPalabraPorPalabra(mensajePredeterminado, 'texto-carta', 180);

        // Inyección estática de URLs de imágenes optimizadas de internet
        const gridFinal = document.getElementById('fotos-finales-grid');
        gridFinal.innerHTML = `
            <img src="https://unsplash.com">
            <img src="https://unsplash.com">
            <img src="https://unsplash.com">
            <img src="https://unsplash.com">
            <img src="https://unsplash.com">
            <img src="https://unsplash.com">
            <img src="https://unsplash.com">
            <img src="https://unsplash.com">
            <img src="https://unsplash.com">
        `;
    } else {
        document.getElementById('error-mensaje').classList.remove('oculto');
    }
});

// ==========================================
// 5. FUNCIÓN: LÓGICA MÁQUINA DE ESCRIBIR
// ==========================================
function mostrarTextoPalabraPorPalabra(texto, elementoId, velocidad) {
    const contenedor = document.getElementById(elementoId);
    const palabras = texto.split(/(\s+)/); 
    let i = 0;
    contenedor.textContent = "";

    function agregarPalabra() {
        if (i < palabras.length) {
            contenedor.textContent += palabras[i];
            i++;
            const cartaContenedor = document.querySelector('.carta');
            cartaContenedor.scrollTop = cartaContenedor.scrollHeight;
            setTimeout(agregarPalabra, velocidad);
        } else {
            // El botón Continuar aparece guiado exactamente al finalizar la lectura
            document.getElementById('btn-continuar').classList.remove('oculto');
        }
    }
    agregarPalabra();
}

// ==========================================
// 6. PASO 4: ARMAR COLLAGE DE CORAZÓN IMAGEN POR IMAGEN
// ==========================================
document.getElementById('btn-continuar').addEventListener('click', () => {
    document.getElementById('galeria-fotos').classList.remove('oculto');
    document.getElementById('btn-continuar').classList.add('oculto');

    const coordenadasCorazon = [
        {r:1, c:2}, {r:1, c:4},
        {r:2, c:1}, {r:2, c:2}, {r:2, c:3}, {r:2, c:4}, {r:2, c:5},
        {r:3, c:2}, {r:3, c:3}, {r:3, c:4},
        {r:4, c:3}
    ];

    const collage = document.getElementById('heart-collage');
    const imagenes = document.querySelectorAll('#fotos-finales-grid img');
    collage.innerHTML = "";

    coordenadasCorazon.forEach((pos, index) => {
        if (index >= imagenes.length) return;

        const cell = document.createElement('div');
        cell.className = "cell-heart";
        cell.style.gridRowStart = pos.r;
        cell.style.gridColumnStart = pos.c;

        const imgClone = imagenes[index].cloneNode(true);
        cell.appendChild(imgClone);
        collage.appendChild(cell);

        // Revelado paulatino imagen por imagen con transición suave
        setTimeout(() => {
            cell.classList.add('visible');
        }, index * 400);
    });
});

function lanzarLluviaCorazones() {
    const scalar = 3;
    const corazonIcono = confetti.shapeFromText({ text: '❤️', scalar });
    const duracion = 4 * 1000;
    const fin = Date.now() + duracion;

    (function frame() {
        confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, shapes: [corazonIcono], scalar });
        confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, shapes: [corazonIcono], scalar });
        if (Date.now() < fin) requestAnimationFrame(frame);