import express from 'express';
import bodyParser from "body-parser";
import authRouter from "./auth/auth.controller";
import centroRoutes from './routes.ts/centro.routes';
import estudoClinicoRoutes from "./routes.ts/estudoClinico.routes";
import pacienteRoutes from "./routes.ts/paciente.routes";
import participacaoRoutes from "./routes.ts/participacaoEstudo.routes";
import * as dotenv from 'dotenv';

dotenv.config();



const app = express();

app.use(express.json());
app.use('/centros', centroRoutes);
app.use('/estudos', estudoClinicoRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/participacoes', participacaoRoutes);
app.use('/auth', authRouter);


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });

export default app;