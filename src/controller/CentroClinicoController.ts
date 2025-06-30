import { Request, Response } from "express";
import { CentroClinicoService } from "../service/CentroClinicoService";

const sevice = new CentroClinicoService();

export class CentroClinicoController {
    constructor(private service: CentroClinicoService) {}

  getHome = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.service.getHomeData(Number(id));
      res.status(200).json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Erro ao obter dados do centro clínico.' });
    }
  }

     listarCentros = async (_req: Request, res: Response): Promise<void> => {
    try {
      const centros = await this.service.getCentroClinicos();
      res.status(200).json(centros);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Erro ao listar centros clínicos.' });
    }
  };

  buscarCentroPorId = async (req: Request, res: Response): Promise<void> => {
    try {
      const centro = await this.service.getCentroClinicoById(Number(req.params.id));
      res.status(200).json(centro);
    } catch (err: any) {
      res.status(404).json({ error: err.message || 'Centro clínico não encontrado.' });
    }
  };
  
   criarCentro = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nome, endereco, telefone, email, senha } = req.body;
      const novoCentro = await this.service.createCentroClinico(nome, endereco, telefone, email, senha);
      res.status(201).json(novoCentro);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
    
    atualizarCentro = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nome, endereco, telefone } = req.body;
      const centroAtualizado = await this.service.updateCentroClinico(
        Number(req.params.id),
        nome,
        endereco,
        telefone
      );
      res.status(200).json(centroAtualizado);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

    deletarCentro = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.service.deleteCentroClinico(Number(req.params.id));
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
}
