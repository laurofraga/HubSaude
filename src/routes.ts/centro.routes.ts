import { Router } from "express";
import { CentroClinicoService } from "../service/CentroClinicoService";
import { CentroClinicoController } from "../controller/CentroClinicoController";

const router = Router();
const service = new CentroClinicoService();
const controller = new CentroClinicoController(service);


router.get('/:id/home', controller.getHome);
router.get('/', controller.listarCentros);
router.get('/:id', controller.buscarCentroPorId);
router.post('/', controller.criarCentro);
router.put('/:id', controller.atualizarCentro);
router.delete('/:id', controller.deletarCentro);

export default router;