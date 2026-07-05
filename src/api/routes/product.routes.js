import { Router } from "express";
import { obtenerLibrosActivos, obtenerLibroActivoPorId } from "../controllers/book.controllers.js";

const router = Router();

// Cargamos los JSON.
router.get("/", obtenerLibrosActivos);          
router.get("/:id", obtenerLibroActivoPorId);    

export default router;