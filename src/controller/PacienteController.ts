import { Request, Response } from 'express';
import { PacienteService } from '../service/PacienteService';


export class PacienteController {
    private service: PacienteService;

    constructor (service: PacienteService) {
        this.service = service;
    }

    listarPacientes = async (_req: Request, res: Response): Promise<void> => {
    try {
      const pacientes = await this.service.listarPacientes();
      res.status(200).json(pacientes);
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Erro ao listar pacientes' });
    }
  };

    buscarPacientePorId = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const paciente = await this.service.buscarPacientePorId(parseInt(id));
      res.status(200).json(paciente);
    } catch (error: any) {
      res.status(404).json({ message: error.message || 'Paciente não encontrado' });
    }
  };

    criarPaciente = async (req: Request, res: Response): Promise<void> => {
    try {
      const novoPaciente = await this.service.criarPaciente(req.body);
      res.status(201).json(novoPaciente);
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Erro ao criar paciente' });
    }
  };

    atualizarPaciente = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const pacienteAtualizado = await this.service.atualizarPaciente(parseInt(id), req.body);
      res.status(200).json(pacienteAtualizado);
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Erro ao atualizar paciente' });
    }
  };

    deletarPaciente = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      await this.service.deletarPaciente(parseInt(id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Erro ao deletar paciente' });
    }
  };
}