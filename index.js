import express from "express"; // Importamos express, un framework para crear el servidor web.
import dotenv from "dotenv"; // Importamos dotenv para cargar variables de entorno desde `.env`.
import enviroments from "./src/api/config/environments.js"; // Importamos la configuración (puerto, clave de sesión, etc).
import session from "express-session";
import { join, __dirname } from "./src/api/utils/utilidades.js"; // Importamos utilidades: join (para rutas) y __dirname (directorio actual).
import { viewRoutes, productRoutes, authRoutes, saleRoutes } from "./src/api/routes/index.js";
import { loginView, processLoginInfo, destroyLogin } from "./src/api/controllers/auth.controllers.js";
import { requireLogin } from "./src/api/middlewares/middlewaes.js";
import { connectDatabase } from "./src/api/database/sequelize.js";
import { crearLibroView, dashboardView, editarLibroView } from "./src/api/controllers/view.controllers.js";

// ===== CONFIGURACIÓN INICIAL =====
// Cargamos variables de entorno
dotenv.config();

// Extraemos configuración
const { port, session_key } = enviroments;
const PORT = port || 3000;

// Creamos la aplicación Express
const app = express();

// ===== MIDDLEWARES =====
/**
 * MIDDLEWARE: Archivos estáticos
 * 
 * Permite servir archivos CSS, JS, imágenes, etc.
 * Desde cualquier lugar del proyecto podemos acceder a:
 *   http://localhost:3000/css/global.css
 *   http://localhost:3000/js/productos.js
 *   http://localhost:3000/html/productos.html
*/
app.use(express.static(join(__dirname, 'src/public')));

// Configurar motor de vistas EJS (apuntando a src/views)
app.set('views', join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

/**
 * MIDDLEWARE: Parseo de datos (PREPARADO PARA EL FUTURO)
 * 
 * Aunque ahora no se usan, los dejamos preparados para:
 * - express.urlencoded(): Procesar formularios HTML (login)
 * - express.json(): Procesar peticiones API con JSON
 * 
 * Estos middlewares hacen que los datos estén disponibles en req.body
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(session({
    secret: session_key || "secreto",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// ===== ENDPOINTS =====
// ----- CLIENTE ------
/**
 * ENDPOINT RAÍZ: /
 * 
 * Corrabora que el servidor este funcionando y guía hacía las páginas iniciales de cada sección del proyecto.
*/
app.get("/", (req, res) => {
    res.redirect("/bienvenida");
});

/**
 * ENDPOINT BIENVENIDA: /bienvenida
 * 
 * Página de bienvenida para nuevos usuarios.
*/
app.get("/bienvenida", (req, res) => {
    res.sendFile(join(__dirname, 'src/public/html/bienvenida.html'));
});

/**
 * ENDPOINT PRODUCTOS: /productos
 * 
 * Muestra el catálogo de libros activos.
*/
app.get("/productos", (req, res) => {
    res.sendFile(join(__dirname, 'src/public/html/productos.html'));
});

/**
 * ENDPOINT CARRITO: /carrito
 * 
 * Muestra el carrito de compras del usuario.
*/
app.get("/carrito", (req, res) => {
    res.sendFile(join(__dirname, 'src/public/html/carrito.html'));
});

/**
 * ENDPOINT TICKET: /ticket
 * 
 * Muestra el ticket/resumen de la compra realizada.
*/
app.get("/ticket", (req, res) => {
    res.sendFile(join(__dirname, 'src/public/html/ticket.html'));
});

/**
 * ENDPOINT DETALLE: /detalle:id
 * 
 * Muestra los detalles de un producto mediante su ID.
*/
app.get("/productos/detalle", (req, res) => {
    res.sendFile(join(__dirname, 'src/public/html/detalle.html'));
});

/**
 * ENDPOINT ENCUESTA: /encuesta
 * 
 * Muestra la pantalla de enecuesta donde el usuario podrá ingresar su opinión.
*/
app.get("/encuesta", (req, res) => {
    res.sendFile(join(__dirname, 'src/public/html/encuesta.html'));
});

// ------ ADMINISTRADOR ------
app.use("/admin", viewRoutes);
app.use("/auth", authRoutes);

// Montar routers
app.use("/api/productos", productRoutes);    // API: /api/productos.
app.use("/api/ventas", saleRoutes);    // API: /api/ventas.

// ===== INICIALIZAR SERVIDOR =====
await connectDatabase();

app.listen(PORT, () => {
    console.log('='.repeat(50))
    console.log(`⚙ Servidor corriendo en 'http://localhost:${PORT}'`);
    console.log(`📚 Cliente: 'http://localhost:${PORT}/bienvenida'`);
    console.log(`🔐 Admin: 'http://localhost:${PORT}/admin/login'`);
    console.log('='.repeat(50))
});

// Solo para errores de tipeo...
app.use((req, res) => {
    res.status(404).send(`
        <h1>404 - Página no encontrada</h1>
        <p>La ruta que buscas no existe.</p>
        <a href="/">⬅ Volver al inicio</a>
        `);
    });