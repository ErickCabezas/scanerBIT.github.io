/* ============================================
   ESCÁNER QR - BUSINESS IT
   Archivo JavaScript
   ============================================ */

let html5QrCode = null;

// ⚠️ IMPORTANTE: Reemplaza esta URL con la URL de tu Power Automate Flow
const FLOW_URL = "https://default2488499668634925a1baf1a160b581.e2.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/750860d6bf9f49d186b05613e59ec098/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xdzwDGeUcD7Rx7jNcXtzXu-KE5nD-S_O3qkE2hY8aOc";

/* ============================================
   FUNCIÓN: Iniciar Escáner
   ============================================ */
function iniciarEscaner() {
    // Ocultar resultado anterior
    document.getElementById('resultado').classList.remove('show');
    
    // Mostrar área de escáner
    document.getElementById('reader').style.display = 'block';
    
    // Cambiar botones
    document.getElementById('btnIniciar').style.display = 'none';
    document.getElementById('btnDetener').style.display = 'block';

    html5QrCode = new Html5Qrcode("reader");

    const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 }
    };

    html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
            // QR escaneado exitosamente
            verificarQR(decodedText);
            detenerEscaner();
        },
        (errorMessage) => {
            // Ignorar errores de escaneo continuo
        }
    ).catch((err) => {
        console.error("Error al iniciar cámara:", err);
        mostrarError("No se pudo acceder a la cámara. Por favor verifica los permisos.");
        detenerEscaner();
    });
}

/* ============================================
   FUNCIÓN: Detener Escáner
   ============================================ */
function detenerEscaner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            document.getElementById('reader').style.display = 'none';
            document.getElementById('btnIniciar').style.display = 'block';
            document.getElementById('btnDetener').style.display = 'none';
            html5QrCode = null;
        }).catch((err) => {
            console.error("Error al detener escáner:", err);
        });
    }
}

/* ============================================
   FUNCIÓN: Verificar QR con Power Automate
   ============================================ */
async function verificarQR(codigo) {
    // Mostrar loading
    document.getElementById('loading').classList.add('show');
    document.getElementById('resultado').classList.remove('show');

    try {
        // Llamar al Power Automate Flow
        const response = await fetch(FLOW_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                codigoQR: codigo
            })
        });

        if (!response.ok) {
            throw new Error('Error en la comunicación con el servidor');
        }

        const data = await response.json();
        
        // Ocultar loading
        document.getElementById('loading').classList.remove('show');
        
        // Mostrar resultado
        mostrarResultado(data, codigo);

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loading').classList.remove('show');
        mostrarError('Error al verificar el código. Por favor intenta nuevamente.');
    }
}

/* ============================================
   FUNCIÓN: Mostrar Resultado
   ============================================ */
function mostrarResultado(data, codigo) {
    const resultadoDiv = document.getElementById('resultado');
    let html = '';
    let className = '';

    if (!data.valido) {
        // QR NO VÁLIDO
        className = 'result-error';
        html = `
            <div class="result-icon">❌</div>
            <div class="result-title">CÓDIGO NO VÁLIDO</div>
            <div class="result-message">Este código QR no existe en el sistema</div>
            <div class="result-details">
                <p><strong>Código escaneado:</strong> ${codigo}</p>
            </div>
        `;
    } else if (data.usado) {
        // QR YA USADO
        className = 'result-used';
        const fechaUso = data.fechaUso ? new Date(data.fechaUso).toLocaleString('es-EC') : 'No disponible';
        html = `
            <div class="result-icon">⚠️</div>
            <div class="result-title">QR YA UTILIZADO</div>
            <div class="result-message">${data.mensaje}</div>
            <div class="result-details">
                <p><strong>Código:</strong> ${codigo}</p>
                <p><strong>Descripción:</strong> ${data.descripcion || 'Sin descripción'}</p>
                <p><strong>Usuario:</strong> ${data.usuario || 'No disponible'}</p>
                <p><strong>Fecha de uso:</strong> ${fechaUso}</p>
            </div>
        `;
    } else {
        // QR VÁLIDO Y DISPONIBLE
        className = 'result-success';
        const fechaUso = new Date().toLocaleString('es-EC');
        html = `
            <div class="result-icon">✅</div>
            <div class="result-title">QR VÁLIDO</div>
            <div class="result-message">${data.mensaje}</div>
            <div class="result-details">
                <p><strong>Código:</strong> ${codigo}</p>
                <p><strong>Descripción:</strong> ${data.descripcion || 'Sin descripción'}</p>
                <p><strong>Usuario:</strong> ${data.usuario || 'No disponible'}</p>
                <p><strong>Marcado como usado:</strong> ${fechaUso}</p>
            </div>
        `;
    }

    resultadoDiv.className = 'result ' + className + ' show';
    resultadoDiv.innerHTML = html;
}

/* ============================================
   FUNCIÓN: Mostrar Error
   ============================================ */
function mostrarError(mensaje) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.className = 'result result-error show';
    resultadoDiv.innerHTML = `
        <div class="result-icon">⚠️</div>
        <div class="result-title">ERROR</div>
        <div class="result-message">${mensaje}</div>
    `;
}

/* ============================================
   EVENTO: Al cargar la página
   ============================================ */
window.onload = function() {
    // Verificar que la URL del Flow esté configurada
    if (FLOW_URL === "TU_URL_DEL_FLOW_AQUI") {
        mostrarError('⚠️ El escáner no está configurado. Por favor contacta al administrador.');
        document.getElementById('btnIniciar').disabled = true;
    }
};