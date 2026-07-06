// ===== DATOS INICIALES =====
const LIBROS_POR_PAGINA = 20;

let listaLibros = [];
let listaLibrosFiltrados = [];
let generoActual = "todos";
let paginaActual = 1;
let totalPaginas = 1;

// ===== FUNCIÓN DE API =====
async function cargarLibrosActivos () {
    const contenedorLibros = document.getElementById("contenedor-libros");
    
    try {
        const respuesta = await fetch("/api/productos");

        if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

        const data = await respuesta.json();
        listaLibros = data.payload || [];

        listaLibrosFiltrados = [...listaLibros];

        totalPaginas = Math.ceil(listaLibrosFiltrados.length / LIBROS_POR_PAGINA) || 1;
        paginaActual = 1;

        renderizarPagina();
    } catch (error) {
        console.error("Error al cargar libros:", error);

        contenedorLibros.innerHTML = `<p class="error">📛 No se pudieron cargar los libros.</p>`;

        document.querySelectorAll(".contenedor-paginacion").forEach(p => p.innerHTML = "");
    }
}

// ===== LÓGICA DE FILTRADO =====
function aplicarFiltros () {
    listaLibrosFiltrados = obtenerLibrosFiltrados();
    totalPaginas = Math.ceil(listaLibrosFiltrados.length / LIBROS_POR_PAGINA) || 1;

    if (paginaActual > totalPaginas) paginaActual = 1;

    renderizarPagina();
}

// Lógica separada...
function obtenerLibrosFiltrados() {
    const textoBuscador = document.getElementById("buscador").value.toLowerCase().trim();

    // Aplicando filtro por género (con operador ternario).
    let filtrados = (generoActual === "todos") 
    ? [...listaLibros] 
    : listaLibros.filter(libro => libro.genero && libro.genero.toLowerCase().trim() === generoActual);

    // Aplicando filtro por título (sobre los libros filtrados).
    if (textoBuscador) {
        filtrados = listaLibrosFiltrados.filter(libro => libro.titulo.toLowerCase().includes(textoBuscador));
    }

    return filtrados;
}

// ===== LÓGICA DE RENDERIZADO =====
function renderizarLibros(libros) {
    const contenedorLibros = document.getElementById("contenedor-libros");
    
    if (!libros || libros.length === 0) {
        contenedorLibros.innerHTML = `<p>📛 No hay libros disponibles en esta categoría.</p>`;
        return;
    }
    
    let plantillaHTML = "";
    libros.forEach(libro => {
        plantillaHTML += `
        <div class="tarjeta-libro" data-id="tarjeta-${libro.id}" data-genero="${libro.genero}">
            <img src="${libro.imagen}" alt="${libro.titulo}">
            <h3>${libro.titulo}</h3>
            <p class="libro-genero">Género: ${libro.genero}</p>
            <p class="libro-precio">Precio: $${libro.precio}</p>

            <div class="libro-acciones">
                <button class="btn-restar" data-id="${libro.id}">-</button>
                <button class="btn-sumar" data-id="${libro.id}">+</button>
            </div>

            <a href="/productos/detalle">Ver detalles</a>
        </div>
        `;
    });
    contenedorLibros.innerHTML = plantillaHTML;
    configurarBotonesCarrito();
}

function generarHTMLPaginacion(inicio, fin, total) {
    let plantillaHTML = `
    <div class="paginacion-tarjeta">
        <div class="paginacion-info">
            <p>Mostrando <span>${inicio}</span>-<span>${fin}</span> de <span>${total}</span> libros.</p>
        </div>

        <div class="paginacion-botones">
            <button class="btn-pagina" onclick="irPagina(1)" ${paginaActual === 1 ? 'disabled' : ''}>«</button>
            <button class="btn-pagina" onclick="cambiarPagina(-1)" ${paginaActual === 1 ? 'disabled' : ''}>‹</button>
    `;

    const inicioNumero = Math.max(1, (paginaActual -2));
    const finNumero = Math.min(totalPaginas, (paginaActual + 2));

    for (let i = inicioNumero; i <= finNumero; i++) {
        const activo = i === paginaActual ? "activo" : "";
        plantillaHTML += `
                <button class="btn-numero ${activo}" onclick="irPagina(${i})">${i}</button>
        `;
    }

    plantillaHTML += `
            <button class="btn-pagina" onclick="cambiarPagina(1)" ${paginaActual === totalPaginas ? "disabled" : ""}>›</button>
            <button class="btn-pagina" onclick="irPagina(${totalPaginas})" ${paginaActual === totalPaginas ? "disabled" : ""}>»</button>
        </div>
    </div>
    `;

    return plantillaHTML;
}

