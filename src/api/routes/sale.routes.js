import { Router } from "express";
import { crearVenta, obtenerEstadisticas, obtenerTopLibrosVendidos, obtenerTopVentasCaras } from "../controllers/sale.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";

const router = Router();

router.post("/", crearVenta); 

//router.get("/", requireLogin, obtenerVentas);
router.get("/estadisticas", requireLogin, obtenerEstadisticas);
router.get("/top-libros", requireLogin, obtenerTopLibrosVendidos);
router.get("/top-ventas", requireLogin, obtenerTopVentasCaras);

export default router;