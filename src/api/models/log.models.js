import { Registros } from "./general.models.js";

const crearRegistroNuevo = async (usuarioId, email) => {
    const log = await Registros.create({
        usuario_id: usuarioId,
        email: email,
        fecha: new Date()
    });
    return log.id;
};

const obtenerRegistroExistente = async (limite = 100) => {
    const logs = await Registros.findAll({
        order: [["fecha", "DESC"]],
        limit: limite
    });
    return logs;
};

export default {
    crearRegistroNuevo,
    obtenerRegistroExistente
};