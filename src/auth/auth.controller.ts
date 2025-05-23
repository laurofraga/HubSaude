import express from 'express';
import { Request, Response } from "express";
import { AuthService } from './auth.service';
import { error } from 'console';


const router = express.Router();
const authService = new AuthService();


router.post('/login', async (req, res) => {
  const { email, senha, tipo } = req.body;
  try {
    const result = await authService.login(email, senha);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ erro: err.message });
  }
});

router.post('/register/paciente', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const novo = await authService.registerPaciente(nome, email, senha);
    res.status(201).json(novo);
  } catch (err: any) {
    res.status(400).json({ erro: err.message });
  }
});

router.post('/register/centro', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const novo = await authService.registerCentroClinico(nome, email, senha);
    res.status(201).json(novo);
  } catch (err: any) {
    res.status(400).json({ erro: err.message });
  }
});

export default router;