import express from 'express';
import centroRoutes from './routes.ts/centro.routes';
import estudoClinicoRoutes from "./routes.ts/estudoClinico.routes";
import pacienteRoutes from "./routes.ts/paciente.routes";
import participacaoRoutes from "./routes.ts/participacaoEstudo.routes";




const app = express();

app.use(express.json());
app.use('/centros', centroRoutes);
app.use('/estudos', estudoClinicoRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/participacoes', participacaoRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });

export default app;