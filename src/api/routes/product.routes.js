import { Router } from "express";
import { obtenerLibrosActivos, obtenerLibroActivoPorId, cambiarEstadoLibro, eliminarLibro } from "../controllers/book.controllers.js";

const router = Router();

// Cargamos los JSON (get).
router.get("/", obtenerLibrosActivos);          
router.get("/:id", obtenerLibroActivoPorId);    

// Para poder cambiar el estado del libro, se hace un patch.
router.patch("/admin/:id", cambiarEstadoLibro);

// Delete para eliminar el libro por ID desde el dashboard (pantalla /editar).
router.delete("/admin/:id", eliminarLibro);

export default router;