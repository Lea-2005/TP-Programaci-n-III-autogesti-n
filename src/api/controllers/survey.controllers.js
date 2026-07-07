import SurveyModels from "../models/survey.models.js";

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