import express from "express"; // Importamos express, un framework para crear el servidor web.
import dotenv from "dotenv"; // Importamos dotenv para cargar variables de entorno desde `.env`.
import enviroments from "./src/api/config/enviroments.js"; // Importamos la configuración (puerto, clave de sesión, etc).
import { join, __dirname } from "./src/api/utils/utilidades.js"; // Importamos utilidades: join (para rutas) y __dirname (directorio actual).

dotenv.config();
const { port, session_key } = enviroments;
const PORT = port || 3000;

const app = express();

// ===== ENDPOINTS =====
// ----- CLIENTE ------
/**
 * ENDPOINT RAÍZ: /
 * 
 * Corrabora que el servidor este funcionando y guía hacía a las páginas iniciales de cada sección del proyecto.
 */
app.get("/", (req, res) => {
    res.send(`
        <h1>Servidor funcionando correctamente.</h1>
        <hr>
        <h3>Rutas iniciales:</h3>
        <ul>
            <li><a href="/bienvenida">/bienvenida</a> - Página de bienvenida para los clientes.</li>
            <li><a href="/login">/login</a> - Página de acceso para administradores.</li>
        </ul>
    `);
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

// ------ ADMINISTRADOR ------
// (...)

// ===== INICIALIZAR SERVIDOR =====
app.listen(PORT, () => {
    console.log('='.repeat(50))
    console.log(`⚙ Servidor corriendo en "http://localhost:${PORT}".`);
    console.log('='.repeat(50))
});
