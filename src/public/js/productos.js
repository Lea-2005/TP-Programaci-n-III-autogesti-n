let listaLibros = [];
let generoActual = "todos";

/**
 * Función para cargar los libros activos desde la API.
*/
async function cargarLibrosActivos() {
    const contenedor = document.getElementById("contenedor-libros");
    try {
        const respuesta = await fetch("/api/productos");
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        const data = await respuesta.json();
        listaLibros = data.payload;
        aplicarFiltros();
    } catch (error) {
        console.error("Error al intentar cargar los libros:", error);
        contenedor.innerHTML = `
        <p class="error">No se pudieron cargar los libros.</p>
        `;
    }
}

/**
 * Función para renderizar tarjetas de los libros activos.
*/
function renderizarLibros(libros) {
    const contenedor = document.getElementById("contenedor-libros");
    
    if (!libros || libros.length === 0) {
        contenedor.innerHTML = `
        <p>No hay libros en esta categoría.</p>
        `;
        return;
    }
    
    let plantillaHTML = ``;
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
        </div>
        `
        /*<span class="cantidad"">${cantidad}</span>*/
    });
    contenedor.innerHTML = plantillaHTML;
    configurarBotonesCarrito();
}

/**
 * Función para configurar los botones para la funcionalidad de carrito.
*/
function configurarBotonesCarrito() {
    document.querySelectorAll(".btn-sumar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.dataset.id);
            const libro = listaLibros.find(unidad => unidad.id === id);
            if (libro) {
                agregarAlCarrito(libro);
            }
        });
    });

    document.querySelectorAll(".btn-restar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.dataset.id);
            removerDelCarrito(id);
        });
    });
}

/**
 * 
 */
function aplicarFiltros() {
    const buscador = document.getElementById("buscador");
    const texto = buscador.value.toLowerCase().trim();

    // Filtrar por género
    let librosFiltrados = [];
    if (generoActual === "todos") {
        librosFiltrados = [...listaLibros];
    } else {
        librosFiltrados = listaLibros.filter(libro =>
            libro.genero && libro.genero.toLowerCase().trim() === generoActual
        );
    }

    // Filtrar por texto
    if (texto) {
        librosFiltrados = librosFiltrados.filter(libro =>
            libro.titulo.toLowerCase().includes(texto)
        );
    }

    renderizarLibros(librosFiltrados);
}

/**
 * 
 */
function configurarBotonesCategoria() {
    const botones = document.querySelectorAll(".categoria-btn");
    const buscador = document.getElementById("buscador");

    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            botones.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const genero = btn.dataset.categoria;
            generoActual = genero.toLowerCase();

            // Limpiamos el buscador para evitar confusión
            buscador.value = "";

            // Aplicamos todos los filtros (género + texto vacío)
            aplicarFiltros();
        });
    });
}

/**
 * 
 */
function configurarBuscador() {
    const buscador = document.getElementById("buscador");
    buscador.addEventListener("input", aplicarFiltros);
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
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

document.addEventListener("DOMContentLoaded", () => {
    cargarLibrosActivos();
    configurarBotonesCategoria();
    configurarBuscador();
});
