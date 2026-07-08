import { Router } from "express";
import { crearVenta, exportarVentasExcel, obtenerEstadisticas, obtenerTopLibrosVendidos, obtenerTopVentasCaras } from "../controllers/sale.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";

const router = Router();

router.post("/", crearVenta); 

router.get("/estadisticas", requireLogin, obtenerEstadisticas);
router.get("/top-libros", requireLogin, obtenerTopLibrosVendidos);
router.get("/top-ventas", requireLogin, obtenerTopVentasCaras);

// Se exporta la función creada:
router.get("/export", requireLogin, exportarVentasExcel); // Nueva ruta.

export default router;