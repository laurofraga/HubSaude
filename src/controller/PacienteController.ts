import { Request, Response } from 'express';
import { PacienteService } from '../service/PacienteService';

const service = new PacienteService();  

export class PacienteController {
    async listarPacientes(req: Request, res: Response) {
        try {
            const pacientes = await service.listarPacientes();
            return res.status(200).json(pacientes);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
            return res.status(500).json({ message: errorMessage });
        }
    }

    async buscarPacientePorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const paciente = await service.buscarPacientePorId(Number(id));
            if (!paciente) {
                return res.status(404).json({ message: 'Paciente não encontrado' });
            }
            return res.status(200).json(paciente);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
            return res.status(500).json({ message: errorMessage });
        }
    }
    async criarPaciente(req: Request, res: Response) {
        try {
            const paciente = req.body;
            const novoPaciente = await service.criarPaciente(paciente);
            return res.status(201).json(novoPaciente);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
            return res.status(500).json({ message: errorMessage });
        }
    }
    async atualizarPaciente(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const paciente = req.body;
            const pacienteAtualizado = await service.atualizarPaciente(Number(id), paciente);
            return res.status(200).json(pacienteAtualizado);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
            return res.status(500).json({ message: errorMessage });
        }
    }
    async deletarPaciente(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await service.deletarPaciente(Number(id));
            return res.status(204).send();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
            return res.status(500).json({ message: errorMessage });
        }
    }}
