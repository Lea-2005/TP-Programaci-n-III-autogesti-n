// ===== LOGIN =====
function autocompletarLogin() {
    const botonAutocompletar = document.getElementById("btn-autocompletar");
    if (!botonAutocompletar) return;

    botonAutocompletar.addEventListener("click", () => {
        document.getElementById("correoUsuario").value = "admin@ejemplo.com";
        document.getElementById("contraseniaUsuario").value = "password";
    });
}

// ===== DASHBOARD =====
function cambiarEstado() {
    document.querySelectorAll(".btn-estado").forEach(btn => {
        btn.addEventListener("click", async (evento) => {
            evento.preventDefault();

            const id = btn.dataset.id;
            const activoActual = btn.textContent.trim() === "Desactivar";
            const nuevoEstado = !activoActual;
            const accion = activoActual ? "desactivar" : "activar";

            try {
                const respuesta = await fetch(`/api/productos/admin/${id}`, {
                    method: "PATCH", 
                    headers: { 
                        "Content-Type": "application/json"
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

// ===== EDITAR =====
function configurarEliminacion() {
    const btnEliminar = document.getElementById("btn-eliminar");
    if (!btnEliminar) return;

    btnEliminar.addEventListener("click", async function() {
        const id = this.dataset.id;

        if (!confirm("¿Estás seguro de eliminar este libro?")) return;
    
        try {
            const respuesta = await fetch(`/api/productos/admin/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            const data = await respuesta.json();

            if (respuesta.ok) window.location.href = "/admin/dashboard";
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("Error de conexión al servidor.");
        }
    });
}

// ===== REGISTROS =====
async function cargarEstadisticasHTML() {
    const contenedorEstadistica = document.getElementById("contenedor-estadistica");
    if (!contenedorEstadistica) return;

    try {
        const respuesta = await fetch("/api/ventas/estadisticas");

        if (!respuesta.ok) throw new Error("Error en la respuesta");

        const data = await respuesta.json();
        const estadisticas = data.payload;

        contenedorEstadistica.innerHTML = `
            <div class="tarjeta-estadistica">
                <span>Total de ventas</span>
                <strong>${estadisticas.totalVentas}</strong>
            </div>

            <div class="tarjeta-estadistica">
                <span>Libros vendidos</span>
                <strong>${estadisticas.totalLibrosVendidos}</strong>
            </div>

            <div class="tarjeta-estadistica">
                <span>Promedio por venta</span>
                <strong>$${estadisticas.promedioPrecio.toFixed(2)}</strong>
            </div>

            <div class="tarjeta-estadistica">
                <span>Libros activos</span>
                <strong>${estadisticas.totalLibrosActivos}</strong>
            </div>

            <div class="tarjeta-estadistica">
                <span>Libros inactivos</span>
                <strong>${estadisticas.totalLibrosInactivos}</strong>
            </div>
        `;
    } catch (error) {
        contenedorEstadistica.innerHTML = "<p>Error al cargar estadísticas.</p>";
        console.error("Error en estadísticas:", error);
    }
}

async function cargarTopLibrosHTML() {
    const contenedorTopLibros = document.getElementById("contenedor-top-libros");
    if (!contenedorTopLibros) return;

    try {
        const respuesta = await fetch("/api/ventas/top-libros");

        if (!respuesta.ok) throw new Error("Error en la respuesta.");
        
        const data = await respuesta.json();
        const libros = data.payload;

        if (!libros || libros.length === 0) {
            contenedorTopLibros.innerHTML = "<p>No hay datos de libros vendidos.</p>";
            return;
        }

        let plantillaHTML = `
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Libro</th>
                        <th>Total vendido</th>
                    </tr>
                </thead>
                <tbody>
            `;
        
        libros.forEach((libro, id) => {
            plantillaHTML += `
            <tr>
                <td>${id + 1}</td>
                <td>${libro.titulo}</td>
                <td>${libro.total_vendido || 0}</td>
            </tr>
        `;
        });
        
        plantillaHTML += "</tbody></table>";
        
        contenedorTopLibros.innerHTML = plantillaHTML;
    } catch (error) {
        contenedorTopLibros.innerHTML = "<p>Error al cargar top libros.</p>";
        console.error("Error en top libros:", error);
    }
}

async function cargarTopVentasHTML() {
    const contenedorTopVentas = document.getElementById("contenedor-top-ventas");
    if (!contenedorTopVentas) return;

    try {
        const respuesta = await fetch("/api/ventas/top-ventas");
        if (!respuesta.ok) throw new Error("Error en la respuesta.");
        
        const data = await respuesta.json();
        const ventas = data.payload;

        if (!ventas || ventas.length === 0) {
            contenedorTopVentas.innerHTML = "<p>No hay ventas registradas.</p>";
            return;
        }

        let plantillaHTML = `
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        ventas.forEach((venta, id) => {
            const fecha = new Date(venta.fecha).toLocaleString();

            plantillaHTML += 
            `<tr>
                <td>${id + 1}</td>
                <td>${venta.nombre_usuario}</td>
                <td>$${venta.precio_total}</td>
                <td>${fecha}</td>
            </tr>
        `;
        });
        
        plantillaHTML += "</tbody></table>";
        
        contenedorTopVentas.innerHTML = plantillaHTML;
    } catch (error) {
        contenedorTopVentas.innerHTML = '<p>Error al cargar top ventas.</p>';
        console.error('Error en top ventas:', error);
    }
}

async function cargarRegistrosHTML() {
    const contenedorRegistros = document.getElementById("contenedor-registros");
    if (!contenedorRegistros) return;

    try {
        const respuesta = await fetch("/api/logs/login");

        if (!respuesta.ok) throw new Error("Error en la respuesta.");

        const data = await respuesta.json();
        const registros = data.payload;

        if (!registros || registros.length === 0) {
            contenedorRegistros.innerHTML = "<p>No hay logs de inicio de sesión.</p>";
            return;
        }

        let plantillaHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Fecha</th>
                        </tr>
                </thead>
                <tbody>
            `;
        
        registros.forEach(registro => {
            const fecha = new Date(registro.fecha).toLocaleString();

            plantillaHTML += `
            <tr>
                <td>${registro.usuario_id}</td>
                <td>${registro.email}</td>
                <td>${fecha}</td>
            </tr>
        `;
        });
        
        plantillaHTML += "</tbody></table>";
        
        contenedorRegistros.innerHTML = plantillaHTML;
    } catch (error) {
        contenedorRegistros.innerHTML = "<p>Error al cargar logs.</p>";
        console.error("Error en logs:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.includes("/admin/login") || path.includes("/auth/")) {
        autocompletarLogin();
    }

    if (path.includes("/admin/dashboard")) {
        cambiarEstado();
    }

     if (path.includes("/admin/editar")) {
        configurarEliminacion();
    }

    if (path.includes("/admin/registros")) {
        cargarEstadisticasHTML();
        cargarTopLibrosHTML();
        cargarTopVentasHTML();
        cargarRegistrosHTML();
    }
});
