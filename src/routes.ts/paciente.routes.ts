import { Router } from "express";
import { PacienteService } from "../service/PacienteService";
import { PacienteController } from "../controller/PacienteController";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();
const service = new PacienteService();
const controller = new PacienteController(service);

router.get('/home/:id',authMiddleware, controller.getHome);
router.get("/:id",authMiddleware, controller.buscarPacientePorId);
router.post("/", controller.criarPaciente);
router.put("/:id", authMiddleware,controller.atualizarPaciente);
router.delete("/:id", authMiddleware,controller.deletarPaciente);
router.get("/", authMiddleware, controller.listarPacientes);

router.get('/estudos-compativeis/:pacienteId', authMiddleware , controller.buscarEstudosPorPaciente);;
export default router;