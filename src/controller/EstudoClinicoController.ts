import {Request, Response} from 'express';
import { EstudoClinicoService } from '../service/EstudoClinicoService';

export class EstudoClinicoController {
  constructor(private service: EstudoClinicoService) {}

     listarEstudos = async (_req: Request, res: Response): Promise<void> => {
    try {
      const estudos = await this.service.listarEstudos();
      res.status(200).json(estudos);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Erro ao listar estudos clínicos.' });
    }
  };

    buscarEstudoPorId = async (req: Request, res: Response): Promise<void> => {
    try {
      const estudo = await this.service.buscarEstudoPorId(Number(req.params.id));
      res.status(200).json(estudo);
    } catch (err: any) {
      res.status(404).json({ error: err.message || 'Estudo clínico não encontrado.' });
    }
  };

   criarEstudo = async (req: Request, res: Response): Promise<void> => {
    try {
      const novoEstudo = await this.service.criarEstudo(req.body);
      res.status(201).json(novoEstudo);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

     atualizarEstudo = async (req: Request, res: Response): Promise<void> => {
    try {
      const estudoAtualizado = await this.service.atualizarEstudo(Number(req.params.id), req.body);
      res.status(200).json(estudoAtualizado);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  deletarEstudo = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.service.deletarEstudo(Number(req.params.id));
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
}

