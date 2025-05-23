import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { EstudoClinico } from "./EstudoClinico";

@Entity()
export class CentroClinico {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nome?: string ;

    @Column()
    email?: string;

    @Column()
    senha?: string;

    @Column()
    endereco?: string;

    @Column()
    telefone?: string;

    @OneToMany(() => EstudoClinico, (estudoClinico) => estudoClinico.centroClinico)
    estudosClinicos?: EstudoClinico[];
}
