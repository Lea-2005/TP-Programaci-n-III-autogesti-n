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
        //console.log("Total:", precio_total);

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