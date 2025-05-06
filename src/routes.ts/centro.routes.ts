import { Router } from "express";
import {criarCentroClinico, listarCentroClinicos, atualizarCentroClinico, deletarCentroClinico  } from "../controller/CentroClinicoController";

const router = Router();

router.get("/", listarCentroClinicos);
router.post("/", criarCentroClinico);
router.put("/:id", atualizarCentroClinico);
router.delete("/:id", deletarCentroClinico);

export default router;