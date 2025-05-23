import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ParticipacaoEstudoClinico } from "./ParticipacaoEstudo";



export enum Sexo {
    MASCULINO = 'M',
    FEMININO = 'F'
}
@Entity()
export class Paciente {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nome?: string;

    @Column()
    idade?: number;

    @Column()
    sexo?:Sexo;

    @Column()
    email?: string;

    @Column()
    senha?: string;

    @Column( "text", { array: true })
    condicoes?: string[];

    @Column()
    endereco?: string;


    @OneToMany(() => ParticipacaoEstudoClinico, participacao => participacao.paciente)
    participacoes?: ParticipacaoEstudoClinico[];
}

