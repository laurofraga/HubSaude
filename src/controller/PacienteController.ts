import { Request, Response } from 'express';
import { PacienteService } from '../service/PacienteService';


export class PacienteController {
    private service: PacienteService;

    constructor (service: PacienteService) {
        this.service = service;
    }

    listarPacientes = async (req: Request, res: Response) => {
        try {
            const pacientes = await this.service.listarPacientes();
            res.status(200).json(pacientes);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar pacientes' });
        }
    }

    buscarPacientePorId = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const paciente = await this.service.buscarPacientePorId(parseInt(id));
            if (!paciente) {
                return res.status(404).json({ error: 'Paciente não encontrado' });
            }
            res.status(200).json(paciente);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar paciente' });
        }
    }

    criarPaciente = async (req: Request, res: Response) => {
        try {
            const paciente = await this.service.criarPaciente(req.body);
            res.status(201).json(paciente);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar paciente' });
        }
    }

    atualizarPaciente = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const paciente = await this.service.atualizarPaciente(parseInt(id), req.body);
            if (!paciente) {
                return res.status(404).json({ error: 'Paciente não encontrado' });
            }
            res.status(200).json(paciente);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar paciente' });
        }
    }

    deletarPaciente = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const paciente = await this.service.deletarPaciente(parseInt(id));
            if (!paciente) {
                return res.status(404).json({ error: 'Paciente não encontrado' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar paciente' });
        }
    }
}