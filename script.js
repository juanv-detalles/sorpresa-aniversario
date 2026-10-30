const mensajePredeterminado = `❤️🌹 ¡PARA LA PERSONA MÁS ESPECIAL DEL MUNDO! 🌹❤️<br><br>✨ ¡Felicidades! Si lograste entrar aquí es porque recordabas con exactitud esa fecha tan nuestra... Esa fecha mágica que marcó un antes y un después definitivo en nuestras vidas. Fue el día exacto en que nuestros caminos se cruzaron, el instante en que todo comenzó y en el que decidimos, con toda la ilusión del universo, empezar a escribir nuestra propia historia de amor de la mano. ✨<br><br>Mirar atrás y recordar ese momento me llena de una alegría inmensa, porque entendí que fue el inicio del viaje más maravilloso, loco y bonito de toda mi vida. 🥹❤️<br><br>Quiero aprovechar esta pequeña gran sorpresa para recordarte lo muchísimo que significas para mí y el lugar tan sagrado que ocupas en mis días. A veces el tiempo avanza muy rápido, pero hoy me detengo para decirte lo que dicta mi corazón: ¡GRACIAS!<br><br>❤️ Gracias por cada sonrisa compartida.<br>❤️ Gracias por cada abrazo sincero en los momentos en que más lo necesitaba.<br>❤️ Gracias por tu paciencia infinita, tu ternura y el hermoso regalo de tu presencia.<br>❤️ Gracias por hacer que mi mundo sea un lugar brillante, feliz y lleno de paz.<br><br>Cada detalle tuyo, cada conversación nocturna y cada segundo a tu lado es un tesoro invaluable que guardo bajo llave en lo más profundo de mi ser. No cambiaría por nada de este planeta absolutamente nada de lo que hemos construido juntos: las risas cómplices, las metas que planeamos en voz alta, las pequeñas locuras y esa hermosa conexión que solo nosotros dos entendemos. Me fascina ver cómo crecemos juntos y cómo nos apoyamos en cada paso que damos.<br><br>Eres mi persona favorita, mi refugio seguro contra todo lo malo, mi paz en medio de la tormenta, mi complemento perfecto y la razón de mis sonrisas más honestas y transparentes. Gracias por ser tú, por no rendirte y por enseñarme lo hermoso que es amar y ser amado sin condiciones. 🧸💞<br><br>Te amo con todas las fuerzas de mi alma, hoy, mañana y para toda la eternidad. ✨🌌`;

const pantallaConfig = document.getElementById('pantalla-config');
const pantallaCompartir = document.getElementById('pantalla-compartir');
const pantallaValidar = document.getElementById('pantalla-validar');
const pantallaSorpresa = document.getElementById('pantalla-sorpresa');

let fotosCargadasBase64 = [];

const inputFotos = document.getElementById('config-fotos');
if (inputFotos) {
    inputFotos.addEventListener('change', function(e) {
        const archivos = e.target.files;
        const vistaPrevia = document.getElementById('vista-previa-imagenes');
        vistaPrevia.innerHTML = "";
        fotosCargadasBase64 = [];

        const cantidad = Math.min(archivos.length, 4);
        for(let i = 0; i < cantidad; i++) {
            const lector = new FileReader();
            lector.onload = function(evento) {
                fotosCargadasBase64.push(evento.target.result);
                const miniImg = document.createElement('img');
                miniImg.src = evento.target.result;
                miniImg.style.width = "50px";
                miniImg.style.height = "50px";
                miniImg.style.objectFit = "cover";
                miniImg.style.borderRadius = "5px";
                vistaPrevia.appendChild(miniImg);
            }
            lector.readAsDataURL(archivos[i]);
        }
    });
}

