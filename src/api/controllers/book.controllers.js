import BookModels from "../models/book.models.js";

export const obtenerLibrosActivos = async (req, res) => {
    try {
        const rows = await BookModels.seleccionarLibrosActivos();

        if (rows.length === 0) {
            return res.status(404).json({
                mensaje: "No se encontraron productos"
            });

        }

        res.status(200).json({
            payload: rows,
            total: rows.length
        });
    } catch (error) {
        console.error("Error obteniendo libros:", error);

        res.status(500).json({
            mensaje: "Error interno al obtener libros."
        });
    }
};

export const obtenerLibroActivoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await BookModels.seleccionarLibroActivoPorId(id);

        if (rows.length === 0) {
            return res.status(404).json({
                mensaje: "Libro no encontrado"
            });
        }

        res.status(200).json({
            payload: rows[0]
        });
    } catch (error) {
        console.error("Error obteniendo libro por ID:", error);

        res.status(500).json({
            mensaje: "Error interno"
        });
    }
};

export const cambiarEstadoLibro = async (req, res) => {
    try {
        const { id } = req.params;
        const { activo } = req.body;

        const filasAfectadas = await BookModels.alternarEstadoLibro(id, activo);

        if (filasAfectadas === 0) {
            return res.status(404).json({ error: "Libro no encontrado" });
        }

        res.status(200).json({
            mensaje: `Libro ${activo ? "activado" : "desactivado"} correctamente`
        });
    } catch (error) {
        console.error("Error al cambiar estado del libro:", error);

        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};

