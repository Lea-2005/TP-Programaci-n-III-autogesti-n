// ===== DATOS INICIALES =====
const LIBROS_POR_PAGINA = 20;

let listaLibros = [];
let listaLibrosFiltrados = [];
let generoActual = "todos";
let paginaActual = 1;
let totalPaginas = 1;

// ===== FUNCIÓN DE API =====
async function cargarLibrosActivos() {
    const contenedorLibros = document.getElementById("contenedor-libros");
    console.log(`📚 - Cargando libros activos...`);

    try {
        const respuesta = await fetch("/api/productos");

        if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

        const data = await respuesta.json();

        console.log(`✅ - ${data.payload.length} libros activos cargados.`);

        listaLibros = data.payload || [];
        listaLibrosFiltrados = [...listaLibros];
        totalPaginas = Math.ceil(listaLibrosFiltrados.length / LIBROS_POR_PAGINA) || 1;
        paginaActual = 1;
        renderizarPagina();
    } catch (error) {
        console.error("❌ - Error al cargar libros:", error);
        contenedorLibros.innerHTML = `<p class="error">🛑 - No se pudieron cargar los libros.</p>`;

        document.querySelectorAll(".contenedor-paginacion").forEach(p => p.innerHTML = "");
    }
}

// ===== LÓGICA DE FILTRADO =====
function aplicarFiltros() {
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
    const carrito = obtenerCarrito();

    if (!libros || libros.length === 0) {
        contenedorLibros.innerHTML = `<p>🛑 - No hay libros disponibles en esta categoría.</p>`;
        return;
    }

    let plantillaHTML = "";
    libros.forEach(libro => {
        const estaEnCarrito = carrito.some(otro => otro.id === libro.id);

        plantillaHTML += `
        <div class="tarjeta-libro" data-id="tarjeta-${libro.id}" data-genero="${libro.genero}">
            <img src="${libro.imagen}" alt="${libro.titulo}">
            <h3>${libro.titulo}</h3>
            <p class="libro-genero">Género: ${libro.genero}</p>
            <p class="libro-precio">Precio: $${libro.precio}</p>

            <div class="btn-acciones">
                ${estaEnCarrito
                ? `<a href="/carrito">
                    <button class="btn-ir-carrito" data-id="${libro.id}">🛒 Ver en el carrito</button>
                </a>`
                : `<button class="btn-agregar" data-id="${libro.id}">🛒 Agregar al carrito</button>`
            }
                <a href="/producto/detalle/${libro.id}">
                    <button class="btn-detalle">📋 Detalles</button>
                </a>
            </div>
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
            <button class="btn-pagina" onclick="irPagina(1)" ${paginaActual === 1 ? "disabled" : ""}>«</button>
            <button class="btn-pagina" onclick="cambiarPagina(-1)" ${paginaActual === 1 ? "disabled" : ""}>‹</button>
    `;

    const inicioNumero = Math.max(1, (paginaActual - 2));
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
        document.querySelectorAll(".contenedor-paginacion").forEach(pagina => pagina.innerHTML = "");
        return;
    }

    const inicio = (paginaActual - 1) * LIBROS_POR_PAGINA + 1;
    const fin = Math.min((paginaActual * LIBROS_POR_PAGINA), total);

    const plantillaHTML = generarHTMLPaginacion(inicio, fin, total);

    document.querySelectorAll(".contenedor-paginacion").forEach(pagina => pagina.innerHTML = plantillaHTML);
}

function renderizarPagina() {
    const inicio = (paginaActual - 1) * LIBROS_POR_PAGINA;
    const fin = Math.min((inicio + LIBROS_POR_PAGINA), listaLibrosFiltrados.length);
    const paginaLibros = listaLibrosFiltrados.slice(inicio, fin);

    renderizarLibros(paginaLibros);
    actualizarPaginacion();
}

// ===== FUNCIONALIDAD DE CAMBIO DE PÁGINA =====
function irPagina(numero) {
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

// ===== CONFIGURACIÓN DE BOTONES =====}

function configurarBotonesCarrito() {
    document.querySelectorAll(".btn-agregar").forEach(btn => {
        btn.addEventListener("click", (evento) => {
            const id = parseInt(evento.target.dataset.id);
            const libro = listaLibros.find(unidad => unidad.id === id);

            if (libro) {
                agregarAlCarrito(libro);
                renderizarPagina();
            }
        });
    })
}

function configurarBotonesCategorias() {
    const botones = document.querySelectorAll(".categoria-btn");
    const buscador = document.getElementById("buscador");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            botones.forEach(b => b.classList.remove("active"));

            boton.classList.add("active");

            generoActual = boton.dataset.categoria.toLowerCase();

            buscador.value = "";
            aplicarFiltros();
        });
    });
}

function configurarBuscador() {
    const buscador = document.getElementById("buscador");
    buscador.addEventListener("input", aplicarFiltros);
}

// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", () => {
    cargarLibrosActivos();
    configurarBotonesCategorias();
    configurarBuscador();
});

window.cambiarPagina = cambiarPagina;
window.irPagina = irPagina;