import { Router } from "express";
import { crearEncuesta } from "../controllers/survey.controllers.js";

const router = Router();

router.post("/", crearEncuesta); 

export default router;