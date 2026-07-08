import SurveyModels from "../models/survey.models.js";
import XLSX from "xlsx";

export const crearEncuesta = async (req, res) => {
    try {
        const { email, comentario, puntuacion, suscripcion, imagen_url } = req.body;

        if (!email || !puntuacion) {
            return res.status(400).json({
                error: "Email y puntación son obligatorios."
            });
        }

        if (puntuacion < 1 || puntuacion > 5) {
            return res.status(400).json({
                error: "La puntación debe ser entre 1 y 5."
            });
        }

        const encuestaId = await SurveyModels.crearNuevaEncuesta(email, comentario, puntuacion, suscripcion, imagen_url);

        console.log(`✅ - Encuesta registrada ID: ${encuestaId}.`);
        res.status(200).json({
            mensaje: "Encuesta registrada",
            encuesta_id: encuestaId
        });
    } catch (error) {
        console.error("❌ - Error al intentar crear encuesta:", error);
        res.status(500).json({
            mensaje: "Error interno al crear encuesta." 
        });
    }
}

// Se repite la misma lógica que se hizo con 'exportarVentasExcel' de "sale.controller.js"...
export const exportarEncuestasExcel = async (req, res) => {
    try {
        const encuestas = await SurveyModels.obtenerTodasLasEncuestas();

        const data = encuestas.map(encuesta => ({
            "ID encuesta": encuesta.id,
            "Email cliente": encuesta.email,
            "Comentario": encuesta.comentario || "No escribió.",
            "Puntuación": encuesta.puntuacion,
            "Sucripción": encuesta.suscripcion ? "Sí." : "No.",
            "Imagen URL": encuesta.imagen || "Nada.",
            "Fecha": new Date(encuesta.fecha).toLocaleString("es-AR")
        }));

        // Misma lógica...
        const libroExcel = XLSX.utils.book_new(); 
        const datosExcel = XLSX.utils.json_to_sheet(data);
        
        XLSX.utils.book_append_sheet(libroExcel, datosExcel, "Encuestas");
       
        const archivoExcel = XLSX.write(libroExcel, {
            type: "buffer", bookType: "xlsx"
        });

        res.setHeader("Content-Disposition",  `attachment; filename=encuestas-${Date.now()}.xlsx`);
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(archivoExcel);

        console.log(`📗 - Excel de encuestas exportado: ${encuestas.length} registros.`);
    } catch (error) {
        console.error("❌ - Error al exportar Excel:", error);
        res.status(500).json({
            error: "Error al generar el archivo Excel."
        });
    }
}