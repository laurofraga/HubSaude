import  "reflect-metadata";
import { DataSource } from "typeorm";
import {CentroClinico} from .model/CentroClinico;
import{EstudoClinico} from "./model/EstudoClinico";
import {Paciente} from "./model/Paciente";
import {ParticipacaoEstudo} from "./model/ParticipacaoEstudo";

export const AppDataSource = new DataSource({
    type : "postgres",
    host : "localhost",
    port :5432,
    username : "postgres",
    password: "postgres",
    database: "clinica",
    synchronize: true,
    logging: false,
    entities: [CentroClinico, EstudoClinico, Paciente, ParticipacaoEstudo],
    subscribers: [],
    migrations: [],
  })