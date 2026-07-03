import express from "express";
import dotenv from "dotenv";
import enviroments from "./src/api/config/enviroments.js";
import { join, __dirname } from "./src/api/utils/index.js";

dotenv.config();
const { port, session_key } = enviroments;
const PORT = port || 3000;

const app = express();

// Endpoints
app.get("/", (req, res) => {
    res.send(`
        <h1>Servidor funcionando correctamente.</h1>
        <hr>
        <h3>📌 Flujo de rutas:</h3>
        <ul>
            <li>
                <a href="/bienvenida">/bienvenida</a> - Página de bienvenida para los clientes.
            </li>
            <li>
                <a href="/login">/login</a> - Página de acceso para administradores.
            </li>
        </ul>
    `);
});

// Sirve el HTML de productos en la ruta /productos
app.get("/productos", (req, res) => {
    res.sendFile(join(__dirname, 'src/public/html/productos.html'));
});

// Sirve el HTML de bienvenida en la ruta /bienvenida
app.get("/bienvenida", (req, res) => {
    res.sendFile(join(__dirname, 'src/public/html/bienvenida.html'));
});

// Sirve el HTML de carrito en la ruta /carrito
app.get("/carrito", (req, res) => {
    res.sendFile(join(__dirname, 'src/public/html/carrito.html'));
});

// Sirve el HTML de ticket en la ruta /ticket
app.get("/ticket", (req, res) => {
    res.sendFile(join(__dirname, 'src/public/html/ticket.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`⚙ Servidor corriendo en http://localhost:${PORT}`);
});