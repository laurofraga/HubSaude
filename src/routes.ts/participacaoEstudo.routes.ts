import { Router } from "express";
import { ParticipacaoEstudoController } from "../controller/ParticipacaoEstudoController";
import { ParticipacaoEstudoService } from "../service/ParticipacaoEstudoService";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();
const service = new ParticipacaoEstudoService();
const controller = new ParticipacaoEstudoController(service);

router.get('/verificar',authMiddleware, controller.verificarParticipacao);
router.get('/', authMiddleware,controller.listarParticipacoes);
router.get('/:id', authMiddleware ,controller.buscarParticipacaoPorId);
router.post('/', authMiddleware, controller.criarParticipacao);
router.put('/:id', authMiddleware,controller.atualizarParticipacao);
router.delete('/:id', authMiddleware,controller.deletarParticipacao);

export default router;