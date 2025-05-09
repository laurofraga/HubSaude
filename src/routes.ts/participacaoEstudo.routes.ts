import { Router } from "express";
import { ParticipacaoEstudoController } from "../controller/ParticipacaoEstudoController";

const router = Router();
const controller = new ParticipacaoEstudoController();

router.get("/", controller.listarParticipacoes.bind);
router.post("/", controller.criarParticipacao.bind);
router.get("/:id", controller.buscarParticipacaoPorId.bind);
router.put("/:id", controller.atualizarParticipacao.bind);
router.delete("/:id", controller.deletarParticipacao.bind);

export default router;