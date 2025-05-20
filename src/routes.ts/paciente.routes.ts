
import { Router } from "express";
import { PacienteController } from "../controller/PacienteController";
import { PacienteService } from "../service/PacienteService";

const router = Router();
const controller = new PacienteController(new PacienteService());

router.get("/", controller.listarPacientes);
router.get("/:id", controller.buscarPacientePorId);
router.post("/", controller.criarPaciente.bind);
router.put("/:id", controller.atualizarPaciente.bind);
router.delete("/:id", controller.deletarPaciente.bind);

export default router;