// PASO 1: GENERAR LINK DE FORMA SEGURA
const btnGenerar = document.getElementById('btn-generar');
if (btnGenerar) {
    btnGenerar.onclick = function(e) {
        e.preventDefault();

        const dia = document.getElementById('config-dia').value;
        const mes = document.getElementById('config-mes').value;
        const anio = document.getElementById('config-anio').value;
        const nombre = document.getElementById('config-nombre').value;

        if (!dia || !mes || !anio || !nombre) {
            alert("Por favor rellena la fecha completa y tu nombre.");
            return;
        }

        const fechaFinal = `${dia}-${mes}-${anio}`;
        localStorage.setItem('fotos_sorpresa', JSON.stringify(fotosCargadasBase64));

        const payload = { f: fechaFinal, n: nombre };
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

const parametrosUrl = new URLSearchParams(window.location.search);
const datosSorpresaCargados = parametrosUrl.get('s');
let configuracionRecibida = null;

if (datosSorpresaCargados) {
    if (pantallaConfig) pantallaConfig.classList.add('oculto');
    if (pantallaValidar) pantallaValidar.classList.remove('oculto');
    try {
        configuracionRecibida = JSON.parse(decodeURIComponent(escape(atob(datosSorpresaCargados))));
    } catch(e) {
        alert("El enlace compartido no es válido.");
    }
}

// PASO 3: VALIDACIÓN DE LA FECHA POR LA PAREJA
const btnVerificar = document.getElementById('btn-verificar');
if (btnVerificar) {
    btnVerificar.onclick = function() {
        const dia = document.getElementById('adivinar-dia').value;
        const mes = document.getElementById('adivinar-mes').value;
        const anio = document.getElementById('adivinar-anio').value;
        const fechaIntento = `${dia}-${mes}-${anio}`;

        if (!configuracionRecibida) return;

        if (fechaIntento === configuracionRecibida.f) {
            const errorMsg = document.getElementById('error-mensaje');
            if (errorMsg) errorMsg.classList.add('oculto');
            if (pantallaValidar) pantallaValidar.classList.add('oculto');
            if (pantallaSorpresa) pantallaSorpresa.classList.remove('oculto');

            const despedidaContenedor = document.getElementById('bloque-despedida');
            if (despedidaContenedor) {
                despedidaContenedor.style.opacity = "0";
                despedidaContenedor.classList.remove('oculto');
            }

            const remitente = document.getElementById('remitente-carta');
            if (remitente) remitente.textContent = configuracionRecibida.n;

            setTimeout(() => {
                maquinaDeEscribirLetras(mensajePredeterminado, 'texto-carta', 35);
            }, 300);

            lanzarLluviaCorazones();
            const intervaloCorazones = setInterval(lanzarLluviaCorazones, 1500);
            setTimeout(() => clearInterval(intervaloCorazones), 7000);

            let fotosReales = JSON.parse(localStorage.getItem('fotos_sorpresa')) || [];
            
            if (fotosReales.length === 0) {
                fotosReales = [
                    "https://unsplash.com",
                    "https://unsplash.com",
                    "https://unsplash.com",
                    "https://unsplash.com"
                ];
            }

            const gridFinal = document.getElementById('fotos-finales-grid');
            if (gridFinal) {
                gridFinal.innerHTML = "";
                // CORREGIDO: Bucle for limpio y sin variables colisionadas
                for (let m = 0; m < 9; m++) {
                    const imgUrl = fotosReales[m % fotosReales.length];
                    gridFinal.innerHTML += `<img src="${imgUrl}">`;
                }
            }
        } else {
            const errorMsg = document.getElementById('error-mensaje');
            if (errorMsg) errorMsg.classList.remove('oculto');
        }
    };
}

function maquinaDeEscribirLetras(texto, elementoId, velocidad) {
    const contenedor = document.getElementById(elementoId);
    if (!contenedor) return;
    let i = 0;
    contenedor.innerHTML = "";

    function escribir() {
        if (i < texto.length) {
            if (texto.substr(i, 4) === "<br>") { contenedor.innerHTML += "<br>"; i += 4; }
            else if (texto.substr(i, 8) === "<br><br>") { contenedor.innerHTML += "<br><br>"; i += 8; }
            else { contenedor.innerHTML += texto.charAt(i); i++; }
            
            const cartaContenedor = document.querySelector('.carta');
            if (cartaContenedor) cartaContenedor.scrollTop = cartaContenedor.scrollHeight;
            setTimeout(escribir, velocidad);
        } else {
            const despedidaContenedor = document.getElementById('bloque-despedida');
            if (despedidaContenedor) {
                despedidaContenedor.style.transition = "opacity 1.5s ease";
                despedidaContenedor.style.opacity = "1";
            }
            const btnContinuar = document.getElementById('btn-continuar');
            if (btnContinuar) btnContinuar.classList.remove('oculto');
        }
    }
    escribir();
}

const btnContinuar = document.getElementById('btn-continuar');
if (btnContinuar) {
    btnContinuar.onclick = function() {
        const juegoCupido = document.getElementById('juego-cupido');
        if (juegoCupido) juegoCupido.classList.remove('oculto');
        btnContinuar.classList.add('oculto');
        juegoCupido.scrollIntoView({ behavior: 'smooth' });
    };
}

const sliderFlecha = document.getElementById('slider-flecha');
if (sliderFlecha) {
