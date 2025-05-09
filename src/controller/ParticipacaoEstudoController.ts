import { Request, Response } from "express";
import { ParticipacaoEstudoService} from "../service/ParticipacaoEstudoService";   

const service = new ParticipacaoEstudoService();

export class ParticipacaoEstudoController {
    async listarParticipacoes (req: Request, res: Response) {
        try {
            const participacoes = await service.listarParticipacoes();
            return res.status(200).json(participacoes);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao listar participações" });
        }
    };
    async buscarParticipacaoPorId (req: Request, res: Response)  {
        const { id } = req.params;
        try {
            const participacao = await service.buscarParticipacaoPorId(Number(id));
            if (participacao) {
                return res.status(200).json(participacao);
            } else {
                return res.status(404).json({ error: "Participação não encontrada" });
            }
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar participação" });
        }
    }

     async criarParticipacao (req: Request, res: Response)  {
        const participacao = req.body;
        try {
            const novaParticipacao = await service.criarParticipacao(participacao);
            return res.status(201).json(novaParticipacao);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar participação" });
        }
    }
     async atualizarParticipacao (req: Request, res: Response)  {
        const { id } = req.params;
        const participacao = req.body;
        try {
            const participacaoAtualizada = await service.atualizarParticipacao(Number(id), participacao);
            if (participacaoAtualizada) {
                return res.status(200).json(participacaoAtualizada);
            } else {
                return res.status(404).json({ error: "Participação não encontrada" });
            }
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar participação" });
        }
    }
    async deletarParticipacao (req: Request, res: Response)  {
        const { id } = req.params;
        try {
            const participacaoDeletada = await service.deletarParticipacao(Number(id));
            if (participacaoDeletada) {
                return res.status(200).json(participacaoDeletada);
            } else {
                return res.status(404).json({ error: "Participação não encontrada" });
            }
        } catch (error) {
            return res.status(500).json({ error: "Erro ao deletar participação" });
        }
    }
}