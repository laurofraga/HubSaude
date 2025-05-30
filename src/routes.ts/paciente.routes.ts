import { Router } from "express";
import { PacienteService } from "../service/PacienteService";
import { PacienteController } from "../controller/PacienteController";

const router = Router();
const service = new PacienteService();
const controller = new PacienteController(service);

router.get('/home/:id', controller.getHome);
router.get("/:id", controller.buscarPacientePorId);
router.post("/", controller.criarPaciente);
router.put("/:id", controller.atualizarPaciente);
router.delete("/:id", controller.deletarPaciente);
router.get("/", controller.listarPacientes);

export default router;