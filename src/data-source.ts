import  "reflect-metadata";
import { DataSource } from "typeorm";
import { CentroClinico } from "./model/CentroClinico";
import { EstudoClinico } from "./model/EstudoClinico";
import { Paciente } from "./model/Paciente";
import { ParticipacaoEstudoClinico } from "./model/ParticipacaoEstudo";

export const AppDataSource = new DataSource({
    type : "postgres",
    host : "localhost",
    port :5433,
    username : "postgres",
    password: "123456",
    database: "HubSaude",
    synchronize: true,
    logging: false,
    entities: [CentroClinico, EstudoClinico, Paciente, ParticipacaoEstudoClinico],
    subscribers: [],
    migrations: [],
  })