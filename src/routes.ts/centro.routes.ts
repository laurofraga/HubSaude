import { Router } from "express";
import { CentroClinicoService } from "../service/CentroClinicoService";
import { CentroClinicoController } from "../controller/CentroClinicoController";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();
const service = new CentroClinicoService();
const controller = new CentroClinicoController(service);


router.get('/home/:id', authMiddleware, controller.getHome);
router.get('/', authMiddleware, controller.listarCentros);
router.get('/:id',authMiddleware, controller.buscarCentroPorId);
router.post('/', controller.criarCentro);
router.put('/:id', authMiddleware,controller.atualizarCentro);
router.delete('/:id',authMiddleware, controller.deletarCentro);

export default router;