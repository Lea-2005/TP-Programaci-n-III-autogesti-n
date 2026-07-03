import ProductModels from "../models/book.models.js";

export const indexView = async (req, res) => {
    try {
        const [rows] = await ProductModels.seleccionarLibrosActivos();

        // Log para verificar que llegan datos
        console.log("Libros activos enviados a la vista:", rows.length);

        res.render("productos", {
            titulo: "Libros",
            presentacion: "Nuestros productos",
            librosArray: rows,
            empresa: "Mi Librería",
            alumnos: ["Nicolás Pérez", "Leandro Mamani"],
            mostrarNav: true,
            mostrarBotonLogin: true,
            mostrarBotonSalir: false,
            pagina: "productos"
        });
    } catch (error) {
        console.error("Error en indexView:", error.mensaje);
        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};

export const carritoView = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Error en carritoView:", error.mensaje);
        res.status(500).json({
            mensaje: "Error interno del servidor."
        })
    }
};