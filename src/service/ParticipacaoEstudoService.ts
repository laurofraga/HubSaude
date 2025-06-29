import { AppDataSource } from "../data-source";
import { ParticipacaoEstudoClinico, StatusParticipacao } from "../model/ParticipacaoEstudo";
import { Paciente } from "../model/Paciente"; 
import { EstudoClinico } from "../model/EstudoClinico"; 


export class ParticipacaoEstudoService {

    private repo = AppDataSource.getRepository(ParticipacaoEstudoClinico);
     private pacienteRepo = AppDataSource.getRepository(Paciente);
    private estudoRepo = AppDataSource.getRepository(EstudoClinico);
     
    async listarParticipacoes() {
        return await this.repo.find({ relations: ["estudoClinico", "paciente"] });
    }

    async buscarParticipacaoPorId(id: number) {
        return await this.repo.findOne({ where: { id }, relations: ["estudoClinico", "paciente"] });
    }

    async criarParticipacao(dados: { pacienteId: number, estudoId: number }) {
        const { pacienteId, estudoId } = dados;

        const paciente = await this.pacienteRepo.findOneBy({ id: pacienteId });
        if (!paciente) {
            throw new Error(`Paciente com ID ${pacienteId} não encontrado.`);
        }

        const estudoClinico = await this.estudoRepo.findOneBy({ id: estudoId });
        if (!estudoClinico) {
            throw new Error(`Estudo Clínico com ID ${estudoId} não encontrado.`);
        }

        const novaParticipacao = this.repo.create({
            paciente: paciente,
            estudoClinico: estudoClinico,
            status: StatusParticipacao.ATIVO,
            dataParticipacao: new Date() 
        });

        const participacaoSalva = await this.repo.save(novaParticipacao);

        return participacaoSalva;
    }


    async atualizarParticipacao(id: number, participacao: Partial<ParticipacaoEstudoClinico>) {
        await this.repo.update(id, participacao);
        return await this.buscarParticipacaoPorId(id);
    }

    async deletarParticipacao(id: number) {
        const participacao = await this.buscarParticipacaoPorId(id);
        if (participacao) {
            await this.repo.delete(id);
            return participacao;
        }
        return null;
    }
    async buscarPorPacienteEEstudo(pacienteId: number, estudoId: number) {
    return await this.repo.findOne({
        where: {
            paciente: { id: pacienteId },
            estudoClinico: { id: estudoId }
        }
    });
}
}