import { Request, Response } from "express";
import { ParticipacaoEstudoService} from "../service/ParticipacaoEstudoService";   

export class ParticipacaoEstudoController {
  constructor(private service: ParticipacaoEstudoService) {}

    listarParticipacoes = async (_req: Request, res: Response): Promise<void> => {
        try {
        const participacoes = await this.service.listarParticipacoes();
        res.status(200).json(participacoes);
        } catch (error: any) {
        res.status(500).json({ error: error.message || 'Erro ao listar participações.' });
        }
  };

    buscarParticipacaoPorId = async (req: Request, res: Response): Promise<void> => {
        try {
        const participacao = await this.service.buscarParticipacaoPorId(Number(req.params.id));
        res.status(200).json(participacao);
        } catch (error: any) {
        res.status(404).json({ error: error.message || 'Participação não encontrada.' });
        }
  };

    criarParticipacao = async (req: Request, res: Response): Promise<void> => {
        try {
        const novaParticipacao = await this.service.criarParticipacao(req.body);
        res.status(201).json(novaParticipacao);
        } catch (error: any) {
        res.status(400).json({ error: error.message });
        }
  };

    
  atualizarParticipacao = async (req: Request, res: Response): Promise<void> => {
    try {
      const participacaoAtualizada = await this.service.atualizarParticipacao(
        Number(req.params.id),
        req.body
      );
      res.status(200).json(participacaoAtualizada);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

   deletarParticipacao = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.service.deletarParticipacao(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}