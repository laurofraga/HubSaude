import { AppDataSource } from "../data-source";
import { ParticipacaoEstudoClinico } from "../model/ParticipacaoEstudo";


export class ParticipacaoEstudoService {

    private repo = AppDataSource.getRepository(ParticipacaoEstudoClinico);
     
    async listarParticipacoes() {
        return await this.repo.find({ relations: ["estudoClinico", "paciente"] });
    }

    async buscarParticipacaoPorId(id: number) {
        return await this.repo.findOne({ where: { id }, relations: ["estudoClinico", "paciente"] });
    }

    async criarParticipacao(participacao: ParticipacaoEstudoClinico) {
        return await this.repo.save(participacao);
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
}