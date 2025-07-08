import { Router } from "express";
import { EstudoClinicoController } from "../controller/EstudoClinicoController";
import { EstudoClinicoService } from "../service/EstudoClinicoService";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();
const service = new EstudoClinicoService();
const controller = new EstudoClinicoController(service);

router.get('/', authMiddleware,controller.listarEstudos);
router.get('/:id/participantes', authMiddleware,controller.listarParticipantesDoEstudo);
router.get('/:id',authMiddleware, controller.buscarEstudoPorId);
router.post('/', authMiddleware,controller.criarEstudo);
router.put('/:id', authMiddleware,controller.atualizarEstudo);
router.delete('/:id', authMiddleware,controller.deletarEstudo);


export default router;