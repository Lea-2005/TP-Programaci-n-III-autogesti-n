import LogModels from "../models/log.models.js";

export const obtenerRegistros = async (req, res) => {
    try {
        const logs = await LogModels.obtenerRegistroExistente(100);

        res.status(200).json({
            payload: logs
        });
    } catch (error) {
        console.error("❌ - Error al obtener logs:", error);
        res.status(500).json({
            mensaje: "Error interno al obtener logs."
        });
    }
};