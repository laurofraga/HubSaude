import { Router } from "express";
import { EstudoClinicoController } from "../controller/EstudoClinicoController";
import { EstudoClinicoService } from "../service/EstudoClinicoService";

const router = Router();
const service = new EstudoClinicoService();
const controller = new EstudoClinicoController(service);

router.get('/', controller.listarEstudos);
router.get('/:id/participantes', controller.listarParticipantesDoEstudo);
router.get('/:id', controller.buscarEstudoPorId);
router.post('/', controller.criarEstudo);
router.put('/:id', controller.atualizarEstudo);
router.delete('/:id', controller.deletarEstudo);


export default router;