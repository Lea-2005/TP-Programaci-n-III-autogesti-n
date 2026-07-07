// ===== FUNCIONALIDAD DE CAMBIO DE TEMA =====
function configurarTema() {
    const btn = document.getElementById("btn-tema");
    const temaGuardado = localStorage.getItem("tema") || "light";

    if (temaGuardado === "dark") {
        document.body.classList.add("dark-mode");
        btn.textContent = '☀️';
    }

    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const esOscuro = document.body.classList.contains("dark-mode");

        btn.textContent = esOscuro ? '☀️' : '🌑';
        localStorage.setItem("tema", esOscuro ? "dark" : "light");
    });
}


// ===== FUNCIONALIDAD BÁSICA DEL CARRITO =====
function obtenerCarrito() {
    const carritoJSON = localStorage.getItem("carrito");
    if (carritoJSON) {
        return JSON.parse(carritoJSON);
    }
    return [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
    let carrito = obtenerCarrito();
    const producto = carrito.find(item => item.id === id);
    if (!producto) return;
    
    carrito = carrito.filter(item => item.id !== id);

    guardarCarrito(carrito);
    cargarProductosCarrito();
}

function limpiarCarrito() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) return;
    
    localStorage.removeItem("carrito");
    cargarProductosCarrito();
}

function actualizarCantidad(id, nuevaCantidad) {
    let carrito = obtenerCarrito();
    const producto = carrito.find(item => item.id === id);

    if (producto) {
        if (nuevaCantidad <= 0) {
            carrito = carrito.filter(item => item.id !== id);
        } else {
            producto.cantidad = nuevaCantidad;
        }
        guardarCarrito(carrito);
        cargarProductosCarrito();
    }
}

function agregarAlCarrito(libro) {
    console.log(`🛒 - Agregando al carrito: ${libro.titulo}.`);
    
    let carrito = obtenerCarrito();
    const existente = carrito.find(item => item.id === libro.id);
    
    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ ...libro, cantidad: 1 });
    }
    
    guardarCarrito(carrito);
}

// ====== FUNCIONALIDAD PEDIR NOMBRE USAURIO =====
function obtenerNombreUsuario() {
    return localStorage.getItem("nombre_usuario");
}

// ===== LIMPIAR LOCAL (carrito y nombre de usuario) =====
function limpiarLocal() {
    localStorage.removeItem("carrito");
    localStorage.removeItem("nombre_usuario");
    localStorage.removeItem("ultima-venta");
}

function variaCarrito() {
    localStorage.removeItem("carrito");
    localStorage.removeItem("ultima-venta");
}

// ===== FUNCIONALIDAD DE VALIDAR SESIÓN EN BIENVENIDA =====
function validarSesion() {
    const nombre = localStorage.getItem("nombre_usuario");

    if (window.location.pathname !== "/bienvenida" && !nombre) {
        window.location.href = "/bienvenida";
        return false;
    }
    return true;
}

// ===== VALIDACIÓN DE EMAIL CON UNA EXPRESIÓN REGULAR =====
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", () => {
    if (!validarSesion()) return;
    
    configurarTema();
});