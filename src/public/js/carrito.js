// ===== LÓGICA DE RENDERIZADO =====
function generarHTMLProductos(carrito) {
    let plantillaHTML = "";

    carrito.forEach(libro => {
        const subtotal = libro.precio * libro.cantidad;

        let opciones = "";
        for (let i = 1; i <= 10; i++) {
            opciones += `<option value="${i}" ${i === libro.cantidad ? "selected" : ""}>${i}</option>`;
        }

        plantillaHTML += `
            <div class="producto-carrito" data-id="${libro.id}">
                <img src="${libro.imagen}" alt="${libro.titulo}" class="producto-imagen">

                <div class="producto-info">
                    <h3 class="producto-titulo">${libro.titulo}</h3>
                    <p class="producto-genero">${libro.genero}</p>
                    <p class="producto-precio-unitario">Precio unitario: $${libro.precio}</p>

                    <div class="producto-controles">
                        <label>Cantidad:
                            <select class="select-cantidad" data-id="${libro.id}">
                                ${opciones}
                            </select>
                        </label>
                        <button class="btn-eliminar-producto" data-id="${libro.id}">Eliminar</button>
                    </div>

                    <p class="producto-subtotal">Subtotal: $${subtotal}</p>
                </div>
            </div>
        `;
    });
    return plantillaHTML;
}

function generarHTMLResumen(total) {
    return `
        <div class="resumen-pedido">
            <h3>Resumen del pedido</h3>

            <div class="resumen-linea">
                <span>Productos:</span>
                <span>$${total}</span>
            </div>

            <div class="resumen-linea total">
                <strong>Total a pagar:</strong>
                <strong>$${total}</strong>
            </div>

            <div class="resumen-acciones">
                <a href="/ticket" class="btn-finalizar">Finalizar compra</a>
                <button class="btn-limpiar-carrito">Limpiar carrito</button>
            </div>
        </div>
    `;
}

function cargarProductosCarrito() {
    const contenedorCarrito = document.getElementById("contenedor-carrito");
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `
            <div class="carrito-vacio">
                <h3>No tenés productos en el carrito. ¿Todavía no encontrás lo que buscas?</h3>
                <p>Explora nuestros libros acá:</p>
                <a href="/productos/">Ir a la tienda</a>
            </div>
        `;
        return;
    }

    const totalGeneral = carrito.reduce((acc, libro) => acc + (libro.precio * libro.cantidad), 0);

    const htmlProductos = generarHTMLProductos(carrito);
    const htmlResumen = generarHTMLResumen(totalGeneral);

    contenedorCarrito.innerHTML = `
        <div class="carrito-tarjeta">
            <div class="carrito-lista">
                ${htmlProductos}
            </div>
            <div class="carrito-resumen">
                ${htmlResumen}
            </div>
        </div>
    `;

    configurarEventosCarrito();
}

// ===== FUNCIONALIDAD DE LOS EVENTOS DEL CARRITO =====
function configurarEventosCarrito() {
    document.querySelectorAll(".select-cantidad").forEach(select => {
        select.addEventListener("change", (evento) => {
            const id = parseInt(evento.target.dataset.id);
            const nuevaCantidad = parseInt(evento.target.value);

            actualizarCantidad(id, nuevaCantidad);
        });
    });

    document.querySelectorAll(".btn-eliminar-producto").forEach(boton => {
        boton.addEventListener("click", (evento) => {
            const id = parseInt(evento.target.dataset.id);

            eliminarProducto(id);
        });
    });

    const btnLimpiar = document.querySelector(".btn-limpiar-carrito");
    if (btnLimpiar) {
        btnLimpiar.addEventListener("click", limpiarCarrito);
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", () => {
    cargarProductosCarrito();
});
