const mensajePredeterminado = `❤️🌹 ¡PARA LA PERSONA MÁS ESPECIAL DEL MUNDO! 🌹❤️<br><br>✨ ¡Felicidades! Si lograste entrar aquí es porque recordabas con exactitud esa fecha tan nuestra... Esa fecha mágica que marcó un antes y un después definitivo en nuestras vidas. Fue el día exacto en que nuestros caminos se cruzaron, el instante en que todo comenzó y en el que decidimos, con toda la ilusión del universo, empezar a escribir nuestra propia historia de amor de la mano. ✨<br><br>Mirar atrás y recordar ese momento me llena de una alegría inmensa, porque entendí que fue el inicio del viaje más maravilloso, loco y bonito de toda mi vida. 🥹❤️<br><br>Quiero aprovechar esta pequeña gran sorpresa para recordarte lo muchísimo que significas para mí y el lugar tan sagrado que ocupas en mi vida. A veces el tiempo avanza muy rápido, pero hoy me detengo para decirte lo que dicta mi corazón: ¡GRACIAS!<br><br>❤️ Gracias por cada sonrisa compartida.<br>❤️ Gracias por cada abrazo sincero en los momentos en que más lo necesitaba.<br>❤️ Gracias por tu paciencia infinita, tu ternura y el hermoso regalo de tu presencia.<br>❤️ Gracias por hacer que mi mundo sea un lugar brillante, feliz y lleno de paz.<br><br>Cada detalle tuyo, cada conversación nocturna y cada segundo a tu lado es un tesoro invaluable que guardo bajo llave en lo más profundo de mi ser. No cambiaría por nada de este planeta absolutamente nada de lo que hemos construido juntos: las risas cómplices, las metas que planeamos en voz alta, las pequeñas locuras y esa hermosa conexión que solo nosotros dos entendemos. Me fascina ver cómo crecemos juntos y cómo nos apoyamos en cada paso que damos.<br><br>Eres mi persona favorita, mi refugio seguro contra todo lo malo, mi paz en medio de la tormenta, mi complemento perfecto y la razón de mis sonrisas más honestas y transparentes. Gracias por ser tú, por no rendirte y por enseñarme lo hermoso que es amar y ser amado sin condiciones. 🧸💞<br><br>Te amo con todas las fuerzas de mi alma, hoy, mañana y para toda la eternidad. ✨🌌`;

const pantallaConfig = document.getElementById('pantalla-config');
const pantallaCompartir = document.getElementById('pantalla-compartir');
const pantallaValidar = document.getElementById('pantalla-validar');
const pantallaSorpresa = document.getElementById('pantalla-sorpresa');

let intervaloLluviaInfinita = null;
let datosConfiguracion = { f: "", n: "", p: "" };

// PASO 1: GENERAR LINK ENCRIPTADO (CON ELIMINACIÓN DE LÍMITES EN AÑOS)
const btnGenerar = document.getElementById('btn-generar');
if (btnGenerar) {
    btnGenerar.onclick = function(e) {
        e.preventDefault();

        const dia = document.getElementById('config-dia').value.trim();
        const mes = document.getElementById('config-mes').value.trim();
        const anio = document.getElementById('config-anio').value.trim();
        const nombre = document.getElementById('config-nombre').value.trim();
        const pareja = document.getElementById('config-pareja').value.trim();

        if (!dia || !mes || !anio || !nombre || !pareja) {
            alert("Por favor rellena la fecha completa, tu nombre (Att) y el de tu pareja.");
            return;
        }

        // Formato seguro para cualquier año infinito
        const fechaFinal = `${parseInt(dia)}-${parseInt(mes)}-${parseInt(anio)}`;

        const payload = { f: fechaFinal, n: nombre, p: pareja };
        const hashConfig = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
        const linkFinal = `${window.location.origin}${window.location.pathname}?s=${hashConfig}`;

        if (pantallaConfig) pantallaConfig.classList.add('oculto');
        if (pantallaCompartir) pantallaCompartir.classList.remove('oculto');

        const btnCopiar = document.getElementById('btn-copiar-link');
        if (btnCopiar) {
            btnCopiar.onclick = function() {
                navigator.clipboard.writeText(linkFinal).then(() => {
                    const aviso = document.getElementById('copiado-aviso');
                    if (aviso) aviso.classList.remove('oculto');
                });
            };
        }
    };
}

// PASO 2: LEER PARÁMETROS EN GOUT DESDE LA URL
const parametrosUrl = new URLSearchParams(window.location.search);
const datosSorpresaCargados = parametrosUrl.get('s');

if (datosSorpresaCargados) {
    if (pantallaConfig) pantallaConfig.classList.add('oculto');
    if (pantallaValidar) pantallaValidar.classList.remove('oculto');
    try {
        datosConfiguracion = JSON.parse(decodeURIComponent(escape(atob(datosSorpresaCargados))));
        const tituloPareja = document.getElementById('titulo-pareja');
        if (tituloPareja) tituloPareja.textContent = `💝 Un regalo de ${datosConfiguracion.n}...`;
    } catch(e) {
        console.log("Error de decodificación.");
    }
}

