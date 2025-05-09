import { Request, Response } from "express";
import { CentroClinicoService } from "../service/CentroClinicoService";

const sevice = new CentroClinicoService();

export class CentroClinicoController {

    static listarCentroClinicos = async (req: Request, res: Response) => {
    try {
        const centroClinicos = await sevice.getCentroClinicos();
        res.status(200).json(centroClinicos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar centros clínicos", error });
    }
    }
    static criarCentroClinico = async (req: Request, res: Response) => {
    try {
        const { nome, endereco, telefone } = req.body;
        const centroClinico = await sevice.createCentroClinico(nome, endereco, telefone);
        res.status(201).json(centroClinico);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar centro clínico", error });
    }
    }
    
    static atualizarCentroClinico = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nome, endereco, telefone } = req.body;
        const centroClinico = await sevice.updateCentroClinico(parseInt(id), nome, endereco, telefone);
        if (centroClinico) {
            res.status(200).json(centroClinico);
        } else {
            res.status(404).json({ message: "Centro clínico não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar centro clínico", error });
        }
    }

    static deletarCentroClinico = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await sevice.deleteCentroClinico(parseInt(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar centro clínico", error });
    }       
    }
}
