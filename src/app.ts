import express from 'express';
import cors from 'cors';
import authRouter from "./auth/auth.controller";
import centroRoutes from './routes.ts/centro.routes';
import estudoClinicoRoutes from "./routes.ts/estudoClinico.routes";
import pacienteRoutes from "./routes.ts/paciente.routes";
import participacaoRoutes from "./routes.ts/participacaoEstudo.routes";
import { authMiddleware } from "./auth/auth.middleware";

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true 
}));
app.use(express.json());


app.get('/teste-proxy', (req, res) => {
  res.json({ mensagem: 'Proxy funcionando!' });
});

app.use('/centros', authMiddleware, centroRoutes);
app.use('/estudos', authMiddleware, estudoClinicoRoutes);
app.use('/pacientes', authMiddleware, pacienteRoutes);
app.use('/participacoes', authMiddleware, participacaoRoutes);


app.use('/auth', authRouter);


export default app;