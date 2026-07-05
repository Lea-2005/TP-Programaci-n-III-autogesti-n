import { Usuarios } from "./general.models.js";
import bcrypt from "bcrypt";

const seleccionarUsuarioPorEmail = async (email) => {
    const usuario = await Usuarios.findOne(
        { where: { email } },
    );
    return usuario;
}

const crearUsuarioNuevo = async (email, contrasenia) => {
    const contraseniaHasheada = await bcrypt.hash(contrasenia, 10);

    const usuarioNuevo = await Usuarios.create(
        { email, contrasenia: contraseniaHasheada, es_admin: true }
    );
    return usuarioNuevo.id;
}

export default {
    seleccionarUsuarioPorEmail,
    crearUsuarioNuevo
}