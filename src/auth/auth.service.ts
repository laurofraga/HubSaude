import * as bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { Paciente, Sexo } from '../model/Paciente';
import { CentroClinico } from '../model/CentroClinico';
import * as dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key"; 

export class AuthService {
  private centroRepo = AppDataSource.getRepository(CentroClinico);
  private pacienteRepo = AppDataSource.getRepository(Paciente);

  async login(email: string, senha: string): Promise<{ token: string; tipo: string; user: { id: number } }> {
  const centro = await this.centroRepo.findOneBy({ email });

  if (centro && centro.senha && await bcrypt.compare(senha, centro.senha)) {
    const token = jwt.sign({ id: centro.id, tipo: 'centro' }, JWT_SECRET, { expiresIn: '1h' });
    return { token, tipo: 'centro', user: { id: centro.id! } };
  }

  const paciente = await this.pacienteRepo.findOneBy({ email });

  if (paciente && paciente.senha && await bcrypt.compare(senha, paciente.senha)) {
    console.log('Segredo usado para ASSINAR o token:', process.env.JWT_SECRET);
    const token = jwt.sign({ id: paciente.id, tipo: 'paciente' }, JWT_SECRET, { expiresIn: '1h' });
    return { token, tipo: 'paciente', user: { id: paciente.id! } };
  }

  throw new Error("Credenciais inválidas.");
}

  async registerPaciente(
  nome: string,
  email: string,
  senha: string,
  idade: number,
  sexo: Sexo,
  condicoes: string[],
  endereco: string,
): Promise<Paciente> {
  const existente = await this.pacienteRepo.findOneBy({ email });
  if (existente) throw new Error('Paciente já cadastrado com esse email.');

  const paciente = new Paciente();
  paciente.nome = nome;
  paciente.email = email;
  paciente.senha = await bcrypt.hash(senha, 10);
  paciente.idade = idade;
  paciente.sexo = sexo;
  paciente.condicoes = condicoes;
  paciente.endereco = endereco;

  return this.pacienteRepo.save(paciente);
}


async registerCentroClinico(nome: string, email: string, senha: string, telefone: string, endereco: string) {
  const novoCentro = new CentroClinico();
  novoCentro.nome = nome;
  novoCentro.email = email;
  novoCentro.senha = await bcrypt.hash(senha, 10);
  novoCentro.telefone = telefone;
  novoCentro.endereco = endereco;
  return await this.centroRepo.save(novoCentro);
}

}
        