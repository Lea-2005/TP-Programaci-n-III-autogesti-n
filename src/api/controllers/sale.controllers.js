import SaleModels from "../models/sale.models.js";

export const crearVenta = async (req, res) => {
    try {
        const { nombre_usuario, precio_total, libros } = req.body;
        console.log(`🛒 - Nueva venta de ${nombre_usuario} - Total: $${precio_total}`);

        if (!nombre_usuario || !libros || libros.length === 0) {
            return res.status(400).json({
                error: "Datos incompletos."
            });
        }

        const ventaId = await SaleModels.crearNuevaVenta(nombre_usuario, precio_total, libros);

        console.log(`✅ - Venta registrada ID: ${ventaId}.`);
        res.status(200).json({
            mensaje: "Venta registrada",
            venta_id: ventaId
        });
    } catch (error) {
        console.error(`❌ - Error al crear venta:`, error.message);
        res.status(500).json({
            mensaje: "Error interno al crear venta."
        });
    }
}

export const obtenerEstadisticas = async (req, res) => {
    try {
        const estatisticas = await SaleModels.obtenerEstadisticasNuevas();

        res.status(200).json({
            payload: estatisticas
        });
    } catch (error) {
        console.error("❌ - Error al obtener estadísticas:", error);
        res.status(500).json({
            mensaje: "Error interno al obtener estadísticas."
        });
    }
}

export const obtenerTopLibrosVendidos = async (req, res) => {
    try {
        const topLibros = await SaleModels.obtenerTopLibrosVendidosNuevos();
        const data = topLibros.map(item => ({
            titulo: item.Libro ? item.Libro.titulo : 'Desconocido',
            total_vendido: item.dataValues.total_vendido || 0,
            ingreso_total: item.dataValues.ingreso_total || 0
        }));
        res.status(200).json({ payload: data });
    } catch (error) {
        console.error("❌ - Error al obtener top libros:", error);
        res.status(500).json({
            mensaje: "Error interno."
        });
    }
};

export const obtenerTopVentasCaras = async (req, res) => {
    try {
        const topVentas = await SaleModels.obtenerTopVentasCarasNuevas();

        res.status(200).json({
            payload: topVentas
        });
    } catch (error) {
        console.error("❌ - Error al obtener top libros:", error);
        res.status(500).json({
            mensaje: "Error interno."
        });
    }
}