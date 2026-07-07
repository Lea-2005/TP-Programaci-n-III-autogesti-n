import { Router } from "express";
import { dashboardView, crearLibroView, editarLibroView } from "../controllers/view.controllers.js";
import { loginView } from "../controllers/auth.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";
import { crearLibro, editarLibro } from "../controllers/book.controllers.js";

const router = Router();

router.get("/login", loginView);
router.get("/dashboard", requireLogin, dashboardView); 
router.get("/crear", requireLogin, crearLibroView);
router.get("/editar/:id", requireLogin, editarLibroView);

router.post("/crear", requireLogin, crearLibro);
router.post("/editar/:id", requireLogin, editarLibro);

export default router;