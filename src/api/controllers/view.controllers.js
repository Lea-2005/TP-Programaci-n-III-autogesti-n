import BookModels from "../models/book.models.js";

export const dashboardView = async (req, res) => {
    try {
        console.log(`📊 - Cargando dashboard...`);
        const libros = await BookModels.seleccionarTodosLosLibros();
        const generos = new Set(libros.map(libro => libro.genero)); // Obtiene los nombres de los géneros existentes.

        // Datos para las estadisticas iniciales.
        const totalLibros = libros.length;
        const activos = libros.filter(libro => libro.activo).length;
        const inactivos = totalLibros - activos;

        // Datos para agrupar por géneros y así no repetir tanto código.
        const librosPorGenero = {};
        generos.forEach(genero => {
            librosPorGenero[genero] = libros.filter(libro => libro.genero === genero);
        });

        console.log(`📚 - ${libros.length} libros cargados.`);
        res.render("admin/dashboard", {
            titulo: "Dashboard",
            detalle: "Dashboard de libros",
            generos: generos,                
            librosPorGenero,                 
            estadisticas: { totalLibros, activos, inactivos },
            error: null,
            rutaActual: "dashboard"
        });
    } catch (error) {
        console.log("Error obteniendo informacion", error.mensaje);

        res.status(500).json({
            mensaje: "Error interno al cargar el dashboard."
        });
    }
}

export const crearLibroView = (req, res) => {
    res.render("admin/crear", {
        titulo: "Crear libro",
        detalle: "Crea un nuevo libro a tu gusto.",
        rutaActual: "crear"
    });
}

export const editarLibroView = async (req, res) => {
    try {
        const { id } = req.params;
        const libro = await BookModels.seleccionarLibroPorId(id);

        res.render("admin/editar", {
            titulo: "Editar libro",
            detalle: "Editá los parámetros del libro.",
            rutaActual: "editar",
            libro: libro
        });
    } catch (error) {
        console.error("Error al cargar editar:", error);

        res.status(500).json({
            mensaje: "Error interno al cargar el libro."
        });
    }
}

export const registrosView = (req, res) => {
    res.render("admin/registros", {
        titulo: "Registros",
        detalle: "Registros y estadísticas",
        rutaActual: "registros"
    });
};

export default {
    dashboardView,
    crearLibroView,
    editarLibroView,
    registrosView
}