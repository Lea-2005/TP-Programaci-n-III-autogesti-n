import { Encuestas } from "./general.models.js";

const crearNuevaEncuesta = async (email, comentario, puntuacion, suscripcion, imagen) => {
    const encuestaNueva = await Encuestas.create({
        email: email,
        comentario: comentario,
        puntuacion: puntuacion,
        suscripcion: suscripcion,
        imagen: imagen || null,
        fecha: new Date()
    });
    return encuestaNueva.id;
} 

const obtenerTodasLasEncuestas = async () => {
    const encuestas = await Encuestas.findAll({
        order: [["fecha", "DESC"]]
    });
    return encuestas;
}

export default {
    crearNuevaEncuesta,
    obtenerTodasLasEncuestas
}