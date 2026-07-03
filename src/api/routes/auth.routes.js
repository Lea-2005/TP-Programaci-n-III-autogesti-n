import { Router } from "express";
import { loginView, processLoginInfo, destroyLogin } from "../controllers/auth.controllers.js";

const router = Router();

router.get("/", loginView);
router.post("/", processLoginInfo);
router.post("/destroy", destroyLogin);

export default router;