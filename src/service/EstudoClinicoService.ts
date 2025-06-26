import { AppDataSource } from "../data-source";
import { EstudoClinico } from "../model/EstudoClinico";
import { Paciente } from "../model/Paciente";
import { CentroClinico } from "../model/CentroClinico";

export class EstudoClinicoService {
    private estudoRepo = AppDataSource.getRepository(EstudoClinico);
    private pacienteRepo = AppDataSource.getRepository(Paciente);
    private centroRepo = AppDataSource.getRepository(CentroClinico);
    estudoRepository: any;
    async listarEstudos(){
        return await this.estudoRepo.find({ relations: ["centroClinico"] });
    }

    async buscarPorId(id: number) {
      console.log('Buscando estudo com ID:', id);
        return await this.estudoRepo.findOne({ where: { id }, relations: ["centroClinico", "participacoes"] });
      }

    async criarEstudo(req: any, res: any) {
      const { centroClinicoId, ...dados } = req.body;
      console.log(" Dados recebidos no backend:", req.body);

      const centro = await this.centroRepo.findOneBy({ id: centroClinicoId });
      console.log("Centro encontrado:", centro);
      if (!centro) {
        return res.status(404).json({ erro: "Centro não existe" });
      }
      
      const estudo = this.estudoRepo.create({ ...dados, centroClinico: centro });
      const salvo  = await this.estudoRepo.save(estudo);
      return res.status(201).json(salvo);
}

    async atualizarEstudo(id: number, estudo: EstudoClinico) {
        await this.estudoRepo.update(id, estudo);
        return await this.buscarPorId(id);
    }

    async deletarEstudo(id: number) {
        await this.estudoRepo.delete(id);
    }
}