const mensajePredeterminado = `❤️🌹 ¡PARA LA PERSONA MÁS ESPECIAL DEL MUNDO! 🌹❤️<br><br>✨ ¡Felicidades! Si lograste entrar aquí es porque recordabas con exactitud esa fecha tan nuestra... Esa fecha mágica que marcó un antes y un después definitivo en nuestras vidas. Fue el día exacto en que nuestros caminos se cruzaron, el instante en que todo comenzó y en el que decidimos, con toda la ilusión del universo, empezar a escribir nuestra propia historia de amor de la mano. ✨<br><br>Mirar atrás y recordar ese momento me llena de una alegría inmensa, porque entendí que fue el inicio del viaje más maravilloso, loco y bonito de toda mi vida. 🥹❤️<br><br>Quiero aprovechar esta pequeña gran sorpresa para recordarte lo muchísimo que significas para mí y el lugar tan sagrado que ocupas en mis días. A veces el tiempo avanza muy rápido, pero hoy me detengo para decirte lo que dicta mi corazón: ¡GRACIAS!<br><br>❤️ Gracias por cada sonrisa compartida.<br>❤️ Gracias por cada abrazo sincero en los momentos en que más lo necesitaba.<br>❤️ Gracias por tu paciencia infinita, tu ternura y el hermoso regalo de tu presencia.<br>❤️ Gracias por hacer que mi mundo sea un lugar brillante, feliz y lleno de paz.<br><br>Cada detalle tuyo, cada conversación nocturna y cada segundo a tu lado es un tesoro invaluable que guardo bajo llave en lo más profundo de mi ser. No cambiaría por nada de este planeta absolutamente nada de lo que hemos construido juntos: las risas cómplices, las metas que planeamos en voz alta, las pequeñas locuras y esa hermosa conexión que solo nosotros dos entendemos. Me fascina ver cómo crecemos juntos y cómo nos apoyamos en cada paso que damos.<br><br>Eres mi persona favorita, mi refugio seguro contra todo lo malo, mi paz en medio de la tormenta, mi complemento perfecto y la razón de mis sonrisas más honestas y transparentes. Gracias por ser tú, por no rendirte y por enseñarme lo hermoso que es amar y ser amado sin condiciones. 🧸💞<br><br>Te amo con todas las fuerzas de mi alma, hoy, mañana y para toda la eternidad. ✨🌌`;

const pantallaConfig = document.getElementById('pantalla-config');
const pantallaCompartir = document.getElementById('pantalla-compartir');
const pantallaValidar = document.getElementById('pantalla-validar');
const pantallaSorpresa = document.getElementById('pantalla-sorpresa');

const btnGenerar = document.getElementById('btn-generar');
if (btnGenerar) {
    btnGenerar.onclick = function(e) {
        e.preventDefault();

        const dia = document.getElementById('config-dia').value;
        const mes = document.getElementById('config-mes').value;
        const anio = document.getElementById('config-anio').value;
        const nombre = document.getElementById('config-nombre').value;

        const img1 = document.getElementById('foto-url-1').value || "";
        const img2 = document.getElementById('foto-url-2').value || "";
        const img3 = document.getElementById('foto-url-3').value || "";
        const img4 = document.getElementById('foto-url-4').value || "";

        if (!dia || !mes || !anio || !nombre) {
            alert("Por favor rellena la fecha completa y tu nombre.");
            return;
        }

        const payload = {
            f: `${dia}-${mes}-${anio}`,
            n: nombre,
            i1: img1, i2: img2, i3: img3, i4: img4
        };

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

            const f1 = configuracionRecibida.i1 || "https://unsplash.com";
            const f2 = configuracionRecibida.i2 || "https://unsplash.com";
            const f3 = configuracionRecibida.i3 || "https://unsplash.com";
            const f4 = configuracionRecibida.i4 || "https://unsplash.com";

            const gridFinal = document.getElementById('fotos-finales-grid');
            if (gridFinal) {
                gridFinal.innerHTML = `
                    <img src="${f1}"><img src="${f2}"><img src="${f3}"><img src="${f4}">
                    <img src="${f1}"><img src="${f2}"><img src="${f3}"><img src="${f4}"><img src="${f1}">
                `;
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
    sliderFlecha.oninput = function() {
        const objetivo = document.getElementById('objetivo-corazon');
        if (objetivo) objetivo.style.transform = `scale(${1 + (sliderFlecha.value / 150)})`;

        if (parseInt(sliderFlecha.value) === 100) {
            sliderFlecha.disabled = true;
            if (objetivo) objetivo.textContent = "💥💘❤️";

            for (let k = 0; k < 4; k++) {
                setTimeout(lanzarLluviaCorazones, k * 300);
            }

            setTimeout(() => {
                const juegoCupido = document.getElementById('juego-cupido');
                if (juegoCupido) juegoCupido.add ? juegoCupido.classList.add('oculto') : juegoCupido.setAttribute('class', 'oculto');
                
                const galeria = document.getElementById('galeria-fotos');
                if (galeria) galeria.classList.remove('oculto');
                
                armarCollageCorazon();
            }, 1200);
        }
    };
}

function armarCollageCorazon() {
    const coordenadasCorazon = [
        {r:1, c:2}, {r:1, c:4},
        {r:2, c:1}, {r:2, c:2}, {r:2, c:3}, {r:2, c:4}, {r:2, c:5},
        {r:3, c:2}, {r:3, c:3}, {r:3, c:4},
