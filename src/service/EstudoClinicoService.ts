import { AppDataSource } from "../../data-source";
import { EstudoClinico } from "../model/EstudoClinico";

export class EstudoClinicoService {
    private estufoRepo = AppDataSource.getRepository(EstudoClinico);

    async listarEstudos(){
        return await this.estufoRepo.find({ relations: ["centroClinico"] });
    }

    async buscarPorId(id: number) {
        return await this.estufoRepo.findOne({ where: { id }, relations: ["centroClinico"] });
    }

    async criarEstudo(estudo: EstudoClinico) {
        return await this.estufoRepo.save(estudo);
    }

    async atualizarEstudo(id: number, estudo: EstudoClinico) {
        await this.estufoRepo.update(id, estudo);
        return await this.buscarPorId(id);
    }

    async deletarEstudo(id: number) {
        await this.estufoRepo.delete(id);
    }