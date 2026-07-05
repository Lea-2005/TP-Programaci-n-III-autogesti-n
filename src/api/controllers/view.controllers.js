import BookModels from "../models/book.models.js";

export const dashboardView = async (req, res) => {
    try {
        const libros = await BookModels.seleccionarTodosLosLibros();
        console.log("Libros enviados a la vista:", libros.length);

        res.render("admin/dashboard", {
            titulo: "Dashboard",
            detalle: "Lista de libros",
            librosArray: libros,
            error: null
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
    });
}

export const editarLibroView = (req, res) => {
    res.render("admin/editar", {
        titulo: "Editar libro",
    });
}

export default {
    dashboardView,
    crearLibroView,
    editarLibroView
}