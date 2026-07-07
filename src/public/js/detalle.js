// ===== LÓGICA DE RENDERIZADO ===== 
async function cargarDetalleProducto() {
    const contenedorDetalle = document.getElementById("contenedor-detalle");
    const ruta = window.location.pathname;
    const id = ruta.split('/').pop();

    if (!id || isNaN(id)) {
        contenedorDetalle.innerHTML = `<p class="error">❌ - ID inválido.</p>`;
        return;
    }

    try {
        const respuesta = await fetch(`/api/productos/${id}`);

        if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

        const data = await respuesta.json();
        const libro = data.payload;

        if (!libro) {
            contenedorDetalle.innerHTML = `<p class="error">❌ - Libro no encontrado.</p>`
            return;
        }

        contenedorDetalle.innerHTML = generarHTMLDetalle(libro);
    } catch (error) {
        console.error("Error al cargar detalle:", error);
        contenedorDetalle.innerHTML = `<p class="error">❌ - Error al cargar el libro.</p>`;
    }
}

function generarHTMLDetalle(libro) {
    return `
    <div class="detalle-libro">
        <img src="${libro.imagen}" alt="${libro.titulo}">

        <div class="detalle-info">
            <h2>${libro.titulo}</h2>
            <p><strong>Género:</strong> ${libro.genero}</p>
            <p><strong>ID:</strong> ${libro.id}</p>
            <p class="precio">Precio: $${libro.precio}</p>
        </div>
    </div>`;
}

// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("btn-volver").addEventListener("click", () => {
        window.history.back();
    });

    cargarDetalleProducto();
});