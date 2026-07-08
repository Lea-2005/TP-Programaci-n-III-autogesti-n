import { Router } from "express";
import { crearEncuesta, exportarEncuestasExcel } from "../controllers/survey.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";

const router = Router();

router.post("/", crearEncuesta); 

router.get("/export", requireLogin, exportarEncuestasExcel);

export default router;