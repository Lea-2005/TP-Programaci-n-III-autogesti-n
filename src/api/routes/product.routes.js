import { Router } from "express";
import { obtenerLibrosActivos, obtenerLibroActivoPorId, cambiarEstadoLibro, crearLibro, editarLibro } from "../controllers/book.controllers.js";

const router = Router();

// Cargamos los JSON (get).
router.get("/", obtenerLibrosActivos);          
router.get("/:id", obtenerLibroActivoPorId);    

// Para poder cambiar el estado del libro, se hace un patch.
router.patch("/admin/:id", cambiarEstadoLibro);

export default router;