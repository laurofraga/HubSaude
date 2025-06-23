import express from 'express';
import { Request, Response } from "express";
import { AuthService } from './auth.service';
import { error } from 'console';


const router = express.Router();
const authService = new AuthService();


router.post('/login', async (req, res) => {
  console.log('Requisição recebida em /login:', req.body);
  const { email, senha, tipo } = req.body;
  try {
    const result = await authService.login(email, senha);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ erro: err.message });
  }
});

router.post('/register/paciente', async (req, res) => {
  const { nome, email, senha, idade, sexo, condicoes, endereco } = req.body;
  try {
    const novo = await authService.registerPaciente(
      nome, email, senha, idade, sexo, condicoes, endereco
    );
    res.status(201).json(novo);
  } catch (err: any) {
    res.status(400).json({ erro: err.message });
  }
});

router.post('/register/centro', async (req, res) => {
  const { nome, email, senha, telefone, endereco } = req.body;
  try {
    const novo = await authService.registerCentroClinico(nome, email, senha, telefone, endereco);
    res.status(201).json(novo);
  } catch (err: any) {
    res.status(400).json({ erro: err.message });
  }
});

export default router;