import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    CreateDateColumn, 
    UpdateDateColumn,
    JoinColumn
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

    @ManyToOne(() => EstudoClinico, e => e.participacoes, { eager: true })
    @JoinColumn({ name: "estudoClinicoId" })
  estudoClinico!: EstudoClinico;

    @ManyToOne(() => Paciente, p => p.participacoes, { eager: true })
    @JoinColumn({ name: "pacienteId" })
  paciente!: Paciente;

    @Column({ type: "enum", enum: StatusParticipacao, enumName: "status_participacao_enum" })
    status?: StatusParticipacao;

    @CreateDateColumn({ type: 'timestamp' })
    dataParticipacao!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    dataAtualizacao!: Date;
}