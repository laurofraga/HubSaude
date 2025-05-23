import { AppDataSource } from "../data-source";
import { Paciente } from "../model/Paciente";
import * as bcrypt from 'bcryptjs';


export class PacienteService {
    private repo = AppDataSource.getRepository(Paciente);

    async listarPacientes(){
        return await this.repo.find();
    }

    async buscarPacientePorId(id: number){
        return await this.repo.findOneBy({id});
    }

    async criarPaciente(paciente: Paciente){
    if (!paciente.email) {
        throw new Error("Email é obrigatório.");
    }
    if (!paciente.senha) {
        throw new Error("Senha é obrigatória.");
    }

    const pacienteExistente = await this.repo.findOneBy({email: paciente.email});
    if(pacienteExistente){
        throw new Error("Paciente já cadastrado com esse email.");
    }

    paciente.senha = await bcrypt.hash(paciente.senha, 10);
    return await this.repo.save(paciente);
}

    async atualizarPaciente(id: number, paciente: Paciente){
        const pacienteExistente = await this.repo.findOneBy({id});
        if(!pacienteExistente){
            throw new Error("Paciente não encontrado.");
        }
        if(paciente.email !== pacienteExistente.email){
            const pacienteComEmailExistente = await this.repo.findOneBy({email: paciente.email});
            if(pacienteComEmailExistente){
                throw new Error("Paciente já cadastrado com esse email.");
            }
        }
        return await this.repo.save({...pacienteExistente, ...paciente});
    }

    async deletarPaciente(id: number){
        const pacienteExistente = await this.repo.findOneBy({id});
        if(!pacienteExistente){
            throw new Error("Paciente não encontrado.");
        }
        return await this.repo.delete(id);
    }
}