function actualizarValorSlider() {
    const puntacion = document.getElementById("puntuacion");
    const valorPuntuacion = document.getElementById("valor-puntuacion");

    if (puntacion && valorPuntuacion) {
        puntacion.addEventListener("input", () => {
            valorPuntuacion.textContent = puntacion.value;
        });
    }
}

function configurarValidacionEmail() {
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");

    if (!emailInput || !emailError) return;

    emailInput.addEventListener("input", () => {
        const email = emailInput.value.trim();
        const esValido = validarEmail(email);
        emailError.style.display = esValido ? "none" : "block";
    });
}

async function enviarEncuesta(event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();

    if (!validarEmail(email)) {
        const emailError = document.getElementById("email-error");
        if (emailError) emailError.style.display = "block";
        return;
    }

    // Constructor...
    const data = {
        email: email,
        comentario: document.getElementById("comentario").value.trim(),
        puntuacion: parseInt(document.getElementById("puntuacion").value),
        suscripcion: document.getElementById("suscripcion").checked,
        imagen_url: document.getElementById("imagen_url").value.trim()
    };

    try {
        const respuesta = await fetch("/api/encuestas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            alert("✅ ¡Gracias por tu opinión!");
            
            limpiarLocal();
            window.location.href = '/bienvenida';
        } else {
            alert("❌ - Error:" + (resultado.error || 'Intenta de nuevo'));
        }
    } catch (error) {
        console.error("Error", error);
        alert("❌ - Error de conexión.");
    }
}

function configurarFormulario() {
    const form = document.getElementById("form-encuesta");

    if (form) {
        form.addEventListener("submit", enviarEncuesta);
    }
}

function omitirEncuesta() {
    limpiarLocal();
    window.location.href = "/bienvenida";
}

// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", () => {
    actualizarValorSlider();
    configurarValidacionEmail();
    configurarFormulario();
});