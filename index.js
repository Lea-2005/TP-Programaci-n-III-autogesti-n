import express from "express";
import dotenv from "dotenv";
import enviroments from "./src/api/config/enviroments.js";

dotenv.config();
const { port, session_key } = enviroments;
const PORT = port || 3000;

const app = express();

// Endpoint
app.get("/", (req, res) => {
    res.send("¡tServidor funcionando!");
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`⚙ Servidor corriendo en http://localhost:${PORT}`);
});