import { Router } from "express";
import { obtenerRegistros } from "../controllers/log.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";

const router = Router();

router.get("/login", requireLogin, obtenerRegistros);

export default router;