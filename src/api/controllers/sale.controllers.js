import SaleModels from "../models/sale.models.js";
import { Libros } from "../models/general.models.js";
import XLSX from "xlsx"; // se importa la biblioteca con la que se podrá trabajar con archivos de Excel.

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

export const exportarVentasExcel = async (req, res) => {
    try {
        const ventas = await SaleModels.obtenerTodasLasVentas();

        /*
        Se formatean los datos para el Excel, siendo por ejemplo:
        ID venta: 1  |  Cliente: Leandro  |  Fecha: __  |  Total: $25000  |  Poductos: tituloLibro (x4)
        */
        const data = ventas.map(venta => ({
            "ID venta": venta.id,
            "Cliente": venta.nombre_usuario,
            "Fecha": new Date(venta.fecha).toLocaleString("es-AR"),
            "Total": `$${venta.precio_total}`,
            "Productos": venta.Libros.map(libro => `${libro.titulo} (x${libro.VentasLibros.cantidad})`).join(', ')
        }));

        const libroExcel = XLSX.utils.book_new(); // Crea un libro de Excel vacío en la memoria. 
        const datosExcel = XLSX.utils.json_to_sheet(data); // Crea una hoja con la información de `data`.

        XLSX.utils.book_append_sheet(libroExcel, datosExcel, "Ventas");  // Agrega la hoja al libro y la nombra "Ventas".

        const archivoExcel = XLSX.write(libroExcel, {
            type: "buffer", bookType: "xlsx"
        }); // Con XLSX.write creamos el archivo de Excel (con datos binario) a partir del libro de Excel generado anteriormente.

        res.setHeader("Content-Disposition", `attachment; filename=ventas-${Date.now()}.xlsx`);
        // Establecemos una cabecera HTTP y le indicamos al navegador descargar el archivo.

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        // Esta línea avisa al navegador que el archivo que va a descargar es una hoja de cálculo de Excel moderna (archivo .xlsx).

        // Se envía la respuesta:
        res.send(archivoExcel);

        console.log(`📗 - Excel de ventas exportado: ${ventas.length} registros.`);
    } catch (error) {
        console.error("❌ - Error al exportar Excel:", error);
        res.status(500).json({
            error: "Error al generar el archivo Excel."
        });
    }
}