// PASO 3: VALIDACIÓN DE FECHA POR LA PAREJA
const btnVerificar = document.getElementById('btn-verificar');
if (btnVerificar) {
    btnVerificar.onclick = function() {
        const dia = document.getElementById('adivinar-dia').value.trim();
        const mes = document.getElementById('adivinar-mes').value.trim();
        const anio = document.getElementById('adivinar-anio').value.trim();
        
        if (!dia || !mes || !anio) {
            alert("Introduce la fecha completa para comprobar.");
            return;
        }

        const fechaIntento = `${parseInt(dia)}-${parseInt(mes)}-${parseInt(anio)}`;

        if (fechaIntento === datosConfiguracion.f) {
            if (pantallaValidar) pantallaValidar.classList.add('oculto');
            if (pantallaSorpresa) pantallaSorpresa.classList.remove('oculto');

            const remitente = document.getElementById('remitente-carta');
            if (remitente) remitente.textContent = datosConfiguracion.n;

            // Iniciamos la lluvia constante e interactiva de corazones
            iniciarLluviaInfinita();

            setTimeout(() => {
                maquinaDeEscribirLetras(mensajePredeterminado, 'texto-carta', 35);
            }, 300);

        } else {
            const errorMsg = document.getElementById('error-mensaje');
            if (errorMsg) errorMsg.classList.remove('oculto');
        }
    };
}

// EFECTO MÁQUINA DE ESCRIBIR DE LAS FLORES AMARILLAS 🌼
function maquinaDeEscribirLetras(texto, elementoId, velocidad) {
    const contenedor = document.getElementById(elementoId);
    let progreso = 0;
    if (!contenedor) return;
    contenedor.innerHTML = "";

    function escribir() {
        if (progreso < texto.length) {
            if (texto.substr(progreso, 4) === "<br>") {
                contenedor.innerHTML += "<br>";
                progreso += 4;
            } else {
                contenedor.innerHTML += texto.charAt(progreso);
                progreso++;
            }
            contenedor.scrollTop = contenedor.scrollHeight;
            setTimeout(escribir, velocidad);
        } else {
            const despedidaContenedor = document.getElementById('bloque-despedida');
            if (despedidaContenedor) despedidaContenedor.classList.remove('oculto');
            
            const btnContinuar = document.getElementById('btn-continuar-sorpresa');
            if (btnContinuar) btnContinuar.classList.remove('oculto');
        }
    }
    escribir();
}

// PASO 4: ENTRAR AL MINIJUEGO DE LA FLECHA
const btnContinuarSorpresa = document.getElementById('btn-continuar-sorpresa');
if (btnContinuarSorpresa) {
    btnContinuarSorpresa.onclick = function() {
        detenerLluviaInfinita(); // Pausa la lluvia para enfocar la puntería
        
        if (pantallaSorpresa) pantallaSorpresa.classList.add('oculto');
        const tarjeta = document.getElementById('tarjeta-principal');
        if (tarjeta) tarjeta.classList.add('oculto');
        
        const pantallaFinal = document.getElementById('pantalla-final-cupido');
        if (pantallaFinal) pantallaFinal.classList.remove('oculto');
    };
}

// MINIJUEGO INTERACTIVO: BLANCO COMPLETADO
function atinarCorazon() {
    document.getElementById('juego-cupido').classList.add('oculto');
    
    const txtPareja = document.getElementById('nombre-pareja-final');
    if (txtPareja) txtPareja.textContent = datosConfiguracion.p;
    
    document.getElementById('mensaje-revelado-final').classList.remove('oculto');
    
    // Reactiva una lluvia masiva e interminable para celebrar
    iniciarLluviaInfinita();
}

// SISTEMA DE LLUVIA DINÁMICA DE CORAZONES ELEGANTE
function crearCorazonIndividual() {
    const contenedor = document.getElementById('contenedor-corazones');
    if (!contenedor) return;

    const corazon = document.createElement('div');
    corazon.className = 'corazon-flotante';
    
    const emojis = ["❤️", "💖", "💘", "💝", "💕"];
    corazon.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    corazon.style.left = Math.random() * 100 + "vw";
    corazon.style.top = "105vh";
    corazon.style.fontSize = Math.random() * 20 + 12 + "px";
    
    corazon.style.setProperty('--desviacion-x', (Math.random() * 80 - 40) + "px");
    corazon.style.setProperty('--rotacion', (Math.random() * 360) + "deg");
    
    const duracion = Math.random() * 3 + 3;
    corazon.style.animationDuration = duracion + "s";

    contenedor.appendChild(corazon);

    setTimeout(() => { corazon.remove(); }, duracion * 1000);
}

function iniciarLluviaInfinita() {
    if (!intervaloLluviaInfinita) {
        intervaloLluviaInfinita = setInterval(crearCorazonIndividual, 180);
    }
}

function detenerLluviaInfinita() {
    if (intervaloLluviaInfinita) {
        clearInterval(intervaloLluviaInfinita);
        intervaloLluviaInfinita = null;
        const contenedor = document.getElementById('contenedor-corazones');
        if (contenedor) contenedor.innerHTML = "";
    }
}
