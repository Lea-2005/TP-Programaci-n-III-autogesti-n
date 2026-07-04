import bcrypt from "bcrypt";

export const loginView = (req, res) => {
    //res.send("Página de login (pendiente)");
    res.render("admin/login", {
        titulo: "Login",
        detalle: "Introducí tu usuario.",
        error: null
    });
};

export const processLoginInfo = async (req, res) => {
    //res.send("Procesando login...");
    try {
        const { email, contraseña } = req.body;

        if (!email || !contraseña) {
            return res.render("login");
        }

        const sql = "SELECT * FROM usuarios WHERE email = ? AND contrasena = ?"
        const [rows] = await connection.query(sql, [email, contraseña])

        const user = rows[0]
        console.table(user)

        req.session.user = {
            id: user.id,
            email: user.email,
            contrasena: user.contrasena,
            es_admin: user.es_admin
        }

        res.redirect("/admin/dashboard");
    } catch (error) {
        console.error("Error en el login:", error);
        res.render("admin/login").json({
            title: "Login Admin",
            detalle: "Intenta de nuevo.",
            error: "Error interno del servidor" 
        });
    }
};

export const destroyLogin = (req, res) => {
    //res.send("Cerrando sesión...");
    req.session.destroy((error) => {
        if (error) {
            console.error("Error al cerrar sesión:", error);

            return res.status(500).json({
                mensaje: "Error al cerrar sesión."
            });
        }
        res.redirect("/login");
    });
};

/*
import bcrypt from "bcrypt";
import UserModel from "../models/user.models.js";
import { createLog } from "../models/log.models.js";

export const loginView = (req, res) => {
    res.render("admin/login", { 
        title: "Login Admin",
        error: null 
    });
};

export const processLogin = async (req, res) => {
    try {
        const { email, contrasena } = req.body;
        
        const user = await UserModel.findByEmail(email);
        if (!user) {
            return res.render("admin/login", { 
                title: "Login Admin",
                error: "Email o contraseña incorrectos" 
            });
        }
        
        const match = await bcrypt.compare(contrasena, user.contrasena);
        if (!match) {
            return res.render("admin/login", { 
                title: "Login Admin",
                error: "Email o contraseña incorrectos" 
            });
        }
        
        req.session.user = { id: user.id, email: user.email };
        await createLog(user.id, user.email, req.ip);
        
        res.redirect("/admin/dashboard");
    } catch (error) {
        console.error("Error en login:", error);
        res.render("admin/login", { 
            title: "Login Admin",
            error: "Error interno del servidor" 
        });
    }
};

export const destroyLogin = (req, res) => {
    req.session.destroy();
    res.redirect("/admin/login");
};

*/