import { Router } from "express";
import { CentroClinicoController } from "../controller/CentroClinicoController";

const router = Router();

router.get("/", CentroClinicoController.listarCentroClinicos);
router.post("/", CentroClinicoController.criarCentroClinico);   
router.put("/:id", CentroClinicoController.atualizarCentroClinico);
router.delete("/:id", CentroClinicoController.deletarCentroClinico);

export default router;