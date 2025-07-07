import { AppDataSource } from "../data-source";
import { EstudoClinico } from "../model/EstudoClinico";
import { Paciente } from "../model/Paciente";
import { CentroClinico } from "../model/CentroClinico";
import { ParticipacaoEstudoClinico } from "../model/ParticipacaoEstudo";
import { In } from "typeorm";


export class EstudoClinicoService {
    private estudoRepo = AppDataSource.getRepository(EstudoClinico);
    private pacienteRepo = AppDataSource.getRepository(Paciente);
    private centroRepo = AppDataSource.getRepository(CentroClinico);
    private participacaoRepo = AppDataSource.getRepository(ParticipacaoEstudoClinico);
    estudoRepository: any;
    async listarEstudos(){
        return await this.estudoRepo.find({ relations: ["centroClinico"] });
    }

    async buscarPorId(id: number) {
      console.log('Buscando estudo com ID:', id);
        return await this.estudoRepo.findOne({ where: { id }, relations: ["centroClinico", "participacoes"] });
      }

    async criarEstudo(dadosEstudo: Partial<EstudoClinico>, centroClinicoId: number): Promise<EstudoClinico> {
        const centro = await this.centroRepo.findOneBy({ id: centroClinicoId });
        if (!centro) {
            throw new Error("Centro clínico não encontrado para associar ao estudo.");
        }
        const estudo = this.estudoRepo.create({
            ...dadosEstudo,
            centroClinico: centro
        });
        
        return await this.estudoRepo.save(estudo);
    }

     async atualizarEstudo(id: number, dadosAtualizacao: Partial<EstudoClinico>): Promise<EstudoClinico> {
        const estudoExistente = await this.estudoRepo.findOneBy({ id });
        if (!estudoExistente) {
            throw new Error(`Estudo com ID ${id} não encontrado.`);
        }
        if ('descricao' in dadosAtualizacao && dadosAtualizacao.descricao !== undefined) {
            (dadosAtualizacao as any).descrica = dadosAtualizacao.descricao;
            delete dadosAtualizacao.descricao;
        }
        this.estudoRepo.merge(estudoExistente, dadosAtualizacao);
        const estudoAtualizado = await this.estudoRepo.save(estudoExistente);
        
        return estudoAtualizado;
    }
    
    async deletarEstudo(id: number): Promise<void> { 
        const participacaoCount = await this.participacaoRepo.count({
            where: { estudoClinico: { id: id } }
        });
        if (participacaoCount > 0) {
            throw new Error("Não é possível excluir um estudo que possui participantes.");
        }
        const resultado = await this.estudoRepo.delete(id);
        if (resultado.affected === 0) {
            throw new Error(`Estudo com ID ${id} não encontrado para exclusão.`);
        }
    }

    async listarParticipantesPorEstudo(estudoId: number) {
  const participacoes = await this.participacaoRepo.find({
    where: { estudoClinico: { id: estudoId } },
    relations: ['paciente']
  });

  const dadosFormatados = participacoes.map(p => {
    if (!p.paciente) return null; 
    return {
      nome: p.paciente.nome,
      email: p.paciente.email,
      condicoes: p.paciente.condicoes
    };
  }).filter(p => p !== null); 

  return dadosFormatados;
}

}