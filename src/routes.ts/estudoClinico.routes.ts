import { Router } from "express";
import { EstudoClinicoController } from "../controller/EstudoClinicoController";

const router = Router();
const controller = new EstudoClinicoController();

router.get("/", controller.listarEstudos);
router.get("/:id", controller.buscarPorId);
router.post("/", controller.criarEstudo);
router.put("/:id", controller.atualizarEstudo);
router.delete("/:id", controller.deletarEstudo);

export default router;