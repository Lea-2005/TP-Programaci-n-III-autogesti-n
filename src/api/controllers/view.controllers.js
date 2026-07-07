import BookModels from "../models/book.models.js";

export const dashboardView = async (req, res) => {
    try {
        console.log(`📊 - Cargando dashboard...`);
        const libros = await BookModels.seleccionarTodosLosLibros();

        console.log(`📚 - ${libros.length} libros cargados.`);
        res.render("admin/dashboard", {
            titulo: "Dashboard",
            detalle: "Dashboard de libros",
            librosArray: libros,
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

export default {
    dashboardView,
    crearLibroView,
    editarLibroView
}