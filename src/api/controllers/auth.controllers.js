import bcrypt from "bcrypt";
import UsuarioModels from "../models/user.models.js";

export const loginView = (req, res) => {
    res.render("admin/login", {
        titulo: "Login admin",
        detalle: "Iniciar sesión",
        error: null
    });
};

/*
email
contrasenia
es_admin
*/
export const processLoginInfo = async (req, res) => {
    try {
        const { email, contrasenia } = req.body;
        const usuario = await UsuarioModels.seleccionarUsuarioPorEmail(email);

        if (!usuario) {
            return res.render("admin/login", {
                titulo: "Login admin",
                detalle: "Iniciar sesión",
                error: "Email inválido."
            });
        }

        if (!usuario.contrasenia) {
            return res.render("admin/login", {
                titulo: "Login admin",
                detalle: "Iniciar sesión",
                error: "Error interno del servidor: usuario sin contraseña."
            });
        }

        const match = await bcrypt.compare(contrasenia, usuario.contrasenia);
        console.log("Contrseña hasheada:", usuario.contrasenia);
        console.log(match);

        if (!match) {
            return res.render("admin/login", {
                titulo: "Login admin",
                detalle: "Iniciar sesión",
                error: " Email o contraseña inválidos."
            });
        }

        req.session.usuario = { id: usuario.id, email: usuario.email }
    
        res.redirect("/admin/dashboard");
    } catch (error) {
        console.error("Error en el login:", error);
        res.render("admin/login", {
            titulo: "Login admin",
            detalle: "Intenta de nuevo",
            error: "Error interno del servidor."
        });
    }
}

export const destroyLogin = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("Error al cerrar sesión:", error);

            return res.status(500).json({
                mensaje: "Error al cerrar sesión."
            });
        }
        res.redirect("/admin/login");
    });
};