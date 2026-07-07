import BookModels from "../models/book.models.js";

export const obtenerLibrosActivos = async (req, res) => {
    try {
        const rows = await BookModels.seleccionarLibrosActivos();

        if (rows.length === 0) {
            return res.status(404).json({
                mensaje: "No se encontraron productos."
            });

        }

        res.status(200).json({
            payload: rows,
            total: rows.length
        });
    } catch (error) {
        console.error("❌ - Error obteniendo libros:", error);

        res.status(500).json({
            mensaje: "Error interno al obtener libros."
        });
    }
};

export const obtenerLibroActivoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const libro = await BookModels.seleccionarLibroActivoPorId(id);

        if (!libro) {
            return res.status(404).json({
                mensaje: "Libro no encontrado."
            });
        }

        res.status(200).json({
            payload: libro
        });
    } catch (error) {
        console.error("❌ - Error obteniendo libro por ID:", error);

        res.status(500).json({
            mensaje: "Error interno."
        });
    }
};

export const cambiarEstadoLibro = async (req, res) => {
    try {
        const { id } = req.params;
        const { activo } = req.body;
        console.log(`🔄 - Cambiando estado del libro ID ${id} a ${activo ? 'activo' : 'inactivo'}...`);

        const filasAfectadas = await BookModels.alternarEstadoLibro(id, activo);

        if (filasAfectadas === 0) {
            return res.status(404).json({
                error: "Libro no encontrado."
            });
        }

        console.log(`✅ - Estado del libro ID ${id} actualizado.`);
        res.status(200).json({
            mensaje: `Libro ${activo ? "activado" : "desactivado"} correctamente.`
        });
    } catch (error) {
        console.error("❌ - Error al cambiar estado del libro:", error.message);

        res.status(500).json({
            error: "Error interno del servidor."
        });
    }
};

export const crearLibro = async (req, res) => {
    try {
        const { titulo, genero, imagen, precio } = req.body;
        if (!titulo || !genero || !imagen || !precio) {
            return res.status(400).send("Todos los campos son obligatorios.");
        }

        await BookModels.insertarNuevoLibro(titulo, genero, imagen, precio);

        res.redirect("/admin/dashboard");
    } catch (error) {
        console.error("Error al crear libro:", error);
        res.status(500).send("Error al crear el libro.");
    }
};

export const editarLibro = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, genero, imagen, precio, activo, imagen_actual } = req.body;
        const imagenFinal = imagen || imagen_actual;
        const activoBool = activo === '1' ? 1 : 0;

        await BookModels.editarLibro(id, titulo, genero, imagenFinal, precio, activoBool);

        res.redirect("/admin/dashboard");
    } catch (error) {
        console.error("Error al editar libro:", error);
        res.status(500).send("Error al actualizar el libro.");
    }
};

export const eliminarLibro = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`🗑 - Eliminado libro con ID: ${id}`)

        const libro = BookModels.eliminarLibroExistente(id);
    
        if (!libro) {
            return res.status(404).json({
                mensaje: "Libro no encontrado."
            });
        }

        console.log(`✅ - Libro con ID ${id} eliminado.`)
        res.status(200).json({
            payload: libro
        });
    } catch (error) {
        console.error("❌ - Error eliminado libro por ID:", error);

        res.status(500).json({
            mensaje: "Error interno."
        });
    }
}