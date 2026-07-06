import SaleModels from "../models/sale.models.js";

export const crearVenta = async (req, res) => {
    try {
        const { nombre_usuario, precio_total, libros } = req.body;

        console.log("Datos de ventas registrados:", { nombre_usuario, precio_total, libros });

        if (!nombre_usuario || !libros || libros.length === 0) {
            return res.status(400).json({
                error: "Datos incompletos."
            });
        }
        //console.log("Total:", precio_total);

        const ventaId = await SaleModels.crearNuevaVenta(nombre_usuario, precio_total, libros);

        res.status(200).json({
            mensaje: "Venta registrada",
            venta_id: ventaId
        });
    } catch (error) {
        console.error("Error al crear una venta:", error);
        res.status(500).json({
            mensaje: "Error interno al crear venta." 
        });
    }
}