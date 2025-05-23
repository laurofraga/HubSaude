import { AppDataSource } from "../data-source";
import { EstudoClinico } from "../model/EstudoClinico";
import { Paciente } from "../model/Paciente";

export class EstudoClinicoService {
    private estudoRepo = AppDataSource.getRepository(EstudoClinico);
    private pacienteRepo = AppDataSource.getRepository(Paciente);
    estudoRepository: any;
    async listarEstudos(){
        return await this.estudoRepo.find({ relations: ["centroClinico"] });
    }

    async buscarPorId(id: number) {
        return await this.estudoRepo.findOne({ where: { id }, relations: ["centroClinico"] });
    }

    async criarEstudo(estudo: EstudoClinico) {
        return await this.estudoRepo.save(estudo);
    }

    async atualizarEstudo(id: number, estudo: EstudoClinico) {
        await this.estudoRepo.update(id, estudo);
        return await this.buscarPorId(id);
    }

    async deletarEstudo(id: number) {
        await this.estudoRepo.delete(id);
    }
    
  buscarEstudosCompatíveis = async (pacienteId: number) => {
    const paciente = await this.pacienteRepo.findOneBy({ id: pacienteId });

    if (!paciente) {
      throw new Error("Paciente não encontrado.");
    }

    const estudos = await this.estudoRepository.find();

    return estudos.filter((estudo: EstudoClinico) => {
      const condicoesPaciente = paciente.condicoes || [];

      const criteriosInclusao = estudo.criteriosInclusao || [];
      const criteriosExclusao = estudo.criteriosExclusao || [];

      
      const incluiCondicao = condicoesPaciente.some(cond =>
        criteriosInclusao.includes(cond)
      );

     
      const excluiCondicao = condicoesPaciente.some(cond =>
        criteriosExclusao.includes(cond)
      );

      return incluiCondicao && !excluiCondicao;
    });
  };
}