import { AppDataSource } from "../data-source";
import { Paciente } from "../model/Paciente";
import { ParticipacaoEstudoClinico } from "../model/ParticipacaoEstudo";
import { EstudoClinico, FaseEstudo } from "../model/EstudoClinico";
import * as bcrypt from 'bcryptjs';


export class PacienteService {
    findOneBy(arg0: { id: number; }) {
      throw new Error('Method not implemented.');
    }
    private pacienteRepo = AppDataSource.getRepository(Paciente);
    private participacaoRepo = AppDataSource.getRepository(ParticipacaoEstudoClinico);
    private estudoRepo = AppDataSource.getRepository(EstudoClinico);

    getHomeData = async (pacienteId: number) => {
        const paciente = await this.pacienteRepo.findOneBy({ id: pacienteId });
        if (!paciente) {
            throw new Error("Paciente não encontrado.");
        }
        
        const participacoes = await this.participacaoRepo.find
        ({ where: { paciente: { id: pacienteId } } 
        , relations: ['estudoClinico'] });

        const estudos = await Promise.all(
            participacoes.map(async (p) => {
               const estudo = p.estudoClinico;
                return {
                     ...estudo,
                     participacao: p,
                     fase: estudo?.fase,
                     dataEntrada: p.dataParticipacao.toISOString().split('T')[0],
                };
            }) 
        );
        return {
            paciente,
            participacoes,
            estudos,
        };
    }

    async listarPacientes(){
        return await this.pacienteRepo.find();
    }

    async buscarPacientePorId(id: number){
        return await this.pacienteRepo.findOneBy({id});
    }

    async criarPaciente(paciente: Paciente){
    if (!paciente.email) {
        throw new Error("Email é obrigatório.");
    }
    if (!paciente.senha) {
        throw new Error("Senha é obrigatória.");
    }

    const pacienteExistente = await this.pacienteRepo.findOneBy({email: paciente.email});
    if(pacienteExistente){
        throw new Error("Paciente já cadastrado com esse email.");
    }

    paciente.senha = await bcrypt.hash(paciente.senha, 10);
    return await this.pacienteRepo.save(paciente);
}

    async atualizarPaciente(id: number, paciente: Paciente){
        const pacienteExistente = await this.pacienteRepo.findOneBy({id});
        if(!pacienteExistente){
            throw new Error("Paciente não encontrado.");
        }
        if(paciente.email !== pacienteExistente.email){
            const pacienteComEmailExistente = await this.pacienteRepo.findOneBy({email: paciente.email});
            if(pacienteComEmailExistente){
                throw new Error("Paciente já cadastrado com esse email.");
            }
        }
        return await this.pacienteRepo.save({...pacienteExistente, ...paciente});
    }

    async deletarPaciente(id: number){
        const pacienteExistente = await this.pacienteRepo.findOneBy({id});
        if(!pacienteExistente){
            throw new Error("Paciente não encontrado.");
        }
        return await this.pacienteRepo.delete(id);
    }

    async buscarEstudosCompatíveis (pacienteId: number){
    const paciente = await this.pacienteRepo.findOneBy({ id: pacienteId });

    if (!paciente) {
      throw new Error("Paciente não encontrado.");
    }

    const estudos = await this.estudoRepo.find();

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