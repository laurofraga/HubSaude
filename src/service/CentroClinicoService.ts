import { AppDataSource } from "../data-source";
import { CentroClinico } from "../model/CentroClinico";

export class CentroClinicoService{
    
    private centroClinicoRepository = AppDataSource.getRepository(CentroClinico);

    async createCentroClinico(nome: string, endereco: string, telefone: string): Promise<CentroClinico> {
        const centroClinico = new CentroClinico();
        centroClinico.nome = nome;
        centroClinico.endereco = endereco;
        centroClinico.telefone = telefone;

        return await this.centroClinicoRepository.save(centroClinico);
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