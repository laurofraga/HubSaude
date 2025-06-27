import { Router } from "express";
import { ParticipacaoEstudoController } from "../controller/ParticipacaoEstudoController";
import { ParticipacaoEstudoService } from "../service/ParticipacaoEstudoService";

const router = Router();
const service = new ParticipacaoEstudoService();
const controller = new ParticipacaoEstudoController(service);

router.get('/verificar', controller.verificarParticipacao);
router.get('/', controller.listarParticipacoes);
router.get('/:id', controller.buscarParticipacaoPorId);
router.post('/', controller.criarParticipacao);
router.put('/:id', controller.atualizarParticipacao);
router.delete('/:id', controller.deletarParticipacao);

export default router;