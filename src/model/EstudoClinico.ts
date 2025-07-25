import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { CentroClinico } from "./CentroClinico";
import {ParticipacaoEstudoClinico} from "./ParticipacaoEstudo";

export enum FaseEstudo{
    FASE_1 = 'Fase 1', 
    FASE_2 = 'Fase 2',
    FASE_3 = 'Fase 3',
    FASE_4 = 'Fase 4'
}

@Entity()
export class EstudoClinico {
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column()
    titulo?: string;

    @Column("text")
    descrica?: string;

    @Column("text", { array: true })
    criteriosInclusao?: string[];

    @Column("text", { array: true })
    criteriosExclusao?: string[];

    @Column({type: "enum", enum: FaseEstudo})
    fase?: FaseEstudo;

    @Column()
    dataInicio?: Date;

    @Column()
    dataFim?: Date;

    @ManyToOne(() => CentroClinico, c => c.estudosClinicos, { eager: true, nullable: false })
    @JoinColumn({ name: "centroClinicoId" })
    centroClinico!: CentroClinico;


    @OneToMany(() => ParticipacaoEstudoClinico, participacao => participacao.estudoClinico)
    participacoes?: ParticipacaoEstudoClinico[];

}
