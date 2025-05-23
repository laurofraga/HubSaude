import * as bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { Paciente } from '../model/Paciente';
import { CentroClinico } from '../model/CentroClinico';
import * as dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key"; 

export class AuthService {
  private centroRepo = AppDataSource.getRepository(CentroClinico);
  private pacienteRepo = AppDataSource.getRepository(Paciente);

  async login(email: string, senha: string): Promise<{ token: string; tipo: string }> {
    const centro = await this.centroRepo.findOneBy({ email });

    if (centro && centro.senha && await bcrypt.compare(senha, centro.senha)) {
      const token = jwt.sign({ id: centro.id, tipo: 'centro' }, JWT_SECRET, { expiresIn: '1h' });
      return { token, tipo: 'centro' };
    }

    const paciente = await this.pacienteRepo.findOneBy({ email });

    if (paciente && paciente.senha && await bcrypt.compare(senha, paciente.senha)) {
      const token = jwt.sign({ id: paciente.id, tipo: 'paciente' }, JWT_SECRET, { expiresIn: '1h' });
      return { token, tipo: 'paciente' };
    }

    throw new Error("Credenciais inválidas.");
  }

  async registerPaciente(nome: string, email: string, senha: string): Promise<Paciente> {
  const pacienteExistente = await this.pacienteRepo.findOneBy({ email });
  if (pacienteExistente) {
    throw new Error("Paciente já cadastrado com esse email.");
  }

  const paciente = new Paciente();
  paciente.nome = nome;
  paciente.email = email;
  paciente.senha = await bcrypt.hash(senha, 10);

  return await this.pacienteRepo.save(paciente);
}

async registerCentroClinico(nome: string, email: string, senha: string): Promise<CentroClinico> {
  const centroExistente = await this.centroRepo.findOneBy({ email });
  if (centroExistente) {
    throw new Error("Centro clínico já cadastrado com esse email.");
  }

  const centro = new CentroClinico();
  centro.nome = nome;
  centro.email = email;
  centro.senha = await bcrypt.hash(senha, 10);

  return await this.centroRepo.save(centro);
}
}
        