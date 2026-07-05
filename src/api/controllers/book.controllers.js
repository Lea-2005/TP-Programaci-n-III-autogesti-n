import ProductModels from "../models/book.models.js";

export const obtenerLibrosActivos = async (req, res) => {
    try {
        const rows = await ProductModels.seleccionarLibrosActivos();

        if (rows.length === 0) {
            return res.status(404).json({ 
            message: "No se encontraron productos" 
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
        const [rows] = await ProductModels.seleccionarLibroActivoPorId(id);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }
        res.status(200).json({ payload: rows[0] });
    } catch (error) {
        console.error("Error obteniendo libro por ID:", error);
        res.status(500).json({ message: "Error interno" });
    }
};