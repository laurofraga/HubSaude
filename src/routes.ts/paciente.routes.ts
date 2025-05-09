import { Router } from "express";
import { PacienteController } from "../controller/PacienteController";

const router = Router();
const controller = new PacienteController();

router.get("/", controller.listarPacientes.bind);
router.get("/:id", controller.buscarPacientePorId.bind);
router.post("/", controller.criarPaciente.bind);
router.put("/:id", controller.atualizarPaciente.bind);
router.delete("/:id", controller.deletarPaciente.bind);

export default router;