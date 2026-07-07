function autocompletarLogin() {
    const botonAutocompletar = document.getElementById("btn-autocompletar");
    if (!botonAutocompletar) return;

    botonAutocompletar.addEventListener("click", () => {
        document.getElementById("correoUsuario").value = "admin@ejemplo.com";
        document.getElementById("contraseniaUsuario").value = "password";
    });
}

function cambiarEstado() {
    document.querySelectorAll(".btn-estado").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();

            const id = btn.dataset.id;
            const activoActual = btn.textContent.trim() === "Desactivar";
            const nuevoEstado = !activoActual;
            const accion = activoActual ? "desactivar" : "activar";

            try {
                const respuesta = await fetch(`/api/productos/admin/${id}`, {
                    method: "PATCH", // 
                    headers: { 
                        "Content-Type": "application/json" //
                    },
                    body: JSON.stringify({ activo: nuevoEstado })
                });

                const data = await respuesta.json();

                if (respuesta.ok) {
                    location.reload(); 
                } else {
                    alert(`Error: ${data.error}`);
                }
            } catch (error) {
                console.error("Error al cambiar estado:", error);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.includes("/admin/login") || path.includes("/auth/")) {
        autocompletarLogin();
    }

    if (path.includes("/admin/dashboard")) {
        cambiarEstado();
    }
});
