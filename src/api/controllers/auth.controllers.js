import bcrypt from "bcrypt";
import UsuarioModels from "../models/user.models.js";
import RegistroModels from "../models/log.models.js";

export const loginView = (req, res) => {
    res.render("admin/login", {
        titulo: "Login admin",
        detalle: "Iniciar sesión",
        rutaActual: "login"
    });
};

export const processLoginInfo = async (req, res) => {
    try {
        const { email, contrasenia } = req.body;
        const usuario = await UsuarioModels.seleccionarUsuarioPorEmail(email);

        console.log(`🔐 - Intento de login: ${email}.`);

        if (!usuario) {
            return res.render("admin/login", {
                titulo: "Login admin",
                detalle: "Iniciar sesión",
                error: "Email inválido.",
                rutaActual: "login"
            });
        }

        if (!usuario.contrasenia) {
            return res.render("admin/login", {
                titulo: "Login admin",
                detalle: "Iniciar sesión",
                error: "Error interno del servidor: usuario sin contraseña.",
                rutaActual: "login"
            });
        }

        const match = await bcrypt.compare(contrasenia, usuario.contrasenia);

        if (!match) {
            return res.render("admin/login", {
                titulo: "Login admin",
                detalle: "Iniciar sesión",
                error: " Email o contraseña inválidos.",
                rutaActual: "login"
            });
        }

        await RegistroModels.crearRegistroNuevo(usuario.id, usuario.email);
        
        console.log(`✅ - Login exitoso: ${email}`)

        req.session.usuario = { id: usuario.id, email: usuario.email }
    
        res.redirect("/admin/dashboard");
    } catch (error) {
        console.error("❌ - Error en el login:", error.message);
        res.render("admin/login", {
            titulo: "Login admin",
            detalle: "Intenta de nuevo",
            error: "Error interno del servidor.",
            rutaActual: "login"
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