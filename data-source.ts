import  "reflect-metadata";
import { DataSource } from "typeorm";
import {CentroClinico} from "./src/model/CentroClinico"
import{EstudoClinico} from "./src/model/EstudoClinico";
import {Paciente} from "./src/model/Paciente";
import {ParticipacaoEstudoClinico} from "./src/model/ParticipacaoEstudo";

export const AppDataSource = new DataSource({
    type : "postgres",
    host : "localhost",
    port :5432,
    username : "postgres",
    password: "postgres",
    database: "clinica",
    synchronize: true,
    logging: false,
    entities: [CentroClinico, EstudoClinico, Paciente, ParticipacaoEstudoClinico],
    subscribers: [],
    migrations: [],
  })