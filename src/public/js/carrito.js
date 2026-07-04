function obtenerCarrito() 
{
    const carritoJSON = localStorage.getItem("carrito");
    if (carritoJSON) {
        return JSON.parse(carritoJSON);
    }
    return [];
}

function cargarProductosCarrito() {
    const contenedor = document.getElementById("contenedor-carrito");
    const carrito = obtenerCarrito();
    let plantillaHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <h3>No tenés productos en el carrito. ¿Todavía no encontrás lo que buscas?</h3>
                <p>Explora nuestros libros acá:</p>
                <a href="/productos/">Ir a la tienda</a>
            </div>
        `;
        return;
    } 

    carrito.forEach(libro => {
        const subtotal = libro.precio * libro.cantidad;
        total += subtotal;

        plantillaHTML += `
            <div class="tarjeta-carrito" data-id="${libro.id}">
                <img src="${libro.imagen}" alt="${libro.titulo}">
               
                <h3 class="libro-titulo">${libro.titulo}</h3>
                <p class="libro-genero">${libro.genero}</p>
                <p class="libro-precio">$${libro.precio}</p>

                <div class="carrito-acciones">
                    <button class="btn-restar" data-id="${libro.id}">-</button>
                    <span>${libro.cantidad}</span>
                    <button class="btn-sumar" data-id="${libro.id}">+</button>
                    <button class="btn-borrar-producto" data-id="${libro.id}">🗑</button>
                </div>
        `;
    });

    plantillaHTML += `
        <div class="carrito-resumen">
            <h2 id="valor-final">El valor final a pagar es de: $${total}</h2>
            <button class="btn-limpiar-carrito">Limpiar carrito</button>
            <a href="/ticket">Ver ticket (finalizar compra)</a>
        </div>
    `;

    contenedor.innerHTML += plantillaHTML;
}

function limpiarCarrito()  {    
    // Validando para mostrar mensaje por si el carrito ya se encuentra vacío.
    let carrito = obtenerCarrito();

    if (carrito.length > 0) {
        localStorage.removeItem("carrito");
        cargarProductosCarrito();
    } 
}

// Asociar evento al botón cuando la página carga 
window.addEventListener("DOMContentLoaded", () => {
    cargarProductosCarrito();
    
    const btnLimpiar = document.querySelector(".btn-limpiar-carrito");
    if (btnLimpiar) {
        btnLimpiar.addEventListener("click", limpiarCarrito);
    }
});