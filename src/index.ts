import * as dotenv from 'dotenv';
dotenv.config();

import { AppDataSource } from "./data-source";
import app from "./app";

AppDataSource.initialize()
    .then(() => {
        console.log("Conectado ao banco de dados");
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Erro ao conectar ao banco de dados:", error);
    });