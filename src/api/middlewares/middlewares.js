// MIDDLEWARES
export const requireLogin = (req, res, next) => {
    // Si no existe la sesión, devuelta a la pantalla login
    if (!req.session.usuario) {
        return res.redirect("/admin/login")
    }

    next();
}