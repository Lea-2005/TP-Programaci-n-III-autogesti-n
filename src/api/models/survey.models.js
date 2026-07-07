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

export default {
    crearNuevaEncuesta
}