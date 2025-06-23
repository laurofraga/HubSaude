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
       const id = Number(req.params.id);
    const estudo = await this.service.buscarPorId(id);

    if (!estudo) {
      res.status(404).json({ error: 'Estudo clínico não encontrado.'});
      return;
    }}catch (err: any) {
    res.status(500).json({ error: err.message || 'Erro ao buscar estudo.' });
    } 
  };

   criarEstudo = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.service.criarEstudo(req, res);
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
  
   buscarEstudosPorPaciente = async (req: Request, res: Response) => {
    try {
      
      const estudos = await this.service.buscarEstudosCompatíveis(Number(req.params.id));
      res.status(200).json(estudos);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  };
}


