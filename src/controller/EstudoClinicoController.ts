import {Request, Response} from 'express';
import { EstudoClinicoService } from '../service/EstudoClinicoService';

const service = new EstudoClinicoService();

export class EstudoClinicoController {
    async listarEstudos(req: Request, res: Response) {
        try {
            const estudos = await service.listarEstudos();
            res.status(200).json(estudos);
        } catch (error) {
            res.status(500).json({ message: "Erro ao listar estudos clínicos", error });
        }
    }

    async buscarPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const estudo = await service.buscarPorId(parseInt(id));
            if (estudo) {
                res.status(200).json(estudo);
            } else {
                res.status(404).json({ message: "Estudo clínico não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar estudo clínico", error });
        }
    }

    async criarEstudo(req: Request, res: Response) {
        try {
            const estudo = req.body;
            const novoEstudo = await service.criarEstudo(estudo);
            res.status(201).json(novoEstudo);
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar estudo clínico", error });
        }   
    }

    async atualizarEstudo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const estudo = req.body;
            const estudoAtualizado = await service.atualizarEstudo(parseInt(id), estudo);
            if (estudoAtualizado) {
                res.status(200).json(estudoAtualizado);
            } else {
                res.status(404).json({ message: "Estudo clínico não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar estudo clínico", error });
        }
    }

    async deletarEstudo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await service.deletarEstudo(parseInt(id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar estudo clínico", error });
        }
    }
}