function actualizarPaginacion() {
    const total = listaLibrosFiltrados.length;

    if (total === 0) {
        document.querySelectorAll(".contenedor-paginacion").forEach(p => p.innerHTML = "");
        return;
    }

    const inicio = (paginaActual - 1) * LIBROS_POR_PAGINA + 1;
    const fin = Math.min((paginaActual * LIBROS_POR_PAGINA), total);

    const plantillaHTML = generarHTMLPaginacion(inicio, fin, total);

    document.querySelectorAll(".contenedor-paginacion").forEach(p => p.innerHTML = plantillaHTML);
}

function renderizarPagina() {
    const inicio = (paginaActual - 1) * LIBROS_POR_PAGINA;
    const fin = Math.min((inicio + LIBROS_POR_PAGINA), listaLibrosFiltrados.length);
    const paginaLibros = listaLibrosFiltrados.slice(inicio, fin);
    
    renderizarLibros(paginaLibros);
    actualizarPaginacion();
}

// ===== FUNCIONALIDAD DE CAMBIO DE PÁGINA =====
function irPagina (numero) {
    if (numero < 1 || numero > totalPaginas) return;

    paginaActual = numero;
    renderizarPagina();
    document.querySelector("main").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function cambiarPagina(delta) {
    const nueva = paginaActual + delta;
    if (nueva < 1 || nueva > totalPaginas) return;

    paginaActual = nueva;
    renderizarPagina();
    document.querySelector("main").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// ===== FUNCIONALIDAD DEL CARRITO =====
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function obtenerCarrito() {
    const carritoJSON = localStorage.getItem("carrito");
    if (carritoJSON) {
        return JSON.parse(carritoJSON);
    }
    return [];
}

function agregarAlCarrito(libro) {
    let carrito = obtenerCarrito();
    const existente = carrito.find(item => item.id === libro.id);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ ...libro, cantidad: 1 });
    }

    guardarCarrito(carrito);
}

function removerDelCarrito(id) {
    let carrito = obtenerCarrito();
    const existente = carrito.find(item => item.id === id);

    if (existente) {
        if (existente.cantidad > 1) {
            existente.cantidad -= 1;
            guardarCarrito(carrito);
        } else {
            carrito = carrito.filter(item => item.id !== id);
            guardarCarrito(carrito);
        }
    }
}

// ===== CONFIGURACIÓN DE BOTONES =====
function configurarBotonesCarrito() {
    document.querySelectorAll(".btn-sumar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.dataset.id);
            const libro = listaLibros.find(unidad => unidad.id === id);

            if (libro) agregarAlCarrito(libro);
        });
    });

    document.querySelectorAll(".btn-restar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.dataset.id);

            removerDelCarrito(id);
        });
    });
}

function configurarBotonesCategorias() {
    const botones = document.querySelectorAll(".categoria-btn");
    const buscador = document.getElementById("buscador");

    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            botones.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            generoActual = btn.dataset.categoria.toLowerCase();

            buscador.value = "";
            aplicarFiltros();
        });
    });
}

function configurarBuscador() {
    const buscador = document.getElementById("buscador");
    buscador.addEventListener("input", aplicarFiltros);
}

// ===== VALIDACIÓN DEL NOMBRE =====
function validarSesion() {
    const nombre = localStorage.getItem("nombre_usuario");

    if (!nombre) {
        window.location.href = "/bienvenida";
        return false;
    }

    return true;
}

// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", () => {
    if (!validarSesion()) return;

    cargarLibrosActivos();
    configurarBotonesCategorias();
    configurarBuscador();
});

window.cambiarPagina = cambiarPagina;
window.irPagina = irPagina;