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

    @ManyToOne(() => EstudoClinico, (estudoClinico) => estudoClinico.participacoes, {onDelete: "CASCADE", eager: false, nullable: false })
    estudoClinico!: EstudoClinico;

    @ManyToOne(() => Paciente, (paciente) => paciente.participacoes, {onDelete: "CASCADE", eager: false, nullable: false })
    paciente!: Paciente;

    @Column({ type: "enum", enum: StatusParticipacao, enumName: "status_participacao_enum" })
    status?: StatusParticipacao;

    @CreateDateColumn({ type: 'timestamp' })
    dataParticipacao!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    dataAtualizacao!: Date;
}