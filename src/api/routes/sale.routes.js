import { Router } from "express";
import { crearVenta } from "../controllers/sale.controllers.js";

const router = Router();

router.post("/", crearVenta); 

export default router;