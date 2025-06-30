import { AppDataSource } from "../data-source";
import { CentroClinico } from "../model/CentroClinico";
import { ParticipacaoEstudoClinico } from "../model/ParticipacaoEstudo";
import * as bcrypt from 'bcryptjs';
import { EstudoClinico } from "../model/EstudoClinico";
import { EstudoClinicoService } from "./EstudoClinicoService";
import { In } from "typeorm";

export class CentroClinicoService{
    
    private centroClinicoRepository = AppDataSource.getRepository(CentroClinico);
    private estudoRepo = AppDataSource.getRepository(EstudoClinico);
    private participacaoRepo = AppDataSource.getRepository(ParticipacaoEstudoClinico);

        async createCentroClinico(nome: string, endereco: string, telefone: string, email: string, senha: string): Promise<CentroClinico> {
        if (!email) throw new Error("Email é obrigatório.");
        if (!senha) throw new Error("Senha é obrigatória.");

        const centroExistente = await this.centroClinicoRepository.findOneBy({ email });
        if (centroExistente) throw new Error("Centro já cadastrado com esse email.");

        const senhaHash = await bcrypt.hash(senha, 10);


        const centro = this.centroClinicoRepository.create({
            nome,
            endereco,
            telefone,
            email,
            senha: senhaHash
        });

        return await this.centroClinicoRepository.save(centro);
    }

    getHomeData = async (centroId: number) => {
        const centro = await this.centroClinicoRepository.findOneBy({ id: centroId });
        if (!centro) throw new Error("Centro clínico não encontrado");

        const estudos = await this.estudoRepo.find({
      where: { centroClinico: { id: centroId } },
    });
          if (estudos.length === 0) {
            return { centro, estudos: [] };
        }

        const estudoIds = estudos.map(estudo => estudo.id);

        const todasAsParticipacoes = await this.participacaoRepo.find({
            where: { estudoClinico: { id: In(estudoIds) } }, 
            relations: ['estudoClinico'] 
        });

        const participacoesPorEstudo = new Map<number, number>();
            for (const p of todasAsParticipacoes) {
            if (p.estudoClinico?.id) {
                const contagemAtual = participacoesPorEstudo.get(p.estudoClinico.id) || 0;
                participacoesPorEstudo.set(p.estudoClinico.id, contagemAtual + 1);
            }
        }
        const estudosComDados = estudos.map(estudo => {
            const totalPacientes = estudo.id ? participacoesPorEstudo.get(estudo.id) || 0 : 0;
            return {
                ...estudo,
                totalPacientes: totalPacientes
            };
        });
        return {
            centro,
            estudos: estudosComDados
        };
    }

    async getCentroClinicos(): Promise<CentroClinico[]> {
        return await this.centroClinicoRepository.find();
    }

    async getCentroClinicoById(id: number): Promise<CentroClinico | null> {
        return await this.centroClinicoRepository.findOneBy({ id });
    }

    async updateCentroClinico(id: number, nome: string, endereco: string, telefone: string): Promise<CentroClinico | null> {
        const centroClinico = await this.getCentroClinicoById(id);
        if (centroClinico) {
            centroClinico.nome = nome;
            centroClinico.endereco = endereco;
            centroClinico.telefone = telefone;
            return await this.centroClinicoRepository.save(centroClinico);
        }
        return null;
    }

    async deleteCentroClinico(id: number): Promise<void> {
        await this.centroClinicoRepository.delete(id);
    }

}
