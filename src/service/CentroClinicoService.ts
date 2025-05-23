import { AppDataSource } from "../data-source";
import { CentroClinico } from "../model/CentroClinico";
import * as bcrypt from 'bcryptjs';

export class CentroClinicoService{
    
    private centroClinicoRepository = AppDataSource.getRepository(CentroClinico);
    

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