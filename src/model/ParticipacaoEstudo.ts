import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    CreateDateColumn, 
    UpdateDateColumn 
} from "typeorm";

import { EstudoClinico } from "./EstudoClinico";
import { Paciente } from "./Paciente";

export enum StatusParticipacao {
    ATIVO = 'Ativo',
    INATIVO = 'Inativo'
}


@Entity()
export class ParticipacaoEstudoClinico {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => EstudoClinico, (estudoClinico) => estudoClinico.participacoes, {onDelete: "CASCADE"})
    estudoClinico?: EstudoClinico;

    @ManyToOne(() => Paciente, (paciente) => paciente.participacoes, {onDelete: "CASCADE"})
    paciente?: Paciente;

    @Column()
    status?: StatusParticipacao;

    @CreateDateColumn({ type: 'timestamp' })
    dataParticipacao?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    dataAtualizacao?: Date;
}